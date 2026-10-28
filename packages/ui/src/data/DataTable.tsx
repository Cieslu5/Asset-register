'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type Updater,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cva } from 'class-variance-authority';
import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../actions/Button';
import { DropdownMenu, type DropdownMenuEntry } from '../actions/DropdownMenu';
import { Icon } from '../actions/Icon';
import { IconButton } from '../actions/IconButton';
import { Checkbox } from '../forms/Checkbox';
import { Pagination, type PaginationProps } from './Pagination';
import { Skeleton } from './Skeleton';

export interface DataTableColumn<TRow> {
  id: string;
  header: string;
  cell: (row: TRow) => ReactNode;
  sortable?: boolean;
  align?: 'start' | 'end';
  /** Szerokość kolumny, np. `8rem`; bez niej kolumna dzieli resztę miejsca. */
  width?: string;
  /** Kolumna drugorzędna znika poniżej podanej szerokości ekranu. */
  hideBelow?: 'sm' | 'md' | 'lg';
}

export interface DataTableSort {
  columnId: string;
  direction: 'asc' | 'desc';
}

export interface DataTableSelection<TRow> {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  selectAllLabel: string;
  selectRowLabel: (row: TRow) => string;
}

export interface DataTableError {
  message: string;
  retryLabel: string;
  onRetry: () => void;
}

export interface DataTableProps<TRow> {
  /** Opis tabeli dla czytnika ekranu. */
  caption: string;
  columns: DataTableColumn<TRow>[];
  rows: TRow[];
  getRowId: (row: TRow) => string;
  status: 'ready' | 'loading' | 'error';
  error?: DataTableError;
  empty: ReactNode;
  sort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  pagination?: PaginationProps;
  selection?: DataTableSelection<TRow>;
  rowActions?: { label: string; entries: (row: TRow) => DropdownMenuEntry[] };
  onRowClick?: (row: TRow) => void;
  /** Dla długich stron (100+ wierszy): renderuje tylko widoczne wiersze w przewijanym obszarze. */
  virtualize?: boolean;
}

const ROW_HEIGHT = 44;
const SKELETON_ROWS = 8;

const HIDE_BELOW = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
  lg: 'hidden lg:table-cell',
};

const row = cva('h-11 border-b border-line last:border-b-0', {
  variants: {
    clickable: {
      true: 'cursor-pointer hover:bg-surface-sunken focus-visible:outline-offset-[-2px]',
    },
    selected: { true: 'bg-accent-soft/60' },
  },
});

function cellClass<TRow>(column: DataTableColumn<TRow> | undefined): string {
  return [
    'px-3 font-sans text-sm whitespace-nowrap',
    column?.align === 'end' ? 'text-right tabular-nums' : 'text-left',
    column?.hideBelow ? HIDE_BELOW[column.hideBelow] : '',
  ].join(' ');
}

export function DataTable<TRow>({
  caption,
  columns,
  rows,
  getRowId,
  status,
  error,
  empty,
  sort = null,
  onSortChange,
  pagination,
  selection,
  rowActions,
  onRowClick,
  virtualize = false,
}: DataTableProps<TRow>) {
  'use no memo';
  const scrollRef = useRef<HTMLDivElement>(null);

  const sorting: SortingState = sort
    ? [{ id: sort.columnId, desc: sort.direction === 'desc' }]
    : [];
  const rowSelection: RowSelectionState = Object.fromEntries(
    (selection?.selectedIds ?? []).map((id) => [id, true]),
  );

  const columnDefs: ColumnDef<TRow>[] = columns.map((column) => ({
    id: column.id,
    header: column.header,
    // Sortuje serwer; akcesor jest potrzebny tylko po to, żeby TanStack uznał kolumnę za sortowalną.
    accessorFn: () => null,
    sortDescFirst: false,
    cell: ({ row: tableRow }) => column.cell(tableRow.original),
    enableSorting: column.sortable ?? false,
  }));

  // TanStack Table zwraca obiekt zmieniany w miejscu, więc komponent jest wyłączony z React Compiler ('use no memo').
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: rows,
    columns: columnDefs,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    enableRowSelection: selection !== undefined,
    enableSortingRemoval: true,
    state: { sorting, rowSelection },
    onSortingChange: (updater: Updater<SortingState>) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      const first = next[0];
      onSortChange?.(first ? { columnId: first.id, direction: first.desc ? 'desc' : 'asc' } : null);
    },
    onRowSelectionChange: (updater: Updater<RowSelectionState>) => {
      const next = typeof updater === 'function' ? updater(rowSelection) : updater;
      selection?.onChange(Object.keys(next).filter((id) => next[id]));
    },
  });

  const tableRows = table.getRowModel().rows;
  const virtualizer = useVirtualizer({
    count: virtualize ? tableRows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 12,
  });
  const virtualItems = virtualizer.getVirtualItems();
  const visibleRows = virtualize ? virtualItems.map((item) => tableRows[item.index]) : tableRows;
  const paddingTop = virtualize ? (virtualItems[0]?.start ?? 0) : 0;
  const paddingBottom = virtualize
    ? virtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end ?? 0)
    : 0;

  const columnCount = columns.length + (selection ? 1 : 0) + (rowActions ? 1 : 0);
  const columnById = new Map(columns.map((column) => [column.id, column]));

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, original: TRow) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick?.(original);
    }
  };

  const fullWidthRow = (content: ReactNode) => (
    <tr>
      <td colSpan={columnCount}>{content}</td>
    </tr>
  );

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div
        ref={scrollRef}
        className={`overflow-x-auto rounded-lg border border-line bg-surface ${virtualize ? 'max-h-[36rem] overflow-y-auto' : ''}`}
      >
        <table
          className="w-full border-collapse"
          aria-busy={status === 'loading'}
          aria-rowcount={pagination?.totalCount}
        >
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            {selection && <col className="w-11" />}
            {columns.map((column) => (
              <col key={column.id} style={column.width ? { width: column.width } : undefined} />
            ))}
            {rowActions && <col className="w-12" />}
          </colgroup>
          <thead className={virtualize ? 'sticky top-0 z-(--z-sticky) bg-surface' : ''}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-10 border-b border-line-strong">
                {selection && (
                  <th scope="col" className="px-3">
                    <Checkbox
                      value={table.getIsAllRowsSelected()}
                      onChange={(checked) => table.toggleAllRowsSelected(checked)}
                      aria-label={selection.selectAllLabel}
                    />
                  </th>
                )}
                {headerGroup.headers.map((header) => {
                  const column = columnById.get(header.column.id);
                  const direction = header.column.getIsSorted();
                  const ariaSort =
                    direction === 'asc'
                      ? 'ascending'
                      : direction === 'desc'
                        ? 'descending'
                        : 'none';
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={header.column.getCanSort() ? ariaSort : undefined}
                      className={`${cellClass(column)} text-xs font-medium whitespace-nowrap text-ink-muted`}
                    >
                      {header.column.getCanSort() ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className={`-mx-1 inline-flex items-center gap-1 rounded-sm px-1 hover:text-ink ${direction ? 'text-ink' : ''} ${column?.align === 'end' ? 'flex-row-reverse' : ''}`}
                        >
                          {column?.header}
                          <Icon
                            name={
                              direction === 'asc'
                                ? 'arrow-up'
                                : direction === 'desc'
                                  ? 'arrow-down'
                                  : 'sort'
                            }
                            size="sm"
                          />
                        </button>
                      ) : (
                        column?.header
                      )}
                    </th>
                  );
                })}
                {rowActions && (
                  <th scope="col" className="px-3">
                    <span className="sr-only">{rowActions.label}</span>
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {status === 'loading' &&
              Array.from(
                { length: Math.min(pagination?.pageSize ?? SKELETON_ROWS, SKELETON_ROWS) },
                (_, index) => (
                  <tr key={index} className={row()}>
                    {Array.from({ length: columnCount }, (_, cellIndex) => (
                      <td key={cellIndex} className="px-3">
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                ),
              )}
            {status === 'error' &&
              error &&
              fullWidthRow(
                <div
                  role="alert"
                  className="flex flex-col items-center gap-3 px-4 py-10 text-center"
                >
                  <span className="text-danger">
                    <Icon name="warning" size="lg" />
                  </span>
                  <p className="max-w-sm font-sans text-sm text-ink">{error.message}</p>
                  <Button icon="refresh" onClick={error.onRetry}>
                    {error.retryLabel}
                  </Button>
                </div>,
              )}
            {status === 'ready' && rows.length === 0 && fullWidthRow(empty)}
            {status === 'ready' && paddingTop > 0 && (
              <tr aria-hidden style={{ height: paddingTop }} />
            )}
            {status === 'ready' &&
              visibleRows.map((tableRow) => {
                if (!tableRow) return null;
                const original = tableRow.original;
                return (
                  <tr
                    key={tableRow.id}
                    className={row({
                      clickable: onRowClick !== undefined,
                      selected: tableRow.getIsSelected(),
                    })}
                    {...(onRowClick && {
                      tabIndex: 0,
                      onClick: () => onRowClick(original),
                      onKeyDown: (event: KeyboardEvent<HTMLTableRowElement>) =>
                        handleRowKeyDown(event, original),
                    })}
                  >
                    {selection && (
                      <td className="px-3" onClick={(event) => event.stopPropagation()}>
                        <Checkbox
                          value={tableRow.getIsSelected()}
                          onChange={(checked) => tableRow.toggleSelected(checked)}
                          aria-label={selection.selectRowLabel(original)}
                        />
                      </td>
                    )}
                    {tableRow.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`${cellClass(columnById.get(cell.column.id))} text-ink`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    {rowActions && (
                      <td className="px-2 text-right" onClick={(event) => event.stopPropagation()}>
                        <DropdownMenu
                          trigger={
                            <IconButton icon="more-horizontal" label={rowActions.label} size="sm" />
                          }
                          entries={rowActions.entries(original)}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            {status === 'ready' && paddingBottom > 0 && (
              <tr aria-hidden style={{ height: paddingBottom }} />
            )}
          </tbody>
        </table>
      </div>
      {pagination && status !== 'error' && pagination.totalCount > 0 && (
        <Pagination {...pagination} />
      )}
    </div>
  );
}
