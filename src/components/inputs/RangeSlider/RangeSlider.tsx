import React, { useState, useEffect, useRef } from 'react';
import './RangeSlider.css';

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  formatLabel?: (value: number) => string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = '',
  containerClassName = '',
  disabled = false,
  showLabels = true,
  showTooltip = true,
  formatLabel = (val) => val.toString(),
}) => {
  const [values, setValues] = useState<[number, number]>(value || [min, max]);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setValues(value);
    }
  }, [value]);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(handle);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;

      const newValue = getValueFromPosition(e.clientX);

      if (dragging === 'min') {
        const newMin = Math.min(newValue, values[1] - step);
        const newValues: [number, number] = [newMin, values[1]];
        setValues(newValues);
        onChange?.(newValues);
      } else {
        const newMax = Math.max(newValue, values[0] + step);
        const newValues: [number, number] = [values[0], newMax];
        setValues(newValues);
        onChange?.(newValues);
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, values, min, max, step, onChange]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled || dragging) return;

    const newValue = getValueFromPosition(e.clientX);
    const distToMin = Math.abs(newValue - values[0]);
    const distToMax = Math.abs(newValue - values[1]);

    if (distToMin < distToMax) {
      const newMin = Math.min(newValue, values[1] - step);
      const newValues: [number, number] = [newMin, values[1]];
      setValues(newValues);
      onChange?.(newValues);
    } else {
      const newMax = Math.max(newValue, values[0] + step);
      const newValues: [number, number] = [values[0], newMax];
      setValues(newValues);
      onChange?.(newValues);
    }
  };

  return (
    <div className={`jv-range-slider ${className} ${containerClassName} ${disabled ? 'jv-range-slider-disabled' : ''}`}>
      {showLabels && (
        <div className="jv-range-slider-labels">
          <span className="jv-range-slider-label">{formatLabel(values[0])}</span>
          <span className="jv-range-slider-label">{formatLabel(values[1])}</span>
        </div>
      )}

      <div className="jv-range-slider-container">
        <div
          ref={sliderRef}
          className="jv-range-slider-track"
          onClick={handleTrackClick}
        >
          <div
            className="jv-range-slider-range"
            style={{
              left: `${getPercentage(values[0])}%`,
              right: `${100 - getPercentage(values[1])}%`,
            }}
          />

          <div
            className={`jv-range-slider-thumb ${dragging === 'min' ? 'jv-range-slider-thumb-active' : ''}`}
            style={{ left: `${getPercentage(values[0])}%` }}
            onMouseDown={handleMouseDown('min')}
          >
            {showTooltip && (
              <div className="jv-range-slider-tooltip">{formatLabel(values[0])}</div>
            )}
          </div>

          <div
            className={`jv-range-slider-thumb ${dragging === 'max' ? 'jv-range-slider-thumb-active' : ''}`}
            style={{ left: `${getPercentage(values[1])}%` }}
            onMouseDown={handleMouseDown('max')}
          >
            {showTooltip && (
              <div className="jv-range-slider-tooltip">{formatLabel(values[1])}</div>
            )}
          </div>
        </div>

        <div className="jv-range-slider-min-max">
          <span>{formatLabel(min)}</span>
          <span>{formatLabel(max)}</span>
        </div>
      </div>
    </div>
  );
};
