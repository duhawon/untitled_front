import { LOGIN_SUCCESS, LOGOUT, REFRESH_ACCESS_TOKEN, CLEAR_AUTH, UPDATE_USER_INFO } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  userInfo: null,
  isInitialized: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          accessToken: action.payload.accessToken,
          userInfo: action.payload.userInfo,
          isInitialized: true,
        };
      case REFRESH_ACCESS_TOKEN:
        return {
          ...state,
          accessToken: action.payload,
          isInitialized: true,
        }
      case LOGOUT:
      case CLEAR_AUTH:
        return { ...initialState, isInitialized: true};
      case UPDATE_USER_INFO:
        return {
          ...state,
          userInfo: {
            ...(state.userInfo ?? {}),
            ...action.payload,
          }
        }
      default:
        return state;
    }
  };
  
  export default authReducer;