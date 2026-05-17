import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { areaCentreMap, centerSlugMap } from "../../../data/centerData";
import "./BookAppointment.css";
import doctorImg from "../../../assets/ICTC female doctor 1.png";
import tickIcon from "../../../assets/Vector (8).png";
import ThankYouPopup from "../../ThankYouPopup";

const BookAppointment = () => {
  /* ============================
     STATE
  ============================ */
  const [formData, setFormData] = useState({
    patientname: "",
    age: "",
    phone: "",
    area: "",
    center: "",
    date: "",
    source: "Website_Form",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Remove isSubmitted, use URL instead
  const [, setShowSameDayNotice] = useState(false);
  const [showTomorrowHint, setShowTomorrowHint] = useState(false);

  /* ============================
     HELPERS
  ============================ */
 const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);

  // 🚫 Skip Sunday
  if (d.getDay() === 0) {
    d.setDate(d.getDate() + 1);
  }

  return d.toISOString().split("T")[0];
};


  /* ============================
     INPUT CHANGE HANDLER
  ============================ */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const today = new Date();

      // 🚫 SUNDAY — ABSOLUTE BLOCK
      if (selectedDate.getDay() === 0) {
        setErrors({ date: "SUNDAY_BLOCK" });
        setFormData((prev) => ({ ...prev, date: "" }));
        setShowSameDayNotice(false);
        setShowTomorrowHint(false);
        return;
      }

      const isSameDay =
        selectedDate.toDateString() === today.toDateString();
      const currentHour = today.getHours();

      // ⏰ SAME DAY AFTER 12 PM
      if (isSameDay && currentHour >= 12) {
        setErrors({ date: "SAME_DAY_BLOCK" });
        setShowSameDayNotice(true);
        setShowTomorrowHint(true);
        return;
      }

      setShowSameDayNotice(false);
      setShowTomorrowHint(false);
    }

    setErrors({});
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ============================
     AREA SELECT
  ============================ */
  const handleAreaChange = (area) => {
    setFormData((prev) => ({
      ...prev,
      area,
      center: "",
    }));
  };

  /* ============================
     CENTER SELECT
  ============================ */
  const handleCentreChange = (center) => {
    setFormData((prev) => ({
      ...prev,
      center,
    }));
  };

  /* ============================
     VALIDATION
  ============================ */
  const validate = () => {
    const newErrors = {};

    if (!formData.patientname.trim())
      newErrors.patientname = "Patient name is required";

    if (!formData.age || formData.age < 1 || formData.age > 120)
      newErrors.age = "Enter a valid age";

    if (!formData.phone)
      newErrors.phone = "WhatsApp number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10-digit Indian number";
    else if (/^(\d)\1{9}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    if (!formData.area)
      newErrors.area = "Please select an area";

    if (!formData.center)
      newErrors.center = "Please select a center";

    if (!formData.date) {
      newErrors.date = "Please select appointment date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();

      if (selectedDate.getDay() === 0) {
        newErrors.date = "SUNDAY_BLOCK";
      }

      const isSameDay =
        selectedDate.toDateString() === today.toDateString();
      const currentHour = today.getHours();

      if (isSameDay && currentHour >= 12) {
        newErrors.date = "SAME_DAY_BLOCK";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ============================
     SUBMIT
  ============================ */
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwvMAutv6LdpzjigmueH0mBXUXNBn0YYh7zhQgLl4BoJ6fldYbuFH_SSBqB4-5U44aw/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setFormData({
          patientname: "",
          age: "",
          phone: "",
          area: "",
          center: "",
          date: "",
          source: "Website_Form",
        });
        setErrors({});
        setShowSameDayNotice(false);
        setShowTomorrowHint(false);
        // Navigate to /BookAppoinment/success to show popup
        navigate("success", { replace: false });
      } else {
        alert("Failed to save appointment");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================
     DYNAMIC CENTERS
  ============================ */
  const centresForSelectedArea = formData.area
    ? areaCentreMap[formData.area]
    : [];

  /* ============================
     JSX
  ============================ */
  // Show popup if path ends with /success
  const showThankYou = location.pathname.endsWith("/success");

  return (
    <>
      <ThankYouPopup
        open={showThankYou}
        onClose={() => navigate("..", { replace: true, relative: "path" })}
      />

      <section className="appointment-wrapper">
        <div className="appointment-card">
          <div className="appointment-form">
            <h2>Book an Appointment</h2>

            <p className="section-label">Patient Details</p>

            <div className="input-row">
              <input
                type="text"
                name="patientname"
                placeholder="Patient Name"
                value={formData.patientname}
                onChange={handleChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            {errors.patientname && (
              <span className="error">{errors.patientname}</span>
            )}
            {errors.age && <span className="error">{errors.age}</span>}

            <div className="input-row">
              <input
                type="tel"
                name="phone"
                placeholder="WhatsApp Number"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
              />
            </div>

            {errors.phone && <span className="error">{errors.phone}</span>}

            <p className="section-label">Select Area</p>

            <div className="centres-grid">
              {Object.keys(areaCentreMap).map((area) => (
                <label key={area} className="centre-chip">
                  <input
                    type="checkbox"
                    checked={formData.area === area}
                    onChange={() => handleAreaChange(area)}
                  />
                  <span className="custom-checkbox">
                    <img src={tickIcon} alt="tick" />
                  </span>
                  <span className="centre-name">{area}</span>
                </label>
              ))}
            </div>

            {errors.area && <span className="error">{errors.area}</span>}

            {formData.area && (
              <>
                <p className="section-label">
                  Select ICTC Centre in {formData.area}
                </p>

                <div className="centres-grid">
                  {centresForSelectedArea.map((centre) => (
                    <label key={centre} className="centre-chip">
                      <input
                        type="checkbox"
                        checked={formData.center === centre}
                        onChange={() => handleCentreChange(centre)}
                      />
                      <span className="custom-checkbox">
                        <img src={tickIcon} alt="tick" />
                      </span>
                      <span className="centre-name">{centre}</span>
                    </label>
                  ))}
                </div>

                {errors.center && (
                  <span className="error">{errors.center}</span>
                )}
              </>
            )}

            <p className="section-label">Select Appointment Date</p>

            <div className="nicheLe">
              <input
                type="date"
                name="date"
                className="date-input"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                onKeyDown={(e) => e.preventDefault()}
              />

              {errors.date === "SUNDAY_BLOCK" && (
                <span className="error">
                  Appointments are not available on Sundays. All clinics are closed.
                </span>
              )}

              {errors.date === "SAME_DAY_BLOCK" && (
                <span className="error">
                  Same-day appointments are accepted only before 12:00 PM.
                  <br />
                  {formData.center && (
                    <>
                      {" "}
                      You can still connect with this centre directly —{" "}
                      <span
                        className="center-link"
                        style={{ textDecoration: "underline", cursor: "pointer" }}
                        onClick={() =>
                          window.open(
                            `/centre/${centerSlugMap[formData.center]}`,
                            "_blank"
                          )
                        }
                      >
                        visit the centre page
                      </span>

                      .
                    </>
                  )}
                </span>
              )}

              {showTomorrowHint && (
                <div className="info-notice">
                  👉 Next available slot: <strong>{getTomorrowDate()}</strong>
                </div>
              )}

              <button
                className={`book-btn${isSubmitting ? " loading" : ""}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book Appointment"}
              </button>
            </div>
          </div>

          <div className="appointment-image">
            <img src={doctorImg} alt="Doctor" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BookAppointment;
