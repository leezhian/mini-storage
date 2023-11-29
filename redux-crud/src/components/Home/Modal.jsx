/*
 * @Author: kim
 * @Date: 2022-06-04 22:33:46
 * @Description:
 */
import React from 'react'
import { Modal } from 'antd'
import { createForm } from 'redux-form-utils'
import formConfig from './Modal.config'

const ArticleModal = (props) => {
  const { title, desc, date } = props.fields
  return (
    <Modal visible={props.visible} onOk={props.addArticle} onCancel={props.hideModal}>
      <div className='form'>
        <div className='control-group'>
          <label>标题</label>
          <input type='text' {...title}></input>
        </div>
        <div className='control-group'>
          <label>描述</label>
          <textarea {...desc} />
        </div>
        <div className='control-group'>
          <label>发布日期</label>
          <input type='date' {...date}></input>
        </div>
      </div>
    </Modal>
  )
}

export default createForm(formConfig)(ArticleModal)