import React, { useState } from 'react';
import './ScatterPlot.css';

export interface ScatterPlotDataPoint {
  x: number;
  y: number;
  label: string;
  color?: string;
  size?: number;
}

export interface ScatterPlotProps {
  data: ScatterPlotDataPoint[];
  width?: number;
  height?: number;
  title?: string;
  showGrid?: boolean;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  width = 700,
  height = 500,
  title,
  showGrid = true,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  className = '',
}) => {
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; point: ScatterPlotDataPoint }>({
    show: false,
    x: 0,
    y: 0,
    point: { x: 0, y: 0, label: '' },
  });

  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxX = Math.max(...data.map(d => d.x));
  const maxY = Math.max(...data.map(d => d.y));

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(0);
  };

  return (
    <div className={`jv-scatter-plot ${className}`}>
      {title && <h3 className="jv-scatter-plot-title">{title}</h3>}
      <svg width={width} height={height}>
        {/* Grid */}
        {showGrid && Array.from({ length: 6 }).map((_, i) => {
          const y = padding.top + (chartHeight / 5) * i;
          const x = padding.left + (chartWidth / 5) * i;
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={padding.left + chartWidth} y2={y} className="jv-scatter-plot-grid" />
              <line x1={x} y1={padding.top} x2={x} y2={padding.top + chartHeight} className="jv-scatter-plot-grid" />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" className="jv-scatter-plot-label">
                {formatValue(maxY - (maxY / 5) * i)}
              </text>
              <text x={x} y={padding.top + chartHeight + 20} textAnchor="middle" className="jv-scatter-plot-label">
                {formatValue((maxX / 5) * i)}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + chartHeight} stroke="#9ca3af" strokeWidth="2" />
        <line x1={padding.left} y1={padding.top + chartHeight} x2={padding.left + chartWidth} y2={padding.top + chartHeight} stroke="#9ca3af" strokeWidth="2" />

        {/* Points */}
        {data.map((point, index) => {
          const cx = padding.left + (point.x / maxX) * chartWidth;
          const cy = padding.top + chartHeight - (point.y / maxY) * chartHeight;
          const r = point.size || 6;

          return (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={r}
              fill={point.color || '#3b82f6'}
              className="jv-scatter-plot-point"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({ show: true, x: rect.left, y: rect.top - 10, point });
              }}
              onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
            />
          );
        })}

        {/* Axis labels */}
        <text x={padding.left + chartWidth / 2} y={height - 10} textAnchor="middle" className="jv-scatter-plot-axis-title">{xLabel}</text>
        <text x={15} y={padding.top + chartHeight / 2} textAnchor="middle" transform={`rotate(-90, 15, ${padding.top + chartHeight / 2})`} className="jv-scatter-plot-axis-title">{yLabel}</text>
      </svg>

      {tooltip.show && (
        <div className="jv-scatter-plot-tooltip" style={{ position: 'fixed', left: `${tooltip.x}px`, top: `${tooltip.y}px`, transform: 'translate(-50%, -100%)' }}>
          <div>{tooltip.point.label}</div>
          <div>X: {tooltip.point.x}</div>
          <div>Y: {tooltip.point.y}</div>
        </div>
      )}
    </div>
  );
};
