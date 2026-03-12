import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
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
  const [user,    setUser]    = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [year,    setYear]    = useState(now.getFullYear());
  const [month,   setMonth]   = useState(now.getMonth());
  const [data,    setData]    = useState({});
  const [loading, setLoading] = useState(false);
  const [saving,  setSaving]  = useState(false);

  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [habits, setHabits]   = useState(DEFAULT_HABITS);
  const [editHabit, setEditHabit] = useState(null); // habit being edited
  const [newHabit,  setNewHabit]  = useState({ name:"", goal:20, icon:"⭐", color:"#7C3AED" });

  const days = daysInMonth(year, month);
  const today = now.getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  // ── Auth listener ───────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // ── Load data ───────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getDoc(doc(db, "tracker", docId(user.uid, year, month)))
      .then(snap => { setData(snap.exists() ? snap.data().checks || {} : {}); })
      .finally(() => setLoading(false));
  }, [user, year, month]);

  // ── Load user habits from firestore ─────────────────────
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "habits", user.uid)).then(snap => {
      if (snap.exists() && snap.data().list) setHabits(snap.data().list);
    });
  }, [user]);

  // ── Save checks ─────────────────────────────────────────
  const save = useCallback(async (newData) => {
    if (!user) return;
    setSaving(true);
    try { await setDoc(doc(db, "tracker", docId(user.uid, year, month)), { checks: newData }); }
    finally { setSaving(false); }
  }, [user, year, month]);

  // ── Save habits ─────────────────────────────────────────
  const saveHabits = async (list) => {
    if (!user) return;
    await setDoc(doc(db, "habits", user.uid), { list });
    setHabits(list);
  };

  // ── Toggle ───────────────────────────────────────────────
  const toggle = useCallback((hId, day) => {
    const key = `${hId}_${day}`;
    const nd  = { ...data, [key]: !data[key] };
    if (!nd[key]) delete nd[key];
    setData(nd);
    save(nd);
  }, [data, save]);

  // ── Navigation ───────────────────────────────────────────
  const prevMonth = () => { if (month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); };
  const nextMonth = () => { if (month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); };

  // ── Stats ────────────────────────────────────────────────
  const getDone   = (hId) => Array.from({length:days},(_,i)=>i+1).filter(d=>data[`${hId}_${d}`]).length;
  const getStreak = (hId) => {
    let s=0;
    for(let d=(isCurrentMonth?today:days);d>=1;d--){ if(data[`${hId}_${d}`])s++; else break; }
    return s;
  };
  const totalDone = habits.reduce((s,h)=>s+getDone(h.id),0);
  const totalGoal = habits.reduce((s,h)=>s+h.goal,0);
  const overallPct = totalGoal>0 ? Math.round(totalDone/totalGoal*100) : 0;
  const dayList   = Array.from({length:days},(_,i)=>i+1);

  // ── Habit editing ────────────────────────────────────────
  const startEdit = (h) => setEditHabit({...h});
  const saveEdit  = () => {
    const updated = habits.map(h => h.id===editHabit.id ? editHabit : h);
    saveHabits(updated);
    setEditHabit(null);
  };
  const deleteHabit = (id) => {
    if(window.confirm("Delete this habit?")) saveHabits(habits.filter(h=>h.id!==id));
  };
  const addHabit = () => {
    if(!newHabit.name.trim()) return;
    const h = { ...newHabit, id: "h_"+Date.now() };
    saveHabits([...habits, h]);
    setNewHabit({ name:"", goal:20, icon:"⭐", color:"#7C3AED" });
  };

  // ── AUTH SCREEN ─────────────────────────────────────────
  if (authLoading) return (
    <div className="auth-screen">
      <div className="spinner" />
    </div>
  );

  if (!user) return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-icon">◈</div>
        <h1 className="auth-title">Habit Tracker</h1>
        <p className="auth-sub">Track your daily habits beautifully</p>
        <button className="google-btn" onClick={() => signInWithPopup(auth, googleProvider)}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        <p className="auth-note">Your data is private and syncs across all your devices</p>
      </div>
    </div>
  );

  // ── SETTINGS MODAL ───────────────────────────────────────
  const SettingsModal = () => (
    <div className="modal-overlay" onClick={(e)=>{ if(e.target.className==="modal-overlay") setShowSettings(false); }}>
      <div className="modal">
        <div className="modal-header">
          <h2>⚙️ Edit Habits</h2>
          <button className="modal-close" onClick={()=>setShowSettings(false)}>✕</button>
        </div>

        {/* Habit list */}
        <div className="habit-list-edit">
          {habits.map(h => (
            <div key={h.id} className="habit-edit-row">
              {editHabit && editHabit.id === h.id ? (
                <div className="habit-edit-form">
                  <input className="edit-input" value={editHabit.icon}
                    onChange={e=>setEditHabit({...editHabit,icon:e.target.value})}
                    style={{width:52}} placeholder="icon" />
                  <input className="edit-input" value={editHabit.name}
                    onChange={e=>setEditHabit({...editHabit,name:e.target.value})}
                    placeholder="Habit name" style={{flex:1}} />
                  <input className="edit-input" type="number" value={editHabit.goal}
                    onChange={e=>setEditHabit({...editHabit,goal:Number(e.target.value)})}
                    style={{width:60}} placeholder="goal" />
                  <input className="edit-input" type="color" value={editHabit.color}
                    onChange={e=>setEditHabit({...editHabit,color:e.target.value})}
                    style={{width:44,padding:2,cursor:"pointer"}} />
                  <button className="btn-save" onClick={saveEdit}>✓</button>
                  <button className="btn-cancel" onClick={()=>setEditHabit(null)}>✕</button>
                </div>
              ) : (
                <div className="habit-view-row">
                  <span className="he-icon">{h.icon}</span>
                  <span className="he-name">{h.name}</span>
                  <span className="he-goal">/{h.goal}d</span>
                  <div className="he-color" style={{background:h.color}} />
                  <button className="btn-edit" onClick={()=>startEdit(h)}>✏️</button>
                  <button className="btn-del"  onClick={()=>deleteHabit(h.id)}>🗑</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add new habit */}
        <div className="add-habit-section">
          <p className="add-title">+ Add New Habit</p>
          <div className="add-habit-form">
            <input className="edit-input" value={newHabit.icon}
              onChange={e=>setNewHabit({...newHabit,icon:e.target.value})}
              style={{width:52}} placeholder="🎯" />
            <input className="edit-input" value={newHabit.name}
              onChange={e=>setNewHabit({...newHabit,name:e.target.value})}
              placeholder="Habit name" style={{flex:1}} />
            <input className="edit-input" type="number" value={newHabit.goal}
              onChange={e=>setNewHabit({...newHabit,goal:Number(e.target.value)})}
              style={{width:60}} placeholder="20" />
            <input className="edit-input" type="color" value={newHabit.color}
              onChange={e=>setNewHabit({...newHabit,color:e.target.value})}
              style={{width:44,padding:2,cursor:"pointer"}} />
            <button className="btn-add" onClick={addHabit}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── MAIN APP ─────────────────────────────────────────────
  return (
    <div className="app">
      {showSettings && <SettingsModal />}

      {/* HEADER */}
      <header className="header">
        <div className="header-top">
          <div className="header-brand">
            <span className="header-icon">◈</span>
            <span className="header-title">Habit Tracker</span>
          </div>
          <div className="header-actions">
            {saving && <span className="saving-dot">saving…</span>}
            <button className="settings-btn" onClick={()=>setShowSettings(true)} title="Edit habits">⚙️</button>
            <div className="user-info">
              <img src={user.photoURL} alt="" className="user-avatar" referrerPolicy="no-referrer" />
              <button className="signout-btn" onClick={()=>signOut(auth)}>Sign out</button>
            </div>
          </div>
        </div>

        <div className="header-nav">
          <button className="nav-btn" onClick={prevMonth}>‹</button>
          <div className="month-display">
            <h1 className="month-name">{MONTHS[month]}</h1>
            <span className="year-tag">{year}</span>
          </div>
          <button className="nav-btn" onClick={nextMonth}>›</button>
        </div>

        <div className="header-stats">
          <div className="stat-pill">
            <span className="stat-val">{totalDone}</span>
            <span className="stat-lbl">completed</span>
          </div>
          <div className="stat-pill stat-pill--accent">
            <span className="stat-val">{overallPct}%</span>
            <span className="stat-lbl">overall</span>
          </div>
          <div className="stat-pill">
            <span className="stat-val">{totalGoal - totalDone}</span>
            <span className="stat-lbl">remaining</span>
          </div>
        </div>

        <div className="overall-bar-wrap">
          <div className="overall-bar">
            <div className="overall-bar-fill" style={{width:overallPct+"%"}} />
          </div>
        </div>
      </header>

      {/* GRID */}
      <div className="grid-wrap">
        {loading ? (
          <div className="loading-state"><div className="spinner" /><p>Loading…</p></div>
        ) : (
          <div className="grid-scroll">
            <table className="grid">
              <thead>
                <tr className="row-weekbands">
                  <th className="col-name sticky-col" />
                  <th className="col-meta" /><th className="col-meta" /><th className="col-meta" /><th className="col-meta" />
                  {dayList.map(d => {
                    const w = Math.floor((d-1)/7);
                    return <th key={d} className={`col-day week-${w%5}`} />;
                  })}
                </tr>
                <tr className="row-daynums">
                  <th className="col-name sticky-col"><span className="col-name-label">Habit</span></th>
                  <th className="col-meta th-label">Done</th>
                  <th className="col-meta th-label">Goal</th>
                  <th className="col-meta th-label">%</th>
                  <th className="col-meta th-label">Str</th>
                  {dayList.map(d => {
                    const dow    = new Date(year,month,d).getDay();
                    const isWknd = dow===0||dow===6;
                    const isToday= isCurrentMonth&&d===today;
                    const w      = Math.floor((d-1)/7);
                    return (
                      <th key={d} className={`col-day col-daynum week-${w%5} ${isWknd?"col-day--weekend":""} ${isToday?"col-day--today":""}`}>
                        <span className="daynum">{d}</span>
                        <span className="dayname">{DAYS_SHORT[dow]}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {habits.map((habit, hIdx) => {
                  const done   = getDone(habit.id);
                  const streak = getStreak(habit.id);
                  const pct    = Math.round(done/habit.goal*100);
                  return (
                    <tr key={habit.id} className={`habit-row ${hIdx%2===0?"row-even":"row-odd"}`}>
                      <td className="col-name sticky-col habit-name-cell">
                        <span className="habit-icon">{habit.icon}</span>
                        <span className="habit-name">{habit.name}</span>
                        <div className="habit-progress-bar">
                          <div className="habit-progress-fill" style={{width:Math.min(pct,100)+"%",background:habit.color}} />
                        </div>
                      </td>
                      <td className="col-meta meta-done" style={{color:habit.color}}>{done}</td>
                      <td className="col-meta meta-goal">{habit.goal}</td>
                      <td className="col-meta meta-pct">
                        <span className={`pct-badge ${pct>=100?"pct-green":pct>=70?"pct-yellow":pct>=40?"pct-orange":"pct-red"}`}>{pct}%</span>
                      </td>
                      <td className="col-meta meta-streak">
                        {streak>0?<span className="streak-badge">{streak}🔥</span>:<span className="streak-zero">—</span>}
                      </td>
                      {dayList.map(d => {
                        const key     = `${habit.id}_${d}`;
                        const checked = !!data[key];
                        const isFuture= isCurrentMonth&&d>today;
                        const dow     = new Date(year,month,d).getDay();
                        const isWknd  = dow===0||dow===6;
                        const w       = Math.floor((d-1)/7);
                        return (
                          <td key={d}
                            className={`day-cell week-bg-${w%5} ${isWknd?"day-cell--weekend":""} ${isFuture?"day-cell--future":""} ${checked?"day-cell--checked":""}`}
                            onClick={()=>!isFuture&&toggle(habit.id,d)}>
                            {checked
                              ? <span className="check-mark" style={{color:habit.color}}>✓</span>
                              : <span className="check-empty" />}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="totals-row">
                  <td className="col-name sticky-col totals-label">Daily Totals</td>
                  <td className="col-meta totals-overall" colSpan={4}>{overallPct}%</td>
                  {dayList.map(d => {
                    const count = habits.filter(h=>data[`${h.id}_${d}`]).length;
                    const pct   = Math.round(count/habits.length*100);
                    return (
                      <td key={d} className={`totals-day ${pct===100?"totals-perfect":pct>50?"totals-good":"totals-low"}`}>
                        {count>0?count:""}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Signed in as {user.displayName} · Tap any cell to mark done · Data syncs across all devices</p>
      </footer>
    </div>
  );
}
