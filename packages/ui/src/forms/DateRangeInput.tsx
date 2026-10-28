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

export interface DateRange {
  from: string | null;
  to: string | null;
}

export interface DateRangeInputProps extends FieldControlProps<DateRange> {
  placeholder: string;
  clearLabel: string;
}

export function DateRangeInput({
  value,
  onChange,
  onBlur,
  id,
  ref,
  invalid = false,
  disabled,
  placeholder,
  clearLabel,
  'aria-describedby': describedBy,
}: DateRangeInputProps) {
  const { locale } = useFormatSettings();
  const [open, setOpen] = useState(false);
  const hasValue = value.from !== null || value.to !== null;
  const label =
    value.from && value.to
      ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).formatRange(
          fromIsoDate(value.from),
          fromIsoDate(value.to),
        )
      : value.from
        ? `${formatIsoDate(value.from, locale)} ...`
        : placeholder;

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
          <span className={`truncate tabular-nums ${hasValue ? '' : 'text-ink-subtle'}`}>
            {label}
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
              mode="range"
              selected={{
                from: value.from ? fromIsoDate(value.from) : undefined,
                to: value.to ? fromIsoDate(value.to) : undefined,
              }}
              {...(value.from && { defaultMonth: fromIsoDate(value.from) })}
              onSelect={(range) =>
                onChange({
                  from: range?.from ? toIsoDate(range.from) : null,
                  to: range?.to ? toIsoDate(range.to) : null,
                })
              }
              locale={calendarLocale(locale)}
              classNames={calendarClassNames}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {hasValue && !disabled && (
        <IconButton
          icon="x"
          label={clearLabel}
          size="sm"
          onClick={() => onChange({ from: null, to: null })}
        />
      )}
    </div>
  );
}
