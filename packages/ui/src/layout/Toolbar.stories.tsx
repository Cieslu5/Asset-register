import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../actions/Button';
import { DropdownMenu } from '../actions/DropdownMenu';
import { NumberText } from '../text/NumberText';
import { Text } from '../text/Text';
import { Toolbar } from './Toolbar';

const meta = {
  title: 'Layout/Toolbar',
  component: Toolbar,
  args: {
    start: (
      <>
        <Button size="sm" icon="filter">
          Status
        </Button>
        <Button size="sm" icon="filter">
          Category
        </Button>
        <Text as="span" variant="muted">
          <NumberText value={1248} /> items
        </Text>
      </>
    ),
    end: (
      <DropdownMenu
        trigger={
          <Button size="sm" icon="download">
            Export
          </Button>
        }
        entries={[
          { kind: 'item', label: 'Excel (.xlsx)', icon: 'file-text', onSelect: fn() },
          { kind: 'item', label: 'CSV', icon: 'file-text', onSelect: fn() },
        ]}
      />
    ),
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StartOnly: Story = { args: { end: undefined } };
