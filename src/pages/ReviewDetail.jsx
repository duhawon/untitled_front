import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ReviewCard from "../components/Card/Review/ReviewCard";
import CommentCard from "../components/Card/Comment/CommentCard";
import { reviews } from "../data/reviews";
import { comments } from "../data/comments"; // 댓글 더미
import "./ReviewDetail.css";

const ReviewDetail = () => {
  const { reviewId } = useParams();
  
  // 클릭한 리뷰 찾기
  const review = reviews.find(r => r.id === parseInt(reviewId));


  if (!review) return <Layout>리뷰를 찾을 수 없습니다.</Layout>;

  return (
    <Layout>
      <div className="review-detail-container">
        {/* 상단 상세 리뷰 */}
        <div className="selected-review">
          <ReviewCard
            user={review.user}
            userImg={review.userImg}
            score={review.score}
            text={review.text}
            date={review.date}
            likes={review.likes}
            replies={review.replies}
            isSummary={false} // 상세 모드
          />
        </div>

        {/* 댓글 리스트 */}
        <div className="comments-section">
          <h3 className="comments-title">댓글 ({comments.length})</h3>
          <div className="comments-list">
            {comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewDetail;
