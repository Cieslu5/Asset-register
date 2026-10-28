import type { Meta, StoryObj } from '@storybook/react-vite';
import { Laptop, Smartphone, Wrench } from 'lucide-react';
import { Cluster } from '../layout/Cluster';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { Icon } from './Icon';

const meta = {
  title: 'Actions/Icon',
  component: Icon,
  args: { icon: Laptop, size: 'md' },
  argTypes: { icon: { control: false } },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};

export const Labelled: Story = {
  args: { icon: Wrench, label: 'In repair' },
};

export const Sizes: Story = {
  render: () => (
    <Cluster gap="lg" align="start">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Stack key={size} gap="xs" align="center">
          <Icon icon={Smartphone} size={size} />
          <Text variant="muted">{size}</Text>
        </Stack>
      ))}
    </Cluster>
  ),
};
