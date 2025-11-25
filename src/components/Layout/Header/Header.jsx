import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../store/actions/userActions';
import Login from '../../../pages/Login';
import Signup from '../../../pages/Signup';

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
        <div className="header">
            <div className="logo">logo</div>
            <div className="search">검색창</div>
            {isLoggedIn ? (
                <>
                    <div>기록하기</div>
                    <div>소식</div>
                    <div>{userInfo.name}</div>
                    <button onClick={() => dispatch(logout())}>로그아웃</button>
                </>
            ) : (
                <>
                    <button onClick={openLogin}>로그인</button>
                    <button onClick={openSignup}>회원가입</button>
                </>
            )}

            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                openSignup={openSignup}
                onLogin={(email, password) => {
                    dispatch(login(dummyUser));
                    setIsLoginOpen(false);
                }}
            />

            <Signup
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                openLogin={openLogin}
                onSignup={(name, email, password) => {
                    alert(`회원가입: ${name}, ${email}`);
                    setIsSignupOpen(false);
                }}
            />
        </div>
    );
};

export default Header;
