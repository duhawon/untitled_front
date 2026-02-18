import api from './axiosInstance'

export const getReviewCommentsApi = (reviewId, {page=0, size=10}) => {
    return api.get(`/reviews/${reviewId}/comments`,{
        params: {page, size}
    });
}