import { cva } from 'class-variance-authority';
import { Icon } from '../actions/Icon';
import type { IconName } from '../actions/icons';

export interface StepperStep {
  key: string;
  label: string;
  icon: IconName;
  complete?: boolean;
  invalid?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  current: number;
  onSelect: (index: number) => void;
  orientation?: 'vertical' | 'horizontal';
  label: string;
}

const marker = cva(
  'inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-(--duration-fast)',
  {
    variants: {
      state: {
        current: 'border-accent bg-accent text-on-accent',
        complete: 'border-accent bg-accent-soft text-accent',
        invalid: 'border-danger bg-danger-soft text-danger',
        upcoming: 'border-line-strong bg-surface text-ink-muted',
      },
    },
  },
);

function stateOf(step: StepperStep, index: number, current: number) {
  if (step.invalid) return 'invalid';
  if (index === current) return 'current';
  return step.complete ? 'complete' : 'upcoming';
}

const MARKER_ICON = { invalid: 'warning', complete: 'check' } as const;

export function Stepper({
  steps,
  current,
  onSelect,
  orientation = 'vertical',
  label,
}: StepperProps) {
  const vertical = orientation === 'vertical';

  return (
    <nav aria-label={label}>
      <ol className={vertical ? 'flex flex-col' : 'flex items-center gap-2'}>
        {steps.map((step, index) => {
          const state = stateOf(step, index, current);
          const isCurrent = index === current;
          const isLast = index === steps.length - 1;
          const markerIcon =
            state === 'invalid' || state === 'complete' ? MARKER_ICON[state] : step.icon;

          return (
            <li
              key={step.key}
              className={vertical ? 'relative flex flex-col' : 'flex min-w-0 items-center gap-2'}
            >
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex min-w-0 items-center gap-3 rounded-md py-1 pr-2 text-left font-sans text-sm"
              >
                <span className={marker({ state })}>
                  <Icon name={markerIcon} size="sm" />
                </span>
                <span
                  className={`truncate ${isCurrent ? 'font-medium text-ink' : 'text-ink-muted'} ${vertical || isCurrent ? '' : 'sr-only sm:not-sr-only'}`}
                >
                  {step.label}
                </span>
              </button>
              {!isLast &&
                (vertical ? (
                  <span aria-hidden className="ml-3.5 h-4 w-px bg-line-strong" />
                ) : (
                  <span aria-hidden className="h-px w-6 shrink-0 bg-line-strong" />
                ))}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
