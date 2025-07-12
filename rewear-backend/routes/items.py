from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import JSONResponse
import os
import shutil
import uuid
from datetime import datetime

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure folder exists

# Simple in-memory "database"
items_db = []

@router.post("/upload")
async def upload_item(
    title: str = Form(...),
    size: str = Form(...),
    condition: str = Form(...),
    userId: str = Form(...),
    file: UploadFile = Form(...)
):
    try:
        unique_filename = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        image_url = f"/uploads/{unique_filename}"

        item_data = {
            "id": len(items_db) + 1,  # simple incremental ID
            "title": title,
            "size": size,
            "condition": condition,
            "imageUrl": image_url,
            "userId": userId,
            "uploadedAt": datetime.utcnow(),
        }

        items_db.append(item_data)  # save item in memory

        print("Uploaded item data:", item_data)

        return {"status": "success", "message": "Item uploaded successfully!", "imageUrl": image_url}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.get("/admin/items")
async def get_admin_items():
    # Return all uploaded items
    return {"items": items_db}
