'use client';

import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { get, useFormContext, useFormState } from 'react-hook-form';
import { Button } from '../actions/Button';
import type { IconName } from '../actions/icons';
import { Stepper } from '../navigation/Stepper';
import { SubmitButton } from './Form';

export interface StepperFormStep {
  key: string;
  label: string;
  icon: IconName;
  /** Pola walidowane przed przejściem dalej i wskazujące krok z błędem po zapisie. */
  fields: string[];
  content: ReactNode;
}

export interface StepperFormTexts {
  stepsLabel: string;
  previous: string;
  next: string;
  submit: string;
}

export interface StepperFormProps {
  steps: StepperFormStep[];
  texts: StepperFormTexts;
}

// Używany wewnątrz Form bez `submitLabel`: zapisać można z każdego kroku, a błąd przenosi do kroku z polem.
export function StepperForm({ steps, texts }: StepperFormProps) {
  const { trigger } = useFormContext();
  const { errors, submitCount } = useFormState();
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const [handledSubmit, setHandledSubmit] = useState(submitCount);

  const stepHasError = (step: StepperFormStep) =>
    step.fields.some((field) => get(errors, field) !== undefined);

  if (submitCount !== handledSubmit) {
    setHandledSubmit(submitCount);
    const firstInvalid = steps.findIndex(stepHasError);
    if (firstInvalid !== -1) setCurrent(firstInvalid);
  }

  const goTo = async (index: number) => {
    const movingForward = index > current;
    const currentStep = steps[current];
    if (movingForward && currentStep && !(await trigger(currentStep.fields))) return;
    setCurrent(index);
    setVisited((previous) => new Set(previous).add(index));
  };

  const isLast = current === steps.length - 1;

  // Enter w polu tekstowym przechodzi dalej zamiast wysyłać formularz z niewypełnionymi krokami.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' || isLast || !(event.target instanceof HTMLInputElement)) return;
    event.preventDefault();
    void goTo(current + 1);
  };

  const stepperSteps = steps.map((step, index) => ({
    key: step.key,
    label: step.label,
    icon: step.icon,
    complete: visited.has(index) && index !== current,
    invalid: stepHasError(step),
  }));

  return (
    <div className="flex min-w-0 flex-col gap-5 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <div className="hidden md:block">
        <Stepper steps={stepperSteps} current={current} onSelect={goTo} label={texts.stepsLabel} />
      </div>
      <div className="md:hidden">
        <Stepper
          steps={stepperSteps}
          current={current}
          onSelect={goTo}
          label={texts.stepsLabel}
          orientation="horizontal"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex min-w-0 flex-col gap-5" onKeyDown={handleKeyDown}>
          {steps.map((step, index) => (
            <div key={step.key} hidden={index !== current} className="flex min-w-0 flex-col gap-5">
              {step.content}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
          <Button
            variant="ghost"
            icon="chevron-left"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            {texts.previous}
          </Button>
          <div className="flex flex-wrap gap-2">
            {!isLast && <Button onClick={() => goTo(current + 1)}>{texts.next}</Button>}
            <SubmitButton label={texts.submit} />
          </div>
        </div>
      </div>
    </div>
  );
}
