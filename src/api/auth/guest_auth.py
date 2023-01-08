from datetime import datetime, timedelta, timezone
from typing import Optional
from uuid import uuid4

from pydantic import BaseModel, EmailStr

from auth import user_identity
from auth.user_identity import GuestUser
from services import mongodb_handler
from services.mongodb_handler import BaseRecord, Collection
from utils import email_handler


class GuestAuth(BaseModel):
    iat: datetime
    exp: datetime
    key: str


class GuestRecord(BaseRecord):
    guest_auth: GuestAuth


async def initiate_guest_login(email: EmailStr) -> Optional[str]:
    """Generate a login passphrase to be emailed, save the authentication key,
    and a confirmation token to be saved as a cookie."""
    if await _get_existing_key(email):
        # To prevent spammed requests, user must wait until previous key expires
        return None

    confirmation = _generate_confirmation_token()
    passphrase = _generate_passphrase()
    auth_key = _generate_key(confirmation, passphrase)

    uid = user_identity.scoped_uid(email)
    now = datetime.now(timezone.utc)
    exp = now + timedelta(minutes=10)

    guest = GuestRecord(
        uid=uid,
        guest_auth=GuestAuth(iat=now, exp=exp, key=auth_key),
    )

    await _save_guest_key(guest)
    await email_handler.send_guest_login_email(email, passphrase)

    return confirmation


async def verify_guest_credentials(
    email: EmailStr, passphrase: str, confirmation: str
) -> bool:
    """Check that passphrase and confirmation are valid for the given user."""
    key = await _get_existing_key(email)
    if not key:
        return False

    # TODO: delete used key
    return _validate(key, passphrase, confirmation)


def acquire_guest_identity(email: EmailStr) -> GuestUser:
    """Provide a user identity for the given guest."""
    return GuestUser(email=email)


async def _get_existing_key(email: EmailStr) -> Optional[str]:
    """Retrieve guest authentication key, `None` if expired."""
    uid = user_identity.scoped_uid(email)
    record = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": uid}, ["guest_auth"]
    )

    if not record or "guest_auth" not in record:
        return None

    auth = GuestAuth.parse_obj(record["guest_auth"])
    # TODO: check expiration
    return auth.key


async def _save_guest_key(guest: GuestRecord) -> None:
    """Save guest authentication key to user record."""
    await mongodb_handler.update(Collection.USERS, {"_id": guest.uid}, guest.dict())


def _generate_confirmation_token() -> str:
    """Generate a confirmation token to use for guest authentication."""
    return uuid4().hex


def _generate_passphrase() -> str:
    """Generate a secret passphrase to use for guest authentication."""
    # TODO: add proper passphrase generation
    return "correct-horse-battery-staple"


def _generate_key(confirmation: str, passphrase: str) -> str:
    """Generate a key from a passphrase and confirmation token."""
    return confirmation + passphrase


def _validate(key: str, passphrase: str, confirmation: str) -> bool:
    """Validate a passphrase, confirmation token, and authentication key."""
    return confirmation + passphrase == key
