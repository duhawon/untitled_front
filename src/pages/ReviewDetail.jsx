import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ReviewCard from "../components/Card/Review/ReviewCard";
import CommentCard from "../components/Card/Comment/CommentCard";
import "./ReviewDetail.css";
import { getReviewDetailApi } from '../api/reviewApi';
import { getReviewCommentsApi } from '../api/reviewCommentApi';
import { useCallback } from 'react';

const PAGE_SIZE = 10;
const ReviewDetail = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [loadingReview, setLoadingReview] = useState(true);
  const [commentSlice, setCommentSlice] = useState({
    content: [],
    hasNext: false,
    page: 0,
    size: PAGE_SIZE
  });
  const [loadingComments, setLoadingComments] = useState(false);

  // DESC : 무한스크롤 트리거
  const commentScrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const inFlightRef = useRef(false);

  const fetchCommentsPage = useCallback(
    async (pageToFetch, append) => {
      if (!reviewId) return;

      const res = await getReviewCommentsApi(reviewId, {
        page: pageToFetch,
        size: PAGE_SIZE,
      });

      const data = res.data;
      const nextContent = data?.content ?? [];

      setCommentSlice((prev) => ({
        ...prev,
        content: append ? [...prev.content, ...nextContent] : nextContent,
        hasNext: !!data?.hasNext,
        page: pageToFetch + 1,
        size: PAGE_SIZE,
      }));
    }, [reviewId]);

  const fetchReview = useCallback(async () => {
    const res = await getReviewDetailApi(reviewId);
    setReview(res.data);
  }, [reviewId]);

  useEffect(() => {
    if(!reviewId) return;

    setReview(null);
    setLoadingReview(true);

    setCommentSlice({ content: [], hasNext: false, page: 0, size: PAGE_SIZE });
    setLoadingComments(false);
    inFlightRef.current = false;

    if (commentScrollRef.current) commentScrollRef.current.scrollTop = 0;
  }, [reviewId]);

  useEffect(() => {
    if(!reviewId) return;

    const init = async () => {
      setLoadingReview(true);
      setLoadingComments(true);

      inFlightRef.current = true;
      try {
        await Promise.all([
          fetchReview(),
          fetchCommentsPage(0, false),
        ]);
      } catch (e) {
        console.error(e);
        setReview(null);
        setCommentSlice({ content: [], hasNext: false, page: 0, size: PAGE_SIZE });
      } finally {
        setLoadingReview(false);
        setLoadingComments(false);
        inFlightRef.current = false;
      }
    }
    init();
  }, [reviewId, fetchReview, fetchCommentsPage])

  const loadMore = useCallback(async () => {
    if (!reviewId) return;

    if(!commentSlice.hasNext) return;

    if (inFlightRef.current) return;
    inFlightRef.current = true;

    setLoadingComments(true);
    try {
      await fetchCommentsPage(commentSlice.page, true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingComments(false);
      inFlightRef.current = false;
    }
  },[setLoadingComments, commentSlice.hasNext, commentSlice.page, fetchCommentsPage]);

  useEffect(() => {
    const rootEl = commentScrollRef.current;
    const targetEl = sentinelRef.current;

    if(!rootEl || !targetEl) return;

    const obs = new IntersectionObserver(
      (entires) => {
        if (entires[0].isIntersecting) loadMore();
      },
      {
        root: rootEl,
        threshold: 0.1,
      }
    );
    obs.observe(targetEl);
    return () => obs.disconnect();
  }, [loadMore]);

  if (loadingReview) return <Layout>Loading...</Layout>;
  if (!review) return <Layout>리뷰를 찾을 수 없습니다.</Layout>;
  
  return (
    <Layout>
      <div className="review-detail-container">
        {/* 상단 상세 리뷰 */}
        <div className="selected-review">
          <ReviewCard
            reviewId={review.reviewId ?? reviewId}
            user={review.userSummary?.name}
            userImg={review.userSummary?.profileImgUrl}
            score={review.rating}
            text={review.content}
            date={"-"}
            likes={review.likeCount}
            replies={review.commentCount}
            isSummary={false} // 상세 모드
            disableNavigation={true} // 클릭 막기
          />
        </div>

        {/* 댓글 리스트 */}
        <div className="comments-section">
          <h3 className="comments-title">댓글 ({review.commentCount})</h3>
          <div className="comments-list" ref={commentScrollRef}>
            {commentSlice.content.map(c => (
              <CommentCard key={c.id} comment={c} />
            ))}
            <div ref={sentinelRef} style={{height: 1}}></div>
            {loadingComments && <div style={{ padding: 12 }}>Loading...</div>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewDetail;
