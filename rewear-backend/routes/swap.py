from fastapi import APIRouter

router = APIRouter()

# Example route
@router.get("/")
def get_swaps():
    return {"message": "Swap endpoint working ✅"}
