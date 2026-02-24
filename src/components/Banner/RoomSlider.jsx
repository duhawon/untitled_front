import React, { useState, useEffect } from "react";
import BannerCard from "./BannerCard";
import { useNavigate } from "react-router-dom";
import "./RoomSlider.css";
import "./SliderBase.css";
import { getRoomsApi } from '../../api/roomApi';

const RoomSlider = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchTop20 = async () => {
      try {
        setLoading(true);
        const res = await getRoomsApi({page:0, size:20});
        setRooms(res.data.content ?? []);
      } catch (e) {
        console.error(e);
        setRooms([]);
      }
    };
    fetchTop20();
  },[]);

  const prev = () => {
    setStartIdx((prev) => Math.max(prev - slidesToShow, 0));
  };

  const next = () => {
    setStartIdx((prev) =>
      Math.min(prev + slidesToShow, Math.max(rooms.length - slidesToShow,0))
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
        {rooms
          .slice(startIdx, startIdx + slidesToShow)
          .map((room, idx) => (
            <div
              className="slider-item"
              key={room.id}
              style={{ flex: `0 0 calc(100% / ${slidesToShow})` }}
            >
              <BannerCard
                img={room.posterImgUrl}
                title={room.name}
                rating={room.rating}
                rank={startIdx + idx + 1} // ⭐ 순위 표시
                onClick={() => navigate(`/room/${room.id}`)}
              />
            </div>
          ))}
      </div>

      {/* 다음 버튼 */}
      <button
        className="slider-arrow right"
        onClick={next}
        disabled={startIdx + slidesToShow >= rooms.length}
      >
        ▶
      </button>
    </div>
  );
};

export default RoomSlider;
