import os
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from fastapi import Cookie, HTTPException, Response, status
from jose import JWTError, jwt
from pydantic import BaseModel, EmailStr

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.getenv("JWT_SECRET", "not a good idea")


class User(BaseModel):
    uid: str
    email: EmailStr


class NativeUser(User):
    ucinetid: str
    display_name: str
    affiliations: list[str]

    def __init__(
        self, *, ucinetid: str, display_name: str, email: str, affiliations: list[str]
    ):
        uid = f"edu.uci.{ucinetid}"
        super().__init__(
            uid=uid,
            ucinetid=ucinetid,
            display_name=display_name,
            email=email,
            affiliations=affiliations,
        )


class GuestUser(User):
    def __init__(self, *, email: str):
        uid = scoped_uid(EmailStr(email))
        super().__init__(uid=uid, email=email)


class JWTClaims(BaseModel):
    iat: datetime
    exp: datetime
    sub: str
    data: dict[str, Any]


def scoped_uid(email: EmailStr) -> str:
    """Provide a scoped unique identifier based on the email domain."""
    if uci_email(email):
        raise ValueError("UCI user should use NativeUser")
    local, domain = email.split("@")
    reversed_domains = ".".join(reversed(domain.split(".")))
    return f"{reversed_domains}.{local}"


def uci_email(email: EmailStr) -> bool:
    """Check whether or not an email address is part of UCI or a subdomain thereof."""
    return email.endswith("@uci.edu") or email.endswith(".uci.edu")


def utc_now() -> datetime:
    """Return current datetime with proper UTC timezone."""
    return datetime.now(timezone.utc)


def issue_user_identity(user: User, response: Response) -> Response:
    """Issue a user identity as a JWT cookie added to the given response."""
    jwt_token = _generate_jwt_token(user)
    response.set_cookie(
        "hackuci_auth", jwt_token, max_age=4000, secure=True, httponly=True
    )
    return response


def require_user_identity(hackuci_auth: Optional[str] = Cookie(None)) -> User:
    """Provide the user decoded from the auth cookie.
    Raise status 401 if valid identity cannot be decoded."""
    user_identity = _decode_user_identity(hackuci_auth)
    if not user_identity:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not authorized")

    return user_identity


def use_user_identity(hackuci_auth: Optional[str] = Cookie(None)) -> Optional[User]:
    """Provide the user decoded from the auth cookie or `None` if invalid."""
    return _decode_user_identity(hackuci_auth)


def _decode_user_identity(user_token: Optional[str]) -> Optional[User]:
    """Decode a user object from a JWT.
    Return `None` if the token is empty or invalid."""
    if not user_token:
        return None

    try:
        decoded_token = _decode_jwt(user_token)
    except ValueError:
        return None

    if decoded_token.sub.startswith("edu.uci."):
        return NativeUser(**decoded_token.data)
    return GuestUser(**decoded_token.data)


def _generate_jwt_token(user: User) -> str:
    """Generate a JWT with claims for the given user."""
    now = utc_now()

    claims = JWTClaims(
        iat=now,
        exp=now + timedelta(hours=1),
        sub=user.uid,
        data=user.dict(exclude={"uid"}),
    )

    token = jwt.encode(claims.dict(), JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token


def _decode_jwt(user_token: str) -> JWTClaims:
    """Decode a JWT into its original claims.
    Raise `ValueError` if the token is empty or invalid (including expired)."""
    try:
        raw_claims = jwt.decode(user_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError:
        raise ValueError

    return JWTClaims.parse_obj(raw_claims)
