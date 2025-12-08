import React from "react";

const BannerCard = ({ img, title, rating, rank, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        flex: "0 0 auto",
        position: "relative", // ⭐ 배지 위치를 위해
      }}
    >
      {/* 순위 배지 */}
      {rank && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // 반투명 검정
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "6px",
            fontWeight: "700",
            fontSize: "14px",
            zIndex: 10,
          }}
        >
          {rank}
        </div>
      )}

      <img
        src={img}
        alt={title}
        style={{
          width: "100%",
          height: "260px",       // 포스터 느낌 높이
          objectFit: "cover",    // 영역 가득 채우면서 비율 유지
          display: "block",      // 이미지 밑 여백 제거
          borderRadius: "8px",   // 테두리 약간 둥글게
        }}
      />
      <h3 style={{ margin: "5px 0 0 0", fontSize: "16px" }}>{title}</h3>
      <p style={{ margin: "2px 0 0 0", fontSize: "14px" }}>평점 {rating}</p>
    </div>
  );
};

export default BannerCard;
