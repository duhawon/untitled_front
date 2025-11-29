import React, { useState } from "react";
import CommonModal from "./CommonModal";
import "./LikeListModal.css";

const LikeListModal = ({ isOpen, onClose, likes }) => {
  // 각 user.id에 대한 follow 상태 저장
  const [followState, setFollowState] = useState({});

  const toggleFollow = (userId) => {
    setFollowState((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} width={320}>
      <div className="like-list-modal">
        <h2 className="like-list-title">좋아요한 사람들</h2>
        <div className="like-list-items">
          {likes.map((user) => {
            const isFollowing = followState[user.id] === true;

            return (
              <div key={user.id} className="like-list-item">
                <div className="like-user-info">
                  <img
                    src={user.userImg || "https://picsum.photos/40"}
                    alt={user.userName}
                    className="like-user-img"
                  />
                  <span className="like-user-name">{user.userName}</span>
                </div>

                <button
                  className={`follow-btn ${isFollowing ? "following" : ""}`}
                  onClick={() => toggleFollow(user.id)}
                >
                  {isFollowing ? "팔로잉" : "팔로우"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </CommonModal>
  );
};

export default LikeListModal;
