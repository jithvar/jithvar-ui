import React, { useState } from 'react';
import './BubbleChart.css';

export interface BubbleChartDataPoint {
  x: number;
  y: number;
  size: number;
  label: string;
  color?: string;
}

export interface BubbleChartProps {
  data: BubbleChartDataPoint[];
  width?: number;
  height?: number;
  title?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'];

export const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  width = 700,
  height = 500,
  title,
  showGrid = true,
  showLabels = true,
  animated = true,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  className = '',
}) => {
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; label: string; data: BubbleChartDataPoint }>({
    show: false,
    x: 0,
    y: 0,
    label: '',
    data: { x: 0, y: 0, size: 0, label: '' },
  });
  const [animatedProgress, setAnimatedProgress] = useState(0);

  React.useEffect(() => {
    if (animated) {
      setTimeout(() => setAnimatedProgress(1), 100);
    } else {
      setAnimatedProgress(1);
    }
  }, [animated]);

  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxX = Math.max(...data.map(d => d.x));
  const maxY = Math.max(...data.map(d => d.y));
  const maxSize = Math.max(...data.map(d => d.size));

  const getColor = (index: number, point: BubbleChartDataPoint): string => {
    return point.color || defaultColors[index % defaultColors.length];
  };

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(0);
  };

  const renderGrid = () => {
    const gridLines = 5;
    const lines = [];

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i;
      const x = padding.left + (chartWidth / gridLines) * i;
      const yValue = maxY - (maxY / gridLines) * i;
      const xValue = (maxX / gridLines) * i;
      
      lines.push(
        <g key={`y-${i}`}>
          <line
            x1={padding.left}
            y1={y}
            x2={padding.left + chartWidth}
            y2={y}
            className="jv-bubble-chart-grid-line"
          />
          <text
            x={padding.left - 10}
            y={y + 4}
            textAnchor="end"
            className="jv-bubble-chart-axis-label"
          >
            {formatValue(yValue)}
          </text>
        </g>
      );

      lines.push(
        <g key={`x-${i}`}>
          <line
            x1={x}
            y1={padding.top}
            x2={x}
            y2={padding.top + chartHeight}
            className="jv-bubble-chart-grid-line"
          />
          <text
            x={x}
            y={padding.top + chartHeight + 20}
            textAnchor="middle"
            className="jv-bubble-chart-axis-label"
          >
            {formatValue(xValue)}
          </text>
        </g>
      );
    }

    return lines;
  };

  return (
    <div className={`jv-bubble-chart ${className}`}>
      {title && <h3 className="jv-bubble-chart-title">{title}</h3>}
      <svg width={width} height={height} className="jv-bubble-chart-svg">
        {/* Grid */}
        {showGrid && renderGrid()}
        
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          className="jv-bubble-chart-axis"
        />
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          className="jv-bubble-chart-axis"
        />

        {/* Axis Labels */}
        <text
          x={padding.left + chartWidth / 2}
          y={height - 10}
          textAnchor="middle"
          className="jv-bubble-chart-axis-title"
        >
          {xLabel}
        </text>
        <text
          x={15}
          y={padding.top + chartHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90, 15, ${padding.top + chartHeight / 2})`}
          className="jv-bubble-chart-axis-title"
        >
          {yLabel}
        </text>
        
        {/* Bubbles */}
        {data.map((point, index) => {
          const cx = padding.left + (point.x / maxX) * chartWidth;
          const cy = padding.top + chartHeight - (point.y / maxY) * chartHeight;
          const r = (point.size / maxSize) * 50 * animatedProgress;

          return (
            <g key={index}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={getColor(index, point)}
                className="jv-bubble-chart-bubble"
                opacity={0.7}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    show: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    label: point.label,
                    data: point,
                  });
                }}
                onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
              />
              {showLabels && r > 20 && (
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  className="jv-bubble-chart-label"
                  pointerEvents="none"
                >
                  {point.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-bubble-chart-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-bubble-chart-tooltip-label">{tooltip.label}</div>
          <div className="jv-bubble-chart-tooltip-data">
            <div>X: {tooltip.data.x.toLocaleString()}</div>
            <div>Y: {tooltip.data.y.toLocaleString()}</div>
            <div>Size: {tooltip.data.size.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};
