import type { Ref } from 'react';
import type { FieldControlProps } from './field';

export interface TextareaProps extends FieldControlProps<string> {
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}

export function Textarea({
  value,
  onChange,
  onBlur,
  id,
  name,
  ref,
  invalid = false,
  disabled,
  required,
  rows = 4,
  placeholder,
  maxLength,
  'aria-describedby': describedBy,
}: TextareaProps) {
  return (
    <textarea
      ref={ref as Ref<HTMLTextAreaElement>}
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      rows={rows}
      placeholder={placeholder}
      maxLength={maxLength}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className="field-sizing-content min-h-20 w-full resize-y rounded-md border border-line-strong bg-surface px-3 py-2 font-sans text-sm text-ink transition-colors duration-(--duration-fast) placeholder:text-ink-subtle hover:border-ink-subtle focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus/40 disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-70 aria-invalid:border-danger"
    />
  );
}
