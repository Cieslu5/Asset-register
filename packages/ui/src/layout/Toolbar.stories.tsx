import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberText } from '../text/NumberText';
import { Text } from '../text/Text';
import { Toolbar } from './Toolbar';

const meta = {
  title: 'Layout/Toolbar',
  component: Toolbar,
  args: {
    start: <Text variant="muted">Filters go here: search, status, category</Text>,
    end: (
      <Text as="span" variant="muted">
        <NumberText value={1248} /> items
      </Text>
    ),
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StartOnly: Story = { args: { end: undefined } };
