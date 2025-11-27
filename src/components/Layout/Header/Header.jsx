import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../store/actions/userActions';
import Login from '../../../pages/Login';
import Signup from '../../../pages/Signup';
import './Header.css';

const dummyUser = {
    id: 1,
    name: 'Duha',
    email: 'duha@test.com',
};

const Header = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openLogin = () => setIsLoginOpen(true);
    const openSignup = () => setIsSignupOpen(true);

    return (
        <header className="header">
            {/* 왼쪽 로고 영역 */}
            <div className="header-left">
                <img src="/logo.png" alt="탈출록 로고" className="logo" />
            </div>

            {/* 오른쪽 메뉴 */}
            <div className="header-right">
                <input className="search-input" placeholder="방탈출 검색..." />

                {isLoggedIn ? (
                    <>
                        <div className="menu-item">기록하기</div>
                        <div className="menu-item">소식</div>
                        <div className="menu-item user-name">{userInfo.name}</div>
                        <button
                            className="header-btn"
                            onClick={() => dispatch(logout())}
                        >
                            로그아웃
                        </button>
                    </>
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
                onLogin={(email, password) => {
                    dispatch(login(dummyUser));
                    setIsLoginOpen(false);
                }}
            />

            {/* 회원가입 모달 */}
            <Signup
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                openLogin={openLogin}
                onSignup={(name, email, password) => {
                    alert(`회원가입: ${name}, ${email}`);
                    setIsSignupOpen(false);
                }}
            />
        </header>
    );
};

export default Header;
