import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from '../layout/Grid';
import { Stack } from '../layout/Stack';
import { DateText } from './DateText';
import { FormatProvider } from './FormatProvider';
import { Money } from './Money';
import { NumberText } from './NumberText';
import { Text } from './Text';

const meta = {
  title: 'Text/Formatting',
  component: FormatProvider,
  args: { locale: 'pl-PL', timeZone: 'Europe/Warsaw', children: null },
  render: (args) => (
    <FormatProvider {...args}>
      <Grid columns={3}>
        <Stack gap="xs">
          <Text variant="muted">Money</Text>
          <Text>
            <Money amount="4899.00" currency="PLN" />
          </Text>
          <Text>
            <Money amount={129.5} currency="EUR" />
          </Text>
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">DateText</Text>
          <Text>
            <DateText value="2026-03-14T09:30:00Z" />
          </Text>
          <Text>
            <DateText value="2026-03-14T09:30:00Z" format="datetime" />
          </Text>
        </Stack>
        <Stack gap="xs">
          <Text variant="muted">NumberText</Text>
          <Text>
            <NumberText value={1248} />
          </Text>
          <Text>
            <NumberText value={37.256} maximumFractionDigits={2} />
          </Text>
        </Stack>
      </Grid>
    </FormatProvider>
  ),
} satisfies Meta<typeof FormatProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Polish: Story = {};

export const English: Story = { args: { locale: 'en-GB', timeZone: 'Europe/London' } };
