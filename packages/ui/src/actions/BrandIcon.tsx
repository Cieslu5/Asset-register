import { brands, type BrandName } from './icons';

const SIZES = { sm: 14, md: 16, lg: 20 } as const;

export interface BrandIconProps {
  brand: BrandName;
  /** Nazwa marki jako tekst alternatywny, np. „Google Workspace”. */
  title: string;
  size?: keyof typeof SIZES;
  /** Kolor marki zamiast koloru tekstu. Domyślnie wyłączony, żeby logotypy nie konkurowały z akcentem. */
  colored?: boolean;
}

export function BrandIcon({ brand, title, size = 'md', colored = false }: BrandIconProps) {
  const Logo = brands[brand];
  return (
    <Logo
      title={title}
      size={SIZES[size]}
      color={colored ? 'default' : 'currentColor'}
      className="shrink-0"
      role="img"
    />
  );
}
