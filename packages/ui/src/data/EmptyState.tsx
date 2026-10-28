import type { ReactNode } from 'react';
import { Icon } from '../actions/Icon';
import type { IconName } from '../actions/icons';

export interface EmptyStateProps {
  icon: IconName;
  title: string;
  description: string;
  /** Konkretny następny krok, np. „Dodaj sprzęt” albo „Wyczyść filtry”. */
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-surface-sunken text-ink-muted">
        <Icon name={icon} size="lg" />
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <p className="font-sans text-base font-medium text-ink">{title}</p>
        <p className="font-sans text-sm text-ink-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
