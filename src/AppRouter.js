import React from "react";
import Main from './pages/Main';
import RoomDetail from './pages/RoomDetail';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReviewList from './pages/ReviewList';
import ReviewDetail from './pages/ReviewDetail';
import SearchResultPage from './pages/SearchResultPage';
import Profile from './pages/Profile';

function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="room/:roomId" element={<RoomDetail />} />
                    <Route path="room/:roomId/reviews" element={<ReviewList />} />
                    <Route path="review/:reviewId" element={<ReviewDetail />} />
                    <Route path="search/:keyword" element={<SearchResultPage />} />
                    <Route path="profile/:userId" element={<Profile/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;