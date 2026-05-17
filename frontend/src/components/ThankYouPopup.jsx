import "./ThankYouPopup.css";
import tickIcon from "../assets/GroupTick.svg";

const ThankYouPopup = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="thankyou-overlay">
      <div className="thankyou-modal">

        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="thankyou-icon">
          <div>
            <img src={tickIcon} alt="success" className="tick-animate" />
          </div>
        </div>

        <h3>Thank You!</h3>

        <p className="thankyou-text">
          We’ve received your <strong>appointment request.</strong>
          <br />
          Our team will reach out to you shortly with the details.
        </p>

        <button
          className="home-btn"
          onClick={() => (window.location.href = "/")}
        >
          Back to Homepage →
        </button>

        <p className="help-text">
          Need help? Please contact our{" "}
          <a href="tel:8858855200" className="link">customer care</a>.
        </p>

      </div>
    </div>
  );
};

export default ThankYouPopup;