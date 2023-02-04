# Backend API

## Deployment Configuration

For deployment, the following environment variables need to be set

- `PYTHONPATH=src/api` to properly import Python modules
- `SP_KEY`, the private key for SAML authentication
- `MONGODB_URI`, the URI to connect to the MongoDB cluster
- `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`, the credentials to authenticate as a Google Cloud service account
- `RESUMES_FOLDER_ID`, the folder ID of the Google Drive folder for resume uploads
- `SENDGRID_API_KEY`, the API key to authenticate with SendGrid
- `JWT_KEY`, the secret key used to sign JWTs

For staging, the following environment variables should also be set

- `DEPLOYMENT=STAGING`
