from logging import getLogger

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import RedirectResponse
from pydantic import EmailError, EmailStr

from models.ApplicationData import ProcessedApplicationData, RawApplicationData
from models.User import User
from services import mongodb_handler
from services.mongodb_handler import Collection
from services.sendgrid_handler import send_email
from utils import resume_handler

log = getLogger(__name__)

router = APIRouter()


def _uci_email(email: str) -> bool:
    """Checks whether or not an email address is part of UCI or a subdomain thereof"""
    return email.endswith("@uci.edu") or email.endswith(".uci.edu")


@router.post("/login")
async def login(email: str = Form()) -> RedirectResponse:
    try:
        EmailStr.validate(email)
    except EmailError:
        raise HTTPException(400, "Invalid email address")

    if _uci_email(email):
        # redirect user to UCI SSO login endpoint, changing to GET method
        return RedirectResponse("/api/saml/login", status_code=303)
    # TODO: add authentication for non-UCI users
    raise HTTPException(501)


@router.post("/apply", status_code=status.HTTP_201_CREATED)
async def apply(
    resume: UploadFile,
    raw_application_data: RawApplicationData = Depends(RawApplicationData),
) -> None:

    # check if email is already in database
    if await mongodb_handler.retrieve(
        Collection.USERS, {"email": raw_application_data.email}
    ):
        print("Email already in use")
        raise HTTPException(400)

    try:
        resume_url = await resume_handler.upload_resume(resume)
    except ValueError:
        raise HTTPException(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, "Resume upload is too large"
        )
    except RuntimeError as err:
        log.error("During user apply: %s", err)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    processed_application_data: ProcessedApplicationData = ProcessedApplicationData(
        **raw_application_data.dict(), resume_url=resume_url
    )
    user: User = User(
        application_data=processed_application_data, status="pending review"
    )

    # add user to database
    try:
        await mongodb_handler.insert(Collection.USERS, user.dict())
    except RuntimeError:
        print("User insert into database unsuccessful")
        raise HTTPException(500)

    # send confirmation email
    try:
        await send_email(
            "my-template-id",
            "noreply@hackuci.com",
            {
                "email": processed_application_data.email,
                "name": processed_application_data.first_name
                + " "
                + processed_application_data.last_name,
            },
        )
    except RuntimeError:
        print("Sending confirmation email unsuccessful")
        raise HTTPException(500)
