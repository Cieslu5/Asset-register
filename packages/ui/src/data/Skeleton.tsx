import { cva, type VariantProps } from 'class-variance-authority';

const skeleton = cva('animate-pulse bg-surface-sunken', {
  variants: {
    shape: {
      line: 'h-3.5 w-full rounded-sm',
      block: 'h-24 w-full rounded-md',
      circle: 'size-8 rounded-full',
    },
  },
  defaultVariants: { shape: 'line' },
});

// Ostatnia linia akapitu jest krótsza, żeby szkielet przypominał tekst, a nie tabelkę.
const LINE_WIDTHS = ['100%', '92%', '96%', '70%'];

export interface SkeletonProps extends VariantProps<typeof skeleton> {
  lines?: number;
}

export function Skeleton({ shape, lines = 1 }: SkeletonProps) {
  if (shape !== 'line' && shape !== undefined && shape !== null) {
    return <span aria-hidden className={`block ${skeleton({ shape })}`} />;
  }
  return (
    <span aria-hidden className="flex w-full flex-col gap-2">
      {Array.from({ length: lines }, (_, index) => (
        <span
          key={index}
          className={skeleton({ shape: 'line' })}
          style={{
            width: index === lines - 1 && lines > 1 ? LINE_WIDTHS[3] : LINE_WIDTHS[index % 3],
          }}
        />
      ))}
    </span>
  );
}
