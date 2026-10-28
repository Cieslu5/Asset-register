'use client';

import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { useId, type Ref } from 'react';
import { Icon } from '../actions/Icon';
import type { FieldControlProps } from './field';

export interface CheckboxProps extends FieldControlProps<boolean> {
  /** Etykieta przy polu; w FormField z układem `inline` podaje ją FormField. */
  label?: string;
}

export function Checkbox({
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
}: CheckboxProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  const box = (
    <CheckboxPrimitive.Root
      ref={ref as Ref<HTMLButtonElement>}
      id={controlId}
      checked={value}
      onCheckedChange={(checked) => onChange(checked === true)}
      onBlur={onBlur}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className="peer inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-line-strong bg-surface text-on-accent transition-colors duration-(--duration-fast) hover:border-ink-subtle focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger data-[state=checked]:border-accent data-[state=checked]:bg-accent"
      {...(name !== undefined && { name })}
      {...(disabled !== undefined && { disabled })}
      {...(required !== undefined && { required })}
    >
      <CheckboxPrimitive.Indicator className="inline-flex">
        <Icon name="check" size="sm" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label) return box;

  return (
    <div className="flex items-center gap-2">
      {box}
      <label
        htmlFor={controlId}
        className="font-sans text-sm text-ink select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        {label}
      </label>
    </div>
  );
}
