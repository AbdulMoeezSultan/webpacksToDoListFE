import type { Meta, StoryObj } from '@storybook/react-webpack5';

import PrimaryButton from './PrimaryButton';

const meta = {
  component: PrimaryButton,
} satisfies Meta<typeof PrimaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};