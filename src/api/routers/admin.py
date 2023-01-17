from logging import getLogger

from fastapi import APIRouter, Depends

from auth.authorization import require_role
from auth.user_identity import User
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
