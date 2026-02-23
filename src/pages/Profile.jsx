import React, { useMemo, useRef, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux'
import { presignUserProfileApi, updateMyProfileImageApi } from '../api/uploadApi';
import { uploadToS3ByPresignedUrl } from '../api/s3Upload';
import { updateUserInfo } from '../store/actions/authActions';

// 날짜별 포스터 데이터 예시
const escapeRoomData = {
    '2025-12-01': 'https://picsum.photos/40?random=101',
    '2025-12-03': 'https://picsum.photos/40?random=102',
    '2025-12-05': 'https://picsum.photos/40?random=103',
};

const Profile = () => {
    const [date, setDate] = useState(new Date());
    const userInfo = useSelector((state) => state.auth.userInfo);

    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const currentProfileUrl = useMemo(() => {
        return previewUrl || userInfo?.profileImgUrl || '/default-profile.png';
    },[previewUrl, userInfo]);
    
    const openFilePicker = () => {
        if(isUploading) return;
        setErrorMsg(null);
        fileInputRef.current?.click();
    }

    const onChangeFile = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if(!file) return;

        // DESC : 확장자 제한
        const allowed = ['image/png', 'image/jpeg', 'image/webp'];
        if(!allowed.includes(file.type)) {
            setErrorMsg('png/jpg/webp 파일만 업로드 할 수 있습니다.');
            return;
        }
        // DESC : 용량 제한
        const maxMb = 5;
        if (file.size > maxMb * 1024 * 1024) {
            setErrorMsg(`${maxMb}MB 이하만 업로드 할 수 있습니다.`);
            return;
        }
        
        const localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);

        try {
            setIsUploading(true);
            setErrorMsg(null);

            const presignRes = await presignUserProfileApi({
                contentType: file.type,
                originalFileName: file.name,
            });

            const { uploadUrl, key, publicUrl} = presignRes.data;

            if (!uploadUrl || !key) throw new Error('presign 응답이 올바르지 않습니다.');

            // DESC : 직접 S3에 업로드
            await uploadToS3ByPresignedUrl(uploadUrl, file);
            await updateMyProfileImageApi(key);

            dispatch(updateUserInfo({
                profileImgUrl: publicUrl
            }));
            setPreviewUrl(null);
        } catch(e) {
            setPreviewUrl(null);
            setErrorMsg(e?.message || '프로필 이미지 업로드 실패');
        } finally {
            setIsUploading(false);
        }
    }

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
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        style={{ display: 'none' }}
                        onChange={onChangeFile}
                    />
                    <div className="profile-img-wrapper" onClick={openFilePicker}>
                        <img
                            src={currentProfileUrl}
                            alt="프로필"
                            className="profile-big-img"
                        />
                        <div className='profile-img-overlay'>
                            {isUploading ? '업로드 중...' : '클릭해서 변경'}
                        </div>
                    </div>
                    <div className="profile-info-text">
                        <h2 className="profile-name">{userInfo.name}</h2>
                        <p className="profile-email">{userInfo.email}</p>
                        <p className="profile-follow">
                            팔로워 {userInfo.followers} | 팔로잉 {userInfo.following}
                        </p>
                        {errorMsg && <p className="profile-error">{errorMsg}</p>}
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
