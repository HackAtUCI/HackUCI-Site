import json
import os

import aiogoogle
from aiogoogle.auth.creds import ServiceAccountCreds
from aiogoogle.models import MediaUpload

GOOGLE_DRIVE_URL = "https://drive.google.com/file/d/"
UPLOAD_URL = (
    "https://www.googleapis.com/upload/drive/v3/files?fields=id&supportsAllDrives=True"
)


def _get_credentials() -> ServiceAccountCreds:
    service_account_file = os.getenv("SERVICE_ACCOUNT_FILE")
    if service_account_file:
        service_account_key = json.load(open(service_account_file))
    else:
        raise Exception("Service account credentials not found")

    return ServiceAccountCreds(
        scopes=["https://www.googleapis.com/auth/drive"], **service_account_key
    )


async def upload_file(
    folder_id: str, file_name: str, file_bytes: bytes, file_type: str
) -> str:
    """Use the aiogoogle library to upload the provided file to the folder with
    the given `folder_id` and return a URL to the uploaded file."""
    creds = _get_credentials()
    async with aiogoogle.Aiogoogle(service_account_creds=creds) as ag:
        drive_v3 = await ag.discover("drive", "v3")

        # Create request object:
        # Set the file name to be the name of the uploaded file and set its upload
        # destination to be in the folder with ID `RESUME_FOLDER_ID`.
        req = drive_v3.files.create(
            fields="id",
            json={"name": file_name, "parents": [folder_id]},
        )

        # Bytes can be directly uploaded to Google Drive by creating a MediaUpload
        # object, setting its upload path to be the endpoint of the appropriate
        # Google Drive API, and attaching it to the above request object.
        req.media_upload = MediaUpload(
            file_bytes,
            upload_path=UPLOAD_URL,
            mime_range=["*/*"],
            multipart=True,
        )

        # Manually set the content type to the type FastAPI provides, so that the
        # Google Drive API doesn't need to.
        req.upload_file_content_type = file_type

        # Upload file
        uploaded_file: dict[str, str] = await ag.as_service_account(req)
        file_id: str = uploaded_file["id"]

        return GOOGLE_DRIVE_URL + file_id
