import "./AboutImageSection.css";
import aboutImg from "../../../assets/aboutUs.png";

const AboutImageSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">

        {/* LEFT CONTENT */}
        <div className="about-content">
          <h2>Mumbai's Largest Cancer Care Chain</h2>

          <p>
            At ICTC, we are dedicated to providing{" "}
            <span className="highlight">
              compassionate, high-quality cancer treatment
            </span>{" "}
            that remains{" "}
            <span className="highlight">affordable for everyone.</span>
          </p>

          <p>
            Founded by a team of expert doctors from renowned institutions such
            as{" "}
            <span className="highlight">
              TATA, AIIMS Delhi, and GCRI
            </span>
            , ensuring every patient receives care guided by world-class medical
            expertise and unwavering support.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="about-image-wrapper">
          <img
            src={aboutImg}
            alt="ICTC Medical Team"
            className="about-image"
          />
        </div>

      </div>
    </section>
  );
};

export default AboutImageSection;
