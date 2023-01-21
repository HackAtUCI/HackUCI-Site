import asyncio
import os
from enum import Enum
from logging import getLogger
from typing import Any, Mapping, Optional, Union

from bson import CodecOptions
from motor.core import AgnosticCollection, AgnosticDatabase
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from pymongo.results import InsertOneResult, UpdateResult

log = getLogger(__name__)

STAGING_ENV = os.getenv("DEPLOYMENT") == "STAGING"

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_CLIENT = AsyncIOMotorClient(MONGODB_URI)
MONGODB_CLIENT.get_io_loop = asyncio.get_event_loop

DATABASE_NAME = "hackuci" if STAGING_ENV else "hackuci-prod"
DB: AgnosticDatabase = MONGODB_CLIENT[DATABASE_NAME].with_options(
    codec_options=CodecOptions(tz_aware=True)
)


class BaseRecord(BaseModel):
    uid: str = Field(alias="_id")

    def dict(self, *args: Any, **kwargs: Any) -> dict[str, Any]:
        if "by_alias" in kwargs:
            return BaseModel.dict(self, *args, **kwargs)
        return BaseModel.dict(self, by_alias=True, *args, **kwargs)

    class Config:
        allow_population_by_field_name = True


class Collection(str, Enum):
    USERS = "users"
    TESTING = "testing"
    SETTINGS = "settings"


async def insert(
    collection: Collection, data: Mapping[str, object]
) -> Union[str, bool]:
    """Insert a document into the specified collection of the database"""
    COLLECTION: AgnosticCollection = DB[collection.value]
    result: InsertOneResult = await COLLECTION.insert_one(data)
    if not result.acknowledged:
        log.error("MongoDB document insertion was not acknowledged")
        raise RuntimeError("Could not insert document into MongoDB collection")
    new_document_id: str = result.inserted_id
    return new_document_id


async def retrieve_one(
    collection: Collection, query: Mapping[str, object], fields: list[str] = []
) -> Optional[dict[str, Any]]:
    """Search for and retrieve the specified fields of all documents (if any exist)
    that satisfy the provided query."""
    COLLECTION = DB[collection.value]

    result: Optional[dict[str, object]] = await COLLECTION.find_one(query, fields)
    return result


async def retrieve(
    collection: Collection, query: Mapping[str, object], fields: list[str] = []
) -> list[dict[str, object]]:
    """Search for and retrieve the specified fields of a document (if any exist)
    that satisfy the provided query."""
    COLLECTION = DB[collection.value]

    result = COLLECTION.find(query, fields)
    output: list[dict[str, object]] = await result.to_list(length=None)
    return output


async def update_one(
    collection: Collection,
    query: Mapping[str, object],
    new_data: Mapping[str, object],
    *,
    upsert: bool = False,
) -> bool:
    """Search for and set a document's fields using the provided query and data."""
    return await raw_update_one(collection, query, {"$set": new_data}, upsert=upsert)


async def raw_update_one(
    collection: Collection,
    query: Mapping[str, object],
    update: Mapping[str, object],
    *,
    upsert: bool = False,
) -> bool:
    """Search for and update a document using the provided query and raw update."""
    COLLECTION = DB[collection.value]
    result: UpdateResult = await COLLECTION.update_one(query, update, upsert=upsert)
    if not result.acknowledged:
        log.error("MongoDB document update was not acknowledged")
        raise RuntimeError("Could not update documents in MongoDB collection")

    return result.modified_count > 0


async def update(
    collection: Collection, query: Mapping[str, object], new_data: Mapping[str, object]
) -> bool:
    """Search for and update documents (if they exist) using the provided query data."""
    COLLECTION = DB[collection.value]
    result: UpdateResult = await COLLECTION.update_many(query, {"$set": new_data})
    if not result.acknowledged:
        log.error("MongoDB document update was not acknowledged")
        raise RuntimeError("Could not update documents in MongoDB collection")

    return result.modified_count > 0
