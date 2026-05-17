import { useEffect, useRef, useState } from "react";
import "./PatientTestimonials.css";

import quoteIcon from "../../../assets/quotes.svg";
import googleIcon from "../../../assets/flat-color-icons_google (1).png";

const testimonials = [
  {
    name: "Renish Nair",
    text:
      "The best doctor for cancer treatment. A calm, reassuring approach and clear guidance throughout the process made all the difference.",
    location: "ICTC Vashi",
  },
  {
    name: "Rahul Amberkar",
    text:
      "My brother is receiving lung cancer treatment at ICTC. The doctor explained each chemotherapy cycle clearly and supported us at every step.",
    location: "ICTC Vashi",
  },
  {
    name: "Rahul Patil",
    text:
      "Dr. Ghanekar’s empathy and commitment stood out. His guidance made a difficult journey much easier for our family.",
    location: "ICTC Kalyan",
  },
  {
    name: "Viraj Patil",
    text:
      "After one year of treatment, I feel confident and healthy again. The doctor addressed every concern patiently and honestly.",
    location: "ICTC Dombivli",
  },
  {
    name: "Vinay Pandey",
    text:
      "Dr. Rohit Pai is extremely knowledgeable and compassionate. He listens carefully and explains treatment options in a simple way.",
    location: "ICTC Sion",
  },
  {
    name: "Neha Kulkarni",
    text:
      "From diagnosis to treatment, the experience was smooth and reassuring. The staff was caring and always available when needed.",
    location: "ICTC Chembur",
  },
  {
    name: "Amit Deshpande",
    text:
      "The doctor gave us clarity during a very confusing time. We felt supported not just medically, but emotionally as well.",
    location: "ICTC Dadar",
  },
  {
    name: "Pooja Shah",
    text:
      "Excellent care and attention to detail. Every appointment felt unhurried and focused on patient well-being.",
    location: "ICTC Ghatkopar",
  },
  {
    name: "Suresh Menon",
    text:
      "Professional, compassionate, and extremely well-organized. I highly recommend ICTC for cancer care.",
    location: "ICTC Santacruz",
  },
  {
    name: "Kiran Joshi",
    text:
      "The doctor explained each stage of treatment clearly and gave us confidence during a difficult phase of life.",
    location: "ICTC Thane",
  },
];

const AUTO_SLIDE_INTERVAL = 5000;
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const PatientTestimonials = () => {
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);

  const [index, setIndex] = useState(0);
  const [shuffledTestimonials] = useState(() => shuffleArray(testimonials));

  const goNext = () => {
    setIndex((prev) =>
      prev === shuffledTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setInterval(goNext, AUTO_SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (shuffledTestimonials.length) startAutoSlide();
    return stopAutoSlide;
  }, [shuffledTestimonials]);

  useEffect(() => {
    if (!trackRef.current) return;

    const slides = trackRef.current.children;
    if (!slides || !slides.length || !slides[index]) return;

    trackRef.current.style.transform = `translateX(-${slides[index].offsetLeft}px)`;
  }, [index, shuffledTestimonials]);

  const onTouchStart = (e) => {
    stopAutoSlide();
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = startX.current - endX.current;
    if (Math.abs(diff) > 60) {
      diff > 0
        ? goNext()
        : setIndex((prev) =>
            prev === 0 ? shuffledTestimonials.length - 1 : prev - 1
          );
    }
    startAutoSlide();
  };

  return (
    <section className="pt-section">
      <div className="pt-header">
        <span className="pt-pill">Patient Stories</span>
        <h2>
          Compassionate Care, <br /><span>Trusted by Families</span>
        </h2>
        <p>
          Honest words from patients and caregivers who experienced care at ICTC
          centers across Mumbai.
        </p>
      </div>

      <div
        className="pt-carousel"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="pt-track" ref={trackRef}>
          {shuffledTestimonials.map((item, i) => (
            <div className="pt-slide" key={i}>
              <div className="pt-card">
                <img src={quoteIcon} alt="quote" className="pt-quote" />
                <p className="pt-text">{item.text}</p>

                <div className="pt-footer">
                  <div>
                    <p className="pt-name">{item.name}</p>
                    <p className="pt-location">{item.location}</p>
                  </div>
                  <img src={googleIcon} alt="google" className="pt-google" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
            {/* NAVIGATION DOTS */}
      <div className="pt-dots">
        {shuffledTestimonials.map((_, i) => (
          <button
            key={i}
            className={`pt-dot ${index === i ? "active" : ""}`}
            onClick={() => {
              stopAutoSlide();
              setIndex(i);
              startAutoSlide();
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default PatientTestimonials;
