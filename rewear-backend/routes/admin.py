# routes/admin.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
def admin_ping():
    return {"msg": "Admin router working ✅"}
