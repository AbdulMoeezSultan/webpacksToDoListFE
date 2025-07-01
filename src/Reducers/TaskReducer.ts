import Task from '../Types/Tasks'

export type Action =
  | { type: 'SET_TASK'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; id: number }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; id: number }

export const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'SET_TASK':
      return action.payload
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.id ? { ...task, status: !task.status } : task,
      )
    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, myTask: action.payload.myTask }
          : task,
      )
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.id)
    default:
      return state
  }
}
