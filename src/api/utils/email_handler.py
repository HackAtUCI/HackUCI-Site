from enum import Enum

from models.User import User
from services import sendgrid_handler

HACKUCI_SENDER = "noreply@hackuci.com"


class Template(str, Enum):
    # TODO: provide actual template IDs
    confirmation = "confirmation-template-id"


async def send_application_confirmation_email(user: User) -> None:
    """Send a confirmation email after a user submits an application.
    Will propagate exceptions from SendGrid."""
    data = user.application_data
    await sendgrid_handler.send_email(
        Template.confirmation,
        HACKUCI_SENDER,
        {
            "email": data.email,
            "first_name": data.first_name,
            "last_name": data.last_name,
        },
    )
