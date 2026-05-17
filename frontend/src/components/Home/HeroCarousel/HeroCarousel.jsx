import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroCarousel.css";

import slide1Desktop from "../../../assets/car.webp";
import slide1Tablet from "../../../assets/car_tab.webp";
import slide1Mobile from "../../../assets/car_mob.webp";

const slides = [
  {
    desktop: slide1Desktop,
    tablet: slide1Tablet,
    mobile: slide1Mobile,
  },
  {
    desktop: slide1Desktop,
    tablet: slide1Tablet,
    mobile: slide1Mobile,
  },
  {
    desktop: slide1Desktop,
    tablet: slide1Tablet,
    mobile: slide1Mobile,
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [showCTA, setShowCTA] = useState(true);   // 👈 new
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-carousel">
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <picture
          key={index}
          className={`hero-image ${index === current ? "active" : ""}`}
        >
          {/* MOBILE */}
          <source media="(max-width: 767px)" srcSet={slide.mobile} />

          {/* TABLET */}
          <source media="(max-width: 1024px)" srcSet={slide.tablet} />

          {/* DESKTOP */}
          <img src={slide.desktop} alt={`Hero slide ${index + 1}`} />
        </picture>
      ))}

      {/* QUICK CTA */}
      {showCTA && (
        <div className="quick-cta">
          {/* CUT BUTTON */}
          <button className="cta-close" onClick={() => setShowCTA(false)}>
            ✕
          </button>

          <button className="cta-btn light" onClick={() => navigate("/allCenters")}>
            Locate Centre <span>→</span>
          </button>

          <button className="cta-btn white" onClick={() => navigate("/BookAppoinment")}>
            Book an Appointment <span>→</span>
          </button>

          <button className="cta-btn grey" onClick={() => navigate("/BookSecondOpinion")}>
            Get Second Opinion <span>→</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
