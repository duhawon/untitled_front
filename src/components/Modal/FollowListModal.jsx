import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { getFollowersApi, getFollowingsApi } from '../../api/followApi';
import CommonModal from './CommonModal';
import './FollowListModal.css';

const PAGE_SIZE = 10;
const FollowListModal = ({ isOpen, onClose, userId, type }) => {
    const [slice, setSlice] = useState({ content: [], page: 0, hasNext: false});
    const [loading, setLoading] = useState(false);

    const load = useCallback(async (page, replace) => {
        if(!userId) return;
        setLoading(true);

        try {
            const res =
                type === "followers"
                    ? await getFollowersApi(userId, {page, PAGE_SIZE})
                    : await getFollowingsApi(userId, {page, PAGE_SIZE});
            const data = res.data;
            const content = data?.content ?? [];
            const hasNext = data?.hasNext ?? (data?.last != null ? !data.last : false);

            setSlice((prev) => ({
                content: replace ? content : [...prev.content, ...content],
                page,
                hasNext,
            }));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    },[userId, type]);

    useEffect(() => {
        if(!isOpen) return;
        load(0, true);
    }, [isOpen, load]);

    return(
        <CommonModal isOpen={isOpen} onClose={onClose} width={320}>
            <div className="follow-list-modal">
                <h2 className="follow-list-title">{type === "followers" ? "팔로워" : "팔로잉"}</h2>
                <div className="follow-list-items">
                {slice.content.map((u) => (
                    <div key={u.userId} className="follow-item">
                    <img
                        className="follow-avatar"
                        src={u.profileImgUrl || "/default-profile.png"}
                        alt={u.name}
                    />
                    <div className="follow-name">{u.name}</div>
                    </div>
                ))}

                {!loading && slice.content.length === 0 && (
                    <p className="follow-empty">목록이 비어있습니다.</p>
                )}
                </div>

                <div className="follow-footer">
                {loading && <span>불러오는 중...</span>}
                {!loading && slice.hasNext && (
                    <button className="follow-more-btn" onClick={() => load(slice.page + 1, false)}>
                    더보기
                    </button>
                )}
                </div>
            </div>
        </CommonModal>
    );
};

export default FollowListModal;