from logging import getLogger

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from onelogin.saml2.auth import OneLogin_Saml2_Settings

log = getLogger(__name__)

router = APIRouter()


@router.get("/metadata")
async def get_saml_metadata() -> Response:
    """Provides SAML metadata, used when registering service with IdP"""
    saml_settings = OneLogin_Saml2_Settings(custom_base_path="src/api/saml")
    metadata: bytes = saml_settings.get_sp_metadata()

    errors = saml_settings.validate_metadata(metadata)
    if errors:
        log.error(f"Error found on Metadata: {', '.join(errors)}")
        raise HTTPException(500, "Could not prepare SP metadata")

    return Response(metadata, media_type="application/xml")
