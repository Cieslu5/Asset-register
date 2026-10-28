import { getDefaultClassNames, type ClassNames } from 'react-day-picker';
import { enGB, pl } from 'react-day-picker/locale';

// Daty w formularzach to dni kalendarzowe bez strefy czasowej: trzymamy je jako „YYYY-MM-DD”.
export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromIsoDate(value: string): Date {
  const [year = 0, month = 1, day = 1] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatIsoDate(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(fromIsoDate(value));
}

export function calendarLocale(locale: string) {
  return locale.startsWith('pl') ? pl : enGB;
}

const defaults = getDefaultClassNames();

export const calendarClassNames: Partial<ClassNames> = {
  root: `${defaults.root} p-3 font-sans text-sm text-ink`,
  months: 'relative flex flex-col gap-4',
  month: 'flex flex-col gap-3',
  month_caption: 'flex h-8 items-center px-1 font-medium capitalize',
  nav: 'absolute top-0 right-0 flex items-center gap-1',
  button_previous:
    'inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken hover:text-ink disabled:opacity-40',
  button_next:
    'inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken hover:text-ink disabled:opacity-40',
  chevron: 'size-4 fill-current',
  month_grid: 'border-collapse',
  weekdays: 'flex',
  weekday: 'w-9 pb-1 text-xs font-normal text-ink-subtle',
  week: 'mt-0.5 flex',
  day: 'size-9 p-0 text-center',
  day_button:
    'inline-flex size-9 items-center justify-center rounded-md font-normal tabular-nums hover:bg-surface-sunken',
  today: 'font-semibold text-accent',
  selected: '[&>button]:bg-accent [&>button]:text-on-accent [&>button]:hover:bg-accent-hover',
  range_middle:
    '[&>button]:rounded-none [&>button]:bg-accent-soft [&>button]:text-ink [&>button]:hover:bg-accent-soft',
  range_start: '[&>button]:rounded-r-none',
  range_end: '[&>button]:rounded-l-none',
  outside: 'text-ink-subtle opacity-60',
  disabled: 'pointer-events-none opacity-40',
  hidden: 'invisible',
};
