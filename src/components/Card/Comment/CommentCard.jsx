import React, { useRef, useState } from "react";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatDateYYYYMMDD } from '../../../utils/date';
import "./CommentCard.css";
import CommentModal from "../../Modal/CommentModal";
import LikeListModal from "../../Modal/LikeListModal";
import { deleteReviewCommentApi } from '../../../api/reviewCommentApi';
import { likeApi, unlikeApi } from '../../../api/likeApi';

const TARGET_TYPE = "REVIEW_COMMENT";
const CommentCard = ({ reviewId, comment, onCommentSaved, likedByMe }) => {
  const [liked, setLiked] = useState(likedByMe);
  const [likes, setLikes] = useState(comment.likeCount ?? 0);
  
  const myUserId = useSelector((state) => state.auth.userInfo.userId);
  const authorId = comment?.userSummary.userId;
  const isMine = !!myUserId && !!authorId && myUserId === authorId;

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLikeListOpen, setIsLikeListOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);
  const onEdit = () => {
    setMenuOpen(false);
    setIsCommentModalOpen(true);
  };
  const onDelete = async () => {
    setMenuOpen(false);
    try {
      await deleteReviewCommentApi(reviewId, comment.commentId);
      onCommentSaved();
    } catch (e) {
      console.error(e);
    }
  };
  const toggleLike = async() => {
    if (liked) {
      setLiked(false);
      setLikes(prev => Math.max(prev - 1,0));
      try {
        await unlikeApi(TARGET_TYPE, comment.commentId);
      } catch(e) {
        setLiked(true);
        setLikes(prev => prev + 1);
        console.error(e);
      }
    } else {
      setLiked(true);
      setLikes(prev => prev + 1);
      try {
        await likeApi(TARGET_TYPE, comment.commentId);
      } catch(e) {
        setLiked(false);
        setLikes(prev => Math.max(prev - 1,0));
        console.error(e);
      }
    }
  };

  return (
    <>
    <div className="comment-card">
      {/* 프로필 이미지 */}
      <img
        src={comment.userSummary?.profileImgUrl || "/default-profile.png"}
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
          <div className="comment-actions-left">
            <button
              className={`like-btn ${liked ? "liked" : ""}`}
              onClick={toggleLike}
            >
              👍 좋아요
            </button>
            <span
              className="like-count"
              onClick={() => setIsLikeListOpen(true)}>
              좋아요 {likes}
            </span>
          </div>
            {isMine && (
              <div className="comment-actions-right" ref={menuRef}>
                <button
                  className="comment-more-btn"
                  onClick={() => setMenuOpen((v) => !v)}
                  type="button"
                  aria-label="댓글 메뉴"
                >
                  ⋮
                </button>

                {menuOpen && (
                <div className="comment-more-menu" >
                  <button className="comment-more-item" onClick={onEdit} type="button">
                    수정
                  </button>
                  <button
                    className="comment-more-item danger"
                    onClick={onDelete}
                    type="button"
                  >
                    삭제
                  </button>
                </div>
              )}
                </div>
              )}
        </div>
      </div>
    </div>
    <CommentModal
      reviewId={reviewId}
      commentId={comment.commentId}
      data={comment.content}
      isOpen={isCommentModalOpen}
      onClose={() => setIsCommentModalOpen(false)}
      onSave={() => onCommentSaved()}
    />
    <LikeListModal
        isOpen={isLikeListOpen}
        onClose={() => setIsLikeListOpen(false)}
        targetType="REVIEW_COMMENT"
        targetId={comment.commentId}
      />
    </>
  );
};

export default CommentCard;
