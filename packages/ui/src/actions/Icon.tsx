import { icons, type IconName } from './icons';

const SIZES = { sm: 14, md: 16, lg: 20 } as const;

export interface IconProps {
  name: IconName;
  size?: keyof typeof SIZES;
  label?: string;
  spin?: boolean;
}

// Bez etykiety ikona jest dekoracją: znaczenie niesie tekst obok.
export function Icon({ name, size = 'md', label, spin = false }: IconProps) {
  const Glyph = icons[name];
  return (
    <Glyph
      size={SIZES[size]}
      strokeWidth={1.75}
      className={spin ? 'shrink-0 animate-spin' : 'shrink-0'}
      aria-hidden={label === undefined}
      aria-label={label}
      role={label === undefined ? undefined : 'img'}
    />
  );
}
