import React from 'react';
import { BubbleChart } from '../../src/components/BubbleChart';
import { CodeBlock } from '../components/CodeBlock';

export const BubbleChartDemo: React.FC = () => {
  const basicData = [
    { x: 10, y: 20, size: 30, label: 'Product A' },
    { x: 25, y: 35, size: 50, label: 'Product B' },
    { x: 40, y: 25, size: 40, label: 'Product C' },
    { x: 55, y: 60, size: 60, label: 'Product D' },
    { x: 70, y: 45, size: 35, label: 'Product E' },
    { x: 85, y: 75, size: 70, label: 'Product F' },
  ];

  const marketData = [
    { x: 30, y: 50, size: 500, label: 'Company A', color: '#3b82f6' },
    { x: 45, y: 65, size: 750, label: 'Company B', color: '#10b981' },
    { x: 60, y: 40, size: 400, label: 'Company C', color: '#f59e0b' },
    { x: 75, y: 70, size: 900, label: 'Company D', color: '#ef4444' },
    { x: 25, y: 30, size: 300, label: 'Company E', color: '#8b5cf6' },
    { x: 80, y: 55, size: 650, label: 'Company F', color: '#06b6d4' },
  ];

  const salesData = [
    { x: 15, y: 35, size: 200, label: 'Q1 2023', color: '#3b82f6' },
    { x: 35, y: 45, size: 300, label: 'Q2 2023', color: '#3b82f6' },
    { x: 55, y: 52, size: 350, label: 'Q3 2023', color: '#3b82f6' },
    { x: 75, y: 68, size: 450, label: 'Q4 2023', color: '#3b82f6' },
    { x: 20, y: 25, size: 180, label: 'Q1 2024', color: '#10b981' },
    { x: 40, y: 40, size: 320, label: 'Q2 2024', color: '#10b981' },
    { x: 60, y: 58, size: 400, label: 'Q3 2024', color: '#10b981' },
    { x: 80, y: 75, size: 520, label: 'Q4 2024', color: '#10b981' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>🫧 Bubble Chart</h1>
      <p className="jv-subtitle">
        Visualize three-dimensional data with bubble charts where size represents the third dimension
      </p>

      {/* Basic Bubble Chart */}
      <section className="jv-section">
        <h2>📊 Basic Bubble Chart</h2>
        <p>Simple bubble chart showing three dimensions of data</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <BubbleChart
            data={basicData}
            title="Product Performance"
            xLabel="Market Share (%)"
            yLabel="Customer Satisfaction"
            height={450}
            width={700}
          />
        </div>

        <CodeBlock
          code={`const data = [
  { x: 10, y: 20, size: 30, label: 'Product A' },
  { x: 25, y: 35, size: 50, label: 'Product B' },
  { x: 40, y: 25, size: 40, label: 'Product C' },
  { x: 55, y: 60, size: 60, label: 'Product D' },
  { x: 70, y: 45, size: 35, label: 'Product E' },
  { x: 85, y: 75, size: 70, label: 'Product F' },
];

<BubbleChart
  data={data}
  title="Product Performance"
  xLabel="Market Share (%)"
  yLabel="Customer Satisfaction"
  height={450}
  width={700}
/>`}
          language="tsx"
        />
      </section>

      {/* Market Analysis */}
      <section className="jv-section">
        <h2>📈 Market Analysis</h2>
        <p>Compare companies by revenue, growth rate, and market cap (bubble size)</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <BubbleChart
            data={marketData}
            title="Market Leaders Comparison"
            xLabel="Revenue Growth (%)"
            yLabel="Profit Margin (%)"
            height={450}
            width={700}
            showGrid
          />
        </div>

        <CodeBlock
          code={`const marketData = [
  { x: 30, y: 50, size: 500, label: 'Company A', color: '#3b82f6' },
  { x: 45, y: 65, size: 750, label: 'Company B', color: '#10b981' },
  { x: 60, y: 40, size: 400, label: 'Company C', color: '#f59e0b' },
  { x: 75, y: 70, size: 900, label: 'Company D', color: '#ef4444' },
  { x: 25, y: 30, size: 300, label: 'Company E', color: '#8b5cf6' },
  { x: 80, y: 55, size: 650, label: 'Company F', color: '#06b6d4' },
];

<BubbleChart
  data={marketData}
  title="Market Leaders Comparison"
  xLabel="Revenue Growth (%)"
  yLabel="Profit Margin (%)"
  showGrid
/>`}
          language="tsx"
        />
      </section>

      {/* Time Series */}
      <section className="jv-section">
        <h2>📅 Time Series Comparison</h2>
        <p>Track quarterly performance across multiple years</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <BubbleChart
            data={salesData}
            title="Quarterly Sales Trend"
            xLabel="Time Period"
            yLabel="Sales Performance"
            height={450}
            width={700}
            showGrid
          />
        </div>

        <CodeBlock
          code={`const salesData = [
  { x: 15, y: 35, size: 200, label: 'Q1 2023', color: '#3b82f6' },
  { x: 35, y: 45, size: 300, label: 'Q2 2023', color: '#3b82f6' },
  { x: 55, y: 52, size: 350, label: 'Q3 2023', color: '#3b82f6' },
  { x: 75, y: 68, size: 450, label: 'Q4 2023', color: '#3b82f6' },
  { x: 20, y: 25, size: 180, label: 'Q1 2024', color: '#10b981' },
  { x: 40, y: 40, size: 320, label: 'Q2 2024', color: '#10b981' },
  { x: 60, y: 58, size: 400, label: 'Q3 2024', color: '#10b981' },
  { x: 80, y: 75, size: 520, label: 'Q4 2024', color: '#10b981' },
];

<BubbleChart
  data={salesData}
  title="Quarterly Sales Trend"
  xLabel="Time Period"
  yLabel="Sales Performance"
  showGrid
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>BubbleChartProps</h3>
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
              <td><code>BubbleChartDataPoint[]</code></td>
              <td>-</td>
              <td>Array of bubble data points (required)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Chart title</td>
            </tr>
            <tr>
              <td><code>xLabel</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>X-axis label</td>
            </tr>
            <tr>
              <td><code>yLabel</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Y-axis label</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>number</code></td>
              <td><code>600</code></td>
              <td>Chart width in pixels</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number</code></td>
              <td><code>400</code></td>
              <td>Chart height in pixels</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td><code>'#3b82f6'</code></td>
              <td>Default bubble color</td>
            </tr>
            <tr>
              <td><code>showGrid</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show grid lines</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
            <tr>
              <td><code>maxBubbleSize</code></td>
              <td><code>number</code></td>
              <td><code>60</code></td>
              <td>Maximum bubble radius in pixels</td>
            </tr>
          </tbody>
        </table>

        <h3>BubbleChartDataPoint</h3>
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
              <td><code>x</code></td>
              <td><code>number</code></td>
              <td>X-coordinate value</td>
            </tr>
            <tr>
              <td><code>y</code></td>
              <td><code>number</code></td>
              <td>Y-coordinate value</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>number</code></td>
              <td>Bubble size value (scaled to maxBubbleSize)</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td>Bubble label (shown in tooltip)</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td>Custom bubble color (optional)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>📊 Three-dimensional data visualization</li>
          <li>💼 Market analysis (market share, growth, revenue)</li>
          <li>📈 Portfolio comparison</li>
          <li>🌍 Geographic data (population, GDP, area)</li>
          <li>🔬 Scientific research data</li>
          <li>📉 Risk vs. return analysis</li>
          <li>🎯 Product positioning matrices</li>
        </ul>
      </section>
    </div>
  );
};
