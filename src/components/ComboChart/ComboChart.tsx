import React, { useState } from 'react';
import './ComboChart.css';

export interface ComboDataset {
  label: string;
  data: number[];
  type: 'bar' | 'line';
  color?: string;
  yAxisId?: 'left' | 'right';
}

export interface ComboChartProps {
  labels: string[];
  datasets: ComboDataset[];
  title?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
  leftAxisLabel?: string;
  rightAxisLabel?: string;
  animated?: boolean;
}

export const ComboChart: React.FC<ComboChartProps> = ({
  labels,
  datasets,
  title,
  width = 800,
  height = 400,
  showLegend = true,
  leftAxisLabel,
  rightAxisLabel,
  animated = true,
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    label: string;
    datasetLabel: string;
    value: number;
  }>({
    show: false,
    x: 0,
    y: 0,
    label: '',
    datasetLabel: '',
    value: 0,
  });

  const padding = { top: 40, right: 80, bottom: 60, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Separate datasets by axis
  const leftDatasets = datasets.filter(d => !d.yAxisId || d.yAxisId === 'left');
  const rightDatasets = datasets.filter(d => d.yAxisId === 'right');

  // Calculate scales
  const leftValues = leftDatasets.flatMap(d => d.data);
  const rightValues = rightDatasets.flatMap(d => d.data);

  const leftMax = leftValues.length ? Math.max(...leftValues) : 100;
  const rightMax = rightValues.length ? Math.max(...rightValues) : 100;

  const getY = (value: number, axis: 'left' | 'right') => {
    const max = axis === 'left' ? leftMax : rightMax;
    return padding.top + chartHeight - (value / max) * chartHeight;
  };

  const barWidth = (chartWidth / labels.length) * 0.6;
  const barGroupWidth = chartWidth / labels.length;

  // Count bars per label for positioning
  const barsPerLabel = datasets.filter(d => d.type === 'bar').length;
  const barSubWidth = barWidth / barsPerLabel;

  return (
    <div className="jv-combo-chart-container">
      {title && <h3 className="jv-combo-chart-title">{title}</h3>}
      
      <svg 
        width={width} 
        height={height} 
        className={`jv-combo-chart ${animated ? 'jv-combo-animated' : ''}`}
      >
        {/* Grid lines */}
        <g className="jv-combo-grid">
          {[0, 25, 50, 75, 100].map((percent) => {
            const y = padding.top + chartHeight - (chartHeight * percent) / 100;
            return (
              <line
                key={percent}
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* Left Y-axis */}
        <g className="jv-combo-left-axis">
          {[0, 25, 50, 75, 100].map((percent) => {
            const value = (leftMax * percent) / 100;
            const y = padding.top + chartHeight - (chartHeight * percent) / 100;
            return (
              <text
                key={percent}
                x={padding.left - 10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="11"
                fill="#3b82f6"
                fontWeight="600"
              >
                {Math.round(value)}
              </text>
            );
          })}
          {leftAxisLabel && (
            <text
              x={20}
              y={height / 2}
              textAnchor="middle"
              fontSize="12"
              fill="#3b82f6"
              fontWeight="600"
              transform={`rotate(-90, 20, ${height / 2})`}
            >
              {leftAxisLabel}
            </text>
          )}
        </g>

        {/* Right Y-axis */}
        {rightDatasets.length > 0 && (
          <g className="jv-combo-right-axis">
            {[0, 25, 50, 75, 100].map((percent) => {
              const value = (rightMax * percent) / 100;
              const y = padding.top + chartHeight - (chartHeight * percent) / 100;
              return (
                <text
                  key={percent}
                  x={padding.left + chartWidth + 10}
                  y={y}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fontSize="11"
                  fill="#10b981"
                  fontWeight="600"
                >
                  {Math.round(value)}
                </text>
              );
            })}
            {rightAxisLabel && (
              <text
                x={width - 20}
                y={height / 2}
                textAnchor="middle"
                fontSize="12"
                fill="#10b981"
                fontWeight="600"
                transform={`rotate(90, ${width - 20}, ${height / 2})`}
              >
                {rightAxisLabel}
              </text>
            )}
          </g>
        )}

        {/* Render bars */}
        {datasets.map((dataset, datasetIndex) => {
          if (dataset.type !== 'bar') return null;
          
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];
          const axis = dataset.yAxisId || 'left';
          const barIndex = datasets.slice(0, datasetIndex).filter(d => d.type === 'bar').length;

          return (
            <g key={datasetIndex}>
              {labels.map((label, index) => {
                const value = dataset.data[index];
                const x = padding.left + index * barGroupWidth + (barGroupWidth - barWidth) / 2 + barIndex * barSubWidth;
                const y = getY(value, axis);
                const barHeight = padding.top + chartHeight - y;

                return (
                  <rect
                    key={index}
                    x={x}
                    y={y}
                    width={barSubWidth - 2}
                    height={barHeight}
                    fill={color}
                    className="jv-combo-bar"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        show: true,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10,
                        label: label,
                        datasetLabel: dataset.label,
                        value: value,
                      });
                    }}
                    onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Render lines */}
        {datasets.map((dataset, datasetIndex) => {
          if (dataset.type !== 'line') return null;
          
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];
          const axis = dataset.yAxisId || 'left';

          const points = labels.map((label, index) => {
            const x = padding.left + (index + 0.5) * barGroupWidth;
            const y = getY(dataset.data[index], axis);
            return { x, y, value: dataset.data[index], label };
          });

          const pathData = points.map((point, index) => 
            `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
          ).join(' ');

          return (
            <g key={datasetIndex}>
              <path
                d={pathData}
                fill="none"
                stroke={color}
                strokeWidth="3"
                className="jv-combo-line"
              />
              {points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={color}
                  stroke="white"
                  strokeWidth="2"
                  className="jv-combo-point"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      show: true,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10,
                      label: point.label,
                      datasetLabel: dataset.label,
                      value: point.value,
                    });
                  }}
                  onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
                />
              ))}
            </g>
          );
        })}

        {/* X-axis labels */}
        {labels.map((label, index) => {
          const x = padding.left + (index + 0.5) * barGroupWidth;
          return (
            <text
              key={index}
              x={x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div className="jv-combo-legend">
          {datasets.map((dataset, index) => {
            const color = dataset.color || defaultColors[index % defaultColors.length];
            return (
              <div key={index} className="jv-combo-legend-item">
                <span 
                  className={`jv-combo-legend-symbol jv-combo-legend-${dataset.type}`}
                  style={{ backgroundColor: color, borderColor: color }}
                />
                <span className="jv-combo-legend-label">{dataset.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-combo-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-combo-tooltip-label">{tooltip.label}</div>
          <div className="jv-combo-tooltip-dataset">{tooltip.datasetLabel}</div>
          <div className="jv-combo-tooltip-value">{tooltip.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};
