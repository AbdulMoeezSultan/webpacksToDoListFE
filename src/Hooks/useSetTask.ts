import { useState, useEffect } from 'react'
import { Action } from '../Reducers/TaskReducer'
import axios from '../API/axios'
import Task from '../Types/Tasks'

const useSetTask = (dispatch: React.Dispatch<Action>) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/get')
        const savedTasks: Task[] = response.data.Tasks

        if (savedTasks.length > 0) {
          dispatch({ type: 'SET_TASK', payload: savedTasks })
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchTasks, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  return { isLoading, isUpdating, setIsUpdating }
}

export default useSetTask
