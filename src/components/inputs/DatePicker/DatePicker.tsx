import React, { useState, useEffect, useRef } from 'react';
import './DatePicker.css';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MMM DD, YYYY' | 'DD MMM YYYY' | ((date: Date) => string);
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  containerClassName = '',
  inputClassName = '',
  minDate,
  maxDate,
  disabled = false,
  dateFormat = 'MMM DD, YYYY',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
      if (value) {
        setCurrentMonth(value);
      }
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

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add empty cells for days before the first day of the month
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(new Date(0));
    }

    // Add all days in the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isDisabledDate = (date: Date): boolean => {
    if (date.getTime() === 0) return true;
    
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDisabledDate(date)) return;

    setSelectedDate(date);
    setIsOpen(false);

    if (onChange) {
      onChange(date);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    if (onChange) {
      onChange(null);
    }
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentMonth(newDate);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    // If custom formatter function is provided
    if (typeof dateFormat === 'function') {
      return dateFormat(date);
    }
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[date.getMonth()];
    
    switch (dateFormat) {
      case 'MM/DD/YYYY':
        return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
      case 'DD/MM/YYYY':
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      case 'MMM DD, YYYY':
        return `${monthName} ${day}, ${year}`;
      case 'DD MMM YYYY':
        return `${day} ${monthName} ${year}`;
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
      <div className="jv-calendar">
        <div className="jv-calendar-header">
          <button
            className="jv-calendar-nav-btn"
            onClick={() => changeMonth(-1)}
            type="button"
          >
            ‹
          </button>
          <span className="jv-calendar-month">{monthName}</span>
          <button
            className="jv-calendar-nav-btn"
            onClick={() => changeMonth(1)}
            type="button"
          >
            ›
          </button>
        </div>
        <div className="jv-calendar-weekdays">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="jv-calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="jv-calendar-days">
          {days.map((day, index) => {
            const isEmpty = day.getTime() === 0;
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const isDisabled = isDisabledDate(day);

            return (
              <button
                key={index}
                className={`jv-calendar-day ${isEmpty ? 'jv-calendar-day-empty' : ''} ${
                  isSelected ? 'jv-calendar-day-selected' : ''
                } ${isToday ? 'jv-calendar-day-today' : ''} ${
                  isDisabled ? 'jv-calendar-day-disabled' : ''
                }`}
                onClick={() => handleDateClick(day)}
                disabled={isEmpty || isDisabled}
                type="button"
              >
                {isEmpty ? '' : day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`jv-datepicker ${className} ${containerClassName}`} ref={containerRef}>
      <div
        className={`jv-datepicker-input ${disabled ? 'jv-datepicker-input-disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          type="text"
          readOnly
          value={formatDate(selectedDate)}
          className={`jv-datepicker-input-field ${inputClassName}`}
          placeholder={placeholder}
          disabled={disabled}
        />
        {selectedDate && !disabled ? (
          <button
            className="jv-datepicker-clear"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        ) : (
          <span className="jv-datepicker-icon">📅</span>
        )}
      </div>

      {isOpen && !disabled && (
        <div className="jv-datepicker-dropdown">
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};
