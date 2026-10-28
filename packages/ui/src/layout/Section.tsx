import { useId, type ReactNode } from 'react';

export interface SectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Section({ title, description, action, children }: SectionProps) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-line pb-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 id={titleId} className="font-sans text-lg font-semibold text-ink">
            {title}
          </h2>
          {description && <p className="font-sans text-sm text-ink-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
