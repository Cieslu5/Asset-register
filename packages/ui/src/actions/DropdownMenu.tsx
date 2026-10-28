'use client';

import { cva } from 'class-variance-authority';
import { DropdownMenu as Menu } from 'radix-ui';
import type { ReactElement } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';

export type DropdownMenuEntry =
  | {
      kind: 'item';
      label: string;
      icon?: IconName;
      onSelect: () => void;
      danger?: boolean;
      disabled?: boolean;
    }
  | { kind: 'separator' };

export interface DropdownMenuProps {
  /** `Button` albo `IconButton`; dostaje stan otwarcia i obsługę klawiatury z Radix. */
  trigger: ReactElement;
  entries: DropdownMenuEntry[];
  align?: 'start' | 'end';
}

const item = cva(
  'flex h-8 cursor-default items-center gap-2 rounded-md px-2 font-sans text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50',
  {
    variants: {
      danger: {
        true: 'text-danger data-highlighted:bg-danger-soft',
        false: 'text-ink data-highlighted:bg-surface-sunken',
      },
    },
  },
);

export function DropdownMenu({ trigger, entries, align = 'end' }: DropdownMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          align={align}
          sideOffset={4}
          collisionPadding={8}
          className="z-(--z-dropdown) min-w-44 rounded-lg border border-line bg-surface p-1 shadow-md"
        >
          {entries.map((entry, index) =>
            entry.kind === 'separator' ? (
              <Menu.Separator key={`separator-${index}`} className="my-1 h-px bg-line" />
            ) : (
              <Menu.Item
                key={entry.label}
                onSelect={entry.onSelect}
                disabled={entry.disabled ?? false}
                className={item({ danger: entry.danger ?? false })}
              >
                {entry.icon && <Icon name={entry.icon} />}
                {entry.label}
              </Menu.Item>
            ),
          )}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
