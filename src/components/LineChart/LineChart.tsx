import React, { useEffect, useState } from 'react';
import './LineChart.css';

export interface LineChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartDataset {
  label: string;
  data: LineChartDataPoint[];
  color?: string;
  fill?: boolean;
}

export interface LineChartProps {
  data?: LineChartDataPoint[];
  datasets?: LineChartDataset[];
  width?: number;
  height?: number;
  title?: string;
  showGrid?: boolean;
  showPoints?: boolean;
  animated?: boolean;
  smooth?: boolean;
  showFill?: boolean;
  showLegend?: boolean;
  color?: string;
  className?: string;
}

const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const LineChart: React.FC<LineChartProps> = ({
  data,
  datasets,
  width = 600,
  height = 400,
  title,
  showGrid = true,
  showPoints = true,
  animated = true,
  smooth = true,
  showFill = true,
  showLegend = false,
  color = '#3b82f6',
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
  const normalizedDatasets: LineChartDataset[] = datasets 
    ? datasets 
    : data 
    ? [{ label: 'Data', data, color, fill: showFill }]
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
  }, [normalizedDatasets, animated]);

  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Get all unique labels
  const allLabels = Array.from(
    new Set(normalizedDatasets.flatMap(ds => ds.data.map(d => d.label)))
  );

  // Get max value across all datasets
  const maxValue = Math.max(
    ...normalizedDatasets.flatMap(ds => ds.data.map(d => d.value))
  );

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(0);
  };

  const getColor = (index: number, dataset: LineChartDataset) => {
    if (dataset.color) return dataset.color;
    return defaultColors[index % defaultColors.length];
  };

  const createPath = (data: LineChartDataPoint[], dataset: LineChartDataset) => {
    if (data.length === 0) return '';

    const points = data.map((point, index) => {
      const x = padding.left + (index / (allLabels.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - (point.value / maxValue) * chartHeight;
      return { x, y };
    });

    if (smooth) {
      // Create smooth curve using bezier curves
      let path = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const controlX = (current.x + next.x) / 2;
        
        path += ` Q ${controlX} ${current.y}, ${controlX} ${(current.y + next.y) / 2}`;
        path += ` Q ${controlX} ${next.y}, ${next.x} ${next.y}`;
      }
      
      return path;
    } else {
      // Create straight lines
      return points.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ');
    }
  };

  const createFillPath = (data: LineChartDataPoint[]) => {
    if (data.length === 0) return '';

    const linePath = createPath(data, normalizedDatasets[0]);
    const lastX = padding.left + chartWidth;
    const bottomY = padding.top + chartHeight;
    
    return `${linePath} L ${lastX} ${bottomY} L ${padding.left} ${bottomY} Z`;
  };

  const renderGrid = () => {
    const gridLines = 5;
    const lines = [];

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i;
      const value = maxValue - (maxValue / gridLines) * i;
      
      lines.push(
        <g key={`h-${i}`}>
          <line
            x1={padding.left}
            y1={y}
            x2={padding.left + chartWidth}
            y2={y}
            className="jv-line-chart-grid-line"
          />
          <text
            x={padding.left - 10}
            y={y + 4}
            textAnchor="end"
            className="jv-line-chart-axis-label"
          >
            {formatValue(value)}
          </text>
        </g>
      );
    }

    // Vertical grid lines
    allLabels.forEach((label, index) => {
      const x = padding.left + (index / (allLabels.length - 1)) * chartWidth;
      
      lines.push(
        <g key={`v-${index}`}>
          <line
            x1={x}
            y1={padding.top}
            x2={x}
            y2={padding.top + chartHeight}
            className="jv-line-chart-grid-line"
          />
          <text
            x={x}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            className="jv-line-chart-label"
          >
            {label}
          </text>
        </g>
      );
    });

    return lines;
  };

  return (
    <div className={`jv-line-chart ${className}`}>
      {title && <h3 className="jv-line-chart-title">{title}</h3>}
      
      <svg width={width} height={height} className="jv-line-chart-svg">
        <defs>
          {normalizedDatasets.map((dataset, index) => (
            <linearGradient
              key={index}
              id={`gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={getColor(index, dataset)} stopOpacity="0.3" />
              <stop offset="100%" stopColor={getColor(index, dataset)} stopOpacity="0.05" />
            </linearGradient>
          ))}
        </defs>

        {/* Grid */}
        {showGrid && renderGrid()}
        
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          className="jv-line-chart-axis"
        />
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          className="jv-line-chart-axis"
        />
        
        {/* Lines and Areas */}
        {normalizedDatasets.map((dataset, datasetIndex) => {
          const color = getColor(datasetIndex, dataset);
          
          return (
            <g key={datasetIndex}>
              {/* Fill area */}
              {dataset.fill && (
                <path
                  d={createFillPath(dataset.data)}
                  fill={`url(#gradient-${datasetIndex})`}
                  className="jv-line-chart-area"
                  style={{
                    strokeDasharray: animated ? chartWidth * 2 : 0,
                    strokeDashoffset: animated ? chartWidth * 2 * (1 - animatedProgress) : 0,
                  }}
                />
              )}
              
              {/* Line */}
              <path
                d={createPath(dataset.data, dataset)}
                fill="none"
                stroke={color}
                strokeWidth="3"
                className="jv-line-chart-line"
                style={{
                  strokeDasharray: animated ? chartWidth * 2 : 0,
                  strokeDashoffset: animated ? chartWidth * 2 * (1 - animatedProgress) : 0,
                }}
              />
              
              {/* Points */}
              {showPoints && dataset.data.map((point, pointIndex) => {
                const x = padding.left + (pointIndex / (allLabels.length - 1)) * chartWidth;
                const y = padding.top + chartHeight - (point.value / maxValue) * chartHeight;
                
                return (
                  <g key={pointIndex}>
                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill="white"
                      stroke={color}
                      strokeWidth="2"
                      className="jv-line-chart-point"
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
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      {normalizedDatasets.length > 1 && (
        <div className="jv-line-chart-legend">
          {normalizedDatasets.map((dataset, index) => (
            <div key={index} className="jv-line-chart-legend-item">
              <div
                className="jv-line-chart-legend-color"
                style={{ background: getColor(index, dataset) }}
              />
              <span className="jv-line-chart-legend-label">{dataset.label}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-line-chart-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-line-chart-tooltip-dataset">{tooltip.datasetLabel}</div>
          <div className="jv-line-chart-tooltip-label">{tooltip.label}</div>
          <div className="jv-line-chart-tooltip-value">{tooltip.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};
