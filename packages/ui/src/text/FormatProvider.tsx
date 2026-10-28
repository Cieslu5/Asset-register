'use client';

import { createContext, useContext, type ReactNode } from 'react';

interface FormatSettings {
  locale: string;
  timeZone: string;
}

const FormatContext = createContext<FormatSettings>({ locale: 'pl-PL', timeZone: 'Europe/Warsaw' });

export interface FormatProviderProps extends FormatSettings {
  children: ReactNode;
}

export function FormatProvider({ locale, timeZone, children }: FormatProviderProps) {
  return <FormatContext value={{ locale, timeZone }}>{children}</FormatContext>;
}

export function useFormatSettings(): FormatSettings {
  return useContext(FormatContext);
}
