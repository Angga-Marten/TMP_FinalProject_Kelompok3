import "../css/LandingPage.css";

function Timeline() {
    return (
        <div>
            <section id="timeline">
                <div className="container">
                    <div className="section-title">
                        <h2>Event Timeline</h2>
                        <p>Important dates and deadlines</p>
                    </div>

                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-content glass">
                                <div className="timeline-date">
                                    <i className="fas fa-calendar-alt"></i>
                                    March 1, 2025
                                </div>
                                <h3>Open Registration</h3>
                                <p>Registration portal opens for all participants. Early bird registrations get exclusive swag!</p>
                                <div className="timeline-dot"></div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-content glass">
                                <div className="timeline-date">
                                    <i className="fas fa-calendar-alt"></i>
                                    April 15, 2025
                                </div>
                                <h3>Close Registration</h3>
                                <p>Last day to register for Hackathon 2025. Limited spots available, so register early!</p>
                                <div className="timeline-dot"></div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-content glass">
                                <div className="timeline-date">
                                    <i className="fas fa-calendar-alt"></i>
                                    April 25, 2025
                                </div>
                                <h3>Technical Meeting</h3>
                                <p>Mandatory orientation session for all participants. <a href="https://meet.google.com/abc-defg-hij" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Join meeting link</a></p>
                                <div className="timeline-dot"></div>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-content glass">
                                <div className="timeline-date">
                                    <i className="fas fa-calendar-alt"></i>
                                    May 10-12, 2025
                                </div>
                                <h3>Competition Day</h3>
                                <p>42 hours of non-stop coding, innovation, and collaboration. Let the hacking begin!</p>
                                <div className="timeline-dot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Timeline