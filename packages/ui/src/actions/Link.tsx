'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { RouterLink } from './LinkProvider';

const link = cva(
  'inline-flex items-baseline gap-1 rounded-sm font-sans underline-offset-2 transition-colors duration-(--duration-fast)',
  {
    variants: {
      variant: {
        inline: 'text-accent underline decoration-accent/40 hover:decoration-accent',
        standalone: 'text-accent hover:underline',
        muted: 'text-ink-muted hover:text-ink hover:underline',
      },
    },
    defaultVariants: { variant: 'standalone' },
  },
);

export interface LinkProps extends VariantProps<typeof link> {
  href: string;
  children: ReactNode;
  /** Adres poza aplikacją: otwiera się w nowej karcie, a tekst trafia do czytnika ekranu przy ikonie. */
  external?: { newTabLabel: string };
}

export function Link({ href, variant, external, children }: LinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={link({ variant })}>
        {children}
        <span className="self-center">
          <Icon name="external-link" size="sm" label={external.newTabLabel} />
        </span>
      </a>
    );
  }

  return (
    <RouterLink href={href} className={link({ variant })}>
      {children}
    </RouterLink>
  );
}
