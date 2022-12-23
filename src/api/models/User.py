from pydantic import BaseModel


class User(BaseModel):
    first_name: str = ""
    last_name: str = ""
    email: str = ""
    gender: str = ""
    pronouns: str = ""
    ethnicity: str = ""
    is_18_older: bool = True
    curr_education: str = ""
    school_name: str = ""
    major: str = ""
    is_first_hackathon: bool = True
    portfolio_link: str = ""
    linkedin_link: str = ""
    stress_relief_question: str = ""
    company_specialize_question: str = ""
