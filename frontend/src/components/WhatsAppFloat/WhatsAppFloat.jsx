import whatsappIcon from "../../assets/whatsapp-icon.svg";
import "./WhatsAppFloat.css";

const WhatsAppFloat = () => {
  const message = encodeURIComponent(
    "Hi, I want to book an appointment."
  );

  const handleClick = () => {
    // future use: analytics / backend log
    console.log("WhatsApp floating button clicked");
  };

  return (
    <a
      href={`https://wa.me/+918591964442?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-tooltip">Chat on WhatsApp</span>
      <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppFloat;
