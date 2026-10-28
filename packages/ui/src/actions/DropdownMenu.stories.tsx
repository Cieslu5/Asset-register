import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { DropdownMenu } from './DropdownMenu';
import { IconButton } from './IconButton';

const meta = {
  title: 'Actions/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  args: {
    trigger: <IconButton icon="more-horizontal" label="Equipment actions" />,
    entries: [
      { kind: 'item', label: 'Edit', icon: 'pencil', onSelect: fn() },
      { kind: 'item', label: 'Print QR label', icon: 'qr-code', onSelect: fn() },
      { kind: 'item', label: 'Send to repair', icon: 'wrench', onSelect: fn() },
      { kind: 'item', label: 'Duplicate', icon: 'copy', onSelect: fn(), disabled: true },
      { kind: 'separator' },
      { kind: 'item', label: 'Archive', icon: 'archive', onSelect: fn(), danger: true },
    ],
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RowActions: Story = {};

export const WithButtonTrigger: Story = {
  args: {
    align: 'start',
    trigger: <Button icon="download">Export</Button>,
    entries: [
      { kind: 'item', label: 'Excel (.xlsx)', icon: 'file-text', onSelect: fn() },
      { kind: 'item', label: 'CSV', icon: 'file-text', onSelect: fn() },
      { kind: 'item', label: 'QR labels (PDF)', icon: 'printer', onSelect: fn() },
    ],
  },
};
