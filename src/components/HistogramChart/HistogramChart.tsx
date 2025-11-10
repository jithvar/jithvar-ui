import React, { useState } from 'react';
import './HistogramChart.css';

export interface HistogramChartProps {
  data: number[];
  title?: string;
  width?: number;
  height?: number;
  bins?: number;
  color?: string;
  showMean?: boolean;
  showMedian?: boolean;
  animated?: boolean;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({
  data,
  title,
  width = 700,
  height = 400,
  bins = 10,
  color = '#3b82f6',
  showMean = true,
  showMedian = true,
  animated = true,
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    range: string;
    count: number;
    percentage: number;
  }>({
    show: false,
    x: 0,
    y: 0,
    range: '',
    count: 0,
    percentage: 0,
  });

  const padding = { top: 40, right: 20, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate histogram bins
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const binWidth = (maxValue - minValue) / bins;

  const histogram = Array.from({ length: bins }, (_, i) => {
    const binStart = minValue + i * binWidth;
    const binEnd = binStart + binWidth;
    const count = data.filter(v => v >= binStart && (i === bins - 1 ? v <= binEnd : v < binEnd)).length;
    return {
      start: binStart,
      end: binEnd,
      count,
      percentage: (count / data.length) * 100,
    };
  });

  const maxCount = Math.max(...histogram.map(h => h.count));

  // Calculate statistics
  const mean = data.reduce((sum, v) => sum + v, 0) / data.length;
  const sortedData = [...data].sort((a, b) => a - b);
  const median = sortedData.length % 2 === 0
    ? (sortedData[sortedData.length / 2 - 1] + sortedData[sortedData.length / 2]) / 2
    : sortedData[Math.floor(sortedData.length / 2)];

  const getBarHeight = (count: number) => {
    return (count / maxCount) * chartHeight;
  };

  const getX = (value: number) => {
    return padding.left + ((value - minValue) / (maxValue - minValue)) * chartWidth;
  };

  const barWidth = chartWidth / bins;

  return (
    <div className="jv-histogram-chart-container">
      {title && <h3 className="jv-histogram-chart-title">{title}</h3>}
      
      <svg 
        width={width} 
        height={height} 
        className={`jv-histogram-chart ${animated ? 'jv-histogram-animated' : ''}`}
      >
        {/* Grid lines */}
        <g className="jv-histogram-grid">
          {[0, 25, 50, 75, 100].map((percent) => {
            const count = (maxCount * percent) / 100;
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
                  {Math.round(count)}
                </text>
              </g>
            );
          })}
        </g>

        {/* Bars */}
        {histogram.map((bin, index) => {
          const barHeight = getBarHeight(bin.count);
          const x = padding.left + index * barWidth;
          const y = padding.top + chartHeight - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth - 2}
                height={barHeight}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="jv-histogram-bar"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    show: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    range: `${bin.start.toFixed(1)} - ${bin.end.toFixed(1)}`,
                    count: bin.count,
                    percentage: bin.percentage,
                  });
                }}
                onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
              />
            </g>
          );
        })}

        {/* X-axis labels */}
        {Array.from({ length: bins + 1 }, (_, i) => {
          const value = minValue + i * binWidth;
          const x = padding.left + (i / bins) * chartWidth;
          return (
            <text
              key={i}
              x={x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fontSize="11"
              fill="#6b7280"
            >
              {value.toFixed(1)}
            </text>
          );
        })}

        {/* Mean line */}
        {showMean && (
          <g>
            <line
              x1={getX(mean)}
              y1={padding.top}
              x2={getX(mean)}
              y2={padding.top + chartHeight}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="jv-histogram-mean-line"
            />
            <text
              x={getX(mean)}
              y={padding.top - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#ef4444"
              fontWeight="600"
            >
              Mean: {mean.toFixed(2)}
            </text>
          </g>
        )}

        {/* Median line */}
        {showMedian && (
          <g>
            <line
              x1={getX(median)}
              y1={padding.top}
              x2={getX(median)}
              y2={padding.top + chartHeight}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="jv-histogram-median-line"
            />
            <text
              x={getX(median)}
              y={padding.top - 25}
              textAnchor="middle"
              fontSize="11"
              fill="#10b981"
              fontWeight="600"
            >
              Median: {median.toFixed(2)}
            </text>
          </g>
        )}
      </svg>

      {/* Statistics */}
      <div className="jv-histogram-stats">
        <div className="jv-histogram-stat">
          <span className="jv-histogram-stat-label">Count:</span>
          <span className="jv-histogram-stat-value">{data.length}</span>
        </div>
        <div className="jv-histogram-stat">
          <span className="jv-histogram-stat-label">Mean:</span>
          <span className="jv-histogram-stat-value">{mean.toFixed(2)}</span>
        </div>
        <div className="jv-histogram-stat">
          <span className="jv-histogram-stat-label">Median:</span>
          <span className="jv-histogram-stat-value">{median.toFixed(2)}</span>
        </div>
        <div className="jv-histogram-stat">
          <span className="jv-histogram-stat-label">Range:</span>
          <span className="jv-histogram-stat-value">{minValue.toFixed(2)} - {maxValue.toFixed(2)}</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-histogram-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-histogram-tooltip-range">{tooltip.range}</div>
          <div className="jv-histogram-tooltip-count">
            Count: <strong>{tooltip.count}</strong>
          </div>
          <div className="jv-histogram-tooltip-percentage">
            {tooltip.percentage.toFixed(1)}% of data
          </div>
        </div>
      )}
    </div>
  );
};
