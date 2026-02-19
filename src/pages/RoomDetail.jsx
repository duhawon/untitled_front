import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import StarRating from "../components/StarRating/StarRating";
import ReviewCard from "../components/Card/Review/ReviewCard";
import ReviewModal from "../components/Modal/ReviewModal";
import { useNavigate, useParams } from "react-router-dom";
import DatePickerModal from "../components/Modal/DatePickerModal"; // 추가
import "./RoomDetail.css";
import { useEffect } from 'react';
import { getRoomDetailApi } from '../api/roomApi';
import { getMyReviewByRoomApi, getRoomReviewsApi } from '../api/reviewApi';

const RoomDetail = () => {
  const [wish, setWish] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const navigate = useNavigate();
  const { roomId } = useParams(); 

  // 탈출일 모달 상태 + 선택 날짜 저장
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [room, setRoom] = useState(null);
  const [myReview, setMyReview] = useState(null);
  const [reviewSlice, setReviewSlice] = useState({content:[], hasNext: false});
  const [loading, setLoading] = useState(true);

  const toggleWish = () => setWish(!wish);

  // 리뷰 저장
  const handleSaveReview = (data) => {
    console.log("저장된 리뷰:", data);
  };

  useEffect(() => {
    if (!roomId) return;

    const fetchAll = async () => {
      setLoading(true);

      const [roomRes, myReviewRes, reviewsRes] = await Promise.allSettled([
        getRoomDetailApi(roomId),
        getMyReviewByRoomApi(roomId),
        getRoomReviewsApi(roomId, {page:0, size:10, sort: "likes"}),
      ]);

      if (roomRes.status === "fulfilled") setRoom(roomRes.value.data);
      else setRoom(null);

      if (myReviewRes.status === "fulfilled") setMyReview(myReviewRes.value.data);
      else setMyReview(null);

      if(reviewsRes.status === "fulfilled") {
        const data = reviewsRes.value.data;
        setReviewSlice({content: data?.content ?? [], hasNext: !!data?.hasNext});
      } else {
        setReviewSlice({content: [], hasNext: false});
      }

      setLoading(false);
    }
    fetchAll();
  },[roomId]);

  const roomTitle = room?.name?? "방 제목";
  const avgRating = room?.rating ?? 0;
  const genresText = room?.genres ? Array.from(room.genres).join(",") : '-';

  const otherReviews = myReview
    ? reviewSlice.content.filter((r) => r.reviewId !== myReview.reviewId)
    : reviewSlice.content;

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
              <h1 className="room-title">{roomTitle}</h1>
              <span className="bookmark-icon" onClick={toggleWish}>
                {wish ? "🔖" : "📑"}
              </span>
            </div>

            <div className="rating-section">
              <div className="rating-left">
                <StarRating
                  initialRating={myReview?.rating ?? avgRating}
                  onChange={(value) => console.log("선택 점수:", value)}
                  note="평가하기"
                />
              </div>
              <div className="rating-right">
                <div className="rating-score-main">{avgRating}</div>
                <div className="avg-label">평균별점 (1,234명)</div>
              </div>
            </div>

            <hr className="detail-hr" />

            <div className="action-buttons-row">
              <button className="action-btn" onClick={() => setIsReviewModalOpen(true)}>
                💬 {myReview ? "내 리뷰 수정" : "평가하기"}
              </button>

              <button className="action-btn" onClick={() => setIsDateModalOpen(true)}>
                {myReview?.escapeDate ? `📅 탈출일: ${myReview.escapeDate}` : "📅 탈출일"}
              </button>
            </div>

            <hr className="detail-hr" />

            <div className="info-grid">
              <div className="info-item">장르: {genresText}</div>
              <div className="info-item">난이도: {room?.difficulty ?? "-"}</div>
              <div className="info-item">시간: {room?.playTimeMinutes ?? "-"}분</div>
              <div className="info-item">인원수: {room?.minPlayers ?? "-"}~{room?.maxPlayers ?? "-"}명</div>
              <div className="info-item">매장: {room?.storeName ?? "-"}</div>
            </div>
            <div className="description">{room?.description ?? "-"}</div>
          </div>
        </div>

        {/* 리뷰 영역 */}
        <div className="review-section">
          <div className="review-header">
            <h2 className="review-title">평가</h2>
            <span className="review-count">{otherReviews.length}+</span>
            <button className="review-more" 
                    onClick={() => navigate(`/room/${roomId}/reviews`)}>
              더보기
            </button>
          </div>

          <div className="review-card-grid">
            {otherReviews.slice(0,6).map((r) => (
              <ReviewCard
                key={r.reviewId}
                reviewId={r.reviewId}
                user={r.userSummary?.name}
                userImg={r.userSummary?.profileImgUrl}
                score={r.rating}
                text={r.content}
                date={r.createdAt ?? "-"}
                likes={r.likeCount}
                replies={r.commentCount}
                isSummary={true}
              />
            ))}
          </div>
        </div>

        {/* 평가 모달 */}
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          roomTitle={roomTitle}
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
