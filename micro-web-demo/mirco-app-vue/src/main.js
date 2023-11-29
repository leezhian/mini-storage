import { createApp } from 'vue'
import './public-path'
import App from './App.vue'

// import VueRouter from 'vue-router'
// import routes from './router'
// import store from './store'

// Vue.config.productionTip = false

// let router = null
let instance = null
function render(props = {}) {
  const { container } = props
  // router = new VueRouter({
  //   base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
  //   mode: 'history',
  //   routes,
  // });
  instance = createApp(App)
  instance.mount(
    container ? container.querySelector('#app') : '#app'
  )
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount() {
  // 卸载，qiankun 文档不适应于新版
  instance.unmount()
  // qiankun 文档使用的是 $el, 因为 vue3 改了创建应用的方法，因此不能使用 $el
  instance._container.innerHTML = ''
  instance = null
  // router = null
}
