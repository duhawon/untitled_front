import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import BannerCard from "../components/Banner/BannerCard";
import { banners as dummyBanners } from "../components/Banner/dummyData";
import "./SearchResultPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomsApi } from '../api/roomApi';

const PAGE_SIZE = 10;

const SearchResultPage = () => {
  const [columns, setColumns] = useState(5);
  const navigate = useNavigate();

  const { keyword } = useParams();
  const query = (keyword || "").trim();

  const [loading, setLoading] = useState(false);
  const [roomSlice, setRoomSlice] = useState({
    content: [],
    hasNext: false,
    page: 0,
    size: PAGE_SIZE,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setColumns(3);
      else if (window.innerWidth < 1024) setColumns(4);
      else setColumns(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!query) {
      setRoomSlice({ content: [], hasNext: false, page: 0, size: PAGE_SIZE });
      return;
    }

    const init = async () => {
      setLoading(true);
      try {
        const { data } = await getRoomsApi({ query, page: 0, size: PAGE_SIZE});
        const content = data?.content ?? [];
        const hasNext = !!(data?.hasNext ?? (!data?.last));

        setRoomSlice({
          content,
          hasNext,
          page: 1,
          size: PAGE_SIZE,
        });
      } catch(e) {
        console.error(e);
        setRoomSlice({ content: [], hasNext: false, page: 0, size: PAGE_SIZE });
      }
      setLoading(false);
    };
    init();
  }, [query]);

  const loadMore = useCallback(async () => {
    if (!query) return;
    if (!roomSlice.hasNext) return;
    if (loading) return;

    setLoading(true);
    try {
      const res = await getRoomsApi({
        query,
        page: roomSlice.page,
        size: roomSlice.size,
      });

      const data = res.data;
      const nextContent = data?.content ?? [];
      const nextHasNext = !!data?.hasNext;

      setRoomSlice((prev) => ({
        ...prev,
        content: [...prev.content, ...nextContent],
        hasNext: nextHasNext,
        page: prev.page + 1,
      }));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [query, roomSlice.hasNext, roomSlice.page, roomSlice.size, loading]);
  return (
    <Layout>
      {/* 검색 결과 헤더 */}
      <div className="search-header">
        {`"${query}" 검색결과`}
      </div>

      {/* 결과 그리드 */}
      <div
        className="search-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {roomSlice.content.map((room) => (
          <div key={room.id} className="grid-item">
            <BannerCard
              img={"/default-room.png"}
              title={room.name}
              rating={room.rating}
              onClick={() => navigate(`/room/${room.id}`)}
            />
          </div>
        ))}
        {!loading && roomSlice.content.length === 0 && (
          <div style={{ padding: 12 }}>검색 결과가 없습니다.</div>
        )}
        {roomSlice.hasNext && (
          <div className="grid-footer">
            <button className="load-more-btn" onClick={loadMore} disabled={loading}>
              {loading ? "로딩중..." : "더 보기"}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResultPage;
