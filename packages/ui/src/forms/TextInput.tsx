import type { Ref } from 'react';
import { Icon } from '../actions/Icon';
import type { IconName } from '../actions/icons';
import { fieldFrame, fieldInput, type FieldControlProps } from './field';

export interface TextInputProps extends FieldControlProps<string> {
  type?: 'text' | 'email' | 'tel' | 'url' | 'search' | 'password';
  icon?: IconName;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
}

export function TextInput({
  value,
  onChange,
  onBlur,
  id,
  name,
  ref,
  invalid = false,
  disabled,
  required,
  type = 'text',
  icon,
  placeholder,
  maxLength,
  autoComplete,
  'aria-describedby': describedBy,
}: TextInputProps) {
  return (
    <div className={fieldFrame}>
      {icon && (
        <span className="text-ink-subtle">
          <Icon name={icon} />
        </span>
      )}
      <input
        ref={ref as Ref<HTMLInputElement>}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={fieldInput}
      />
    </div>
  );
}
