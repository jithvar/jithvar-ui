import React from 'react';
import { PieChart } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const PieChartDemo: React.FC = () => {
  const marketShareData = [
    { label: 'Chrome', value: 65.5 },
    { label: 'Safari', value: 18.2 },
    { label: 'Edge', value: 9.8 },
    { label: 'Firefox', value: 4.3 },
    { label: 'Others', value: 2.2 },
  ];

  const salesData = [
    { label: 'Electronics', value: 45000 },
    { label: 'Clothing', value: 32000 },
    { label: 'Food', value: 28000 },
    { label: 'Books', value: 15000 },
  ];

  const customColorData = [
    { label: 'Design', value: 35, color: '#3b82f6' },
    { label: 'Development', value: 45, color: '#10b981' },
    { label: 'Marketing', value: 15, color: '#f59e0b' },
    { label: 'Support', value: 5, color: '#ef4444' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>🥧 Pie Chart</h1>
      <p className="jv-subtitle">
        Visualize proportional data with interactive pie charts
      </p>

      {/* Basic Pie Chart */}
      <section className="jv-section">
        <h2>📊 Basic Pie Chart</h2>
        <p>Display data as slices of a pie with percentages and legend</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <PieChart
            data={marketShareData}
            title="Browser Market Share"
            width={700}
            height={400}
          />
        </div>

        <CodeBlock
          code={`const marketShareData = [
  { label: 'Chrome', value: 65.5 },
  { label: 'Safari', value: 18.2 },
  { label: 'Edge', value: 9.8 },
  { label: 'Firefox', value: 4.3 },
  { label: 'Others', value: 2.2 },
];

<PieChart
  data={marketShareData}
  title="Browser Market Share"
  width={700}
  height={400}
/>`}
          language="tsx"
        />
      </section>

      {/* Without Legend */}
      <section className="jv-section">
        <h2>🎯 Display Options</h2>
        <p>Customize the appearance with various options</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Without Legend</h4>
            <PieChart
              data={salesData}
              title="Sales by Category"
              width={400}
              height={350}
              showLegend={false}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Without Labels</h4>
            <PieChart
              data={salesData}
              title="Sales Distribution"
              width={400}
              height={350}
              showLabels={false}
            />
          </div>
        </div>

        <CodeBlock
          code={`// Hide legend
<PieChart data={data} showLegend={false} />

// Hide labels on slices
<PieChart data={data} showLabels={false} />

// Show values instead of percentages
<PieChart data={data} showPercentages={false} />

// Disable animation
<PieChart data={data} animated={false} />`}
          language="tsx"
        />
      </section>

      {/* Custom Colors */}
      <section className="jv-section">
        <h2>🎨 Custom Colors</h2>
        <p>Assign custom colors to individual slices</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <PieChart
            data={customColorData}
            title="Team Distribution"
            width={700}
            height={400}
          />
        </div>

        <CodeBlock
          code={`const customColorData = [
  { label: 'Design', value: 35, color: '#3b82f6' },
  { label: 'Development', value: 45, color: '#10b981' },
  { label: 'Marketing', value: 15, color: '#f59e0b' },
  { label: 'Support', value: 5, color: '#ef4444' },
];

<PieChart data={customColorData} />`}
          language="tsx"
        />
      </section>

      {/* Interactive Features */}
      <section className="jv-section">
        <h2>🖱️ Interactive Features</h2>
        <p>Hover over slices to highlight them and see details</p>

        <div style={{ padding: '24px', background: '#f9fafb', borderRadius: '8px', marginBottom: '24px' }}>
          <ul style={{ margin: 0, paddingLeft: '24px', color: '#6b7280', lineHeight: 1.8 }}>
            <li><strong>Hover Effect:</strong> Slices expand slightly when hovered</li>
            <li><strong>Legend Sync:</strong> Hovering over legend items highlights the corresponding slice</li>
            <li><strong>Smooth Animations:</strong> Slices animate in on initial render</li>
            <li><strong>Tooltips:</strong> See exact values and percentages</li>
          </ul>
        </div>
      </section>

      {/* Sizes */}
      <section className="jv-section">
        <h2>📐 Different Sizes</h2>
        <p>Adjust width and height to fit your layout</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Small (300x300)</h4>
            <PieChart
              data={[
                { label: 'A', value: 30 },
                { label: 'B', value: 45 },
                { label: 'C', value: 25 },
              ]}
              width={300}
              height={300}
              showLegend={false}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Medium (400x400)</h4>
            <PieChart
              data={[
                { label: 'X', value: 40 },
                { label: 'Y', value: 35 },
                { label: 'Z', value: 25 },
              ]}
              width={400}
              height={400}
              showLegend={false}
            />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>

        <h3>Props</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>data</code></td>
                <td style={{ padding: '12px' }}>PieChartDataPoint[]</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Array of data points</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>width</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>400</td>
                <td style={{ padding: '12px' }}>Chart width in pixels</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>height</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>400</td>
                <td style={{ padding: '12px' }}>Chart height in pixels</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>title</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Chart title</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>showLabels</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Show labels on slices</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>showLegend</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Show legend</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>showPercentages</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Show percentages in labels</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>animated</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Enable animations</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>innerRadius</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>0</td>
                <td style={{ padding: '12px' }}>Inner radius (for donut chart)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: '24px' }}>Data Point Interface</h3>
        <CodeBlock
          code={`interface PieChartDataPoint {
  label: string;      // Slice label
  value: number;      // Numeric value
  color?: string;     // Optional custom color
}`}
          language="typescript"
        />
      </section>
    </div>
  );
};
