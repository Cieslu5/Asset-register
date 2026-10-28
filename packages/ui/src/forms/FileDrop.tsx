'use client';

import { useEffect, useId, useMemo, useState, type DragEvent, type Ref } from 'react';
import { Icon } from '../actions/Icon';
import { IconButton } from '../actions/IconButton';
import { useFormatSettings } from '../text/FormatProvider';
import type { FieldControlProps } from './field';

export interface FileDropTexts {
  title: string;
  hint: string;
  remove: (fileName: string) => string;
  tooLarge: (fileName: string) => string;
  wrongType: (fileName: string) => string;
}

export interface FileDropProps extends FieldControlProps<File[]> {
  /** Typy MIME, np. `application/pdf`, albo grupy, np. `image/*`. */
  accept: string[];
  maxSizeMb: number;
  multiple?: boolean;
  texts: FileDropTexts;
}

function matchesType(file: File, accept: string[]): boolean {
  return accept.some((type) =>
    type.endsWith('/*') ? file.type.startsWith(type.slice(0, -1)) : file.type === type,
  );
}

function FileThumbnail({ file }: { file: File }) {
  const url = useMemo(
    () => (file.type.startsWith('image/') ? URL.createObjectURL(file) : null),
    [file],
  );
  useEffect(() => () => (url ? URL.revokeObjectURL(url) : undefined), [url]);

  if (!url) {
    return (
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-sunken text-ink-muted">
        <Icon name="file-text" />
      </span>
    );
  }
  return <img src={url} alt="" className="size-10 shrink-0 rounded-md object-cover" />;
}

export function FileDrop({
  value,
  onChange,
  onBlur,
  id,
  ref,
  invalid = false,
  disabled = false,
  accept,
  maxSizeMb,
  multiple = false,
  texts,
  'aria-describedby': describedBy,
}: FileDropProps) {
  const { locale } = useFormatSettings();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [dragging, setDragging] = useState(false);
  const [rejections, setRejections] = useState<string[]>([]);
  const sizeFormat = new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: 'megabyte',
    maximumFractionDigits: 1,
  });

  const addFiles = (incoming: File[]) => {
    const problems: string[] = [];
    const accepted = incoming.filter((file) => {
      if (!matchesType(file, accept)) problems.push(texts.wrongType(file.name));
      else if (file.size > maxSizeMb * 1024 * 1024) problems.push(texts.tooLarge(file.name));
      else return true;
      return false;
    });
    setRejections(problems);
    if (accepted.length > 0) onChange(multiple ? [...value, ...accepted] : accepted.slice(0, 1));
    onBlur?.();
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled) addFiles(Array.from(event.dataTransfer.files));
  };

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-dashed px-4 py-6 text-center transition-colors duration-(--duration-fast) has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus has-disabled:cursor-not-allowed has-disabled:opacity-60 ${
          dragging
            ? 'border-accent bg-accent-soft'
            : invalid
              ? 'border-danger bg-surface'
              : 'border-line-strong bg-surface hover:bg-surface-sunken'
        }`}
      >
        <span className="text-ink-muted">
          <Icon name="upload" size="lg" />
        </span>
        <span className="font-sans text-sm font-medium text-ink">{texts.title}</span>
        <span className="font-sans text-sm text-ink-muted">{texts.hint}</span>
        <input
          ref={ref as Ref<HTMLInputElement>}
          id={inputId}
          type="file"
          accept={accept.join(',')}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => {
            addFiles(Array.from(event.target.files ?? []));
            event.target.value = '';
          }}
          className="sr-only"
        />
      </label>
      {rejections.length > 0 && (
        <ul role="alert" className="flex flex-col gap-0.5">
          {rejections.map((message) => (
            <li key={message} className="font-sans text-sm text-danger">
              {message}
            </li>
          ))}
        </ul>
      )}
      {value.length > 0 && (
        <ul className="flex flex-col divide-y divide-line rounded-lg border border-line bg-surface">
          {value.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center gap-3 px-3 py-2">
              <FileThumbnail file={file} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-sans text-sm text-ink">{file.name}</span>
                <span className="font-sans text-sm text-ink-muted tabular-nums">
                  {sizeFormat.format(file.size / 1024 / 1024)}
                </span>
              </span>
              <IconButton
                icon="x"
                label={texts.remove(file.name)}
                size="sm"
                disabled={disabled}
                onClick={() => onChange(value.filter((_, position) => position !== index))}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
