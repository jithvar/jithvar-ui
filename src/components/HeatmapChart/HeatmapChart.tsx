import React, { useState } from 'react';
import './HeatmapChart.css';

export interface HeatmapDataPoint {
  x: string | number;
  y: string | number;
  value: number;
}

export interface HeatmapChartProps {
  data: HeatmapDataPoint[];
  xLabels: (string | number)[];
  yLabels: (string | number)[];
  title?: string;
  width?: number;
  height?: number;
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'gradient';
  showValues?: boolean;
  animated?: boolean;
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  xLabels,
  yLabels,
  title,
  width = 600,
  height = 400,
  colorScheme = 'blue',
  showValues = false,
  animated = true,
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    xLabel: string | number;
    yLabel: string | number;
    value: number;
  }>({
    show: false,
    x: 0,
    y: 0,
    xLabel: '',
    yLabel: '',
    value: 0,
  });

  const padding = { top: 50, right: 100, bottom: 50, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const cellWidth = chartWidth / xLabels.length;
  const cellHeight = chartHeight / yLabels.length;

  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Color schemes
  const colorSchemes = {
    blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'],
    green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
    red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c'],
    purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce'],
    gradient: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1'],
  };

  const colors = colorSchemes[colorScheme];

  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    const index = Math.min(Math.floor(normalized * colors.length), colors.length - 1);
    return colors[index];
  };

  const getTextColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return normalized > 0.5 ? '#ffffff' : '#1f2937';
  };

  return (
    <div className="jv-heatmap-chart-container">
      {title && <h3 className="jv-heatmap-chart-title">{title}</h3>}
      
      <svg 
        width={width} 
        height={height} 
        className={`jv-heatmap-chart ${animated ? 'jv-heatmap-animated' : ''}`}
      >
        {/* Y-axis labels */}
        {yLabels.map((label, index) => (
          <text
            key={`y-${index}`}
            x={padding.left - 10}
            y={padding.top + index * cellHeight + cellHeight / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="12"
            fill="#6b7280"
            className="jv-heatmap-label"
          >
            {label}
          </text>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, index) => (
          <text
            key={`x-${index}`}
            x={padding.left + index * cellWidth + cellWidth / 2}
            y={padding.top + chartHeight + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
            className="jv-heatmap-label"
          >
            {label}
          </text>
        ))}

        {/* Heatmap cells */}
        {data.map((point, index) => {
          const xIndex = xLabels.indexOf(point.x);
          const yIndex = yLabels.indexOf(point.y);
          
          if (xIndex === -1 || yIndex === -1) return null;

          const x = padding.left + xIndex * cellWidth;
          const y = padding.top + yIndex * cellHeight;
          const color = getColor(point.value);

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={cellWidth}
                height={cellHeight}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="jv-heatmap-cell"
                style={{
                  animationDelay: `${(xIndex + yIndex) * 0.03}s`,
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    show: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    xLabel: point.x,
                    yLabel: point.y,
                    value: point.value,
                  });
                }}
                onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
              />

              {showValues && (
                <text
                  x={x + cellWidth / 2}
                  y={y + cellHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={getTextColor(point.value)}
                  pointerEvents="none"
                  className="jv-heatmap-value"
                >
                  {point.value}
                </text>
              )}
            </g>
          );
        })}

        {/* Color scale legend */}
        <g className="jv-heatmap-legend">
          <text
            x={width - padding.right + 10}
            y={padding.top - 10}
            fontSize="11"
            fill="#6b7280"
            fontWeight="600"
          >
            Scale
          </text>
          {colors.map((color, index) => {
            const legendHeight = 20;
            const y = padding.top + (index * chartHeight) / colors.length;
            const segmentHeight = chartHeight / colors.length;

            return (
              <g key={index}>
                <rect
                  x={width - padding.right + 10}
                  y={y}
                  width={20}
                  height={segmentHeight}
                  fill={color}
                  stroke="white"
                  strokeWidth="1"
                />
              </g>
            );
          })}
          <text
            x={width - padding.right + 40}
            y={padding.top + 10}
            fontSize="10"
            fill="#6b7280"
          >
            {maxValue.toFixed(1)}
          </text>
          <text
            x={width - padding.right + 40}
            y={padding.top + chartHeight - 5}
            fontSize="10"
            fill="#6b7280"
          >
            {minValue.toFixed(1)}
          </text>
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-heatmap-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-heatmap-tooltip-coords">
            {tooltip.yLabel} • {tooltip.xLabel}
          </div>
          <div className="jv-heatmap-tooltip-value">
            Value: <strong>{tooltip.value}</strong>
          </div>
        </div>
      )}
    </div>
  );
};
