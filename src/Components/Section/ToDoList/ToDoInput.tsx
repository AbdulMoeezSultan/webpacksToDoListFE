import { useState } from 'react'
import Task from '../../../Types/Tasks'
import axios from '../../../API/axios'
import PrimaryButton from '../../Ui/Button/PrimaryButton'
import { Action } from '../../../Reducers/TaskReducer'

type PropsType = {
  dispatch: React.Dispatch<Action>
  setToggler: React.Dispatch<React.SetStateAction<boolean>>
  tasks: Task[]
}

const ToDoInput = ({ tasks, dispatch, setToggler }: PropsType) => {
  const [newTask, setNewTask] = useState<Task>({ myTask: '', status: false })
  const [inputError, setInputError] = useState({ message: '', status: false })

  const addTask = async () => {
    const trimmedInput = newTask.myTask.trim()
    if (!trimmedInput) {
      console.log('Task is empty after trimming')
      setInputError({ message: 'Task field empty', status: true })
      return
    }
    const savedTasks: Task[] = tasks
    const isDuplicate = savedTasks.some(
      (task) => task.myTask.trim().toLowerCase() === trimmedInput.toLowerCase(),
    )
    if (isDuplicate) {
      console.log('Task is already in the list')
      setInputError({ message: 'Task already exist', status: true })
      return
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
    await axios.post('/api/insert', {
      myTask: newTask.myTask,
      status: newTask.status,
    })
    setNewTask({ myTask: '', status: false })
    setInputError({ message: '', status: false })
    setToggler(false)
  }

  return (
    <div className="flex flex-col border rounded-xl p-5 gap-2">
      <label htmlFor="task" className="text-2xl">
        Task:
      </label>
      <textarea
        id="task"
        className="h-28 rounded-xl p-1 bg-secondary placeholder-white placeholder: text-xl"
        placeholder="Task Description"
        onChange={(e) => setNewTask({ ...newTask, myTask: e.target.value })}
        value={newTask?.myTask}
        required
      />
      {inputError.status === true && (
        <p className="text-black font-bold text-xl">* {inputError.message}</p>
      )}
      <div className="flex gap-6 ">
        <label htmlFor="status" className="text-2xl">
          Status:
        </label>
        <input
          id="status"
          className="w-6 bg-secondary"
          type="checkbox"
          checked={newTask?.status}
          onChange={(e) => {
            setNewTask({ ...newTask, status: e.target.checked })
          }}
        />
      </div>
      <div className="flex justify-center">
        <PrimaryButton name={'Add Task'} myFunction={addTask} />
      </div>
    </div>
  )
}

export default ToDoInput
