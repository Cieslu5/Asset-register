import type { LucideIcon } from 'lucide-react';

const SIZES = { sm: 14, md: 16, lg: 20 } as const;

export interface IconProps {
  icon: LucideIcon;
  size?: keyof typeof SIZES;
  label?: string;
}

// Bez etykiety ikona jest dekoracją: znaczenie niesie tekst obok.
export function Icon({ icon: Glyph, size = 'md', label }: IconProps) {
  return (
    <Glyph
      size={SIZES[size]}
      strokeWidth={1.75}
      className="shrink-0"
      aria-hidden={label === undefined}
      aria-label={label}
      role={label === undefined ? undefined : 'img'}
    />
  );
}

export type { LucideIcon };
