// src/firebase.js

// 🧩 Core Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🚀 Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAQ-v4RtwPfKT9jajO55r-jvp03V_E0T8g",
  authDomain: "rewear-9c12c.firebaseapp.com",
  projectId: "rewear-9c12c",
  storageBucket: "rewear-9c12c.appspot.com", // 🔧 Fixed domain: it should be .appspot.com
  messagingSenderId: "284097167956",
  appId: "1:284097167956:web:9026bf6207516ebbe2a3c1",
  measurementId: "G-L4ESLDK3KQ"
};

// 🔧 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔍 Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // for image upload
export const analytics = getAnalytics(app);

export default app;
