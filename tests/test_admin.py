from unittest.mock import AsyncMock, patch

from fastapi import FastAPI
from fastapi.testclient import TestClient

from auth import user_identity
from auth.user_identity import NativeUser
from routers import admin

USER_ICSSC = NativeUser(
    ucinetid="icssc",
    display_name="ICSSC",
    email="icssc@uci.edu",
    affiliations=["group"],
)

app = FastAPI()
app.include_router(admin.router)

client = TestClient(app)


@patch("services.mongodb_handler.retrieve_one", autospec=True)
async def test_restricted_admin_route_is_forbidden(
    mock_mongodb_handler_retrieve_one: AsyncMock,
) -> None:
    """Test that an admin route is forbidden to an unauthorized user."""
    unauthorized_client = TestClient(
        app,
        cookies={"hackuci_auth": user_identity._generate_jwt_token(USER_ICSSC)},
    )

    mock_mongodb_handler_retrieve_one.return_value = {
        "_id": "edu.uci.icssc",
        "role": "mentor",
    }
    res = unauthorized_client.get("/applicants")

    mock_mongodb_handler_retrieve_one.assert_awaited_once()
    assert res.status_code == 403
