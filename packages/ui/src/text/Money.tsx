'use client';

import { useFormatSettings } from './FormatProvider';

export interface MoneyProps {
  /** Kwota z bazy przychodzi jako tekst (`numeric`), żeby nie gubić groszy na float. */
  amount: number | `${number}`;
  currency: string;
}

export function Money({ amount, currency }: MoneyProps) {
  const { locale } = useFormatSettings();
  const formatted = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);

  return <span className="whitespace-nowrap tabular-nums">{formatted}</span>;
}
