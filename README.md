# ◈ Habit Tracker

A beautiful, private daily habit tracker web app built with React + Firebase. Track your habits every day, navigate between months, and sync your data across all your devices.

![Habit Tracker](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react) ![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-square&logo=firebase) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

## ✨ Features

- 🔐 **Google Login** — your data is private, only you can see it
- 📅 **All months forever** — navigate between months with arrow buttons
- ✅ **Tap to check/uncheck** — satisfying click to mark habits done
- 📊 **Progress tracking** — percentage completion per habit with color coding
- 🔥 **Streak counter** — tracks your consecutive days per habit
- ⚙️ **Edit habits** — add, edit, or delete habits anytime via settings icon
- 💾 **Cross-device sync** — data syncs across phone and laptop via Firebase
- 📱 **Installable** — add to home screen on mobile for a native app feel
- 🌙 **Dark theme** — easy on the eyes

## 🚀 Live App

👉 [habit-tracker-lake-seven.vercel.app](https://habit-tracker-lake-seven.vercel.app)

## 🛠 Tech Stack

- **Frontend** — React 18
- **Database** — Firebase Firestore
- **Auth** — Firebase Authentication (Google)
- **Hosting** — Vercel
- **Styling** — Custom CSS with DM Sans font

## 📁 Project Structure

```
habit-tracker/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main app component
│   ├── App.css         # All styles
│   ├── firebase.js     # Firebase config
│   ├── habits.js       # Default habits list
│   └── index.js        # Entry point
├── package.json
└── README.md
```

## ✏️ Customizing Habits

Edit `src/habits.js` to change default habits:

```js
{ id: "my_habit", name: "Your habit", goal: 20, icon: "🎯", color: "#7C3AED" }
```

- **id** — unique key (no spaces)
- **name** — displayed in the tracker
- **goal** — target days per month
- **icon** — any emoji
- **color** — any hex color

You can also add/edit/delete habits directly in the app via the ⚙️ settings icon — no code needed.

## 🔒 Privacy

- Every user logs in with their own Google account
- Data is stored privately per user in Firestore
- No one else can see or edit your habit data

## 📱 Install on Phone

1. Open the app URL in **Chrome** on Android
2. Tap **⋮ menu** → **Add to Home Screen**
3. Tap **Add**

The app will appear on your home screen like a native app.

## 🔧 Local Development

```bash
git clone https://github.com/adittya-code/habit-tracker
cd habit-tracker
npm install
npm start
```

Add your own Firebase config in `src/firebase.js` before running.

---

Built with ❤️ using React & Firebase
