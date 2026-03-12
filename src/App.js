import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { HABITS } from "./habits";
import "./App.css";

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const DAYS_SHORT = ["S","M","T","W","T","F","S"];

function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function docId(y, m) { return `habits_${y}_${String(m+1).padStart(2,"0")}`; }

export default function App() {
  const now   = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [data,  setData]  = useState({});   // { "habitId_day": true }
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  const days    = daysInMonth(year, month);
  const today   = now.getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  // ── Load from Firestore ──────────────────────────────────
  useEffect(() => {
    setLoading(true);
    const ref = doc(db, "tracker", docId(year, month));
    getDoc(ref).then(snap => {
      setData(snap.exists() ? snap.data().checks || {} : {});
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [year, month]);

  // ── Save to Firestore ────────────────────────────────────
  const save = useCallback(async (newData) => {
    setSaving(true);
    try {
      await setDoc(doc(db, "tracker", docId(year, month)), { checks: newData });
    } finally { setSaving(false); }
  }, [year, month]);

  // ── Toggle a habit day ───────────────────────────────────
  const toggle = useCallback((habitId, day) => {
    const key = `${habitId}_${day}`;
    const newData = { ...data, [key]: !data[key] };
    if (!newData[key]) delete newData[key];
    setData(newData);
    save(newData);
  }, [data, save]);

  // ── Navigation ───────────────────────────────────────────
  const prevMonth = () => {
    if (month === 0) { setYear(y => y-1); setMonth(11); }
    else setMonth(m => m-1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y+1); setMonth(0); }
    else setMonth(m => m+1);
  };

  // ── Stats ────────────────────────────────────────────────
  const getDone    = (hId) => Array.from({length:days},(_,i)=>i+1).filter(d=>data[`${hId}_${d}`]).length;
  const getStreak  = (hId) => {
    let streak = 0;
    for (let d = (isCurrentMonth ? today : days); d >= 1; d--) {
      if (data[`${hId}_${d}`]) streak++;
      else break;
    }
    return streak;
  };
  const totalDone  = HABITS.reduce((s,h) => s + getDone(h.id), 0);
  const totalGoal  = HABITS.reduce((s,h) => s + h.goal, 0);
  const overallPct = totalGoal > 0 ? Math.round(totalDone / totalGoal * 100) : 0;

  // ── Day columns (weeks) ──────────────────────────────────
  const dayList = Array.from({ length: days }, (_, i) => i + 1);

  return (
    <div className="app">
      {/* ── HEADER ── */}
      <header className="header">
        <div className="header-top">
          <div className="header-brand">
            <span className="header-icon">◈</span>
            <span className="header-title">Habit Tracker</span>
          </div>
          <div className="header-status">
            {saving && <span className="saving-dot">saving…</span>}
            {loading && <span className="saving-dot">loading…</span>}
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

        {/* Overall progress bar */}
        <div className="overall-bar-wrap">
          <div className="overall-bar">
            <div className="overall-bar-fill" style={{width: overallPct+"%"}} />
          </div>
        </div>
      </header>

      {/* ── GRID ── */}
      <div className="grid-wrap">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading your habits…</p>
          </div>
        ) : (
          <div className="grid-scroll">
            <table className="grid">
              <thead>
                {/* Week band row */}
                <tr className="row-weekbands">
                  <th className="col-name sticky-col" />
                  <th className="col-meta">Done</th>
                  <th className="col-meta">Goal</th>
                  <th className="col-meta">%</th>
                  <th className="col-meta">🔥</th>
                  {dayList.map(d => {
                    const dow = new Date(year, month, d).getDay();
                    const isWeekend = dow === 0 || dow === 6;
                    const week = Math.floor((d-1)/7);
                    const weekStarts = [1,8,15,22,29];
                    const isFirst = weekStarts.includes(d);
                    return (
                      <th key={d}
                        className={`col-day ${isWeekend?"col-day--weekend":""} week-${week%5}`}
                        data-first={isFirst}>
                      </th>
                    );
                  })}
                </tr>
                {/* Day number row */}
                <tr className="row-daynums">
                  <th className="col-name sticky-col">
                    <span className="col-name-label">Habit</span>
                  </th>
                  <th className="col-meta th-label">Done</th>
                  <th className="col-meta th-label">Goal</th>
                  <th className="col-meta th-label">%</th>
                  <th className="col-meta th-label">Str</th>
                  {dayList.map(d => {
                    const dow = new Date(year, month, d).getDay();
                    const isWeekend = dow === 0 || dow === 6;
                    const isToday   = isCurrentMonth && d === today;
                    const week      = Math.floor((d-1)/7);
                    return (
                      <th key={d}
                        className={`col-day col-daynum week-${week%5} ${isWeekend?"col-day--weekend":""} ${isToday?"col-day--today":""}`}>
                        <span className="daynum">{d}</span>
                        <span className="dayname">{DAYS_SHORT[dow]}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {HABITS.map((habit, hIdx) => {
                  const done   = getDone(habit.id);
                  const streak = getStreak(habit.id);
                  const pct    = Math.round(done / habit.goal * 100);
                  return (
                    <tr key={habit.id} className={`habit-row ${hIdx%2===0?"row-even":"row-odd"}`}>
                      {/* Habit name */}
                      <td className="col-name sticky-col habit-name-cell">
                        <span className="habit-icon">{habit.icon}</span>
                        <span className="habit-name">{habit.name}</span>
                        <div className="habit-progress-bar">
                          <div className="habit-progress-fill"
                            style={{width: Math.min(pct,100)+"%", background: habit.color}} />
                        </div>
                      </td>

                      {/* Done */}
                      <td className="col-meta meta-done" style={{color: habit.color}}>
                        {done}
                      </td>

                      {/* Goal */}
                      <td className="col-meta meta-goal">{habit.goal}</td>

                      {/* % */}
                      <td className="col-meta meta-pct">
                        <span className={`pct-badge ${pct>=100?"pct-green":pct>=70?"pct-yellow":pct>=40?"pct-orange":"pct-red"}`}>
                          {pct}%
                        </span>
                      </td>

                      {/* Streak */}
                      <td className="col-meta meta-streak">
                        {streak > 0 ? <span className="streak-badge">{streak}🔥</span> : <span className="streak-zero">—</span>}
                      </td>

                      {/* Day cells */}
                      {dayList.map(d => {
                        const key     = `${habit.id}_${d}`;
                        const checked = !!data[key];
                        const isFuture= isCurrentMonth && d > today;
                        const dow     = new Date(year, month, d).getDay();
                        const isWknd  = dow === 0 || dow === 6;
                        const week    = Math.floor((d-1)/7);
                        return (
                          <td key={d}
                            className={`day-cell week-bg-${week%5} ${isWknd?"day-cell--weekend":""} ${isFuture?"day-cell--future":""} ${checked?"day-cell--checked":""}`}
                            onClick={() => !isFuture && toggle(habit.id, d)}
                            title={`${habit.name} — ${MONTHS[month]} ${d}`}>
                            {checked
                              ? <span className="check-mark" style={{color: habit.color}}>✓</span>
                              : <span className="check-empty" />
                            }
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>

              {/* Totals footer */}
              <tfoot>
                <tr className="totals-row">
                  <td className="col-name sticky-col totals-label">Daily Totals</td>
                  <td className="col-meta totals-overall" colSpan={4}>{overallPct}%</td>
                  {dayList.map(d => {
                    const count = HABITS.filter(h => data[`${h.id}_${d}`]).length;
                    const pct   = Math.round(count / HABITS.length * 100);
                    return (
                      <td key={d} className={`totals-day ${pct===100?"totals-perfect":pct>50?"totals-good":"totals-low"}`}>
                        {count > 0 ? count : ""}
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
        <p>Tap any cell to mark done · Tap again to unmark · Data syncs across all your devices</p>
      </footer>
    </div>
  );
}
