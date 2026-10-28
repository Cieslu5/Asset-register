import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Grid } from '../layout/Grid';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { Checkbox } from './Checkbox';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';
import { Switch } from './Switch';

const meta = {
  title: 'Forms/Choices',
  component: Select,
  args: { value: null, onChange: () => undefined, options: [] },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'phone', label: 'Phone' },
  { value: 'monitor', label: 'Monitor' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'tool', label: 'Tool' },
];

export const Select_: Story = {
  name: 'Select',
  render: function Render() {
    const [category, setCategory] = useState<string | null>(null);
    return (
      <Grid columns={3}>
        <Stack gap="xs">
          <Text variant="muted">Empty</Text>
          <Select
            value={category}
            onChange={setCategory}
            options={categories}
            placeholder="Choose a category"
          />
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">Invalid</Text>
          <Select
            value={null}
            onChange={() => undefined}
            options={categories}
            placeholder="Choose a category"
            invalid
          />
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">Disabled</Text>
          <Select value="laptop" onChange={() => undefined} options={categories} disabled />
        </Stack>
      </Grid>
    );
  },
};

export const CheckboxAndSwitch: Story = {
  render: function Render() {
    const [charger, setCharger] = useState(true);
    const [dock, setDock] = useState(false);
    const [reminders, setReminders] = useState(true);
    return (
      <Grid columns={2}>
        <Stack gap="sm">
          <Text variant="muted">Checkbox</Text>
          <Checkbox label="Charger" value={charger} onChange={setCharger} />
          <Checkbox label="Docking station" value={dock} onChange={setDock} />
          <Checkbox
            label="Original box (missing)"
            value={false}
            onChange={() => undefined}
            disabled
          />
        </Stack>
        <Stack gap="sm">
          <Text variant="muted">Switch</Text>
          <Switch
            label="Email reminders before due date"
            value={reminders}
            onChange={setReminders}
          />
          <Switch label="Do not use after due date" value onChange={() => undefined} disabled />
        </Stack>
      </Grid>
    );
  },
};

export const RadioGroup_: Story = {
  name: 'RadioGroup',
  render: function Render() {
    const [condition, setCondition] = useState<string | null>('good');
    return (
      <RadioGroup
        value={condition}
        onChange={setCondition}
        options={[
          { value: 'new', label: 'New', description: 'Unused, in original packaging.' },
          { value: 'good', label: 'Good', description: 'Normal signs of use, fully working.' },
          {
            value: 'damaged',
            label: 'Damaged',
            description: 'Needs repair before the next handover.',
          },
        ]}
      />
    );
  },
};
