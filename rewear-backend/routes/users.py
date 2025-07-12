from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# 🧠 In-memory fake DB (just for testing/demo)
fake_users_db = {}

# 📦 Request model for Firebase-authenticated users
class FirebaseUser(BaseModel):
    email: str

# 🔐 Firebase login route
@router.post("/login-firebase")
def login_with_firebase(user: FirebaseUser):
    email = user.email
    if email not in fake_users_db:
        fake_users_db[email] = {
            "email": email,
            "role": "admin" if email == "admin@example.com" else "user"
        }
    return {
        "status": "success",
        "user": fake_users_db[email]
    }
