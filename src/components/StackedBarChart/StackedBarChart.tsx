import React, { useState } from 'react';
import './StackedBarChart.css';

export interface StackedBarDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface StackedBarChartProps {
  labels: string[];
  datasets: StackedBarDataset[];
  title?: string;
  width?: number;
  height?: number;
  orientation?: 'vertical' | 'horizontal';
  showLegend?: boolean;
  showValues?: boolean;
  animated?: boolean;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  labels,
  datasets,
  title,
  width = 700,
  height = 400,
  orientation = 'vertical',
  showLegend = true,
  showValues = false,
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

  const padding = { top: 40, right: 20, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate totals for each bar
  const totals = labels.map((_, index) => 
    datasets.reduce((sum, dataset) => sum + dataset.data[index], 0)
  );
  const maxTotal = Math.max(...totals);

  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const renderVerticalBars = () => {
    const barWidth = chartWidth / labels.length * 0.7;
    const gap = chartWidth / labels.length * 0.3;

    return labels.map((label, barIndex) => {
      const x = padding.left + barIndex * (chartWidth / labels.length) + gap / 2;
      let cumulativeY = 0;

      return (
        <g key={barIndex}>
          {/* Stacked segments */}
          {datasets.map((dataset, datasetIndex) => {
            const value = dataset.data[barIndex];
            const segmentHeight = (value / maxTotal) * chartHeight;
            const y = padding.top + chartHeight - cumulativeY - segmentHeight;
            const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];

            cumulativeY += segmentHeight;

            return (
              <g key={datasetIndex}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={segmentHeight}
                  fill={color}
                  className="jv-stacked-bar-segment"
                  style={{
                    animationDelay: `${barIndex * 0.1 + datasetIndex * 0.05}s`,
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
                {showValues && segmentHeight > 20 && (
                  <text
                    x={x + barWidth / 2}
                    y={y + segmentHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="600"
                    pointerEvents="none"
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          })}

          {/* X-axis label */}
          <text
            x={x + barWidth / 2}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {label}
          </text>
        </g>
      );
    });
  };

  const renderHorizontalBars = () => {
    const barHeight = chartHeight / labels.length * 0.7;
    const gap = chartHeight / labels.length * 0.3;

    return labels.map((label, barIndex) => {
      const y = padding.top + barIndex * (chartHeight / labels.length) + gap / 2;
      let cumulativeX = 0;

      return (
        <g key={barIndex}>
          {/* Stacked segments */}
          {datasets.map((dataset, datasetIndex) => {
            const value = dataset.data[barIndex];
            const segmentWidth = (value / maxTotal) * chartWidth;
            const x = padding.left + cumulativeX;
            const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];

            cumulativeX += segmentWidth;

            return (
              <g key={datasetIndex}>
                <rect
                  x={x}
                  y={y}
                  width={segmentWidth}
                  height={barHeight}
                  fill={color}
                  className="jv-stacked-bar-segment"
                  style={{
                    animationDelay: `${barIndex * 0.1 + datasetIndex * 0.05}s`,
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
                {showValues && segmentWidth > 30 && (
                  <text
                    x={x + segmentWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="600"
                    pointerEvents="none"
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          })}

          {/* Y-axis label */}
          <text
            x={padding.left - 10}
            y={y + barHeight / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {label}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="jv-stacked-bar-chart-container">
      {title && <h3 className="jv-stacked-bar-chart-title">{title}</h3>}
      
      <svg 
        width={width} 
        height={height} 
        className={`jv-stacked-bar-chart ${animated ? 'jv-stacked-bar-animated' : ''}`}
      >
        {/* Grid lines */}
        {orientation === 'vertical' && (
          <g className="jv-stacked-bar-grid">
            {[0, 25, 50, 75, 100].map((percent) => {
              const y = padding.top + chartHeight - (chartHeight * percent) / 100;
              return (
                <g key={percent}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + chartWidth}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 10}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="11"
                    fill="#9ca3af"
                  >
                    {Math.round((maxTotal * percent) / 100)}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* Bars */}
        {orientation === 'vertical' ? renderVerticalBars() : renderHorizontalBars()}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div className="jv-stacked-bar-legend">
          {datasets.map((dataset, index) => {
            const color = dataset.color || defaultColors[index % defaultColors.length];
            return (
              <div key={index} className="jv-stacked-bar-legend-item">
                <span 
                  className="jv-stacked-bar-legend-color" 
                  style={{ backgroundColor: color }}
                />
                <span className="jv-stacked-bar-legend-label">{dataset.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-stacked-bar-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-stacked-bar-tooltip-label">{tooltip.label}</div>
          <div className="jv-stacked-bar-tooltip-dataset">{tooltip.datasetLabel}</div>
          <div className="jv-stacked-bar-tooltip-value">{tooltip.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};
