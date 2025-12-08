import React, { useState, useEffect } from "react";
import { ads } from "../../data/ads";
import "./SliderBase.css";
import "./AdSlider.css";

const AdSlider = () => {
  const items = ads || [];

  const [slidesToShow, setSlidesToShow] = useState(3);
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) setSlidesToShow(2); // 좁은 화면: 2개
      else setSlidesToShow(3); // 넓은 화면: 3개
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0)); // ⭐ 1칸씩 이동
  };

  const next = () => {
    setStartIdx((prev) =>
      Math.min(prev + 1, items.length - slidesToShow) // ⭐ 1칸씩 이동
    );
  };

  return (
    <div className="slider-container">
      <button
        className="slider-arrow left"
        onClick={prev}
        disabled={startIdx === 0}
      >
        ◀
      </button>

      <div className="slider-wrapper">
        {items.slice(startIdx, startIdx + slidesToShow).map((ad) => (
          <div
            key={ad.id}
            className="slider-item"
            style={{ flex: `0 0 calc(100% / ${slidesToShow})` }}
          >
            <div className="ad-slider-card">
              <img src={ad.img} alt={`ad-${ad.id}`} />
            </div>
          </div>
        ))}
      </div>

      <button
        className="slider-arrow right"
        onClick={next}
        disabled={startIdx + slidesToShow >= items.length}
      >
        ▶
      </button>
    </div>
  );
};

export default AdSlider;
