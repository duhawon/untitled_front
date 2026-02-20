import api from './axiosInstance'

export const getRoomReviewsApi = (roomId, {page = 0, size = 10, sort = "new"}) => {
    return api.get(`/rooms/${roomId}/reviews`, {
        params: {page, size, sort}
    });
}
export const getMyReviewByRoomApi = (roomId) => {
    return api.get(`/rooms/${roomId}/reviews/me`);
}
export const getReviewDetailApi = (reviewId) => {
    return api.get(`/reviews/${reviewId}`);
}
export const createReviewApi = ({ roomId, rating, content, spoiler = false}) => {
    return api.post("/reviews", { roomId, rating, content, spoiler });
}
export const updateReviewApi = (reviewId, { rating, content, spoiler = false }) => {
    return api.put(`/reviews/${reviewId}`, { rating, content, spoiler });
}
export const deleteReviewApi = (reviewId) => {
    return api.delete(`/reviews/${reviewId}`);
}