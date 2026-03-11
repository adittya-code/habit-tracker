# 📋 Habit Tracker — Setup & Deploy Guide

## Step 1 — Set up Firebase (for cross-device sync)

1. Go to **https://console.firebase.google.com**
2. Click **Add project** → give it a name → Create
3. In your project, click **</>** (Web app) → Register app
4. Copy the `firebaseConfig` values shown
5. Open `src/firebase.js` and paste your values in
6. In Firebase console → **Firestore Database** → **Create database** → choose **Start in test mode** → Done

---

## Step 2 — Deploy to Vercel

### Option A — Using Vercel CLI (recommended)
```bash
npm install -g vercel
cd habit-tracker
npm install
vercel
```
Follow the prompts. Your app will be live at a URL like `https://habit-tracker-xyz.vercel.app`

### Option B — Using Vercel Dashboard
1. Push this folder to a **GitHub repo**
2. Go to **https://vercel.com** → New Project
3. Import your GitHub repo
4. Click **Deploy** — done!

---

## Customizing Your Habits

Open `src/habits.js` and edit the `HABITS` array:

```js
{ id: "my_habit",  name: "Your habit name",  goal: 20,  icon: "🎯",  color: "#7C3AED" }
```

- **id** — unique key (no spaces, use underscores)
- **name** — displayed in the tracker
- **goal** — days per month target
- **icon** — any emoji
- **color** — any hex color for accent

---

## Features

- ✅ Tap any cell to mark done, tap again to unmark
- 📅 Navigate between months with ‹ › arrows
- 🔥 Streak counter per habit
- 📊 % completion with color coding
- 💾 Syncs across all devices via Firebase
- 📱 Works on mobile and desktop
- 🌙 Dark theme
