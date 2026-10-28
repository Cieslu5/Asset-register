'use client';

import { Popover } from 'radix-ui';
import { useState, type Ref } from 'react';
import { Icon } from '../actions/Icon';
import { popoverPanel, triggerFocus } from './Combobox';
import {
  ComboboxList,
  type ComboboxOption,
  type ComboboxSource,
  type ComboboxTexts,
} from './ComboboxList';
import type { FieldControlProps } from './field';

export interface MultiComboboxProps
  extends FieldControlProps<ComboboxOption[]>, ComboboxSource, ComboboxTexts {
  placeholder: string;
  removeLabel: (label: string) => string;
}

export function MultiCombobox({
  value,
  onChange,
  onBlur,
  id,
  ref,
  invalid = false,
  disabled,
  placeholder,
  removeLabel,
  'aria-describedby': describedBy,
  ...listProps
}: MultiComboboxProps) {
  const [open, setOpen] = useState(false);

  const toggle = (option: ComboboxOption) =>
    onChange(
      value.some((selected) => selected.value === option.value)
        ? value.filter((selected) => selected.value !== option.value)
        : [...value, option],
    );

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) onBlur?.();
      }}
    >
      <Popover.Anchor asChild>
        <div
          className={`flex min-h-9 w-full min-w-0 flex-wrap items-center gap-1 rounded-md border bg-surface p-1 transition-colors duration-(--duration-fast) hover:border-ink-subtle has-disabled:bg-surface-sunken has-disabled:opacity-70 ${invalid ? 'border-danger' : 'border-line-strong'}`}
        >
          {value.map((option) => (
            <span
              key={option.value}
              className="inline-flex h-7 items-center gap-1 rounded-sm bg-surface-sunken pr-1 pl-2 font-sans text-sm text-ink"
            >
              {option.label}
              <button
                type="button"
                disabled={disabled}
                aria-label={removeLabel(option.label)}
                onClick={() => toggle(option)}
                className="inline-flex size-5 items-center justify-center rounded-sm text-ink-muted hover:bg-line hover:text-ink"
              >
                <Icon name="x" size="sm" />
              </button>
            </span>
          ))}
          <Popover.Trigger
            ref={ref as Ref<HTMLButtonElement>}
            id={id}
            disabled={disabled}
            role="combobox"
            aria-expanded={open}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={`flex h-7 min-w-24 flex-1 items-center justify-between gap-2 rounded-sm px-2 font-sans text-sm text-ink-subtle ${triggerFocus}`}
          >
            <span className="truncate">{placeholder}</span>
            <Icon name="chevron-down" />
          </Popover.Trigger>
        </div>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={4} collisionPadding={8} className={popoverPanel}>
          <ComboboxList
            {...listProps}
            isSelected={(option) => value.some((selected) => selected.value === option.value)}
            onSelect={toggle}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
