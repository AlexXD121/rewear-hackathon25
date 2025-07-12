from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # For serving static files

from routes import items, users, admin, swap

app = FastAPI(
    title="ReWear API",
    description="Backend API for ReWear - Community Clothing Exchange Platform",
    version="1.0.0",
)

# CORS Middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files as static from /uploads URL path
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Route registrations
app.include_router(items.router, prefix="/items", tags=["Items"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.include_router(swap.router, prefix="/swap", tags=["Swap"])

# Root health check endpoint
@app.get("/", tags=["Root"])
async def home():
    return {
        "status": "success",
        "message": "🔁 ReWear backend is running successfully ✅",
        "version": "1.0.0",
        "documentation": "/docs",
    }
