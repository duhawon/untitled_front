import React, { useEffect, useState } from 'react';
import { signInApi } from '../api/authApi';
import CommonModal from '../components/Modal/CommonModal';
import { loginSuccess } from '../store/actions/authActions';
import ResetPassword from './ResetPassword';
import { useDispatch, useSelector } from 'react-redux';

const Login = ({ isOpen, onClose, openSignup }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetOpen, setIsResetOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setEmail('');
      setPassword('');
    }
  }, [isLoggedIn]);
  const handleLogin = async () => {
    try {
      const response = await signInApi(email, password);
      const accessToken = response.headers.authorization?.replace('Bearer ', '');

      dispatch(loginSuccess(
        accessToken,
        response.data
      ))
      onClose();
    } catch (error) {
      alert(error.message);
      // alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <>
      <CommonModal isOpen={isOpen} onClose={onClose}>
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>로그인</button>

        <p 
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => setIsResetOpen(true)}
        >
          비밀번호를 잊으셨나요?
        </p>

        <p>
          계정이 없으신가요?{' '}
          <span
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => { onClose(); openSignup(); }}
          >
            회원가입
          </span>
        </p>
      </CommonModal>

      <ResetPassword
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
      />
    </>
  );
};

export default Login;
