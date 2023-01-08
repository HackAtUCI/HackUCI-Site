from datetime import datetime, timezone
from logging import getLogger

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import RedirectResponse
from pydantic import EmailStr

from auth import user_identity
from models.ApplicationData import ProcessedApplicationData, RawApplicationData
from models.User import User
from services import mongodb_handler
from services.mongodb_handler import Collection
from utils import email_handler, resume_handler

log = getLogger(__name__)

router = APIRouter()


@router.post("/login")
async def login(email: EmailStr = Form()) -> RedirectResponse:
    if not email.endswith(".edu"):
        raise HTTPException(
            status.HTTP_403_FORBIDDEN, "Only .edu emails are allowed to login"
        )

    if user_identity.uci_email(email):
        # redirect user to UCI SSO login endpoint, changing to GET method
        return RedirectResponse("/api/saml/login", status_code=303)
    return RedirectResponse("/api/guest/login", status_code=307)


@router.post("/apply", status_code=status.HTTP_201_CREATED)
async def apply(
    resume: UploadFile,
    raw_application_data: RawApplicationData = Depends(RawApplicationData),
) -> None:

    # check if email is already in database
    if await mongodb_handler.retrieve_one(
        Collection.USERS, {"email": raw_application_data.email}
    ):
        log.error("User email is already in use")
        raise HTTPException(status.HTTP_400_BAD_REQUEST)

    try:
        resume_url = await resume_handler.upload_resume(raw_application_data, resume)
    except TypeError:
        raise HTTPException(
            status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, "Invalid resume file type"
        )
    except ValueError:
        raise HTTPException(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, "Resume upload is too large"
        )
    except RuntimeError as err:
        log.error("During user apply: %s", err)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    now = datetime.now(timezone.utc)
    processed_application_data = ProcessedApplicationData(
        **raw_application_data.dict(),
        resume_url=resume_url,
        submission_time=now,
    )
    user = User(application_data=processed_application_data, status="PENDING_REVIEW")

    # add user to database
    try:
        await mongodb_handler.insert(Collection.USERS, user.dict())
    except RuntimeError:
        log.error("Could not insert user to MongoDB")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        await email_handler.send_application_confirmation_email(user.application_data)
    except RuntimeError:
        log.error("Could not send confirmation email with SendGrid")
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    # TODO: handle inconsistent results if one service fails
