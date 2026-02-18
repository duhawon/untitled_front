import api from './axiosInstance'

export const getRoomReveiwsApi = (roomId, {page = 0, size = 10}) => {
    return api.get(`/rooms/${roomId}/reviews`, {
        params: {page, size}
    });
}
export const getMyReviewByRoomApi = (roomId) => {
    return api.get(`/rooms/${roomId}/reviews/me`);
}
export const getReviewDetailApi = (reviewId) => {
    return api.get(`/reviews/${reviewId}`);
}