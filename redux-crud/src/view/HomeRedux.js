/*
 * @Author: kim
 * @Date: 2022-06-03 20:48:01
 * @Description: 
 */
import { combineReducers } from 'redux'
import table from '../components/Home/TableRedux'
import modal from '../components/Home/ModalRedux'

export default combineReducers({
  table,
  modal
})

export * as tableActions from '../components/Home/TableRedux'
export * as modalActions from '../components/Home/ModalRedux'
