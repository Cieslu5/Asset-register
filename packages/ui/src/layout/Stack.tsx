import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

const stack = cva('flex min-w-0 flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-10',
    },
    align: {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
    },
  },
  defaultVariants: { gap: 'md', align: 'stretch' },
});

type StackElement = 'div' | 'section' | 'main' | 'ul' | 'ol';

export interface StackProps extends VariantProps<typeof stack> {
  as?: StackElement;
  children: ReactNode;
}

export function Stack({ as: Element = 'div', gap, align, children }: StackProps) {
  return <Element className={stack({ gap, align })}>{children}</Element>;
}
