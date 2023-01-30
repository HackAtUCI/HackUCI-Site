from enum import Enum
from typing import Union

from pydantic import Field

from models.ApplicationData import Decision, ProcessedApplicationData
from services.mongodb_handler import BaseRecord


class Role(str, Enum):
    APPLICANT = "applicant"
    DIRECTOR = "director"
    HACKER = "hacker"
    MENTOR = "mentor"
    REVIEWER = "reviewer"
    TECH_ORGANIZER = "tech_organizer"
    VOLUNTEER = "volunteer"


class Status(str, Enum):
    PENDING_REVIEW = "PENDING_REVIEW"
    REVIEWED = "REVIEWED"


class UserRecord(BaseRecord):
    uid: str = Field(alias="_id")
    role: Role

    class Config:
        anystr_strip_whitespace = True
        max_anystr_length = 254


class Applicant(UserRecord):
    role = Role.APPLICANT
    status: Union[Status, Decision]
    application_data: ProcessedApplicationData
