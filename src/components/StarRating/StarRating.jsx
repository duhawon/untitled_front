import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ initialRating = 3.5, onChange, note }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (e, index) => {
    const { left, width } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    setHoverRating(index + (isHalf ? 0.5 : 1));
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (e, index) => {
    const { left, width } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    const newRating = index + (isHalf ? 0.5 : 1);
    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="star-rating-wrap">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((i) => {
          let className = "";
          if (displayRating >= i) className = "full";
          else if (displayRating + 0.5 === i) className = "half";
          return (
            <span
              key={i}
              className={`star ${className}`}
              onMouseMove={(e) => handleMouseMove(e, i - 1)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClick(e, i - 1)}
            >
              ★
            </span>
          );
        })}
      </div>
      {note && <div className="rating-note">{note}</div>}
    </div>
  );
};

export default StarRating;
