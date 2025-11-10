import React, { useState } from 'react';
import './BoxPlotChart.css';

export interface BoxPlotDataPoint {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
  color?: string;
}

export interface BoxPlotChartProps {
  data: BoxPlotDataPoint[];
  width?: number;
  height?: number;
  showOutliers?: boolean;
  showMean?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const BoxPlotChart: React.FC<BoxPlotChartProps> = ({
  data,
  width = 600,
  height = 400,
  showOutliers = true,
  showMean = true,
  orientation = 'vertical',
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

  // Calculate global min and max for scale
  const allValues = data.flatMap(d => {
    const values = [d.min, d.q1, d.median, d.q3, d.max];
    if (showOutliers && d.outliers) {
      values.push(...d.outliers);
    }
    return values;
  });
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  const valueRange = globalMax - globalMin;
  const minValue = globalMin - valueRange * 0.1;
  const maxValue = globalMax + valueRange * 0.1;

  const getPosition = (value: number): number => {
    if (orientation === 'vertical') {
      return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
    } else {
      return ((value - minValue) / (maxValue - minValue)) * chartWidth;
    }
  };

  const boxWidth = orientation === 'vertical' 
    ? Math.min(80, chartWidth / data.length * 0.6)
    : Math.min(80, chartHeight / data.length * 0.6);

  const getBoxCenter = (index: number): number => {
    if (orientation === 'vertical') {
      return (index + 0.5) * (chartWidth / data.length);
    } else {
      return (index + 0.5) * (chartHeight / data.length);
    }
  };

  const handleMouseMove = (e: React.MouseEvent, content: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      content,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Calculate mean for each box plot
  const calculateMean = (point: BoxPlotDataPoint): number => {
    const values = [point.min, point.q1, point.median, point.q3, point.max];
    if (point.outliers) {
      values.push(...point.outliers);
    }
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };

  return (
    <div className={`jv-box-plot-chart ${className}`}>
      <svg width={width} height={height}>
        <defs>
          <filter id="boxPlotShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {orientation === 'vertical' ? (
            <>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const value = minValue + ratio * (maxValue - minValue);
                const y = getPosition(value);
                return (
                  <g key={ratio}>
                    <line
                      x1={0}
                      y1={y}
                      x2={chartWidth}
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <text
                      x={-10}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="12"
                      fill="#6b7280"
                    >
                      {value.toFixed(1)}
                    </text>
                  </g>
                );
              })}
            </>
          ) : (
            <>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const value = minValue + ratio * (maxValue - minValue);
                const x = getPosition(value);
                return (
                  <g key={ratio}>
                    <line
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={chartHeight}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={chartHeight + 20}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#6b7280"
                    >
                      {value.toFixed(1)}
                    </text>
                  </g>
                );
              })}
            </>
          )}

          {/* Box plots */}
          {data.map((point, index) => {
            const center = getBoxCenter(index);
            const color = point.color || '#3b82f6';
            const mean = calculateMean(point);

            if (orientation === 'vertical') {
              const minY = getPosition(point.min);
              const maxY = getPosition(point.max);
              const q1Y = getPosition(point.q1);
              const q3Y = getPosition(point.q3);
              const medianY = getPosition(point.median);
              const meanY = getPosition(mean);

              return (
                <g key={index}>
                  {/* Whiskers */}
                  <line
                    x1={center}
                    y1={minY}
                    x2={center}
                    y2={q1Y}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={center - boxWidth / 4}
                    y1={minY}
                    x2={center + boxWidth / 4}
                    y2={minY}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={center}
                    y1={q3Y}
                    x2={center}
                    y2={maxY}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={center - boxWidth / 4}
                    y1={maxY}
                    x2={center + boxWidth / 4}
                    y2={maxY}
                    stroke={color}
                    strokeWidth="2"
                  />

                  {/* Box (IQR) */}
                  <rect
                    x={center - boxWidth / 2}
                    y={q3Y}
                    width={boxWidth}
                    height={q1Y - q3Y}
                    fill={color}
                    fillOpacity="0.3"
                    stroke={color}
                    strokeWidth="2"
                    filter="url(#boxPlotShadow)"
                    onMouseMove={(e) =>
                      handleMouseMove(
                        e,
                        `${point.label}\nMin: ${point.min}\nQ1: ${point.q1}\nMedian: ${point.median}\nQ3: ${point.q3}\nMax: ${point.max}${
                          showMean ? `\nMean: ${mean.toFixed(2)}` : ''
                        }`
                      )
                    }
                    onMouseLeave={handleMouseLeave}
                    className="jv-box-plot-box"
                  />

                  {/* Median line */}
                  <line
                    x1={center - boxWidth / 2}
                    y1={medianY}
                    x2={center + boxWidth / 2}
                    y2={medianY}
                    stroke={color}
                    strokeWidth="3"
                  />

                  {/* Mean marker */}
                  {showMean && (
                    <circle
                      cx={center}
                      cy={meanY}
                      r="4"
                      fill="white"
                      stroke={color}
                      strokeWidth="2"
                    />
                  )}

                  {/* Outliers */}
                  {showOutliers && point.outliers && point.outliers.map((outlier, i) => {
                    const outlierY = getPosition(outlier);
                    return (
                      <circle
                        key={i}
                        cx={center}
                        cy={outlierY}
                        r="3"
                        fill={color}
                        opacity="0.6"
                        onMouseMove={(e) =>
                          handleMouseMove(e, `Outlier: ${outlier}`)
                        }
                        onMouseLeave={handleMouseLeave}
                        className="jv-box-plot-outlier"
                      />
                    );
                  })}

                  {/* Label */}
                  <text
                    x={center}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="500"
                  >
                    {point.label}
                  </text>
                </g>
              );
            } else {
              // Horizontal orientation
              const minX = getPosition(point.min);
              const maxX = getPosition(point.max);
              const q1X = getPosition(point.q1);
              const q3X = getPosition(point.q3);
              const medianX = getPosition(point.median);
              const meanX = getPosition(mean);

              return (
                <g key={index}>
                  {/* Whiskers */}
                  <line
                    x1={minX}
                    y1={center}
                    x2={q1X}
                    y2={center}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={minX}
                    y1={center - boxWidth / 4}
                    x2={minX}
                    y2={center + boxWidth / 4}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={q3X}
                    y1={center}
                    x2={maxX}
                    y2={center}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={maxX}
                    y1={center - boxWidth / 4}
                    x2={maxX}
                    y2={center + boxWidth / 4}
                    stroke={color}
                    strokeWidth="2"
                  />

                  {/* Box (IQR) */}
                  <rect
                    x={q1X}
                    y={center - boxWidth / 2}
                    width={q3X - q1X}
                    height={boxWidth}
                    fill={color}
                    fillOpacity="0.3"
                    stroke={color}
                    strokeWidth="2"
                    filter="url(#boxPlotShadow)"
                    onMouseMove={(e) =>
                      handleMouseMove(
                        e,
                        `${point.label}\nMin: ${point.min}\nQ1: ${point.q1}\nMedian: ${point.median}\nQ3: ${point.q3}\nMax: ${point.max}${
                          showMean ? `\nMean: ${mean.toFixed(2)}` : ''
                        }`
                      )
                    }
                    onMouseLeave={handleMouseLeave}
                    className="jv-box-plot-box"
                  />

                  {/* Median line */}
                  <line
                    x1={medianX}
                    y1={center - boxWidth / 2}
                    x2={medianX}
                    y2={center + boxWidth / 2}
                    stroke={color}
                    strokeWidth="3"
                  />

                  {/* Mean marker */}
                  {showMean && (
                    <circle
                      cx={meanX}
                      cy={center}
                      r="4"
                      fill="white"
                      stroke={color}
                      strokeWidth="2"
                    />
                  )}

                  {/* Outliers */}
                  {showOutliers && point.outliers && point.outliers.map((outlier, i) => {
                    const outlierX = getPosition(outlier);
                    return (
                      <circle
                        key={i}
                        cx={outlierX}
                        cy={center}
                        r="3"
                        fill={color}
                        opacity="0.6"
                        onMouseMove={(e) =>
                          handleMouseMove(e, `Outlier: ${outlier}`)
                        }
                        onMouseLeave={handleMouseLeave}
                        className="jv-box-plot-outlier"
                      />
                    );
                  })}

                  {/* Label */}
                  <text
                    x={-10}
                    y={center + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="#374151"
                    fontWeight="500"
                  >
                    {point.label}
                  </text>
                </g>
              );
            }
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="jv-box-plot-tooltip"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
          }}
        >
          {tooltip.content.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}

      {/* Legend */}
      {showMean && (
        <div className="jv-box-plot-legend">
          <div className="jv-box-plot-legend-item">
            <div className="jv-box-plot-legend-line"></div>
            <span>Median</span>
          </div>
          <div className="jv-box-plot-legend-item">
            <div className="jv-box-plot-legend-circle"></div>
            <span>Mean</span>
          </div>
        </div>
      )}
    </div>
  );
};
