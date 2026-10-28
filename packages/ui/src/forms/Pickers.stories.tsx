import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Grid } from '../layout/Grid';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { Combobox } from './Combobox';
import type { ComboboxOption } from './ComboboxList';
import { DateInput } from './DateInput';
import { DateRangeInput, type DateRange } from './DateRangeInput';
import { MultiCombobox } from './MultiCombobox';

const employees: ComboboxOption[] = [
  { value: 'e1', label: 'Anna Nowak', description: 'Logistics, Warsaw' },
  { value: 'e2', label: 'Piotr Wiśniewski', description: 'Sales, Kraków' },
  { value: 'e3', label: 'Katarzyna Zielińska', description: 'Finance, Warsaw' },
  { value: 'e4', label: 'Tomasz Lewandowski', description: 'IT, Gdańsk' },
  { value: 'e5', label: 'Magdalena Kamińska', description: 'HR, Poznań' },
];

const searchEmployees = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const needle = query.toLocaleLowerCase('pl');
  return employees.filter((employee) => employee.label.toLocaleLowerCase('pl').includes(needle));
};

const texts = {
  searchPlaceholder: 'Search by name',
  emptyText: 'No employees match this search.',
  loadingText: 'Searching...',
};

const meta = {
  title: 'Forms/Pickers',
  component: Combobox,
  args: { value: null, onChange: () => undefined, placeholder: '', ...texts },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Combobox_: Story = {
  name: 'Combobox',
  render: function Render() {
    const [local, setLocal] = useState<ComboboxOption | null>(null);
    const [remote, setRemote] = useState<ComboboxOption | null>(employees[0] ?? null);
    return (
      <Grid columns={2}>
        <Stack gap="xs">
          <Text variant="muted">Local options</Text>
          <Combobox
            value={local}
            onChange={setLocal}
            options={employees}
            placeholder="Choose an employee"
            {...texts}
          />
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">Server search (400 ms)</Text>
          <Combobox
            value={remote}
            onChange={setRemote}
            loadOptions={searchEmployees}
            placeholder="Choose an employee"
            {...texts}
          />
        </Stack>
      </Grid>
    );
  },
};

export const MultiCombobox_: Story = {
  name: 'MultiCombobox',
  render: function Render() {
    const [selected, setSelected] = useState<ComboboxOption[]>(employees.slice(0, 2));
    return (
      <MultiCombobox
        value={selected}
        onChange={setSelected}
        options={employees}
        placeholder="Add people"
        removeLabel={(label) => `Remove ${label}`}
        {...texts}
      />
    );
  },
};

export const Dates: Story = {
  render: function Render() {
    const [purchased, setPurchased] = useState<string | null>('2026-03-14');
    const [warranty, setWarranty] = useState<string | null>(null);
    const [period, setPeriod] = useState<DateRange>({ from: '2026-10-01', to: '2026-10-31' });
    return (
      <Grid columns={3}>
        <Stack gap="xs">
          <Text variant="muted">{`Purchased: ${String(purchased)}`}</Text>
          <DateInput
            value={purchased}
            onChange={setPurchased}
            placeholder="Choose a date"
            clearLabel="Clear date"
          />
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">Warranty, not before purchase</Text>
          <DateInput
            value={warranty}
            onChange={setWarranty}
            placeholder="Choose a date"
            clearLabel="Clear date"
            {...(purchased && { min: purchased })}
          />
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">Report period</Text>
          <DateRangeInput
            value={period}
            onChange={setPeriod}
            placeholder="Choose a period"
            clearLabel="Clear period"
          />
        </Stack>
      </Grid>
    );
  },
};
