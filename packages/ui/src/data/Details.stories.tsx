import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../actions/Button';
import { Divider } from '../layout/Divider';
import { Stack } from '../layout/Stack';
import { DateText } from '../text/DateText';
import { Money } from '../text/Money';
import { DetailList } from './DetailList';
import { DetailSection } from './DetailSection';
import { Timeline } from './Timeline';

const meta = {
  title: 'Data/Details',
  component: DetailList,
  args: { items: [], emptyValue: 'Not set' },
} satisfies Meta<typeof DetailList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EquipmentCard: Story = {
  render: () => (
    <div className="max-w-3xl">
      <Stack gap="lg">
        <DetailSection
          title="Identification"
          action={
            <Button size="sm" variant="ghost" icon="pencil">
              Edit
            </Button>
          }
        >
          <DetailList
            columns={2}
            emptyValue="Not set"
            items={[
              { label: 'Serial number', value: <span className="font-mono">PF4K2X9A</span> },
              { label: 'Inventory number', value: 'IT/2026/0148' },
              { label: 'Category', value: 'Laptop' },
              { label: 'IMEI', value: null },
            ]}
          />
        </DetailSection>
        <Divider />
        <DetailSection title="Purchase">
          <DetailList
            columns={2}
            emptyValue="Not set"
            items={[
              { label: 'Purchased on', value: <DateText value="2026-03-14" /> },
              { label: 'Price', value: <Money amount="5899.00" currency="PLN" /> },
              { label: 'Supplier', value: 'IT Hurt sp. z o.o.' },
              { label: 'Warranty until', value: <DateText value="2029-03-14" /> },
            ]}
          />
        </DetailSection>
      </Stack>
    </div>
  ),
};

export const History: Story = {
  render: () => (
    <div className="max-w-xl">
      <Timeline
        commentLabel="Comment"
        entries={[
          {
            kind: 'event',
            id: '1',
            icon: 'handshake',
            tone: 'accent',
            title: 'Issued to Anna Nowak on protocol PPS/2026/014',
            actor: 'Marek Kowal',
            at: '2026-10-21T08:12:00Z',
          },
          {
            kind: 'comment',
            id: '2',
            body: 'Charger replaced, the old one had a damaged cable.',
            actor: 'Marek Kowal',
            at: '2026-10-20T14:40:00Z',
          },
          {
            kind: 'event',
            id: '3',
            icon: 'wrench',
            title: 'Returned from repair',
            description: 'Keyboard replaced under warranty. Cost 0,00 zł.',
            actor: 'Ewa Malinowska',
            at: '2026-10-18T10:05:00Z',
          },
          {
            kind: 'event',
            id: '4',
            icon: 'pencil',
            title: 'Location changed from Warsaw office to Kraków branch',
            actor: 'Ewa Malinowska',
            at: '2026-09-02T07:30:00Z',
          },
        ]}
      />
    </div>
  ),
};
