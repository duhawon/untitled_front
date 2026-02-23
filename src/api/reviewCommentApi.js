import api from './axiosInstance'

export const getReviewCommentsApi = (reviewId, {page=0, size=10}) => {
    return api.get(`/reviews/${reviewId}/comments`,{
        params: {page, size}
    });
}

export const createReviewCommentApi = (reviewId, content) => {
    return api.post(`/reviews/${reviewId}/comments`, {
        content
    });
}

export const deleteReviewCommentApi = (reviewId, commentId) => {
    return api.delete(`/reviews/${reviewId}/comments/${commentId}`);
}

export const updateReviewCommentApi = (reviewId, commentId, content) => {
    return api.put(`/reviews/${reviewId}/comments/${commentId}`,{
        content
    });
}