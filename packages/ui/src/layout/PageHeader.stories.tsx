import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../actions/Button';
import { DropdownMenu } from '../actions/DropdownMenu';
import { IconButton } from '../actions/IconButton';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  args: { title: 'Equipment' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: 'Laptops, phones, vehicles and tools registered in the company.',
    actions: (
      <>
        <Button icon="upload">Import</Button>
        <Button variant="primary" icon="plus">
          Add equipment
        </Button>
      </>
    ),
  },
};

export const TitleOnly: Story = {
  args: { title: 'Handover protocol PPS/2026/014' },
};

export const LongTitle: Story = {
  args: {
    title: 'Toyota Proace City Verso, WGM 4821K, service and insurance history',
    description: 'Company car assigned to the Kraków branch.',
    actions: (
      <>
        <Button icon="wrench">Send to repair</Button>
        <DropdownMenu
          trigger={<IconButton icon="more-horizontal" label="More actions" variant="secondary" />}
          entries={[
            { kind: 'item', label: 'Print QR label', icon: 'qr-code', onSelect: fn() },
            { kind: 'separator' },
            { kind: 'item', label: 'Archive', icon: 'archive', onSelect: fn(), danger: true },
          ]}
        />
      </>
    ),
  },
};
