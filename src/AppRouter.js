import { Typography } from '@mui/material';
import React from "react";
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import RoomDetail from './pages/RoomDetail';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function Copyright() {
    return(
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            duha, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="roomdetail" element={<RoomDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;