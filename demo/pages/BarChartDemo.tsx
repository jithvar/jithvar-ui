import React, { useState } from 'react';
import { BarChart } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const BarChartDemo: React.FC = () => {
  const salesData = [
    { label: 'Jan', value: 4200 },
    { label: 'Feb', value: 5100 },
    { label: 'Mar', value: 6800 },
    { label: 'Apr', value: 5500 },
    { label: 'May', value: 7200 },
    { label: 'Jun', value: 8900 },
  ];

  const revenueData = [
    { label: 'Q1', value: 125000 },
    { label: 'Q2', value: 158000 },
    { label: 'Q3', value: 192000 },
    { label: 'Q4', value: 215000 },
  ];

  const customColorData = [
    { label: 'Product A', value: 4200, color: '#3b82f6' },
    { label: 'Product B', value: 5600, color: '#10b981' },
    { label: 'Product C', value: 3800, color: '#f59e0b' },
    { label: 'Product D', value: 7200, color: '#ef4444' },
    { label: 'Product E', value: 6100, color: '#8b5cf6' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>📊 Bar Chart</h1>
      <p className="jv-subtitle">
        Display data in vertical or horizontal bars with beautiful animations and customization options
      </p>

      {/* Basic Vertical Bar Chart */}
      <section className="jv-section">
        <h2>📈 Vertical Bar Chart</h2>
        <p>Classic vertical bar chart for displaying data over time or categories</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <BarChart
            data={salesData}
            title="Monthly Sales"
            height={350}
            width={700}
            color="primary"
          />
        </div>

        <CodeBlock
          code={`const salesData = [
  { label: 'Jan', value: 4200 },
  { label: 'Feb', value: 5100 },
  { label: 'Mar', value: 6800 },
  { label: 'Apr', value: 5500 },
  { label: 'May', value: 7200 },
  { label: 'Jun', value: 8900 },
];

<BarChart
  data={salesData}
  title="Monthly Sales"
  height={350}
  width={700}
  color="primary"
/>`}
          language="tsx"
        />
      </section>

      {/* Horizontal Bar Chart */}
      <section className="jv-section">
        <h2>📊 Horizontal Bar Chart</h2>
        <p>Horizontal orientation is great for comparing categories</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <BarChart
            data={revenueData}
            title="Quarterly Revenue"
            height={350}
            width={700}
            orientation="horizontal"
            color="success"
          />
        </div>

        <CodeBlock
          code={`<BarChart
  data={revenueData}
  title="Quarterly Revenue"
  orientation="horizontal"
  color="success"
/>`}
          language="tsx"
        />
      </section>

      {/* Colors */}
      <section className="jv-section">
        <h2>🎨 Color Themes</h2>
        <p>Choose from 6 built-in color themes</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((color) => (
            <div key={color} style={{ display: 'flex', justifyContent: 'center' }}>
              <BarChart
                data={[
                  { label: 'A', value: 65 },
                  { label: 'B', value: 85 },
                  { label: 'C', value: 45 },
                ]}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
                height={250}
                width={320}
                color={color}
                barWidth={50}
              />
            </div>
          ))}
        </div>

        <CodeBlock
          code={`<BarChart data={data} color="primary" />
<BarChart data={data} color="secondary" />
<BarChart data={data} color="success" />
<BarChart data={data} color="warning" />
<BarChart data={data} color="danger" />
<BarChart data={data} color="info" />`}
          language="tsx"
        />
      </section>

      {/* Custom Colors */}
      <section className="jv-section">
        <h2>🎯 Custom Colors</h2>
        <p>Assign custom colors to individual bars</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <BarChart
            data={customColorData}
            title="Product Performance"
            height={350}
            width={700}
            showGrid={true}
          />
        </div>

        <CodeBlock
          code={`const customColorData = [
  { label: 'Product A', value: 4200, color: '#3b82f6' },
  { label: 'Product B', value: 5600, color: '#10b981' },
  { label: 'Product C', value: 3800, color: '#f59e0b' },
  { label: 'Product D', value: 7200, color: '#ef4444' },
  { label: 'Product E', value: 6100, color: '#8b5cf6' },
];

<BarChart data={customColorData} />`}
          language="tsx"
        />
      </section>

      {/* Options */}
      <section className="jv-section">
        <h2>⚙️ Display Options</h2>
        <p>Customize the appearance with various options</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Without Grid</h4>
            <BarChart
              data={salesData.slice(0, 4)}
              height={280}
              width={380}
              showGrid={false}
              color="secondary"
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Without Values</h4>
            <BarChart
              data={salesData.slice(0, 4)}
              height={280}
              width={380}
              showValues={false}
              color="warning"
            />
          </div>
        </div>

        <CodeBlock
          code={`// Hide grid lines
<BarChart data={data} showGrid={false} />

// Hide value labels
<BarChart data={data} showValues={false} />

// Disable animation
<BarChart data={data} animated={false} />

// Custom bar width
<BarChart data={data} barWidth={60} />`}
          language="tsx"
        />
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
                <td style={{ padding: '12px' }}>BarChartDataPoint[]</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Array of data points</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>width</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>600</td>
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
                <td style={{ padding: '12px' }}><code>orientation</code></td>
                <td style={{ padding: '12px' }}>'vertical' | 'horizontal'</td>
                <td style={{ padding: '12px' }}>'vertical'</td>
                <td style={{ padding: '12px' }}>Bar orientation</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>showValues</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Show value labels on bars</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>showGrid</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Show grid lines</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>animated</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Enable animations</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>barWidth</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>40</td>
                <td style={{ padding: '12px' }}>Maximum bar width</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>color</code></td>
                <td style={{ padding: '12px' }}>ColorTheme</td>
                <td style={{ padding: '12px' }}>'primary'</td>
                <td style={{ padding: '12px' }}>Default color theme</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: '24px' }}>Data Point Interface</h3>
        <CodeBlock
          code={`interface BarChartDataPoint {
  label: string;      // Category label
  value: number;      // Numeric value
  color?: string;     // Optional custom color
}`}
          language="typescript"
        />
      </section>
    </div>
  );
};
