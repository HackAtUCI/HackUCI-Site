import os
from typing import Union

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.results import InsertOneResult, UpdateResult

MONGO_URI = os.getenv("MONGO_URI")
MONGO_CLIENT = AsyncIOMotorClient(MONGO_URI)
DB = MONGO_CLIENT["hackuci"]


async def insert_user(
    collection: str, user_data: dict[str, object]
) -> Union[str, bool]:
    """Insert a user's application into the specified collection of the database"""
    COLLECTION = DB[collection]
    result: InsertOneResult = await COLLECTION.insert_one(user_data)
    if not result.acknowledged:
        return False
    new_user_id: str = result.inserted_id
    return new_user_id


async def retrieve_users(
    collection: str, query: dict[str, object], fields: list[str] = []
) -> list[dict[str, object]]:
    """Search for and retrieve the specified fields of all users' applications
    (if any exist) that satisfy the provided query."""
    COLLECTION = DB[collection]

    result = COLLECTION.find(query, fields)
    output: list[dict[str, object]] = await result.to_list(length=None)
    return output


async def update_users(
    collection: str, query: dict[str, object], new_data: dict[str, object]
) -> bool:
    """Search for and update a user's application (if it exists) iusing the provided
    query data."""
    COLLECTION = DB[collection]
    result: UpdateResult = await COLLECTION.update_many(query, {"$set": new_data})
    return result.acknowledged and result.modified_count > 0
