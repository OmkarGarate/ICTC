import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./HeroCarousel_LWSL.css";

import slide1Desktop from "../../assets/Frame 5172.png";
import { slugToCentreName } from "../../data/centerData";

const slides = [
  {
    image: slide1Desktop,
  },
  {
    image: slide1Desktop,
  },
  {
    image: slide1Desktop,
  },
];

const HeroCarousel_LWSL = () => {
  const [current, setCurrent] = useState(0);
  const [showCTA, setShowCTA] = useState(true);

  const navigate = useNavigate();
  const { slug } = useParams();

  // ICTC Vashi -> Vashi
  const locationName = (
    slugToCentreName[slug?.toLowerCase()] || "Mumbai"
  ).replace(/^ICTC\s+/i, "");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-carousel">
      <div className="hero-wrapper">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <h1>
            Cancer Care & Oncology Services in {locationName}
          </h1>

          <p>
            Receive expert cancer diagnosis, treatment,
            chemotherapy, immunotherapy, and follow-up care
            from a multidisciplinary oncology team in{" "}
            {locationName}.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image-wrapper">
          <img
            src={slides[current].image}
            alt={`Cancer Care in ${locationName}`}
            className="hero-image"
          />
        </div>

         {/* CTA */}
      {showCTA && (
        <div className="quick-cta">
          <button
            className="cta-close"
            onClick={() => setShowCTA(false)}
          >
            ✕
          </button>

          <button
            className="cta-btn white"
            onClick={() => navigate("/BookAppoinment")}
          >
            Book an Appointment <span>→</span>
          </button>

          <button
            className="cta-btn grey"
            onClick={() => navigate("/BookSecondOpinion")}
          >
            Get Second Opinion <span>→</span>
          </button>
        </div>
      )}
      </div>

     
    </section>
  );
};

export default HeroCarousel_LWSL;