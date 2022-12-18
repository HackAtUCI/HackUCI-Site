from fastapi import APIRouter

router = APIRouter()


@router.get("/{user}")
async def get_user(user: str) -> str:
    """Says hello to the user"""
    return f"Hello {user}"
