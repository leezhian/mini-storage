/*
 * @Author: kim
 * @Date: 2022-05-31 23:18:27
 * @Description: 入口文件
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'
import route from './routes/index'
import 'antd/dist/antd.css';

const store = configureStore()
const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<Provider store={store}>{route}</Provider>)
