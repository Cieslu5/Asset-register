'use client';

import { createContext, createElement, useContext, type ElementType, type ReactNode } from 'react';

export interface RouterLinkProps {
  href: string;
  className?: string;
  'aria-current'?: 'page' | undefined;
  onClick?: () => void;
  children: ReactNode;
}

const LinkContext = createContext<ElementType<RouterLinkProps>>('a');

export interface LinkProviderProps {
  /** Link routera aplikacji (np. z next-intl), żeby nawigacja nie przeładowywała strony. */
  component: ElementType<RouterLinkProps>;
  children: ReactNode;
}

export function LinkProvider({ component, children }: LinkProviderProps) {
  return <LinkContext value={component}>{children}</LinkContext>;
}

export function RouterLink(props: RouterLinkProps) {
  return createElement(useContext(LinkContext), props);
}
