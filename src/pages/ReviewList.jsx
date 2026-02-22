import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ReviewCard from "../components/Card/Review/ReviewCard";
import "./ReviewList.css";
import { getRoomReviewsApi } from '../api/reviewApi';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

const PAGE_SIZE = 5;
const ReviewList = () => {
  const { roomId } = useParams();
  const [sort, setSort] = useState("likes");
  const [loading, setLoading] = useState(false);
  const [reviewSlice, setReviewSlice] = useState({
    content: [],
    hasNext: false,
    page: 0,
    size: PAGE_SIZE
  });
  // DESC : 무한스크롤 트리거
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;
    setReviewSlice({ content: [], hasNext: true, page: 0, size: PAGE_SIZE });
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [roomId, sort]);

  // DESC : 최초진입시 10개
  useEffect(() => {
    if(!roomId) return;

    const init = async () => {
      setLoading(true);
      try {
        const r0 = await getRoomReviewsApi(roomId, {page: 0, size: PAGE_SIZE, sort});
        const d0 = r0.data;
        let content = d0?.content ?? [];
        let hasNext = !!d0?.hasNext;
        let nextPage = 1;

        if (hasNext) {
          const r1 = await getRoomReviewsApi(roomId, {page: 1, size: PAGE_SIZE, sort});
          const d1 = r1.data;
          content = [...content, ...(d1?.content ?? [])];
          hasNext = !!d1?.hasNext;
          nextPage = 2;
        }
        setReviewSlice({
          content,
          hasNext,
          page: nextPage,
          size: PAGE_SIZE
        });
      } catch (e) {
        console.error(e);
        setReviewSlice({content: [], hasNext: false, page: 0, size: PAGE_SIZE})
      }
      setLoading(false);
    }
    init();
  }, [roomId, sort]);

  // DESC : 다음페이지 로드
  const loadMore = useCallback(async () => {
    if (!roomId || loading || !reviewSlice.hasNext) return;

    setLoading(true);
    try {
      const res = await getRoomReviewsApi(roomId, {
        page: reviewSlice.page,
        size: reviewSlice.size,
        sort,
      });

      const data = res.data;
      const nextContent = data?.content ?? [];

      setReviewSlice((prev) => ({
        ...prev,
        content: [...prev.content, ...nextContent],
        hasNext: !!data?.hasNext,
        page: prev.page + 1,
      }));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [roomId, sort, loading, reviewSlice.hasNext, reviewSlice.page, reviewSlice.size])
  
  // DESC : 무한스크롤
  useEffect(() => {
    const rootEl = scrollRef.current;
    const targetEl = sentinelRef.current;
    if(!rootEl || !targetEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { 
        root: rootEl,
        threshold: 0.1 }
    );
    obs.observe(targetEl);
    return () => obs.disconnect();
  }, [loadMore]);

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
        <div className="review-list-scroll" ref={scrollRef}>
          {reviewSlice.content.map((r) => (
            <div key={r.reviewId} className="review-list-item">
              <ReviewCard
                reviewId={r.reviewId}
                user={r.userSummary?.name}
                userImg={r.userSummary?.profileImgUrl}
                score={r.rating}
                text={r.content}
                date={"-"}
                likes={r.likeCount}
                replies={r.commentCount}
              />
            </div>
          ))}
          <div ref={sentinelRef} style={{ height: 1 }} />
          {loading && <div style={{ padding: 12 }}>로딩중...</div>}
        </div>
      </div>
    </Layout>
  );
};

export default ReviewList;
