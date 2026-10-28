'use client';

import { Select as SelectPrimitive } from 'radix-ui';
import type { Ref } from 'react';
import { Icon } from '../actions/Icon';
import { fieldFrame, type FieldControlProps } from './field';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends FieldControlProps<string | null> {
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
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
  placeholder,
  'aria-describedby': describedBy,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value ?? ''}
      onValueChange={onChange}
      onOpenChange={(open) => {
        if (!open) onBlur?.();
      }}
      {...(name !== undefined && { name })}
      {...(disabled !== undefined && { disabled })}
      {...(required !== undefined && { required })}
    >
      <SelectPrimitive.Trigger
        ref={ref as Ref<HTMLButtonElement>}
        id={id}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={`${fieldFrame} justify-between text-left outline-none focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus/40 aria-invalid:border-danger data-placeholder:text-ink-subtle`}
      >
        <span className="truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon className="text-ink-subtle">
          <Icon name="chevron-down" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          collisionPadding={8}
          className="z-(--z-dropdown) max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-line bg-surface p-1 shadow-md"
        >
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="relative flex h-8 cursor-default items-center rounded-md pr-2 pl-7 font-sans text-sm text-ink outline-none select-none data-disabled:opacity-50 data-highlighted:bg-surface-sunken"
              >
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex text-accent">
                  <Icon name="check" size="sm" />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
