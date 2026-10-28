'use client';

import { useId, type ReactNode, type Ref } from 'react';
import {
  useController,
  type Control,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
} from 'react-hook-form';

export interface FieldBinding<TValue> {
  id: string;
  labelId: string;
  name: string;
  value: TValue;
  onChange: (value: TValue) => void;
  onBlur: () => void;
  ref: Ref<HTMLElement>;
  invalid: boolean;
  required: boolean;
  'aria-describedby': string | undefined;
}

export interface FormFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
  TOutput,
> {
  control: Control<TValues, unknown, TOutput>;
  name: TName;
  label: string;
  hint?: string;
  required?: boolean;
  /** `inline` stawia etykietę obok pola: dla Checkbox i Switch. */
  layout?: 'stacked' | 'inline';
  children: (field: FieldBinding<FieldPathValue<TValues, TName>>) => ReactNode;
}

export function FormField<TValues extends FieldValues, TName extends FieldPath<TValues>, TOutput>({
  control,
  name,
  label,
  hint,
  required = false,
  layout = 'stacked',
  children,
}: FormFieldProps<TValues, TName, TOutput>) {
  const { field, fieldState } = useController({ control, name });
  const id = useId();
  const labelId = `${id}-label`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const error = fieldState.error?.message;
  const describedBy = error !== undefined ? errorId : hint ? hintId : undefined;

  const fieldControl = children({
    id,
    labelId,
    name: field.name,
    value: field.value,
    onChange: field.onChange,
    onBlur: field.onBlur,
    ref: field.ref,
    invalid: error !== undefined,
    required,
    'aria-describedby': describedBy,
  });

  const labelElement = (
    <label id={labelId} htmlFor={id} className="font-sans text-sm font-medium text-ink">
      {label}
      {required && (
        <span aria-hidden className="ml-0.5 text-danger">
          *
        </span>
      )}
    </label>
  );

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      {layout === 'inline' ? (
        <div className="flex items-center gap-2">
          {fieldControl}
          {labelElement}
        </div>
      ) : (
        <>
          {labelElement}
          {fieldControl}
        </>
      )}
      {hint && !error && (
        <p id={hintId} className="font-sans text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="font-sans text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
