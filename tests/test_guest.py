from datetime import datetime
from unittest.mock import AsyncMock, Mock, patch

from fastapi import FastAPI
from fastapi.testclient import TestClient

from auth.guest_auth import GuestAuth, GuestRecord
from routers import guest

app = FastAPI()
app.include_router(guest.router)

client = TestClient(app)

SAMPLE_EMAIL = "beaver@caltech.edu"
SAMPLE_LOGIN_DATA = {"email": SAMPLE_EMAIL}
SAMPLE_PASSPHRASE = "correct-horse-battery-staple"


@patch("utils.email_handler.send_guest_login_email", autospec=True)
@patch("auth.guest_auth._save_guest_key", autospec=True)
@patch("auth.guest_auth.datetime", autospec=True)
@patch("auth.guest_auth._generate_passphrase", autospec=True)
@patch("auth.guest_auth._generate_confirmation_token", autospec=True)
@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_guest_login_initiation(
    mock_get_existing_key: AsyncMock,
    mock_generate_confirmation_token: Mock,
    mock_generate_passphrase: Mock,
    mock_datetime: Mock,
    mock_save_guest_key: AsyncMock,
    mock_send_guest_login_email: AsyncMock,
) -> None:
    """Test full guest login initiation flow."""

    mock_get_existing_key.return_value = None
    mock_generate_confirmation_token.return_value = "abcdef"
    mock_generate_passphrase.return_value = SAMPLE_PASSPHRASE
    mock_datetime.now.return_value = datetime(2023, 2, 4)

    res = client.post("/login", data=SAMPLE_LOGIN_DATA, follow_redirects=False)

    mock_save_guest_key.assert_awaited_once_with(
        GuestRecord(
            uid="edu.caltech.beaver",
            guest_auth=GuestAuth(
                iat=datetime(2023, 2, 4),
                exp=datetime(2023, 2, 4, 0, 10, 0),
                key="abcdef" + SAMPLE_PASSPHRASE,
            ),
        )
    )
    mock_send_guest_login_email.assert_awaited_once_with(
        SAMPLE_EMAIL, SAMPLE_PASSPHRASE
    )

    assert res.status_code == 303
    assert res.headers["location"] == "/guest-login?email=beaver%40caltech.edu"
    assert res.headers["Set-Cookie"].startswith("guest_confirmation=abcdef;")


@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_requesting_login_when_previous_key_exists_causes_429(
    mock_get_existing_key: AsyncMock,
) -> None:
    """Test that requesting to log in as guest when the user has an existing,
    unexpired key causes status 429."""

    mock_get_existing_key.return_value = "some-existing-key"
    res = client.post("/login", data=SAMPLE_LOGIN_DATA)
    assert res.status_code == 429


@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_successful_guest_verification_provides_identity(
    mock_get_existing_key: AsyncMock,
) -> None:
    """Test a guest successfully verifying guest credentials."""
    mock_get_existing_key.return_value = "some-confirmation" + SAMPLE_PASSPHRASE

    res = client.post(
        "/verify",
        data={"email": SAMPLE_EMAIL, "passphrase": SAMPLE_PASSPHRASE},
        cookies={"guest_confirmation": "some-confirmation"},
        follow_redirects=False,
    )

    assert res.status_code == 303
    assert res.headers["Set-Cookie"].startswith("hackuci_auth=")


@patch("auth.guest_auth._get_existing_key", autospec=True)
def test_invalid_guest_verification_is_unauthorized(
    mock_get_existing_key: AsyncMock,
) -> None:
    """Test that a guest with invalid credentials is unauthorized."""
    mock_get_existing_key.return_value = "some-existing-key"

    res = client.post(
        "/verify",
        data={"email": SAMPLE_EMAIL, "passphrase": "bad-passphrase"},
        cookies={"guest_confirmation": "not-a-confirmation"},
    )

    assert res.status_code == 401
