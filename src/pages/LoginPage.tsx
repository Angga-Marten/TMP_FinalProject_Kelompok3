import "../components/css/LoginPage.css";
import { useEffect } from "react";
function LoginPage() {
    useEffect(() => {
    import("../legacy/Login.js" as any);
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
                        <a href="/" className="back-btn">
                            <i className="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </nav>
                </div>
            </header>

            <section className="login-container">
                <div className="container">
                    <div className="login-box glass">
                        <div className="login-header">
                            <div className="login-icon">
                                <i className="fas fa-lock"></i>
                            </div>
                            <h1>Welcome Back</h1>
                            <p>Sign in to access your Hackathon 8.0 dashboard</p>
                        </div>

                        <form id="loginForm">
                            <div className="form-group">
                                <label htmlFor="teamName" className="required">Team Name</label>
                                <div className="input-container">
                                    <i className="fas fa-users"></i>
                                    <input type="text" id="teamName" name="teamName" placeholder="Enter your team name" />
                                </div>
                                <div className="error-message" id="teamNameError"></div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="required">Password</label>
                                <div className="input-container">
                                    <i className="fas fa-key"></i>
                                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                                    <button type="button" className="password-toggle" id="togglePassword">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                                <div className="error-message" id="passwordError"></div>
                            </div>

                            <button type="submit" className="submit-btn" id="submitBtn" disabled>
                                <i className="fas fa-sign-in-alt"></i>
                                Sign In
                            </button>
                        </form>

                        <div className="register-link">
                            <p>Don't have an account? <a href="/registerpage">Register here</a></p>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default LoginPage