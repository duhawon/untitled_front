import React, { useCallback, useRef, useState } from "react";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { followApi, unfollowApi } from '../../api/followApi';
import { getLikeUsersApi } from '../../api/likeApi';
import CommonModal from "./CommonModal";
import "./LikeListModal.css";

const PAGE_SIZE = 10;
const LikeListModal = ({ isOpen, onClose, targetType, targetId }) => {
  // 각 user.id에 대한 follow 상태 저장
  const [loading, setLoading] = useState(false);
  const [likeSlice, setLikeSlice] = useState({
    content: [],
    hasNext: false,
    page: 0,
    size: PAGE_SIZE
  })
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const myUserId = useSelector((state) => state.auth?.userInfo?.userId);

  
  const fetchLikeUsers = useCallback( async(page, mode) => {
    if (!isOpen || !targetId) return;

      setLoading(true);
      try {
        const { data } = await getLikeUsersApi(targetType, targetId, {
          page,
          size: PAGE_SIZE
        });
        const nextContent = data?.content ?? [];
        const hasNext = !!data?.hasNext;

        setLikeSlice((prev) => ({
          content: mode === "replace" ? nextContent: [...prev.content, ...nextContent],
          hasNext: hasNext,
          page: page + 1,
          size: PAGE_SIZE
        }));
      } catch(e) {
        console.error(e);
        if (mode === "replace") {
          setLikeSlice({content: [], hasNext: false, page: 0, size: PAGE_SIZE})
        }
      } finally {
        setLoading(false);
      }
    }, [isOpen, targetId, targetType]);

  useEffect(() => {
    if (!isOpen || !targetId) return;
    setLoading(false);
    setLikeSlice({ content: [], hasNext: true, page: 0, size: PAGE_SIZE });
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    fetchLikeUsers(0, "replace");
  }, [isOpen, targetId, targetType, fetchLikeUsers]);

  const loadMore = useCallback(async () => {
    if(!isOpen || !targetId || loading || !likeSlice.hasNext) return;
    await fetchLikeUsers(likeSlice.page, "append");
  }, [isOpen, targetId, loading, likeSlice.hasNext, likeSlice.page, fetchLikeUsers]);
  
  // DESC : 무한스크롤
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, loadMore]);

  const handleFollowClick = async (targetUserId, currentlyFollowed) => {
    if (!targetUserId) return;

    setLikeSlice((prev) => ({
      ...prev,
      content: prev.content.map((item) => 
        item.userSummary.userId === targetUserId
        ? {...item, followed: !item.followed}
        : item
      ),
    }));
    try {
      if (currentlyFollowed) {
        await unfollowApi(targetUserId);
      } else {
        await followApi(targetUserId);
      }
    } catch(e) {
      console.error(e);

      setLikeSlice((prev) => ({
        ...prev,
        content: prev.content.map((item) =>
          item.userSummary.userId === targetUserId
            ? { ...item, followed: currentlyFollowed }
            : item
        ),
      }));
    }
  }
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} width={320}>
      <div className="like-list-modal">
        <h2 className="like-list-title">좋아요한 사람들</h2>
        <div className="like-list-items" ref={scrollRef}>
          {likeSlice.content.map((data) => {
            const userId = data.userSummary.userId;
            const isMe = !!myUserId && userId === myUserId;
            return (
              <div key={data.userSummary.userId} className="like-list-item">
                <div className="like-user-info">
                  <img
                    src={data.userSummary.profileImgUrl || "/default-profile.png"}
                    alt={data.userSummary.name}
                    className="like-user-img"
                  />
                  <span className="like-user-name">{data.userSummary.name}</span>
                </div>
                {!isMe && (
                  <button
                    className={`follow-btn ${data.followed ? "following" : ""}`}
                    onClick={() => handleFollowClick(data.userSummary.userId, data.followed)}
                  >
                    {data.followed ? "팔로잉" : "팔로우"}
                  </button>
                )}
              </div>
            );
          })}
          <div ref={sentinelRef} style={{ height: 1 }} />
        </div>
      </div>
    </CommonModal>
  );
};

export default LikeListModal;
