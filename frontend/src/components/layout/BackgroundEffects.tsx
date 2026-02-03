import "../css/LandingPage.css";

function BackgroundEffects() {
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
    </div>
  );
}

export default BackgroundEffects;
