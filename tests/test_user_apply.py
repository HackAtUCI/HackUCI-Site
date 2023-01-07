from unittest.mock import AsyncMock, patch

from aiogoogle import HTTPError
from fastapi import FastAPI
from fastapi.testclient import TestClient

from models.ApplicationData import ProcessedApplicationData
from models.User import User
from routers import user
from services.mongodb_handler import Collection
from utils import resume_handler

SAMPLE_APPLICATION = {
    "first_name": "pk",
    "last_name": "fire",
    "email": "pkfire@uci.edu",
    "gender": "Other",
    "pronouns": "pk",
    "ethnicity": "fire",
    "is_18_older": "true",
    "university": "UC Irvine",
    "education_level": "Fifth+ Year Undergraduate",
    "major": "Computer Science",
    "is_first_hackathon": "false",
    "stress_relief_question": "I am pkfire",
    "company_specialize_question": "I am pkfire",
}

SAMPLE_RESUME = ("my-resume.pdf", b"resume", "application/pdf")
SAMPLE_FILES = {"resume": SAMPLE_RESUME}
BAD_RESUME = ("bad-resume.doc", b"resume", "application/msword")
LARGE_RESUME = ("large-resume.pdf", b"resume" * 100_000, "application/pdf")

SAMPLE_RESUME_URL = "https://drive.google.com/file/d/..."

EXPECTED_USER = User(
    application_data=ProcessedApplicationData(
        **SAMPLE_APPLICATION, resume_url=SAMPLE_RESUME_URL
    ),
    status="PENDING_REVIEW",
)

resume_handler.RESUMES_FOLDER_ID = "RESUMES_FOLDER_ID"

app = FastAPI()
app.include_router(user.router)

client = TestClient(app)


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_successfully(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_mongodb_handler_insert: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that a valid application is submitted properly."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_gdrive_handler_upload_file.assert_awaited_once_with(
        resume_handler.RESUMES_FOLDER_ID, *SAMPLE_FILES["resume"]
    )
    mock_mongodb_handler_insert.assert_awaited_once_with(
        Collection.USERS, EXPECTED_USER.dict()
    )
    mock_send_application_confirmation_email.assert_awaited_once_with(EXPECTED_USER)
    assert res.status_code == 201


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_invalid_data_causes_422(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that applying with invalid data is unprocessable."""
    bad_application = {**SAMPLE_APPLICATION, "email": "not-an-email"}
    res = client.post("/apply", data=bad_application, files=SAMPLE_FILES)

    mock_mongodb_handler_retrieve_one.assert_not_called()
    assert res.status_code == 422


@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_when_user_exists_causes_400(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
) -> None:
    """Test that applying when a user already exists causes status 400."""
    mock_mongodb_handler_retrieve_one.return_value = {"_id": "existing"}
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_gdrive_handler_upload_file.assert_not_called()
    assert res.status_code == 400


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_invalid_resume_type_causes_415(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that applying with an invalid resume type is unprocessable."""
    mock_mongodb_handler_retrieve_one.return_value = None
    res = client.post("/apply", data=SAMPLE_APPLICATION, files={"resume": BAD_RESUME})

    assert res.status_code == 415


@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_large_resume_causes_413(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
) -> None:
    """Test that a request with a resume over the size limit causes status 413."""
    mock_mongodb_handler_retrieve_one.return_value = None
    res = client.post("/apply", data=SAMPLE_APPLICATION, files={"resume": LARGE_RESUME})

    mock_gdrive_handler_upload_file.assert_not_called()
    assert res.status_code == 413


@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_resume_upload_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
) -> None:
    """Test that an issue with the resume upload causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.side_effect = HTTPError("Google Drive error")
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    assert res.status_code == 500


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_user_insert_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_mongodb_handler_insert: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that an issue with inserting a user into MongoDB causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_mongodb_handler_insert.side_effect = RuntimeError
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_mongodb_handler_insert.assert_awaited_once()
    mock_send_application_confirmation_email.assert_not_called()
    assert res.status_code == 500


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.insert", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_confirmation_email_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_mongodb_handler_insert: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that an issue with sending the confirmation email causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_send_application_confirmation_email.side_effect = RuntimeError
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_mongodb_handler_insert.assert_awaited_once()
    mock_send_application_confirmation_email.assert_awaited_once_with(EXPECTED_USER)
    assert res.status_code == 500
