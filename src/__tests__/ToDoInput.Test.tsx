import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ToDoInput from '../Components/Section/ToDoList/ToDoInput'
import Task from '../Types/Tasks'
import axios from '../API/axios'

jest.mock('../API/axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

type PrimaryButtonProps = {
  name: string
  myFunction: () => void
}

jest.mock('../Components/Ui/Button/PrimaryButton', () => {
  const MockPrimaryButton = ({ name, myFunction }: PrimaryButtonProps) => (
    <button onClick={myFunction}>{name}</button>
  )
  MockPrimaryButton.displayName = 'MockPrimaryButton'
  return MockPrimaryButton
})

const mockDispatch = jest.fn()
const mockSetToggler = jest.fn()
const mockTasks: Task[] = [
  { id: 1, myTask: 'Buy milk', status: false },
  { id: 2, myTask: 'Walk dog', status: true },
]

const renderComponent = (customTasks = mockTasks) => {
  render(
    <ToDoInput
      tasks={customTasks}
      dispatch={mockDispatch}
      setToggler={mockSetToggler}
    />,
  )
}

afterEach(() => {
  jest.clearAllMocks()
})

describe('ToDoInput Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <ToDoInput
        tasks={mockTasks}
        dispatch={mockDispatch}
        setToggler={mockSetToggler}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('checking that the input fields are there', () => {
    renderComponent()
    expect(screen.getByLabelText(/Task:/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Task Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Status:/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Add Task/i }),
    ).toBeInTheDocument()
  })

  test('adds task when input is filled', async () => {
    renderComponent()

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: [{ create_task: 3 }],
      },
    })

    const textarea = screen.getByPlaceholderText(/Task Description/i)
    const checkbox = screen.getByLabelText(/Status:/i)
    const addButton = screen.getByRole('button', { name: /Add Task/i })

    fireEvent.change(textarea, { target: { value: 'Write tests' } })
    fireEvent.click(checkbox)
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_TASK',
        payload: { id: 3, myTask: 'Write tests', status: true },
      })
    })

    expect(mockSetToggler).toHaveBeenCalledWith(false)
  })

  test('does not dispatch if input is empty', () => {
    renderComponent()

    const addButton = screen.getByRole('button', { name: /Add Task/i })
    fireEvent.click(addButton)

    expect(mockDispatch).not.toHaveBeenCalled()
    expect(mockSetToggler).not.toHaveBeenCalled()
  })

  test('does not dispatch if task already exists', () => {
    const existingTasks = [{ id: 1, myTask: 'Test Task', status: false }]
    renderComponent(existingTasks)

    const textarea = screen.getByPlaceholderText(/Task Description/i)
    const checkbox = screen.getByLabelText(/Status:/i)
    const addButton = screen.getByRole('button', { name: /Add Task/i })

    fireEvent.change(textarea, { target: { value: 'Test Task' } })
    fireEvent.click(checkbox)
    fireEvent.click(addButton)

    expect(mockDispatch).not.toHaveBeenCalled()
    expect(mockSetToggler).not.toHaveBeenCalled()
  })
})
