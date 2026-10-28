export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ orientation = 'horizontal' }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div role="separator" aria-orientation="vertical" className="w-px self-stretch bg-line" />
    );
  }
  return <hr className="h-px w-full border-0 bg-line" />;
}
