'use client';

import { useFormatSettings } from './FormatProvider';

const FORMATS = {
  date: { dateStyle: 'medium' },
  datetime: { dateStyle: 'medium', timeStyle: 'short' },
  time: { timeStyle: 'short' },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export interface DateTextProps {
  value: Date | string;
  format?: keyof typeof FORMATS;
}

export function DateText({ value, format = 'date' }: DateTextProps) {
  const { locale, timeZone } = useFormatSettings();
  const date = typeof value === 'string' ? new Date(value) : value;
  const formatted = new Intl.DateTimeFormat(locale, { ...FORMATS[format], timeZone }).format(date);

  return (
    <time dateTime={date.toISOString()} className="whitespace-nowrap tabular-nums">
      {formatted}
    </time>
  );
}
