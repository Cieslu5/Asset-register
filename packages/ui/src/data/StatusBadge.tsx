import { cva } from 'class-variance-authority';

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

const badge = cva(
  'inline-flex h-6 max-w-full items-center gap-1.5 rounded-sm px-2 font-sans text-xs font-medium whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'bg-surface-sunken text-ink-muted',
        info: 'bg-accent-soft text-accent',
        success: 'bg-success-soft text-success',
        warning: 'bg-warning-soft text-warning',
        danger: 'bg-danger-soft text-danger',
      },
    },
  },
);

const dot = cva('size-1.5 shrink-0 rounded-full', {
  variants: {
    tone: {
      neutral: 'bg-ink-subtle',
      info: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
    },
  },
});

export interface StatusBadgeProps {
  /** Status zawsze słowem; kolor tylko go wzmacnia. Mapowanie status → ton robi moduł. */
  label: string;
  tone: StatusTone;
}

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span className={badge({ tone })}>
      <span aria-hidden className={dot({ tone })} />
      <span className="truncate">{label}</span>
    </span>
  );
}
