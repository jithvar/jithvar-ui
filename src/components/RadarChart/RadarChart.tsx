import React, { useState } from 'react';
import './RadarChart.css';

export interface RadarChartDataPoint {
  label: string;
  value: number;
}

export interface RadarChartDataset {
  label: string;
  data: number[];
  color?: string;
  fill?: boolean;
}

export interface RadarChartProps {
  labels: string[];
  datasets: RadarChartDataset[];
  title?: string;
  size?: number;
  max?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  labels,
  datasets,
  title,
  size = 400,
  max = 100,
  showGrid = true,
  showLabels = true,
  animated = true,
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    label: string;
    value: number;
    datasetLabel: string;
  }>({
    show: false,
    x: 0,
    y: 0,
    label: '',
    value: 0,
    datasetLabel: '',
  });

  const padding = 60;
  const center = size / 2;
  const radius = (size - padding * 2) / 2;
  const angleStep = (Math.PI * 2) / labels.length;
  const gridLevels = 5;

  // Calculate point coordinates
  const getPointCoordinates = (value: number, index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Calculate label position (outside the chart)
  const getLabelCoordinates = (index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const labelRadius = radius + 30;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    };
  };

  // Generate path for dataset
  const generatePath = (data: number[]) => {
    const points = data.map((value, index) => getPointCoordinates(value, index));
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';
    return pathData;
  };

  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="jv-radar-chart-container">
      {title && <h3 className="jv-radar-chart-title">{title}</h3>}
      
      <svg 
        width={size} 
        height={size} 
        className={`jv-radar-chart ${animated ? 'jv-radar-animated' : ''}`}
      >
        {/* Grid circles */}
        {showGrid && (
          <g className="jv-radar-grid">
            {Array.from({ length: gridLevels }).map((_, i) => {
              const r = ((i + 1) / gridLevels) * radius;
              return (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={r}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        )}

        {/* Grid lines (axes) */}
        {showGrid && (
          <g className="jv-radar-axes">
            {labels.map((_, index) => {
              const point = getPointCoordinates(max, index);
              return (
                <line
                  key={index}
                  x1={center}
                  y1={center}
                  x2={point.x}
                  y2={point.y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              );
            })}
          </g>
        )}

        {/* Data paths */}
        {datasets.map((dataset, datasetIndex) => {
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];
          const fill = dataset.fill !== false;
          
          return (
            <g key={datasetIndex}>
              {/* Fill area */}
              {fill && (
                <path
                  d={generatePath(dataset.data)}
                  fill={color}
                  fillOpacity="0.2"
                  className="jv-radar-area"
                />
              )}
              
              {/* Stroke line */}
              <path
                d={generatePath(dataset.data)}
                fill="none"
                stroke={color}
                strokeWidth="2"
                className="jv-radar-line"
              />

              {/* Data points */}
              {dataset.data.map((value, index) => {
                const point = getPointCoordinates(value, index);
                return (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    className="jv-radar-point"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        show: true,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10,
                        label: labels[index],
                        value: value,
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

        {/* Labels */}
        {showLabels && (
          <g className="jv-radar-labels">
            {labels.map((label, index) => {
              const pos = getLabelCoordinates(index);
              return (
                <text
                  key={index}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="jv-radar-label"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {label}
                </text>
              );
            })}
          </g>
        )}
      </svg>

      {/* Legend */}
      {datasets.length > 1 && (
        <div className="jv-radar-legend">
          {datasets.map((dataset, index) => {
            const color = dataset.color || defaultColors[index % defaultColors.length];
            return (
              <div key={index} className="jv-radar-legend-item">
                <span 
                  className="jv-radar-legend-color" 
                  style={{ backgroundColor: color }}
                />
                <span className="jv-radar-legend-label">{dataset.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-radar-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-radar-tooltip-dataset">{tooltip.datasetLabel}</div>
          <div className="jv-radar-tooltip-content">
            <strong>{tooltip.label}:</strong> {tooltip.value}
          </div>
        </div>
      )}
    </div>
  );
};
