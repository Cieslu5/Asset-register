import type { ReactNode } from 'react';

export interface DetailItem {
  label: string;
  value: ReactNode;
}

export interface DetailListProps {
  items: DetailItem[];
  /** Tekst dla pustej wartości, np. „Nie podano”. */
  emptyValue: string;
  columns?: 1 | 2;
}

export function DetailList({ items, emptyValue, columns = 1 }: DetailListProps) {
  return (
    <dl className={`grid grid-cols-1 gap-x-8 gap-y-3 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((item) => {
        const empty = item.value === null || item.value === undefined || item.value === '';
        return (
          <div
            key={item.label}
            className="grid min-w-0 grid-cols-1 gap-0.5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-4"
          >
            <dt className="font-sans text-sm text-ink-muted">{item.label}</dt>
            <dd
              className={`min-w-0 font-sans text-sm break-words tabular-nums ${empty ? 'text-ink-subtle' : 'text-ink'}`}
            >
              {empty ? emptyValue : item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
