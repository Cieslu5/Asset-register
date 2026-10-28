import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cluster } from '../layout/Cluster';
import { IconButton } from './IconButton';

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  args: { icon: 'pencil', label: 'Edit equipment', variant: 'ghost', size: 'md' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};

export const Variants: Story = {
  render: () => (
    <Cluster gap="sm">
      <IconButton icon="pencil" label="Edit" variant="ghost" />
      <IconButton icon="download" label="Download" variant="secondary" />
      <IconButton icon="trash" label="Delete" variant="danger" />
    </Cluster>
  ),
};

export const States: Story = {
  render: () => (
    <Cluster gap="sm">
      <IconButton icon="printer" label="Print" variant="secondary" size="sm" />
      <IconButton icon="printer" label="Print" variant="secondary" />
      <IconButton icon="printer" label="Printing" variant="secondary" loading />
      <IconButton icon="printer" label="Print" variant="secondary" disabled />
    </Cluster>
  ),
};
