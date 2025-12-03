import React, { useState } from "react";
import "./ReviewCard.css";
import CommentModal from "../../Modal/CommentModal";
import LikeListModal from "../../Modal/LikeListModal";
import { useNavigate } from "react-router-dom";

// dummy 데이터 예시
const dummyLikeUsers = [
  { id: 1, userName: "Bob", userImg: "https://picsum.photos/40?random=2" },
  { id: 2, userName: "Charlie", userImg: "https://picsum.photos/40?random=3" },
  { id: 3, userName: "Diana", userImg: "https://picsum.photos/40?random=4" },
  { id: 4, userName: "Eve", userImg: "https://picsum.photos/40?random=5" },
  { id: 5, userName: "Frank", userImg: "https://picsum.photos/40?random=6" },
  { id: 6, userName: "Grace", userImg: "https://picsum.photos/40?random=7" },
  { id: 7, userName: "Hank", userImg: "https://picsum.photos/40?random=8" },
  { id: 8, userName: "Ivy", userImg: "https://picsum.photos/40?random=9" },
  { id: 9, userName: "Jack", userImg: "https://picsum.photos/40?random=10" },
  { id: 10, userName: "Karen", userImg: "https://picsum.photos/40?random=11" },
  { id: 11, userName: "Leo", userImg: "https://picsum.photos/40?random=12" },
  { id: 12, userName: "Mia", userImg: "https://picsum.photos/40?random=13" },
  { id: 13, userName: "Nina", userImg: "https://picsum.photos/40?random=14" },
  { id: 14, userName: "Oscar", userImg: "https://picsum.photos/40?random=15" },
  { id: 15, userName: "Paul", userImg: "https://picsum.photos/40?random=16" }
];

const ReviewCard = ({
  reviewId,
  user,
  userImg,
  score,
  text,
  likes,
  replies,
  likeUsers = dummyLikeUsers,
  isSummary
}) => {
  const [liked, setLiked] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLikeListOpen, setIsLikeListOpen] = useState(false);

  const navigate = useNavigate();
  const displayText =
    isSummary && text.length > 100 ? text.slice(0, 100) + "..." : text;
  const goToDetail = () => {
    console.log("Review ID:", reviewId);
    navigate(`/review/${reviewId}`);
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
            style={{ cursor: "pointer" }}>
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
              style={{ cursor: "pointer" }}
            >
              {replies} 댓글
            </span>
          </div>
          <div className="review-card-actions">
            {/* 좋아요 버튼 */}
            <span
              className={`action-btn ${liked ? "liked" : ""}`}
              onClick={() => setLiked(!liked)}
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
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSave={(txt) => {
          console.log("저장된 댓글:", txt);
          setIsCommentModalOpen(false);
        }}
      />

      {/* 좋아요 목록 모달 */}
      <LikeListModal
        isOpen={isLikeListOpen}
        onClose={() => setIsLikeListOpen(false)}
        likes={likeUsers}
      />
    </>
  );
};

export default ReviewCard;
