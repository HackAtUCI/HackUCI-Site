from unittest.mock import AsyncMock, patch

from httpx import Response

from services import sendgrid_handler

SAMPLE_SENDER = "noreply@hackuci.com"
SAMPLE_RECIPIENTS = [
    {"email": "hacker0@uci.edu", "name": "Hacker Zero"},
    {"email": "hacker1@uci.edu", "name": "Hacker One"},
]


@patch("aiosendgrid.AsyncSendGridClient")
async def test_send_single_email(mock_AsyncClient: AsyncMock) -> None:
    """Tests that sending a single email calls the AsyncClient as expected"""
    mock_client = AsyncMock()
    mock_client.send_mail_v3.return_value = Response(202)
    mock_AsyncClient.return_value.__aenter__.return_value = mock_client

    recipient_data = SAMPLE_RECIPIENTS[0]

    await sendgrid_handler.send_email("my-template-id", SAMPLE_SENDER, recipient_data)
    mock_client.send_mail_v3.assert_called_with(
        body={
            "from": {"email": SAMPLE_SENDER},
            "personalizations": [
                {
                    "to": [{"email": recipient_data["email"]}],
                    "dynamic_template_data": recipient_data,
                }
            ],
            "template_id": "my-template-id",
        }
    )


@patch("aiosendgrid.AsyncSendGridClient")
async def test_send_multiple_emails(mock_AsyncClient: AsyncMock) -> None:
    """Tests that sending multiple emails calls the AsyncClient as expected"""
    mock_client = AsyncMock()
    mock_client.send_mail_v3.return_value = Response(202)
    mock_AsyncClient.return_value.__aenter__.return_value = mock_client

    await sendgrid_handler.send_email(
        "my-template-id", SAMPLE_SENDER, SAMPLE_RECIPIENTS, True
    )
    mock_client.send_mail_v3.assert_called_with(
        body={
            "from": {"email": SAMPLE_SENDER},
            "personalizations": [
                {
                    "to": [{"email": SAMPLE_RECIPIENTS[1]["email"]}],
                    "dynamic_template_data": SAMPLE_RECIPIENTS[1],
                },
                {
                    "to": [{"email": SAMPLE_RECIPIENTS[0]["email"]}],
                    "dynamic_template_data": SAMPLE_RECIPIENTS[0],
                },
            ],
            "template_id": "my-template-id",
        }
    )
