// Global variables
let currentStep = 1;
const totalSteps = 3;
const API_BASE = typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "http://localhost:8000";

// Initialize
function initRegisterPage() {
  setupPasswordValidation();
  setupFileUploads();
  setupParticipantTypeListener();
  setupRealTimeValidation();
  setupDateRestrictions();
  updateProgressBar();
  createParticles();
  setupHeaderScroll();
}

// Create animated particles
function createParticles() {
  const particlesContainer = document.getElementById("particles-container");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    // Random color
    const colors = [
      "rgba(108, 99, 255, 0.3)",
      "rgba(54, 209, 220, 0.3)",
      "rgba(255, 107, 107, 0.3)",
      "rgba(255, 255, 255, 0.3)",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;

    particlesContainer.appendChild(particle);
  }
}

// Setup header scroll effect
function setupHeaderScroll() {
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Update progress bar
function updateProgressBar() {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;

  // Update step indicators
  document.querySelectorAll(".step").forEach((step) => {
    const stepNum = parseInt(step.getAttribute("data-step"));
    step.classList.remove("active", "completed");

    if (stepNum < currentStep) {
      step.classList.add("completed");
    } else if (stepNum === currentStep) {
      step.classList.add("active");
    }
  });
}

// Navigate to step
function goToStep(step) {
  // Hide all steps
  document.querySelectorAll(".form-step").forEach((formStep) => {
    formStep.classList.remove("active");
  });

  // Show target step
  document.getElementById(`step${step}`).classList.add("active");
  currentStep = step;
  updateProgressBar();
}

// Next step
function nextStep(current) {
  if (!validateStep(current)) return;

  if (current === 1) {
    setupIdUploadSection();
  }

  if (current === 2) {
    updateReviewSection();
  }

  goToStep(current + 1);
}

// Previous step
function prevStep(current) {
  goToStep(current - 1);
}

// Setup password validation
function setupPasswordValidation() {
  const passwordInput = document.getElementById("password");
  const requirements = {
    length: document.getElementById("reqLength"),
    uppercase: document.getElementById("reqUppercase"),
    lowercase: document.getElementById("reqLowercase"),
    number: document.getElementById("reqNumber"),
    special: document.getElementById("reqSpecial"),
  };

  passwordInput.addEventListener("input", function () {
    const password = this.value;

    // Check each requirement
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    // Update UI
    updateRequirementUI(requirements.length, hasLength);
    updateRequirementUI(requirements.uppercase, hasUppercase);
    updateRequirementUI(requirements.lowercase, hasLowercase);
    updateRequirementUI(requirements.number, hasNumber);
    updateRequirementUI(requirements.special, hasSpecial);

    // Validate confirm password
    validateConfirmPassword();
  });

  // Also validate confirm password when it changes
  document
    .getElementById("confirmPassword")
    .addEventListener("input", validateConfirmPassword);
}

function updateRequirementUI(element, isValid) {
  if (isValid) {
    element.classList.add("valid");
    element.classList.remove("invalid");
    element.querySelector("i").className = "fas fa-check-circle";
    element.querySelector("i").style.color = "var(--success)";
  } else {
    element.classList.add("invalid");
    element.classList.remove("valid");
    element.querySelector("i").className = "fas fa-circle";
    element.querySelector("i").style.color = "var(--text-light)";
  }
}

// Setup file uploads
function setupFileUploads() {
  // CV file
  document.getElementById("cv").addEventListener("change", function (e) {
    const fileName = e.target.files[0]
      ? e.target.files[0].name
      : "No file chosen";
    document.getElementById("cvFileName").textContent = fileName;
    validateFile(this, "cvError", [".pdf", ".jpg", ".jpeg", ".png"]);
  });
}

// Setup participant type listener
function setupParticipantTypeListener() {
  document
    .querySelectorAll('input[name="participantType"]')
    .forEach((radio) => {
      radio.addEventListener("change", function () {
        if (currentStep >= 2) {
          setupIdUploadSection();
        }
      });
    });
}

// Setup date restrictions
function setupDateRestrictions() {
  const birthDateInput = document.getElementById("birthDate");
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 17,
    today.getMonth(),
    today.getDate()
  );

  // Format date for input
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Set max date to 17 years ago
  birthDateInput.max = formatDate(minDate);

  // Set placeholder
  birthDateInput.setAttribute("placeholder", "Select your birth date");
}

// Setup ID upload section based on participant type
function setupIdUploadSection() {
  const participantType = document.querySelector(
    'input[name="participantType"]:checked'
  );
  const idUploadSection = document.getElementById("idUploadSection");

  if (!participantType) {
    idUploadSection.innerHTML = "";
    return;
  }

  let html = "";
  if (participantType.value === "binusian") {
    html = `
                    <label for="flazzCard" class="required">Upload Flazz Card</label>
                    <div class="file-upload">
                        <input type="file" id="flazzCard" name="flazzCard" accept=".pdf,.jpg,.jpeg,.png">
                        <div class="file-upload-label">
                            <span><i class="fas fa-upload"></i> Choose file</span>
                            <span class="file-name" id="flazzCardFileName">No file chosen</span>
                        </div>
                    </div>
                    <div class="error-message" id="flazzCardError"></div>
                    <small style="color: var(--text-light); margin-top: 5px; display: block;">
                        Accepted formats: PDF, JPG, JPEG, PNG
                    </small>
                `;
  } else {
    html = `
                    <label for="idCard" class="required">Upload ID Card</label>
                    <div class="file-upload">
                        <input type="file" id="idCard" name="idCard" accept=".pdf,.jpg,.jpeg,.png">
                        <div class="file-upload-label">
                            <span><i class="fas fa-upload"></i> Choose file</span>
                            <span class="file-name" id="idCardFileName">No file chosen</span>
                        </div>
                    </div>
                    <div class="error-message" id="idCardError"></div>
                    <small style="color: var(--text-light); margin-top: 5px; display: block;">
                        Accepted formats: PDF, JPG, JPEG, PNG
                    </small>
                `;
  }

  idUploadSection.innerHTML = html;

  // Add event listeners for new file inputs
  if (participantType.value === "binusian") {
    document
      .getElementById("flazzCard")
      .addEventListener("change", function (e) {
        const fileName = e.target.files[0]
          ? e.target.files[0].name
          : "No file chosen";
        document.getElementById("flazzCardFileName").textContent = fileName;
        validateFile(this, "flazzCardError", [".pdf", ".jpg", ".jpeg", ".png"]);
      });
  } else {
    document.getElementById("idCard").addEventListener("change", function (e) {
      const fileName = e.target.files[0]
        ? e.target.files[0].name
        : "No file chosen";
      document.getElementById("idCardFileName").textContent = fileName;
      validateFile(this, "idCardError", [".pdf", ".jpg", ".jpeg", ".png"]);
    });
  }
}

// Setup real-time validation
function setupRealTimeValidation() {
  // Group name
  document.getElementById("groupName").addEventListener("input", function () {
    validateField(this, "groupNameError", validateGroupName);
  });

  // Email
  document.getElementById("email").addEventListener("input", function () {
    validateField(this, "emailError", validateEmail);
  });

  // WhatsApp
  document.getElementById("whatsapp").addEventListener("input", function () {
    validateField(this, "whatsappError", validateWhatsapp);
  });

  // LINE ID
  document.getElementById("lineId").addEventListener("input", function () {
    validateField(this, "lineIdError", validateLineId);
  });

  // GitHub ID
  document.getElementById("githubId").addEventListener("input", function () {
    validateField(this, "githubIdError", validateGithubId);
  });

  // Birth place
  document.getElementById("birthPlace").addEventListener("change", function () {
    validateField(this, "birthPlaceError", validateBirthPlace);
  });

  // Birth date
  document.getElementById("birthDate").addEventListener("change", function () {
    validateField(this, "birthDateError", validateBirthDate);
  });
}

// Validate step
function validateStep(step) {
  let isValid = true;

  if (step === 1) {
    // Group name
    isValid =
      validateField(
        document.getElementById("groupName"),
        "groupNameError",
        validateGroupName
      ) && isValid;

    // Password
    isValid =
      validateField(
        document.getElementById("password"),
        "passwordError",
        validatePassword
      ) && isValid;

    // Confirm password
    isValid = validateConfirmPassword() && isValid;

    // Participant type
    const participantType = document.querySelector(
      'input[name="participantType"]:checked'
    );
    if (!participantType) {
      showError("participantTypeError", "Please select participant type");
      isValid = false;
    } else {
      hideError("participantTypeError");
    }
  }

  if (step === 2) {
    // Full name
    isValid =
      validateField(
        document.getElementById("fullName"),
        "fullNameError",
        validateFullName
      ) && isValid;

    // Email
    isValid =
      validateField(
        document.getElementById("email"),
        "emailError",
        validateEmail
      ) && isValid;

    // WhatsApp
    isValid =
      validateField(
        document.getElementById("whatsapp"),
        "whatsappError",
        validateWhatsapp
      ) && isValid;

    // LINE ID
    isValid =
      validateField(
        document.getElementById("lineId"),
        "lineIdError",
        validateLineId
      ) && isValid;

    // GitHub ID
    isValid =
      validateField(
        document.getElementById("githubId"),
        "githubIdError",
        validateGithubId
      ) && isValid;

    // Birth place
    isValid =
      validateField(
        document.getElementById("birthPlace"),
        "birthPlaceError",
        validateBirthPlace
      ) && isValid;

    // Birth date
    isValid =
      validateField(
        document.getElementById("birthDate"),
        "birthDateError",
        validateBirthDate
      ) && isValid;

    // CV
    isValid =
      validateFile(document.getElementById("cv"), "cvError", [
        ".pdf",
        ".jpg",
        ".jpeg",
        ".png",
      ]) && isValid;

    // ID upload based on participant type
    const participantType = document.querySelector(
      'input[name="participantType"]:checked'
    );
    if (participantType) {
      if (participantType.value === "binusian") {
        isValid =
          validateFile(document.getElementById("flazzCard"), "flazzCardError", [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png",
          ]) && isValid;
      } else {
        isValid =
          validateFile(document.getElementById("idCard"), "idCardError", [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png",
          ]) && isValid;
      }
    }
  }

  return isValid;
}

// Validate field
function validateField(field, errorId, validationFunction) {
  const value = field.value.trim();
  const error = validationFunction(value, field);

  if (error) {
    showError(errorId, error);
    field.classList.add("error");
    return false;
  } else {
    hideError(errorId);
    field.classList.remove("error");
    return true;
  }
}

// Show error
function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// Hide error
function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.classList.remove("show");
}

// Show toast
function showToast(message, type = "error") {
  const toast = document.getElementById("toast");
  const toastIcon = toast.querySelector(".toast-icon i");
  const toastMessage = toast.querySelector(".toast-message");

  toast.className = `toast ${type}`;
  toastMessage.textContent = message;

  if (type === "error") {
    toastIcon.className = "fas fa-exclamation-circle";
  } else {
    toastIcon.className = "fas fa-check-circle";
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

// Show loading
function showLoading() {
  document.getElementById("loadingOverlay").classList.add("active");
}

// Hide loading
function hideLoading() {
  document.getElementById("loadingOverlay").classList.remove("active");
}

// Validation functions
function validateGroupName(value) {
  if (!value) return "Group name cannot be empty";
  if (value.length < 3) return "Group name must be at least 3 characters";
  return null;
}

function validatePassword(value) {
  if (!value) return "Password cannot be empty";
  if (/\s/.test(value)) return "Password cannot contain spaces";
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(value))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(value))
    return "Password must contain at least one lowercase letter";
  if (!/\d/.test(value)) return "Password must contain at least one number";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value))
    return "Password must contain at least one special character";
  return null;
}

function validateConfirmPassword() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorId = "confirmPasswordError";

  if (!confirmPassword) {
    showError(errorId, "Please confirm your password");
    document.getElementById("confirmPassword").classList.add("error");
    return false;
  }

  if (password !== confirmPassword) {
    showError(errorId, "Passwords do not match");
    document.getElementById("confirmPassword").classList.add("error");
    return false;
  }

  hideError(errorId);
  document.getElementById("confirmPassword").classList.remove("error");
  return true;
}

function validateFullName(value) {
  if (!value) return "Full name cannot be empty";
  if (value.length < 3) return "Full name must be at least 3 characters";
  return null;
}

function validateEmail(value) {
  if (!value) return "Email cannot be empty";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address (e.g., user@gmail.com)";
  }

  return null;
}

function validateWhatsapp(value) {
  if (!value) return "WhatsApp number cannot be empty";

  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length < 9) return "WhatsApp number must be at least 9 digits";

  return null;
}

function validateLineId(value) {
  if (!value) return "LINE ID cannot be empty";
  return null;
}

function validateGithubId(value) {
  if (!value) return "GitHub/GitLab ID cannot be empty";
  return null;
}

function validateBirthPlace(value) {
  if (!value) return "Please select birth place";
  return null;
}

function validateBirthDate(value) {
  if (!value) return "Please select birth date";

  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 17) {
    return "You must be at least 17 years old";
  }

  return null;
}

function validateFile(fileInput, errorId, allowedExtensions) {
  if (!fileInput.files || fileInput.files.length === 0) {
    showError(errorId, "Please upload a file");
    return false;
  }

  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const isValidExtension = allowedExtensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (!isValidExtension) {
    showError(
      errorId,
      `Please upload a file with one of these formats: ${allowedExtensions
        .join(", ")
        .replace(/\./g, "")}`
    );
    return false;
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    showError(errorId, "File size must be less than 5MB");
    return false;
  }

  hideError(errorId);
  return true;
}

// Update review section
function updateReviewSection() {
  // Group information
  document.getElementById("reviewGroupName").textContent =
    document.getElementById("groupName").value;

  const participantType = document.querySelector(
    'input[name="participantType"]:checked'
  );
  document.getElementById("reviewParticipantType").textContent = participantType
    ? participantType.value === "binusian"
      ? "Binusian"
      : "Non-Binusian"
    : "";

  // Leader information
  document.getElementById("reviewFullName").textContent =
    document.getElementById("fullName").value;
  document.getElementById("reviewEmail").textContent =
    document.getElementById("email").value;
  document.getElementById("reviewWhatsapp").textContent =
    document.getElementById("whatsapp").value;
  document.getElementById("reviewLineId").textContent =
    document.getElementById("lineId").value;
  document.getElementById("reviewGithubId").textContent =
    document.getElementById("githubId").value;
  document.getElementById("reviewBirthPlace").textContent =
    document.getElementById("birthPlace").value;

  // Format birth date
  const birthDate = document.getElementById("birthDate").value;
  if (birthDate) {
    const date = new Date(birthDate);
    document.getElementById("reviewBirthDate").textContent =
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  }

  // Files
  const cvFile = document.getElementById("cv").files[0];
  document.getElementById("reviewCv").textContent = cvFile ? cvFile.name : "";

  // ID upload
  const reviewIdUpload = document.getElementById("reviewIdUpload");
  if (participantType) {
    if (participantType.value === "binusian") {
      const flazzCard = document.getElementById("flazzCard").files[0];
      reviewIdUpload.innerHTML = `<strong>Flazz Card:</strong> <span>${flazzCard ? flazzCard.name : ""
        }</span>`;
    } else {
      const idCard = document.getElementById("idCard").files[0];
      reviewIdUpload.innerHTML = `<strong>ID Card:</strong> <span>${idCard ? idCard.name : ""
        }</span>`;
    }
  }
}

// Submit form
async function submitForm() {
  if (!validateStep(1) || !validateStep(2)) {
    showToast("Please fix all errors before submitting");
    return;
  }

  showLoading();

  const groupName = document.getElementById("groupName").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const participantType = document.querySelector('input[name="participantType"]:checked');
  const isBinusian = participantType && participantType.value === "binusian";

  try {
    const groupRes = await fetch(`${API_BASE}/api/register/group`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupName,
        password,
        confirmPassword,
        isBinusian,
      }),
    });
    const groupData = await groupRes.json().catch(() => ({}));

    if (!groupRes.ok) {
      hideLoading();
      showToast(groupData.message || "Registration failed (group).");
      return;
    }

    const groupId = groupData.groupId;
    const formData = new FormData();
    formData.append("groupId", groupId);
    formData.append("fullName", document.getElementById("fullName").value.trim());
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("whatsappNumber", document.getElementById("whatsapp").value.trim());
    formData.append("lineId", document.getElementById("lineId").value.trim());
    formData.append("githubId", document.getElementById("githubId").value.trim());
    formData.append("birthPlace", document.getElementById("birthPlace").value);
    formData.append("birthDate", document.getElementById("birthDate").value);
    formData.append("isBinusian", isBinusian ? "true" : "false");

    const cvInput = document.getElementById("cv");
    const flazzInput = document.getElementById("flazzCard");
    const idCardInput = document.getElementById("idCard");
    if (cvInput?.files?.[0]) formData.append("cvFile", cvInput.files[0]);
    if (flazzInput?.files?.[0]) formData.append("flazzFile", flazzInput.files[0]);
    if (idCardInput?.files?.[0]) formData.append("idCardFile", idCardInput.files[0]);

    const leaderRes = await fetch(`${API_BASE}/api/register/leader`, {
      method: "POST",
      body: formData,
    });
    const leaderData = await leaderRes.json().catch(() => ({}));

    hideLoading();

    if (!leaderRes.ok) {
      showToast(leaderData.message || "Registration failed (leader).");
      return;
    }

    showToast("Registration successful! You can now login.", "success");

    setTimeout(() => {
      document.querySelectorAll("form").forEach((form) => form.reset());
      document.querySelectorAll(".file-name").forEach((el) => (el.textContent = "No file chosen"));
      document.querySelectorAll(".requirement").forEach((el) => {
        el.classList.remove("valid");
        const icon = el.querySelector("i");
        if (icon) {
          icon.className = "fas fa-circle";
          icon.style.color = "var(--text-light)";
        }
      });
      goToStep(1);
      window.location.href = "/loginpage";
    }, 2500);
  } catch (err) {
    hideLoading();
    showToast("Network error. Please try again.");
  }
}

window.initRegisterPage = initRegisterPage;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.submitForm = submitForm;