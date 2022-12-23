from fastapi import FastAPI

import routers.user

app = FastAPI()
app.include_router(routers.user.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "hello"}
