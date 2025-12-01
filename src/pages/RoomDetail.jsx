import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import StarRating from "../components/StarRating/StarRating";
import ReviewCard from "../components/Card/Review/ReviewCard";
import ReviewModal from "../components/Modal/ReviewModal";
import { useNavigate, useParams } from "react-router-dom";
import DatePickerModal from "../components/Modal/DatePickerModal"; // 추가
import "./RoomDetail.css";
import { reviews } from "../data/reviews";

const RoomDetail = () => {
  const [wish, setWish] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const navigate = useNavigate();
  const { roomId } = useParams(); 

  // 탈출일 모달 상태 + 선택 날짜 저장
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleWish = () => setWish(!wish);

  // 리뷰 저장
  const handleSaveReview = (data) => {
    console.log("저장된 리뷰:", data);
  };

  return (
    <Layout>
      <div className="room-detail-container">
        {/* 상단 포스터 + 정보 */}
        <div className="room-top-row">
          <div className="poster-wrap">
            <img src="https://picsum.photos/300/200?random=10" alt="방탈출 포스터" className="poster-img" />
          </div>

          <div className="info-wrap">
            <div className="title-bookmark-wrap">
              <h1 className="room-title">방탈출 예시 제목</h1>
              <span className="bookmark-icon" onClick={toggleWish}>
                {wish ? "🔖" : "📑"}
              </span>
            </div>

            <div className="rating-section">
              <div className="rating-left">
                <StarRating initialRating={3.5} onChange={(value) => console.log("선택 점수:", value)} note="평가하기" />
              </div>
              <div className="rating-right">
                <div className="rating-score-main">3.5</div>
                <div className="avg-label">평균별점 (1,234명)</div>
              </div>
            </div>

            <hr className="detail-hr" />

            <div className="action-buttons-row">
              <button className="action-btn" onClick={() => setIsReviewModalOpen(true)}>
                💬 평가하기
              </button>

              <button className="action-btn" onClick={() => setIsDateModalOpen(true)}>
                {selectedDate ? `📅 탈출일: ${selectedDate}` : "📅 탈출일"}
              </button>
            </div>

            <hr className="detail-hr" />

            <div className="info-grid">
              <div className="info-item">장르: 공포</div>
              <div className="info-item">난이도: 3</div>
              <div className="info-item">시간: 60분</div>
              <div className="info-item">인원수: 2~6명</div>
              <div className="info-item">매장: 강남점</div>
            </div>

            <div className="description">
              방탈출에 대한 자세한 설명이 들어가는 영역입니다. 스토리, 분위기, 체감 난이도, 특징 등을 간략하게 적는 공간입니다.
            </div>
          </div>
        </div>

        {/* 리뷰 영역 */}
        <div className="review-section">
          <div className="review-header">
            <h2 className="review-title">평가</h2>
            <span className="review-count">950+</span>
            <button className="review-more" 
                    onClick={() => navigate(`/room/${roomId}/reviews`)}>더보기</button>
          </div>

          <div className="review-card-grid">
            {reviews.slice(0,6).map((c) => (
              <ReviewCard
                key={c.id}
                user={c.user}
                userImg={c.userImg}
                score={c.score}
                text={c.text}
                date={c.date}
                likes={c.likes}
                replies={c.replies}
                isSummary={true}
              />
            ))}
          </div>
        </div>

        {/* 평가 모달 */}
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          roomTitle="방탈출 예시 제목"
          onSave={handleSaveReview}
        />

        {/* 탈출일 선택 모달 */}
        <DatePickerModal
          isOpen={isDateModalOpen}
          onClose={() => setIsDateModalOpen(false)}
          initialDate={selectedDate}
          onSave={(date) => {
            setSelectedDate(date);
            setIsDateModalOpen(false);
          }}
        />
      </div>
    </Layout>
  );
};

export default RoomDetail;
