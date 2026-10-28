import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

const heading = cva('font-sans font-semibold tracking-tight text-balance text-ink', {
  variants: {
    level: {
      1: 'text-2xl',
      2: 'text-xl',
      3: 'text-lg',
    },
  },
});

export interface HeadingProps {
  level: 1 | 2 | 3;
  children: ReactNode;
}

export function Heading({ level, children }: HeadingProps) {
  const Element = `h${level}` as const;
  return <Element className={heading({ level })}>{children}</Element>;
}
