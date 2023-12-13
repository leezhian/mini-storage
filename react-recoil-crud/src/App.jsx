import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import TodoList from './pages/TodoList'
import UserInfo from './pages/UserInfo'
import Demo from './pages/Demo'

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>加载中...</div>}>
        <TodoList />
        <UserInfo />
      </Suspense>
      <RecoilRoot override={false}>
        <Demo />
      </RecoilRoot>
    </RecoilRoot>
  )
}

export default App
