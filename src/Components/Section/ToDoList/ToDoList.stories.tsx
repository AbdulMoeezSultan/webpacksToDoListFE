import type { Meta, StoryObj } from '@storybook/react-webpack5'

import ToDoList from './ToDoList'

const meta = {
  component: ToDoList,
} satisfies Meta<typeof ToDoList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    dispatch: () => {},
    tasks: [
      {
        id: 345464,
        myTask: "A task for story 1",
        status: true
      },
      {
        id: 4,
        myTask: "A task for story 2",
        status: false
      },
      {
        id: 46544,
        myTask: "A task for story 3",
        status: false
      },
    ],
  },
}
