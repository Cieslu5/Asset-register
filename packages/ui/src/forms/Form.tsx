'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ReactNode } from 'react';
import {
  FormProvider,
  useForm,
  useFormState,
  type FieldValues,
  type Path,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '../actions/Button';

// Ten sam kształt co wynik Server Action z @repo/core, opisany tu strukturalnie, żeby ui nie znało domeny.
export type FormActionResult =
  { ok: true } | { ok: false; error: { code: string; fieldErrors?: Record<string, string[]> } };

export function useZodForm<TInput extends FieldValues, TOutput extends FieldValues>(
  schema: z.ZodType<TOutput, TInput>,
  options: Omit<UseFormProps<TInput, unknown, TOutput>, 'resolver'>,
): UseFormReturn<TInput, unknown, TOutput> {
  return useForm<TInput, unknown, TOutput>({
    mode: 'onTouched',
    ...options,
    resolver: zodResolver(schema),
  });
}

export interface FormProps<TInput extends FieldValues, TOutput> {
  form: UseFormReturn<TInput, unknown, TOutput>;
  onSubmit: (values: TOutput) => Promise<FormActionResult>;
  /** Zamienia kod błędu (`CONFLICT`, `FORBIDDEN`...) na zdanie z instrukcją dla użytkownika. */
  errorMessage: (code: string) => string;
  /** Bez etykiety formularz nie ma stopki, np. gdy przyciski daje StepperForm. */
  submitLabel?: string;
  secondaryAction?: ReactNode;
  children: ReactNode;
}

export function Form<TInput extends FieldValues, TOutput>({
  form,
  onSubmit,
  errorMessage,
  submitLabel,
  secondaryAction,
  children,
}: FormProps<TInput, TOutput>) {
  const [formError, setFormError] = useState<string | null>(null);

  const submit = form.handleSubmit(async (values) => {
    setFormError(null);
    const result = await onSubmit(values);
    if (result.ok) return;
    for (const [field, messages] of Object.entries(result.error.fieldErrors ?? {})) {
      form.setError(field as Path<TInput>, { type: 'server', message: messages[0] ?? '' });
    }
    setFormError(errorMessage(result.error.code));
  });

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={submit} className="flex min-w-0 flex-col gap-5">
        {formError && (
          <p
            role="alert"
            className="rounded-md border border-danger/30 bg-danger-soft px-3 py-2 font-sans text-sm text-danger"
          >
            {formError}
          </p>
        )}
        {children}
        {submitLabel && (
          <div className="flex flex-wrap justify-end gap-2 border-t border-line pt-4">
            {secondaryAction}
            <SubmitButton label={submitLabel} />
          </div>
        )}
      </form>
    </FormProvider>
  );
}

export function SubmitButton({ label }: { label: string }) {
  const { isSubmitting } = useFormState();
  return (
    <Button type="submit" variant="primary" loading={isSubmitting}>
      {label}
    </Button>
  );
}
