from logging import getLogger

from fastapi import APIRouter, Body, Depends, HTTPException, status

from auth.authorization import require_role
from auth.user_identity import User, utc_now
from models.ApplicationData import Decision, Review
from services import mongodb_handler
from services.mongodb_handler import Collection
from utils.user_record import Role

log = getLogger(__name__)

router = APIRouter()

ADMIN_ROLES = (Role.DIRECTOR, Role.REVIEWER)


@router.get("/applicants")
async def applicants(
    user: User = Depends(require_role(ADMIN_ROLES)),
) -> list[dict[str, object]]:
    """Get records of all applicants."""
    log.info("%s requested applicants", user)

    records: list[dict[str, object]] = await mongodb_handler.retrieve(
        Collection.USERS, {"role": Role.APPLICANT}
    )

    return records


@router.post("/review")
async def submit_review(
    applicant: str = Body(),
    decision: Decision = Body(),
    reviewer: User = Depends(require_role([Role.DIRECTOR, Role.REVIEWER])),
) -> None:
    """Submit a review decision from the reviewer for the given applicant."""
    log.info("%s submitted a review for %s", reviewer, applicant)

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
