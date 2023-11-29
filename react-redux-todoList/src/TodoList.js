import React from "react";
import {connect} from "react-redux";
// ui 组件
import TodoListUI from "./TodoListUI";
// 引入action creator
import {getInputChangeAction, getAddItemAction, getDeleteItemAction} from "./store/actionCreators";

// 把 store 里的state数据，映射为组件 props 的数据
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
};

// store.dispatch 挂载到 props
const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            const action = getInputChangeAction(e.target.value);
            dispatch(action);
        },
        handleClick(e) {
            const action = getAddItemAction();
            dispatch(action);
        },
        handleDelete(index) {
            const action = getDeleteItemAction(index);
            dispatch(action);
        }
    }
};

// connect 用组件与 store 做连接, 实际 connect 返回导出的组件就为容器组件
export default connect(mapStateToProps, mapDispatchToProps)(TodoListUI);