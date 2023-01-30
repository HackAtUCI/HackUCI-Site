from datetime import datetime, timezone
from logging import getLogger
from typing import Any, Optional

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr

from auth import user_identity
from auth.user_identity import User, require_user_identity, use_user_identity
from models.ApplicationData import ProcessedApplicationData, RawApplicationData
from services import mongodb_handler
from services.mongodb_handler import Collection
from utils import email_handler, resume_handler
from utils.user_record import Applicant, Role

log = getLogger(__name__)

router = APIRouter()


class IdentityResponse(BaseModel):
    uid: Optional[str]
    status: Optional[str]
    role: Optional[Role]


@router.post("/login")
async def login(email: EmailStr = Form()) -> RedirectResponse:
    if user_identity.uci_email(email):
        # redirect user to UCI SSO login endpoint, changing to GET method
        return RedirectResponse("/api/saml/login", status.HTTP_303_SEE_OTHER)
    return RedirectResponse("/api/guest/login", status.HTTP_307_TEMPORARY_REDIRECT)


@router.get("/logout")
async def log_out() -> RedirectResponse:
    """Clear user identity cookie."""
    response = RedirectResponse("/", status.HTTP_303_SEE_OTHER)
    user_identity.remove_user_identity(response)
    return response


@router.get("/me", response_model=IdentityResponse)
async def me(user: User = Depends(use_user_identity)) -> Any:
    log.info(user)
    if not user:
        return dict()
    user_record = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": user.uid}
    )
    if not user_record:
        return {"uid": user.uid}
    return {**user_record, "uid": user.uid}


@router.post("/apply", status_code=status.HTTP_201_CREATED)
async def apply(
    user: User = Depends(require_user_identity),
    raw_application_data: RawApplicationData = Depends(RawApplicationData),
    resume: Optional[UploadFile] = None,
) -> None:
    # check if email is already in database
    EXISTING_RECORD = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": user.uid}
    )

    if EXISTING_RECORD and "status" in EXISTING_RECORD:
        log.error("User email is already in use")
        raise HTTPException(status.HTTP_400_BAD_REQUEST)

    if resume is not None:
        try:
            resume_url = await resume_handler.upload_resume(
                raw_application_data, resume
            )
        except TypeError:
            raise HTTPException(
                status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, "Invalid resume file type"
            )
        except ValueError:
            raise HTTPException(
                status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, "Resume upload is too large"
            )
        except RuntimeError as err:
            log.error("During user %s apply, resume upload: %s", user.uid, err)
            raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        resume_url = None

    now = datetime.now(timezone.utc)
    processed_application_data = ProcessedApplicationData(
        **raw_application_data.dict(),
        resume_url=resume_url,
        submission_time=now,
    )
    applicant = Applicant(
        _id=user.uid,
        application_data=processed_application_data,
        status="PENDING_REVIEW",
    )

    # add applicant to database
    try:
        await mongodb_handler.update_one(
            Collection.USERS,
            {"_id": user.uid},
            applicant.dict(),
            upsert=True,
        )
    except RuntimeError:
        log.error("Could not insert applicant %s to MongoDB.", user.uid)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        await email_handler.send_application_confirmation_email(
            applicant.application_data
        )
    except RuntimeError:
        log.error("Could not send confirmation email with SendGrid to %s.", user.uid)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    # TODO: handle inconsistent results if one service fails

    log.info("%s submitted an application", user.uid)


@router.get("/rsvp")
async def rsvp(user: User = Depends(require_user_identity)) -> RedirectResponse:
    """Change user status for RSVP"""
    user_record = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": user.uid}, ["status"]
    )

    if not user_record:
        raise HTTPException(status.HTTP_400_BAD_REQUEST)

    if user_record["status"] == "accepted":
        new_status = "confirmed"
    elif user_record["status"] == "confirmed":
        new_status = "accepted"
    else:
        raise HTTPException(status.HTTP_403_FORBIDDEN)

    await mongodb_handler.update_one(
        Collection.USERS, {"_id": user.uid}, {"status": new_status}
    )

    return RedirectResponse("/portal", status.HTTP_303_SEE_OTHER)
