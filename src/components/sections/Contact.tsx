import "../css/LandingPage.css";

function Contact() {
    return (
        <div>
            <section id="contact">
                <div className="container">
                    <div className="section-title">
                        <h2>Contact Us</h2>
                        <p>Get in touch with our team</p>
                    </div>

                    <div className="contact-form glass">
                        <form id="contactForm">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" className="form-control" required></textarea>
                            </div>

                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    </div>

                    <div className="social-media">
                        <a href="#" className="social-icon" title="Instagram TechnoScape">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="mailto:technoscape@example.com" className="social-icon" title="Email TechnoScape">
                            <i className="fas fa-envelope"></i>
                        </a>
                        <a href="#" className="social-icon" title="Twitter BNCC">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon" title="Facebook BNCC">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="social-icon" title="LinkedIn BNCC">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact