'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { RouterLink } from './LinkProvider';

export const buttonStyles = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-sans font-medium whitespace-nowrap select-none',
    'transition-colors duration-(--duration-fast) active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent hover:bg-accent-hover',
        secondary:
          'border border-line-strong bg-surface text-ink hover:bg-surface-sunken data-[state=open]:bg-surface-sunken',
        ghost: 'text-ink hover:bg-surface-sunken data-[state=open]:bg-surface-sunken',
        danger: 'bg-danger text-on-accent hover:bg-danger/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  },
);

interface ButtonOwnProps extends VariantProps<typeof buttonStyles> {
  icon?: IconName;
  children: ReactNode;
}

type NativeButtonProps = Omit<ComponentPropsWithRef<'button'>, 'className' | 'style' | 'children'>;

export type ButtonProps =
  | (ButtonOwnProps & NativeButtonProps & { href?: never; loading?: boolean })
  | (ButtonOwnProps & { href: string });

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, variant, size, icon, children } = props;
    return (
      <RouterLink href={href} className={buttonStyles({ variant, size })}>
        {icon && <Icon name={icon} />}
        {children}
      </RouterLink>
    );
  }

  const {
    variant,
    size,
    icon,
    loading = false,
    disabled,
    type = 'button',
    children,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size })}
    >
      {loading ? <Icon name="loader" spin /> : icon && <Icon name={icon} />}
      {children}
    </button>
  );
}
