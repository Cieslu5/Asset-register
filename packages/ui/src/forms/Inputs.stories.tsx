import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Grid } from '../layout/Grid';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { MoneyInput } from './MoneyInput';
import { NumberInput } from './NumberInput';
import { Textarea } from './Textarea';
import { TextInput } from './TextInput';

const meta = {
  title: 'Forms/Text and number inputs',
  component: TextInput,
  args: { value: '', onChange: () => undefined },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Stack gap="xs">
      <Text variant="muted">{label}</Text>
      {children}
    </Stack>
  );
}

export const Text_: Story = {
  name: 'TextInput',
  render: function Render() {
    const [serial, setSerial] = useState('PF4K2X9A');
    const [search, setSearch] = useState('');
    return (
      <Grid columns={2}>
        <Labelled label="Default">
          <TextInput value={serial} onChange={setSerial} />
        </Labelled>
        <Labelled label="With icon and placeholder">
          <TextInput
            type="search"
            icon="search"
            placeholder="Serial number, name or employee"
            value={search}
            onChange={setSearch}
          />
        </Labelled>
        <Labelled label="Invalid">
          <TextInput value="PF4K" onChange={() => undefined} invalid />
        </Labelled>
        <Labelled label="Disabled">
          <TextInput value="Assigned automatically" onChange={() => undefined} disabled />
        </Labelled>
      </Grid>
    );
  },
};

export const Number_: Story = {
  name: 'NumberInput',
  render: function Render() {
    const [mileage, setMileage] = useState<number | null>(48210);
    const [weight, setWeight] = useState<number | null>(1.42);
    return (
      <Grid columns={2}>
        <Labelled label={`Mileage, value: ${String(mileage)}`}>
          <NumberInput value={mileage} onChange={setMileage} unit="km" />
        </Labelled>
        <Labelled label={`Weight with decimals, value: ${String(weight)}`}>
          <NumberInput value={weight} onChange={setWeight} decimals={2} unit="kg" />
        </Labelled>
      </Grid>
    );
  },
};

export const Money_: Story = {
  name: 'MoneyInput',
  render: function Render() {
    const [price, setPrice] = useState('4899.00');
    return (
      <Grid columns={2}>
        <Labelled label={`Purchase price, value: "${price}"`}>
          <MoneyInput value={price} onChange={setPrice} currency="PLN" />
        </Labelled>
        <Labelled label="Invalid">
          <MoneyInput value="" onChange={() => undefined} currency="EUR" invalid />
        </Labelled>
      </Grid>
    );
  },
};

export const Textarea_: Story = {
  name: 'Textarea',
  render: function Render() {
    const [notes, setNotes] = useState(
      'Returned with a cracked charger. Battery health 81 percent.',
    );
    return (
      <Grid columns={2}>
        <Labelled label="Default">
          <Textarea value={notes} onChange={setNotes} />
        </Labelled>
        <Labelled label="Disabled">
          <Textarea
            value="Signed protocols cannot be edited."
            onChange={() => undefined}
            disabled
          />
        </Labelled>
      </Grid>
    );
  },
};
