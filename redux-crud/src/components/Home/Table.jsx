/*
 * @Author: kim
 * @Date: 2022-06-02 00:13:26
 * @Description: 表单
 */
import React, { useEffect } from 'react'
import { Table } from 'antd'

const columns = [{
  title: '标题',
  dataIndex: 'title'
}, {
  title: '描述',
  dataIndex: 'desc'
}, {
  title: '发布日期',
  dataIndex: 'date'
}]

const ActicleTable = (props) => {
  useEffect(() => {
    props.loadArticles()
  }, [])

  return (
    <div className='table'>
      <div className='search'>
        <input
          type='text'
          placeholder='请输入关键字'
          value={props.query}
          onChange={props.changeQuery}
        />
        <button onClick={props.search}>搜索</button>
      </div>
      <Table columns={columns} dataSource={props.articles} rowKey={(record) => record.id} />
    </div>
  )
}

export default ActicleTable