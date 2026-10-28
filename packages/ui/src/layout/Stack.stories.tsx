import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../text/Text';
import { Stack } from './Stack';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    gap: 'md',
    align: 'stretch',
    children: (
      <>
        <Text>ThinkPad T14 Gen 5</Text>
        <Text>iPhone 15, 128 GB</Text>
        <Text>Dell U2723QE monitor</Text>
      </>
    ),
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gaps: Story = {
  render: (args) => (
    <Stack gap="lg">
      {(['xs', 'sm', 'md', 'lg'] as const).map((gap) => (
        <Stack key={gap} gap="xs">
          <Text variant="muted">gap {gap}</Text>
          <Stack {...args} gap={gap} />
        </Stack>
      ))}
    </Stack>
  ),
};
