// ===== CONFIG =====
console.log("User Dashboard loaded");

const API_BASE = "http://localhost:8000";

// ===== AUTH HELPERS =====
function getToken() {
  return localStorage.getItem("hackathonToken");
}

function isParticipant() {
  return localStorage.getItem("hackathonRole") === "participant";
}

function forceLogout() {
  localStorage.removeItem("hackathonToken");
  localStorage.removeItem("hackathonRole");
  localStorage.removeItem("hackathonTeamName");
  window.location.href = "/loginpage";
}

// ===== INIT =====
function initDashboard() {
  if (!getToken() || !isParticipant()) {
    forceLogout();
    return;
  }

  loadUserData();
  bindEvents();
}

// ===== LOAD USER DATA =====
async function loadUserData() {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard/me`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.status === 401) {
      forceLogout();
      return;
    }

    if (!res.ok) throw new Error("Failed to load dashboard");

    const { team, leader } = await res.json();

    setText("teamName", team?.name);
    setText("teamNameValue", team?.name);
    setText("leaderFullName", leader?.fullName);
    setText("leaderEmail", leader?.email);
    setText("leaderWhatsApp", leader?.whatsappNumber);
    setText("leaderLineId", leader?.lineId);
    setText("leaderGithubId", leader?.githubId);
    setText("leaderParticipantType", team?.participantType);

    setText(
      "registrationDate",
      team?.registrationDate ? formatDate(team.registrationDate) : ""
    );

    const birth =
      leader?.birthPlace && leader?.birthDate
        ? `${leader.birthPlace}, ${formatDate(leader.birthDate)}`
        : "";

    setText("leaderBirthDetails", birth);
  } catch (err) {
    console.error(err);
    showToast("Failed to load dashboard data", "error");
  }
}

// ===== FILE ACTIONS =====
async function viewCV() {
  await openFile("cv", false);
}

async function downloadIDCard() {
  await openFile("id", true);
}

async function openFile(type, download) {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard/files/${type}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.status === 401) {
      forceLogout();
      return;
    }

    if (!res.ok) {
      showToast("File not found", "error");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    if (download) {
      const a = document.createElement("a");
      a.href = url;
      a.download = type === "cv" ? "CV.pdf" : "ID-Card.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(url, "_blank");
    }

    setTimeout(() => URL.revokeObjectURL(url), 30000);
  } catch (err) {
    console.error(err);
    showToast("Failed to open file", "error");
  }
}

// ===== EVENTS =====
function bindEvents() {
  byId("logoutTrigger")?.addEventListener("click", openLogoutModal);
  byId("confirmLogout")?.addEventListener("click", handleLogout);
  byId("viewCv")?.addEventListener("click", viewCV);
  byId("viewIdCard")?.addEventListener("click", downloadIDCard);
}

// ===== LOGOUT =====
function handleLogout() {
  showToast("Logged out", "success");
  setTimeout(forceLogout, 800);
}

// ===== MODAL =====
function openLogoutModal() {
  byId("logoutModal")?.classList.add("active");
}

function closeLogoutModal() {
  byId("logoutModal")?.classList.remove("active");
}

// ===== HELPERS =====
function byId(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const el = byId(id);
  if (el) el.textContent = value || "";
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ===== TOAST =====
function showToast(msg, type = "success") {
  const toast = byId("toast");
  if (!toast) return;

  toast.className = `toast ${type}`;

  const messageEl = toast.querySelector(".toast-message");
  if (messageEl) messageEl.textContent = msg;

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===== EXPORT =====
export function initUserDashboard() {
  initDashboard();
}

// ===== GLOBAL (FOR INLINE BUTTONS) =====
window.viewCV = viewCV;
window.downloadIDCard = downloadIDCard;
window.openLogoutModal = openLogoutModal;
window.closeLogoutModal = closeLogoutModal;
window.initDashboard = initDashboard;
