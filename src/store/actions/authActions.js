export const LOGIN_SUCCESS = 'auth/LOGIN';
export const LOGOUT = 'auth/LOGOUT';
export const REFRESH_ACCESS_TOKEN = 'auth/REFRESH_ACCESS_TOKEN'
export const CLEAR_AUTH = 'auth/CLEAR_AUTH'
export const loginSuccess = (accessToken, userInfo) => ({
  type: LOGIN_SUCCESS,
  payload: {
    accessToken,
    userInfo
  },
});

export const logout = () => ({
  type: LOGOUT,
});

export const refreshAccessToken = (accessToken) => ({
  type: REFRESH_ACCESS_TOKEN,
  payload: accessToken
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
})