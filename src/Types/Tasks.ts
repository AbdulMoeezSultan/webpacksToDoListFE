class Task {
  id?: number
  myTask: string
  status: boolean

  constructor(myTask: string, status: boolean, id?: number) {
    this.myTask = myTask
    this.status = status
    if (id) this.id = id
  }
}

export default Task
