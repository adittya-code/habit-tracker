/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

/* ── Reset & Base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #0F0A1E;
  --surface:   #1A1030;
  --surface2:  #231545;
  --border:    #2E1F5E;
  --border2:   #3D2B7A;
  --text:      #F0EAFF;
  --text-muted:#9B8EC4;
  --accent:    #A78BFA;
  --accent2:   #7C3AED;
  --teal:      #2DD4BF;
  --gold:      #FCD34D;
  --coral:     #F87171;

  --w0: rgba(45,212,191,0.08);
  --w1: rgba(167,139,250,0.10);
  --w2: rgba(96,165,250,0.08);
  --w3: rgba(251,191,36,0.08);
  --w4: rgba(248,113,113,0.08);

  --font: 'DM Sans', sans-serif;
  --mono: 'DM Mono', monospace;
  --radius: 10px;
  --radius-sm: 6px;
}

html, body, #root {
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
}

/* ── App Shell ── */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(124,58,237,0.18) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 100%, rgba(45,212,191,0.10) 0%, transparent 60%),
    var(--bg);
}

/* ── HEADER ── */
.header {
  background: linear-gradient(135deg, #1A0B3B 0%, #0F1A3B 100%);
  border-bottom: 1px solid var(--border);
  padding: 20px 20px 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 20px;
  color: var(--accent);
  line-height: 1;
}

.header-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.saving-dot {
  font-size: 11px;
  color: var(--teal);
  font-family: var(--mono);
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.header-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}

.nav-btn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--accent);
  width: 36px; height: 36px;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  line-height: 1;
}
.nav-btn:hover { background: var(--accent2); border-color: var(--accent); color: white; transform: scale(1.08); }

.month-display {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.month-name {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
}
.year-tag {
  font-size: 14px;
  font-family: var(--mono);
  color: var(--text-muted);
  background: var(--surface2);
  border: 1px solid var(--border2);
  padding: 2px 8px;
  border-radius: 20px;
}

.header-stats {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 12px;
}

.stat-pill {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 6px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}
.stat-pill--accent {
  background: linear-gradient(135deg, var(--accent2), #4C1D95);
  border-color: var(--accent);
}
.stat-val {
  font-size: 20px;
  font-weight: 700;
  font-family: var(--mono);
  line-height: 1.1;
}
.stat-lbl {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.stat-pill--accent .stat-lbl { color: rgba(255,255,255,0.7); }

.overall-bar-wrap { padding: 0 4px; }
.overall-bar {
  height: 4px;
  background: var(--surface2);
  border-radius: 2px;
  overflow: hidden;
}
.overall-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent2), var(--teal));
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── GRID WRAPPER ── */
.grid-wrap {
  flex: 1;
  overflow: hidden;
  padding: 16px 12px;
}

.grid-scroll {
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
}

/* ── TABLE ── */
.grid {
  border-collapse: collapse;
  width: max-content;
  min-width: 100%;
  font-size: 12px;
}

/* Sticky first column */
.sticky-col {
  position: sticky;
  left: 0;
  z-index: 10;
  background: var(--surface);
}
.habit-row:nth-child(even) .sticky-col { background: #1E1238; }

/* Column sizes */
.col-name  { width: 180px; min-width: 180px; }
.col-meta  { width: 46px; min-width: 46px; text-align: center; }
.col-day   { width: 26px; min-width: 26px; }

/* ── WEEK BAND HEADER ROW ── */
.row-weekbands th {
  height: 6px;
  padding: 0;
}
.week-0 { background: var(--w0) !important; }
.week-1 { background: var(--w1) !important; }
.week-2 { background: var(--w2) !important; }
.week-3 { background: var(--w3) !important; }
.week-4 { background: var(--w4) !important; }

/* ── DAY NUMBER ROW ── */
.row-daynums th {
  padding: 6px 2px 4px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  position: sticky;
  top: 0;
}
.row-daynums .sticky-col { z-index: 20; }

.col-name-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding-left: 12px;
}

.th-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.col-daynum {
  padding: 4px 2px 2px;
}
.daynum {
  display: block;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.2;
}
.dayname {
  display: block;
  font-size: 8px;
  font-weight: 600;
  color: var(--border2);
  text-align: center;
  text-transform: uppercase;
}
.col-day--today .daynum { color: var(--teal); font-weight: 700; }
.col-day--today .dayname { color: var(--teal); }
.col-day--weekend .daynum { color: var(--accent); }

/* ── HABIT ROWS ── */
.habit-row { transition: background 0.15s; }
.row-even { background: var(--surface); }
.row-odd  { background: #1E1238; }
.habit-row:hover { background: #261650 !important; }
.habit-row:hover .sticky-col { background: #261650 !important; }

.habit-name-cell {
  padding: 8px 10px 6px 12px;
  border-right: 1px solid var(--border);
}
.habit-icon {
  font-size: 14px;
  margin-right: 6px;
  line-height: 1;
}
.habit-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
}
.habit-progress-bar {
  margin-top: 4px;
  height: 2px;
  background: var(--border);
  border-radius: 1px;
  overflow: hidden;
}
.habit-progress-fill {
  height: 100%;
  border-radius: 1px;
  transition: width 0.5s ease;
  opacity: 0.7;
}

/* Meta cells */
.col-meta { border-right: 1px solid var(--border); vertical-align: middle; }
.meta-done { font-family: var(--mono); font-size: 13px; font-weight: 600; }
.meta-goal { font-family: var(--mono); font-size: 11px; color: var(--text-muted); }
.meta-pct  { }
.meta-streak { }

.pct-badge {
  display: inline-block;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 4px;
}
.pct-green  { background: rgba(52,211,153,0.15); color: #34D399; }
.pct-yellow { background: rgba(251,191,36,0.15);  color: #FBBF24; }
.pct-orange { background: rgba(251,146,60,0.15);  color: #FB923C; }
.pct-red    { background: rgba(248,113,113,0.15); color: #F87171; }

.streak-badge { font-size: 11px; font-weight: 600; color: #FB923C; font-family: var(--mono); white-space: nowrap; }
.streak-zero  { color: var(--border2); font-size: 14px; }

/* ── DAY CELLS ── */
.day-cell {
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: 0;
  height: 32px;
  border-right: 1px solid rgba(255,255,255,0.04);
  transition: background 0.1s, transform 0.1s;
  position: relative;
}
.day-cell:hover:not(.day-cell--future) { background: rgba(167,139,250,0.12) !important; }
.day-cell:active:not(.day-cell--future) { transform: scale(0.9); }

.day-bg-0 { background: var(--w0); }
.day-bg-1 { background: var(--w1); }
.day-bg-2 { background: var(--w2); }
.day-bg-3 { background: var(--w3); }
.day-bg-4 { background: var(--w4); }

.week-bg-0 { background: var(--w0); }
.week-bg-1 { background: var(--w1); }
.week-bg-2 { background: var(--w2); }
.week-bg-3 { background: var(--w3); }
.week-bg-4 { background: var(--w4); }

.day-cell--future { cursor: default; opacity: 0.3; }
.day-cell--weekend { opacity: 0.85; }

.check-mark {
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  display: block;
  animation: pop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes pop {
  0%   { transform: scale(0);   opacity: 0; }
  100% { transform: scale(1);   opacity: 1; }
}

.check-empty {
  display: block;
  width: 10px; height: 10px;
  border: 1.5px solid var(--border2);
  border-radius: 3px;
  margin: 0 auto;
  transition: border-color 0.2s;
}
.day-cell:hover .check-empty { border-color: var(--accent); }

.day-cell--checked { background: rgba(167,139,250,0.06) !important; }

/* ── TOTALS ROW ── */
.totals-row td {
  padding: 6px 2px;
  border-top: 2px solid var(--border2);
  background: var(--surface2);
  position: sticky;
  bottom: 0;
}
.totals-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  padding-left: 12px !important;
  border-right: 1px solid var(--border);
}
.totals-overall {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--teal);
  text-align: center;
  border-right: 1px solid var(--border);
}
.totals-day {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.04);
}
.totals-perfect { color: #34D399; }
.totals-good    { color: #FBBF24; }
.totals-low     { color: var(--border2); }

/* ── LOADING ── */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
  color: var(--text-muted);
}
.spinner {
  width: 32px; height: 32px;
  border: 2px solid var(--border2);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── FOOTER ── */
.footer {
  padding: 12px 20px;
  text-align: center;
  border-top: 1px solid var(--border);
  background: var(--surface);
}
.footer p {
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* ── MOBILE ── */
@media (max-width: 600px) {
  .header { padding: 14px 12px 12px; }
  .month-name { font-size: 22px; }
  .header-stats { gap: 6px; }
  .stat-pill { min-width: 68px; padding: 5px 10px; }
  .stat-val { font-size: 16px; }
  .col-name { width: 150px; min-width: 150px; }
  .habit-name { font-size: 11px; }
  .col-day { width: 22px; min-width: 22px; }
  .day-cell { height: 28px; }
  .check-mark { font-size: 13px; }
}

/* ── AUTH SCREEN ── */
.auth-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-box {
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 48px 40px;
  text-align: center;
  max-width: 380px;
  width: 90%;
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
}

.login-icon {
  font-size: 48px;
  color: var(--accent);
  margin-bottom: 16px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.login-sub {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 32px;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 14px 24px;
  background: white;
  color: #1a1a1a;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font);
}
.google-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,255,255,0.15); }
.google-btn:active { transform: translateY(0); }

/* ── USER INFO ── */
.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--accent);
}

.user-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.signout-btn {
  background: transparent;
  border: 1px solid var(--border2);
  color: var(--text-muted);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font);
  transition: all 0.2s;
}
.signout-btn:hover { border-color: var(--coral); color: var(--coral); }

/* ── AUTH SCREEN ── */
.auth-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.25) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 80%, rgba(45,212,191,0.15) 0%, transparent 60%),
              var(--bg);
}
.auth-card {
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 48px 40px;
  text-align: center;
  max-width: 360px;
  width: 90%;
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
}
.auth-icon { font-size: 40px; color: var(--accent); margin-bottom: 12px; display: block; }
.auth-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
.auth-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 32px; }
.google-btn {
  display: flex; align-items: center; justify-content: center; gap: 12px;
  width: 100%; padding: 14px 20px;
  background: white; color: #1f1f1f;
  border: none; border-radius: 12px;
  font-size: 15px; font-weight: 600; font-family: var(--font);
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
.google-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
.auth-note { font-size: 11px; color: var(--text-muted); margin-top: 16px; }

/* ── HEADER ACTIONS ── */
.header-actions { display: flex; align-items: center; gap: 10px; }
.settings-btn {
  background: var(--surface2); border: 1px solid var(--border2);
  border-radius: 8px; width: 34px; height: 34px;
  font-size: 16px; cursor: pointer; display: flex;
  align-items: center; justify-content: center;
  transition: all 0.2s;
}
.settings-btn:hover { background: var(--accent2); border-color: var(--accent); }
.user-info { display: flex; align-items: center; gap: 8px; }
.user-avatar { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--accent); }
.signout-btn {
  background: transparent; border: 1px solid var(--border2);
  color: var(--text-muted); font-size: 11px; font-family: var(--font);
  padding: 4px 10px; border-radius: 6px; cursor: pointer; transition: all 0.2s;
}
.signout-btn:hover { border-color: var(--coral); color: var(--coral); }

/* ── MODAL ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}
.modal {
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 16px;
  width: 100%; max-width: 600px;
  max-height: 85vh; overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0,0,0,0.6);
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0; background: var(--surface); z-index: 1;
}
.modal-header h2 { font-size: 18px; font-weight: 700; }
.modal-close {
  background: var(--surface2); border: 1px solid var(--border2);
  color: var(--text); width: 30px; height: 30px; border-radius: 6px;
  font-size: 14px; cursor: pointer;
}
.habit-list-edit { padding: 12px 24px; display: flex; flex-direction: column; gap: 6px; }
.habit-edit-row { background: var(--surface2); border-radius: 10px; padding: 10px 12px; }
.habit-view-row { display: flex; align-items: center; gap: 8px; }
.he-icon { font-size: 18px; width: 28px; text-align: center; }
.he-name { flex: 1; font-size: 13px; font-weight: 500; }
.he-goal { font-size: 11px; color: var(--text-muted); font-family: var(--mono); width: 36px; }
.he-color { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }
.btn-edit,.btn-del,.btn-save,.btn-cancel,.btn-add {
  border: none; border-radius: 6px; padding: 4px 8px;
  font-size: 12px; cursor: pointer; font-family: var(--font); transition: all 0.15s;
}
.btn-edit   { background: var(--border2); color: var(--text); }
.btn-del    { background: rgba(248,113,113,0.15); color: var(--coral); }
.btn-save   { background: rgba(52,211,153,0.2); color: #34D399; }
.btn-cancel { background: var(--border); color: var(--text-muted); }
.btn-add    { background: var(--accent2); color: white; padding: 6px 14px; font-weight: 600; }
.btn-edit:hover   { background: var(--accent2); }
.btn-del:hover    { background: rgba(248,113,113,0.3); }
.btn-save:hover   { background: rgba(52,211,153,0.35); }
.btn-add:hover    { background: var(--purple); filter: brightness(1.15); }

.habit-edit-form,.add-habit-form {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
}
.edit-input {
  background: var(--surface); border: 1px solid var(--border2);
  color: var(--text); border-radius: 6px; padding: 6px 8px;
  font-size: 12px; font-family: var(--font);
  outline: none;
}
.edit-input:focus { border-color: var(--accent); }
.add-habit-section {
  padding: 16px 24px 20px;
  border-top: 1px solid var(--border);
}
.add-title { font-size: 13px; font-weight: 600; color: var(--accent); margin-bottom: 10px; }

@media (max-width: 600px) {
  .auth-card { padding: 36px 24px; }
  .modal { max-height: 90vh; }
  .habit-view-row { flex-wrap: wrap; }
  .header-actions { gap: 6px; }
  .signout-btn { display: none; }
}

