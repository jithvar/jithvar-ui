import React from 'react';
import './Radio.css';

export interface RadioProps {
  label?: string;
  value: string | number;
  name: string;
  checked?: boolean;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  helperText?: string;
  error?: boolean;
  className?: string;
  id?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  value,
  name,
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  color = 'primary',
  helperText,
  error = false,
  className = '',
  id,
}) => {
  const handleChange = () => {
    if (disabled) return;
    onChange?.(value);
  };

  const radioId = id || `radio-${name}-${value}`;

  return (
    <div className={`jv-radio-wrapper ${className}`}>
      <label
        className={`jv-radio-container ${size} ${color} ${disabled ? 'disabled' : ''} ${
          error ? 'error' : ''
        }`}
        htmlFor={radioId}
      >
        <input
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="jv-radio-input"
        />
        <span className="jv-radio-box">
          <span className="jv-radio-dot" />
        </span>
        {label && <span className="jv-radio-label">{label}</span>}
      </label>
      {helperText && <span className="jv-radio-helper">{helperText}</span>}
    </div>
  );
};
