import React, { useState, useEffect } from "react";
import CommonModal from './CommonModal';
import "./CommentModal.css";

const CommentModal = ({ isOpen, onClose, onSave }) => {
  const [text, setText] = useState("");

  // 모달 열리면 텍스트 초기화(선택적)
  useEffect(() => {
    if (isOpen) setText("");
  }, [isOpen]);

  const isEmpty = text.trim().length === 0;

  const handleSave = () => {
    if (isEmpty) return;
    onSave(text);
    setText("");
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className="comment-modal-header">
        <h2>댓글</h2>
      </div>

      <textarea
        className="comment-modal-textarea"
        placeholder="댓글을 입력하세요…"
        value={text}
        maxLength={10000}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="comment-modal-footer">
        <span className="comment-count">{text.length}/10000</span>
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
