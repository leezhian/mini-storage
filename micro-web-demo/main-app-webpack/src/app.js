import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerMicroApps, start } from 'qiankun'
import routes from './routes/index'

registerMicroApps([
  {
    name: 'reactApp', // 应用名
    entry: '//localhost:3000', // 微应用入口
    container: '#root', // 容器节点
    activeRule: '/app1', // 激活规则
  },
  {
    name: 'vueApp',
    entry: '//localhost:8080',
    container: '#root',
    activeRule: '/app2',
  },
])
// 启动 qiankun
start();

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(routes)