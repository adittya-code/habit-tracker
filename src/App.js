import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  OAuthProvider
} from "firebase/auth";

import { db, auth, googleProvider } from "./firebase";
import { HABITS as DEFAULT_HABITS } from "./habits";
import "./App.css";

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const DAYS_SHORT = ["S","M","T","W","T","F","S"];

function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function docId(uid, y, m) { return `${uid}_${y}_${String(m+1).padStart(2,"0")}`; }

export default function App() {
  const now = new Date();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔥 NEW AUTH STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [habits, setHabits] = useState(DEFAULT_HABITS);

  const days = daysInMonth(year, month);

  // AUTH LISTENER
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // 🔥 EMAIL LOGIN
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔥 PHONE AUTH
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible"
      });
    }
  }, []);

  const sendOTP = async () => {
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmation(result);
      alert("OTP sent");
    } catch (err) {
      alert(err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
    } catch {
      alert("Invalid OTP");
    }
  };

  // 🔥 APPLE LOGIN
  const appleProvider = new OAuthProvider("apple.com");

  const handleAppleLogin = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= AUTH UI =================
  if (authLoading) return <div className="auth-screen"><div className="spinner" /></div>;

  if (!user) return (
    <div className="auth-screen">
      <div className="auth-card">

        <div className="auth-icon">◈</div>
        <h1 className="auth-title">Habit Tracker</h1>
        <p className="auth-sub">Track your daily habits beautifully</p>

        {/* EMAIL */}
        <input className="auth-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="auth-input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />

        <div className="auth-row">
          <button className="auth-btn" onClick={handleEmailLogin}>Login</button>
          <button className="auth-btn outline" onClick={handleSignup}>Signup</button>
        </div>

        {/* PHONE */}
        <input className="auth-input" placeholder="+91XXXXXXXXXX" value={phone} onChange={e=>setPhone(e.target.value)} />
        <button className="auth-btn" onClick={sendOTP}>Send OTP</button>

        <input className="auth-input" placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
        <button className="auth-btn" onClick={verifyOTP}>Verify OTP</button>

        {/* GOOGLE */}
        <button className="google-btn" onClick={() => signInWithPopup(auth, googleProvider)}>
          Continue with Google
        </button>

        {/* APPLE */}
        <button className="auth-btn black" onClick={handleAppleLogin}>
          Continue with Apple
        </button>

        <div id="recaptcha-container"></div>

      </div>
    </div>
  );

  // ================= MAIN APP =================
  return (
    <div className="app">
      <button onClick={() => signOut(auth)}>Sign out</button>
      <h1>Logged in as {user.email || user.phoneNumber}</h1>
    </div>
  );
}
