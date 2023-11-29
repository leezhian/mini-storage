// action types
import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION} from './actionTypes';

const defaultState = {
    inputValue: '',
    list: []
};

// state 是整个store的数据
// reducer 可以接受state，但绝对不能修改state, 根据不同 action， 返回不同的数据
export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_INPUT_VALUE:
            const newState = JSON.parse(JSON.stringify(state));
            newState.inputValue = action.value;
            return newState;
        case ADD_TODO_ITEM:
            const addState = JSON.parse(JSON.stringify(state));
            addState.list.push(addState.inputValue);
            addState.inputValue = '';
            return addState;
        case DELETE_TODO_ITEM:
            const delState = JSON.parse(JSON.stringify(state));
            delState.list.splice(action.index, 1);
            return delState;
        case INIT_LIST_ACTION:
            const initState = JSON.parse(JSON.stringify(state));
            initState.list = action.data;
            return initState;
        default:
            return state;
    }
}