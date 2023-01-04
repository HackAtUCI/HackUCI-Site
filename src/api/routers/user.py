import os

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import RedirectResponse
from pydantic import EmailError, EmailStr

from models.ApplicationData import ApplicationData
from models.User import User
from services.gdrive_handler import upload_file
from services.sendgrid_handler import send_email
from utils.mongodb_handler import insert_user, retrieve_users

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
    application_data: ApplicationData = Depends(ApplicationData),
) -> None:

    user_collection = os.getenv("USER_COLLECTION")
    google_drive_folder_id = os.getenv("GOOGLE_DRIVE_FOLDER_ID")

    if not user_collection or not google_drive_folder_id:
        raise HTTPException(500)

    # check if email is already in database
    if await retrieve_users(user_collection, {"email": application_data.email}):
        raise HTTPException(400, "Email already in use")

    # upload file to google drive and add url to user dict
    try:
        resume_url = await upload_file(
            google_drive_folder_id,
            resume.filename,
            await resume.read(),
            resume.content_type,
        )
    except RuntimeError:
        raise HTTPException(500, "Resume upload to google drive unsuccessful")

    user: User = User(application_data=application_data, status="pending review")
    user_dict = user.dict()
    user_dict["application_data"]["resume_url"] = resume_url

    # add user to database
    try:
        await insert_user(user_collection, user_dict)
    except RuntimeError:
        raise HTTPException(500, "User insert into database unsuccessful")

    # send confirmation email
    try:
        await send_email(
            "my-template-id",
            "noreply@hackuci.com",
            {
                "email": application_data.email,
                "name": application_data.first_name + " " + application_data.last_name,
            },
        )
    except RuntimeError:
        raise HTTPException(500, "Sending confirmation email unsuccessful")
