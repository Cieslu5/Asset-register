'use client';

import { Popover } from 'radix-ui';
import { useState, type Ref } from 'react';
import { DayPicker } from 'react-day-picker';
import { Icon } from '../actions/Icon';
import { IconButton } from '../actions/IconButton';
import { useFormatSettings } from '../text/FormatProvider';
import {
  calendarClassNames,
  calendarLocale,
  formatIsoDate,
  fromIsoDate,
  toIsoDate,
} from './calendar';
import { triggerFocus } from './Combobox';
import { fieldFrame, type FieldControlProps } from './field';

export interface DateInputProps extends FieldControlProps<string | null> {
  placeholder: string;
  clearLabel: string;
  /** Najwcześniejszy i najpóźniejszy dzień do wyboru, w formacie „YYYY-MM-DD”. */
  min?: string;
  max?: string;
}

export function DateInput({
  value,
  onChange,
  onBlur,
  id,
  ref,
  invalid = false,
  disabled,
  placeholder,
  clearLabel,
  min,
  max,
  'aria-describedby': describedBy,
}: DateInputProps) {
  const { locale } = useFormatSettings();
  const [open, setOpen] = useState(false);
  const selected = value ? fromIsoDate(value) : undefined;

  return (
    <div className="flex min-w-0 items-center gap-1">
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
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={`${fieldFrame} ${triggerFocus} justify-between`}
        >
          <span className={`truncate tabular-nums ${value ? '' : 'text-ink-subtle'}`}>
            {value ? formatIsoDate(value, locale) : placeholder}
          </span>
          <span className="text-ink-subtle">
            <Icon name="calendar" />
          </span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={4}
            collisionPadding={8}
            className="z-(--z-dropdown) rounded-lg border border-line bg-surface shadow-md"
          >
            <DayPicker
              mode="single"
              {...(selected && { selected, defaultMonth: selected })}
              onSelect={(date) => {
                onChange(date ? toIsoDate(date) : null);
                setOpen(false);
              }}
              locale={calendarLocale(locale)}
              disabled={[
                ...(min ? [{ before: fromIsoDate(min) }] : []),
                ...(max ? [{ after: fromIsoDate(max) }] : []),
              ]}
              classNames={calendarClassNames}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {value && !disabled && (
        <IconButton icon="x" label={clearLabel} size="sm" onClick={() => onChange(null)} />
      )}
    </div>
  );
}
