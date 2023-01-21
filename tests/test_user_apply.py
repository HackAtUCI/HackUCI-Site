from datetime import datetime
from unittest.mock import AsyncMock, Mock, patch

from aiogoogle import HTTPError
from fastapi import FastAPI

from auth.user_identity import NativeUser, UserTestClient
from models.ApplicationData import ProcessedApplicationData
from routers import user
from services.mongodb_handler import Collection
from utils import resume_handler
from utils.user_record import Applicant

USER_PKFIRE = NativeUser(
    ucinetid="pkfire",
    display_name="pkfire",
    email="pkfire@uci.edu",
    affiliations=["pkfire"],
)

SAMPLE_APPLICATION = {
    "first_name": "pk",
    "last_name": "fire",
    "email": "pkfire@uci.edu",
    "gender": "Other",
    "pronouns": ["pk"],
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

EXPECTED_RESUME_UPLOAD = ("pk-fire-69f2afc2.pdf", b"resume", "application/pdf")
SAMPLE_RESUME_URL = "https://drive.google.com/file/d/..."
SAMPLE_SUBMISSION_TIME = datetime(2023, 1, 12, 8, 1, 21)

EXPECTED_APPLICATION_DATA = ProcessedApplicationData(
    **SAMPLE_APPLICATION,
    resume_url=SAMPLE_RESUME_URL,
    submission_time=SAMPLE_SUBMISSION_TIME,
)

EXPECTED_APPLICATION_DATA_WITHOUT_RESUME = ProcessedApplicationData(
    **SAMPLE_APPLICATION, resume_url=None, submission_time=SAMPLE_SUBMISSION_TIME
)

EXPECTED_USER = Applicant(
    _id="edu.uci.pkfire",
    status="PENDING_REVIEW",
    application_data=EXPECTED_APPLICATION_DATA,
)

EXPECTED_USER_WITHOUT_RESUME = Applicant(
    _id="edu.uci.pkfire",
    application_data=EXPECTED_APPLICATION_DATA_WITHOUT_RESUME,
    status="PENDING_REVIEW",
)

resume_handler.RESUMES_FOLDER_ID = "RESUMES_FOLDER_ID"

app = FastAPI()
app.include_router(user.router)

client = UserTestClient(USER_PKFIRE, app)


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("routers.user.datetime", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_successfully(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_datetime: Mock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that a valid application is submitted properly."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_datetime.now.return_value = SAMPLE_SUBMISSION_TIME
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_gdrive_handler_upload_file.assert_awaited_once_with(
        resume_handler.RESUMES_FOLDER_ID, *EXPECTED_RESUME_UPLOAD
    )
    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS, {"_id": EXPECTED_USER.uid}, EXPECTED_USER.dict(), upsert=True
    )
    mock_send_application_confirmation_email.assert_awaited_once_with(
        EXPECTED_APPLICATION_DATA
    )
    assert res.status_code == 201


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_invalid_data_causes_422(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that applying with invalid data is unprocessable."""
    bad_application = SAMPLE_APPLICATION.copy()
    bad_application["email"] = "not-an-email"
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
    mock_mongodb_handler_retrieve_one.return_value = {
        "_id": "edu.uci.pkfire",
        "status": "pending review",
    }
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
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_user_insert_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that an issue with inserting a user into MongoDB causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_mongodb_handler_update_one.side_effect = RuntimeError
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_mongodb_handler_update_one.assert_awaited_once()
    mock_send_application_confirmation_email.assert_not_called()
    assert res.status_code == 500


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_with_confirmation_email_issue_causes_500(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that an issue with sending the confirmation email causes status 500."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_gdrive_handler_upload_file.return_value = SAMPLE_RESUME_URL
    mock_send_application_confirmation_email.side_effect = RuntimeError
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=SAMPLE_FILES)

    mock_mongodb_handler_update_one.assert_awaited_once()
    mock_send_application_confirmation_email.assert_awaited_once()
    assert res.status_code == 500


@patch("utils.email_handler.send_application_confirmation_email", autospec=True)
@patch("services.mongodb_handler.update_one", autospec=True)
@patch("routers.user.datetime", autospec=True)
@patch("services.gdrive_handler.upload_file", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_apply_successfully_without_resume(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_gdrive_handler_upload_file: AsyncMock,
    mock_datetime: Mock,
    mock_mongodb_handler_update_one: AsyncMock,
    mock_send_application_confirmation_email: AsyncMock,
) -> None:
    """Test that a valid application is submitted properly without a resume."""
    mock_mongodb_handler_retrieve_one.return_value = None
    mock_datetime.now.return_value = SAMPLE_SUBMISSION_TIME
    res = client.post("/apply", data=SAMPLE_APPLICATION, files=None)

    mock_gdrive_handler_upload_file.assert_not_called()
    mock_mongodb_handler_update_one.assert_awaited_once_with(
        Collection.USERS,
        {"_id": EXPECTED_USER.uid},
        EXPECTED_USER_WITHOUT_RESUME.dict(),
        upsert=True,
    )
    mock_send_application_confirmation_email.assert_awaited_once_with(
        EXPECTED_APPLICATION_DATA_WITHOUT_RESUME
    )
    assert res.status_code == 201
