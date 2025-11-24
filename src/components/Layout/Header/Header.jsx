import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../store/actions/userActions';

const dummyUser = {
    id: 1,
    name: 'Duha',
    email: 'duha@test.com',
};

const Header = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    return (
        <div>
            <div>logo</div>
            <div>검색창</div>
            {isLoggedIn ? (
                <>
                    <div>기록하기</div>
                    <div>소식</div>
                    <div>{userInfo.name}</div>
                    <button onClick={() => dispatch(logout())}>로그아웃</button>
                </>
            ) : (
                <>
                    <button onClick={() => dispatch(login(dummyUser))}>로그인</button>
                    <div>회원가입</div>
                </>
            )}
        </div>
    );
}

export default Header;