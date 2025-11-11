import React, { useState, useEffect, useRef } from 'react';
import './SearchableSelect.css';

export interface Option {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface SearchableSelectProps {
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  options?: Option[];
  multiple?: boolean;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  apiUrl?: string;
  apiHeaders?: Record<string, string>;
  apiSearchParam?: string;
  minSearchLength?: number;
  debounceDelay?: number;
  renderOption?: (option: Option) => React.ReactNode;
  labelKey?: string;
  valueKey?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  options: staticOptions = [],
  multiple = false,
  placeholder = 'Search...',
  className = '',
  containerClassName = '',
  inputClassName = '',
  apiUrl,
  apiHeaders = {},
  apiSearchParam = 'search',
  minSearchLength = 3,
  debounceDelay = 300,
  renderOption,
  labelKey = 'label',
  valueKey = 'value',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);

  // Initialize filteredOptions with staticOptions on mount
  useEffect(() => {
    if (isInitialMount.current && !apiUrl && staticOptions.length > 0) {
      setFilteredOptions(staticOptions);
      isInitialMount.current = false;
    }
  }, [staticOptions, apiUrl]);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (apiUrl) {
      // API mode: Search when term length >= minSearchLength
      if (searchTerm.length >= minSearchLength) {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
          fetchOptions(searchTerm);
        }, debounceDelay);
      } else {
        setFilteredOptions([]);
        setError(null);
      }
    } else {
      // Static options mode: Filter locally
      const filtered = staticOptions.filter((option) =>
        option[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, apiUrl, minSearchLength, debounceDelay, labelKey, staticOptions])

  const fetchOptions = async (search: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(apiUrl!);
      url.searchParams.append(apiSearchParam, search);

      const response = await fetch(url.toString(), {
        headers: apiHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different API response formats
      const optionsArray = Array.isArray(data) ? data : data.data || data.results || [];
      
      setFilteredOptions(optionsArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch options');
      setFilteredOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (optionValue: string | number) => {
    let newValues: (string | number)[];

    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        newValues = selectedValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...selectedValues, optionValue];
      }
    } else {
      newValues = [optionValue];
      setIsOpen(false);
    }

    setSelectedValues(newValues);

    if (onChange) {
      onChange(multiple ? newValues : newValues[0]);
    }
  };

  const handleRemove = (optionValue: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== optionValue);
    setSelectedValues(newValues);

    if (onChange) {
      onChange(multiple ? newValues : newValues[0] || '');
    }
  };

  const getSelectedOptions = (): Option[] => {
    const allOptions = [...staticOptions, ...filteredOptions];
    return selectedValues
      .map((val) => allOptions.find((opt) => opt[valueKey] === val))
      .filter((opt): opt is Option => opt !== undefined);
  };

  const getOptionLabel = (option: Option): string => {
    return option[labelKey];
  };

  const getOptionValue = (option: Option): string | number => {
    return option[valueKey];
  };

  const renderSelectedValues = () => {
    const selected = getSelectedOptions();

    if (selected.length === 0) {
      return <span className="jv-select-placeholder">{placeholder}</span>;
    }

    if (multiple) {
      return (
        <div className="jv-select-tags">
          {selected.map((option) => (
            <span key={getOptionValue(option)} className="jv-select-tag">
              {getOptionLabel(option)}
              <button
                className="jv-select-tag-remove"
                onClick={(e) => handleRemove(getOptionValue(option), e)}
                type="button"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      );
    }

    return <span className="jv-select-value">{getOptionLabel(selected[0])}</span>;
  };

  return (
    <div className={`jv-searchable-select ${className} ${containerClassName}`} ref={containerRef}>
      <div
        className={`jv-select-input ${isOpen ? 'jv-select-input-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="jv-select-value-container">{renderSelectedValues()}</div>
        <span className="jv-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="jv-select-dropdown">
          <div className="jv-select-search-container">
            <input
              type="text"
              className={`jv-select-search ${inputClassName}`}
              placeholder={
                apiUrl && searchTerm.length < minSearchLength
                  ? `Type at least ${minSearchLength} characters to search...`
                  : placeholder
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>

          <div className="jv-select-options">
            {loading && (
              <div className="jv-select-loading">
                <span className="jv-select-spinner"></span>
                Loading...
              </div>
            )}

            {error && <div className="jv-select-error">Error: {error}</div>}

            {!loading && !error && filteredOptions.length === 0 && (
              <div className="jv-select-no-options">
                {apiUrl && searchTerm.length < minSearchLength
                  ? `Type at least ${minSearchLength} characters to search`
                  : 'No options found'}
              </div>
            )}

            {!loading &&
              !error &&
              filteredOptions.map((option) => {
                const optionValue = getOptionValue(option);
                const isSelected = selectedValues.includes(optionValue);

                return (
                  <div
                    key={optionValue}
                    className={`jv-select-option ${isSelected ? 'jv-select-option-selected' : ''}`}
                    onClick={() => handleSelect(optionValue)}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        className="jv-select-checkbox"
                        checked={isSelected}
                        readOnly
                      />
                    )}
                    {renderOption ? renderOption(option) : getOptionLabel(option)}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
