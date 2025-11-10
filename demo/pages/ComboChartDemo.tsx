import React from 'react';
import { ComboChart } from '../../src';
import type { ComboChartProps } from '../../src';
import { CodeBlock } from '../components/CodeBlock';
import { PageWrapper } from '../components/PageWrapper';

const ComboChartDemo: React.FC = () => {
  // Sales and Revenue Data
  const salesRevenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const salesRevenueDatasets = [
    {
      label: 'Revenue',
      data: [45000, 52000, 48000, 61000, 58000, 67000],
      type: 'bar' as const,
      color: '#3b82f6',
      yAxisId: 'left' as const,
    },
    {
      label: 'Profit Margin %',
      data: [22, 25, 23, 28, 26, 30],
      type: 'line' as const,
      color: '#10b981',
      yAxisId: 'right' as const,
    },
  ];

  // Website Metrics
  const websiteMetricsLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const websiteMetricsDatasets = [
    {
      label: 'Page Views',
      data: [12500, 15200, 14800, 16300, 18900, 22100, 19800],
      type: 'bar' as const,
      color: '#8b5cf6',
      yAxisId: 'left' as const,
    },
    {
      label: 'Conversion Rate %',
      data: [3.2, 3.8, 3.5, 4.1, 4.5, 5.2, 4.8],
      type: 'line' as const,
      color: '#f59e0b',
      yAxisId: 'right' as const,
    },
  ];

  // Temperature and Rainfall
  const weatherLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weatherDatasets = [
    {
      label: 'Rainfall (mm)',
      data: [78, 65, 82, 95, 110, 135, 145, 130, 105, 85, 72, 68],
      type: 'bar' as const,
      color: '#06b6d4',
      yAxisId: 'left' as const,
    },
    {
      label: 'Avg Temperature (°C)',
      data: [8, 9, 12, 15, 18, 22, 25, 24, 20, 15, 11, 8],
      type: 'line' as const,
      color: '#ef4444',
      yAxisId: 'right' as const,
    },
  ];

  // Multiple Lines with Bars
  const performanceLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  const performanceDatasets = [
    {
      label: 'Sales Volume',
      data: [1200, 1450, 1380, 1620],
      type: 'bar' as const,
      color: '#6366f1',
      yAxisId: 'left' as const,
    },
    {
      label: 'Customer Satisfaction',
      data: [85, 88, 87, 92],
      type: 'line' as const,
      color: '#10b981',
      yAxisId: 'right' as const,
    },
    {
      label: 'Market Share %',
      data: [28, 30, 29, 33],
      type: 'line' as const,
      color: '#f59e0b',
      yAxisId: 'right' as const,
    },
  ];

  const basicCode = `import { ComboChart } from 'jithvar-ui';

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const datasets = [
  {
    label: 'Revenue',
    data: [45000, 52000, 48000, 61000, 58000, 67000],
    type: 'bar',
    color: '#3b82f6',
    yAxisId: 'left',
  },
  {
    label: 'Profit Margin %',
    data: [22, 25, 23, 28, 26, 30],
    type: 'line',
    color: '#10b981',
    yAxisId: 'right',
  },
];

<ComboChart
  labels={labels}
  datasets={datasets}
  width={800}
  height={400}
  leftAxisLabel="Revenue ($)"
  rightAxisLabel="Profit Margin (%)"
/>`;

  const dualAxisCode = `// Weather Data with Dual Y-Axes
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const datasets = [
  {
    label: 'Rainfall (mm)',
    data: [78, 65, 82, 95, 110, 135, 145, 130, 105, 85, 72, 68],
    type: 'bar',
    color: '#06b6d4',
    yAxisId: 'left',
  },
  {
    label: 'Avg Temperature (°C)',
    data: [8, 9, 12, 15, 18, 22, 25, 24, 20, 15, 11, 8],
    type: 'line',
    color: '#ef4444',
    yAxisId: 'right',
  },
];

<ComboChart
  labels={labels}
  datasets={datasets}
  width={900}
  height={400}
  leftAxisLabel="Rainfall (mm)"
  rightAxisLabel="Temperature (°C)"
/>`;

  const multiLineCode = `// Multiple Lines with Bars
const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
const datasets = [
  {
    label: 'Sales Volume',
    data: [1200, 1450, 1380, 1620],
    type: 'bar',
    color: '#6366f1',
    yAxisId: 'left',
  },
  {
    label: 'Customer Satisfaction',
    data: [85, 88, 87, 92],
    type: 'line',
    color: '#10b981',
    yAxisId: 'right',
  },
  {
    label: 'Market Share %',
    data: [28, 30, 29, 33],
    type: 'line',
    color: '#f59e0b',
    yAxisId: 'right',
  },
];

<ComboChart
  labels={labels}
  datasets={datasets}
  width={800}
  height={400}
  leftAxisLabel="Sales Volume"
  rightAxisLabel="Percentage (%)"
/>`;

  return (
    <PageWrapper
      title="ComboChart Component"
      description="A versatile combination chart that displays both bar and line charts with dual Y-axes support. Perfect for visualizing relationships between different metrics."
    >
      {/* Sales and Revenue */}
      <section className="demo-section">
        <h2>Sales and Revenue Analysis</h2>
        <p className="section-description">
          Visualize revenue (bars) alongside profit margins (line) to understand business performance trends.
        </p>
        <div className="demo-container">
          <ComboChart
            labels={salesRevenueLabels}
            datasets={salesRevenueDatasets}
            width={800}
            height={400}
            leftAxisLabel="Revenue ($)"
            rightAxisLabel="Profit Margin (%)"
          />
        </div>
        <CodeBlock code={basicCode} />
      </section>

      {/* Website Metrics */}
      <section className="demo-section">
        <h2>Website Metrics</h2>
        <p className="section-description">
          Track page views (bars) and conversion rates (line) to monitor website performance.
        </p>
        <div className="demo-container">
          <ComboChart
            labels={websiteMetricsLabels}
            datasets={websiteMetricsDatasets}
            width={800}
            height={400}
            leftAxisLabel="Page Views"
            rightAxisLabel="Conversion Rate (%)"
          />
        </div>
      </section>

      {/* Weather Data */}
      <section className="demo-section">
        <h2>Weather Patterns</h2>
        <p className="section-description">
          Compare rainfall (bars) and temperature (line) across months with dual Y-axes for different units.
        </p>
        <div className="demo-container">
          <ComboChart
            labels={weatherLabels}
            datasets={weatherDatasets}
            width={900}
            height={400}
            leftAxisLabel="Rainfall (mm)"
            rightAxisLabel="Temperature (°C)"
          />
        </div>
        <CodeBlock code={dualAxisCode} />
      </section>

      {/* Multiple Lines with Bars */}
      <section className="demo-section">
        <h2>Quarterly Performance</h2>
        <p className="section-description">
          Display sales volume (bars) with multiple performance indicators (lines) for comprehensive analysis.
        </p>
        <div className="demo-container">
          <ComboChart
            labels={performanceLabels}
            datasets={performanceDatasets}
            width={800}
            height={400}
            leftAxisLabel="Sales Volume"
            rightAxisLabel="Percentage (%)"
          />
        </div>
        <CodeBlock code={multiLineCode} />
      </section>

      {/* Props Documentation */}
      <section className="demo-section">
        <h2>Props</h2>
        <div className="props-table">
          <table>
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
                <td>labels</td>
                <td>string[]</td>
                <td>required</td>
                <td>Array of labels for the x-axis</td>
              </tr>
              <tr>
                <td>datasets</td>
                <td>ComboDataset[]</td>
                <td>required</td>
                <td>Array of datasets (type: 'bar' or 'line')</td>
              </tr>
              <tr>
                <td>width</td>
                <td>number</td>
                <td>800</td>
                <td>Width of the chart in pixels</td>
              </tr>
              <tr>
                <td>height</td>
                <td>number</td>
                <td>400</td>
                <td>Height of the chart in pixels</td>
              </tr>
              <tr>
                <td>leftAxisLabel</td>
                <td>string</td>
                <td>undefined</td>
                <td>Label for the left Y-axis</td>
              </tr>
              <tr>
                <td>rightAxisLabel</td>
                <td>string</td>
                <td>undefined</td>
                <td>Label for the right Y-axis</td>
              </tr>
              <tr>
                <td>showLegend</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show legend for datasets</td>
              </tr>
              <tr>
                <td>className</td>
                <td>string</td>
                <td>''</td>
                <td>Additional CSS class names</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage Notes */}
      <section className="demo-section">
        <h2>Usage Notes</h2>
        <ul className="usage-notes">
          <li><strong>Dual Y-Axes:</strong> Use yAxisId: 'left' or 'right' to assign datasets to different axes</li>
          <li><strong>Mixed Types:</strong> Combine bars and lines by setting type: 'bar' or 'line' for each dataset</li>
          <li><strong>Interactive Tooltips:</strong> Hover over any data point to see detailed information</li>
          <li><strong>Legend:</strong> Automatically generated legend shows all datasets with their colors</li>
          <li><strong>Scale Independence:</strong> Each Y-axis scales independently based on its datasets</li>
          <li><strong>Best For:</strong> Comparing metrics with different units or scales (e.g., revenue vs percentages)</li>
        </ul>
      </section>
    </PageWrapper>
  );
};

export default ComboChartDemo;
