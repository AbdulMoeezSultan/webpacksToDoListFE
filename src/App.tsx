import { lazy, Suspense, useReducer } from 'react'
import { taskReducer } from './Reducers/TaskReducer'
import Navbar from './Components/Layout/Navbar'
const TodoList = lazy(() => import('./Components/Section/ToDoList/ToDoList'))

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  return (
    <div className="min-h-screen bg-p1 pl-5 pr-5 pt-2 text-p1font">
      <Navbar tasks={tasks} dispatch={dispatch} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center text-4xl font-bold">
            Loading...
          </div>
        }
      >
        <TodoList tasks={tasks} dispatch={dispatch} />
      </Suspense>
    </div>
  )
}

export default App
