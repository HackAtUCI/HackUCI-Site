from enum import Enum

from pydantic import Field

from models.ApplicationData import ProcessedApplicationData
from services.mongodb_handler import BaseRecord


class Role(str, Enum):
    APPLICANT = "applicant"
    DIRECTOR = "director"
    HACKER = "hacker"
    MENTOR = "mentor"
    REVIEWER = "reviewer"
    TECH_ORGANIZER = "tech_organizer"
    VOLUNTEER = "volunteer"


class UserRecord(BaseRecord):
    uid: str = Field(alias="_id")
    role: Role

    class Config:
        anystr_strip_whitespace = True
        max_anystr_length = 254


class Applicant(UserRecord):
    role = Role.APPLICANT
    # TODO: enumerate status
    status: str
    application_data: ProcessedApplicationData
