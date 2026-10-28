import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cluster } from '../layout/Cluster';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { Icon } from './Icon';
import { icons, type IconName } from './icons';

const meta = {
  title: 'Actions/Icon',
  component: Icon,
  args: { name: 'laptop', size: 'md' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};

export const Labelled: Story = {
  args: { name: 'wrench', label: 'In repair' },
};

export const Sizes: Story = {
  render: () => (
    <Cluster gap="lg" align="start">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Stack key={size} gap="xs" align="center">
          <Icon name="smartphone" size={size} />
          <Text variant="muted">{size}</Text>
        </Stack>
      ))}
    </Cluster>
  ),
};

export const Catalog: Story = {
  render: () => (
    <Cluster gap="lg">
      {(Object.keys(icons) as IconName[]).map((name) => (
        <Stack key={name} gap="xs" align="center">
          <Icon name={name} size="lg" />
          <Text variant="muted">{name}</Text>
        </Stack>
      ))}
    </Cluster>
  ),
};
