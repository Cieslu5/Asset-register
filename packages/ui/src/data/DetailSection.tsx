import { useId, type ReactNode } from 'react';

export interface DetailSectionProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

export function DetailSection({ title, action, children }: DetailSectionProps) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="flex min-w-0 flex-col gap-3">
      <div className="flex min-h-8 items-center justify-between gap-3">
        <h3 id={titleId} className="font-sans text-sm font-semibold text-ink">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}
