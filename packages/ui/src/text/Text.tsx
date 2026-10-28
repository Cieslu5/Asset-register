import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

const text = cva('', {
  variants: {
    variant: {
      body: 'font-sans text-base text-ink',
      small: 'font-sans text-sm text-ink',
      muted: 'font-sans text-sm text-ink-muted',
      mono: 'font-mono text-sm text-ink',
    },
  },
  defaultVariants: { variant: 'body' },
});

export interface TextProps extends VariantProps<typeof text> {
  as?: 'p' | 'span';
  children: ReactNode;
}

export function Text({ as: Element = 'p', variant, children }: TextProps) {
  return <Element className={text({ variant })}>{children}</Element>;
}
