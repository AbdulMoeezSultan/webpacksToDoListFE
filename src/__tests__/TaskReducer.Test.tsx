import { taskReducer, Action } from '../Reducers/TaskReducer'
import Task from '../Types/Tasks'

const initialTasks: Task[] = [
  { id: 0, myTask: 'Task 1', status: false },
  { id: 1, myTask: 'Task 2', status: true },
]

describe('taskReducer', () => {
  test('SET_TASK', () => {
    const newTasks: Task[] = [{ id: 2, myTask: 'New Task', status: false }]
    const action: Action = { type: 'SET_TASK', payload: newTasks }

    const result = taskReducer(initialTasks, action)
    expect(result).toEqual(newTasks)
  })

  test('ADD_TASK', () => {
    const newTask: Task = { id: 3, myTask: 'Added Task', status: false }
    const action: Action = { type: 'ADD_TASK', payload: newTask }

    const result = taskReducer(initialTasks, action)
    expect(result).toEqual([...initialTasks, newTask])
  })

  test('TOGGLE_TASK', () => {
    const action: Action = { type: 'TOGGLE_TASK', id: 0 }

    const result = taskReducer(initialTasks, action)
    expect(result[0].status).toBe(true)
  })

  test('UPDATE_TASK', () => {
    const updatedTask: Task = { id: 0, myTask: 'Updated Task 1', status: false }
    const action: Action = {
      type: 'UPDATE_TASK',
      payload: updatedTask,
    }

    const result = taskReducer(initialTasks, action)
    expect(result[0].myTask).toBe('Updated Task 1')
  })

  test('DELETE_TASK', () => {
    const action: Action = { type: 'DELETE_TASK', id: 1 }

    const result = taskReducer(initialTasks, action)
    expect(result).toHaveLength(1)
    expect(result[0].myTask).toBe('Task 1')
  })

  test('Fake_Task_Action', () => {
    const action: Action = { type: 'HEHE_TASK', index: 1 } as unknown as Action

    const result = taskReducer(initialTasks, action)
    expect(result).toBe(initialTasks)
  })
})
