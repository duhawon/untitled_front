import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import StarRating from "../components/StarRating/StarRating";
import CommentCard from "../components/Card/Comment/CommentCard";
import "./RoomDetail.css";

const RoomDetail = () => {
  const [wish, setWish] = useState(false);
  const toggleWish = () => setWish(!wish);

  // 더미 데이터
  const comments = [
    {
      id: 1,
      user: "Alice",
      userImg: "https://picsum.photos/40?random=1",
      score: 4.5,
      text: "스토리가 정말 재미있고 몰입감 최고였어요!",
      date: "2025-11-20",
      likes: 120,
      replies: 5,
    },
    {
      id: 2,
      user: "Bob",
      userImg: "https://picsum.photos/40?random=2",
      score: 3.0,
      text: "난이도가 조금 높아서 친구랑 힘들었어요.",
      date: "2025-11-18",
      likes: 45,
      replies: 2,
    },
    {
      id: 3,
      user: "Charlie",
      userImg: "https://picsum.photos/40?random=3",
      score: 5.0,
      text: "완전히 새로운 경험! 다시 하고 싶어요!",
      date: "2025-11-15",
      likes: 200,
      replies: 10,
    },
    {
      id: 4,
      user: "Diana",
      userImg: "https://picsum.photos/40?random=4",
      score: 4.0,
      text: "공포 테마라서 더 몰입되었어요. 분위기 최고!",
      date: "2025-11-12",
      likes: 75,
      replies: 3,
    },
    {
      id: 5,
      user: "Eve",
      userImg: "https://picsum.photos/40?random=5",
      score: 3.5,
      text: "시간이 조금 짧은 느낌이었지만 재미있었습니다.",
      date: "2025-11-10",
      likes: 60,
      replies: 1,
    },
    {
      id: 6,
      user: "Frank",
      userImg: "https://picsum.photos/40?random=6",
      score: 4.2,
      text: "친구들과 함께 즐기기 딱 좋은 방이었어요.",
      date: "2025-11-08",
      likes: 90,
      replies: 4,
    },
  ];

  return (
    <Layout>
      <div className="room-detail-container">
        {/* 상단 포스터 + 정보 영역 */}
        <div className="room-top-row">
          {/* 왼쪽: 포스터 */}
          <div className="poster-wrap">
            <img
              src="https://picsum.photos/300/200?random=10"
              alt="방탈출 포스터"
              className="poster-img"
            />
          </div>

          {/* 오른쪽: 정보 */}
          <div className="info-wrap">
            {/* 제목 + 북마크 */}
            <div className="title-bookmark-wrap">
              <h1 className="room-title">방탈출 예시 제목</h1>
              <span className="bookmark-icon" onClick={toggleWish}>
                {wish ? "🔖" : "📑"}
              </span>
            </div>

            {/* 별점 + 평균 */}
            <div className="rating-section">
              <div className="rating-left">
                <StarRating
                  initialRating={3.5}
                  onChange={(value) => console.log("선택 점수:", value)}
                  note="평가하기"
                />
              </div>
              <div className="rating-right">
                <div className="rating-score-main">3.5</div>
                <div className="avg-label">평균별점 (1,234명)</div>
              </div>
            </div>

            <hr className="detail-hr" />

            {/* 버튼 */}
            <div className="action-buttons-row">
              <button className="action-btn">💬 코멘트</button>
              <button className="action-btn">📅 탈출일</button>
            </div>

            <hr className="detail-hr" />

            {/* 정보 그리드 */}
            <div className="info-grid">
              <div className="info-item">장르: 공포</div>
              <div className="info-item">난이도: 3</div>
              <div className="info-item">시간: 60분</div>
              <div className="info-item">인원수: 2~6명</div>
              <div className="info-item">매장: 강남점</div>
            </div>

            {/* 설명 */}
            <div className="description">
              방탈출에 대한 자세한 설명이 들어가는 영역입니다. 스토리, 분위기,
              체감 난이도, 특징 등을 간략하게 적는 공간입니다.
            </div>
          </div>
        </div>

        {/* 코멘트 섹션 */}
        <div className="comment-section">
          <div className="comment-header">
            <h2 className="comment-title">코멘트</h2>
            <span className="comment-count">950+</span>
            <button className="comment-more">더보기</button>
          </div>

          <div className="comment-card-grid">
            {comments.map((c) => (
              <CommentCard
                key={c.id}
                user={c.user}
                userImg={c.userImg}
                score={c.score}
                text={c.text}
                date={c.date}
                likes={c.likes}
                replies={c.replies}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetail;
