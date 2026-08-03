import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# Ensure backend directory is in the python path to resolve modules correctly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.core.config import settings
from backend.api.endpoints import router as api_router
from backend.utils.exceptions import VeritasProcessingError, veritas_exception_handler, generic_exception_handler

from contextlib import asynccontextmanager
from backend.core.database import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title="VERITAS Article Processing Engine",
    description="The foundational intelligence layer that transforms raw information into structured understanding.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS Origins
cors_origins = [
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
if settings.ENVIRONMENT == "development" or settings.FRONTEND_URL == "*":
    cors_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# HTTP Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    if settings.ENVIRONMENT == "production":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# Exception Handlers
app.add_exception_handler(VeritasProcessingError, veritas_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Root Health Check for Render and Monitoring
@app.get("/health", tags=["Health"], summary="Root Health Check")
async def root_health_check():
    return {"status": "healthy"}

# Include API router
app.include_router(api_router, prefix="/api/v1")

# Include DB routers
from backend.api.users import router as users_router
from backend.api.history import router as history_router
app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(history_router, prefix="/api/v1/history", tags=["History"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
