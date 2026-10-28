import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../text/Text';
import { Cluster } from './Cluster';
import { Divider } from './Divider';
import { Stack } from './Stack';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <Stack gap="md">
      <Text>Issued to Anna Nowak</Text>
      <Divider />
      <Text>Returned on 02.09.2026</Text>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Cluster gap="md">
      <Text as="span">PF4K2X9A</Text>
      <Divider orientation="vertical" />
      <Text as="span">Laptop</Text>
      <Divider orientation="vertical" />
      <Text as="span">Warsaw office</Text>
    </Cluster>
  ),
};
