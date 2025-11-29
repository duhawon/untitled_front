import React, { useState, useEffect } from "react";
import CommonModal from "./CommonModal"; // 기존 모달 사용
import "./DatePickerModal.css";

const DatePickerModal = ({ isOpen, onClose, onSave, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || "");

  useEffect(() => {
    setSelectedDate(initialDate || "");
  }, [initialDate]);

  const handleSave = () => {
    onSave(selectedDate);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      width="360px"   // 넘치지 않도록 적절히 확보
    >
      <div className="datepicker-wrap">
        <h2 className="datepicker-title">탈출 날짜 선택</h2>

        <input
          type="date"
          className="datepicker-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="datepicker-btn-row">
          <button className="datepicker-save-btn" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default DatePickerModal;
