import React, { useState } from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  variant?: 'default' | 'rounded' | 'square' | 'switch';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  variant = 'default',
  size = 'medium',
  color = 'primary',
  helperText,
  error = false,
  errorMessage,
  className = '',
  id,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    
    const newValue = !checked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`jv-checkbox-wrapper ${className}`}>
      <label
        className={`jv-checkbox-container ${variant} ${size} ${color} ${
          disabled ? 'disabled' : ''
        } ${error ? 'error' : ''}`}
        htmlFor={checkboxId}
      >
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="jv-checkbox-input"
          ref={(input) => {
            if (input && indeterminate) {
              input.indeterminate = true;
            }
          }}
        />
        <span className={`jv-checkbox-box ${indeterminate ? 'indeterminate' : ''}`}>
          {variant === 'switch' ? (
            <span className="jv-checkbox-switch-knob" />
          ) : (
            <>
              {checked && !indeterminate && (
                <svg className="jv-checkbox-check" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {indeterminate && (
                <svg className="jv-checkbox-indeterminate" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 12h12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </>
          )}
        </span>
        {label && <span className="jv-checkbox-label">{label}</span>}
      </label>
      {helperText && !error && (
        <span className="jv-checkbox-helper">{helperText}</span>
      )}
      {error && errorMessage && (
        <span className="jv-checkbox-error">{errorMessage}</span>
      )}
    </div>
  );
};
