import React, { useState } from "react";
import "./CommentCard.css";

const CommentCard = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  return (
    <div className="comment-card">
      {/* 프로필 이미지 */}
      <img src={comment.userImg} alt={comment.user} className="comment-user-img" />

      <div className="comment-content">
        {/* 이름 + 작성일 */}
        <div className="comment-header">
          <span className="comment-user-name">{comment.user}</span>
          <span className="comment-date">{comment.date}</span>
        </div>

        {/* 댓글 내용 */}
        <div className="comment-text">{comment.text}</div>

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
