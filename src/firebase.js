import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
