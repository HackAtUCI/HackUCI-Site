from urllib.parse import urlencode

from fastapi import APIRouter, Cookie, Form, HTTPException, status
from fastapi.responses import RedirectResponse
from pydantic import EmailStr

from auth import guest_auth, user_identity

router = APIRouter()


@router.post("/login")
async def guest_login(email: EmailStr = Form()) -> RedirectResponse:
    """Generate login token and set cookie with login key"""
    try:
        confirmation = await guest_auth.initiate_guest_login(email)
    except RuntimeError:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)

    if not confirmation:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS)

    # Redirect to guest login page on client
    # which displays a message to check email and enter passphrase
    query = urlencode({"email": email})
    response = RedirectResponse(f"/guest-login?{query}", status.HTTP_303_SEE_OTHER)
    response.set_cookie(
        "guest_confirmation", confirmation, max_age=600, secure=True, httponly=True
    )
    return response


@router.post("/verify")
async def verify_guest_token(
    email: EmailStr = Form(),
    passphrase: str = Form(),
    guest_confirmation: str = Cookie(),
) -> RedirectResponse:
    """Verify guest token"""
    if not await guest_auth.verify_guest_credentials(
        email, passphrase, guest_confirmation
    ):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unauthorized")

    guest = guest_auth.acquire_guest_identity(email)

    res = RedirectResponse("/portal", status_code=status.HTTP_303_SEE_OTHER)
    user_identity.issue_user_identity(guest, res)
    return res
