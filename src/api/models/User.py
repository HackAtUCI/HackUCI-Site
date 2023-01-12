from pydantic import Field

from services.mongodb_handler import BaseRecord

from .ApplicationData import ProcessedApplicationData


class UserRecord(BaseRecord):
    uid: str = Field(alias="_id")
    role: str

    class Config:
        anystr_strip_whitespace = True
        max_anystr_length = 254


class Applicant(UserRecord):
    role: str = "applicant"
    # TODO: enumerate status
    status: str
    application_data: ProcessedApplicationData
