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