/*
 * @Author: kim
 * @Date: 2022-05-31 23:52:04
 * @Description: 
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActicleTable from '../components/Home/Table'
import ActicleModal from '../components/Home/Modal'
import { tableActions, modalActions } from './HomeRedux'

const ActicleCRUD = (props) => {
  return <div className='page'>
    <button onClick={props.modalActions.showModal}>新增文章</button>
    <ActicleModal {...props.modal} {...props.modalActions} />
    <ActicleTable {...props.table} {...props.tableActions} />
  </div>
}

export default connect(state => ({
  table: state.articles.table,
  modal: state.articles.modal
}), dispatch => ({
  tableActions: bindActionCreators(tableActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
}))(ActicleCRUD)