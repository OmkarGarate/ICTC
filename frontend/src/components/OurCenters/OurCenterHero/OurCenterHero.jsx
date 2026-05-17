import "./OurCenterHero.css";
import phoneIcon from "../../../assets/call (2).png";
import locationIcon from "../../../assets/weui_location-filled.png";
import starIcon from "../../../assets/Hearts.png";
import imgSrc from "../../Common/ImgSrc";

const OurCenterHero = ({ center }) => {
  if (!center) return null;

  return (
    <section className="our-center-hero">
      {/* HERO IMAGE */}
      <div
        className="hero-banner"
        style={{
          backgroundImage: `url(${imgSrc(center.heroImage)})`,
        }}
      />

      {/* INFO SECTION */}
      <div className="center-info">
        <h2>{center.fullName || center.name}</h2>

        {/* RATING */}
        <div className="rating-row">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <img key={i} src={starIcon} alt="star" />
            ))}
          </div>

          <span className="rating-text">
            {center.rating}
            <span className="divider"> | </span>
            {center.reviews}
          </span>
        </div>

        {/* PHONE */}
        <div className="contact-row">
          <img src={phoneIcon} alt="phone" />
          <a href={`tel:${center.phone}`} className="phone">
            {center.phone}
          </a>
        </div>

        {/* ADDRESS */}
        <div className="address-block">
          <div className="address-title">
            <img src={locationIcon} alt="location" />
            <span className="addTitle">Address:</span>
          </div>

          <a
            href={
              center.mapQuery
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.mapQuery)}`
                : center.mapEmbed || "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="address-text"
          >
            {center.address}
          </a>
        </div>

        {/* TIMING */}
        <p className="timing">{center.timing}</p>
      </div>
    </section>
  );
};

export default OurCenterHero;