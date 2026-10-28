import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../text/Text';
import { Grid } from './Grid';
import { Stack } from './Stack';

const fields = [
  ['Serial number', 'PF4K2X9A'],
  ['Category', 'Laptop'],
  ['Location', 'Warsaw office, room 2.14'],
  ['Purchased', '14.03.2026'],
  ['Warranty until', '14.03.2029'],
  ['Status', 'Issued'],
] as const;

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  args: {
    columns: 3,
    gap: 'md',
    children: fields.map(([label, value]) => (
      <Stack key={label} gap="xs">
        <Text variant="muted">{label}</Text>
        <Text>{value}</Text>
      </Stack>
    )),
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {};

export const TwoColumns: Story = { args: { columns: 2 } };

export const FourColumns: Story = { args: { columns: 4 } };
