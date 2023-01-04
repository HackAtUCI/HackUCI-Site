from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import RedirectResponse
from pydantic import EmailError, EmailStr

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
    user: User = Depends(User),
) -> None:

    # check if email is already in database
    if await retrieve_users("USERS", {"email": user.email}):
        raise HTTPException(400, "email already in use")

    # upload file to google drive and add url to user dict
    url: str = await upload_file(
        "resumes", resume.filename, resume.file.read(), resume.content_type
    )
    user_dict = dict(user)
    user_dict["url"] = url

    # add user to database
    await insert_user("USERS", user_dict)

    # send confirmation email
    await send_email(
        "my-template-id",
        "noreply@hackuci.com",
        {"email": user.email, "name": user.first_name + " " + user.last_name},
    )
