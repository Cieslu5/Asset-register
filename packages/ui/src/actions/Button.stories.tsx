import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cluster } from '../layout/Cluster';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { Button } from './Button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: { children: 'Issue equipment', variant: 'primary', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithIcon: Story = { args: { icon: 'plus', children: 'Add equipment' } };

export const Variants: Story = {
  render: () => (
    <Cluster gap="sm">
      <Button variant="primary">Issue equipment</Button>
      <Button variant="secondary">Export</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger" icon="trash">
        Delete protocol
      </Button>
    </Cluster>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Cluster gap="sm">
      <Button size="sm" icon="printer">
        Print
      </Button>
      <Button size="md" icon="printer">
        Print
      </Button>
    </Cluster>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="md">
      {(['primary', 'secondary', 'danger'] as const).map((variant) => (
        <Stack key={variant} gap="xs">
          <Text variant="muted">{variant}</Text>
          <Cluster gap="sm">
            <Button variant={variant}>Save</Button>
            <Button variant={variant} loading>
              Saving
            </Button>
            <Button variant={variant} disabled>
              Save
            </Button>
          </Cluster>
        </Stack>
      ))}
    </Stack>
  ),
};

export const AsLink: Story = {
  args: { href: '#new', icon: 'plus', children: 'Add equipment' },
};
