import React, { useEffect, useState } from 'react';
import './AreaChart.css';

export interface AreaChartDataPoint {
  label: string;
  value: number;
}

export interface AreaChartDataset {
  label: string;
  data: AreaChartDataPoint[];
  color?: string;
}

export interface AreaChartProps {
  data?: AreaChartDataPoint[];
  datasets?: AreaChartDataset[];
  width?: number;
  height?: number;
  title?: string;
  showGrid?: boolean;
  showPoints?: boolean;
  animated?: boolean;
  smooth?: boolean;
  stacked?: boolean;
  className?: string;
}

const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  datasets,
  width = 600,
  height = 400,
  title,
  showGrid = true,
  showPoints = true,
  animated = true,
  smooth = true,
  stacked = false,
  className = '',
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; label: string; value: number; datasetLabel: string }>({
    show: false,
    x: 0,
    y: 0,
    label: '',
    value: 0,
    datasetLabel: '',
  });

  // Convert single data to datasets format
  const normalizedDatasets: AreaChartDataset[] = datasets 
    ? datasets 
    : data 
    ? [{ label: 'Data', data, color: defaultColors[0] }]
    : [];

  useEffect(() => {
    if (animated) {
      setAnimatedProgress(0);
      const timeout = setTimeout(() => {
        setAnimatedProgress(1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setAnimatedProgress(1);
    }
  }, [animated]);

  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Get all data points
  const allDataPoints = normalizedDatasets.flatMap(ds => ds.data);
  const maxValue = Math.max(...allDataPoints.map(p => p.value));
  const labels = normalizedDatasets[0]?.data.map(p => p.label) || [];

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(0);
  };

  const getColor = (index: number, dataset: AreaChartDataset): string => {
    return dataset.color || defaultColors[index % defaultColors.length];
  };

  const createPath = (points: Array<{ x: number; y: number }>, closed: boolean = false): string => {
    if (points.length === 0) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    if (smooth) {
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        path += ` Q ${cpx} ${prev.y}, ${cpx} ${curr.y}`;
        if (i < points.length - 1) {
          path += ` T ${curr.x} ${curr.y}`;
        }
      }
    } else {
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
    }

    if (closed) {
      const lastPoint = points[points.length - 1];
      path += ` L ${lastPoint.x} ${padding.top + chartHeight}`;
      path += ` L ${points[0].x} ${padding.top + chartHeight}`;
      path += ' Z';
    }

    return path;
  };

  const renderGrid = () => {
    const gridLines = 5;
    const lines = [];

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i;
      const value = maxValue - (maxValue / gridLines) * i;
      
      lines.push(
        <g key={i}>
          <line
            x1={padding.left}
            y1={y}
            x2={padding.left + chartWidth}
            y2={y}
            className="jv-area-chart-grid-line"
          />
          <text
            x={padding.left - 10}
            y={y + 4}
            textAnchor="end"
            className="jv-area-chart-axis-label"
          >
            {formatValue(value)}
          </text>
        </g>
      );
    }

    // X-axis labels
    labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (labels.length - 1)) * index;
      lines.push(
        <text
          key={`x-${index}`}
          x={x}
          y={padding.top + chartHeight + 20}
          textAnchor="middle"
          className="jv-area-chart-axis-label"
        >
          {label}
        </text>
      );
    });

    return lines;
  };

  return (
    <div className={`jv-area-chart ${className}`}>
      {title && <h3 className="jv-area-chart-title">{title}</h3>}
      <svg width={width} height={height} className="jv-area-chart-svg">
        <defs>
          {normalizedDatasets.map((dataset, dsIndex) => {
            const color = getColor(dsIndex, dataset);
            return (
              <linearGradient key={dsIndex} id={`areaGradient${dsIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Grid */}
        {showGrid && renderGrid()}
        
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          className="jv-area-chart-axis"
        />
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          className="jv-area-chart-axis"
        />
        
        {/* Areas and Lines */}
        {normalizedDatasets.map((dataset, dsIndex) => {
          const color = getColor(dsIndex, dataset);
          const points = dataset.data.map((point, index) => {
            const x = padding.left + (chartWidth / (dataset.data.length - 1)) * index;
            const y = padding.top + chartHeight - (point.value / maxValue) * chartHeight;
            return { x, y };
          });

          const linePath = createPath(points, false);
          const areaPath = createPath(points, true);
          const pathLength = 1000;

          return (
            <g key={dsIndex}>
              {/* Filled Area */}
              <path
                d={areaPath}
                fill={`url(#areaGradient${dsIndex})`}
                className="jv-area-chart-area"
                style={{
                  opacity: animated ? animatedProgress : 1,
                }}
              />
              
              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth="3"
                className="jv-area-chart-line"
                style={{
                  strokeDasharray: animated ? pathLength : 'none',
                  strokeDashoffset: animated ? pathLength * (1 - animatedProgress) : 0,
                }}
              />
              
              {/* Points */}
              {showPoints && dataset.data.map((point, pointIndex) => {
                const x = padding.left + (chartWidth / (dataset.data.length - 1)) * pointIndex;
                const y = padding.top + chartHeight - (point.value / maxValue) * chartHeight;
                
                return (
                  <circle
                    key={pointIndex}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="white"
                    stroke={color}
                    strokeWidth="3"
                    className="jv-area-chart-point"
                    style={{
                      opacity: animated ? animatedProgress : 1,
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        show: true,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10,
                        label: point.label,
                        value: point.value,
                        datasetLabel: dataset.label,
                      });
                    }}
                    onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {normalizedDatasets.length > 1 && (
        <div className="jv-area-chart-legend">
          {normalizedDatasets.map((dataset, index) => (
            <div key={index} className="jv-area-chart-legend-item">
              <div
                className="jv-area-chart-legend-color"
                style={{ background: getColor(index, dataset) }}
              />
              <span className="jv-area-chart-legend-label">{dataset.label}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-area-chart-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-area-chart-tooltip-dataset">{tooltip.datasetLabel}</div>
          <div className="jv-area-chart-tooltip-label">{tooltip.label}</div>
          <div className="jv-area-chart-tooltip-value">{tooltip.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};
