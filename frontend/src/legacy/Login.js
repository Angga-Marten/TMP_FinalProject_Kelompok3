// =======================
// SAFE INIT FOR REACT
// =======================
(function () {
  const API_BASE = typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "http://localhost:8000";

  function init() {
    setupFormValidation();
    setupPasswordToggle();
    setupFormSubmission();
    createParticles();
    setupHeaderScroll();
  }

  function createParticles() {
    const particlesContainer = document.getElementById("particles-container");
    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
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

      particlesContainer.appendChild(particle);
    }
  }

  function setupHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  function setupFormValidation() {
    const teamNameInput = document.getElementById("teamName");
    const passwordInput = document.getElementById("password");
    const submitBtn = document.getElementById("submitBtn");

    if (!teamNameInput || !passwordInput || !submitBtn) return;

    const validateForm = () => {
      const teamNameValid = teamNameInput.value.trim().length > 0;
      const passwordValid = passwordInput.value.trim().length > 0;

      updateFieldValidation(
        teamNameInput,
        "teamNameError",
        teamNameValid,
        "Team name is required"
      );
      updateFieldValidation(
        passwordInput,
        "passwordError",
        passwordValid,
        "Password is required"
      );

      submitBtn.disabled = !(teamNameValid && passwordValid);
      return teamNameValid && passwordValid;
    };

    teamNameInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);
    validateForm();
  }

  function updateFieldValidation(input, errorId, isValid, errorMessage) {
    const errorElement = document.getElementById(errorId);
    if (!errorElement) return;

    if (isValid) {
      input.classList.remove("error");
      errorElement.classList.remove("show");
    } else {
      input.classList.add("error");
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show");
    }
  }

  function setupPasswordToggle() {
    const toggleBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (!toggleBtn || !passwordInput) return;

    toggleBtn.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password"
          ? "text"
          : "password";
      passwordInput.setAttribute("type", type);

      const eyeIcon = this.querySelector("i");
      if (!eyeIcon) return;

      if (type === "password") {
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      } else {
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      }
    });
  }

  function setupFormSubmission() {
    const loginForm = document.getElementById("loginForm");
    const submitBtn = document.getElementById("submitBtn");

    if (!loginForm || !submitBtn) return;

    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!validateLogin()) return;

      showLoading();

      const groupName = document.getElementById("teamName").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ groupName, password }),
        });
        const data = await res.json().catch(() => ({}));

        hideLoading();

        if (res.ok && data.token && data.role) {
          localStorage.setItem("hackathonToken", data.token);
          localStorage.setItem("hackathonRole", data.role);
          localStorage.setItem("hackathonTeamName", groupName);

          showToast("Login successful! Redirecting...", "success");

          if (data.role === "admin") {
            setTimeout(() => { window.location.href = "/adminpanel"; }, 1000);
          } else {
            setTimeout(() => { window.location.href = "/userdashboard"; }, 1000);
          }
        } else {
          showToast(data.message || "Invalid team name or password.", "error");
        }
      } catch (err) {
        hideLoading();
        showToast("Network error. Please try again.", "error");
      }
    });
  }

  function validateLogin() {
    const teamName = document.getElementById("teamName").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!teamName) {
      showError("teamNameError", "Team name is required");
      return false;
    }
    if (!password) {
      showError("passwordError", "Password is required");
      return false;
    }
    return true;
  }

  function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (!errorElement) return;

    errorElement.textContent = message;
    errorElement.classList.add("show");
    errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showToast(message, type = "error") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    const toastMessage = toast.querySelector(".toast-message");
    toast.className = `toast ${type}`;
    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  function showLoading() {
    document.getElementById("loadingOverlay")?.classList.add("active");
    const btn = document.getElementById("submitBtn");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    }
  }

  function hideLoading() {
    document.getElementById("loadingOverlay")?.classList.remove("active");
    const btn = document.getElementById("submitBtn");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML =
        '<i class="fas fa-sign-in-alt"></i> Sign In';
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
