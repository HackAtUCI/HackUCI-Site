import logging

import uvicorn

logging.basicConfig(level=logging.INFO)

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        log_level="info",
        access_log=True,
        use_colors=True,
        reload=True,
    )
