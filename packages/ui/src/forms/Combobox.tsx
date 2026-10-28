'use client';

import { Popover } from 'radix-ui';
import { useState, type Ref } from 'react';
import { Icon } from '../actions/Icon';
import { fieldFrame, type FieldControlProps } from './field';
import {
  ComboboxList,
  type ComboboxOption,
  type ComboboxSource,
  type ComboboxTexts,
} from './ComboboxList';

export const popoverPanel =
  'z-(--z-dropdown) w-(--radix-popover-trigger-width) min-w-64 overflow-hidden rounded-lg border border-line bg-surface shadow-md';

export const triggerFocus =
  'cursor-default text-left outline-none focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus/40 aria-invalid:border-danger disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-70';

// Wartość to cała opcja, nie samo id: przy wyszukiwaniu na serwerze etykieta wybranej pozycji nie jest nigdzie indziej znana.
export interface ComboboxProps
  extends FieldControlProps<ComboboxOption | null>, ComboboxSource, ComboboxTexts {
  placeholder: string;
}

export function Combobox({
  value,
  onChange,
  onBlur,
  id,
  ref,
  invalid = false,
  disabled,
  placeholder,
  'aria-describedby': describedBy,
  ...listProps
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.();
      }}
    >
      <Popover.Trigger
        ref={ref as Ref<HTMLButtonElement>}
        id={id}
        disabled={disabled}
        role="combobox"
        aria-expanded={open}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={`${fieldFrame} ${triggerFocus} justify-between`}
      >
        <span className={`truncate ${value ? '' : 'text-ink-subtle'}`}>
          {value?.label ?? placeholder}
        </span>
        <span className="text-ink-subtle">
          <Icon name="chevron-down" />
        </span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={4} collisionPadding={8} className={popoverPanel}>
          <ComboboxList
            {...listProps}
            isSelected={(option) => option.value === value?.value}
            onSelect={(option) => {
              onChange(option.value === value?.value ? null : option);
              setOpen(false);
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
