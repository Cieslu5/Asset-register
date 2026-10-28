import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../layout/Stack';
import { Text } from './Text';

const meta = {
  title: 'Text/Text',
  component: Text,
  args: {
    variant: 'body',
    children: 'Issued to Anna Nowak on the handover protocol, returned with a cracked charger.',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="sm">
      <Text variant="body">Body: Issued to Anna Nowak on the handover protocol.</Text>
      <Text variant="small">Small: Last inspection 14.03.2026</Text>
      <Text variant="muted">Muted: No repairs recorded</Text>
      <Text variant="mono">PF4K2X9A</Text>
    </Stack>
  ),
};
