import React from 'react';
import { CandlestickChart } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const CandlestickChartDemo: React.FC = () => {
  const stockData = [
    { date: '2024-01-01', open: 150.0, high: 155.5, low: 148.2, close: 153.8 },
    { date: '2024-01-02', open: 153.8, high: 157.2, low: 152.5, close: 154.6 },
    { date: '2024-01-03', open: 154.6, high: 156.8, low: 151.0, close: 151.5 },
    { date: '2024-01-04', open: 151.5, high: 153.2, low: 149.8, close: 152.8 },
    { date: '2024-01-05', open: 152.8, high: 158.5, low: 152.0, close: 157.2 },
    { date: '2024-01-08', open: 157.2, high: 160.8, low: 156.5, close: 159.5 },
    { date: '2024-01-09', open: 159.5, high: 162.0, low: 158.8, close: 160.8 },
    { date: '2024-01-10', open: 160.8, high: 163.5, low: 159.2, close: 161.5 },
    { date: '2024-01-11', open: 161.5, high: 164.8, low: 160.5, close: 163.2 },
    { date: '2024-01-12', open: 163.2, high: 165.0, low: 161.8, close: 162.5 },
    { date: '2024-01-15', open: 162.5, high: 164.2, low: 160.0, close: 161.2 },
    { date: '2024-01-16', open: 161.2, high: 163.8, low: 159.5, close: 162.8 },
    { date: '2024-01-17', open: 162.8, high: 166.5, low: 162.0, close: 165.5 },
    { date: '2024-01-18', open: 165.5, high: 168.2, low: 164.8, close: 167.0 },
    { date: '2024-01-19', open: 167.0, high: 169.5, low: 166.2, close: 168.8 },
  ];

  const volatileData = [
    { date: 'Day 1', open: 100.0, high: 110.0, low: 95.0, close: 105.0 },
    { date: 'Day 2', open: 105.0, high: 108.0, low: 98.0, close: 100.0 },
    { date: 'Day 3', open: 100.0, high: 115.0, low: 97.0, close: 112.0 },
    { date: 'Day 4', open: 112.0, high: 118.0, low: 108.0, close: 110.0 },
    { date: 'Day 5', open: 110.0, high: 116.0, low: 102.0, close: 114.0 },
    { date: 'Day 6', open: 114.0, high: 120.0, low: 111.0, close: 118.0 },
    { date: 'Day 7', open: 118.0, high: 122.0, low: 112.0, close: 115.0 },
    { date: 'Day 8', open: 115.0, high: 119.0, low: 110.0, close: 117.0 },
  ];

  return (
    <div className="jv-demo-page">
      <h1>📈 Candlestick Chart</h1>
      <p className="jv-subtitle">
        Visualize financial OHLC (Open, High, Low, Close) data - the standard chart for stock market analysis and trading
      </p>

      {/* Stock Price Data */}
      <section className="jv-section">
        <h2>📊 Stock Price Movement</h2>
        <p>Track stock price trends with detailed OHLC information</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <CandlestickChart
            data={stockData}
            title="AAPL - Daily Price Chart"
            height={450}
            width={900}
          />
        </div>

        <CodeBlock
          code={`const stockData = [
  { date: '2024-01-01', open: 150.0, high: 155.5, low: 148.2, close: 153.8 },
  { date: '2024-01-02', open: 153.8, high: 157.2, low: 152.5, close: 154.6 },
  { date: '2024-01-03', open: 154.6, high: 156.8, low: 151.0, close: 151.5 },
  { date: '2024-01-04', open: 151.5, high: 153.2, low: 149.8, close: 152.8 },
  { date: '2024-01-05', open: 152.8, high: 158.5, low: 152.0, close: 157.2 },
  // ... more data
];

<CandlestickChart
  data={stockData}
  title="AAPL - Daily Price Chart"
  height={450}
  width={900}
/>`}
          language="tsx"
        />
      </section>

      {/* Volatile Market */}
      <section className="jv-section">
        <h2>📉 Volatile Market Data</h2>
        <p>Visualize high volatility with large wicks showing price swings</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <CandlestickChart
            data={volatileData}
            title="High Volatility Trading"
            height={400}
            width={700}
          />
        </div>

        <CodeBlock
          code={`const volatileData = [
  { date: 'Day 1', open: 100.0, high: 110.0, low: 95.0, close: 105.0 },
  { date: 'Day 2', open: 105.0, high: 108.0, low: 98.0, close: 100.0 },
  { date: 'Day 3', open: 100.0, high: 115.0, low: 97.0, close: 112.0 },
  // ... more data
];

<CandlestickChart
  data={volatileData}
  title="High Volatility Trading"
  height={400}
  width={700}
/>`}
          language="tsx"
        />
      </section>

      {/* Understanding Candlesticks */}
      <section className="jv-section">
        <h2>📖 Understanding Candlestick Charts</h2>
        
        <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0 }}>Anatomy of a Candlestick:</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Body:</strong> Rectangle showing open and close prices</li>
            <li><strong>Wicks (Shadows):</strong> Lines showing high and low prices</li>
            <li><strong>🟢 Green/Bullish:</strong> Close price is higher than open (uptrend)</li>
            <li><strong>🔴 Red/Bearish:</strong> Close price is lower than open (downtrend)</li>
          </ul>
        </div>

        <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Reading the Chart:</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Long body:</strong> Strong buying or selling pressure</li>
            <li><strong>Short body:</strong> Indecision in the market</li>
            <li><strong>Long upper wick:</strong> Sellers pushed price down from highs</li>
            <li><strong>Long lower wick:</strong> Buyers pushed price up from lows</li>
            <li><strong>No wick:</strong> Open/close at high/low indicates strong momentum</li>
          </ul>
        </div>
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>CandlestickChartProps</h3>
        <table className="jv-api-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data</code></td>
              <td><code>CandlestickDataPoint[]</code></td>
              <td>-</td>
              <td>OHLC data points (required)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Chart title</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number</code></td>
              <td><code>800</code></td>
              <td>Chart width in pixels</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number</code></td>
              <td><code>400</code></td>
              <td>Chart height in pixels</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
          </tbody>
        </table>

        <h3>CandlestickDataPoint</h3>
        <table className="jv-api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>date</code></td>
              <td><code>string</code></td>
              <td>Date or time label</td>
            </tr>
            <tr>
              <td><code>open</code></td>
              <td><code>number</code></td>
              <td>Opening price</td>
            </tr>
            <tr>
              <td><code>high</code></td>
              <td><code>number</code></td>
              <td>Highest price</td>
            </tr>
            <tr>
              <td><code>low</code></td>
              <td><code>number</code></td>
              <td>Lowest price</td>
            </tr>
            <tr>
              <td><code>close</code></td>
              <td><code>number</code></td>
              <td>Closing price</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>📈 Stock market price tracking</li>
          <li>💱 Cryptocurrency trading analysis</li>
          <li>📊 Commodity price movements</li>
          <li>💰 Forex trading charts</li>
          <li>📉 Technical analysis patterns</li>
          <li>🔍 Intraday trading signals</li>
          <li>📱 Financial app dashboards</li>
        </ul>
      </section>
    </div>
  );
};
