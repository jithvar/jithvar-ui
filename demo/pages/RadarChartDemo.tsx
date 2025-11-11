import React from 'react';
import { RadarChart } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const RadarChartDemo: React.FC = () => {
  const skillsLabels = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'Git'];
  const skillsDatasets = [
    {
      label: 'Developer A',
      data: [90, 85, 80, 75, 70, 85],
      color: '#3b82f6',
    },
    {
      label: 'Developer B',
      data: [70, 90, 85, 80, 85, 75],
      color: '#10b981',
    },
  ];

  const performanceLabels = ['Speed', 'Reliability', 'Security', 'Scalability', 'UX', 'Documentation'];
  const performanceDatasets = [
    {
      label: 'Current Version',
      data: [75, 85, 90, 70, 80, 65],
      color: '#f59e0b',
    },
    {
      label: 'Target',
      data: [90, 95, 95, 90, 95, 85],
      color: '#ef4444',
      fill: false,
    },
  ];

  const singleDataset = [
    {
      label: 'Product Rating',
      data: [85, 90, 75, 80, 95, 70, 85, 80],
      color: '#8b5cf6',
    },
  ];

  return (
    <div className="jv-demo-page">
      <h1>🕸️ Radar Chart</h1>
      <p className="jv-subtitle">
        Visualize multivariate data with spider/radar charts - perfect for comparing multiple variables across different categories
      </p>

      {/* Skills Comparison */}
      <section className="jv-section">
        <h2>👥 Skills Comparison</h2>
        <p>Compare technical skills across team members</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <RadarChart
            labels={skillsLabels}
            datasets={skillsDatasets}
            title="Developer Skills Comparison"
            size={450}
          />
        </div>

        <CodeBlock
          code={`const skillsLabels = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'Git'];
const skillsDatasets = [
  {
    label: 'Developer A',
    data: [90, 85, 80, 75, 70, 85],
    color: '#3b82f6',
  },
  {
    label: 'Developer B',
    data: [70, 90, 85, 80, 85, 75],
    color: '#10b981',
  },
];

<RadarChart
  labels={skillsLabels}
  datasets={skillsDatasets}
  title="Developer Skills Comparison"
  size={450}
/>`}
          language="tsx"
        />
      </section>

      {/* Performance Metrics */}
      <section className="jv-section">
        <h2>📊 Performance Metrics</h2>
        <p>Track current performance vs target goals</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <RadarChart
            labels={performanceLabels}
            datasets={performanceDatasets}
            title="System Performance vs Target"
            size={450}
          />
        </div>

        <CodeBlock
          code={`const performanceLabels = ['Speed', 'Reliability', 'Security', 'Scalability', 'UX', 'Documentation'];
const performanceDatasets = [
  {
    label: 'Current Version',
    data: [75, 85, 90, 70, 80, 65],
    color: '#f59e0b',
  },
  {
    label: 'Target',
    data: [90, 95, 95, 90, 95, 85],
    color: '#ef4444',
    fill: false,
  },
];

<RadarChart
  labels={performanceLabels}
  datasets={performanceDatasets}
  title="System Performance vs Target"
  size={450}
/>`}
          language="tsx"
        />
      </section>

      {/* Single Dataset */}
      <section className="jv-section">
        <h2>⭐ Single Dataset</h2>
        <p>Simple radar chart with one dataset</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <RadarChart
            labels={['Quality', 'Price', 'Features', 'Support', 'Design', 'Performance', 'Reliability', 'Updates']}
            datasets={singleDataset}
            title="Product Ratings"
            size={450}
          />
        </div>

        <CodeBlock
          code={`<RadarChart
  labels={['Quality', 'Price', 'Features', 'Support', 'Design', 'Performance', 'Reliability', 'Updates']}
  datasets={[
    {
      label: 'Product Rating',
      data: [85, 90, 75, 80, 95, 70, 85, 80],
      color: '#8b5cf6',
    },
  ]}
  title="Product Ratings"
  size={450}
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>RadarChartProps</h3>
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
              <td>Category labels for each axis (required)</td>
            </tr>
            <tr>
              <td><code>datasets</code></td>
              <td><code>RadarChartDataset[]</code></td>
              <td>-</td>
              <td>Array of datasets to plot (required)</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Chart title</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>number</code></td>
              <td><code>400</code></td>
              <td>Width and height in pixels</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>Maximum value for scale</td>
            </tr>
            <tr>
              <td><code>showGrid</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show grid lines</td>
            </tr>
            <tr>
              <td><code>showLabels</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show axis labels</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
          </tbody>
        </table>

        <h3>RadarChartDataset</h3>
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
              <td>Values for each axis (must match labels length)</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td>Dataset color (optional)</td>
            </tr>
            <tr>
              <td><code>fill</code></td>
              <td><code>boolean</code></td>
              <td>Fill the area (default: true)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>👥 Employee/team skills assessment</li>
          <li>📊 Product feature comparison</li>
          <li>🎯 Performance metrics tracking</li>
          <li>⭐ Customer satisfaction analysis</li>
          <li>🏆 Competitive analysis</li>
          <li>📈 Multi-dimensional KPIs</li>
        </ul>
      </section>
    </div>
  );
};
