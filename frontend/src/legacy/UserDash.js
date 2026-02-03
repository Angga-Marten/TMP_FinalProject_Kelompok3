// ===== INITIALIZATION =====
const API_BASE = typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "http://localhost:8000";

function boot() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDashboard);
  } else {
    setTimeout(initializeDashboard, 0);
  }
}
boot();

function getToken() {
  return localStorage.getItem("hackathonToken");
}

function isParticipant() {
  return localStorage.getItem("hackathonRole") === "participant";
}

// ===== MAIN FUNCTIONS =====
function initializeDashboard() {
  createParticles();

  if (!getToken() || !isParticipant()) {
    localStorage.removeItem("hackathonToken");
    localStorage.removeItem("hackathonRole");
    localStorage.removeItem("hackathonTeamName");
    window.location.href = "/loginpage";
    return;
  }

  loadUserData();
  setupEventListeners();
  setupCardHoverEffects();
}

async function loadUserData() {
  const token = getToken();
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE}/api/dashboard/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      localStorage.removeItem("hackathonToken");
      localStorage.removeItem("hackathonRole");
      localStorage.removeItem("hackathonTeamName");
      window.location.href = "/loginpage";
      return;
    }

    if (!res.ok) {
      showToast("Failed to load dashboard data.", "error");
      return;
    }

    const data = await res.json();
    const { team, leader } = data;

    const elements = {
      teamName: team?.name || "",
      teamNameValue: team?.name || "",
      leaderFullName: leader?.fullName || "",
      leaderEmail: leader?.email || "",
      leaderWhatsApp: leader?.whatsappNumber || "",
      leaderLineId: leader?.lineId || "",
      leaderGithubId: leader?.githubId || "",
      leaderBirthDetails: leader?.birthPlace && leader?.birthDate
        ? `${leader.birthPlace}, ${formatBirthDate(leader.birthDate)}`
        : (leader?.birthPlace || "") + (leader?.birthDate ? ", " + formatBirthDate(leader.birthDate) : ""),
      leaderParticipantType: team?.participantType || "",
      registrationDate: team?.registrationDate || "",
    };

    Object.keys(elements).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = elements[id];
    });
  } catch (err) {
    showToast("Failed to load dashboard data.", "error");
  }
}

function formatBirthDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function setupEventListeners() {
  const logoutBtn = document.getElementById("logoutTrigger");
  const cancelBtn = document.getElementById("cancelLogout");
  const confirmBtn = document.getElementById("confirmLogout");
  const viewCvBtn = document.getElementById("viewCv");
  const viewIdBtn = document.getElementById("viewIdCard");
  const logoutModal = document.getElementById("logoutModal");

  if (logoutBtn) logoutBtn.addEventListener("click", openLogoutModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeLogoutModal);
  if (confirmBtn) confirmBtn.addEventListener("click", handleLogout);
  if (viewCvBtn) viewCvBtn.addEventListener("click", viewCV);
  if (viewIdBtn) viewIdBtn.addEventListener("click", downloadIDCard);
  if (logoutModal) {
    logoutModal.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeLogoutModal();
    });
  }
}

function setupCardHoverEffects() {
  const cards = document.querySelectorAll(".glass");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((c) => {
        if (c !== card) {
          c.style.transform = "scale(0.98)";
          c.style.opacity = "0.9";
        }
      });
    });
    card.addEventListener("mouseleave", () => {
      cards.forEach((c) => {
        c.style.transform = "";
        c.style.opacity = "";
      });
    });
  });
}

// ===== ACTION FUNCTIONS =====
function openLogoutModal() {
  const modal = document.getElementById("logoutModal");
  if (modal) modal.classList.add("active");
}

function closeLogoutModal() {
  const modal = document.getElementById("logoutModal");
  if (modal) modal.classList.remove("active");
}

function handleLogout() {
  const btn = document.getElementById("confirmLogout");
  if (!btn) return;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
  btn.disabled = true;

  fetch(`${API_BASE}/api/auth/logout`, { method: "POST" }).catch(() => { });

  showToast("Logout successful! Redirecting...", "success");
  localStorage.removeItem("hackathonToken");
  localStorage.removeItem("hackathonRole");
  localStorage.removeItem("hackathonTeamName");

  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}

async function viewCV() {
  const token = getToken();
  if (!token) {
    window.location.href = "/loginpage";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/dashboard/files/cv`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      showToast("CV not found or unavailable.", "error");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (err) {
    showToast("Failed to open CV.", "error");
  }
}

async function downloadIDCard() {
  const token = getToken();
  if (!token) {
    window.location.href = "/loginpage";
    return;
  }

  const btn = document.getElementById("viewIdCard");
  if (btn) {
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
    btn.disabled = true;
  }

  try {
    const res = await fetch(`${API_BASE}/api/dashboard/files/id`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      showToast("ID/Flazz file not found or unavailable.", "error");
      if (btn) {
        btn.innerHTML = '<i class="fas fa-download"></i> Download';
        btn.disabled = false;
      }
      return;
    }
    const contentType = res.headers.get("Content-Type") || "";
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    let extension = "bin";
    if (contentType.includes("pdf")) extension = "pdf";
    else if (contentType.includes("jpeg") || contentType.includes("jpg")) extension = "jpg";
    else if (contentType.includes("png")) extension = "png";

    a.download = `ID_Card_Hackathon.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Download started.", "success");
  } catch (err) {
    showToast("Failed to download.", "error");
  }

  if (btn) {
    btn.innerHTML = '<i class="fas fa-download"></i> Download';
    btn.disabled = false;
  }
}

// ===== UTILITY =====
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  const icon = toast.querySelector(".toast-icon i");
  const messageEl = toast.querySelector(".toast-message");

  toast.className = `toast ${type}`;
  messageEl.textContent = message;
  icon.className = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===== ENHANCEMENTS =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLogoutModal();
});

window.viewCV = viewCV;
window.downloadIDCard = downloadIDCard;
window.openLogoutModal = openLogoutModal;
window.closeLogoutModal = closeLogoutModal;
