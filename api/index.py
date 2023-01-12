from fastapi import FastAPI

from app import app as api

app = FastAPI()

app.mount("/api", api)
