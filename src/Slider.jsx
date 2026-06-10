import { useEffect, useState } from "react";
import sareeImg from "./assets/Saree.jpg";
import imge from "./assets/frontimg.png";
import phone from "./assets/phone .png";

import "./App.css";


const slides = [

  {
  id: 1,
  image: imge,
},
 
 
  {
    id: 2,
    title: "Beauty essentials made easy",
    subtitle: "Find skincare, makeup, and personal care essentials with fast delivery.",
    badge: "Beauty Sale",
    image: sareeImg,
  },
  {
    id: 3,
    image: phone,
  },


];

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleNav = (index) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section className="slider-shell">
      <div className="slider-window">
        <div className="slider-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide) => (
            <div className="slide-panel" key={slide.id}>
              <img className="slide-image" src={slide.image} alt={slide.title} />
              <div className="slide-overlay" />
              <div className="slide-copy">
                <div className="slide-badge">{slide.badge}</div>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="slider-action prev" onClick={handlePrev} aria-label="Previous slide">
        ‹
      </button>
      <button className="slider-action next" onClick={handleNext} aria-label="Next slide">
        ›
      </button>

      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`slider-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleNav(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Slider;
