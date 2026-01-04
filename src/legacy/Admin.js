// Admin credentials
const ADMIN_GROUP = "admin";
const ADMIN_PASSWORD = "admin123";

// Sample data for demonstration
let teamsData = [
  {
    id: 1,
    teamName: "Code Crusaders",
    teamSize: 3,
    participantType: "binusian",
    registrationDate: "2023-10-15",
    leader: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      whatsapp: "081234567890",
      lineId: "john_doe",
      githubId: "johndoe",
      birthPlace: "Jakarta",
      birthDate: "2000-05-15",
    },
    members: [
      {
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        whatsapp: "081234567891",
        lineId: "jane_smith",
        githubId: "janesmith",
      },
      {
        fullName: "Robert Johnson",
        email: "robert.johnson@example.com",
        whatsapp: "081234567892",
        lineId: "robert_j",
        githubId: "robertj",
      },
    ],
  },
  {
    id: 2,
    teamName: "Innovation Hub",
    teamSize: 4,
    participantType: "non-binusian",
    registrationDate: "2023-10-18",
    leader: {
      fullName: "Alice Williams",
      email: "alice.w@example.com",
      whatsapp: "081234567893",
      lineId: "alice_w",
      githubId: "alicew",
      birthPlace: "Bandung",
      birthDate: "1999-08-22",
    },
    members: [
      {
        fullName: "Bob Brown",
        email: "bob.brown@example.com",
        whatsapp: "081234567894",
        lineId: "bob_brown",
        githubId: "bobbrown",
      },
      {
        fullName: "Charlie Davis",
        email: "charlie.d@example.com",
        whatsapp: "081234567895",
        lineId: "charlie_d",
        githubId: "charlied",
      },
      {
        fullName: "Diana Evans",
        email: "diana.e@example.com",
        whatsapp: "081234567896",
        lineId: "diana_e",
        githubId: "dianae",
      },
    ],
  },
  {
    id: 3,
    teamName: "Byte Brigade",
    teamSize: 2,
    participantType: "binusian",
    registrationDate: "2023-10-20",
    leader: {
      fullName: "Ethan Miller",
      email: "ethan.m@example.com",
      whatsapp: "081234567897",
      lineId: "ethan_m",
      githubId: "ethanm",
      birthPlace: "Surabaya",
      birthDate: "2001-03-10",
    },
    members: [
      {
        fullName: "Fiona Garcia",
        email: "fiona.g@example.com",
        whatsapp: "081234567898",
        lineId: "fiona_g",
        githubId: "fionag",
      },
    ],
  },
  {
    id: 4,
    teamName: "Tech Titans",
    teamSize: 5,
    participantType: "non-binusian",
    registrationDate: "2023-10-22",
    leader: {
      fullName: "George Harris",
      email: "george.h@example.com",
      whatsapp: "081234567899",
      lineId: "george_h",
      githubId: "georgeh",
      birthPlace: "Medan",
      birthDate: "2000-11-30",
    },
    members: [
      {
        fullName: "Helen Clark",
        email: "helen.c@example.com",
        whatsapp: "081234567800",
        lineId: "helen_c",
        githubId: "helenc",
      },
      {
        fullName: "Ian Lewis",
        email: "ian.l@example.com",
        whatsapp: "081234567801",
        lineId: "ian_l",
        githubId: "ianl",
      },
      {
        fullName: "Julia Walker",
        email: "julia.w@example.com",
        whatsapp: "081234567802",
        lineId: "julia_w",
        githubId: "juliaw",
      },
      {
        fullName: "Kevin Hall",
        email: "kevin.h@example.com",
        whatsapp: "081234567803",
        lineId: "kevin_h",
        githubId: "kevinh",
      },
    ],
  },
];

// Check if user is already logged in
function initAdminPanel() {
    console.log("ADMIN INIT OK");

  // Create floating particles
  createParticles();

  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isLoggedIn === "true") {
    showAdminDashboard();
    loadTeamsData();
    renderTeamsTable();
    updateStats();
  } else {
    document.getElementById("loginPage").style.display = "flex";
  }

  // Login form submission
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const group = document.getElementById("adminGroup").value;
    const password = document.getElementById("adminPassword").value;

    if (group === ADMIN_GROUP && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      showToast("Login successful!", "success");

      setTimeout(() => {
        showAdminDashboard();
        loadTeamsData();
        renderTeamsTable();
        updateStats();
      }, 1000);
    } else {
      showToast("Invalid credentials. Please try again.", "error");
    }
  });

  // Logout button
  document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("adminLoggedIn");
    showToast("Logged out successfully.", "success");

    setTimeout(() => {
      document.getElementById("adminDashboard").style.display = "none";
      document.getElementById("loginPage").style.display = "flex";
      document.getElementById("loginForm").reset();
    }, 1000);
  });

  // Search functionality
  document.getElementById("searchInput").addEventListener("input", function () {
    filterTeams();
  });

  // Sort functionality
  document.getElementById("sortByName").addEventListener("change", function () {
    filterTeams();
  });

  document.getElementById("sortByDate").addEventListener("change", function () {
    filterTeams();
  });

  // Modal close buttons
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

  // Confirm delete button
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", deleteTeam);

  // Load teams from localStorage if available
  loadTeamsFromStorage();
};

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particlesContainer");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    const startX = Math.random() * 100;
    particle.style.left = `${startX}%`;

    // Random color
    const colors = [
      "rgba(108, 99, 255, 0.4)",
      "rgba(54, 209, 220, 0.4)",
      "rgba(255, 107, 107, 0.4)",
      "rgba(255, 255, 255, 0.4)",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;

    // Random animation
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 20;
    const endX = (Math.random() - 0.5) * 100;

    particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
    particle.style.setProperty("--end-x", `${endX}px`);

    particlesContainer.appendChild(particle);
  }
}

// Show admin dashboard
function showAdminDashboard() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("adminDashboard").style.display = "block";
}

// Load teams data (from localStorage or use sample data)
function loadTeamsData() {
  const storedTeams = localStorage.getItem("hackathonTeams");

  if (storedTeams) {
    teamsData = JSON.parse(storedTeams);
  } else {
    // If no data in localStorage, use sample data
    localStorage.setItem("hackathonTeams", JSON.stringify(teamsData));
  }
}

// Load teams from localStorage
function loadTeamsFromStorage() {
  const storedTeams = localStorage.getItem("hackathonTeams");

  if (storedTeams) {
    teamsData = JSON.parse(storedTeams);
  }
}

// Render teams table
function renderTeamsTable(teams = teamsData) {
  const tableBody = document.getElementById("teamsTableBody");
  const emptyState = document.getElementById("emptyState");

  if (teams.length === 0) {
    tableBody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  let tableHTML = "";

  teams.forEach((team) => {
    const formattedDate = formatDate(team.registrationDate);
    const participantType =
      team.participantType === "binusian" ? "Binusian" : "Non-Binusian";

    tableHTML += `
                    <tr data-team-id="${team.id}">
                        <td class="team-name-cell">${team.teamName}</td>
                        <td class="team-size-cell">${team.teamSize} members</td>
                        <td>${participantType}</td>
                        <td class="team-date-cell">${formattedDate}</td>
                        <td class="actions-cell">
                            <div class="action-buttons">
                                <button class="btn btn-view" onclick="viewTeam(${team.id})">
                                    <i class="fas fa-eye"></i> View
                                </button>
                                <button class="btn btn-edit" onclick="editTeam(${team.id})">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="btn btn-delete" onclick="confirmDelete(${team.id})">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
  });

  tableBody.innerHTML = tableHTML;
}

// Update dashboard stats
function updateStats() {
  const totalTeams = teamsData.length;
  const binusianTeams = teamsData.filter(
    (team) => team.participantType === "binusian"
  ).length;
  const nonBinusianTeams = totalTeams - binusianTeams;
  const totalParticipants = teamsData.reduce(
    (sum, team) => sum + team.teamSize,
    0
  );

  document.getElementById("totalTeams").textContent = totalTeams;
  document.getElementById("binusianTeams").textContent = binusianTeams;
  document.getElementById("nonBinusianTeams").textContent = nonBinusianTeams;
  document.getElementById("totalParticipants").textContent = totalParticipants;
}

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Filter and sort teams
function filterTeams() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const sortByName = document.getElementById("sortByName").value;
  const sortByDate = document.getElementById("sortByDate").value;

  let filteredTeams = teamsData;

  // Apply search filter
  if (searchTerm) {
    filteredTeams = filteredTeams.filter((team) =>
      team.teamName.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  if (sortByName === "asc") {
    filteredTeams.sort((a, b) => a.teamName.localeCompare(b.teamName));
  } else if (sortByName === "desc") {
    filteredTeams.sort((a, b) => b.teamName.localeCompare(a.teamName));
  }

  if (sortByDate === "newest") {
    filteredTeams.sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );
  } else if (sortByDate === "oldest") {
    filteredTeams.sort(
      (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
    );
  }

  renderTeamsTable(filteredTeams);
}

// View team details
function viewTeam(teamId) {
  const team = teamsData.find((t) => t.id === teamId);

  if (!team) {
    showToast("Team not found.", "error");
    return;
  }

  // Populate team details
  let detailsHTML = `
                <div class="detail-item">
                    <div class="detail-label">Team Name</div>
                    <div class="detail-value">${team.teamName}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Team Size</div>
                    <div class="detail-value">${team.teamSize} members</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Participant Type</div>
                    <div class="detail-value">${
                      team.participantType === "binusian"
                        ? "Binusian"
                        : "Non-Binusian"
                    }</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Registration Date</div>
                    <div class="detail-value">${formatDate(
                      team.registrationDate
                    )}</div>
                </div>
            `;

  document.getElementById("teamDetailsContent").innerHTML = detailsHTML;

  // Populate participants list
  let participantsHTML = "<h3>Team Members</h3>";

  // Team Leader
  participantsHTML += `
                <div class="participant-card">
                    <div class="participant-name">${
                      team.leader.fullName
                    } (Leader)</div>
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${team.leader.email}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">WhatsApp</div>
                        <div class="detail-value">${team.leader.whatsapp}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">LINE ID</div>
                        <div class="detail-value">${team.leader.lineId}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">GitHub/GitLab ID</div>
                        <div class="detail-value">${team.leader.githubId}</div>
                    </div>
                    ${
                      team.leader.birthPlace
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Birth Place</div>
                        <div class="detail-value">${team.leader.birthPlace}</div>
                    </div>
                    `
                        : ""
                    }
                    ${
                      team.leader.birthDate
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Birth Date</div>
                        <div class="detail-value">${formatDate(
                          team.leader.birthDate
                        )}</div>
                    </div>
                    `
                        : ""
                    }
                </div>
            `;

  // Team Members
  team.members.forEach((member) => {
    participantsHTML += `
                    <div class="participant-card">
                        <div class="participant-name">${member.fullName}</div>
                        <div class="detail-item">
                            <div class="detail-label">Email</div>
                            <div class="detail-value">${member.email}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">WhatsApp</div>
                            <div class="detail-value">${member.whatsapp}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">LINE ID</div>
                            <div class="detail-value">${member.lineId}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">GitHub/GitLab ID</div>
                            <div class="detail-value">${member.githubId}</div>
                        </div>
                    </div>
                `;
  });

  document.getElementById("participantsList").innerHTML = participantsHTML;

  // Show modal
  document.getElementById("viewModal").classList.add("active");
}

// Close view modal
function closeViewModal() {
  document.getElementById("viewModal").classList.remove("active");
}

// Edit team
function editTeam(teamId) {
  const team = teamsData.find((t) => t.id === teamId);

  if (!team) {
    showToast("Team not found.", "error");
    return;
  }

  // Store current team ID for saving
  window.currentEditTeamId = teamId;

  // Create edit form
  let formHTML = `
                <div class="form-group">
                    <label for="editTeamName">Team Name</label>
                    <input type="text" id="editTeamName" value="${
                      team.teamName
                    }" required>
                </div>
                
                <div class="form-group">
                    <label for="editParticipantType">Participant Type</label>
                    <select id="editParticipantType" required>
                        <option value="binusian" ${
                          team.participantType === "binusian" ? "selected" : ""
                        }>Binusian</option>
                        <option value="non-binusian" ${
                          team.participantType === "non-binusian"
                            ? "selected"
                            : ""
                        }>Non-Binusian</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="editTeamSize">Team Size</label>
                    <input type="number" id="editTeamSize" min="1" max="5" value="${
                      team.teamSize
                    }" required>
                </div>
                
                <div class="form-group">
                    <label for="editRegistrationDate">Registration Date</label>
                    <input type="date" id="editRegistrationDate" value="${
                      team.registrationDate
                    }" required>
                </div>
                
                <h3 style="grid-column: 1 / -1; margin-top: 20px; color: var(--primary);">Team Leader Details</h3>
                
                <div class="form-group">
                    <label for="editLeaderName">Full Name</label>
                    <input type="text" id="editLeaderName" value="${
                      team.leader.fullName
                    }" required>
                </div>
                
                <div class="form-group">
                    <label for="editLeaderEmail">Email</label>
                    <input type="email" id="editLeaderEmail" value="${
                      team.leader.email
                    }" required>
                </div>
                
                <div class="form-group">
                    <label for="editLeaderWhatsapp">WhatsApp Number</label>
                    <input type="tel" id="editLeaderWhatsapp" value="${
                      team.leader.whatsapp
                    }" required>
                </div>
                
                <div class="form-group">
                    <label for="editLeaderLineId">LINE ID</label>
                    <input type="text" id="editLeaderLineId" value="${
                      team.leader.lineId
                    }" required>
                </div>
                
                <div class="form-group">
                    <label for="editLeaderGithubId">GitHub/GitLab ID</label>
                    <input type="text" id="editLeaderGithubId" value="${
                      team.leader.githubId
                    }" required>
                </div>
                
                <div class="form-group">
                    <label for="editLeaderBirthPlace">Birth Place</label>
                    <input type="text" id="editLeaderBirthPlace" value="${
                      team.leader.birthPlace || ""
                    }">
                </div>
                
                <div class="form-group">
                    <label for="editLeaderBirthDate">Birth Date</label>
                    <input type="date" id="editLeaderBirthDate" value="${
                      team.leader.birthDate || ""
                    }">
                </div>
                
                <h3 style="grid-column: 1 / -1; margin-top: 20px; color: var(--primary);">Team Members</h3>
            `;

  // Add members to form
  team.members.forEach((member, index) => {
    formHTML += `
                    <div style="grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 20px;">
                        <h4 style="color: var(--text-light); margin-bottom: 15px;">Member ${
                          index + 1
                        }</h4>
                        <div class="form-group">
                            <label for="editMemberName${index}">Full Name</label>
                            <input type="text" id="editMemberName${index}" value="${
      member.fullName
    }" required>
                        </div>
                        <div class="form-group">
                            <label for="editMemberEmail${index}">Email</label>
                            <input type="email" id="editMemberEmail${index}" value="${
      member.email
    }" required>
                        </div>
                        <div class="form-group">
                            <label for="editMemberWhatsapp${index}">WhatsApp Number</label>
                            <input type="tel" id="editMemberWhatsapp${index}" value="${
      member.whatsapp
    }" required>
                        </div>
                        <div class="form-group">
                            <label for="editMemberLineId${index}">LINE ID</label>
                            <input type="text" id="editMemberLineId${index}" value="${
      member.lineId
    }" required>
                        </div>
                        <div class="form-group">
                            <label for="editMemberGithubId${index}">GitHub/GitLab ID</label>
                            <input type="text" id="editMemberGithubId${index}" value="${
      member.githubId
    }" required>
                        </div>
                    </div>
                `;
  });

  document.getElementById("editTeamForm").innerHTML = formHTML;

  // Show modal
  document.getElementById("editModal").classList.add("active");
}

// Close edit modal
function closeEditModal() {
  document.getElementById("editModal").classList.remove("active");
  window.currentEditTeamId = null;
}

// Save edited team
document.getElementById("saveEditBtn").addEventListener("click", function () {
  if (!window.currentEditTeamId) return;

  const teamIndex = teamsData.findIndex(
    (t) => t.id === window.currentEditTeamId
  );

  if (teamIndex === -1) {
    showToast("Team not found.", "error");
    return;
  }

  // Get updated values
  const updatedTeam = {
    ...teamsData[teamIndex],
    teamName: document.getElementById("editTeamName").value,
    participantType: document.getElementById("editParticipantType").value,
    teamSize: parseInt(document.getElementById("editTeamSize").value),
    registrationDate: document.getElementById("editRegistrationDate").value,
    leader: {
      ...teamsData[teamIndex].leader,
      fullName: document.getElementById("editLeaderName").value,
      email: document.getElementById("editLeaderEmail").value,
      whatsapp: document.getElementById("editLeaderWhatsapp").value,
      lineId: document.getElementById("editLeaderLineId").value,
      githubId: document.getElementById("editLeaderGithubId").value,
      birthPlace: document.getElementById("editLeaderBirthPlace").value || null,
      birthDate: document.getElementById("editLeaderBirthDate").value || null,
    },
  };

  // Update members
  const updatedMembers = [];
  const team = teamsData[teamIndex];

  for (let i = 0; i < team.members.length; i++) {
    updatedMembers.push({
      ...team.members[i],
      fullName: document.getElementById(`editMemberName${i}`).value,
      email: document.getElementById(`editMemberEmail${i}`).value,
      whatsapp: document.getElementById(`editMemberWhatsapp${i}`).value,
      lineId: document.getElementById(`editMemberLineId${i}`).value,
      githubId: document.getElementById(`editMemberGithubId${i}`).value,
    });
  }

  updatedTeam.members = updatedMembers;

  // Update team data
  teamsData[teamIndex] = updatedTeam;

  // Save to localStorage
  localStorage.setItem("hackathonTeams", JSON.stringify(teamsData));

  // Update UI
  renderTeamsTable();
  updateStats();

  // Close modal
  closeEditModal();

  showToast("Team updated successfully!", "success");
});

// Confirm delete team
function confirmDelete(teamId) {
  const team = teamsData.find((t) => t.id === teamId);

  if (!team) {
    showToast("Team not found.", "error");
    return;
  }

  // Store current team ID for deletion
  window.currentDeleteTeamId = teamId;

  // Set team name in confirmation message
  document.getElementById("deleteTeamName").textContent = team.teamName;

  // Show modal
  document.getElementById("deleteModal").classList.add("active");
}

// Close delete modal
function closeDeleteModal() {
  document.getElementById("deleteModal").classList.remove("active");
  window.currentDeleteTeamId = null;
}

// Delete team
function deleteTeam() {
  if (!window.currentDeleteTeamId) return;

  const teamIndex = teamsData.findIndex(
    (t) => t.id === window.currentDeleteTeamId
  );

  if (teamIndex === -1) {
    showToast("Team not found.", "error");
    return;
  }

  // Remove team from array
  teamsData.splice(teamIndex, 1);

  // Save to localStorage
  localStorage.setItem("hackathonTeams", JSON.stringify(teamsData));

  // Update UI
  renderTeamsTable();
  updateStats();
  filterTeams();

  // Close modal
  closeDeleteModal();

  showToast("Team deleted successfully!", "success");
}

// Show toast notification
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const toastIcon = toast.querySelector(".toast-icon i");
  const toastMessage = toast.querySelector(".toast-message");

  toast.className = `toast ${type}`;
  toastMessage.textContent = message;

  if (type === "error") {
    toastIcon.className = "fas fa-exclamation-circle";
  } else if (type === "success") {
    toastIcon.className = "fas fa-check-circle";
  } else if (type === "warning") {
    toastIcon.className = "fas fa-exclamation-triangle";
  } else {
    toastIcon.className = "fas fa-info-circle";
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Handle clicks outside modals to close them
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