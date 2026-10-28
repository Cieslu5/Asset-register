import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../actions/Button';
import { Cluster } from '../layout/Cluster';
import { Stack } from '../layout/Stack';
import { EmptyState } from './EmptyState';
import { Skeleton } from './Skeleton';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Data/Status and placeholders',
  component: StatusBadge,
  args: { label: 'Issued', tone: 'info' },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Badge: Story = {};

export const BadgeTones: Story = {
  render: () => (
    <Cluster gap="sm">
      <StatusBadge label="Available" tone="success" />
      <StatusBadge label="Issued" tone="info" />
      <StatusBadge label="Inspection due in 5 days" tone="warning" />
      <StatusBadge label="Do not use" tone="danger" />
      <StatusBadge label="Retired" tone="neutral" />
    </Cluster>
  ),
};

export const Empty: Story = {
  render: () => (
    <Stack gap="lg">
      <EmptyState
        icon="search-x"
        title="No equipment matches these filters"
        description="Try a different status or category, or search by serial number."
        action={<Button icon="x">Clear filters</Button>}
      />
      <EmptyState
        icon="inbox"
        title="No repairs yet"
        description="Repairs you send from an equipment card appear here with their stages."
      />
    </Stack>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="max-w-md">
      <Stack gap="md">
        <Cluster gap="sm">
          <Skeleton shape="circle" />
          <div className="flex-1">
            <Skeleton />
          </div>
        </Cluster>
        <Skeleton lines={3} />
        <Skeleton shape="block" />
      </Stack>
    </div>
  ),
};
