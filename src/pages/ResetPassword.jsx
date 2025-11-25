import React, { useState } from 'react';
import CommonModal from '../components/Modal/CommonModal';

const ResetPassword = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

    const handleSendEmail = () => {
        alert(`비밀번호 재설정 이메일을 ${email}로 보냈습니다.`);
        setEmail('');
        onClose();
    };

    return (
        <CommonModal isOpen={isOpen} onClose={onClose}>
            <h2>비밀번호 재설정</h2>
            <p>가입했던 이메일을 적어주세요.</p>
            <p>입력하신 이메일 주소로 비밀번호 변경 메일을 보내드릴게요</p>
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendEmail}>이메일 보내기</button>
        </CommonModal>
    );
};

export default ResetPassword;
