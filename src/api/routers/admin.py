from logging import getLogger
from typing import Optional

from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import ValidationError, parse_obj_as

from auth.authorization import require_role
from auth.user_identity import User, utc_now
from models.ApplicationData import Decision, Review
from services import mongodb_handler
from services.mongodb_handler import Collection
from utils.user_record import Applicant, Role

log = getLogger(__name__)

router = APIRouter()

ADMIN_ROLES = (Role.DIRECTOR, Role.REVIEWER)


@router.get("/applicants")
async def applicants(
    user: User = Depends(require_role(ADMIN_ROLES)),
) -> list[Applicant]:
    """Get records of all applicants."""
    log.info("%s requested applicants", user)

    records: list[dict[str, object]] = await mongodb_handler.retrieve(
        Collection.USERS, {"role": Role.APPLICANT}
    )

    try:
        return parse_obj_as(list[Applicant], records)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data.")


@router.get("/applicant/{uid}")
async def applicant(
    uid: str,
    admin: User = Depends(require_role(ADMIN_ROLES)),
) -> Applicant:
    """Get record of an applicant by uid."""
    record: Optional[dict[str, object]] = await mongodb_handler.retrieve_one(
        Collection.USERS, {"_id": uid, "role": Role.APPLICANT}
    )

    if not record:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    try:
        return Applicant.parse_obj(record)
    except ValidationError:
        raise RuntimeError("Could not parse applicant data.")


@router.post("/review")
async def submit_review(
    applicant: str = Body(),
    decision: Decision = Body(),
    reviewer: User = Depends(require_role([Role.REVIEWER])),
) -> None:
    """Submit a review decision from the reviewer for the given applicant."""
    log.info("%s reviewed applicant %s", reviewer, applicant)

    review: Review = (utc_now(), reviewer.uid, decision)

    try:
        await mongodb_handler.raw_update_one(
            Collection.USERS,
            {"_id": applicant},
            {
                "$push": {"application_data.reviews": review},
                "$set": {"status": "REVIEWED"},
            },
        )
    except RuntimeError:
        log.error("Could not submit review for %s", applicant)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
