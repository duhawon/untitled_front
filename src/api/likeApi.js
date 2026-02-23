import api from './axiosInstance'

export const getLikeUsersApi = (targetType, targetId, { page = 0, size = 10}) => {
    return api.get('/likes', {
        params: {
        targetType,
        targetId,
        page,
        size,
    },});
}

export const likeApi = (targetType, targetId) => {
    return api.post('/likes', {
        targetType, targetId
    });
}

export const unlikeApi = (targetType, targetId) => {
    return api.delete('/likes', {
        targetType, targetId
    });
}