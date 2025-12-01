import React from "react";
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import RoomDetail from './pages/RoomDetail';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReviewList from './pages/ReviewList';

function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="room/:roomId" element={<RoomDetail />} />
                    <Route path="room/:roomId/reviews" element={<ReviewList />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;