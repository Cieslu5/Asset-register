'use client';

import { LinkProvider } from '@repo/ui';
import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

// Komponent linku nie przejdzie jako prop z Server Component, więc podpinamy go tutaj.
export function Providers({ children }: { children: ReactNode }) {
  return <LinkProvider component={Link}>{children}</LinkProvider>;
}
