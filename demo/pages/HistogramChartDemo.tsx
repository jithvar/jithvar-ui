import React from 'react';
import { HistogramChart } from '../../src/components/HistogramChart';
import { CodeBlock } from '../components/CodeBlock';

export const HistogramChartDemo: React.FC = () => {
  // Generate sample data for test scores
  const testScores = [
    65, 72, 78, 85, 90, 88, 76, 92, 68, 75, 82, 95, 70, 88, 91,
    73, 86, 79, 84, 77, 89, 93, 71, 87, 80, 94, 74, 81, 83, 96,
    69, 78, 85, 90, 75, 88, 82, 76, 91, 87, 79, 84, 92, 77, 86,
    73, 89, 80, 93, 74
  ];

  // Age distribution
  const ages = [
    22, 25, 28, 30, 32, 24, 27, 35, 29, 26, 31, 33, 23, 28, 34,
    25, 30, 27, 29, 26, 32, 28, 24, 31, 35, 27, 29, 26, 30, 33,
    25, 28, 31, 27, 29, 34, 26, 30, 32, 28, 25, 29, 27, 31, 26,
    30, 28, 33, 25, 29, 27, 32, 26, 30, 28, 34, 25, 29, 31, 27
  ];

  // Sales data
  const salesAmounts = [
    1200, 2300, 3400, 2100, 2800, 3200, 1800, 2500, 2900, 3100,
    1500, 2700, 3300, 1900, 2400, 2600, 3500, 2200, 2800, 3000,
    1700, 2500, 2900, 3400, 2100, 2700, 3100, 1600, 2400, 2800,
    3200, 1800, 2600, 3000, 2300, 2700, 3300, 1900, 2500, 2900
  ];

  return (
    <div className="jv-demo-page">
      <h1>📊 Histogram Chart</h1>
      <p className="jv-subtitle">
        Visualize frequency distribution of data - perfect for analyzing data patterns, understanding distributions, and identifying trends
      </p>

      {/* Test Scores */}
      <section className="jv-section">
        <h2>📝 Test Score Distribution</h2>
        <p>Analyze student performance distribution with mean and median lines</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <HistogramChart
            data={testScores}
            title="Student Test Scores"
            height={400}
            width={700}
            bins={10}
            color="#3b82f6"
            showMean={true}
            showMedian={true}
          />
        </div>

        <CodeBlock
          code={`const testScores = [
  65, 72, 78, 85, 90, 88, 76, 92, 68, 75, 82, 95, 70, 88, 91,
  73, 86, 79, 84, 77, 89, 93, 71, 87, 80, 94, 74, 81, 83, 96,
  // ... more scores
];

<HistogramChart
  data={testScores}
  title="Student Test Scores"
  bins={10}
  color="#3b82f6"
  showMean={true}
  showMedian={true}
/>`}
          language="tsx"
        />
      </section>

      {/* Age Distribution */}
      <section className="jv-section">
        <h2>👥 Age Distribution</h2>
        <p>Visualize demographic age distribution</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <HistogramChart
            data={ages}
            title="Employee Age Distribution"
            height={400}
            width={700}
            bins={8}
            color="#10b981"
            showMean={true}
            showMedian={false}
          />
        </div>

        <CodeBlock
          code={`const ages = [
  22, 25, 28, 30, 32, 24, 27, 35, 29, 26, 31, 33, 23, 28, 34,
  25, 30, 27, 29, 26, 32, 28, 24, 31, 35, 27, 29, 26, 30, 33,
  // ... more ages
];

<HistogramChart
  data={ages}
  title="Employee Age Distribution"
  bins={8}
  color="#10b981"
  showMean={true}
  showMedian={false}
/>`}
          language="tsx"
        />
      </section>

      {/* Sales Distribution */}
      <section className="jv-section">
        <h2>💰 Sales Amount Distribution</h2>
        <p>Analyze sales transaction distribution</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <HistogramChart
            data={salesAmounts}
            title="Daily Sales Distribution"
            height={400}
            width={700}
            bins={12}
            color="#f59e0b"
            showMean={true}
            showMedian={true}
          />
        </div>

        <CodeBlock
          code={`const salesAmounts = [
  1200, 2300, 3400, 2100, 2800, 3200, 1800, 2500, 2900, 3100,
  1500, 2700, 3300, 1900, 2400, 2600, 3500, 2200, 2800, 3000,
  // ... more sales
];

<HistogramChart
  data={salesAmounts}
  title="Daily Sales Distribution"
  bins={12}
  color="#f59e0b"
  showMean={true}
  showMedian={true}
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>HistogramChartProps</h3>
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
              <td><code>number[]</code></td>
              <td>-</td>
              <td>Raw data points (required)</td>
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
              <td><code>bins</code></td>
              <td><code>number</code></td>
              <td><code>10</code></td>
              <td>Number of histogram bins</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td><code>'#3b82f6'</code></td>
              <td>Bar color</td>
            </tr>
            <tr>
              <td><code>showMean</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show mean line</td>
            </tr>
            <tr>
              <td><code>showMedian</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show median line</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>📊 Frequency distribution analysis</li>
          <li>📝 Test score analysis</li>
          <li>👥 Demographic data visualization</li>
          <li>💰 Sales/revenue distribution</li>
          <li>⏱️ Response time analysis</li>
          <li>📈 Quality control data</li>
          <li>🔬 Scientific data distribution</li>
          <li>📉 Error rate analysis</li>
        </ul>
      </section>
    </div>
  );
};
