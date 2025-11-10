import React, { useState } from 'react';
import './ToggleButtons.css';

export interface ToggleOption {
  label: string;
  value: string | number;
  icon?: string;
  disabled?: boolean;
}

export interface ToggleButtonsProps {
  options: ToggleOption[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  multiple?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  fullWidth?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  multiple = false,
  size = 'medium',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  label,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(
    defaultValue ?? (multiple ? [] : '')
  );

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const isSelected = (optionValue: string | number): boolean => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(optionValue);
    }
    return selectedValue === optionValue;
  };

  const handleClick = (optionValue: string | number, optionDisabled?: boolean) => {
    if (disabled || optionDisabled) return;

    let newValue: string | number | (string | number)[];

    if (multiple) {
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter((v) => v !== optionValue);
      } else {
        newValue = [...currentArray, optionValue];
      }
    } else {
      newValue = optionValue;
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className={`jv-toggle-buttons-wrapper ${className}`}>
      {label && <label className="jv-toggle-buttons-label">{label}</label>}
      <div
        className={`jv-toggle-buttons ${size} ${color} ${fullWidth ? 'full-width' : ''} ${
          disabled ? 'disabled' : ''
        }`}
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            className={`jv-toggle-button ${isSelected(option.value) ? 'selected' : ''} ${
              option.disabled ? 'disabled' : ''
            } ${index === 0 ? 'first' : ''} ${index === options.length - 1 ? 'last' : ''}`}
            onClick={() => handleClick(option.value, option.disabled)}
            disabled={disabled || option.disabled}
          >
            {option.icon && <span className="jv-toggle-button-icon">{option.icon}</span>}
            <span className="jv-toggle-button-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
