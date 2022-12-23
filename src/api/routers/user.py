from fastapi import APIRouter, Response, status

import utils.mongodb_handler as db

router = APIRouter()


@router.post("/create-user", status_code=status.HTTP_201_CREATED)
async def create_user(data: dict[str, object], response: Response) -> None:
    """Insert the provided data into the database. If the insertion fails,
    then set the response to be `400 Bad Request`. Otherwise, it will be
    `201 Created` by default."""
    result = db.insert_user(data)
    if not result:
        response.status_code = status.HTTP_400_BAD_REQUEST


@router.post("/read-users", status_code=status.HTTP_200_OK)
async def read_users(
    query: dict[str, object], response: Response, fields: list[str] = []
) -> list[dict[str, object]]:
    """Fetch the requested fields of the users that satisfy the given query
    from the database. If such a user does not exist, then set the response
    to be `404 Not Found`. Otherwise, it will be `200 OK` by default."""
    result = db.retrieve_users(query, fields)
    if not result:
        response.status_code = status.HTTP_404_NOT_FOUND
    return result


@router.post("/edit-users/", status_code=status.HTTP_200_OK)
async def edit_users(
    query: dict[str, object], data: dict[str, object], response: Response
) -> None:
    """Update the users that satisfy the given query with the provided data.
    If the query fails or if nothing was updated, set the response to be
    `404 Not Found`. Otherwise, it will be `200 OK` by default."""
    result = db.update_users(query, data)
    if not result:
        response.status_code = status.HTTP_404_NOT_FOUND
