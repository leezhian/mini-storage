import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList.js';
// 使用react-redux
import {Provider} from 'react-redux';
// 引入store
import store from "./store/index";

const App = (
    // Provider 提供器，用于连接store，其内部组件就可以获取store数据（利用connect）
    <Provider store={store}>
        <TodoList/>
    </Provider>
);

ReactDOM.render(App, document.getElementById('root'));