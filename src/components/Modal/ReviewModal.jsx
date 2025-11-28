import React, { useState, useEffect } from "react";
import CommonModal from './CommonModal';
import "./ReviewModal.css";

const ReviewModal = ({ isOpen, onClose, roomTitle, onSave }) => {
  const [text, setText] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setText("");
      setSpoiler(false);
    }
  }, [isOpen]);

  const isEmpty = text.trim().length === 0;

  const handleSave = () => {
    if (isEmpty) return;
    onSave({ text, spoiler });
    setText("");
    setSpoiler(false);
    onClose();
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      {/* 헤더 */}
      <div className="review-modal-header">
        <span className="room-title">{roomTitle}</span>
      </div>

      {/* 텍스트 입력 */}
      <textarea
        className="review-modal-textarea"
        placeholder="리뷰를 작성해주세요…"
        value={text}
        maxLength={10000}
        onChange={(e) => setText(e.target.value)}
      />

      {/* 하단 영역 */}
      <div className="review-modal-footer">
        {/* 왼쪽: 스포일러 토글 */}
        <label className="spoiler-switch">
          <input
            type="checkbox"
            checked={spoiler}
            onChange={() => setSpoiler(!spoiler)}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">스포일러</span>
        </label>

        {/* 오른쪽: 글자수 + 저장 버튼 */}
        <div className="save-section">
          <span className="review-count">{text.length}/10000</span>
          <button
            className={`review-save-btn ${isEmpty ? "disabled" : ""}`}
            disabled={isEmpty}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default ReviewModal;
