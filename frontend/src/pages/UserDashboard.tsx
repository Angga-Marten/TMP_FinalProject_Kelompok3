import "../components/css/UserDashboard.css";
import { useEffect } from "react";
import "../legacy/UserDash.js";


declare global {
  interface Window {
    viewCV: () => void;
    downloadIDCard: () => void;
    openLogoutModal: () => void;
    closeLogoutModal: () => void;
    initDashboard: () => void;
  }
}

function UserDashboard() {
  useEffect(() => {
    // Initialize dashboard data loading
    if (window.initDashboard) {
      window.initDashboard();
    }

    const viewCvBtn = document.getElementById("viewCv");
    if (viewCvBtn && window.viewCV) {
      viewCvBtn.addEventListener("click", window.viewCV);
    }

    const downloadIdBtn = document.getElementById("viewIdCard");
    if (downloadIdBtn && window.downloadIDCard) {
      downloadIdBtn.addEventListener("click", window.downloadIDCard);
    }

    const logoutBtn = document.getElementById("logoutTrigger");
    if (logoutBtn && window.openLogoutModal) {
      logoutBtn.addEventListener("click", window.openLogoutModal);
    }

    const header = document.querySelector("header");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 100) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);



    return () => {
      // cleanup saat komponen di-unmount
      if (viewCvBtn && window.viewCV) viewCvBtn.removeEventListener("click", window.viewCV);
      if (downloadIdBtn && window.downloadIDCard) downloadIdBtn.removeEventListener("click", window.downloadIDCard);
      if (logoutBtn && window.openLogoutModal) logoutBtn.removeEventListener("click", window.openLogoutModal);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLogout = () => {
    const btn = document.getElementById("confirmLogout");
    if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';

    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/"; // redirect ke landing page
    }, 1500);
  };

  const closeLogoutModal = () => {
    const modal = document.getElementById("logoutModal");
    if (modal) modal.classList.remove("active");
  };

  const openLogoutModal = () => {
    const modal = document.getElementById("logoutModal");
    if (modal) modal.classList.add("active");
  };

  return (
    <div>
      <div className="animated-bg">
        <div className="bg-gradient"></div>
      </div>

      <div className="glass-shapes-container">
        <div className="glass-shape shape-1"></div>
        <div className="glass-shape shape-2"></div>
        <div className="glass-shape shape-3"></div>
        <div className="glass-shape shape-4"></div>
        <div className="glass-shape shape-5"></div>
        <div className="glass-shape shape-6"></div>

        <div className="glass-rect rect-1"></div>
        <div className="glass-rect rect-2"></div>
        <div className="glass-rect rect-3"></div>
      </div>

      <div className="particles" id="particles-container"></div>

      <div className="toast" id="toast">
        <div className="toast-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-message"></div>
      </div>

      <header>
        <div className="container">
          <nav>
            <a href="/" className="logo">
              <i className="fas fa-code"></i>
              <span>HACKATHON</span>
            </a>
            <button onClick={openLogoutModal} className="logout-btn" id="logoutTrigger">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="dashboard-container">
        <div className="container">
          <section className="welcome-section">
            <h1>Welcome to Your Dashboard</h1>
            <div className="team-name" id="teamName"></div>
            <p>Manage your team information, view important documents, and stay updated with hackathon timeline.</p>
            <div className="status-badge">
              <i className="fas fa-check-circle"></i>
              Registered & Verified
            </div>
          </section>

          <div className="dashboard-grid">
            <section className="leader-info-card glass">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-user-tie"></i>
                  Team Leader Information
                </h2>
                <span className="read-only-badge">Read-only data</span>
              </div>

              <div className="leader-info-grid">
                <div className="info-group">
                  <h4><i className="fas fa-user"></i> Personal Information</h4>
                  <div className="info-group-content">
                    <div className="info-item">
                      <div className="info-label">Full Name</div>
                      <div className="info-value" id="leaderFullName"></div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Email</div>
                      <div className="info-value email" id="leaderEmail"></div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Birth Details</div>
                      <div className="info-value" id="leaderBirthDetails"></div>
                    </div>
                  </div>
                </div>

                <div className="info-group">
                  <h4><i className="fas fa-address-book"></i> Contact Information</h4>
                  <div className="info-group-content">
                    <div className="info-item">
                      <div className="info-label">WhatsApp</div>
                      <div className="info-value" id="leaderWhatsApp"></div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">LINE ID</div>
                      <div className="info-value" id="leaderLineId"></div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">GitHub/GitLab</div>
                      <div className="info-value" id="leaderGithubId"></div>
                    </div>
                  </div>
                </div>

                <div className="info-group">
                  <h4><i className="fas fa-clipboard-check"></i> Registration Details</h4>
                  <div className="info-group-content">
                    <div className="info-item">
                      <div className="info-label">Team Name</div>
                      <div className="info-value" id="teamNameValue"></div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Participant Type</div>
                      <div className="info-value" id="leaderParticipantType"></div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Registration Date</div>
                      <div className="info-value" id="registrationDate"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="documents-card glass">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-folder-open"></i>
                  Team Documents
                </h2>
              </div>
              <p>View or download your uploaded documents</p>
              <div className="document-cards">
                <article className="document-card">
                  <div className="document-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h4>Team CV/Resume</h4>
                  <p>PDF Document</p>
                  <button className="glass-btn" id="viewCv">
                    <i className="fas fa-eye"></i>
                    View CV
                  </button>
                </article>
                <article className="document-card">
                  <div className="document-icon">
                    <i className="fas fa-id-card"></i>
                  </div>
                  <h4>ID Card / Flazz Card</h4>
                  <p>Image/PDF Document</p>
                  <button className="glass-btn" id="viewIdCard">
                    <i className="fas fa-download"></i>
                    Download
                  </button>
                </article>
              </div>
            </section>

            <section className="timeline-card glass">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-calendar-alt"></i>
                  Event Timeline
                </h2>
              </div>
              <p>Important dates and links for the hackathon</p>
              <div className="timeline">
                <article className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </div>
                  <div className="timeline-date">September 1, 2025</div>
                  <div className="timeline-content">
                    <h4>Open Registration</h4>
                    <p>Registration portal opens for all participants</p>
                    <a href="/registerpage" className="timeline-link" target="_blank">
                      Registration Page
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                  <div className="timeline-date">September 30, 2025</div>
                  <div className="timeline-content">
                    <h4>Close Registration</h4>
                    <p>Last day to register for the hackathon</p>
                    <a href="/registerpage" className="timeline-link" target="_blank">
                      Check Status
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="timeline-date">October 5, 2025</div>
                  <div className="timeline-content">
                    <h4>Technical Meeting</h4>
                    <p>Mandatory online meeting for all participants</p>
                    <a href="https://meet.google.com" className="timeline-link" target="_blank">
                      Join Meeting
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-icon">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="timeline-date">October 10-12, 2025</div>
                  <div className="timeline-content">
                    <h4>Competition Day</h4>
                    <p>Main hackathon event starts</p>
                    <a href="/landingpage" className="timeline-link" target="_blank">
                      Event Details
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </article>
              </div>
            </section>

            <section className="contact-card glass">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-headset"></i>
                  Contact Person
                </h2>
              </div>
              <p>Need help? Contact our support team</p>
              <ul className="contact-list">
                <li>
                  <div className="contact-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="contact-details">
                    <h4>John Doe</h4>
                    <p>Technical Support</p>
                    <p>john.doe@technoscape.com | +1 (555) 987-6543</p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Sarah Smith</h4>
                    <p>Participant Coordinator</p>
                    <p>sarah.smith@technoscape.com | +1 (555) 456-7890</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <div className="glass-modal-overlay" id="logoutModal">
        <div className="glass-modal">
          <div className="modal-header">
            <div className="modal-icon">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <h3>Confirm Logout</h3>
          </div>
          <div className="modal-body">
            <p>Apakah Anda yakin ingin logout?</p>
          </div>
          <div className="modal-actions">
            <button onClick={closeLogoutModal} className="modal-btn btn-cancel" id="cancelLogout">
              <i className="fas fa-times"></i>
              Tidak (Kembali ke Dashboard)
            </button>
            <button onClick={handleLogout} className="modal-btn btn-logout" id="confirmLogout">
              <i className="fas fa-check"></i>
              Ya (Logout)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard