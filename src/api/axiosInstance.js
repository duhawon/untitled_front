import axios from 'axios';
import { API_BASE_URL } from '../api-config';
import store from '../store/store';
import { refreshAccessToken, clearAuth } from '../store/actions/authActions';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // DESC : 쿠키 허용
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newAccessToken) {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

/* Request Interceptor (accessToken 자동 주입) */
api.interceptors.request.use((config) => {
    const accessToken = store.getState().auth.accessToken;
    
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

/* Response Interceptor (401 재요청) */
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    addRefreshSubscriber((newAccessToken) => {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        resolve(api(originalRequest));
                    })
                })
            }
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const reissueResponse = await axios.post(
                    `${API_BASE_URL}/auth/reissue`,
                    {},
                    {withCredentials: true}
                );

                const newAccessToken = reissueResponse.headers.authorization?.replace('Bearer ', '');

                if(!newAccessToken) {
                    throw new Error('Invalid reissue response');
                }

                store.dispatch(refreshAccessToken(newAccessToken));
                isRefreshing = false;

                onRefreshed(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (e) {
                isRefreshing = false;
                refreshSubscribers = [];

                store.dispatch(clearAuth());
                window.location.href='/login';
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
);

export default api;