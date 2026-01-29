import { combineReducers } from "redux";
import auth from './authReducer';

// 여러개의 reducer를 하나로 합쳐준다.
const rootReducer = combineReducers({
  auth,
});

export default rootReducer;