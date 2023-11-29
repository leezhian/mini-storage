// Action types
import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION, GET_INIT_LIST} from './actionTypes'
// import axios from "axios";

// action 创建函数， 返回一个action
// input 输入改变
export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
});

// 点击按钮添加的 action
export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM
});

// 点击item移除的 action
export const getDeleteItemAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index
});

// 初始化数据action（不使用中间件的时候用的）
export const initListAction = (data) => ({
    type: INIT_LIST_ACTION,
    data
});

// react-sage使用：
export const getInitList = () => ({
    type: GET_INIT_LIST
});

// react-thunk使用：
// 当使用react-thunk的时候， action创建函数不仅仅是可以返回一个对象了，还可以是一个函数
// export const getTodoList = () => {
//     // 当返回是函数的时候，会接收到一个dispatch
//     return (dispatch) => {
//         axios.get('http://localhost:3031/list').then((res) => {
//             const data = res.data;
//             const action = initListAction(data);
//             dispatch(action);
//         });
//     }
// };