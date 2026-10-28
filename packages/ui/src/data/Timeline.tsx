import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { Icon } from '../actions/Icon';
import type { IconName } from '../actions/icons';
import { DateText } from '../text/DateText';

export type TimelineEntry =
  | {
      kind: 'event';
      id: string;
      icon: IconName;
      tone?: 'neutral' | 'accent' | 'danger';
      title: ReactNode;
      description?: ReactNode;
      actor: string;
      at: string;
    }
  | { kind: 'comment'; id: string; body: string; actor: string; at: string };

export interface TimelineProps {
  entries: TimelineEntry[];
  /** Podpis komentarza dla czytnika ekranu, np. „Komentarz”. */
  commentLabel: string;
}

const marker = cva(
  'relative z-10 inline-flex size-7 shrink-0 items-center justify-center rounded-full border bg-surface',
  {
    variants: {
      tone: {
        neutral: 'border-line-strong text-ink-muted',
        accent: 'border-accent text-accent',
        danger: 'border-danger text-danger',
      },
    },
  },
);

export function Timeline({ entries, commentLabel }: TimelineProps) {
  return (
    <ol className="relative flex flex-col gap-5 before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-px before:bg-line">
      {entries.map((entry) => (
        <li key={entry.id} className="flex min-w-0 gap-3">
          {entry.kind === 'event' ? (
            <>
              <span className={marker({ tone: entry.tone ?? 'neutral' })}>
                <Icon name={entry.icon} size="sm" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1">
                <p className="font-sans text-sm text-ink">{entry.title}</p>
                {entry.description && (
                  <div className="font-sans text-sm text-ink-muted">{entry.description}</div>
                )}
                <p className="font-sans text-xs text-ink-subtle">
                  {entry.actor} · <DateText value={entry.at} format="datetime" />
                </p>
              </div>
            </>
          ) : (
            <>
              <span className={marker({ tone: 'neutral' })}>
                <Icon name="message" size="sm" label={commentLabel} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="pt-1 font-sans text-xs text-ink-subtle">
                  <span className="font-medium text-ink">{entry.actor}</span> ·{' '}
                  <DateText value={entry.at} format="datetime" />
                </p>
                <p className="rounded-md border border-line bg-surface px-3 py-2 font-sans text-sm whitespace-pre-line text-ink">
                  {entry.body}
                </p>
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}
