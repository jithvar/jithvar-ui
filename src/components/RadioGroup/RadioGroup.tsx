import React, { useState } from 'react';
import { Radio } from '../Radio/Radio';
import './RadioGroup.css';

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  direction?: 'vertical' | 'horizontal';
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'medium',
  color = 'primary',
  direction = 'vertical',
  label,
  helperText,
  error = false,
  errorMessage,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const handleChange = (value: string | number) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  return (
    <div className={`jv-radio-group ${className}`}>
      {label && <label className="jv-radio-group-label">{label}</label>}
      {helperText && !error && (
        <span className="jv-radio-group-helper">{helperText}</span>
      )}
      {error && errorMessage && (
        <span className="jv-radio-group-error">{errorMessage}</span>
      )}

      <div className={`jv-radio-group-options ${direction}`}>
        {options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            value={option.value}
            name={name}
            checked={selectedValue === option.value}
            onChange={handleChange}
            disabled={option.disabled}
            helperText={option.helperText}
            size={size}
            color={color}
            error={error}
          />
        ))}
      </div>
    </div>
  );
};
