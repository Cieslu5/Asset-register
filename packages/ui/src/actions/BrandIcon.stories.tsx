import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cluster } from '../layout/Cluster';
import { Stack } from '../layout/Stack';
import { Text } from '../text/Text';
import { BrandIcon } from './BrandIcon';
import { brands, type BrandName } from './icons';

const meta = {
  title: 'Actions/BrandIcon',
  component: BrandIcon,
  args: { brand: 'google', title: 'Google Workspace', size: 'md', colored: false },
} satisfies Meta<typeof BrandIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colored: Story = { args: { colored: true } };

export const InText: Story = {
  render: () => (
    <Cluster gap="sm">
      <BrandIcon brand="cloudflare" title="Cloudflare" />
      <Text as="span">Domain example.com, renews on 03.11.2026</Text>
    </Cluster>
  ),
};

export const Catalog: Story = {
  render: () => (
    <Cluster gap="lg">
      {(Object.keys(brands) as BrandName[]).map((brand) => (
        <Stack key={brand} gap="xs" align="center">
          <BrandIcon brand={brand} title={brand} size="lg" />
          <Text variant="muted">{brand}</Text>
        </Stack>
      ))}
    </Cluster>
  ),
};
