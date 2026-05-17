import "./CenterGallery.css";
import { useState, useEffect } from "react";
import imgSrc from "../../Common/ImgSrc";

const CenterGallery = ({ center }) => {
  const images = (center?.gallery || []).map((img) => imgSrc(img));

  const [activeIndex, setActiveIndex] = useState(null);

  const closeModal = () => setActiveIndex(null);

  const showPrev = () =>
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const showNext = () =>
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  /* ESC KEY CLOSE */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!images.length) return null;

  return (
    <section className="center-gallery">
      <h2 className="center-gallery__title">Gallery</h2>

      <div className="center-gallery__grid">
        {images.map((img, index) => (
          <div
            className="center-gallery__item"
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            <img src={img} alt={`gallery-${index}`} />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeIndex !== null && (
        <div className="gallery-modal" onClick={closeModal}>
          <div
            className="gallery-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="gallery-modal__close" onClick={closeModal}>
              ✕
            </button>

            {images.length > 1 && (
              <>
                <button className="gallery-modal__nav left" onClick={showPrev}>
                  ‹
                </button>
                <button className="gallery-modal__nav right" onClick={showNext}>
                  ›
                </button>
              </>
            )}

            <img
              src={images[activeIndex]}
              alt="gallery-preview"
              className="gallery-modal__image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CenterGallery;