import React from "react";
import RoomSlider from '../components/Banner/RoomSlider';
import Layout from "../components/Layout/Layout";
import MainTopBanner from "../components/Banner/MainTopBanner";
import AdSlider from "../components/Banner/AdSlider";
import "./Main.css";

const Main = () => {
  return (
    <Layout>
    <MainTopBanner />
    <AdSlider />
    <div className="main-section-title">
        방탈출 랭킹
    </div>
    <RoomSlider />
    </Layout>
  );
};

export default Main;
