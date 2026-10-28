import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

const cluster = cva('flex min-w-0 flex-wrap', {
  variants: {
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
    align: {
      center: 'items-center',
      start: 'items-start',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      between: 'justify-between',
      end: 'justify-end',
    },
  },
  defaultVariants: { gap: 'sm', align: 'center', justify: 'start' },
});

export interface ClusterProps extends VariantProps<typeof cluster> {
  as?: 'div' | 'ul';
  children: ReactNode;
}

export function Cluster({ as: Element = 'div', gap, align, justify, children }: ClusterProps) {
  return <Element className={cluster({ gap, align, justify })}>{children}</Element>;
}
