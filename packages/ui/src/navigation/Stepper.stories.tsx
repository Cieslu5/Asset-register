import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stepper } from './Stepper';

const steps = [
  { key: 'basic', label: 'Basic data', icon: 'info', complete: true },
  { key: 'identity', label: 'Identification', icon: 'qr-code', invalid: true },
  { key: 'purchase', label: 'Purchase', icon: 'receipt' },
  { key: 'handover', label: 'Handover', icon: 'handshake' },
] as const;

const meta = {
  title: 'Navigation/Stepper',
  component: Stepper,
  args: { steps: [...steps], current: 2, onSelect: () => undefined, label: 'Form steps' },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: function Render(args) {
    const [current, setCurrent] = useState(args.current);
    return <Stepper {...args} current={current} onSelect={setCurrent} />;
  },
};

export const Horizontal: Story = {
  render: function Render(args) {
    const [current, setCurrent] = useState(args.current);
    return <Stepper {...args} orientation="horizontal" current={current} onSelect={setCurrent} />;
  },
};
