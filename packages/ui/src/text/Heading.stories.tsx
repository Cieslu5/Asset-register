import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../layout/Stack';
import { Heading } from './Heading';

const meta = {
  title: 'Text/Heading',
  component: Heading,
  args: { level: 1, children: 'Equipment' },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <Stack gap="md">
      <Heading level={1}>Equipment</Heading>
      <Heading level={2}>Handover protocol PPS/2026/014</Heading>
      <Heading level={3}>Accessories</Heading>
    </Stack>
  ),
};
