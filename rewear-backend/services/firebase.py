import firebase_admin
from firebase_admin import credentials, firestore, storage

cred = credentials.Certificate("firebase-service-account.json")  # Path sahi dena agar yeh file kisi aur jagah hai
firebase_admin.initialize_app(cred, {
    'storageBucket': 'rewear-9c12c.appspot.com'
})

db = firestore.client()
bucket = storage.bucket()
