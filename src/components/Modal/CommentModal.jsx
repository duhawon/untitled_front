import React, { useState } from "react";
import CommonModal from './CommonModal';
import "./CommentModal.css";
import { createReviewCommentApi, updateReviewCommentApi } from '../../api/reviewCommentApi';

const CommentModal = ({ reviewId, commentId, data, isOpen, onClose, onSave }) => {
  const [content, setContent] = useState(data ?? "");
  const isEmpty = content.trim().length === 0;

  const handleSave = async () => {
    if (isEmpty) return;
    try {
      if(!commentId) {
        await createReviewCommentApi(reviewId, content);
      } else {
        await updateReviewCommentApi(reviewId, commentId, content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setContent("");
      onSave();
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className="comment-modal-header">
        <h2>댓글</h2>
      </div>

      <textarea
        className="comment-modal-textarea"
        placeholder="댓글을 입력하세요…"
        value={content}
        maxLength={10000}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="comment-modal-footer">
        <span className="comment-count">{content.length}/10000</span>
        <button
          className={`comment-save-btn ${isEmpty ? "disabled" : ""}`}
          disabled={isEmpty}
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </CommonModal>
  );
};

export default CommentModal;
