import { combineReducers } from "redux";
import user from './userReducer';

// 여러개의 reducer를 하나로 합쳐준다.
const rootReducer = combineReducers({
  user,
});

export default rootReducer;