
import { useState, useCallback } from 'react'
import { Input, Button, List, message } from 'antd'
import shallow from 'zustand/shallow'
import { useStore, externalInsert } from '@/demo'
import './App.css'

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const [todoContent, setTodoContent] = useState('')
  const [insertLoading, setInsertLoading] = useState(false)
  // 多状态，shallow 是比较函数（浅层diff）
  // 也可以使用单状态，默认是严格检查 old === new
  // 如 const todoList = useStore(state => state.todoList)
  const [todoList, insertTodo, delTodo, destoryApp] = useStore((state) => [state.todoList, state.insert, state.delete, state.destoryApp], shallow)

  // 文本修改
  const handleContentChange = useCallback((e) => {
    const { value } = e.target
    setTodoContent(value)
  }, [])

  // 插入 TODO
  const insertFn = {
    hooks: insertTodo,
    external: externalInsert
  }

  const handleInsertTodo = useCallback(async (mode = 'hooks') => {
    try {
      if(insertLoading) return
      if (!todoContent || todoContent.trim() === '') {
        messageApi.error('todo 内容不许为空！')
        return
      }
      setInsertLoading(true)
      await insertFn[mode](todoContent)
      setTodoContent('')
    } catch (error) {
      console.error(error)
    } finally {
      setInsertLoading(false)
    }
  }, [todoContent, insertLoading])

  // 删除 TODO
  const handleDeleteTodo = useCallback((todo) => {
    delTodo(todo.date)
  }, [])

  return (
    <div className='app-container'>
      {contextHolder}
      <div className='app-form'>
        <Input.Group className='app-form-item' compact>
          <Input className='insert-input' placeholder="添加 todo" value={todoContent} onChange={handleContentChange} />
          <Button type="primary" loading={insertLoading} onClick={() => handleInsertTodo('hooks')}>添加 todo</Button>
        </Input.Group>
        <Button className='app-form-btn' loading={insertLoading} onClick={() => handleInsertTodo('external')}>外部函数添加 todo</Button>
        <Button className='app-form-btn' type='primary' danger onClick={destoryApp}>删除 store</Button>
      </div>

      <List
        bordered
        dataSource={todoList}
        renderItem={(item) => (
          <List.Item key={item.date} actions={[<Button size='small' danger onClick={() => handleDeleteTodo(item)}>删除</Button>]}>
            {item.content}
          </List.Item>
        )}
      />
    </div>
  )
}

export default App
