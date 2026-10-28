import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { Link } from './Link';

const meta = {
  title: 'Actions/Link',
  component: Link,
  args: { href: '#protocol', children: 'PPS/2026/014', variant: 'standalone' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standalone: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="sm">
      <Text>
        Issued on protocol{' '}
        <Link href="#protocol" variant="inline">
          PPS/2026/014
        </Link>{' '}
        together with a charger and a docking station.
      </Text>
      <Link href="#history">Show full history</Link>
      <Link href="#archive" variant="muted">
        Archived equipment
      </Link>
    </Stack>
  ),
};

export const External: Story = {
  args: {
    href: 'https://www.lenovo.com/warranty',
    children: 'Check warranty on lenovo.com',
    external: { newTabLabel: 'opens in a new tab' },
  },
};
