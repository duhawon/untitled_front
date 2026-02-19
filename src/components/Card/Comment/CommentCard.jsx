import React, { useState } from "react";
import { formatDateYYYYMMDD } from '../../../utils/date';
import "./CommentCard.css";

const CommentCard = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount ?? 0);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => Math.max(prev - 1,0));
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  return (
    <div className="comment-card">
      {/* 프로필 이미지 */}
      <img
        src={comment.userSummary?.profileImgUrl}
        alt={comment.userSummary?.name ?? "unknown"}
        className="comment-user-img" />

      <div className="comment-content">
        {/* 이름 + 작성일 */}
        <div className="comment-header">
          <span className="comment-user-name">{comment.userSummary?.name ?? "unknown"}</span>
          <span className="comment-date">{formatDateYYYYMMDD(comment.createdAt)}</span>
        </div>

        {/* 댓글 내용 */}
        <div className="comment-text">{comment.content}</div>

        {/* 좋아요 버튼 */}
        <div className="comment-actions">
          <button
            className={`like-btn ${liked ? "liked" : ""}`}
            onClick={toggleLike}
          >
            👍 좋아요
          </button>
          <span className="like-count">좋아요 {likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
