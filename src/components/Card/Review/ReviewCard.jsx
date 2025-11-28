import React, { useState } from "react";
import "./ReviewCard.css";
import CommentModal from '../../Modal/CommentModal';

const ReviewCard = ({ user, userImg, score, text, likes, replies }) => {
  const [liked, setLiked] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  return (
    <>
      <div className="review-card">

        {/* 상단 사용자 정보 + 점수 */}
        <div className="review-header">
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

        <hr className="divider" />

        {/*  내용 */}
        <div className="review-text">{text}</div>

        <hr className="divider" />

        {/* 좋아요 / 댓글 수 */}
        <div className="review-stats">
          <span>{likes} 좋아요</span>
          <span>{replies} 댓글</span>
        </div>

        {/* 액션 버튼 */}
        <div className="review-actions">
          <span
            className={`action-btn ${liked ? "liked" : ""}`}
            onClick={() => setLiked(!liked)}
          >
            ❤️ 좋아요
          </span>

          <span
            className="action-btn"
            onClick={() => setIsCommentModalOpen(true)}
          >
            💬 댓글
          </span>
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
    </>
  );
};

export default ReviewCard;
