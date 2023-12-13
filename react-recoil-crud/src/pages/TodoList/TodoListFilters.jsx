import { useRecoilState } from 'recoil'
import { todoListFilterState } from '../../recoil/todoList'

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState)

  const updateFilter = ({ target: { value } }) => {
    setFilter(value)
  }

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Upcompleted</option>
      </select>
    </>
  )
}

export default TodoListFilters