import React, { useState } from 'react';
import './HeartbeatChart.css';

export interface HeartbeatDataPoint {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface HeartbeatChartProps {
  data: HeartbeatDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  fillArea?: boolean;
  showBaseline?: boolean;
  baselineValue?: number;
  smoothing?: number;
  showPeaks?: boolean;
  className?: string;
}

export const HeartbeatChart: React.FC<HeartbeatChartProps> = ({
  data,
  width = 800,
  height = 300,
  color = '#ef4444',
  fillArea = true,
  showBaseline = true,
  baselineValue,
  smoothing = 0.3,
  showPeaks = true,
  className = '',
}) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const sortedData = [...data].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const minTime = sortedData[0].timestamp.getTime();
  const maxTime = sortedData[sortedData.length - 1].timestamp.getTime();
  const timeRange = maxTime - minTime;

  const values = sortedData.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;
  const paddedMin = minValue - valueRange * 0.1;
  const paddedMax = maxValue + valueRange * 0.1;
  const paddedRange = paddedMax - paddedMin;

  const baseline = baselineValue !== undefined ? baselineValue : paddedMin;

  const getX = (timestamp: Date): number => {
    return ((timestamp.getTime() - minTime) / timeRange) * chartWidth;
  };

  const getY = (value: number): number => {
    return chartHeight - ((value - paddedMin) / paddedRange) * chartHeight;
  };

  const generateSmoothPath = (): string => {
    if (sortedData.length === 0) return '';
    
    const points = sortedData.map(d => ({
      x: getX(d.timestamp),
      y: getY(d.value),
    }));

    if (points.length === 1) {
      return `M ${points[0].x} ${points[0].y}`;
    }

    if (points.length === 2) {
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    }

    const tension = smoothing;
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  const linePath = generateSmoothPath();
  const baselineY = getY(baseline);

  const areaPath = fillArea && sortedData.length > 0
    ? `${linePath} L ${getX(sortedData[sortedData.length - 1].timestamp)} ${baselineY} L ${getX(sortedData[0].timestamp)} ${baselineY} Z`
    : '';

  const peaks: HeartbeatDataPoint[] = [];
  if (showPeaks) {
    for (let i = 1; i < sortedData.length - 1; i++) {
      const prev = sortedData[i - 1].value;
      const curr = sortedData[i].value;
      const next = sortedData[i + 1].value;
      
      if (curr > prev && curr > next && curr > (minValue + valueRange * 0.3)) {
        peaks.push(sortedData[i]);
      }
    }
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleMouseMove = (e: React.MouseEvent, point: HeartbeatDataPoint) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      content: `${point.label || 'Value'}: ${point.value.toFixed(2)}\nTime: ${formatTime(point.timestamp)}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const timeLabels: Date[] = [];
  const labelCount = 6;
  for (let i = 0; i <= labelCount; i++) {
    const time = minTime + (timeRange / labelCount) * i;
    timeLabels.push(new Date(time));
  }

  const bpm = peaks.length > 1 
    ? Math.round((peaks.length - 1) / (timeRange / 1000 / 60))
    : 0;

  return (
    <div className={`jv-heartbeat-chart ${className}`}>
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="heartbeatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          <filter id="heartbeatGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const value = paddedMin + ratio * paddedRange;
            const y = getY(value);
            return (
              <g key={ratio}>
                <line x1={0} y1={y} x2={chartWidth} y2={y} stroke="#e5e7eb" strokeWidth="1" opacity="0.5" />
                <text x={-10} y={y + 4} textAnchor="end" fontSize="11" fill="#9ca3af">
                  {value.toFixed(0)}
                </text>
              </g>
            );
          })}

          {showBaseline && (
            <line x1={0} y1={baselineY} x2={chartWidth} y2={baselineY} stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
          )}

          {fillArea && areaPath && <path d={areaPath} fill="url(#heartbeatGradient)" />}

          <path d={linePath} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#heartbeatGlow)" className="jv-heartbeat-line" />

          {sortedData.map((point, index) => (
            <circle key={index} cx={getX(point.timestamp)} cy={getY(point.value)} r="4" fill={color} stroke="white" strokeWidth="2" opacity="0.8"
              onMouseMove={(e) => handleMouseMove(e, point)} onMouseLeave={handleMouseLeave} className="jv-heartbeat-point" />
          ))}

          {showPeaks && peaks.map((peak, index) => (
            <g key={`peak-${index}`}>
              <circle cx={getX(peak.timestamp)} cy={getY(peak.value)} r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6">
                <animate attributeName="r" from="6" to="12" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx={getX(peak.timestamp)} cy={getY(peak.value)} r="6" fill={color} opacity="1" />
            </g>
          ))}

          {timeLabels.map((time, i) => {
            const x = getX(time);
            return (
              <text key={i} x={x} y={chartHeight + 20} textAnchor="middle" fontSize="11" fill="#6b7280">
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </text>
            );
          })}
        </g>
      </svg>

      {tooltip.visible && (
        <div className="jv-heartbeat-tooltip" style={{ left: tooltip.x + 10, top: tooltip.y - 10 }}>
          {tooltip.content.split('\n').map((line, i) => (<div key={i}>{line}</div>))}
        </div>
      )}

      {showPeaks && bpm > 0 && (
        <div className="jv-heartbeat-stats">
          <div className="jv-heartbeat-stat">
            <span className="jv-heartbeat-stat-label">Peaks Detected:</span>
            <span className="jv-heartbeat-stat-value">{peaks.length}</span>
          </div>
          <div className="jv-heartbeat-stat">
            <span className="jv-heartbeat-stat-label">Est. BPM:</span>
            <span className="jv-heartbeat-stat-value" style={{ color }}>{bpm}</span>
          </div>
        </div>
      )}
    </div>
  );
};
