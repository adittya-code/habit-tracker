/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

/* ── Reset & Base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
--bg:#0F0A1E; --surface:#1A1030; --surface2:#231545;
--border:#2E1F5E; --border2:#3D2B7A;
--text:#F0EAFF; --text-muted:#9B8EC4;
--accent:#A78BFA; --accent2:#7C3AED;
--teal:#2DD4BF; --gold:#FCD34D; --coral:#F87171;

--w0: rgba(45,212,191,0.08);
--w1: rgba(167,139,250,0.10);
--w2: rgba(96,165,250,0.08);
--w3: rgba(251,191,36,0.08);
--w4: rgba(248,113,113,0.08);

--font:'DM Sans',sans-serif;
--mono:'DM Mono',monospace;
--radius:10px; --radius-sm:6px;
}

html,body,#root {
height:100%;
background:var(--bg);
color:var(--text);
font-family:var(--font);
}

/* ── APP ── */
.app { min-height:100vh; }

/* ── AUTH SCREEN ── */
.auth-screen {
min-height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:
radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.25) 0%, transparent 60%),
radial-gradient(ellipse at 70% 80%, rgba(45,212,191,0.15) 0%, transparent 60%),
var(--bg);
}

.auth-card {
background:var(--surface);
border:1px solid var(--border2);
border-radius:20px;
padding:48px 40px;
text-align:center;
max-width:360px;
width:90%;
box-shadow:0 25px 60px rgba(0,0,0,0.5);
}

.auth-icon { font-size:40px; color:var(--accent); margin-bottom:12px; }
.auth-title { font-size:28px; font-weight:700; margin-bottom:8px; }
.auth-sub { font-size:14px; color:var(--text-muted); margin-bottom:24px; }

/* GOOGLE BUTTON */
.google-btn {
display:flex; align-items:center; justify-content:center;
gap:12px; width:100%; padding:14px;
background:white; color:#1f1f1f;
border:none; border-radius:12px;
font-weight:600; cursor:pointer;
margin-top:10px;
}

/* ===== NEW AUTH STYLES ===== */

/* Inputs */
.auth-input {
width:100%;
padding:12px;
margin-bottom:10px;
border-radius:10px;
border:1px solid var(--border2);
background:var(--surface2);
color:var(--text);
}

.auth-input::placeholder { color:var(--text-muted); }

.auth-input:focus {
border-color:var(--accent);
outline:none;
}

/* Row */
.auth-row {
display:flex;
gap:10px;
margin-bottom:10px;
}

/* Buttons */
.auth-btn {
width:100%;
padding:12px;
border-radius:10px;
border:none;
background:linear-gradient(135deg,var(--accent2),#4C1D95);
color:white;
font-weight:600;
cursor:pointer;
}

.auth-btn:hover { opacity:0.9; }

.auth-btn.outline {
background:transparent;
border:1px solid var(--accent);
color:var(--accent);
}

.auth-btn.black {
background:black;
}

/* Footer note */
.auth-note {
font-size:11px;
color:var(--text-muted);
margin-top:10px;
}

/* Recaptcha */
#recaptcha-container {
margin-top:8px;
}

