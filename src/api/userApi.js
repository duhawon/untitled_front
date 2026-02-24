import api from './axiosInstance';

export const signUpApi = (signUpData) => {
    return api.post('/users/signUp', signUpData)
}

export const getMyProfileApi = () => {
    return api.get('/users/profile/me');
}