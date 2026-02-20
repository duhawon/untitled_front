import React, { useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import StarRating from "../components/StarRating/StarRating";
import ReviewCard from "../components/Card/Review/ReviewCard";
import ReviewModal from "../components/Modal/ReviewModal";
import { useNavigate, useParams } from "react-router-dom";
import DatePickerModal from "../components/Modal/DatePickerModal"; // 추가
import "./RoomDetail.css";
import { useEffect } from 'react';
import { getRoomDetailApi } from '../api/roomApi';
import { createReviewApi, deleteReviewApi, getMyReviewByRoomApi, getRoomReviewsApi, updateReviewApi } from '../api/reviewApi';
import { useSelector } from 'react-redux';

const RoomDetail = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

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

  const [myRating, setMyRating] = useState(null);
  const [saving, setSaving] = useState(false);

  const [isReviewMenuOpen, setIsReviewMenuOpen] = useState(false);
  const reviewBtnWrapRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!isReviewMenuOpen) return;
      if (reviewBtnWrapRef.current && !reviewBtnWrapRef.current.contains(e.target)) {
        setIsReviewMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isReviewMenuOpen]);

  const toggleWish = () => setWish(!wish);
  
  const refreshAll = async () => {
    const [roomRes, myReviewRes, reviewsRes] = await Promise.allSettled([
      getRoomDetailApi(roomId),
      isLoggedIn ? getMyReviewByRoomApi(roomId) : Promise.resolve({ data: null}),
      getRoomReviewsApi(roomId, {page:0, size:10, sort: "likes"}),
    ]);

    if (roomRes.status === "fulfilled") setRoom(roomRes.value.data);
    else setRoom(null);

    if (myReviewRes.status === "fulfilled") {
      setMyReview(myReviewRes.value.data);
      setMyRating(myReviewRes.value.data?.rating ?? myRating);
    } else {
      setMyReview(null);
      setMyRating(null);
    }

    if(reviewsRes.status === "fulfilled") {
      const data = reviewsRes.value.data;
      setReviewSlice({content: data?.content ?? [], hasNext: !!data?.hasNext});
    } else {
      setReviewSlice({content: [], hasNext: false});
    }
  }

  useEffect(() => {
    if (!roomId) return;
    setLoading(true);
    const run = async () => {
      await refreshAll();
      setLoading(false);
    };
    run();
  }, [roomId, isLoggedIn]);
  const buildBody = (patch) => {
    const body = {};

    const rating = patch.rating ?? myReview?.rating ?? myRating;
    if (rating != null) body.rating = rating;

    const content = patch.content ?? myReview?.content;
    if (content) body.content = content;

    const spoiler = patch.spoiler ?? myReview?.spoiler;
    if (spoiler != null) body.spoiler = spoiler;

    return body;
  }
  const upsertReview = async (patch) => {
    if (!roomId  || saving) return;
    const body = buildBody(patch);
    if (Object.keys(body).length === 0) return;
    setSaving(true);
    try {
      if (myReview?.reviewId) {
        await updateReviewApi(myReview.reviewId, body);
      } else {
        await createReviewApi({ roomId: Number(roomId), ...body});
      }
      await refreshAll();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  }

  const handleRatingChange = async (value) => {
    setMyRating(value);
    await upsertReview({ rating: value});
  };

  const handleSaveReview = async ({ content, spoiler}) => {
    await upsertReview({ content, spoiler });
  };
  const handleReviewButtonClick = () => {
    if (!isLoggedIn) {
      // 원하면 여기서 GuestAuthModal 열기
      // setIsGuestAuthOpen(true);
      return;
    }
  
    if (myReview?.reviewId) {
      // 내 리뷰가 있으면 작은 메뉴 토글
      setIsReviewMenuOpen((v) => !v);
    } else {
      // 없으면 작성 모달 바로
      setIsReviewModalOpen(true);
    }
  };
  
  const handleEditReview = () => {
    setIsReviewMenuOpen(false);
    setIsReviewModalOpen(true);
  };
  
  const handleDeleteReview = async () => {
    if (!myReview?.reviewId) return;
    // TODO : modal창으로 변경
    const ok = window.confirm("리뷰를 삭제하시겠습니까?");
    if (!ok) return;
  
    setIsReviewMenuOpen(false);
    try {
      await deleteReviewApi(myReview.reviewId);
      await refreshAll();
    } catch (e) {
      console.error(e);
    }
  };

  const roomTitle = room?.name?? "방 제목";
  const avgRating = room?.rating ?? 0;
  const genresText = room?.genres ? Array.from(room.genres).join(",") : '-';

  const otherReviews = myReview
    ? reviewSlice.content.filter((r) => r.reviewId !== myReview.reviewId)
    : reviewSlice.content;

  if (loading) {
    return (
      <Layout>
        <div className="room-detail-container">Loading...</div>
      </Layout>
    )
  }

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
                  initialRating={myRating ?? 0}
                  onChange={handleRatingChange}
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
            <div className="review-action-wrap" ref={reviewBtnWrapRef}>
              <button className="action-btn" onClick={handleReviewButtonClick}>
                💬 리뷰
              </button>

              {isReviewMenuOpen && myReview?.reviewId && (
                <div className="review-popover">
                  <button className="review-popover-item" onClick={handleEditReview}>
                    리뷰 수정
                  </button>
                  <button className="review-popover-item danger" onClick={handleDeleteReview}>
                    리뷰 삭제
                  </button>
                </div>
              )}
            </div>
              <button className="action-btn" onClick={() => setIsDateModalOpen(true)}>
                {myReview?.escapeDate ? `📅 탈출일: ${myReview.escapeDate}` : "📅 탈출일"}
              </button>
            </div>
            <hr className="detail-hr" />
            {myReview?.reviewId && (
  <div className="my-review-wrapper">
    <div className="my-review-title">내가 쓴 리뷰</div>
    <div className="my-review-content-bar">{myReview.content}</div>
  </div>
)}
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
          review={myReview}
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
