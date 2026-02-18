import api from './axiosInstance'

export const getRoomsApi = ({query, page = 0, size = 10} = {}) => {
    return api.get('/rooms', {
        params: {query, page, size},
    });
};