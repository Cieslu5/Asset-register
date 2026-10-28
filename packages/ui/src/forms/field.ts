import type { Ref } from 'react';

// Wspólny kontrakt pól: każde pole działa samo (value + onChange) i w FormField, który podaje resztę.
export interface FieldControlProps<TValue> {
  value: TValue;
  onChange: (value: TValue) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  ref?: Ref<HTMLElement>;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  'aria-describedby'?: string | undefined;
}

export const fieldFrame = [
  'flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-line-strong bg-surface px-3',
  'font-sans text-sm text-ink transition-colors duration-(--duration-fast)',
  'hover:border-ink-subtle focus-within:border-accent focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-focus/40',
  'has-[[aria-invalid=true]]:border-danger has-disabled:cursor-not-allowed has-disabled:bg-surface-sunken has-disabled:opacity-70',
].join(' ');

export const fieldInput =
  'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-subtle focus-visible:outline-none disabled:cursor-not-allowed';
