import logging

from fastapi import FastAPI

from app import app as api

logging.basicConfig(level=logging.INFO, force=True)

app = FastAPI()

app.mount("/api", api)
