import React from 'react';
import { WaterfallChart } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const WaterfallChartDemo: React.FC = () => {
  const profitData = [
    { label: 'Revenue', value: 120000 },
    { label: 'Cost of Goods', value: -45000 },
    { label: 'Operating Expenses', value: -30000 },
    { label: 'Marketing', value: -15000 },
    { label: 'Net Profit', value: 30000, isTotal: true },
  ];

  const cashFlowData = [
    { label: 'Starting Balance', value: 50000, isTotal: true },
    { label: 'Q1 Income', value: 25000 },
    { label: 'Q1 Expenses', value: -18000 },
    { label: 'Q2 Income', value: 30000 },
    { label: 'Q2 Expenses', value: -22000 },
    { label: 'Q3 Income', value: 35000 },
    { label: 'Q3 Expenses', value: -25000 },
    { label: 'Q4 Income', value: 40000 },
    { label: 'Q4 Expenses', value: -28000 },
    { label: 'Ending Balance', value: 87000, isTotal: true },
  ];

  const budgetVariance = [
    { label: 'Budget', value: 100000, isTotal: true, color: '#6b7280' },
    { label: 'Sales Variance', value: 15000, color: '#10b981' },
    { label: 'Cost Variance', value: -8000, color: '#ef4444' },
    { label: 'Overhead Variance', value: -5000, color: '#ef4444' },
    { label: 'Actual', value: 102000, isTotal: true, color: '#6b7280' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>💧 Waterfall Chart</h1>
      <p className="jv-subtitle">
        Visualize cumulative effect of sequential positive and negative values - perfect for financial analysis and variance reports
      </p>

      {/* Profit & Loss */}
      <section className="jv-section">
        <h2>💰 Profit & Loss Statement</h2>
        <p>Track how revenue flows through various expenses to net profit</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <WaterfallChart
            data={profitData}
            title="Annual Profit & Loss"
            height={400}
            width={700}
          />
        </div>

        <CodeBlock
          code={`const profitData = [
  { label: 'Revenue', value: 120000 },
  { label: 'Cost of Goods', value: -45000 },
  { label: 'Operating Expenses', value: -30000 },
  { label: 'Marketing', value: -15000 },
  { label: 'Net Profit', value: 30000, isTotal: true },
];

<WaterfallChart
  data={profitData}
  title="Annual Profit & Loss"
  height={400}
  width={700}
/>`}
          language="tsx"
        />
      </section>

      {/* Cash Flow */}
      <section className="jv-section">
        <h2>💵 Cash Flow Analysis</h2>
        <p>Visualize quarterly cash flow from start to end balance</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <WaterfallChart
            data={cashFlowData}
            title="Annual Cash Flow"
            height={400}
            width={900}
            showConnectors={true}
          />
        </div>

        <CodeBlock
          code={`const cashFlowData = [
  { label: 'Starting Balance', value: 50000, isTotal: true },
  { label: 'Q1 Income', value: 25000 },
  { label: 'Q1 Expenses', value: -18000 },
  { label: 'Q2 Income', value: 30000 },
  { label: 'Q2 Expenses', value: -22000 },
  // ... more quarters
  { label: 'Ending Balance', value: 87000, isTotal: true },
];

<WaterfallChart
  data={cashFlowData}
  title="Annual Cash Flow"
  showConnectors={true}
/>`}
          language="tsx"
        />
      </section>

      {/* Budget Variance */}
      <section className="jv-section">
        <h2>📊 Budget Variance Analysis</h2>
        <p>Compare actual vs budget with custom colors</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <WaterfallChart
            data={budgetVariance}
            title="Budget vs Actual"
            height={400}
            width={700}
            showConnectors={true}
          />
        </div>

        <CodeBlock
          code={`const budgetVariance = [
  { label: 'Budget', value: 100000, isTotal: true, color: '#6b7280' },
  { label: 'Sales Variance', value: 15000, color: '#10b981' },
  { label: 'Cost Variance', value: -8000, color: '#ef4444' },
  { label: 'Overhead Variance', value: -5000, color: '#ef4444' },
  { label: 'Actual', value: 102000, isTotal: true, color: '#6b7280' },
];

<WaterfallChart
  data={budgetVariance}
  title="Budget vs Actual"
  showConnectors={true}
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>WaterfallChartProps</h3>
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
              <td><code>WaterfallDataPoint[]</code></td>
              <td>-</td>
              <td>Waterfall stages data (required)</td>
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
              <td><code>700</code></td>
              <td>Chart width in pixels</td>
            </tr>
            <tr>
              <td><code>height</code></td>
              <td><code>number</code></td>
              <td><code>400</code></td>
              <td>Chart height in pixels</td>
            </tr>
            <tr>
              <td><code>showConnectors</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show connector lines between bars</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
          </tbody>
        </table>

        <h3>WaterfallDataPoint</h3>
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
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td>Stage name</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>number</code></td>
              <td>Value change (positive or negative)</td>
            </tr>
            <tr>
              <td><code>isTotal</code></td>
              <td><code>boolean</code></td>
              <td>Mark as total/subtotal bar (optional)</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td>Custom bar color (optional)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>💰 Profit & loss analysis</li>
          <li>💵 Cash flow visualization</li>
          <li>📊 Budget variance reports</li>
          <li>📈 Inventory changes over time</li>
          <li>🔄 Sequential value changes</li>
          <li>💼 Financial statement analysis</li>
          <li>📉 Cost breakdown visualization</li>
        </ul>
      </section>
    </div>
  );
};
