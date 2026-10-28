'use client';

import { useFormatSettings } from './FormatProvider';

export interface NumberTextProps {
  value: number;
  maximumFractionDigits?: number;
}

export function NumberText({ value, maximumFractionDigits = 0 }: NumberTextProps) {
  const { locale } = useFormatSettings();
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);

  return <span className="whitespace-nowrap tabular-nums">{formatted}</span>;
}
