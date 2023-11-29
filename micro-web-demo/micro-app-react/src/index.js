import React from 'react'
import ReactDOM from 'react-dom/client'
import './public-path'
import './index.css'
import App from './App'

let root = null
function render(props) {
  const { container } = props
  root = ReactDOM.createRoot(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  )
  root.render(<App />)
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped')
}

export async function mount(props) {
  console.log('[react16] props from main framework', props)
  render(props)
}

export async function unmount(props) {
  // 卸载，qiankun 文档不适应于新版
  root.unmount()
}
