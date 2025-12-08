import React, { useState, useEffect } from "react";
import BannerCard from "./BannerCard";
import { banners as dummyBanners } from "./dummyData";
import { useNavigate } from "react-router-dom";
import "./RoomSlider.css";
import "./SliderBase.css";

const RoomSlider = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const navigate = useNavigate();

  // 화면 크기에 따라 보여줄 카드 개수 조정
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

  const prev = () => {
    setStartIdx((prev) => Math.max(prev - slidesToShow, 0));
  };

  const next = () => {
    setStartIdx((prev) =>
      Math.min(prev + slidesToShow, dummyBanners.length - slidesToShow)
    );
  };

  return (
    <div className="slider-container">
      {/* 이전 버튼 */}
      <button
        className="slider-arrow left"
        onClick={prev}
        disabled={startIdx === 0}
      >
        ◀
      </button>

      {/* 슬라이더 내용 */}
      <div className="slider-wrapper">
        {dummyBanners
          .slice(startIdx, startIdx + slidesToShow)
          .map((banner, idx) => (
            <div
              className="slider-item"
              key={idx}
              style={{ flex: `0 0 calc(100% / ${slidesToShow})` }}
            >
              <BannerCard
                img={banner.img}
                title={banner.title}
                rating={banner.rating}
                rank={startIdx + idx + 1} // ⭐ 순위 표시
                onClick={() => navigate(`/room/${banner.roomId}`)}
              />
            </div>
          ))}
      </div>

      {/* 다음 버튼 */}
      <button
        className="slider-arrow right"
        onClick={next}
        disabled={startIdx + slidesToShow >= dummyBanners.length}
      >
        ▶
      </button>
    </div>
  );
};

export default RoomSlider;
