import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../text/Text';
import { AppShell } from './AppShell';
import { Grid } from './Grid';
import { PageHeader } from './PageHeader';
import { Section } from './Section';
import { Stack } from './Stack';

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: {
    brand: 'Asset register',
    navigationLabel: 'Main navigation',
    openMenuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
    navigation: [
      { href: '#equipment', label: 'Equipment', icon: 'laptop', current: true },
      { href: '#protocols', label: 'Protocols', icon: 'clipboard-list' },
      { href: '#employees', label: 'Employees', icon: 'users' },
      { href: '#locations', label: 'Locations', icon: 'map-pin' },
      { href: '#categories', label: 'Categories', icon: 'tags' },
      { href: '#settings', label: 'Settings', icon: 'settings' },
    ],
    topBar: <Text variant="muted">Demo organization</Text>,
    children: (
      <Stack gap="lg">
        <PageHeader
          title="Equipment"
          description="Laptops, phones, vehicles and tools registered in the company."
        />
        <Section title="Laptops">
          <Grid columns={3}>
            <Text>ThinkPad T14 Gen 5</Text>
            <Text>MacBook Air 13 M3</Text>
            <Text>Dell Latitude 5450</Text>
          </Grid>
        </Section>
      </Stack>
    ),
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};
