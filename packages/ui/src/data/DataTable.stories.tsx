import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Button } from '../actions/Button';
import { DateText } from '../text/DateText';
import { Money } from '../text/Money';
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
  type DataTableSort,
} from './DataTable';
import { EmptyState } from './EmptyState';
import { makeEquipment, STATUS_BADGE, type EquipmentRow } from './equipment-fixtures';
import { StatusBadge } from './StatusBadge';

const ALL_ROWS = makeEquipment(137);

const columns: DataTableColumn<EquipmentRow>[] = [
  {
    id: 'name',
    header: 'Name',
    sortable: true,
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    id: 'serialNumber',
    header: 'Serial number',
    width: '9rem',
    hideBelow: 'md',
    cell: (row) => <span className="font-mono">{row.serialNumber}</span>,
  },
  {
    id: 'category',
    header: 'Category',
    width: '7rem',
    hideBelow: 'sm',
    cell: (row) => row.category,
  },
  {
    id: 'holder',
    header: 'Holder',
    hideBelow: 'lg',
    cell: (row) => row.holder ?? <span className="text-ink-subtle">In stock</span>,
  },
  {
    id: 'status',
    header: 'Status',
    width: '8rem',
    cell: (row) => <StatusBadge {...STATUS_BADGE[row.status]} />,
  },
  {
    id: 'price',
    header: 'Price',
    width: '9rem',
    align: 'end',
    sortable: true,
    hideBelow: 'md',
    cell: (row) => <Money amount={row.price} currency="PLN" />,
  },
  {
    id: 'purchasedOn',
    header: 'Purchased',
    width: '8rem',
    align: 'end',
    sortable: true,
    hideBelow: 'lg',
    cell: (row) => <DateText value={row.purchasedOn} />,
  },
];

const sortRows = (rows: EquipmentRow[], sort: DataTableSort | null) => {
  if (!sort) return rows;
  const key = sort.columnId as keyof EquipmentRow;
  const sign = sort.direction === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const left = key === 'price' ? Number(a.price) : String(a[key]);
    const right = key === 'price' ? Number(b.price) : String(b[key]);
    return left < right ? -sign : left > right ? sign : 0;
  });
};

const paginationTexts = {
  range: (from: number, to: number, total: number) => `${from}-${to} of ${total}`,
  previous: 'Previous page',
  next: 'Next page',
  pageSize: 'Rows per page',
};

const empty = (
  <EmptyState
    icon="laptop"
    title="No equipment yet"
    description="Add the first device to start issuing it on handover protocols."
    action={
      <Button variant="primary" icon="plus">
        Add equipment
      </Button>
    }
  />
);

function EquipmentTable(
  props: Pick<DataTableProps<EquipmentRow>, 'status' | 'error'> & { rowCount: number },
) {
  const [sort, setSort] = useState<DataTableSort | null>({ columnId: 'name', direction: 'asc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const source = ALL_ROWS.slice(0, props.rowCount);
  const rows = sortRows(source, sort).slice((page - 1) * pageSize, page * pageSize);

  return (
    <DataTable
      {...props}
      caption="Equipment"
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      empty={empty}
      sort={sort}
      onSortChange={setSort}
      onRowClick={fn()}
      selection={{
        selectedIds,
        onChange: setSelectedIds,
        selectAllLabel: 'Select all on this page',
        selectRowLabel: (row) => `Select ${row.name} ${row.serialNumber}`,
      }}
      rowActions={{
        label: 'Equipment actions',
        entries: () => [
          { kind: 'item', label: 'Edit', icon: 'pencil', onSelect: fn() },
          { kind: 'item', label: 'Send to repair', icon: 'wrench', onSelect: fn() },
          { kind: 'separator' },
          { kind: 'item', label: 'Archive', icon: 'archive', onSelect: fn(), danger: true },
        ],
      }}
      pagination={{
        page,
        pageSize,
        totalCount: source.length,
        onPageChange: setPage,
        onPageSizeChange: (size) => {
          setPageSize(size);
          setPage(1);
        },
        texts: paginationTexts,
      }}
    />
  );
}

const meta = {
  title: 'Data/DataTable',
  component: EquipmentTable,
  args: { status: 'ready', rowCount: ALL_ROWS.length },
} satisfies Meta<typeof EquipmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = { args: { status: 'loading' } };

export const Empty: Story = { args: { rowCount: 0 } };

export const Error: Story = {
  args: {
    status: 'error',
    error: {
      message: 'Equipment could not be loaded. Check your connection and try again.',
      retryLabel: 'Try again',
      onRetry: fn(),
    },
  },
};

export const Virtualized: Story = {
  render: function Render() {
    const rows = makeEquipment(2000);
    return (
      <DataTable
        caption="All equipment"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        status="ready"
        empty={empty}
        virtualize
      />
    );
  },
};
