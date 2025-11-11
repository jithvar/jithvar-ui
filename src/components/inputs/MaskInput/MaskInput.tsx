import React, { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import './MaskInput.css';

export interface MaskInputProps {
  mask: string; // Mask format: 9=digit, a=letter, *=alphanumeric, others are literals
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, maskedValue: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  label?: string;
  showMaskOnFocus?: boolean;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export const MaskInput: React.FC<MaskInputProps> = ({
  mask,
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder,
  size = 'medium',
  disabled = false,
  error = false,
  helperText,
  errorMessage,
  label,
  showMaskOnFocus = true,
  className = '',
  containerClassName = '',
  inputClassName = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const getMaskChar = (char: string): 'digit' | 'letter' | 'alphanumeric' | 'literal' => {
    if (char === '9') return 'digit';
    if (char === 'a') return 'letter';
    if (char === '*') return 'alphanumeric';
    return 'literal';
  };

  const isValidChar = (char: string, maskChar: string): boolean => {
    const type = getMaskChar(maskChar);
    if (type === 'digit') return /\d/.test(char);
    if (type === 'letter') return /[a-zA-Z]/.test(char);
    if (type === 'alphanumeric') return /[a-zA-Z0-9]/.test(char);
    return false;
  };

  const applyMask = (rawValue: string): { maskedValue: string; cleanValue: string } => {
    let maskedValue = '';
    let cleanValue = '';
    let rawIndex = 0;

    for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
      const maskChar = mask[i];
      const type = getMaskChar(maskChar);

      if (type === 'literal') {
        maskedValue += maskChar;
        if (rawValue[rawIndex] === maskChar) {
          rawIndex++;
        }
      } else {
        while (rawIndex < rawValue.length && !isValidChar(rawValue[rawIndex], maskChar)) {
          rawIndex++;
        }

        if (rawIndex < rawValue.length) {
          maskedValue += rawValue[rawIndex];
          cleanValue += rawValue[rawIndex];
          rawIndex++;
        }
      }
    }

    return { maskedValue, cleanValue };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const { maskedValue, cleanValue } = applyMask(inputValue);

    if (!isControlled) {
      setInternalValue(maskedValue);
    }
    onChange?.(cleanValue, maskedValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, arrow keys, etc.
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'];
    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
  };

  const getPlaceholder = (): string => {
    if (placeholder) return placeholder;
    if (showMaskOnFocus && isFocused) {
      return mask;
    }
    return '';
  };

  return (
    <div className={`jv-mask-input-wrapper ${className} ${containerClassName}`}>
      {label && <label className="jv-mask-input-label">{label}</label>}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={getPlaceholder()}
        disabled={disabled}
        className={`jv-mask-input ${size} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''} ${inputClassName}`}
      />
      {helperText && !error && <span className="jv-mask-input-helper">{helperText}</span>}
      {error && errorMessage && <span className="jv-mask-input-error">{errorMessage}</span>}
    </div>
  );
};
