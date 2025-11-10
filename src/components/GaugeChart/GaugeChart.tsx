import React from 'react';
import './GaugeChart.css';

export interface GaugeChartProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  width?: number;
  height?: number;
  showValue?: boolean;
  color?: string;
  className?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  label = '',
  width = 300,
  height = 200,
  showValue = true,
  color,
  className = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;
  
  const getColor = () => {
    if (color) return color;
    if (percentage < 33) return '#ef4444';
    if (percentage < 66) return '#f59e0b';
    return '#10b981';
  };

  const centerX = width / 2;
  const centerY = height - 20;
  const radius = Math.min(width, height * 2) / 2 - 20;

  const createArc = (startAngle: number, endAngle: number) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    const x1 = centerX + radius * Math.cos(start);
    const y1 = centerY + radius * Math.sin(start);
    const x2 = centerX + radius * Math.cos(end);
    const y2 = centerY + radius * Math.sin(end);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const needleX = centerX + (radius - 10) * Math.cos((angle * Math.PI) / 180);
  const needleY = centerY + (radius - 10) * Math.sin((angle * Math.PI) / 180);

  return (
    <div className={`jv-gauge-chart ${className}`}>
      <svg width={width} height={height}>
        {/* Background arc */}
        <path d={createArc(-90, 90)} fill="none" stroke="#e5e7eb" strokeWidth="20" strokeLinecap="round" />
        
        {/* Value arc */}
        <path 
          d={createArc(-90, angle)} 
          fill="none" 
          stroke={getColor()} 
          strokeWidth="20" 
          strokeLinecap="round"
          className="jv-gauge-arc"
        />

        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
          className="jv-gauge-needle"
        />
        <circle cx={centerX} cy={centerY} r="8" fill="#374151" />
        <circle cx={centerX} cy={centerY} r="4" fill="white" />

        {/* Value text */}
        {showValue && (
          <text
            x={centerX}
            y={centerY - 30}
            textAnchor="middle"
            className="jv-gauge-value"
          >
            {value}
          </text>
        )}

        {/* Label */}
        {label && (
          <text
            x={centerX}
            y={centerY + 30}
            textAnchor="middle"
            className="jv-gauge-label"
          >
            {label}
          </text>
        )}

        {/* Min/Max labels */}
        <text x={20} y={centerY + 10} className="jv-gauge-limit">{min}</text>
        <text x={width - 20} y={centerY + 10} textAnchor="end" className="jv-gauge-limit">{max}</text>
      </svg>
    </div>
  );
};
