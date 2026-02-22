import { reissueApi, signOutApi } from '../../api/authApi';

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

export const logout = () => async (dispatch) => {
  try {
    await signOutApi();
  } finally {
    dispatch({ type: LOGOUT });
  }
};

export const refreshAccessToken = (accessToken) => ({
  type: REFRESH_ACCESS_TOKEN,
  payload: accessToken
});

export const clearAuth = () => ({
  type: CLEAR_AUTH,
})

export const restoreAuth = () => async (dispatch) => {
  try {
    const res = await reissueApi();
    const newAccessToken = res.headers.authorization?.replace('Bearer ', '');
    if(!newAccessToken) {
      throw new Error('Invalid reissue response');
    }
    const userInfo = res.data;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken: newAccessToken,
        userInfo,
      },
    });
    return true;
  } catch(e) {

    dispatch(clearAuth());
    return false;
  }
};