from fastapi import APIRouter, Form, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import EmailError, EmailStr

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
