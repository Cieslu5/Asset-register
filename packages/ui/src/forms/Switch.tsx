'use client';

import { Switch as SwitchPrimitive } from 'radix-ui';
import { useId, type Ref } from 'react';
import type { FieldControlProps } from './field';

export interface SwitchProps extends FieldControlProps<boolean> {
  /** Etykieta przy przełączniku; w FormField z układem `inline` podaje ją FormField. */
  label?: string;
}

export function Switch({
  value,
  onChange,
  onBlur,
  id,
  name,
  ref,
  invalid = false,
  disabled,
  required,
  label,
  'aria-describedby': describedBy,
}: SwitchProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  const control = (
    <SwitchPrimitive.Root
      ref={ref as Ref<HTMLButtonElement>}
      id={controlId}
      checked={value}
      onCheckedChange={onChange}
      onBlur={onBlur}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className="peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent bg-line-strong p-0.5 transition-colors duration-(--duration-fast) focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent"
      {...(name !== undefined && { name })}
      {...(disabled !== undefined && { disabled })}
      {...(required !== undefined && { required })}
    >
      <SwitchPrimitive.Thumb className="block size-4 rounded-full bg-surface shadow-sm transition-transform duration-(--duration-fast) ease-(--ease-out) data-[state=checked]:translate-x-4" />
    </SwitchPrimitive.Root>
  );

  if (!label) return control;

  return (
    <div className="flex items-center gap-2">
      {control}
      <label
        htmlFor={controlId}
        className="font-sans text-sm text-ink select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        {label}
      </label>
    </div>
  );
}
