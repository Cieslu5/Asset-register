'use client';

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { Icon } from '../actions/Icon';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
}

export interface ComboboxSource {
  /** Lista lokalna, filtrowana w przeglądarce. */
  options?: ComboboxOption[];
  /** Wyszukiwanie po stronie serwera, np. pracownicy; wywoływane z opóźnieniem 250 ms. */
  loadOptions?: (query: string) => Promise<ComboboxOption[]>;
}

export interface ComboboxTexts {
  searchPlaceholder: string;
  emptyText: string;
  loadingText: string;
}

interface ComboboxListProps extends ComboboxSource, ComboboxTexts {
  isSelected: (option: ComboboxOption) => boolean;
  onSelect: (option: ComboboxOption) => void;
}

const SEARCH_DELAY_MS = 250;

export function ComboboxList({
  options,
  loadOptions,
  searchPlaceholder,
  emptyText,
  loadingText,
  isSelected,
  onSelect,
}: ComboboxListProps) {
  const [query, setQuery] = useState('');
  const [remote, setRemote] = useState<{ query: string; options: ComboboxOption[] } | null>(null);

  useEffect(() => {
    if (!loadOptions) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      void loadOptions(query).then((loaded) => {
        if (!cancelled) setRemote({ query, options: loaded });
      });
    }, SEARCH_DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [loadOptions, query]);

  const loading = loadOptions !== undefined && remote?.query !== query;
  const visible = loadOptions ? (remote?.options ?? []) : (options ?? []);

  return (
    <Command shouldFilter={!loadOptions} className="flex flex-col">
      <div className="flex items-center gap-2 border-b border-line px-3 text-ink-subtle">
        <Icon name="search" />
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder={searchPlaceholder}
          className="h-9 min-w-0 flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:outline-none"
        />
      </div>
      <Command.List className="max-h-64 overflow-y-auto p-1">
        {loading ? (
          <Command.Loading>
            <p className="px-2 py-3 font-sans text-sm text-ink-muted">{loadingText}</p>
          </Command.Loading>
        ) : (
          <Command.Empty className="px-2 py-3 font-sans text-sm text-ink-muted">
            {emptyText}
          </Command.Empty>
        )}
        {!loading &&
          visible.map((option) => (
            <Command.Item
              key={option.value}
              value={`${option.label} ${option.description ?? ''} ${option.value}`}
              onSelect={() => onSelect(option)}
              className="flex cursor-default items-start gap-2 rounded-md px-2 py-1.5 font-sans text-sm text-ink outline-none select-none data-[selected=true]:bg-surface-sunken"
            >
              <span className={`mt-0.5 text-accent ${isSelected(option) ? '' : 'invisible'}`}>
                <Icon name="check" size="sm" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate">{option.label}</span>
                {option.description && (
                  <span className="truncate text-ink-muted">{option.description}</span>
                )}
              </span>
            </Command.Item>
          ))}
      </Command.List>
    </Command>
  );
}
