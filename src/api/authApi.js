import api from './axiosInstance';

export const signInApi = (email, password) => {
    return api.post('/auth/signIn',{
        email,
        password
    });
};

export const signOutApi = () => {
    return api.post('/auth/signOut');
};

export const reissueApi = () => {
    return api.post('/auth/reissue');
}