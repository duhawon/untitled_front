import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk'; // 비동기를 사용하기 위한 미들웨어
import Reducer from './reducers/index'
import promiseMiddleware from 'redux-promise'; // promise를 사용하기 위한 미들웨어

// 원래 store는 객체밖에 못받기 때문에 promise와 function을 사용하기 위해 미들웨어를 사용한다.
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);

const store = createStoreWithMiddleware(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;