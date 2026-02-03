import "./About.css";

function About() {
  return (
    <div>
      <section id="about">
        <div className="container">
          <div className="section-title">
            <h2>About Hackathon</h2>
            <p>
              Welcome to TechnoScape, the premier technology event of the year
            </p>
          </div>

          <div className="about-content">
            <div className="about-text glass">
              <h3>What is Hackathon 8.0?</h3>
              <p>
                Hackathon 8.0 is the flagship event of TechnoScape, bringing
                together the brightest minds in technology for a 42-hour coding
                marathon. Our theme "Future Forward: Exploring the Digital
                Horizon" challenges participants to envision and build the
                technologies of tomorrow.
              </p>
              <p>
                This year, we're focusing on four transformative tracks:
                Artificial Intelligence & Machine Learning, Sustainable
                Technology Solutions, Digital Health Innovations, and Financial
                Technology Inclusion. Participants will work in teams to develop
                prototypes that address real-world challenges in these areas.
              </p>
              <p>
                Whether you're a student, professional, or tech enthusiast,
                Hackathon 8.0 offers an unparalleled opportunity to learn from
                industry leaders, network with peers, and showcase your talent
                to potential employers and investors.
              </p>

              <a
                href="https://drive.google.com/file/d/1example_guidebook/view"
                className="guidebook-btn"
                target="_blank"
              >
                <i className="fas fa-download"></i> Download Guidebook (PDF)
              </a>
            </div>

            <div className="about-stats">
              <div className="stat-box glass">
                <h3>120+</h3>
                <p>Projects Submitted</p>
              </div>

              <div className="stat-box glass">
                <h3>60+</h3>
                <p>Industry Mentors</p>
              </div>

              <div className="stat-box glass">
                <h3>15+</h3>
                <p>Technology Workshops</p>
              </div>

              <div className="stat-box glass">
                <h3>24/7</h3>
                <p>Support During Event</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
