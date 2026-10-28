'use client';

import { useId } from 'react';
import { IconButton } from '../actions/IconButton';
import { Select } from '../forms/Select';

export interface PaginationTexts {
  /** Np. „1-25 z 1248”; liczby formatuje warstwa tłumaczeń. */
  range: (from: number, to: number, total: number) => string;
  previous: string;
  next: string;
  pageSize: string;
}

export interface PaginationProps {
  /** Numer strony od 1. */
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  texts: PaginationTexts;
}

export function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [25, 50, 100],
  texts,
}: PaginationProps) {
  const pageSizeLabelId = useId();
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-sans text-sm text-ink-muted">
      <p aria-live="polite" className="tabular-nums">
        {texts.range(from, to, totalCount)}
      </p>
      <div className="flex items-center gap-3">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span id={pageSizeLabelId} className="whitespace-nowrap">
              {texts.pageSize}
            </span>
            <div className="w-20">
              <Select
                value={String(pageSize)}
                onChange={(value) => value && onPageSizeChange(Number(value))}
                options={pageSizeOptions.map((size) => ({
                  value: String(size),
                  label: String(size),
                }))}
                aria-describedby={pageSizeLabelId}
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <IconButton
            icon="chevron-left"
            label={texts.previous}
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          />
          <IconButton
            icon="chevron-right"
            label={texts.next}
            variant="secondary"
            size="sm"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          />
        </div>
      </div>
    </div>
  );
}
