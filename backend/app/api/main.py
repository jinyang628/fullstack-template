import logging
from contextlib import asynccontextmanager
import os
from fastapi import FastAPI, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routers.v1 import router as v1_router

logging.basicConfig(
    level=logging.INFO,
    format="%(name)s - %(message)s",
)
logging.getLogger("httpx").setLevel(logging.WARNING)
log = logging.getLogger(__name__)
log.addHandler(logging.StreamHandler())


raw_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Entry point lifecycle event. Runs before the server starts"""
    try:
        log.info("Starting up server...")
        yield
    except Exception as e:
        log.exception("Failed to initialize Raise and Rage server: %s", e)
        raise e
    finally:
        log.info("Shutting down server...")


def create_app() -> FastAPI:
    """Create FastAPI app with all routes."""
    try:
        app = FastAPI(lifespan=lifespan, debug=True)

        # Add Frontend URL in the environment variable ALLOWED_ORIGINS
        log.warning(f"Allowed origins: {allowed_origins}")
        app.add_middleware(
            CORSMiddleware,
            allow_origins=allowed_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        app.include_router(v1_router)
        # Add other versioned routers in the future here

        @app.exception_handler(RequestValidationError)
        async def validation_exception_handler(request, exc: RequestValidationError):
            exc_str = f"{exc}".replace("\n", " ").replace("   ", " ")
            log.error(f"{request}: {exc_str}")

            content = {"status_code": 10422, "message": exc_str, "data": None}
            return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

        return app
    except Exception as e:
        log.exception("Failed to create backend server: %s", e)
        raise e


app = create_app()
