'use client';

import type { Ref } from 'react';
import { useFormatSettings } from '../text/FormatProvider';
import { decimalSeparator, sanitizeDecimal, toDisplay } from './decimal';
import { fieldFrame, fieldInput, type FieldControlProps } from './field';

export interface MoneyInputProps extends FieldControlProps<string> {
  currency: string;
  placeholder?: string;
}

// Kwota zostaje tekstem („1234.50”) aż do bazy (numeric), żeby nie gubić groszy na float.
export function MoneyInput({
  value,
  onChange,
  onBlur,
  id,
  name,
  ref,
  invalid = false,
  disabled,
  required,
  currency,
  placeholder,
  'aria-describedby': describedBy,
}: MoneyInputProps) {
  const separator = decimalSeparator(useFormatSettings().locale);

  const handleBlur = () => {
    if (value !== '' && value !== '-') onChange(Number(value).toFixed(2));
    onBlur?.();
  };

  return (
    <div className={fieldFrame}>
      <input
        ref={ref as Ref<HTMLInputElement>}
        id={id}
        name={name}
        type="text"
        inputMode="decimal"
        value={toDisplay(value, separator)}
        onChange={(event) => onChange(sanitizeDecimal(event.target.value, 2))}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={`${fieldInput} text-right tabular-nums`}
      />
      <span className="shrink-0 text-ink-subtle">{currency}</span>
    </div>
  );
}
