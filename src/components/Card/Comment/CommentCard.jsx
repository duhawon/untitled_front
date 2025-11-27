import React, { useState } from "react";
import "./CommentCard.css";

const CommentCard = ({ user, userImg, score, text, date, likes, replies }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="comment-card">
      {/* 사용자 정보 + 점수 */}
      <div className="comment-header">
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

      {/* 코멘트 내용 */}
      <div className="comment-text">{text}</div>

      <hr className="divider" />

      {/* 좋아요/댓글 수 */}
      <div className="comment-stats">
        <span>{likes} 좋아요</span>
        <span>{replies} 댓글</span>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="comment-actions">
        <span
          className={`action-btn ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
        >
          ❤️ 좋아요
        </span>
        <span className="action-btn">💬 댓글</span>
      </div>
    </div>
  );
};

export default CommentCard;
