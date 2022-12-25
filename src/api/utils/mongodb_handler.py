import os
from typing import Union

from bson import ObjectId
from bson.errors import InvalidId
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCursor
from pymongo.results import InsertOneResult, UpdateResult

MONGO_URI = os.getenv("MONGO_URI")
MONGO_CLIENT = AsyncIOMotorClient(MONGO_URI)
DB = MONGO_CLIENT["hackuci"]
USERS = DB["users"]


async def insert_user(user_data: dict[str, object]) -> Union[ObjectId, bool]:
    """Insert a user's application into the database"""
    result: InsertOneResult = await USERS.insert_one(user_data)
    if not result.acknowledged:
        return False
    new_user_id: ObjectId = result.inserted_id
    return new_user_id


async def retrieve_users(
    query: dict[str, object], fields: list[str] = []
) -> list[dict[str, object]]:
    """Search for and retrieve the specified fields of all users' applications
    (if any exist) that satisfy the provided query."""

    if not _modify_query(query):
        return []

    output = []
    user_data: AsyncIOMotorCursor = USERS.find(query, fields)

    # The value associated with `_id` keys is of type ObjectId, which is not
    # processable by FastAPI (throws an error). Convert each ObjectId to a str.
    for doc in await user_data.to_list(length=None):
        doc["_id"] = str(doc["_id"])
        output.append(doc)

    if not output:
        return []

    return output


async def update_users(query: dict[str, object], new_data: dict[str, object]) -> bool:
    """Search for and update a user's application (if it exists) iusing the provided
    query data."""
    if not _modify_query(query):
        return False
    result: UpdateResult = await USERS.update_many(query, {"$set": new_data})
    return result.acknowledged and result.modified_count > 0


def _modify_query(query: dict[str, object]) -> bool:
    """If the `_id` key exists in the query dictionary, convert its corresponding
    value to an ObjectId. If conversion fails, return False."""
    try:
        if "_id" in query:
            query["_id"] = ObjectId(str(query["_id"]))
        return True
    except InvalidId:
        return False
