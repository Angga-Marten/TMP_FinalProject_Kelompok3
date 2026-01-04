// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard();
});

// ===== MAIN FUNCTIONS =====
function initializeDashboard() {
  createParticles();
  loadUserData();
  setupEventListeners();
  setupCardHoverEffects();
}

function createParticles() {
  const container = document.getElementById("particles-container");
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    const colors = [
      "rgba(108, 99, 255, 0.3)",
      "rgba(54, 209, 220, 0.3)",
      "rgba(255, 107, 107, 0.3)",
      "rgba(255, 255, 255, 0.3)",
    ];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
  }
}

function loadUserData() {
  const userData = getUserData();
  Object.keys(userData).forEach((key) => {
    const element = document.getElementById(key);
    if (element) element.textContent = userData[key];
  });
}

function getUserData() {
  return {
    teamName: localStorage.getItem("hackathonTeamName") || "Tech Innovators",
    teamNameValue: localStorage.getItem("hackathonTeamName") || "Tech Innovators",
    leaderFullName: localStorage.getItem("fullName") || "Tony Stark",
    leaderEmail: localStorage.getItem("email") || "tony.stark@techinnovators.com",
    leaderWhatsApp: localStorage.getItem("whatsapp") || "+1 (555) 123-4567",
    leaderLineId: localStorage.getItem("lineId") || "@tonystark",
    leaderGithubId: localStorage.getItem("githubId") || "tonystark-dev",
    leaderBirthDetails: `${localStorage.getItem("birthPlace") || "New York"}, ${localStorage.getItem("birthDate") || "May 29, 1970"}`,
    leaderParticipantType: localStorage.getItem("participantType") || "Non-Binusian",
    registrationDate: "October 15, 2025",
  };
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

  setTimeout(() => {
    showToast("Logout successful! Redirecting to home page...", "success");
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/landingpage";
    }, 2000);
  }, 1500);
}

function viewCV() {
  const notification = createNotification(
    "Opening CV",
    "Your CV is being opened in a new tab...",
    "fas fa-file-pdf"
  );
  const progressBar = notification.querySelector("#progressBar");
  setTimeout(() => (progressBar.style.width = "100%"), 100);

  setTimeout(() => {
    document.body.removeChild(notification);
    window.open(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      "_blank"
    );
  }, 1600);
}

function downloadIDCard() {
  const btn = document.getElementById("viewIdCard");
  if (!btn) return;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    btn.style.background = "var(--gradient-1)";
    btn.style.color = "white";

    simulateDownload("ID_Card_Hackathon_2025.png");
    showToast("ID Card downloaded successfully!", "success");

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  }, 1000);
}

// ===== UTILITY FUNCTIONS =====
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  const icon = toast.querySelector(".toast-icon i");
  const messageEl = toast.querySelector(".toast-message");

  toast.className = `toast ${type}`;
  messageEl.textContent = message;
  icon.className =
    type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function createNotification(title, message, icon) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--glass-bg);
    backdrop-filter: blur(30px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 30px;
    box-shadow: var(--shadow);
    z-index: 3000;
    text-align: center;
    max-width: 400px;
    width: 90%;
  `;
  notification.innerHTML = `
    <div style="width: 60px; height: 60px; background: var(--gradient-1); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin: 0 auto 20px;">
      <i class="${icon}"></i>
    </div>
    <h3 style="font-family: 'Poppins', sans-serif; color: var(--text); margin-bottom: 10px;">${title}</h3>
    <p style="color: var(--text-light); margin-bottom: 20px;">${message}</p>
    <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.5); border-radius: 2px; overflow: hidden;">
      <div id="progressBar" style="width: 0%; height: 100%; background: var(--gradient-1); transition: width 1.5s;"></div>
    </div>
  `;
  document.body.appendChild(notification);
  return notification;
}

function simulateDownload(filename) {
  const link = document.createElement("a");
  link.href = "#";
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ===== ENHANCEMENTS =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLogoutModal();
});

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s";
  setTimeout(() => (document.body.style.opacity = "1"), 100);
});

window.viewCV = viewCV;
window.downloadIDCard = downloadIDCard;
window.openLogoutModal = openLogoutModal;
window.closeLogoutModal = closeLogoutModal;