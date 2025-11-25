// pages/Signup.jsx
import React, { useState } from 'react';
import CommonModal from '../components/Modal/CommonModal';

const Signup = ({ isOpen, onClose, onSignup, openLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    onSignup(name, email, password);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleSignup}>회원가입</button>
      <p>
        이미 가입하셨나요?{' '}
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => { onClose(); openLogin(); }}>
          로그인
        </span>
      </p>
    </CommonModal>
  );
};

export default Signup;
