import React, { useState } from 'react';
import './WaterfallChart.css';

export interface WaterfallDataPoint {
  label: string;
  value: number;
  isTotal?: boolean;
  color?: string;
}

export interface WaterfallChartProps {
  data: WaterfallDataPoint[];
  title?: string;
  width?: number;
  height?: number;
  startLabel?: string;
  endLabel?: string;
  showConnectors?: boolean;
  animated?: boolean;
}

export const WaterfallChart: React.FC<WaterfallChartProps> = ({
  data,
  title,
  width = 700,
  height = 400,
  startLabel = 'Start',
  endLabel = 'End',
  showConnectors = true,
  animated = true,
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    label: string;
    value: number;
    cumulative: number;
  }>({
    show: false,
    x: 0,
    y: 0,
    label: '',
    value: 0,
    cumulative: 0,
  });

  const padding = { top: 40, right: 20, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate cumulative values
  let cumulative = 0;
  const processedData = data.map((item) => {
    const start = item.isTotal ? 0 : cumulative;
    const value = item.value;
    const end = item.isTotal ? cumulative + value : cumulative + value;
    cumulative = end;
    
    return {
      ...item,
      start,
      end,
      cumulative: end,
      isPositive: value >= 0,
    };
  });

  const allValues = processedData.flatMap(d => [d.start, d.end]);
  const minValue = Math.min(0, ...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue;

  const getY = (value: number) => {
    return padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
  };

  const barWidth = (chartWidth / (processedData.length + 0.5)) * 0.7;
  const barGap = (chartWidth / (processedData.length + 0.5)) * 0.3;

  const getColor = (item: any) => {
    if (item.color) return item.color;
    if (item.isTotal) return '#6b7280';
    return item.isPositive ? '#10b981' : '#ef4444';
  };

  return (
    <div className="jv-waterfall-chart-container">
      {title && <h3 className="jv-waterfall-chart-title">{title}</h3>}
      
      <svg 
        width={width} 
        height={height} 
        className={`jv-waterfall-chart ${animated ? 'jv-waterfall-animated' : ''}`}
      >
        {/* Grid lines */}
        <g className="jv-waterfall-grid">
          {[0, 25, 50, 75, 100].map((percent) => {
            const value = minValue + (valueRange * percent) / 100;
            const y = getY(value);
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
                  {Math.round(value)}
                </text>
              </g>
            );
          })}
        </g>

        {/* Connectors */}
        {showConnectors && processedData.map((item, index) => {
          if (index === processedData.length - 1) return null;
          const nextItem = processedData[index + 1];
          
          const x1 = padding.left + (index + 0.5) * (chartWidth / processedData.length) + barWidth / 2;
          const x2 = padding.left + (index + 1.5) * (chartWidth / processedData.length) - barWidth / 2;
          const y = getY(item.end);
          const nextY = getY(nextItem.start);

          return (
            <line
              key={`connector-${index}`}
              x1={x1}
              y1={y}
              x2={x2}
              y2={nextY}
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="4,4"
              className="jv-waterfall-connector"
            />
          );
        })}

        {/* Bars */}
        {processedData.map((item, index) => {
          const x = padding.left + (index + 0.5) * (chartWidth / processedData.length) - barWidth / 2;
          const startY = getY(item.start);
          const endY = getY(item.end);
          const barHeight = Math.abs(startY - endY);
          const barY = Math.min(startY, endY);
          const color = getColor(item);

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="jv-waterfall-bar"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    show: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    label: item.label,
                    value: item.value,
                    cumulative: item.cumulative,
                  });
                }}
                onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
              />

              {/* Value label */}
              <text
                x={x + barWidth / 2}
                y={barY - 5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={color}
                className="jv-waterfall-value-label"
              >
                {item.value > 0 ? '+' : ''}{item.value}
              </text>

              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
                transform={`rotate(-45, ${x + barWidth / 2}, ${height - padding.bottom + 20})`}
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Zero line */}
        {minValue < 0 && (
          <line
            x1={padding.left}
            y1={getY(0)}
            x2={padding.left + chartWidth}
            y2={getY(0)}
            stroke="#1f2937"
            strokeWidth="2"
          />
        )}
      </svg>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-waterfall-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-waterfall-tooltip-label">{tooltip.label}</div>
          <div className="jv-waterfall-tooltip-value">
            Change: <strong>{tooltip.value > 0 ? '+' : ''}{tooltip.value}</strong>
          </div>
          <div className="jv-waterfall-tooltip-cumulative">
            Total: <strong>{tooltip.cumulative}</strong>
          </div>
        </div>
      )}
    </div>
  );
};
