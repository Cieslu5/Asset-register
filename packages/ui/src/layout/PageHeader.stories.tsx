import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  args: { title: 'Equipment' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { description: 'Laptops, phones, vehicles and tools registered in the company.' },
};

export const TitleOnly: Story = {
  args: { title: 'Handover protocol PPS/2026/014' },
};

export const LongTitle: Story = {
  args: {
    title: 'Toyota Proace City Verso, WGM 4821K, service and insurance history',
    description: 'Company car assigned to the Kraków branch.',
  },
};
