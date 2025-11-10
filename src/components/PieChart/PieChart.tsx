import React, { useState } from 'react';
import './PieChart.css';

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataPoint[];
  width?: number;
  height?: number;
  title?: string;
  showLabels?: boolean;
  showLegend?: boolean;
  showPercentages?: boolean;
  animated?: boolean;
  innerRadius?: number; // for donut chart
  className?: string;
}

const defaultColors = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // orange
  '#ef4444', // red
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#14b8a6', // teal
];

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 400,
  height = 400,
  title,
  showLabels = true,
  showLegend = true,
  showPercentages = true,
  animated = true,
  innerRadius = 0,
  className = '',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; label: string; value: number; percentage: number }>({
    show: false,
    x: 0,
    y: 0,
    label: '',
    value: 0,
    percentage: 0,
  });

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  const getColor = (index: number, item: PieChartDataPoint) => {
    if (item.color) return item.color;
    return defaultColors[index % defaultColors.length];
  };

  const getPercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  const createArc = (
    startAngle: number,
    endAngle: number,
    outerRadius: number,
    innerRad: number = 0
  ) => {
    const startX = centerX + outerRadius * Math.cos(startAngle - Math.PI / 2);
    const startY = centerY + outerRadius * Math.sin(startAngle - Math.PI / 2);
    const endX = centerX + outerRadius * Math.cos(endAngle - Math.PI / 2);
    const endY = centerY + outerRadius * Math.sin(endAngle - Math.PI / 2);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    if (innerRad > 0) {
      // Donut chart
      const innerStartX = centerX + innerRad * Math.cos(startAngle - Math.PI / 2);
      const innerStartY = centerY + innerRad * Math.sin(startAngle - Math.PI / 2);
      const innerEndX = centerX + innerRad * Math.cos(endAngle - Math.PI / 2);
      const innerEndY = centerY + innerRad * Math.sin(endAngle - Math.PI / 2);

      return `
        M ${startX} ${startY}
        A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        L ${innerEndX} ${innerEndY}
        A ${innerRad} ${innerRad} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
        Z
      `;
    } else {
      // Pie chart
      return `
        M ${centerX} ${centerY}
        L ${startX} ${startY}
        A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;
    }
  };

  let currentAngle = 0;

  return (
    <div className={`jv-pie-chart ${className}`}>
      {title && <h3 className="jv-pie-chart-title">{title}</h3>}
      
      <div className="jv-pie-chart-container">
        <svg width={width} height={height} className="jv-pie-chart-svg">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 2 * Math.PI;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            const midAngle = startAngle + angle / 2;

            const isHovered = hoveredIndex === index;
            const sliceRadius = isHovered ? radius + 10 : radius;

            const path = createArc(startAngle, endAngle, sliceRadius, innerRadius);

            // Label position
            const labelRadius = innerRadius > 0 
              ? innerRadius + (radius - innerRadius) / 2 
              : radius * 0.7;
            const labelX = centerX + labelRadius * Math.cos(midAngle - Math.PI / 2);
            const labelY = centerY + labelRadius * Math.sin(midAngle - Math.PI / 2);

            currentAngle = endAngle;

            return (
              <g
                key={index}
                onMouseEnter={(e) => {
                  setHoveredIndex(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    show: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    label: item.label,
                    value: item.value,
                    percentage,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setTooltip({ ...tooltip, show: false });
                }}
                className="jv-pie-chart-slice-group"
              >
                <path
                  d={path}
                  fill={getColor(index, item)}
                  className={`jv-pie-chart-slice ${animated ? 'animated' : ''} ${isHovered ? 'hovered' : ''}`}
                  style={{
                    transformOrigin: `${centerX}px ${centerY}px`,
                  }}
                />
                
                {showLabels && percentage > 5 && (
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    className="jv-pie-chart-label"
                  >
                    {showPercentages ? `${percentage.toFixed(0)}%` : item.value}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {showLegend && (
          <div className="jv-pie-chart-legend">
            {data.map((item, index) => (
              <div
                key={index}
                className={`jv-pie-chart-legend-item ${hoveredIndex === index ? 'highlighted' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="jv-pie-chart-legend-color"
                  style={{ background: getColor(index, item) }}
                />
                <span className="jv-pie-chart-legend-label">{item.label}</span>
                <span className="jv-pie-chart-legend-value">
                  {item.value.toLocaleString()} ({getPercentage(item.value)}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-pie-chart-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="jv-pie-chart-tooltip-label">{tooltip.label}</div>
          <div className="jv-pie-chart-tooltip-value">{tooltip.value.toLocaleString()}</div>
          <div className="jv-pie-chart-tooltip-percentage">{tooltip.percentage.toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
};
