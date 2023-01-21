from unittest.mock import ANY, AsyncMock, patch

from fastapi import FastAPI

from auth.user_identity import NativeUser, UserTestClient
from models.ApplicationData import Decision
from routers import admin
from services.mongodb_handler import Collection

USER_ICSSC = NativeUser(
    ucinetid="icssc",
    display_name="ICSSC",
    email="icssc@uci.edu",
    affiliations=["group"],
)

USER_REVIEWER = NativeUser(
    ucinetid="alicia",
    display_name="Alicia",
    email="alicia@uci.edu",
    affiliations=["student"],
)

app = FastAPI()
app.include_router(admin.router)

reviewer_client = UserTestClient(USER_REVIEWER, app)


@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_restricted_admin_route_is_forbidden(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that an admin route is forbidden to an unauthorized user."""
    unauthorized_client = UserTestClient(USER_ICSSC, app)

    mock_mongodb_handler_retrieve_one.return_value = {
        "_id": "edu.uci.icssc",
        "role": "mentor",
    }
    res = unauthorized_client.get("/applicants")

    mock_mongodb_handler_retrieve_one.assert_awaited_once()
    assert res.status_code == 403


@patch("services.mongodb_handler.raw_update_one", autospec=True)
@patch("services.mongodb_handler.retrieve_one", autospec=True)
def test_can_submit_review(
    mock_mongodb_handler_retrieve_one: AsyncMock,
    mock_mongodb_handler_raw_update_one: AsyncMock,
) -> None:
    """Test that a user can properly submit an applicant review."""

    mock_mongodb_handler_retrieve_one.return_value = {
        "_id": "edu.uci.alicia",
        "role": "reviewer",
    }
    res = reviewer_client.post(
        "/review",
        json={"applicant": "edu.uci.applicant", "decision": Decision.ACCEPTED},
    )

    mock_mongodb_handler_retrieve_one.assert_awaited_once()
    mock_mongodb_handler_raw_update_one.assert_awaited_once_with(
        Collection.USERS,
        {"_id": "edu.uci.applicant"},
        {
            "$push": {
                "application_data.reviews": (ANY, "edu.uci.alicia", Decision.ACCEPTED)
            },
            "$set": {"status": "REVIEWED"},
        },
    )
    assert res.status_code == 200
