import {takeEvery, put} from 'redux-saga/effects';
import {GET_INIT_LIST} from './actionTypes';
import {initListAction} from "./actionCreators";
import axios from 'axios';

function* getInitList() {
    try {
        const res = yield axios.get('http://localhost:3031/list');
        // 创建新的 action
        const action = initListAction(res.data);
        // 在 saga 里没有store，但它提供了put来派发action
        yield put(action);
    } catch (e) {
        console.log('list.json 网络请求失败');
    }
}

// generator 函数
function* mySaga() {
    // 当收到对应 action 的时候， 执行对应函数
    yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;