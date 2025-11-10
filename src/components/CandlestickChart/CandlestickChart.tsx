import React, { useState } from 'react';
import './CandlestickChart.css';

export interface CandlestickDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlestickChartProps {
  data: CandlestickDataPoint[];
  title?: string;
  width?: number;
  height?: number;
  showVolume?: boolean;
  animated?: boolean;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  title,
  width = 800,
  height = 400,
  showVolume = false,
  animated = true,
}) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    data: CandlestickDataPoint;
  }>({
    show: false,
    x: 0,
    y: 0,
    data: { date: '', open: 0, high: 0, low: 0, close: 0 },
  });

  const padding = { top: 40, right: 60, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate price range
  const allPrices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice;
  const priceMargin = priceRange * 0.1;

  const getY = (price: number) => {
    return padding.top + ((maxPrice + priceMargin - price) / (priceRange + 2 * priceMargin)) * chartHeight;
  };

  const candleWidth = Math.max(4, chartWidth / data.length * 0.7);
  const candleGap = chartWidth / data.length * 0.3;

  return (
    <div className="jv-candlestick-chart-container">
      {title && <h3 className="jv-candlestick-chart-title">{title}</h3>}
      
      <svg 
        width={width} 
        height={height} 
        className={`jv-candlestick-chart ${animated ? 'jv-candlestick-animated' : ''}`}
      >
        {/* Grid lines */}
        <g className="jv-candlestick-grid">
          {[0, 25, 50, 75, 100].map((percent) => {
            const price = minPrice + (priceRange * percent) / 100;
            const y = getY(price);
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
                  x={padding.left + chartWidth + 10}
                  y={y}
                  dominantBaseline="middle"
                  fontSize="11"
                  fill="#9ca3af"
                >
                  ${price.toFixed(2)}
                </text>
              </g>
            );
          })}
        </g>

        {/* Candlesticks */}
        {data.map((candle, index) => {
          const x = padding.left + (index + 0.5) * (chartWidth / data.length);
          const isUp = candle.close >= candle.open;
          const color = isUp ? '#10b981' : '#ef4444';
          
          const openY = getY(candle.open);
          const closeY = getY(candle.close);
          const highY = getY(candle.high);
          const lowY = getY(candle.low);
          
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);

          return (
            <g 
              key={index}
              className="jv-candlestick"
              style={{
                animationDelay: `${index * 0.02}s`,
              }}
            >
              {/* High-Low wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth="2"
                className="jv-candlestick-wick"
              />

              {/* Open-Close body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(2, bodyHeight)}
                fill={isUp ? color : color}
                stroke={color}
                strokeWidth="1"
                className="jv-candlestick-body"
                style={{
                  fillOpacity: isUp ? 0 : 1,
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    show: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    data: candle,
                  });
                }}
                onMouseLeave={() => setTooltip({ ...tooltip, show: false })}
              />

              {/* Date label (show every nth label) */}
              {index % Math.ceil(data.length / 10) === 0 && (
                <text
                  x={x}
                  y={height - padding.bottom + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6b7280"
                  transform={`rotate(-45, ${x}, ${height - padding.bottom + 20})`}
                >
                  {candle.date}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="jv-candlestick-legend">
        <div className="jv-candlestick-legend-item">
          <span className="jv-candlestick-legend-box" style={{ background: '#10b981' }} />
          <span>Bullish (Close ≥ Open)</span>
        </div>
        <div className="jv-candlestick-legend-item">
          <span className="jv-candlestick-legend-box" style={{ background: '#ef4444' }} />
          <span>Bearish (Close &lt; Open)</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="jv-candlestick-tooltip"
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="jv-candlestick-tooltip-date">{tooltip.data.date}</div>
          <div className="jv-candlestick-tooltip-row">
            <span>Open:</span>
            <strong>${tooltip.data.open.toFixed(2)}</strong>
          </div>
          <div className="jv-candlestick-tooltip-row">
            <span>High:</span>
            <strong>${tooltip.data.high.toFixed(2)}</strong>
          </div>
          <div className="jv-candlestick-tooltip-row">
            <span>Low:</span>
            <strong>${tooltip.data.low.toFixed(2)}</strong>
          </div>
          <div className="jv-candlestick-tooltip-row">
            <span>Close:</span>
            <strong>${tooltip.data.close.toFixed(2)}</strong>
          </div>
          <div className="jv-candlestick-tooltip-change">
            Change: <strong style={{ color: tooltip.data.close >= tooltip.data.open ? '#10b981' : '#ef4444' }}>
              {tooltip.data.close >= tooltip.data.open ? '+' : ''}
              {(tooltip.data.close - tooltip.data.open).toFixed(2)}
              ({(((tooltip.data.close - tooltip.data.open) / tooltip.data.open) * 100).toFixed(2)}%)
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};
