import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Profile.css';
import { useSelector } from 'react-redux'

// 날짜별 포스터 데이터 예시
const escapeRoomData = {
    '2025-12-01': 'https://picsum.photos/40?random=101',
    '2025-12-03': 'https://picsum.photos/40?random=102',
    '2025-12-05': 'https://picsum.photos/40?random=103',
};

const Profile = () => {
    const [date, setDate] = useState(new Date());
    const userInfo = useSelector((state) => state.auth.userInfo);

    // 날짜 타일 내부 요소(포스터 이미지)
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            if (escapeRoomData[dateStr]) {
                return (
                    <img
                        src={escapeRoomData[dateStr]}
                        alt="방탈출 포스터"
                        className="calendar-poster"
                    />
                );
            }
        }
        return null;
    };

    return (
        <Layout>
            <div className="profile-card">
                <div className="profile-settings">⚙️</div>

                <div className="profile-info">
                    <img
                        src={userInfo?.profileUrl || '/default-profile.png'}
                        alt="프로필"
                        className="profile-big-img"
                    />
                    <div className="profile-info-text">
                        <h2 className="profile-name">{userInfo.name}</h2>
                        <p className="profile-email">{userInfo.email}</p>
                        <p className="profile-follow">
                            팔로워 {userInfo.followers} | 팔로잉 {userInfo.following}
                        </p>
                    </div>
                </div>

                <hr className="profile-divider" />

                <div className="profile-stats">
                    <div className="stat-item">
                        <p className="stat-number">{userInfo.reviews}</p>
                        <p className="stat-text">평가</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <p className="stat-number">{userInfo.comments}</p>
                        <p className="stat-text">코멘트</p>
                    </div>
                </div>

                <hr className="profile-divider" />

                {/* 캘린더 */}
                <div className="profile-calendar">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        locale='ko'

                        formatDay={(locale, date) => date.getDate()}

                        tileContent={tileContent}
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                const dateStr = date.toISOString().split('T')[0];
                                return escapeRoomData[dateStr] ? 'has-poster' : null;
                            }
                            return null;
                        }}

                        view="month"
                        minDetail="month"
                        maxDetail="month"

                        /* 🔥 월/연도 커스텀: 2025.12 형태로 변경 */
                        navigationLabel={({ date }) => (
                            <span className="calendar-nav-label">
                                {date.getFullYear()}.{String(date.getMonth() + 1).padStart(2, '0')}
                            </span>
                        )}

                        prev2Label={null}
                        next2Label={null}

                        onClickYear={() => {}}
                        onClickDecade={() => {}}
                        onClickCentury={() => {}}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
