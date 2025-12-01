import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import ReviewCard from "../components/Card/Review/ReviewCard";
import "./ReviewList.css";
import { reviews } from "../data/reviews";

const ReviewList = () => {
  const [sort, setSort] = useState("likes");

  // 정렬 로직
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sort) {
      case "likes":
        return b.likes - a.likes;
      case "high":
        return b.score - a.score;
      case "low":
        return a.score - b.score;
      case "new":
        return new Date(b.date) - new Date(a.date);
      case "old":
        return new Date(a.date) - new Date(b.date);
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="review-list-container">
        {/* 상단 제목 */}
        <h1 className="review-list-title">평가</h1>

        {/* 정렬 Dropdown */}
        <div className="review-list-sort-wrap">
          <select
            className="review-sort-dropdown"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="likes">좋아요순</option>
            <option value="high">높은평가순</option>
            <option value="low">낮은평가순</option>
            <option value="new">최신순</option>
            <option value="old">오래된순</option>
          </select>
        </div>

        {/* 리뷰 리스트 */}
        <div className="review-list-scroll">
          {sortedReviews.map((r) => (
            <div key={r.id} className="review-list-item">
              <ReviewCard
                user={r.user}
                userImg={r.userImg}
                score={r.score}
                text={r.text}
                date={r.date}
                likes={r.likes}
                replies={r.replies}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReviewList;
