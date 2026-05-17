import { useState } from "react";
import "./RequestCallback.css";
import doctorImg from "../../../assets/High res images 1.png";
import phoneIcon from "../../../assets/fluent_call-16-filled.png";

const RequestCallback = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ important

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      
      const response = await fetch(
  "https://script.google.com/macros/s/AKfycbziTLfF2tWloC-WaTA2EC-rp-lH2UI2NS_6PrvacVIT3Y1CeycnWfUUuC52c9amSzd6/exec",
  {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      name,
      phone,
      type: "Callback",
    }),
  }
);


      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setError("");

        setTimeout(() => {
          setName("");
          setPhone("");
          setIsSubmitted(false);
        }, 2500);
      } else {
        setError(result.error || "Something went wrong. Try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="callback-wrapper">
      <div className="callback-card">
        <form className="callback-form" onSubmit={handleSubmit}>
          <h2>Request a Call Back</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSubmitting}
          />

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`callback-btn ${isSubmitting ? "loading" : ""} ${
              isSubmitted ? "success" : ""
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : isSubmitted
              ? "Submitted ✓"
              : "Submit Details"}
          </button>
        </form>

        <div className="callback-image">
          <img src={doctorImg} alt="Doctor" />
        </div>
      </div>

      <div className="support-card">
        <h3>
          Need Support? <br /> We're Here:
        </h3>

        <p className="support-label">ICTC Helpline:</p>

        <div className="support-phone">
          <img src={phoneIcon} alt="phone" />
          <span>885 885 5200</span>
        </div>
      </div>
    </section>
  );
};

export default RequestCallback;
