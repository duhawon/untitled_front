import api from './axiosInstance';

export const signUpApi = (signUpData) => {
    return api.post('/users/signUp', signUpData)
}