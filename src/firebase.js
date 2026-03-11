// src/firebase.js
// ─────────────────────────────────────────────────────────────
//  REPLACE the values below with your own Firebase project config
//  Steps:
//  1. Go to https://console.firebase.google.com
//  2. Create a new project (free)
//  3. Add a Web App  (</>)
//  4. Copy the firebaseConfig object values into here
//  5. In Firebase console → Firestore Database → Create database (test mode)
// ─────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyDor1fQ88nkI6jweCPfwgvEIfPOsvAMq5Y",
  authDomain:        "habit-tracker-ce253.firebaseapp.com",
  projectId:         "habit-tracker-ce253",
  storageBucket:     "habit-tracker-ce253.firebasestorage.app",
  messagingSenderId: "970510348843",
  appId:             "1:970510348843:web:5dd99a1eb0b938c5c8306e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
