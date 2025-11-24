import React, { useState, useEffect } from "react";
import BannerCard from "./BannerCard";
import { banners as dummyBanners } from "./dummyData";

const SimpleSlider = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSlidesToShow(3);
      else if (window.innerWidth < 1024) setSlidesToShow(4);
      else setSlidesToShow(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prev = () => setStartIdx((s) => Math.max(s - 1, 0));
  const next = () =>
    setStartIdx((s) => Math.min(s + 1, dummyBanners.length - slidesToShow));

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={prev} disabled={startIdx === 0}>◀</button>
      <div style={{ display: "flex", overflow: "hidden", flexGrow: 1 }}>
        {dummyBanners.slice(startIdx, startIdx + slidesToShow).map((banner, idx) => (
          <BannerCard
            key={idx}
            {...banner}
            onClick={() => alert(`Clicked ${banner.title}`)}
          />
        ))}
      </div>
      <button onClick={next} disabled={startIdx + slidesToShow >= dummyBanners.length}>▶</button>
    </div>
  );
};

export default SimpleSlider;
