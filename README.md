
Problem Statement 3:-   
ReWear – Community Clothing Exchange 
Overview: 
Develop ReWear, a web-based platform that enables users to exchange unused clothing 
through direct swaps or a point-based redemption system. The goal is to promote sustainable 
fashion and reduce textile waste by encouraging users to reuse wearable garments instead of 
discarding them. 



♻️ ReWear - Community Clothing Exchange Platform

Hi 👋  
Welcome to ReWear, a platform where users can exchange clothes with others in their community.  
This project was built with love during Hackathon 2025. 🚀

------------------------------------------------------------

📁 Project Structure

ReWear/
├── rewear-frontend/    --> Frontend (React + Tailwind)
└── rewear-backend/     --> Backend (FastAPI)

------------------------------------------------------------

🚀 How to Run the Project

Follow the steps below to run the frontend and backend locally on your system.

------------------------------------------------------------

🧠 Requirements

- Node.js version 18 or above
- Python 3.10 or above
- pip package manager (comes with Python)
- Firebase project and Service Account Key (JSON)

------------------------------------------------------------

🔧 Backend Setup (FastAPI)

Step 1: Go to the backend folder
> cd rewear-backend

Step 2: Create virtual environment
> python -m venv venv
> venv\Scripts\activate    (Use this command for Windows)

Step 3: Install dependencies
> pip install -r requirements.txt

Step 4: Add Firebase key file
- Save your Firebase JSON file as:
  rewear-backend/firebase-service-account.json
- (IMPORTANT: Don't upload this file to GitHub!)

Step 5: Run the backend server
> uvicorn main:app --reload

- Your API will run at: http://127.0.0.1:8000
- API Docs available at: http://127.0.0.1:8000/docs

------------------------------------------------------------

🖼️ Frontend Setup (React + Vite)

Step 1: Go to frontend folder
> cd rewear-frontend

Step 2: Install frontend dependencies
> npm install

Step 3: Run the development server
> npm run dev

- App will run at: http://localhost:5173

------------------------------------------------------------

🛡️ Security Note

- Do not upload firebase-service-account.json file to GitHub.
- Make sure it is listed in your .gitignore file.

------------------------------------------------------------

❤️ Built with Passsion

Created during Hackathon 2025  
By: The Optimizers
GitHub Repo: https://github.com/AlexXD121/rewear-hackathon25

video link :- https://youtu.be/gua9g8OKcF8

