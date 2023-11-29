export default [
  { 
    path: '/', 
    name: '主页',
    component: '@/layouts/index', 
    routes: [
      {
        name: 'app1',
        path: '/app1',
        component: '@/pages/app1',
        microApp: 'app1'
      },
      {
        name: 'app2',
        path: '/app2',
        microApp: 'app2'
      }
    ] 
  },
]