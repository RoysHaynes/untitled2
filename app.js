// Simple localStorage auth
const loginView = document.getElementById("login-view");
const homeView = document.getElementById("home-view");
const welcome = document.getElementById("welcome");
const continueBlock = document.getElementById("continue-block");
const continueButtons = document.getElementById("continue-buttons");

function getUser() {
    try { return JSON.parse(localStorage.getItem("prt_user")); } catch { return null; }
}
function setUser(u) { u ? localStorage.setItem("prt_user", JSON.stringify(u)) : localStorage.removeItem("prt_user"); }

function show(view) {
    loginView.classList.toggle("active", view === "login");
    homeView.classList.toggle("active", view === "home");
}

function renderHome() {
    const user = getUser();
    welcome.textContent = `Welcome, ${user?.name || "Shipmate"}!`;

    // Simple "continue" detection
    const hasPRT = localStorage.getItem("prt_input");
    const hasRun = localStorage.getItem("run_input");
    if (hasPRT || hasRun) {
        continueButtons.innerHTML = `
      ${hasPRT ? '<a href="prt-results.html" class="btn primary">Continue PRT</a>' : ''}
      ${hasRun ? '<a href="run-review.html" class="btn primary">Continue Run</a>' : ''}
    `;
        continueBlock.style.display = "block";
    }
}

// Events
document.getElementById("login-btn").onclick = () => {
    const name = document.getElementById("name").value.trim();
    if (name.length < 2) return alert("Enter your name");
    setUser({ name, unit: document.getElementById("unit").value.trim() });
    show("home");
    renderHome();
};

document.getElementById("guest-btn").onclick = () => {
    setUser({ name: "Guest" });
    show("home");
    renderHome();
};

document.getElementById("logout-btn").onclick = () => {
    setUser(null);
    show("login");
};

// Boot
if (getUser()) {
    show("home");
    renderHome();
} else {
    show("login");
}