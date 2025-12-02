
// Shared app utilities + localStorage state across pages

function mmssToSec(v){ if(!v) return 0; const [m='0', s='0']=String(v).split(':'); return (parseInt(m,10)||0)*60 + (parseInt(s,10)||0); }
function secToMMSS(t){ t=Math.max(0,Math.round(t)); const m=Math.floor(t/60); const s=t%60; return String(m).padStart(2,'0')+":"+String(s).padStart(2,'0'); }

function computePRT({pushups, plank, run}) {
  const p = Math.max(0, Math.min(100, Number(pushups||0)));
  const plankSec = Math.min(300, mmssToSec(plank));
  const runScore = Math.max(0, 900 - mmssToSec(run));
  const total = Math.round((p*0.4) + (plankSec/3)*0.3 + (runScore/9)*0.3);
  const score = Math.max(0, Math.min(100, total));
  const category = score>=90? "Outstanding" : score>=80? "Excellent" : score>=70? "Good" : score>=60? "Satisfactory" : "Unsat";
  return { score, category, p, plankSec, runScore };
}

function savePRT(form){
  const res = computePRT(form);
  localStorage.setItem("prt_input", JSON.stringify(form));
  localStorage.setItem("prt_result", JSON.stringify(res));
}

function loadPRT(){
  try { return {
    input: JSON.parse(localStorage.getItem("prt_input")||"{}"),
    result: JSON.parse(localStorage.getItem("prt_result")||"{}"),
  }; } catch { return { input:{}, result:{} }; }
}

function saveRun(run){
  localStorage.setItem("run_input", JSON.stringify(run));
}
function loadRun(){
  try { return JSON.parse(localStorage.getItem("run_input")||"{}"); } catch { return {}; }
}

// Helpers for navbar injection
function renderHeader(title){
  const header = document.getElementById("header");
  if (!header) return;
  header.innerHTML = `
    <div>
      <h1>${title}</h1>
      <div class="sub">PRT Pro — demo site</div>
    </div>
    <div class="nav">
      <a class="btn secondary" href="index.html">Home</a>
      <a class="btn secondary" href="prt-entry.html">PRT</a>
      <a class="btn secondary" href="run-log.html">Run</a>
      <a class="btn secondary" href="leaderboard.html">Leaderboard</a>
    </div>
  `;
}

