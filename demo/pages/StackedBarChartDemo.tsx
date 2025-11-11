import React from 'react';
import { StackedBarChart } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const StackedBarChartDemo: React.FC = () => {
  const quarterlyLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  const quarterlyDatasets = [
    { label: 'Product A', data: [30, 35, 40, 45], color: '#3b82f6' },
    { label: 'Product B', data: [25, 30, 35, 40], color: '#10b981' },
    { label: 'Product C', data: [20, 25, 30, 35], color: '#f59e0b' },
  ];

  const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthlyDatasets = [
    { label: 'Sales', data: [50, 60, 55, 70, 75, 80], color: '#3b82f6' },
    { label: 'Marketing', data: [20, 25, 22, 30, 32, 35], color: '#10b981' },
    { label: 'Operations', data: [15, 18, 20, 22, 25, 28], color: '#f59e0b' },
    { label: 'R&D', data: [10, 12, 15, 18, 20, 22], color: '#ef4444' },
  ];

  const teamLabels = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  const teamDatasets = [
    { label: 'Completed', data: [45, 52, 48, 55, 50], color: '#10b981' },
    { label: 'In Progress', data: [15, 18, 20, 15, 18], color: '#f59e0b' },
    { label: 'Pending', data: [10, 8, 12, 10, 12], color: '#ef4444' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>📊 Stacked Bar Chart</h1>
      <p className="jv-subtitle">
        Visualize multiple data series stacked on top of each other - perfect for showing part-to-whole relationships over time
      </p>

      {/* Vertical Stacked Bars */}
      <section className="jv-section">
        <h2>📈 Vertical Stacked Bars</h2>
        <p>Compare product performance across quarters</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <StackedBarChart
            labels={quarterlyLabels}
            datasets={quarterlyDatasets}
            title="Quarterly Product Sales"
            height={400}
            width={700}
            orientation="vertical"
          />
        </div>

        <CodeBlock
          code={`const quarterlyLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
const quarterlyDatasets = [
  { label: 'Product A', data: [30, 35, 40, 45], color: '#3b82f6' },
  { label: 'Product B', data: [25, 30, 35, 40], color: '#10b981' },
  { label: 'Product C', data: [20, 25, 30, 35], color: '#f59e0b' },
];

<StackedBarChart
  labels={quarterlyLabels}
  datasets={quarterlyDatasets}
  title="Quarterly Product Sales"
  orientation="vertical"
/>`}
          language="tsx"
        />
      </section>

      {/* Horizontal Stacked Bars */}
      <section className="jv-section">
        <h2>📊 Horizontal Stacked Bars</h2>
        <p>Visualize team task completion status</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <StackedBarChart
            labels={teamLabels}
            datasets={teamDatasets}
            title="Team Task Status"
            height={400}
            width={700}
            orientation="horizontal"
          />
        </div>

        <CodeBlock
          code={`const teamLabels = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
const teamDatasets = [
  { label: 'Completed', data: [45, 52, 48, 55, 50], color: '#10b981' },
  { label: 'In Progress', data: [15, 18, 20, 15, 18], color: '#f59e0b' },
  { label: 'Pending', data: [10, 8, 12, 10, 12], color: '#ef4444' },
];

<StackedBarChart
  labels={teamLabels}
  datasets={teamDatasets}
  title="Team Task Status"
  orientation="horizontal"
/>`}
          language="tsx"
        />
      </section>

      {/* With Values */}
      <section className="jv-section">
        <h2>🔢 Stacked Bars with Values</h2>
        <p>Display exact values on each segment</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <StackedBarChart
            labels={monthlyLabels}
            datasets={monthlyDatasets}
            title="Monthly Department Expenses"
            height={400}
            width={700}
            showValues={true}
          />
        </div>

        <CodeBlock
          code={`const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const monthlyDatasets = [
  { label: 'Sales', data: [50, 60, 55, 70, 75, 80], color: '#3b82f6' },
  { label: 'Marketing', data: [20, 25, 22, 30, 32, 35], color: '#10b981' },
  { label: 'Operations', data: [15, 18, 20, 22, 25, 28], color: '#f59e0b' },
  { label: 'R&D', data: [10, 12, 15, 18, 20, 22], color: '#ef4444' },
];

<StackedBarChart
  labels={monthlyLabels}
  datasets={monthlyDatasets}
  title="Monthly Department Expenses"
  showValues={true}
/>`}
          language="tsx"
        />
      </section>

      {/* Without Legend */}
      <section className="jv-section">
        <h2>📊 Without Legend</h2>
        <p>Hide the legend for a cleaner look</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <StackedBarChart
            labels={quarterlyLabels}
            datasets={quarterlyDatasets}
            title="Quarterly Overview"
            height={350}
            width={600}
            showLegend={false}
          />
        </div>

        <CodeBlock
          code={`<StackedBarChart
  labels={quarterlyLabels}
  datasets={quarterlyDatasets}
  title="Quarterly Overview"
  showLegend={false}
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>StackedBarChartProps</h3>
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
              <td><code>labels</code></td>
              <td><code>string[]</code></td>
              <td>-</td>
              <td>Category labels (required)</td>
            </tr>
            <tr>
              <td><code>datasets</code></td>
              <td><code>StackedBarDataset[]</code></td>
              <td>-</td>
              <td>Data series to stack (required)</td>
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
              <td><code>orientation</code></td>
              <td><code>'vertical' | 'horizontal'</code></td>
              <td><code>'vertical'</code></td>
              <td>Bar orientation</td>
            </tr>
            <tr>
              <td><code>showLegend</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Display legend</td>
            </tr>
            <tr>
              <td><code>showValues</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Display values on segments</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
          </tbody>
        </table>

        <h3>StackedBarDataset</h3>
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
              <td>Dataset name</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>number[]</code></td>
              <td>Values for each category (must match labels length)</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td>Dataset color (optional)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>📊 Budget allocation across categories</li>
          <li>📈 Revenue breakdown by product/service</li>
          <li>👥 Team resource allocation</li>
          <li>📅 Time tracking by project</li>
          <li>🛒 Sales composition over time</li>
          <li>📉 Cost structure analysis</li>
          <li>🎯 Progress tracking across initiatives</li>
        </ul>
      </section>
    </div>
  );
};
