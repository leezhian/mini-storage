import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";

// 引入 redux-saga 中间件
import createSagaMiddleware from 'redux-saga';
import todoSagas from './sagas';

// 引入redux-thunk 中间件
// import thunk from "redux-thunk";

// 生成一个saga中间件
const sagaMiddleware = createSagaMiddleware();

// 使用浏览器 redux-devtools 插件
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    // 使用 redux-thunk 中间件
    // applyMiddleware(thunk)

    // 使用 redux-saga 中间件
    applyMiddleware(sagaMiddleware)
);

// 创建store 必须要有reducer
const store = createStore(
    reducer,
    // 使用thunk 中间件
    enhancer
);

// 启动 saga
sagaMiddleware.run(todoSagas);

export default store;