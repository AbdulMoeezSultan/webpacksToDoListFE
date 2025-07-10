import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import ToDoList from '../Components/Section/ToDoList/ToDoList'
import Task from '../Types/Tasks'
import axios from '../API/axios'

jest.mock('../API/axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.useFakeTimers()
const mockDispatch = jest.fn()

describe('ToDoList component', () => {
  beforeEach(() => {
    mockDispatch.mockClear()
    localStorage.clear()
    jest.clearAllTimers()
    mockedAxios.get.mockReset()
    mockedAxios.put.mockReset()
    mockedAxios.delete.mockReset()
  })

  it('displays a loading spinner initially', () => {
    const { container } = render(
      <ToDoList tasks={[]} dispatch={mockDispatch} />,
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/Fetching Data/)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('dispatches SET_TASK action after 5 seconds', async () => {
    const mockTasks: Task[] = [{ id: 0, myTask: 'Test', status: false }]
    mockedAxios.get.mockResolvedValueOnce({
      data: { Tasks: mockTasks },
    })

    const { container } = render(
      <ToDoList tasks={[]} dispatch={mockDispatch} />,
    )
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_TASK',
        payload: mockTasks,
      })
    })
    expect(container).toMatchSnapshot()
  })

  it('shows "No Tasks" image when tasks are empty and loading is false', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { Tasks: [] },
    })

    const { container } = render(
      <ToDoList tasks={[]} dispatch={mockDispatch} />,
    )
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      expect(screen.getByAltText(/No Tasks to do/)).toBeInTheDocument()
    })
    expect(container).toMatchSnapshot()
  })

  it('render tasks when passed as props', async () => {
    const tasks = [{ id: 0, myTask: 'Go for a walk', status: false }]
    mockedAxios.get.mockResolvedValueOnce({ data: { Tasks: [] } })

    const { container } = render(
      <ToDoList tasks={tasks} dispatch={mockDispatch} />,
    )
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      expect(screen.getByText('Go for a walk')).toBeInTheDocument()
    })
    expect(container).toMatchSnapshot()
  })

  it('dispatche TOGGLE_TASK when checkbox is clicked', async () => {
    const tasks = [{ id: 0, myTask: 'Go for a walk', status: false }]
    mockedAxios.get.mockResolvedValueOnce({ data: { Tasks: [] } })
    mockedAxios.put.mockResolvedValueOnce({})

    const { container } = render(
      <ToDoList tasks={tasks} dispatch={mockDispatch} />,
    )
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      expect(screen.getByText('Go for a walk')).toBeInTheDocument()
    })

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_TASK',
      id: 0,
    })
    expect(mockedAxios.put).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })

  it('dispatche DELETE_TASK when trash icon is clicked', async () => {
    const tasks = [{ id: 0, myTask: 'Go for a walk', status: false }]
    mockedAxios.get.mockResolvedValueOnce({ data: { Tasks: [] } })
    mockedAxios.delete.mockResolvedValueOnce({})

    const { container } = render(
      <ToDoList tasks={tasks} dispatch={mockDispatch} />,
    )
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      expect(screen.getByText('Go for a walk')).toBeInTheDocument()
    })

    const trashButton = screen.getByRole('button', { name: 'Task Delete' })
    fireEvent.click(trashButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'DELETE_TASK', id: 0 })
    expect(mockedAxios.delete).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })

  it('enable task to get update', async () => {
    const tasks = [{ id: 0, myTask: 'Go for a walk', status: false }]
    mockedAxios.get.mockResolvedValueOnce({ data: { Tasks: [] } })
    mockedAxios.put.mockResolvedValueOnce({})

    const { container } = render(
      <ToDoList tasks={tasks} dispatch={mockDispatch} />,
    )
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      expect(screen.getByText('Go for a walk')).toBeInTheDocument()
    })
    const editIcon = screen.getByRole('button', { name: 'Task Update' })
    fireEvent.click(editIcon)

    await waitFor(() => {
      expect(screen.getByLabelText('Update Task')).toBeInTheDocument()
    })

    const input = screen.getByLabelText('Update Task')
    fireEvent.change(input, { target: { value: 'Go for a long walk' } })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TASK',
      payload: {
        id: 0,
        myTask: 'Go for a long walk',
        status: false,
      },
    })
    expect(mockedAxios.put).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })

  it('disable the update button when clicking edit icon again', async () => {
    const tasks = [{ myTask: 'Go for a walk', status: false }]
    mockedAxios.get.mockResolvedValueOnce({ data: { Tasks: [] } })

    const { container } = render(
      <ToDoList tasks={tasks} dispatch={mockDispatch} />,
    )

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      expect(screen.getByText('Go for a walk')).toBeInTheDocument()
    })

    const editButton = screen.getByRole('button', { name: 'Task Update' })
    fireEvent.click(editButton)

    await waitFor(() => {
      expect(screen.getByLabelText('Update Task')).toBeInTheDocument()
    })

    fireEvent.click(editButton)

    await waitFor(() => {
      expect(screen.queryByLabelText('Update Task')).not.toBeInTheDocument()
    })
    expect(container).toMatchSnapshot()
  })
})
