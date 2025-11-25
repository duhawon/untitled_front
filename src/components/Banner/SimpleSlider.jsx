import React, { useState, useEffect } from "react";
import BannerCard from "./BannerCard";
import { banners as dummyBanners } from "./dummyData";

const SimpleSlider = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);

  // 화면 크기에 따라 보여줄 카드 개수 자동 조정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSlidesToShow(3);
      else if (window.innerWidth < 1024) setSlidesToShow(4);
      else setSlidesToShow(5);
    };

    handleResize(); // 초기 실행
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center", // 버튼+슬라이더 전체 가운데 정렬
      }}
    >
      {/* 이전 버튼 */}
      <button
        onClick={prev}
        disabled={startIdx === 0}
        style={{ marginRight: "10px" }}
      >
        ◀
      </button>

      {/* 슬라이더 영역 */}
      <div
        style={{
          display: "flex",
          overflow: "hidden",
          flexGrow: 1,
          maxWidth: "1200px", // 슬라이더 최대 너비
          width: "100%",
        }}
      >
        {dummyBanners
          .slice(startIdx, startIdx + slidesToShow)
          .map((banner, idx) => (
            <div
              key={idx}
              style={{
                flex: `0 0 calc(100% / ${slidesToShow})`,
              }}
            >
              <BannerCard
                img={banner.img}
                title={banner.title}
                rating={banner.rating}
                onClick={() => alert(`Clicked ${banner.title}`)}
              />
            </div>
          ))}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={next}
        disabled={startIdx + slidesToShow >= dummyBanners.length}
        style={{ marginLeft: "10px" }}
      >
        ▶
      </button>
    </div>
  );
};

export default SimpleSlider;
