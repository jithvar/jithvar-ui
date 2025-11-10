import React, { useState } from 'react';
import './BulletChart.css';

export interface BulletChartRange {
  label: string;
  value: number;
  color: string;
}

export interface BulletChartDataPoint {
  label: string;
  value: number;
  target: number;
  ranges: BulletChartRange[];
  color?: string;
}

export interface BulletChartProps {
  data: BulletChartDataPoint[];
  width?: number;
  height?: number;
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  className?: string;
}

export const BulletChart: React.FC<BulletChartProps> = ({
  data,
  width = 600,
  height = 400,
  orientation = 'horizontal',
  showLabels = true,
  className = '',
}) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  const padding = { top: 40, right: 40, bottom: 60, left: 120 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const barHeight = orientation === 'horizontal'
    ? Math.min(40, chartHeight / data.length * 0.6)
    : Math.min(40, chartWidth / data.length * 0.6);

  const getBarPosition = (index: number): number => {
    if (orientation === 'horizontal') {
      return (index + 0.5) * (chartHeight / data.length) - barHeight / 2;
    } else {
      return (index + 0.5) * (chartWidth / data.length) - barHeight / 2;
    }
  };

  const handleMouseMove = (e: React.MouseEvent, content: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      content,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className={`jv-bullet-chart ${className}`}>
      <svg width={width} height={height}>
        <defs>
          <filter id="bulletShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {data.map((point, index) => {
            const barPos = getBarPosition(index);
            const maxValue = Math.max(
              point.target,
              point.value,
              ...point.ranges.map(r => r.value)
            ) * 1.1;

            const getScaledValue = (value: number): number => {
              if (orientation === 'horizontal') {
                return (value / maxValue) * chartWidth;
              } else {
                return (value / maxValue) * chartHeight;
              }
            };

            const valueColor = point.color || '#3b82f6';

            if (orientation === 'horizontal') {
              // Sort ranges by value (descending) for proper layering
              const sortedRanges = [...point.ranges].sort((a, b) => b.value - a.value);

              return (
                <g key={index}>
                  {/* Label */}
                  {showLabels && (
                    <text
                      x={-10}
                      y={barPos + barHeight / 2 + 4}
                      textAnchor="end"
                      fontSize="13"
                      fill="#374151"
                      fontWeight="500"
                    >
                      {point.label}
                    </text>
                  )}

                  {/* Ranges (background zones) */}
                  {sortedRanges.map((range, i) => (
                    <rect
                      key={i}
                      x={0}
                      y={barPos}
                      width={getScaledValue(range.value)}
                      height={barHeight}
                      fill={range.color}
                      opacity="0.6"
                      rx="4"
                      onMouseMove={(e) =>
                        handleMouseMove(e, `${range.label}: ${range.value}`)
                      }
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}

                  {/* Actual value bar */}
                  <rect
                    x={0}
                    y={barPos + barHeight * 0.25}
                    width={getScaledValue(point.value)}
                    height={barHeight * 0.5}
                    fill={valueColor}
                    rx="3"
                    filter="url(#bulletShadow)"
                    onMouseMove={(e) =>
                      handleMouseMove(e, `Actual: ${point.value}`)
                    }
                    onMouseLeave={handleMouseLeave}
                    className="jv-bullet-value"
                  />

                  {/* Target marker */}
                  <line
                    x1={getScaledValue(point.target)}
                    y1={barPos}
                    x2={getScaledValue(point.target)}
                    y2={barPos + barHeight}
                    stroke="#1f2937"
                    strokeWidth="3"
                    onMouseMove={(e) =>
                      handleMouseMove(e, `Target: ${point.target}`)
                    }
                    onMouseLeave={handleMouseLeave}
                    className="jv-bullet-target"
                  />

                  {/* Value label */}
                  <text
                    x={getScaledValue(point.value) + 5}
                    y={barPos + barHeight / 2 + 4}
                    fontSize="11"
                    fill="#374151"
                    fontWeight="600"
                  >
                    {point.value}
                  </text>
                </g>
              );
            } else {
              // Vertical orientation
              const sortedRanges = [...point.ranges].sort((a, b) => b.value - a.value);

              return (
                <g key={index}>
                  {/* Label */}
                  {showLabels && (
                    <text
                      x={barPos + barHeight / 2}
                      y={chartHeight + 20}
                      textAnchor="middle"
                      fontSize="13"
                      fill="#374151"
                      fontWeight="500"
                    >
                      {point.label}
                    </text>
                  )}

                  {/* Ranges (background zones) */}
                  {sortedRanges.map((range, i) => (
                    <rect
                      key={i}
                      x={barPos}
                      y={chartHeight - getScaledValue(range.value)}
                      width={barHeight}
                      height={getScaledValue(range.value)}
                      fill={range.color}
                      opacity="0.6"
                      rx="4"
                      onMouseMove={(e) =>
                        handleMouseMove(e, `${range.label}: ${range.value}`)
                      }
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}

                  {/* Actual value bar */}
                  <rect
                    x={barPos + barHeight * 0.25}
                    y={chartHeight - getScaledValue(point.value)}
                    width={barHeight * 0.5}
                    height={getScaledValue(point.value)}
                    fill={valueColor}
                    rx="3"
                    filter="url(#bulletShadow)"
                    onMouseMove={(e) =>
                      handleMouseMove(e, `Actual: ${point.value}`)
                    }
                    onMouseLeave={handleMouseLeave}
                    className="jv-bullet-value"
                  />

                  {/* Target marker */}
                  <line
                    x1={barPos}
                    y1={chartHeight - getScaledValue(point.target)}
                    x2={barPos + barHeight}
                    y2={chartHeight - getScaledValue(point.target)}
                    stroke="#1f2937"
                    strokeWidth="3"
                    onMouseMove={(e) =>
                      handleMouseMove(e, `Target: ${point.target}`)
                    }
                    onMouseLeave={handleMouseLeave}
                    className="jv-bullet-target"
                  />

                  {/* Value label */}
                  <text
                    x={barPos + barHeight / 2}
                    y={chartHeight - getScaledValue(point.value) - 5}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#374151"
                    fontWeight="600"
                  >
                    {point.value}
                  </text>
                </g>
              );
            }
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="jv-bullet-tooltip"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
          }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Legend */}
      <div className="jv-bullet-legend">
        <div className="jv-bullet-legend-item">
          <div className="jv-bullet-legend-bar"></div>
          <span>Actual Value</span>
        </div>
        <div className="jv-bullet-legend-item">
          <div className="jv-bullet-legend-target"></div>
          <span>Target</span>
        </div>
        {data[0]?.ranges.map((range, i) => (
          <div key={i} className="jv-bullet-legend-item">
            <div
              className="jv-bullet-legend-range"
              style={{ background: range.color }}
            ></div>
            <span>{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
