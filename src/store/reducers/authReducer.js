import { LOGIN_SUCCESS, LOGOUT, REFRESH_ACCESS_TOKEN, CLEAR_AUTH } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  userInfo: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          accessToken: action.payload.accessToken,
          userInfo: action.payload.userInfo
        };
      case REFRESH_ACCESS_TOKEN:
        return {
          ...state,
          accessToken: action.payload
        }
      case LOGOUT:
      case CLEAR_AUTH:
        return initialState;

      default:
        return state;
    }
  };
  
  export default authReducer;