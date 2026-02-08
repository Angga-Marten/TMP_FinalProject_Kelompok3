const API_BASE =
  typeof window !== "undefined" && window.API_BASE
    ? window.API_BASE
    : "http://localhost:8000";

let teamsData = [];

function getToken() {
  return localStorage.getItem("hackathonToken");
}

function isAdmin() {
  return localStorage.getItem("hackathonRole") === "admin";
}

function initAdminPanel() {
  createParticles();

  if (getToken() && isAdmin()) {
    showAdminDashboard();
    loadTeamsData();
  } else {
    document.getElementById("loginPage").style.display = "flex";
  }

  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const group = document.getElementById("adminGroup").value.trim();
      const password = document.getElementById("adminPassword").value;

      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ groupName: group, password }),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.token && data.role === "admin") {
          localStorage.setItem("hackathonToken", data.token);
          localStorage.setItem("hackathonRole", "admin");
          showToast("Login successful!", "success");
          setTimeout(() => {
            showAdminDashboard();
            loadTeamsData();
          }, 500);
        } else {
          showToast(data.message || "Invalid credentials.", "error");
        }
      } catch (err) {
        showToast("Network error. Please try again.", "error");
      }
    });

  document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("hackathonToken");
    localStorage.removeItem("hackathonRole");
    showToast("Logged out successfully.", "success");
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/"; // redirect ke landing page
    }, 1500);
  });

  document.getElementById("searchInput").addEventListener("input", function () {
    filterTeams();
  });
  document.getElementById("sortByName").addEventListener("change", function () {
    filterTeams();
  });
  document.getElementById("sortByDate").addEventListener("change", function () {
    filterTeams();
  });

  document
    .getElementById("closeViewModal")
    .addEventListener("click", closeViewModal);
  document
    .getElementById("closeViewModalBtn")
    .addEventListener("click", closeViewModal);
  document
    .getElementById("closeEditModal")
    .addEventListener("click", closeEditModal);
  document
    .getElementById("cancelEditBtn")
    .addEventListener("click", closeEditModal);
  document
    .getElementById("closeDeleteModal")
    .addEventListener("click", closeDeleteModal);
  document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", closeDeleteModal);
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", deleteTeam);

  const saveEditBtn = document.getElementById("saveEditBtn");
  if (saveEditBtn) {
    saveEditBtn.addEventListener("click", saveTeamEdit);
  }
}

function createParticles() {
  const particlesContainer = document.getElementById("particlesContainer");
  if (!particlesContainer) return;
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    const colors = [
      "rgba(108, 99, 255, 0.4)",
      "rgba(54, 209, 220, 0.4)",
      "rgba(255, 107, 107, 0.4)",
      "rgba(255, 255, 255, 0.4)",
    ];
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 20;
    particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
    particle.style.setProperty("--end-x", `${(Math.random() - 0.5) * 100}px`);
    particlesContainer.appendChild(particle);
  }
}

function showAdminDashboard() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("adminDashboard").style.display = "block";
}

async function loadTeamsData() {
  const token = getToken();
  if (!token) return;
  try {
    const res = await fetch(`${API_BASE}/api/admin/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      localStorage.removeItem("hackathonToken");
      localStorage.removeItem("hackathonRole");
      document.getElementById("adminDashboard").style.display = "none";
      document.getElementById("loginPage").style.display = "flex";
      return;
    }
    const data = await res.json().catch(() => ({}));
    teamsData = data.teams || [];
    renderTeamsTable(teamsData);
    updateStats();
  } catch (err) {
    showToast("Failed to load teams.", "error");
  }
}

async function filterTeams() {
  const token = getToken();
  if (!token) return;
  const search = document.getElementById("searchInput").value.trim();
  const sortByName = document.getElementById("sortByName").value;
  const sortByDate = document.getElementById("sortByDate").value;

  let sortBy = "";
  if (sortByName === "asc") sortBy = "name_asc";
  else if (sortByName === "desc") sortBy = "name_desc";
  else if (sortByDate === "newest") sortBy = "date_desc";
  else if (sortByDate === "oldest") sortBy = "date_asc";

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (sortBy) params.set("sortBy", sortBy);
  const qs = params.toString();

  try {
    const res = await fetch(
      `${API_BASE}/api/admin/teams${qs ? "?" + qs : ""}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (res.status === 401) {
      localStorage.removeItem("hackathonToken");
      localStorage.removeItem("hackathonRole");
      document.getElementById("adminDashboard").style.display = "none";
      document.getElementById("loginPage").style.display = "flex";
      return;
    }
    const data = await res.json().catch(() => ({}));
    teamsData = data.teams || [];
    renderTeamsTable(teamsData);
    updateStats();
  } catch (err) {
    showToast("Failed to filter teams.", "error");
  }
}

function renderTeamsTable(teams = teamsData) {
  const tableBody = document.getElementById("teamsTableBody");
  const emptyState = document.getElementById("emptyState");
  if (!tableBody) return;

  if (teams.length === 0) {
    tableBody.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }
  if (emptyState) emptyState.style.display = "none";

  let tableHTML = "";
  teams.forEach((team) => {
    const formattedDate = formatDate(team.registrationDate);
    const participantType =
      team.participantType === "binusian" ? "Binusian" : "Non-Binusian";
    tableHTML += `
      <tr data-team-id="${team.id}">
        <td class="team-name-cell">${escapeHtml(team.teamName)}</td>
        <td>${participantType}</td>
        <td class="team-date-cell">${formattedDate}</td>
        <td class="actions-cell">
          <div class="action-buttons">
            <button class="btn btn-view" onclick="viewTeam(${team.id})"><i class="fas fa-eye"></i> View</button>
            <button class="btn btn-edit" onclick="editTeam(${team.id})"><i class="fas fa-edit"></i> Edit</button>
            <button class="btn btn-delete" onclick="confirmDelete(${team.id})"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `;
  });
  tableBody.innerHTML = tableHTML;
}

function escapeHtml(s) {
  if (s == null) return "";
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function updateStats() {
  const totalTeams = teamsData.length;
  const binusianTeams = teamsData.filter(
    (t) => t.participantType === "binusian",
  ).length;
  const nonBinusianTeams = totalTeams - binusianTeams;
  const totalParticipants = teamsData.reduce(
    (sum, t) => sum + (t.teamSize || 1),
    0,
  );

  const el = (id) => document.getElementById(id);
  if (el("totalTeams")) el("totalTeams").textContent = totalTeams;
  if (el("binusianTeams")) el("binusianTeams").textContent = binusianTeams;
  if (el("nonBinusianTeams"))
    el("nonBinusianTeams").textContent = nonBinusianTeams;
  if (el("totalParticipants"))
    el("totalParticipants").textContent = totalParticipants;
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function viewTeam(teamId) {
  const team = teamsData.find((t) => t.id === teamId);
  if (!team) {
    showToast("Team not found.", "error");
    return;
  }

  let detailsHTML = `
    <div class="detail-item"><div class="detail-label">Team Name</div><div class="detail-value">${escapeHtml(team.teamName)}</div></div>
    <div class="detail-item"><div class="detail-label">Participant Type</div><div class="detail-value">${team.participantType === "binusian" ? "Binusian" : "Non-Binusian"}</div></div>
    <div class="detail-item"><div class="detail-label">Registration Date</div><div class="detail-value">${formatDate(team.registrationDate)}</div></div>
  `;
  document.getElementById("teamDetailsContent").innerHTML = detailsHTML;

  let participantsHTML = "<h3>Team Leader</h3>";
  const leader = team.leader;
  if (leader) {
    participantsHTML += `
      <div class="participant-card">
        <div class="participant-name">${escapeHtml(leader.fullName)} (Leader)</div>
        <div class="detail-item"><div class="detail-label">Email</div><div class="detail-value">${escapeHtml(leader.email)}</div></div>
        <div class="detail-item"><div class="detail-label">WhatsApp</div><div class="detail-value">${escapeHtml(leader.whatsappNumber)}</div></div>
        <div class="detail-item"><div class="detail-label">LINE ID</div><div class="detail-value">${escapeHtml(leader.lineId)}</div></div>
        <div class="detail-item"><div class="detail-label">GitHub/GitLab ID</div><div class="detail-value">${escapeHtml(leader.githubId || "-")}</div></div>
        ${leader.birthPlace ? `<div class="detail-item"><div class="detail-label">Birth Place</div><div class="detail-value">${escapeHtml(leader.birthPlace)}</div></div>` : ""}
        ${leader.birthDate ? `<div class="detail-item"><div class="detail-label">Birth Date</div><div class="detail-value">${formatDate(leader.birthDate)}</div></div>` : ""}
      </div>
    `;
  }
  document.getElementById("participantsList").innerHTML = participantsHTML;
  document.getElementById("viewModal").classList.add("active");
}

function closeViewModal() {
  document.getElementById("viewModal").classList.remove("active");
}

function editTeam(teamId) {
  const team = teamsData.find((t) => t.id === teamId);
  if (!team) {
    showToast("Team not found.", "error");
    return;
  }

  window.currentEditTeamId = teamId;
  const leader = team.leader || {};

  let formHTML = `
    <div class="form-group">
      <label for="editTeamName">Team Name</label>
      <input type="text" id="editTeamName" value="${escapeHtml(team.teamName)}" required>
    </div>
    <div class="form-group">
      <label for="editParticipantType">Participant Type</label>
      <select id="editParticipantType" required>
        <option value="binusian" ${team.participantType === "binusian" ? "selected" : ""}>Binusian</option>
        <option value="non-binusian" ${team.participantType === "non-binusian" ? "selected" : ""}>Non-Binusian</option>
      </select>
    </div>
    <h3 style="grid-column: 1 / -1; margin-top: 20px; color: var(--primary);">Team Leader Details</h3>
    <div class="form-group">
      <label for="editLeaderName">Full Name</label>
      <input type="text" id="editLeaderName" value="${escapeHtml(leader.fullName || "")}" required>
    </div>
    <div class="form-group">
      <label for="editLeaderEmail">Email</label>
      <input type="email" id="editLeaderEmail" value="${escapeHtml(leader.email || "")}" required>
    </div>
    <div class="form-group">
      <label for="editLeaderWhatsapp">WhatsApp Number</label>
      <input type="tel" id="editLeaderWhatsapp" value="${escapeHtml(leader.whatsappNumber || "")}" required>
    </div>
    <div class="form-group">
      <label for="editLeaderLineId">LINE ID</label>
      <input type="text" id="editLeaderLineId" value="${escapeHtml(leader.lineId || "")}" required>
    </div>
    <div class="form-group">
      <label for="editLeaderGithubId">GitHub/GitLab ID</label>
      <input type="text" id="editLeaderGithubId" value="${escapeHtml(leader.githubId || "")}">
    </div>
    <div class="form-group">
      <label for="editLeaderBirthPlace">Birth Place</label>
      <input type="text" id="editLeaderBirthPlace" value="${escapeHtml(leader.birthPlace || "")}">
    </div>
    <div class="form-group">
      <label for="editLeaderBirthDate">Birth Date</label>
      <input type="date" id="editLeaderBirthDate" value="${leader.birthDate || ""}">
    </div>
  `;
  document.getElementById("editTeamForm").innerHTML = formHTML;
  document.getElementById("editModal").classList.add("active");
}

function closeEditModal() {
  document.getElementById("editModal").classList.remove("active");
  window.currentEditTeamId = null;
}

async function saveTeamEdit() {
  if (!window.currentEditTeamId) return;
  const token = getToken();
  if (!token) return;

  const body = {
    group_name: document.getElementById("editTeamName").value.trim(),
    is_binusian:
      document.getElementById("editParticipantType").value === "binusian",
    leader: {
      fullName: document.getElementById("editLeaderName").value.trim(),
      email: document.getElementById("editLeaderEmail").value.trim(),
      whatsappNumber: document
        .getElementById("editLeaderWhatsapp")
        .value.trim(),
      lineId: document.getElementById("editLeaderLineId").value.trim(),
      githubId: document.getElementById("editLeaderGithubId").value.trim(),
      birthPlace: document.getElementById("editLeaderBirthPlace").value.trim(),
      birthDate: document.getElementById("editLeaderBirthDate").value || null,
    },
  };

  try {
    const res = await fetch(
      `${API_BASE}/api/admin/teams/${window.currentEditTeamId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(data.message || "Update failed.", "error");
      return;
    }
    showToast("Team updated successfully!", "success");
    closeEditModal();
    loadTeamsData();
  } catch (err) {
    showToast("Network error.", "error");
  }
}

function confirmDelete(teamId) {
  const team = teamsData.find((t) => t.id === teamId);
  if (!team) {
    showToast("Team not found.", "error");
    return;
  }
  window.currentDeleteTeamId = teamId;
  document.getElementById("deleteTeamName").textContent = team.teamName;
  document.getElementById("deleteModal").classList.add("active");
}

function closeDeleteModal() {
  document.getElementById("deleteModal").classList.remove("active");
  window.currentDeleteTeamId = null;
}

async function deleteTeam() {
  if (!window.currentDeleteTeamId) return;
  const token = getToken();
  if (!token) return;

  try {
    const res = await fetch(
      `${API_BASE}/api/admin/teams/${window.currentDeleteTeamId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showToast(data.message || "Delete failed.", "error");
      return;
    }
    showToast("Team deleted successfully!", "success");
    closeDeleteModal();
    loadTeamsData();
  } catch (err) {
    showToast("Network error.", "error");
  }
}

function showToast(message, type) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  const toastIcon = toast.querySelector(".toast-icon i");
  const toastMessage = toast.querySelector(".toast-message");
  toast.className = `toast ${type}`;
  toastMessage.textContent = message;
  if (type === "error") toastIcon.className = "fas fa-exclamation-circle";
  else if (type === "success") toastIcon.className = "fas fa-check-circle";
  else toastIcon.className = "fas fa-info-circle";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-overlay")) {
    closeViewModal();
    closeEditModal();
    closeDeleteModal();
  }
});

window.initAdminPanel = initAdminPanel;
window.viewTeam = viewTeam;
window.editTeam = editTeam;
window.confirmDelete = confirmDelete;
