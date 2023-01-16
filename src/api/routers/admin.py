from logging import getLogger

from fastapi import APIRouter, Depends, Response, status

from auth.user_identity import User, require_user_identity
from services.mongodb_handler import Collection, retrieve

log = getLogger(__name__)

router = APIRouter()


async def _is_not_authorized(
    user: User = Depends(require_user_identity),
) -> bool:
    if not user:
        return True
    response: list[dict[str, object]] = await retrieve(
        Collection.USERS, {"role": "admin", "_id": user.uid}
    )
    return len(response) > 0


@router.get("/users", status_code=status.HTTP_200_OK)
async def users(
    response: Response, user: User = Depends(require_user_identity)
) -> list[dict[str, object]]:
    log.info(user)

    if _is_not_authorized(user):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return []

    result: list[dict[str, object]] = await retrieve(
        Collection.USERS, {"role": "applicant"}, []
    )
    return result
