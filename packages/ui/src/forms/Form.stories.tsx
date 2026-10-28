import type { Meta, StoryObj } from '@storybook/react-vite';
import { z } from 'zod';
import { Button } from '../actions/Button';
import { Grid } from '../layout/Grid';
import { Checkbox } from './Checkbox';
import { Form, useZodForm, type FormActionResult } from './Form';
import { FormField } from './FormField';
import { MoneyInput } from './MoneyInput';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { TextInput } from './TextInput';

const equipmentSchema = z.object({
  name: z.string().trim().min(1, 'Enter the equipment name.'),
  serialNumber: z.string().trim().min(6, 'Serial number has at least 6 characters.'),
  category: z
    .string({ error: 'Choose a category.' })
    .nullable()
    .refine((value) => value !== null, {
      message: 'Choose a category.',
    }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Enter the price, for example 4899,00.'),
  insured: z.boolean(),
  notes: z.string().max(500, 'Notes can have up to 500 characters.'),
});

const ERROR_MESSAGES: Record<string, string> = {
  CONFLICT: 'Someone changed this equipment in the meantime. Reload the page and try again.',
  VALIDATION: 'Some fields need attention.',
};

function EquipmentForm({ submit }: { submit: () => Promise<FormActionResult> }) {
  const form = useZodForm(equipmentSchema, {
    defaultValues: {
      name: 'ThinkPad T14 Gen 5',
      serialNumber: '',
      category: null,
      price: '',
      insured: false,
      notes: '',
    },
  });

  return (
    <Form
      form={form}
      onSubmit={submit}
      errorMessage={(code) => ERROR_MESSAGES[code] ?? 'Saving failed. Try again in a moment.'}
      submitLabel="Save equipment"
      secondaryAction={<Button variant="ghost">Cancel</Button>}
    >
      <Grid columns={2}>
        <FormField control={form.control} name="name" label="Name" required>
          {(field) => <TextInput {...field} />}
        </FormField>
        <FormField
          control={form.control}
          name="serialNumber"
          label="Serial number"
          hint="Printed on the label under the device."
          required
        >
          {(field) => <TextInput {...field} />}
        </FormField>
        <FormField control={form.control} name="category" label="Category" required>
          {(field) => (
            <Select
              {...field}
              placeholder="Choose a category"
              options={[
                { value: 'laptop', label: 'Laptop' },
                { value: 'phone', label: 'Phone' },
                { value: 'monitor', label: 'Monitor' },
              ]}
            />
          )}
        </FormField>
        <FormField control={form.control} name="price" label="Purchase price" required>
          {(field) => <MoneyInput {...field} currency="PLN" />}
        </FormField>
      </Grid>
      <FormField control={form.control} name="insured" label="Covered by insurance" layout="inline">
        {(field) => <Checkbox {...field} />}
      </FormField>
      <FormField control={form.control} name="notes" label="Notes">
        {(field) => <Textarea {...field} rows={3} />}
      </FormField>
    </Form>
  );
}

const meta = {
  title: 'Forms/Form',
  component: EquipmentForm,
  args: {
    submit: async (): Promise<FormActionResult> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { ok: true };
    },
  },
} satisfies Meta<typeof EquipmentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Valid: Story = {};

export const ServerConflict: Story = {
  args: {
    submit: async (): Promise<FormActionResult> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { ok: false, error: { code: 'CONFLICT' } };
    },
  },
};

export const ServerFieldError: Story = {
  args: {
    submit: async (): Promise<FormActionResult> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        ok: false,
        error: {
          code: 'VALIDATION',
          fieldErrors: { serialNumber: ['This serial number is already registered.'] },
        },
      };
    },
  },
};
