import type { Meta, StoryObj } from '@storybook/react-webpack5'

import ToDoInput from './ToDoInput'

const meta = {
  component: ToDoInput,
} satisfies Meta<typeof ToDoInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    dispatch: () => {},
    setToggler: () => {},
    tasks: [],
  },
};
