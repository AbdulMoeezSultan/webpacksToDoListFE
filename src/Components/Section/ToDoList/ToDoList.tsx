import axios from '../../../API/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useSetTask from '../../../Hooks/useSetTask'
import { faTrashCan, faPenFancy } from '@fortawesome/free-solid-svg-icons'
import Task from '../../../Types/Tasks'
import NoTasks from '../../../Assets/NoTasks.webp'
import { Action } from '../../../Reducers/TaskReducer'

type PropsType = {
  tasks: Task[]
  dispatch: React.Dispatch<Action>
}

const ToDoList = ({ tasks, dispatch }: PropsType) => {
  const { isLoading, isUpdating, setIsUpdating } = useSetTask(dispatch)

  const updateTask = async (myTask: string, status: boolean, id: number) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        myTask,
        status,
        id,
      },
    })
    await axios.put(`/api/updateTask/${id}`, { myTask })
  }

  const updateStatus = async (status: boolean, id: number) => {
    dispatch({ type: 'TOGGLE_TASK', id })
    await axios.put(`/api/updateCompletion/${id}`, { status })
  }

  const toggleUpdateTask = (taskIndex: number) => {
    return isUpdating !== taskIndex
      ? setIsUpdating(taskIndex)
      : setIsUpdating(null)
  }

  const deleteTask = async (id: number) => {
    dispatch({ type: 'DELETE_TASK', id })
    await axios.delete(`/api/delete/${id}`)
  }

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div
          role="status"
          className="flex justify-center items-center gap-5 text-4xl font-bold"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#979696] border-4"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span>Fetching Data</span>
        </div>
      ) : (
        <>
          {tasks.length > 0 ? (
            <div className="flex flex-col flex-wrap gap-5 justify-center items-center">
              {tasks.map((t) => (
                <div
                  className="flex justify-between items-center w-[95%] lg:w-[75%] border border-bordercolor p-5 text-3xl rounded-xl"
                  key={t.id}
                >
                  <div
                    className={`mr-10 lg:mr-7 text-justify break-all ${t.status ? 'line-through' : 'no-underline'}`}
                  >
                    {isUpdating !== t.id ? (
                      t.myTask
                    ) : (
                      <>
                        <label htmlFor={`update${t.id}`} className="sr-only">
                          Update Task
                        </label>
                        <input
                          type="input"
                          id={`update${t.id}`}
                          className="bg-secondary rounded-2xl pl-2 p-1 w-[100%]"
                          value={t.myTask}
                          onChange={(e) => {
                            updateTask(e.target.value, t.status, t.id!)
                          }}
                        />
                      </>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <div className="flex ">
                      <label htmlFor={`status${t.id}`} className="sr-only">
                        Status
                      </label>
                      <input
                        type="checkbox"
                        id={`status${t.id}`}
                        checked={t.status}
                        onChange={(e) => {
                          updateStatus(e.target.checked, t.id!)
                        }}
                        className="size-8"
                      />
                    </div>
                    <div
                      className="cursor-pointer no-underline"
                      role="button"
                      aria-label="Task Update"
                      onClick={() => {
                        toggleUpdateTask(t.id!)
                      }}
                    >
                      <FontAwesomeIcon icon={faPenFancy} />
                    </div>
                    <div
                      role="button"
                      aria-label="Task Delete"
                      className="cursor-pointer no-underline"
                      onClick={() => {
                        deleteTask(t.id!)
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <img src={NoTasks} alt="No Tasks to do" />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ToDoList
