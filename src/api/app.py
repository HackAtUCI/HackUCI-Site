import logging

from fastapi import FastAPI

from routers import guest, saml, user

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.include_router(guest.router, prefix="/guest", tags=["guest"])
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(saml.router, prefix="/saml", tags=["saml"])


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "hello"}
