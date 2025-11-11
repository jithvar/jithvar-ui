import React from 'react';
import { DonutChart } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const DonutChartDemo: React.FC = () => {
  const spendingData = [
    { label: 'Housing', value: 1200 },
    { label: 'Food', value: 450 },
    { label: 'Transport', value: 300 },
    { label: 'Entertainment', value: 200 },
    { label: 'Savings', value: 850 },
  ];

  const projectData = [
    { label: 'Completed', value: 45, color: '#10b981' },
    { label: 'In Progress', value: 28, color: '#3b82f6' },
    { label: 'Pending', value: 15, color: '#f59e0b' },
    { label: 'Cancelled', value: 12, color: '#ef4444' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>🍩 Donut Chart</h1>
      <p className="jv-subtitle">
        Like a pie chart, but with a hole in the middle - perfect for showing progress or composition
      </p>

      {/* Basic Donut Chart */}
      <section className="jv-section">
        <h2>📊 Basic Donut Chart</h2>
        <p>A donut chart is a pie chart with a customizable inner radius</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <DonutChart
            data={spendingData}
            title="Monthly Spending"
            width={700}
            height={400}
            innerRadius={80}
          />
        </div>

        <CodeBlock
          code={`const spendingData = [
  { label: 'Housing', value: 1200 },
  { label: 'Food', value: 450 },
  { label: 'Transport', value: 300 },
  { label: 'Entertainment', value: 200 },
  { label: 'Savings', value: 850 },
];

<DonutChart
  data={spendingData}
  title="Monthly Spending"
  innerRadius={80}
/>`}
          language="tsx"
        />
      </section>

      {/* Inner Radius Variations */}
      <section className="jv-section">
        <h2>📐 Inner Radius Variations</h2>
        <p>Adjust the inner radius to create different styles</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Small Inner Radius (40)</h4>
            <DonutChart
              data={projectData}
              title="Thin Donut"
              width={400}
              height={350}
              innerRadius={40}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Medium Inner Radius (60)</h4>
            <DonutChart
              data={projectData}
              title="Medium Donut"
              width={400}
              height={350}
              innerRadius={60}
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '15px', color: '#6b7280' }}>Large Inner Radius (90)</h4>
            <DonutChart
              data={projectData}
              title="Thick Donut"
              width={400}
              height={350}
              innerRadius={90}
            />
          </div>
        </div>

        <CodeBlock
          code={`// Thin donut
<DonutChart data={data} innerRadius={40} />

// Medium donut
<DonutChart data={data} innerRadius={60} />

// Thick donut
<DonutChart data={data} innerRadius={90} />`}
          language="tsx"
        />
      </section>

      {/* Center Content Idea */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <p>Donut charts are perfect for various scenarios</p>

        <div style={{ padding: '24px', background: '#f9fafb', borderRadius: '8px', marginBottom: '24px' }}>
          <ul style={{ margin: 0, paddingLeft: '24px', color: '#6b7280', lineHeight: 1.8 }}>
            <li><strong>Budget Breakdown:</strong> Show how money is distributed across categories</li>
            <li><strong>Progress Tracking:</strong> Display completion status of projects</li>
            <li><strong>Resource Allocation:</strong> Visualize team or resource distribution</li>
            <li><strong>Market Share:</strong> Compare competitor portions of the market</li>
            <li><strong>Center Space:</strong> The hole can be used for displaying total or key metric (CSS overlay)</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Example: Adding center text with CSS
<div style={{ position: 'relative' }}>
  <DonutChart data={data} innerRadius={80} />
  <div style={{ 
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '32px', fontWeight: 'bold' }}>$3,000</div>
    <div style={{ fontSize: '14px', color: '#6b7280' }}>Total</div>
  </div>
</div>`}
          language="tsx"
        />
      </section>

      {/* All Props */}
      <section className="jv-section">
        <h2>⚙️ All Features</h2>
        <p>DonutChart inherits all PieChart features</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <DonutChart
            data={spendingData}
            title="Feature-Rich Donut"
            width={700}
            height={400}
            innerRadius={70}
            showLabels={true}
            showLegend={true}
            showPercentages={true}
            animated={true}
          />
        </div>

        <CodeBlock
          code={`<DonutChart
  data={data}
  title="Feature-Rich Donut"
  innerRadius={70}
  showLabels={true}
  showLegend={true}
  showPercentages={true}
  animated={true}
/>`}
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
                <td style={{ padding: '12px' }}>PieChartDataPoint[]</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Array of data points</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>innerRadius</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>60</td>
                <td style={{ padding: '12px' }}>Inner radius size</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>width</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>400</td>
                <td style={{ padding: '12px' }}>Chart width</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>height</code></td>
                <td style={{ padding: '12px' }}>number</td>
                <td style={{ padding: '12px' }}>400</td>
                <td style={{ padding: '12px' }}>Chart height</td>
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
                <td style={{ padding: '12px' }}>Show slice labels</td>
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
                <td style={{ padding: '12px' }}>Show percentages</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>animated</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Enable animations</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', padding: '16px', background: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#1e40af', fontSize: '14px' }}>
            <strong>💡 Tip:</strong> DonutChart is a wrapper around PieChart with innerRadius pre-configured. 
            All PieChart props work with DonutChart!
          </p>
        </div>
      </section>
    </div>
  );
};
