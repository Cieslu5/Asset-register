'use client';

import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { useId, type Ref } from 'react';
import type { FieldControlProps } from './field';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps extends FieldControlProps<string | null> {
  options: RadioOption[];
  /** Id nagłówka grupy; FormField podaje go sam. */
  labelId?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function RadioGroup({
  value,
  onChange,
  onBlur,
  id,
  name,
  ref,
  invalid = false,
  disabled,
  required,
  options,
  labelId,
  orientation = 'vertical',
  'aria-describedby': describedBy,
}: RadioGroupProps) {
  const groupId = useId();
  const baseId = id ?? groupId;

  return (
    <RadioGroupPrimitive.Root
      ref={ref as Ref<HTMLDivElement>}
      id={baseId}
      value={value ?? ''}
      onValueChange={onChange}
      onBlur={onBlur}
      orientation={orientation}
      aria-labelledby={labelId}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className={
        orientation === 'vertical' ? 'flex flex-col gap-2.5' : 'flex flex-wrap gap-x-6 gap-y-2.5'
      }
      {...(name !== undefined && { name })}
      {...(disabled !== undefined && { disabled })}
      {...(required !== undefined && { required })}
    >
      {options.map((option) => {
        const optionId = `${baseId}-${option.value}`;
        return (
          <div key={option.value} className="flex items-start gap-2">
            <RadioGroupPrimitive.Item
              id={optionId}
              value={option.value}
              className="peer mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface transition-colors duration-(--duration-fast) hover:border-ink-subtle focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent"
            >
              <RadioGroupPrimitive.Indicator className="block size-2 rounded-full bg-accent" />
            </RadioGroupPrimitive.Item>
            <label
              htmlFor={optionId}
              className="flex flex-col gap-0.5 font-sans select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            >
              <span className="text-sm text-ink">{option.label}</span>
              {option.description && (
                <span className="text-sm text-ink-muted">{option.description}</span>
              )}
            </label>
          </div>
        );
      })}
    </RadioGroupPrimitive.Root>
  );
}
