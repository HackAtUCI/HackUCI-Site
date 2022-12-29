from fastapi import FastAPI
from fastapi.testclient import TestClient

from routers import user

app = FastAPI()
app.include_router(user.router)

client = TestClient(app)


def test_login_as_uci_redirects_to_saml() -> None:
    """Tests that logging in with UCI email redirects to SAML for UCI SSO"""
    res = client.post("/login", data={"email": "hack@uci.edu"}, follow_redirects=False)
    assert res.status_code == 303
    assert res.headers["location"] == "/api/saml/login"
