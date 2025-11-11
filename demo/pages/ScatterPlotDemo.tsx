import React from 'react';
import { ScatterPlot } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const ScatterPlotDemo: React.FC = () => {
  const basicData = [
    { x: 10, y: 20, label: 'Point 1' },
    { x: 25, y: 35, label: 'Point 2' },
    { x: 40, y: 25, label: 'Point 3' },
    { x: 55, y: 60, label: 'Point 4' },
    { x: 70, y: 45, label: 'Point 5' },
    { x: 85, y: 75, label: 'Point 6' },
    { x: 30, y: 50, label: 'Point 7' },
    { x: 65, y: 30, label: 'Point 8' },
  ];

  const correlationData = [
    { x: 10, y: 15, label: 'A' },
    { x: 20, y: 25, label: 'B' },
    { x: 30, y: 35, label: 'C' },
    { x: 40, y: 42, label: 'D' },
    { x: 50, y: 55, label: 'E' },
    { x: 60, y: 62, label: 'F' },
    { x: 70, y: 75, label: 'G' },
    { x: 80, y: 82, label: 'H' },
  ];

  const multiGroupData = [
    { x: 20, y: 30, label: 'Group A-1', color: '#3b82f6' },
    { x: 25, y: 45, label: 'Group A-2', color: '#3b82f6' },
    { x: 30, y: 35, label: 'Group A-3', color: '#3b82f6' },
    { x: 35, y: 50, label: 'Group A-4', color: '#3b82f6' },
    
    { x: 50, y: 20, label: 'Group B-1', color: '#10b981' },
    { x: 55, y: 35, label: 'Group B-2', color: '#10b981' },
    { x: 60, y: 25, label: 'Group B-3', color: '#10b981' },
    { x: 65, y: 40, label: 'Group B-4', color: '#10b981' },
    
    { x: 40, y: 70, label: 'Group C-1', color: '#ef4444' },
    { x: 45, y: 65, label: 'Group C-2', color: '#ef4444' },
    { x: 50, y: 75, label: 'Group C-3', color: '#ef4444' },
    { x: 55, y: 68, label: 'Group C-4', color: '#ef4444' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>🔵 Scatter Plot</h1>
      <p className="jv-subtitle">
        Visualize relationships between two variables with interactive scatter plot charts
      </p>

      {/* Basic Scatter Plot */}
      <section className="jv-section">
        <h2>📊 Basic Scatter Plot</h2>
        <p>Simple scatter plot showing data distribution</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <ScatterPlot
            data={basicData}
            title="Data Distribution"
            xLabel="X Axis"
            yLabel="Y Axis"
            height={400}
            width={700}
          />
        </div>

        <CodeBlock
          code={`const data = [
  { x: 10, y: 20, label: 'Point 1' },
  { x: 25, y: 35, label: 'Point 2' },
  { x: 40, y: 25, label: 'Point 3' },
  { x: 55, y: 60, label: 'Point 4' },
  { x: 70, y: 45, label: 'Point 5' },
  { x: 85, y: 75, label: 'Point 6' },
];

<ScatterPlot
  data={data}
  title="Data Distribution"
  xLabel="X Axis"
  yLabel="Y Axis"
  height={400}
  width={700}
/>`}
          language="tsx"
        />
      </section>

      {/* Correlation */}
      <section className="jv-section">
        <h2>📈 Correlation Analysis</h2>
        <p>Visualize positive correlation between variables</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <ScatterPlot
            data={correlationData}
            title="Hours Studied vs Test Score"
            xLabel="Hours Studied"
            yLabel="Test Score"
            height={400}
            width={700}
            color="#10b981"
          />
        </div>

        <CodeBlock
          code={`const correlationData = [
  { x: 10, y: 15, label: 'A' },
  { x: 20, y: 25, label: 'B' },
  { x: 30, y: 35, label: 'C' },
  { x: 40, y: 42, label: 'D' },
  { x: 50, y: 55, label: 'E' },
  { x: 60, y: 62, label: 'F' },
  { x: 70, y: 75, label: 'G' },
  { x: 80, y: 82, label: 'H' },
];

<ScatterPlot
  data={correlationData}
  title="Hours Studied vs Test Score"
  xLabel="Hours Studied"
  yLabel="Test Score"
  color="#10b981"
/>`}
          language="tsx"
        />
      </section>

      {/* Multiple Groups */}
      <section className="jv-section">
        <h2>🎨 Multiple Groups</h2>
        <p>Differentiate data groups with custom colors</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <ScatterPlot
            data={multiGroupData}
            title="Product Comparison"
            xLabel="Price"
            yLabel="Quality Score"
            height={400}
            width={700}
            showGrid
          />
        </div>

        <CodeBlock
          code={`const multiGroupData = [
  { x: 20, y: 30, label: 'Group A-1', color: '#3b82f6' },
  { x: 25, y: 45, label: 'Group A-2', color: '#3b82f6' },
  { x: 50, y: 20, label: 'Group B-1', color: '#10b981' },
  { x: 55, y: 35, label: 'Group B-2', color: '#10b981' },
  { x: 40, y: 70, label: 'Group C-1', color: '#ef4444' },
  { x: 45, y: 65, label: 'Group C-2', color: '#ef4444' },
];

<ScatterPlot
  data={multiGroupData}
  title="Product Comparison"
  xLabel="Price"
  yLabel="Quality Score"
  showGrid
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>ScatterPlotProps</h3>
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
              <td><code>ScatterPlotDataPoint[]</code></td>
              <td>-</td>
              <td>Array of data points (required)</td>
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
              <td>Default point color</td>
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
          </tbody>
        </table>

        <h3>ScatterPlotDataPoint</h3>
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
              <td><code>label</code></td>
              <td><code>string</code></td>
              <td>Point label (shown in tooltip)</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td>Custom point color (optional)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>📊 Correlation analysis between two variables</li>
          <li>🔬 Scientific data visualization</li>
          <li>📈 Trend identification</li>
          <li>🎯 Outlier detection</li>
          <li>📉 Performance comparison</li>
          <li>🔍 Pattern recognition</li>
        </ul>
      </section>
    </div>
  );
};
