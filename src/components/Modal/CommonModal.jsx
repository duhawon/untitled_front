import React from "react";
import "./CommonModal.css";

const CommonModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">×</button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
