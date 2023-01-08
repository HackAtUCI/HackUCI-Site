from datetime import datetime
from unittest.mock import AsyncMock, patch

from pydantic import EmailStr

from auth import guest_auth

SAMPLE_EMAIL = EmailStr("jeff@amazon.com")


@patch("services.mongodb_handler.retrieve_one", autospec=True)
async def test_get_existing_unexpired_key(mock_mongodb_retrieve_one: AsyncMock) -> None:
    """Test that existing, unexpired guest authorization key can be retrieved."""
    iat = datetime(2023, 1, 11)
    exp = datetime(2023, 12, 31)
    mock_mongodb_retrieve_one.return_value = {
        "guest_auth": {"iat": iat, "exp": exp, "key": "some-key"}
    }

    key = await guest_auth._get_existing_key(SAMPLE_EMAIL)
    assert key == "some-key"


@patch("services.mongodb_handler.retrieve_one", autospec=True)
async def test_get_nonexisting_key(mock_mongodb_retrieve_one: AsyncMock) -> None:
    """Test that nonexistent guest authorization key is returned as None."""
    mock_mongodb_retrieve_one.return_value = None

    key = await guest_auth._get_existing_key(SAMPLE_EMAIL)
    assert key is None


@patch("services.mongodb_handler.retrieve_one", autospec=True)
async def test_guest_credentials_invalid_when_no_key(
    mock_mongodb_retrieve_one: AsyncMock,
) -> None:
    """Test that guest credentials are invalid when there is no saved auth key."""
    mock_mongodb_retrieve_one.return_value = None

    verification = await guest_auth.verify_guest_credentials(
        SAMPLE_EMAIL, "some-passphrase", "some-confirmation"
    )
    assert verification is False
