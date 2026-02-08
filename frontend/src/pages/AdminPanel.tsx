import "../components/css/AdminPanel.css";
import { useEffect } from "react";

declare global {
  interface Window {
    initAdminPanel?: () => void;
    viewTeam?: (id: number) => void;
    editTeam?: (id: number) => void;
    confirmDelete?: (id: number) => void;
  }
}

function AdminPanel() {
  useEffect(() => {
    import("../legacy/Admin.js" as any).then(() => {
      window.initAdminPanel?.();
    });
  }, []);
  return (
    <div>
      <div className="animated-bg">
        <div className="bg-gradient"></div>
      </div>

      <div className="particles-container" id="particlesContainer"></div>

      <div className="glass-shapes-container">
        <div className="glass-shape shape-1"></div>
        <div className="glass-shape shape-2"></div>
        <div className="glass-shape shape-3"></div>
        <div className="glass-shape shape-4"></div>
        <div className="glass-shape shape-5"></div>
        <div className="glass-shape shape-6"></div>
        <div className="glass-shape shape-7"></div>
        <div className="glass-shape shape-8"></div>
      </div>

      <div className="toast" id="toast">
        <div className="toast-icon">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <div className="toast-message">This is a toast message</div>
      </div>

      <div id="loginPage" className="login-container">
        <div className="login-box glass">
          <div className="login-header">
            <h1>Admin Login</h1>
            <p>Enter your credentials to access the admin panel</p>
          </div>

          <form id="loginForm" className="login-form">
            <div className="form-group">
              <label htmlFor="adminGroup">Admin Group Name</label>
              <input
                type="text"
                id="adminGroup"
                name="adminGroup"
                placeholder="Enter admin group name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminPassword">Password</label>
              <input
                type="password"
                id="adminPassword"
                name="adminPassword"
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login <i className="fas fa-sign-in-alt"></i>
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              color: "var(--text-light)",
              fontSize: "0.9rem",
            }}
          >
            <p>
              Default credentials: Group: <strong>admin</strong> | Password:{" "}
              <strong>admin123</strong>
            </p>
          </div>
        </div>
      </div>

      <div id="adminDashboard" style={{ display: "none" }}>
        <header>
          <div className="container">
            <nav>
              <a href="/" className="logo">
                <i className="fas fa-code"></i>
                <span>HACKATHON</span>
              </a>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                  <i className="fas fa-user-shield"></i> Admin Panel
                </span>
                <a href="#" className="logout-btn" id="logoutBtn">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </div>
            </nav>
          </div>
        </header>

        <section className="admin-container">
          <div className="container">
            <div className="admin-box glass">
              <div className="admin-header">
                <h1>Participant Management</h1>
                <p>Manage all registered teams for Hackathon 8.0</p>
              </div>

              <div className="dashboard-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-number" id="totalTeams">
                    0
                  </div>
                  <div className="stat-label">Total Teams</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div className="stat-number" id="binusianTeams">
                    0
                  </div>
                  <div className="stat-label">Binusian Teams</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="stat-number" id="nonBinusianTeams">
                    0
                  </div>
                  <div className="stat-label">Non-Binusian Teams</div>
                </div>
              </div>

              <div className="controls-section">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    id="searchInput"
                    placeholder="Search teams by name..."
                  />
                </div>

                <div className="sort-box">
                  <select id="sortByName">
                    <option value="">Sort by Name</option>
                    <option value="asc">A-Z (Ascending)</option>
                    <option value="desc">Z-A (Descending)</option>
                  </select>

                  <select id="sortByDate">
                    <option value="">Sort by Registration Date</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              <div className="teams-table-container">
                <table className="teams-table">
                  <thead>
                    <tr>
                      <th>Team Name</th>
                      <th>Participant Type</th>
                      <th className="team-date-cell">Registration Date</th>
                      <th className="actions-cell">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="teamsTableBody"></tbody>
                </table>
              </div>

              <div
                id="emptyState"
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  display: "none",
                }}
              >
                <i
                  className="fas fa-users"
                  style={{
                    fontSize: "4rem",
                    color: "var(--text-light)",
                    marginBottom: "20px",
                  }}
                ></i>
                <h3
                  style={{ color: "var(--text-light)", marginBottom: "10px" }}
                >
                  No Teams Found
                </h3>
                <p style={{ color: "var(--text-light)" }}>
                  No teams have registered yet or match your search criteria.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="modal-overlay" id="viewModal">
        <div className="modal">
          <div className="modal-header">
            <h2>Team Details</h2>
            <button className="close-modal" id="closeViewModal">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="team-details" id="teamDetailsContent"></div>

            <div className="participants-list" id="participantsList"></div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-cancel" id="closeViewModalBtn">
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="modal-overlay" id="editModal">
        <div className="modal">
          <div className="modal-header">
            <h2>Edit Team</h2>
            <button className="close-modal" id="closeEditModal">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <form id="editTeamForm" className="edit-form"></form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-cancel" id="cancelEditBtn">
              Cancel
            </button>
            <button className="btn btn-save" id="saveEditBtn">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="modal-overlay" id="deleteModal">
        <div className="modal" style={{ maxWidth: "400px" }}>
          <div className="modal-header">
            <h2>Confirm Deletion</h2>
            <button className="close-modal" id="closeDeleteModal">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <p
              style={{
                textAlign: "center",
                color: "var(--text-light)",
                fontSize: "1.1rem",
                marginBottom: "15px",
              }}
            >
              <i
                className="fas fa-exclamation-triangle"
                style={{
                  color: "var(--warning)",
                  fontSize: "3rem",
                  marginBottom: "20px",
                  display: "block",
                }}
              ></i>
              Are you sure you want to delete{" "}
              <strong id="deleteTeamName">[Team Name]</strong>?
            </p>
            <p style={{ textAlign: "center", color: "var(--text-light)" }}>
              This action cannot be undone. All team data will be permanently
              deleted.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-cancel" id="cancelDeleteBtn">
              Cancel
            </button>
            <button className="btn btn-delete" id="confirmDeleteBtn">
              Delete Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
