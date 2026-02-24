import api from './axiosInstance'

export const followApi = (targetUserId) => {
    return api.post(`/users/${targetUserId}/follows`);
}

export const unfollowApi = (targetUserId) => {
    return api.delete(`/users/${targetUserId}/follows`);
}

export const getFollowersApi = (userId) => {
    return api.get(`/users/${userId}/follows/followers`);
}

export const getFollowingsApi = (userId,{page = 0, size = 10}) => {
    return api.get(`/users/${userId}/follows/followings`, {
        params: {page, size}
    });
}