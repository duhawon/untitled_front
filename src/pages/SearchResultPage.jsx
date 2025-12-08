import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import BannerCard from "../components/Banner/BannerCard";
import { banners as dummyBanners } from "../components/Banner/dummyData";
import "./SearchResultPage.css";
import { useNavigate } from "react-router-dom";

const SearchResultPage = () => {
  const [columns, setColumns] = useState(5);
  const navigate = useNavigate();

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

  return (
    <Layout>
      {/* 검색 결과 헤더 */}
      <div className="search-header">
        "모던" 검색결과
      </div>

      {/* 결과 그리드 */}
      <div
        className="search-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {dummyBanners.map((banner, idx) => (
          <div key={idx} className="grid-item">
            <BannerCard
              img={banner.img}
              title={banner.title}
              rating={banner.rating}
              onClick={() => navigate(`/room/${banner.roomId}`)}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SearchResultPage;
