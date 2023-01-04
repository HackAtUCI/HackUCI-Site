from pydantic import BaseModel

from .ApplicationData import ApplicationData


class User(BaseModel):
    application_data: ApplicationData
    # TODO: enumerate status
    status: str

    class Config:
        anystr_strip_whitespace = True
        max_anystr_length = 254
