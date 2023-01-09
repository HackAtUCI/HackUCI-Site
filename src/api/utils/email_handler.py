from enum import Enum
from typing import Protocol

from pydantic import EmailStr

from services import sendgrid_handler

HACKUCI_SENDER = "noreply@hackuci.com"


class ContactInfo(Protocol):
    email: EmailStr
    first_name: str
    last_name: str


class Template(str, Enum):
    # TODO: provide actual template IDs
    confirmation = "confirmation-template-id"


async def send_application_confirmation_email(user: ContactInfo) -> None:
    """Send a confirmation email after a user submits an application.
    Will propagate exceptions from SendGrid."""
    await sendgrid_handler.send_email(
        Template.confirmation,
        HACKUCI_SENDER,
        {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        },
    )
