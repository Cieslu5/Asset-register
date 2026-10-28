import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';

const iconButton = cva(
  [
    'inline-flex shrink-0 items-center justify-center rounded-md transition-colors duration-(--duration-fast)',
    'active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress',
  ],
  {
    variants: {
      variant: {
        ghost:
          'text-ink-muted hover:bg-surface-sunken hover:text-ink data-[state=open]:bg-surface-sunken',
        secondary: 'border border-line-strong bg-surface text-ink hover:bg-surface-sunken',
        danger: 'text-danger hover:bg-danger-soft',
      },
      size: {
        sm: 'size-8',
        md: 'size-9',
      },
    },
    defaultVariants: { variant: 'ghost', size: 'md' },
  },
);

export interface IconButtonProps
  extends
    VariantProps<typeof iconButton>,
    Omit<ComponentPropsWithRef<'button'>, 'className' | 'style' | 'children' | 'aria-label'> {
  icon: IconName;
  /** Wymagana: przycisk z samą ikoną nie ma innego tekstu dla czytnika ekranu. */
  label: string;
  loading?: boolean;
}

export function IconButton({
  icon,
  label,
  variant,
  size,
  loading = false,
  disabled,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-label={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={iconButton({ variant, size })}
    >
      <Icon name={loading ? 'loader' : icon} spin={loading} />
    </button>
  );
}
