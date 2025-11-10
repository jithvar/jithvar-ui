import React, { useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import './CheckboxList.css';

export interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  helperText?: string;
}

export interface CheckboxListProps {
  options: CheckboxOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (selectedValues: (string | number)[]) => void;
  variant?: 'default' | 'rounded' | 'square' | 'switch';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  direction?: 'vertical' | 'horizontal';
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  selectAll?: boolean;
  className?: string;
}

export const CheckboxList: React.FC<CheckboxListProps> = ({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  variant = 'default',
  size = 'medium',
  color = 'primary',
  direction = 'vertical',
  label,
  helperText,
  error = false,
  errorMessage,
  selectAll = false,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<(string | number)[]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedValues = isControlled ? controlledValue : internalValue;

  const handleChange = (optionValue: string | number, checked: boolean) => {
    let newValues: (string | number)[];
    
    if (checked) {
      newValues = [...selectedValues, optionValue];
    } else {
      newValues = selectedValues.filter((v) => v !== optionValue);
    }

    if (!isControlled) {
      setInternalValue(newValues);
    }
    onChange?.(newValues);
  };

  const handleSelectAll = (checked: boolean) => {
    const newValues = checked ? options.map((opt) => opt.value) : [];
    if (!isControlled) {
      setInternalValue(newValues);
    }
    onChange?.(newValues);
  };

  const allSelected = options.length > 0 && selectedValues.length === options.length;
  const someSelected = selectedValues.length > 0 && selectedValues.length < options.length;

  return (
    <div className={`jv-checkbox-list ${className}`}>
      {label && <label className="jv-checkbox-list-label">{label}</label>}
      {helperText && !error && (
        <span className="jv-checkbox-list-helper">{helperText}</span>
      )}
      {error && errorMessage && (
        <span className="jv-checkbox-list-error">{errorMessage}</span>
      )}
      
      {selectAll && options.length > 1 && (
        <div className="jv-checkbox-list-select-all">
          <Checkbox
            label="Select All"
            checked={allSelected}
            indeterminate={someSelected}
            onChange={handleSelectAll}
            variant={variant}
            size={size}
            color={color}
          />
          <div className="jv-checkbox-list-divider" />
        </div>
      )}

      <div className={`jv-checkbox-list-options ${direction}`}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={selectedValues.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
            disabled={option.disabled}
            helperText={option.helperText}
            variant={variant}
            size={size}
            color={color}
            error={error}
          />
        ))}
      </div>
    </div>
  );
};
