from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_get_root_returns_hello() -> None:
    """Tests that root returns hello message"""
    res = client.get("/")
    assert res.status_code == 200
    assert res.json() == {"message": "hello"}
