import type { ReactNode } from 'react';

export interface ToolbarProps {
  start: ReactNode;
  end?: ReactNode;
}

export function Toolbar({ start, end }: ToolbarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{start}</div>
      {end && <div className="flex shrink-0 flex-wrap items-center gap-2">{end}</div>}
    </div>
  );
}
