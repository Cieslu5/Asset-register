'use client';

import { cva } from 'class-variance-authority';
import { Menu, X, type LucideIcon } from 'lucide-react';
import { useEffect, useId, useState, type ElementType, type ReactNode } from 'react';
import { Icon } from '../actions/Icon';

export interface AppShellNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  current?: boolean;
}

interface NavLinkProps {
  href: string;
  className: string;
  'aria-current'?: 'page' | undefined;
  onClick: () => void;
  children: ReactNode;
}

export interface AppShellProps {
  brand: ReactNode;
  navigation: AppShellNavItem[];
  navigationLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  topBar?: ReactNode;
  /** Np. `Link` z next/link, żeby nawigacja nie przeładowywała strony. */
  linkComponent?: ElementType<NavLinkProps>;
  children: ReactNode;
}

const navLink = cva(
  'flex h-8 items-center gap-2.5 rounded-md px-2.5 font-sans text-sm transition-colors duration-(--duration-fast)',
  {
    variants: {
      current: {
        true: 'bg-surface-sunken font-medium text-ink',
        false: 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
      },
    },
  },
);

export function AppShell({
  brand,
  navigation,
  navigationLabel,
  openMenuLabel,
  closeMenuLabel,
  topBar,
  linkComponent: LinkComponent = 'a',
  children,
}: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-line bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-r">
        <div className="flex h-14 items-center justify-between gap-2 border-b border-line px-4 lg:border-b-0">
          <div className="min-w-0 font-sans text-base font-semibold text-ink">{brand}</div>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken hover:text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={navId}
            aria-label={menuOpen ? closeMenuLabel : openMenuLabel}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon icon={menuOpen ? X : Menu} />
          </button>
        </div>
        <nav
          id={navId}
          aria-label={navigationLabel}
          className={`${menuOpen ? 'block' : 'hidden'} border-b border-line px-2 py-2 lg:block lg:flex-1 lg:overflow-y-auto lg:border-b-0`}
        >
          <ul className="flex flex-col gap-0.5">
            {navigation.map((item) => (
              <li key={item.href}>
                <LinkComponent
                  href={item.href}
                  className={navLink({ current: item.current ?? false })}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon icon={item.icon} />
                  <span className="truncate">{item.label}</span>
                </LinkComponent>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex min-w-0 flex-col">
        {topBar && (
          <div className="flex h-14 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6">
            {topBar}
          </div>
        )}
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
