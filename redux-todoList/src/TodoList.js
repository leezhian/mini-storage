import React, {Component} from 'react';
// antd 样式
import 'antd/dist/antd.css';
// Redux store
import store from './store/index.js';
// Action creators action的创建函数
import {
    getInputChangeAction,
    getAddItemAction,
    getDeleteItemAction,
    getInitList
} from './store/actionCreators';
// UI组件
import TodoListUI from './TodoListUI';
// axios 请求
// import axios from 'axios';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        // subscribe 注册一个事件监听，每当store中的数据发生变化时都会自动触发。
        store.subscribe(this.handleStoreChange);
    }

    // input 改变事件
    handleInputChange(e) {
        // action的创建函数
        const action = getInputChangeAction(e.target.value);
        store.dispatch(action);
    }

    // 按钮点击事件
    handleBtnClick(e) {
        const action = getAddItemAction();
        // 将action 传到store 内部
        store.dispatch(action);
    }

    handleItemDelete(index) {
        const action = getDeleteItemAction(index);
        // 将action 派发store 内部
        store.dispatch(action);
    }

    // 事件监听函数
    handleStoreChange(e) {
        // 设置当前的state 的数据为store中的数据
        this.setState(store.getState());
    }

    render() {
        return <TodoListUI
            inputValue={this.state.inputValue}
            list={this.state.list}
            handleInputChange={this.handleInputChange}
            handleBtnClick={this.handleBtnClick}
            handleItemDelete={this.handleItemDelete}/>
    }

    componentDidMount() {
        // 不使用 Redux 中间件
        // axios.get('http://localhost:3031/list').then((res) => {
        //     const data = res.data;
        //     const action = initListAction(data);
        //     store.dispatch(action);
        // });


        // redux-thunk 中间件使用：
        // 返回一个函数
        // const action = getTodoList();
        // 当把这个action 派发出去的时候， 函数自动会执行
        // store.dispatch(action);


        // redux-saga 中间件使用：
        const action = getInitList();
        // 当使用 redux-saga 中间件的时候，不仅reducer可以接收到action，saga文件也能接收到action
        store.dispatch(action);
    }
}

export default TodoList