import React, { useState } from "react";
import "./ReviewCard.css";
import CommentModal from '../../Modal/CommentModal';
import LikeListModal from '../../Modal/LikeListModal';

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

const ReviewCard = ({ user, userImg, score, text, likes, replies, likeUsers = dummyLikeUsers }) => {
  const [liked, setLiked] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLikeListOpen, setIsLikeListOpen] = useState(false);

  return (
    <>
      <div className="review-card">

        {/* 상단 사용자 정보 + 점수 */}
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

        <hr className="divider" />

        {/* 내용 */}
        <div className="review-card-text">{text}</div>

        <hr className="divider" />

        {/* 좋아요 / 댓글 수 */}
        <div className="review-card-stats">
          <span
            className="likes-count"
            onClick={() => setIsLikeListOpen(true)}
          >
            {likes} 좋아요
          </span>
          <span>{replies} 댓글</span>
        </div>

        {/* 액션 버튼 */}
        <div className="review-card-actions">
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

      {/* 좋아요 사용자 리스트 모달 */}
      <LikeListModal
        isOpen={isLikeListOpen}
        onClose={() => setIsLikeListOpen(false)}
        likes={likeUsers}
      />
    </>
  );
};

export default ReviewCard;
