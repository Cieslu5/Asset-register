import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../text/Text';
import { Cluster } from './Cluster';

const meta = {
  title: 'Layout/Cluster',
  component: Cluster,
  args: {
    gap: 'sm',
    align: 'center',
    justify: 'start',
    children: ['Laptops', 'Phones', 'Monitors', 'Vehicles', 'Tools', 'Cameras'].map((label) => (
      <Text key={label} as="span">
        {label}
      </Text>
    )),
  },
} satisfies Meta<typeof Cluster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SpaceBetween: Story = {
  args: {
    justify: 'between',
    children: [
      <Text key="count" as="span" variant="muted">
        248 items
      </Text>,
      <Text key="sync" as="span" variant="muted">
        Sorted by name
      </Text>,
    ],
  },
};
