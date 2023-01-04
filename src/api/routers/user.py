import os

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import RedirectResponse
from pydantic import EmailError, EmailStr

from models.ApplicationData import ProcessedApplicationData, RawApplicationData
from models.User import User
from services import mongodb_handler
from services.gdrive_handler import upload_file
from services.mongodb_handler import Collection
from services.sendgrid_handler import send_email

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

    google_drive_folder_id = os.getenv("GOOGLE_DRIVE_FOLDER_ID")

    if not google_drive_folder_id:
        raise HTTPException(500)

    # check if email is already in database
    if await mongodb_handler.retrieve(
        Collection.USERS, {"email": raw_application_data.email}
    ):
        print("Email already in use")
        raise HTTPException(400)

    # upload file to google drive and add url to user dict
    raw_resume_file: bytes = await resume.read()
    if len(raw_resume_file) > 500000:
        print("Resume file exceeds 500KB")
        raise HTTPException(500)

    try:
        resume_url = await upload_file(
            google_drive_folder_id,
            resume.filename,
            raw_resume_file,
            resume.content_type,
        )
    except RuntimeError:
        print("Resume upload to google drive unsuccessful")
        raise HTTPException(500)

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
