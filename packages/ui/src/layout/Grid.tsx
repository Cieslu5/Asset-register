import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

// Kolumny zwężają się same: na telefonie zawsze jedna, pełna liczba od szerokości lg.
const grid = cva('grid min-w-0 grid-cols-1', {
  variants: {
    columns: {
      1: '',
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-2 lg:grid-cols-4',
    },
    gap: {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: { columns: 2, gap: 'md' },
});

export interface GridProps extends VariantProps<typeof grid> {
  as?: 'div' | 'ul' | 'dl';
  children: ReactNode;
}

export function Grid({ as: Element = 'div', columns, gap, children }: GridProps) {
  return <Element className={grid({ columns, gap })}>{children}</Element>;
}
