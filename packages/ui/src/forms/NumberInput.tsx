'use client';

import { useState, type Ref } from 'react';
import { useFormatSettings } from '../text/FormatProvider';
import { decimalSeparator, sanitizeDecimal, toDisplay } from './decimal';
import { fieldFrame, fieldInput, type FieldControlProps } from './field';

export interface NumberInputProps extends FieldControlProps<number | null> {
  decimals?: number;
  unit?: string;
  placeholder?: string;
}

const toCanonical = (value: number | null) => (value === null ? '' : String(value));

export function NumberInput({
  value,
  onChange,
  onBlur,
  id,
  name,
  ref,
  invalid = false,
  disabled,
  required,
  decimals = 0,
  unit,
  placeholder,
  'aria-describedby': describedBy,
}: NumberInputProps) {
  const separator = decimalSeparator(useFormatSettings().locale);
  const [draft, setDraft] = useState(() => toCanonical(value));
  const [previousValue, setPreviousValue] = useState(value);

  // Szkic trzyma np. „12,” w trakcie pisania; zmiana wartości z zewnątrz go nadpisuje.
  if (value !== previousValue) {
    setPreviousValue(value);
    if (draft === '' ? value !== null : Number(draft) !== value) setDraft(toCanonical(value));
  }

  const handleChange = (input: string) => {
    const next = sanitizeDecimal(input, decimals);
    setDraft(next);
    const parsed = next === '' || next === '-' ? null : Number(next);
    onChange(parsed === null || Number.isNaN(parsed) ? null : parsed);
  };

  return (
    <div className={fieldFrame}>
      <input
        ref={ref as Ref<HTMLInputElement>}
        id={id}
        name={name}
        type="text"
        inputMode={decimals > 0 ? 'decimal' : 'numeric'}
        value={toDisplay(draft, separator)}
        onChange={(event) => handleChange(event.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={`${fieldInput} tabular-nums`}
      />
      {unit && <span className="shrink-0 text-ink-subtle">{unit}</span>}
    </div>
  );
}
