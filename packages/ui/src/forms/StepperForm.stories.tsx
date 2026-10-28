import type { Meta, StoryObj } from '@storybook/react-vite';
import { z } from 'zod';
import { Grid } from '../layout/Grid';
import { Checkbox } from './Checkbox';
import { DateInput } from './DateInput';
import { Form, useZodForm, type FormActionResult } from './Form';
import { FormField } from './FormField';
import { MoneyInput } from './MoneyInput';
import { Select } from './Select';
import { StepperForm } from './StepperForm';
import { TextInput } from './TextInput';

const schema = z.object({
  name: z.string().trim().min(1, 'Enter the equipment name.'),
  category: z
    .string()
    .nullable()
    .refine((value) => value !== null, 'Choose a category.'),
  serialNumber: z.string().trim().min(6, 'Serial number has at least 6 characters.'),
  inventoryNumber: z.string().trim(),
  purchasedOn: z
    .string()
    .nullable()
    .refine((value) => value !== null, 'Choose the purchase date.'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Enter the price, for example 4899,00.'),
  charger: z.boolean(),
  dock: z.boolean(),
});

function EquipmentWizard({ submit }: { submit: () => Promise<FormActionResult> }) {
  const form = useZodForm(schema, {
    defaultValues: {
      name: '',
      category: null,
      serialNumber: '',
      inventoryNumber: '',
      purchasedOn: null,
      price: '',
      charger: true,
      dock: false,
    },
  });
  const { control } = form;

  return (
    <Form
      form={form}
      onSubmit={submit}
      errorMessage={() => 'Saving failed. Try again in a moment.'}
    >
      <StepperForm
        texts={{
          stepsLabel: 'Form steps',
          previous: 'Back',
          next: 'Next',
          submit: 'Save equipment',
        }}
        steps={[
          {
            key: 'basic',
            label: 'Basic data',
            icon: 'info',
            fields: ['name', 'category'],
            content: (
              <Grid columns={2}>
                <FormField control={control} name="name" label="Name" required>
                  {(field) => <TextInput {...field} />}
                </FormField>
                <FormField control={control} name="category" label="Category" required>
                  {(field) => (
                    <Select
                      {...field}
                      placeholder="Choose a category"
                      options={[
                        { value: 'laptop', label: 'Laptop' },
                        { value: 'phone', label: 'Phone' },
                      ]}
                    />
                  )}
                </FormField>
              </Grid>
            ),
          },
          {
            key: 'identity',
            label: 'Identification',
            icon: 'qr-code',
            fields: ['serialNumber', 'inventoryNumber'],
            content: (
              <Grid columns={2}>
                <FormField control={control} name="serialNumber" label="Serial number" required>
                  {(field) => <TextInput {...field} />}
                </FormField>
                <FormField
                  control={control}
                  name="inventoryNumber"
                  label="Inventory number"
                  hint="Leave empty to assign the next free number."
                >
                  {(field) => <TextInput {...field} />}
                </FormField>
              </Grid>
            ),
          },
          {
            key: 'purchase',
            label: 'Purchase',
            icon: 'receipt',
            fields: ['purchasedOn', 'price'],
            content: (
              <Grid columns={2}>
                <FormField control={control} name="purchasedOn" label="Purchased on" required>
                  {(field) => (
                    <DateInput {...field} placeholder="Choose a date" clearLabel="Clear date" />
                  )}
                </FormField>
                <FormField control={control} name="price" label="Price" required>
                  {(field) => <MoneyInput {...field} currency="PLN" />}
                </FormField>
              </Grid>
            ),
          },
          {
            key: 'kit',
            label: 'Accessories',
            icon: 'package',
            fields: ['charger', 'dock'],
            content: (
              <>
                <FormField control={control} name="charger" label="Charger" layout="inline">
                  {(field) => <Checkbox {...field} />}
                </FormField>
                <FormField control={control} name="dock" label="Docking station" layout="inline">
                  {(field) => <Checkbox {...field} />}
                </FormField>
              </>
            ),
          },
        ]}
      />
    </Form>
  );
}

const meta = {
  title: 'Forms/StepperForm',
  component: EquipmentWizard,
  args: {
    submit: async (): Promise<FormActionResult> => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { ok: true };
    },
  },
} satisfies Meta<typeof EquipmentWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NewEquipment: Story = {};
