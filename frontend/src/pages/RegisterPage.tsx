import "../legacy/Regist.js";
import "../components/css/RegisterPage.css";
import { useEffect } from "react";

declare global {
  interface Window {
    nextStep: (step: number) => void;
    prevStep: (step: number) => void;
    submitForm: () => void;
    initRegisterPage: () => void;
  }
}

function RegisterPage() {
  useEffect(() => {
    window.initRegisterPage();
  }, []);
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

      <div className="loading-overlay" id="loadingOverlay">
        <div className="loading-spinner"></div>
      </div>

      <div className="toast" id="toast">
        <div className="toast-icon">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <div className="toast-message">This is a toast message</div>
      </div>

      <header>
        <div className="container">
          <nav>
            <a href="/" className="logo">
              <i className="fas fa-code"></i>
              <span>HACKATHON</span>
            </a>
            <a href="/" className="btn" style={{ "padding": "12px 28px" }}>
              <i className="fas fa-arrow-left"></i> Back to Home
            </a>
          </nav>
        </div>
      </header>

      <section className="register-container">
        <div className="container">
          <div className="register-box glass">
            <div className="progress-steps">
              <div className="progress-bar" id="progressBar"></div>
              <div className="step active" data-step="1">
                <div className="step-icon">1</div>
                <div className="step-label">Group Info</div>
              </div>
              <div className="step" data-step="2">
                <div className="step-icon">2</div>
                <div className="step-label">Leader Info</div>
              </div>
              <div className="step" data-step="3">
                <div className="step-icon">3</div>
                <div className="step-label">Review</div>
              </div>
            </div>

            <div className="register-header">
              <h1>Register for Hackathon 8.0</h1>
              <p>Complete the form below to join the competition</p>
            </div>

            <form id="step1" className="form-step active">
              <div className="form-group">
                <label htmlFor="groupName" className="required">Group Name</label>
                <input type="text" id="groupName" name="groupName" placeholder="Enter your group name" />
                <div className="error-message" id="groupNameError"></div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="password" className="required">Password</label>
                    <input type="password" id="password" name="password" placeholder="Create a password" />
                    <div className="error-message" id="passwordError"></div>

                    <div className="password-requirements">
                      <div className="requirement" id="reqLength">
                        <i className="fas fa-circle"></i> Minimum 8 characters
                      </div>
                      <div className="requirement" id="reqUppercase">
                        <i className="fas fa-circle"></i> At least one uppercase letter
                      </div>
                      <div className="requirement" id="reqLowercase">
                        <i className="fas fa-circle"></i> At least one lowercase letter
                      </div>
                      <div className="requirement" id="reqNumber">
                        <i className="fas fa-circle"></i> At least one number
                      </div>
                      <div className="requirement" id="reqSpecial">
                        <i className="fas fa-circle"></i> At least one special character
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="required">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" />
                    <div className="error-message" id="confirmPasswordError"></div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="required">Participant Type</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input type="radio" id="binusian" name="participantType" value="binusian" />
                    <label htmlFor="binusian" style={{ marginBottom: "0" }}>Binusian</label>
                  </div>
                  <div className="radio-option">
                    <input type="radio" id="nonBinusian" name="participantType" value="non-binusian" />
                    <label htmlFor="nonBinusian" style={{ marginBottom: "0" }}>Non-Binusian</label>
                  </div>
                </div>
                <div className="error-message" id="participantTypeError"></div>
              </div>

              <div className="form-navigation">
                <div></div>
                <button
                  type="button"
                  className="btn btn-next"
                  onClick={() => window.nextStep(1)}
                >
                  Next <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>

            <form id="step2" className="form-step">
              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="fullName" className="required">Full Name</label>
                    <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
                    <div className="error-message" id="fullNameError"></div>
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="email" className="required">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                    <div className="error-message" id="emailError"></div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="whatsapp" className="required">WhatsApp Number</label>
                    <input type="tel" id="whatsapp" name="whatsapp" placeholder="Enter your WhatsApp number" />
                    <div className="error-message" id="whatsappError"></div>
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="lineId" className="required">LINE ID</label>
                    <input type="text" id="lineId" name="lineId" placeholder="Enter your LINE ID" />
                    <div className="error-message" id="lineIdError"></div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="githubId" className="required">GitHub/GitLab ID</label>
                    <input type="text" id="githubId" name="githubId" placeholder="Enter your GitHub/GitLab ID" />
                    <div className="error-message" id="githubIdError"></div>
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="birthPlace" className="required">Birth Place</label>
                    <select id="birthPlace" name="birthPlace">
                      <option value="">Select birth place</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Medan">Medan</option>
                      <option value="Semarang">Semarang</option>
                      <option value="Yogyakarta">Yogyakarta</option>
                      <option value="Bali">Bali</option>
                      <option value="Makassar">Makassar</option>
                      <option value="Palembang">Palembang</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="error-message" id="birthPlaceError"></div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="birthDate" className="required">Birth Date</label>
                    <input type="date" id="birthDate" name="birthDate" />
                    <div className="error-message" id="birthDateError"></div>
                  </div>
                </div>
                <div className="form-col">
                  <div className="form-group">
                    <label htmlFor="cv" className="required">Upload CV</label>
                    <div className="file-upload">
                      <input type="file" id="cv" name="cv" accept=".pdf,.jpg,.jpeg,.png" />
                      <div className="file-upload-label">
                        <span><i className="fas fa-upload"></i> Choose file</span>
                        <span className="file-name" id="cvFileName">No file chosen</span>
                      </div>
                    </div>
                    <div className="error-message" id="cvError"></div>
                    <small style={{ color: "var(--text-light)", marginTop: "5px", display: "block" }}>
                      Accepted formats: PDF, JPG, JPEG, PNG
                    </small>
                  </div>
                </div>
              </div>

              <div className="form-group" id="idUploadSection">
              </div>

              <div className="form-navigation">
                <button type="button" className="btn btn-prev" onClick={() => window.prevStep(2)}>
                  <i className="fas fa-arrow-left"></i> Previous
                </button>
                <button type="button" className="btn btn-next" onClick={() => window.nextStep(2)}>Next <i className="fas fa-arrow-right"></i></button>
              </div>
            </form>

            <form id="step3" className="form-step">
              <div className="form-group">
                <h3 style={{ marginBottom: "30px", color: "var(--text)" }}>Review Your Information</h3>

                <div style={{ background: "rgba(255, 255, 255, 0.5)", padding: "25px", borderRadius: "15px", marginBottom: "25px" }}>
                  <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>Group Information</h4>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>Group Name:</strong> <span id="reviewGroupName"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>Participant Type:</strong> <span id="reviewParticipantType"></span>
                  </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.5)", padding: "25px", borderRadius: "15px" }}>
                  <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>Leader Information</h4>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>Full Name:</strong> <span id="reviewFullName"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>Email:</strong> <span id="reviewEmail"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>WhatsApp:</strong> <span id="reviewWhatsapp"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>LINE ID:</strong> <span id="reviewLineId"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>GitHub/GitLab ID:</strong> <span id="reviewGithubId"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>Birth Place:</strong> <span id="reviewBirthPlace"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>Birth Date:</strong> <span id="reviewBirthDate"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }}>
                    <strong>CV File:</strong> <span id="reviewCv"></span>
                  </div>
                  <div className="review-item" style={{ marginBottom: "10px" }} id="reviewIdUpload">
                  </div>
                </div>
              </div>

              <div className="form-navigation">
                <button type="button" className="btn btn-prev" onClick={() => window.prevStep(3)}>
                  <i className="fas fa-arrow-left"></i> Previous
                </button>
                <button type="button" className="btn btn-submit" onClick={() => window.submitForm()}>
                  <i className="fas fa-paper-plane"></i> Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RegisterPage