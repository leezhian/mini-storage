import create from 'zustand'
import { persist } from 'zustand/middleware' // 持久化中间件
import { unstable_batchedUpdates } from 'react-dom'
import { fetchInsert } from '@/api/todo'

export const useStore = create(
  // persist 持久化中间件，实时存储到 localstorage
  // persist(
  (set, get) => ({
    todoList: [
      {
        date: 1671523153045,
        content: '起床刷牙',
      },
      {
        date: 1671523153046,
        content: '去旅游',
      },
    ],
    insert: async (content) => {
      // 异步 action， zustand 不关心 action 是否是异步，只需要在想要的时刻修改数据即可
      const todo = {
        date: Date.now(),
        content,
      }
      await fetchInsert()
      // 默认 zustand 是进行合并操作，因此无需传入未修改的state
      set((state) => ({ todoList: [todo, ...state.todoList] }))
    },
    delete: (key) => {
      // 读取外部 状态
      const prevTodoList = get().todoList
      const targetIndex = prevTodoList.findIndex((todo) => todo.date === key)
      if (targetIndex < 0) return
      prevTodoList.splice(targetIndex, 1)
      set({ todoList: [...prevTodoList] })
    },
    // set 函数第二个参数，默认为 false，当为 true 时则是覆盖状态，而不是合并
    destoryApp: () => set({}, true),
  }),
  //   {
  //     name: 'TODOLIST',
  //     getStore: () => localStorage,
  //   },
  // ),
)

// 监听 useStore 所有变化
const unsub = useStore.subscribe(function () {
  console.log('监听 useStore 被触发了')
  console.log(useStore.getState())
})

// 外部文件修改 store，比如在没有 react 的场景下
export const externalInsert = async (content) => {
  // 第一种方法
  // 获取最新的count
  const prevTodoList = useStore.getState().todoList
  const todo = {
    date: Date.now(),
    content,
  }

  await fetchInsert()
  // 它是合并操作因此无需展开符，并且触发监听器
  useStore.setState({
    todoList: [todo, ...prevTodoList],
  })

  // 第二种方法，直接调用 store 的handler
  // unstable_batchedUpdates包来解决zombie-child 效应的风险
  // unstable_batchedUpdates(async () => {
  //   await useStore.getState().insert(content)
  // })
}

export const unSubscribeCount = () => {
  // 取消订阅
  unsub()
}
