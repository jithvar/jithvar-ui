import React, { useState } from 'react';
import './FunnelChart.css';

export interface FunnelChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartProps {
  data: FunnelChartDataPoint[];
  title?: string;
  width?: number;
  height?: number;
  showValues?: boolean;
  showPercentages?: boolean;
  animated?: boolean;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  title,
  width = 600,
  height = 400,
  showValues = true,
  showPercentages = true,
  animated = true,
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    label: string;
    value: number;
    percentage: number;
  }>({
    show: false,
    x: 0,
    y: 0,
    label: '',
    value: 0,
    percentage: 0,
  });

  const padding = { top: 40, right: 20, bottom: 40, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const maxValue = Math.max(...data.map(d => d.value));
  const totalValue = data[0]?.value || 1; // Use first value as 100% baseline

  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Calculate trapezoid points for each segment
  const segments = data.map((item, index) => {
    const segmentHeight = chartHeight / data.length;
    const y = padding.top + index * segmentHeight;
    
    const topWidth = (item.value / maxValue) * chartWidth;
    const bottomWidth = index < data.length - 1 
      ? (data[index + 1].value / maxValue) * chartWidth
      : topWidth * 0.8; // Last segment tapers

    const topLeft = padding.left + (chartWidth - topWidth) / 2;
    const topRight = topLeft + topWidth;
    const bottomLeft = padding.left + (chartWidth - bottomWidth) / 2;
    const bottomRight = bottomLeft + bottomWidth;

    const percentage = (item.value / totalValue) * 100;
    const color = item.color || defaultColors[index % defaultColors.length];

    return {
      points: `${topLeft},${y} ${topRight},${y} ${bottomRight},${y + segmentHeight} ${bottomLeft},${y + segmentHeight}`,
      centerX: padding.left + chartWidth / 2,
      centerY: y + segmentHeight / 2,
      ...item,
      percentage,
      color,
    };
  });

  return (
    <div className="jv-funnel-chart-container">
      {title && <h3 className="jv-funnel-chart-title">{title}</h3>}
      
      <svg 
        width={width} 
        height={height} 
        className={`jv-funnel-chart ${animated ? 'jv-funnel-animated' : ''}`}
      >
        {/* Funnel segments */}
        {segments.map((segment, index) => (
          <g key={index}>
            <polygon
              points={segment.points}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
              className="jv-funnel-segment"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({
                  show: true,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                  label: segment.label,
                  value: segment.value,
                  percentage: segment.percentage,
                });
              }}
              onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
            />

            {/* Labels */}
            <text
              x={segment.centerX}
              y={segment.centerY - 5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="600"
              className="jv-funnel-label"
            >
              {segment.label}
            </text>

            {/* Values and percentages */}
            {(showValues || showPercentages) && (
              <text
                x={segment.centerX}
                y={segment.centerY + 15}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                className="jv-funnel-value"
              >
                {showValues && segment.value.toLocaleString()}
                {showValues && showPercentages && ' • '}
                {showPercentages && `${segment.percentage.toFixed(1)}%`}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Stats summary */}
      <div className="jv-funnel-stats">
        <div className="jv-funnel-stat">
          <span className="jv-funnel-stat-label">Total:</span>
          <span className="jv-funnel-stat-value">{totalValue.toLocaleString()}</span>
        </div>
        <div className="jv-funnel-stat">
          <span className="jv-funnel-stat-label">Conversion Rate:</span>
          <span className="jv-funnel-stat-value">
            {data.length > 1 
              ? `${((data[data.length - 1].value / totalValue) * 100).toFixed(1)}%`
              : '100%'
            }
          </span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-funnel-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-funnel-tooltip-label">{tooltip.label}</div>
          <div className="jv-funnel-tooltip-value">
            {tooltip.value.toLocaleString()} ({tooltip.percentage.toFixed(1)}%)
          </div>
        </div>
      )}
    </div>
  );
};
