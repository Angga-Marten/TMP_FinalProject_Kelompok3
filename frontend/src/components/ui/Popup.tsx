import "../css/LandingPage.css";

function Popup() {
  return (
    <div>
      <div className="popup" id="confirmationPopup">
        <div className="popup-content glass">
          <button className="close-popup">&times;</button>
          <div className="popup-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3>Message Sent Successfully!</h3>
          <p>
            Thank you for contacting us. We'll get back to you as soon as
            possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Popup;