import asyncio
from unittest.mock import AsyncMock, MagicMock, patch

from services import gdrive_handler

SAMPLE_NAME = "my-file-name"
SAMPLE_FOLDER_ID = "my-folder-id"
SAMPLE_BYTES = b"my-bytes"
SAMPLE_FILE_TYPE = "my-file-type"
SAMPLE_OUTPUT_ID = "12345"


@patch("services.gdrive_handler._get_credentials")
@patch("aiogoogle.Aiogoogle.as_service_account")
async def test_upload_single_file(
    mock_asServiceAccount: AsyncMock, mock_getCredentials: MagicMock
) -> None:
    """Test whether the Request object sent to the Google Drive API
    is generated properly."""
    mock_getCredentials.return_value = None
    mock_asServiceAccount.return_value = {"id": SAMPLE_OUTPUT_ID}

    output = await gdrive_handler.upload_file(
        SAMPLE_FOLDER_ID, SAMPLE_NAME, SAMPLE_BYTES, SAMPLE_FILE_TYPE
    )

    mock_asServiceAccount.assert_called_once()

    asServiceAccount_args = mock_asServiceAccount.call_args.args[0]
    assert asServiceAccount_args.method == "POST"
    assert (
        asServiceAccount_args.url
        == "https://www.googleapis.com/drive/v3/files?fields=id"
    )
    assert (
        asServiceAccount_args.batch_url == "https://www.googleapis.com/batch/drive/v3"
    )
    assert asServiceAccount_args.json == {
        "name": SAMPLE_NAME,
        "parents": [SAMPLE_FOLDER_ID],
    }
    assert asServiceAccount_args.media_upload.file_body == SAMPLE_BYTES
    assert asServiceAccount_args.upload_file_content_type == SAMPLE_FILE_TYPE
    assert output == gdrive_handler.GOOGLE_DRIVE_URL + SAMPLE_OUTPUT_ID

    # Add one second sleep time to avoid RuntimeError being thrown due to
    # async event loop being closed.
    await asyncio.sleep(1)
