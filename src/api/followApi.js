import api from './axiosInstance'

export const followApi = (targetUserId) => {
    return api.post(`/users/${targetUserId}/follows`);
}

export const unfollowApi = (targetUserId) => {
    return api.delete(`/users/${targetUserId}/follows`);
}