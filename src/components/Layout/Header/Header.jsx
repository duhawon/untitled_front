import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../../pages/Login';
import Signup from '../../../pages/Signup';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/actions/authActions';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo, isInitialized } = useSelector((state) => state.auth);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openLogin = () => setIsLoginOpen(true);
    const openSignup = () => setIsSignupOpen(true);

    return (
        <header className="header">
            {/* 왼쪽 로고 영역 */}
            <div className="header-left">
                <img src="/logo.png" alt="탈출록 로고" className="logo" onClick={() => navigate("/")}/>
            </div>

            {/* 오른쪽 메뉴 */}
            <div className="header-right">
                <input
                    className="search-input"
                    placeholder="방탈출 검색..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim() !== "") {
                            navigate(`/search/${encodeURIComponent(e.target.value.trim())}`);
                        }
                    }}
                />
                { !isInitialized ? (
                    <div style={{ width: 160 }} /> 
                ): isLoggedIn ? (
                    <div className="header-user-info">
                        <img
                            src={userInfo?.profileImgUrl || '/default-profile.png'}
                            alt="프로필"
                            className="profile-img"
                            onClick={() => navigate(`/profile/${userInfo.userId}`)}
                        />
                        { <button
                            className="header-btn"
                            onClick={() => dispatch(logout())}
                        >
                            로그아웃
                        </button>}
                    </div>
                ) : (
                    <>
                        <button className="header-btn" onClick={openLogin}>
                            로그인
                        </button>
                        <button className="header-btn" onClick={openSignup}>
                            회원가입
                        </button>
                    </>
                )}
            </div>

            {/* 로그인 모달 */}
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                openSignup={openSignup}
            />

            {/* 회원가입 모달 */}
            <Signup
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                openLogin={openLogin}
            />
        </header>
    );
};

export default Header;
