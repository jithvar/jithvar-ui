import React, { useState, useEffect, useRef } from 'react';
import './DateRangePicker.css';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MMM DD, YYYY' | 'DD MMM YYYY' | ((date: Date) => string);
}

type PresetKey = 'yesterday' | 'last7days' | 'last15days' | 'last30days' | 'currentMonth' | 'lastMonth' | 'last3Months' | 'custom';

interface Preset {
  label: string;
  getValue: () => DateRange;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className = '',
  containerClassName = '',
  inputClassName = '',
  dateFormat = 'MMM DD, YYYY',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState<DateRange>(
    value || { startDate: null, endDate: null }
  );
  const [dateRange, setDateRange] = useState<DateRange>(
    value || { startDate: null, endDate: null }
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [currentMonth1, setCurrentMonth1] = useState(new Date());
  const [currentMonth2, setCurrentMonth2] = useState(() => {
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    return next;
  });
  const [selectingStart, setSelectingStart] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const presets: Record<PresetKey, Preset> = {
    yesterday: {
      label: 'Yesterday',
      getValue: () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        return { startDate: date, endDate };
      },
    },
    last7days: {
      label: 'Last 7 Days',
      getValue: () => {
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
        return { startDate, endDate };
      },
    },
    last15days: {
      label: 'Last 15 Days',
      getValue: () => {
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 14);
        startDate.setHours(0, 0, 0, 0);
        return { startDate, endDate };
      },
    },
    last30days: {
      label: 'Last 30 Days',
      getValue: () => {
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);
        return { startDate, endDate };
      },
    },
    currentMonth: {
      label: 'Current Month',
      getValue: () => {
        const startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
        return { startDate, endDate };
      },
    },
    lastMonth: {
      label: 'Last Month',
      getValue: () => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1, 1);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);
        return { startDate, endDate };
      },
    },
    last3Months: {
      label: 'Last 3 Months',
      getValue: () => {
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 2, 1);
        startDate.setHours(0, 0, 0, 0);
        return { startDate, endDate };
      },
    },
    custom: {
      label: 'Custom',
      getValue: () => ({ startDate: null, endDate: null }),
    },
  };

  useEffect(() => {
    if (value) {
      setDateRange(value);
      setTempDateRange(value);
    }
  }, [value]);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Check if dropdown goes off screen to the right
      if (rect.right > viewportWidth) {
        dropdownRef.current.style.left = 'auto';
        dropdownRef.current.style.right = '0';
      } else {
        dropdownRef.current.style.left = '0';
        dropdownRef.current.style.right = 'auto';
      }
    }
  }, [isOpen]);

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

  const isInRange = (date: Date): boolean => {
    if (!tempDateRange.startDate || !tempDateRange.endDate) {
      if (tempDateRange.startDate && hoverDate) {
        const start = tempDateRange.startDate.getTime();
        const end = hoverDate.getTime();
        const current = date.getTime();
        return current >= Math.min(start, end) && current <= Math.max(start, end);
      }
      return false;
    }
    const time = date.getTime();
    return time >= tempDateRange.startDate.getTime() && time <= tempDateRange.endDate.getTime();
  };

  const handleDateClick = (date: Date) => {
    if (date.getTime() === 0) return;

    if (selectingStart || !tempDateRange.startDate) {
      setTempDateRange({ startDate: date, endDate: null });
      setSelectingStart(false);
    } else {
      const newRange = {
        startDate: tempDateRange.startDate,
        endDate: date,
      };
      
      // Ensure start is before end
      if (newRange.startDate && newRange.endDate && newRange.startDate > newRange.endDate) {
        newRange.startDate = date;
        newRange.endDate = tempDateRange.startDate;
      }
      
      setTempDateRange(newRange);
      setSelectingStart(true);
    }
  };

  const handlePresetClick = (key: PresetKey) => {
    const range = presets[key].getValue();
    setTempDateRange(range);
    setSelectingStart(true);
    
    if (key !== 'custom') {
      // Auto-apply preset selections
      setDateRange(range);
      setIsOpen(false);
      if (onChange) {
        onChange(range);
      }
    }
  };

  const handleApply = () => {
    if (tempDateRange.startDate && tempDateRange.endDate) {
      setDateRange(tempDateRange);
      setIsOpen(false);
      if (onChange) {
        onChange(tempDateRange);
      }
    }
  };

  const handleCancel = () => {
    setTempDateRange(dateRange);
    setIsOpen(false);
    setSelectingStart(true);
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

  const renderCalendar = (currentMonth: Date, setCurrentMonth: (date: Date) => void) => {
    const days = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const changeMonth = (increment: number) => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(newDate.getMonth() + increment);
      setCurrentMonth(newDate);
    };

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
            const isStart = isSameDay(day, tempDateRange.startDate);
            const isEnd = isSameDay(day, tempDateRange.endDate);
            const inRange = !isEmpty && isInRange(day);

            return (
              <button
                key={index}
                className={`jv-calendar-day ${isEmpty ? 'jv-calendar-day-empty' : ''} ${
                  isStart ? 'jv-calendar-day-start' : ''
                } ${isEnd ? 'jv-calendar-day-end' : ''} ${
                  inRange ? 'jv-calendar-day-in-range' : ''
                }`}
                onClick={() => handleDateClick(day)}
                onMouseEnter={() => !isEmpty && setHoverDate(day)}
                disabled={isEmpty}
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
    <div className={`jv-daterangepicker ${className} ${containerClassName}`} ref={containerRef}>
      <div className="jv-daterangepicker-input" onClick={() => setIsOpen(!isOpen)}>
        <input
          type="text"
          readOnly
          value={
            dateRange.startDate && dateRange.endDate
              ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
              : 'Select date range'
          }
          className={`jv-daterangepicker-input-field ${inputClassName}`}
          placeholder="Select date range"
        />
        <span className="jv-daterangepicker-icon">📅</span>
      </div>

      {isOpen && (
        <div className="jv-daterangepicker-dropdown" ref={dropdownRef}>
          <div className="jv-daterangepicker-presets">
            {(Object.keys(presets) as PresetKey[]).map((key) => (
              <button
                key={key}
                className="jv-daterangepicker-preset-btn"
                onClick={() => handlePresetClick(key)}
                type="button"
              >
                {presets[key].label}
              </button>
            ))}
          </div>
          <div className="jv-daterangepicker-content">
            <div className="jv-daterangepicker-calendars">
              {renderCalendar(currentMonth1, setCurrentMonth1)}
              {renderCalendar(currentMonth2, setCurrentMonth2)}
            </div>
            <div className="jv-daterangepicker-actions">
              <button
                className="jv-daterangepicker-action-btn jv-daterangepicker-cancel-btn"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                className="jv-daterangepicker-action-btn jv-daterangepicker-apply-btn"
                onClick={handleApply}
                disabled={!tempDateRange.startDate || !tempDateRange.endDate}
                type="button"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
