import React, { useState } from 'react';
import CommonModal from '../components/Modal/CommonModal';
import ResetPassword from './ResetPassword';

const Login = ({ isOpen, onClose, onLogin, openSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleLogin = () => {
    onLogin(email, password);
    setEmail('');
    setPassword('');
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
