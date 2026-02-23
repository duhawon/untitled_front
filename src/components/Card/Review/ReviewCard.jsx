import React, { useState } from "react";
import "./ReviewCard.css";
import CommentModal from "../../Modal/CommentModal";
import LikeListModal from "../../Modal/LikeListModal";
import { useNavigate } from "react-router-dom";
import { likeApi, unlikeApi } from '../../../api/likeApi';

const TARGET_TYPE = "REVIEW";
const ReviewCard = ({
  reviewId,
  user,
  userImg,
  score,
  text,
  likeCount,
  replies,
  isSummary,
  likedByMe,
  disableNavigation = false,
  onCommentSaved
}) => {
  const [liked, setLiked] = useState(likedByMe);
  const [likes, setLikes] = useState(likeCount ?? 0);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLikeListOpen, setIsLikeListOpen] = useState(false);

  const navigate = useNavigate();
  const displayText =
    isSummary && text?.length > 100 ? text.slice(0, 100) + "..." : text;
  const goToDetail = () => {
    if (!disableNavigation) {
      navigate(`/review/${reviewId}`);
    }
  };
  const toggleLike = async() => {
    if (liked) {
      setLiked(false);
      setLikes(prev => Math.max(prev - 1,0));
      try {
        await unlikeApi(TARGET_TYPE, reviewId);
      } catch(e) {
        setLiked(true);
        setLikes(prev => prev + 1);
        console.error(e);
      }
    } else {
      setLiked(true);
      setLikes(prev => prev + 1);
      try {
        await likeApi(TARGET_TYPE, reviewId);
      } catch(e) {
        setLiked(false);
        setLikes(prev => Math.max(prev - 1,0));
        console.error(e);
      }
    }
  };
  return (
    <>
      <div className="review-card">

        {/* Header */}
        <div className="review-card-header">
          <div className="user-info">
            <img
              src={userImg || "https://picsum.photos/40"}
              alt={user}
              className="user-img"
            />
            <span className="user-name">{user}</span>
          </div>
          <div className="user-score">⭐️{score}</div>
        </div>

        <hr className="divider-top" />

        {/* Main */}
        <div className="review-card-main">
          <div
            className="review-card-text"
            onClick={goToDetail}
            style={{ cursor: disableNavigation ? "default" : "pointer" }}
          >
            {displayText}
          </div>
        </div>

        {/* Footer */}
        <div className="review-card-footer">
          <hr className="divider-bottom" />
          <div className="review-card-stats">
            {/* 좋아요 리스트 모달 */}
            <span
              className="likes-count"
              onClick={() => setIsLikeListOpen(true)}
            >
              {likes} 좋아요
            </span>
            {/* 댓글 개수 → ReviewDetail 이동 */}
            <span
              className="replies-count"
              onClick={goToDetail}
              style={{ cursor: disableNavigation ? "default" : "pointer" }}
            >
              {replies} 댓글
            </span>
          </div>
          <div className="review-card-actions">
            {/* 좋아요 버튼 */}
            <span
              className={`action-btn ${liked ? "liked" : ""}`}
              onClick={() => toggleLike()}
            >
              ❤️ 좋아요
            </span>

            {/* 댓글 쓰기 버튼 → 모달 열림 (페이지 이동 X) */}
            <span
              className="action-btn"
              onClick={() => setIsCommentModalOpen(true)}
            >
              💬 댓글
            </span>
          </div>
        </div>
      </div>

      {/* 댓글 작성 모달 */}
      <CommentModal
        reviewId={reviewId}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSave={() => onCommentSaved()}
      />

      {/* 좋아요 목록 모달 */}
      <LikeListModal
        isOpen={isLikeListOpen}
        onClose={() => setIsLikeListOpen(false)}
        targetType="REVIEW"
        targetId={reviewId}
      />
    </>
  );
};

export default ReviewCard;
