import { useRecoilValue } from 'recoil'
import TodoListStats from './TodoListStats'
import TodoItemCreator from './TodoItemCreator'
import TodoItem from './TodoItem'
import TodoListFilters from './TodoListFilters'
import { filteredTodoListState } from '../../recoil/todoList'

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState)

  return (<>
    <TodoListStats />
    <TodoListFilters />
    <TodoItemCreator />
    {todoList.map(todoItem => (
      <TodoItem key={todoItem.id} item={todoItem} />
    ))}
  </>)
}

export default TodoList