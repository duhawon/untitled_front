import React from "react";

const BannerCard = ({ img, title, rating, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "5px",
        cursor: "pointer",
        flex: "0 0 auto",
      }}
    >
      <img
        src={img}
        alt={title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain", // ⭐ 핵심: 원본비율 유지 + 전체 이미지 보이게
          backgroundColor: "#f5f5f5", // 이미지가 작을 때 빈공간 자연스럽게
        }}
      />
      <h3 style={{ margin: "5px 0 0 0", fontSize: "16px" }}>{title}</h3>
      <p style={{ margin: "2px 0 0 0", fontSize: "14px" }}>평점 {rating}</p>
    </div>
  );
};

export default BannerCard;
