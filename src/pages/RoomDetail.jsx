import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import StarRating from "../components/StarRating/StarRating";
import "./RoomDetail.css";

const RoomDetail = () => {
  const [wish, setWish] = useState(false);
  const toggleWish = () => setWish(!wish);

  return (
    <Layout>
      <div className="room-detail-container">
        {/* 왼쪽: 포스터 */}
        <div className="poster-wrap">
          <img
            src="https://picsum.photos/300/200?random="
            alt="방탈출 포스터"
            className="poster-img"
          />
        </div>

        {/* 오른쪽: 정보 */}
        <div className="info-wrap">
          {/* 1. 제목 + 북마크 */}
          <div className="title-bookmark-wrap">
            <h1 className="room-title">방탈출 제목 예시</h1>
            <span className="bookmark-icon" onClick={toggleWish}>
              {wish ? "🔖" : "📑"}
            </span>
          </div>

          {/* 2. 별점 + 평균별점 */}
          <div className="rating-section">
            <div className="rating-left">
              <StarRating
                initialRating={3.5}
                onChange={(value) => console.log("선택된 점수:", value)}
                note="평가하기"
              />
            </div>
            <div className="rating-right">
              <div className="rating-score-main">3.5</div>
              <div className="avg-label">평균별점 (1,234명)</div>
            </div>
          </div>

          {/* 3. 별점 아래 HR */}
          <hr className="detail-hr" />

          {/* 4. 버튼 (코멘트, 탈출일) */}
          <div className="action-buttons-row">
            <button className="action-btn">💬 코멘트</button>
            <button className="action-btn">📅 탈출일</button>
          </div>

          {/* 5. 버튼 아래 HR */}
          <hr className="detail-hr" />

          {/* 6. 정보 항목 */}
          <div className="info-grid">
            <div className="info-item">장르: 공포</div>
            <div className="info-item">난이도: 3</div>
            <div className="info-item">시간: 60분</div>
            <div className="info-item">인원수: 2~6명</div>
            <div className="info-item">매장: 강남점</div>
          </div>

          {/* 7. 설명 */}
          <div className="description">
            방탈출에 대한 자세한 설명이 들어가는 영역입니다. 스토리, 분위기,
            체감 난이도, 특징 등을 간략하게 적는 공간입니다.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetail;
