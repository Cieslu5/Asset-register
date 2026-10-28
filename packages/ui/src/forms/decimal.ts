// Pola liczbowe przyjmują przecinek i kropkę (Postel), a na zewnątrz oddają jeden format z kropką.

export function decimalSeparator(locale: string): string {
  return (
    new Intl.NumberFormat(locale).formatToParts(1.5).find((part) => part.type === 'decimal')
      ?.value ?? '.'
  );
}

export function sanitizeDecimal(input: string, maxFractionDigits: number): string {
  const normalized = input.replace(/\s/g, '').replace(',', '.');
  const match = /^-?\d*(\.\d*)?/.exec(normalized)?.[0] ?? '';
  const [whole = '', fraction] = match.split('.');
  if (fraction === undefined || maxFractionDigits === 0) return whole;
  return `${whole}.${fraction.slice(0, maxFractionDigits)}`;
}

export function toDisplay(canonical: string, separator: string): string {
  return canonical.replace('.', separator);
}
