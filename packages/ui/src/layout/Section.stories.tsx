import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateText } from '../text/DateText';
import { Text } from '../text/Text';
import { Grid } from './Grid';
import { Section } from './Section';
import { Stack } from './Stack';

const meta = {
  title: 'Layout/Section',
  component: Section,
  args: {
    title: 'Assignment',
    children: (
      <Grid columns={2}>
        <Stack gap="xs">
          <Text variant="muted">Employee</Text>
          <Text>Anna Nowak</Text>
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">Issued on</Text>
          <Text>
            <DateText value="2026-03-14T09:30:00Z" />
          </Text>
        </Stack>
      </Grid>
    ),
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    title: 'Inspections',
    description: 'Recurring checks with their next due date.',
  },
};
