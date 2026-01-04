import "./Benefits.css";

function Benefits() {
  return (
    <div>
      <section id="benefits">
        <div className="container">
          <div className="section-title">
            <h2>Why Join Hackathon?</h2>
            <p>Benefits you'll get by participating</p>
          </div>

          <div className="benefits">
            <div className="benefit-card glass">
              <div className="benefit-icon">
                <i className="fas fa-network-wired"></i>
              </div>
              <h3>Networking</h3>
              <p>
                Connect with industry professionals, potential employers, and
                like-minded peers from around the globe. Build relationships
                that last beyond the event.
              </p>
            </div>

            <div className="benefit-card glass">
              <div className="benefit-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Skill Development</h3>
              <p>
                Enhance your technical skills, learn new technologies, and
                improve problem-solving abilities under time pressure with
                guidance from expert mentors.
              </p>
            </div>

            <div className="benefit-card glass">
              <div className="benefit-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Career Opportunities</h3>
              <p>
                Get noticed by top tech companies, receive job offers, and
                explore internship opportunities with our sponsors and partner
                organizations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Benefits;
