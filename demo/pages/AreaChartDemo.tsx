import React, { useState } from 'react';
import { AreaChart } from '../../src';
import { PageWrapper } from '../components/PageWrapper';
import { CodeBlock } from '../components/CodeBlock';

export const AreaChartDemo: React.FC = () => {
  const [smooth, setSmooth] = useState(true);
  const [showPoints, setShowPoints] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // Single dataset
  const singleData = [
    { label: 'Jan', value: 4000 },
    { label: 'Feb', value: 3000 },
    { label: 'Mar', value: 5000 },
    { label: 'Apr', value: 4500 },
    { label: 'May', value: 6000 },
    { label: 'Jun', value: 5500 },
    { label: 'Jul', value: 7000 },
  ];

  // Multiple datasets
  const multipleDatasets = [
    {
      label: 'Product A',
      data: [
        { label: 'Mon', value: 120 },
        { label: 'Tue', value: 150 },
        { label: 'Wed', value: 180 },
        { label: 'Thu', value: 160 },
        { label: 'Fri', value: 200 },
        { label: 'Sat', value: 190 },
        { label: 'Sun', value: 170 },
      ],
      color: '#3b82f6',
    },
    {
      label: 'Product B',
      data: [
        { label: 'Mon', value: 80 },
        { label: 'Tue', value: 100 },
        { label: 'Wed', value: 120 },
        { label: 'Thu', value: 110 },
        { label: 'Fri', value: 140 },
        { label: 'Sat', value: 130 },
        { label: 'Sun', value: 115 },
      ],
      color: '#10b981',
    },
    {
      label: 'Product C',
      data: [
        { label: 'Mon', value: 60 },
        { label: 'Tue', value: 75 },
        { label: 'Wed', value: 90 },
        { label: 'Thu', value: 85 },
        { label: 'Fri', value: 100 },
        { label: 'Sat', value: 95 },
        { label: 'Sun', value: 88 },
      ],
      color: '#f59e0b',
    },
  ];

  // Website traffic data
  const trafficData = [
    { label: '12 AM', value: 1200 },
    { label: '3 AM', value: 800 },
    { label: '6 AM', value: 1500 },
    { label: '9 AM', value: 4000 },
    { label: '12 PM', value: 6500 },
    { label: '3 PM', value: 5800 },
    { label: '6 PM', value: 7200 },
    { label: '9 PM', value: 4500 },
    { label: '12 PM', value: 2000 },
  ];

  const basicUsageCode = `import { AreaChart } from 'jithvar-ui';

const data = [
  { label: 'Jan', value: 4000 },
  { label: 'Feb', value: 3000 },
  { label: 'Mar', value: 5000 },
  { label: 'Apr', value: 4500 },
  { label: 'May', value: 6000 },
  { label: 'Jun', value: 5500 },
];

<AreaChart 
  data={data}
  width={700}
  height={300}
/>`;

  const multipleDatasetsCode = `const datasets = [
  {
    label: 'Product A',
    data: [
      { label: 'Mon', value: 120 },
      { label: 'Tue', value: 150 },
      // ... more data
    ],
    color: '#3b82f6',
  },
  {
    label: 'Product B',
    data: [
      { label: 'Mon', value: 80 },
      { label: 'Tue', value: 100 },
      // ... more data
    ],
    color: '#10b981',
  },
];

<AreaChart 
  datasets={datasets}
  width={800}
  height={400}
/>`;

  const customizationCode = `<AreaChart 
  data={data}
  width={700}
  height={300}
  smooth={true}           // Smooth curves
  showPoints={true}       // Show data points
  showGrid={true}         // Show grid lines
  animated={true}         // Animate on load
/>`;

  return (
    <PageWrapper
      title="AreaChart Component"
      description="Visualize data trends with filled areas and smooth gradients"
    >
      {/* Basic Usage */}
      <section className="demo-section">
        <h2>Basic Usage</h2>
        <p>A simple area chart with smooth gradients and animations.</p>
        <div className="demo-container">
          <AreaChart data={singleData} width={700} height={300} />
        </div>
        <CodeBlock code={basicUsageCode} />
      </section>

      {/* Multiple Datasets */}
      <section className="demo-section">
        <h2>Multiple Datasets</h2>
        <p>Compare multiple data series with overlapping areas.</p>
        <div className="demo-container">
          <AreaChart datasets={multipleDatasets} width={800} height={400} />
        </div>
        <CodeBlock code={multipleDatasetsCode} />
      </section>

      {/* Customization Options */}
      <section className="demo-section">
        <h2>Customization Options</h2>
        <p>Control various aspects of the area chart appearance.</p>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={smooth}
              onChange={(e) => setSmooth(e.target.checked)}
            />
            Smooth Curves
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={showPoints}
              onChange={(e) => setShowPoints(e.target.checked)}
            />
            Show Points
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Show Grid
          </label>
        </div>
        <div className="demo-container">
          <AreaChart
            data={singleData}
            width={700}
            height={300}
            smooth={smooth}
            showPoints={showPoints}
            showGrid={showGrid}
          />
        </div>
        <CodeBlock code={customizationCode} />
      </section>

      {/* Website Traffic Example */}
      <section className="demo-section">
        <h2>Website Traffic Over Time</h2>
        <p>Monitor visitor trends throughout the day.</p>
        <div className="demo-container">
          <AreaChart
            data={trafficData}
            width={800}
            height={350}
            smooth={true}
          />
        </div>
      </section>

      {/* API Reference */}
      <section className="demo-section">
        <h2>API Reference</h2>
        <div className="api-table-container">
          <table className="api-table">
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
                <td>data</td>
                <td>AreaChartDataPoint[]</td>
                <td>-</td>
                <td>Single dataset (use this OR datasets)</td>
              </tr>
              <tr>
                <td>datasets</td>
                <td>AreaChartDataset[]</td>
                <td>-</td>
                <td>Multiple datasets (use this OR data)</td>
              </tr>
              <tr>
                <td>width</td>
                <td>number</td>
                <td>600</td>
                <td>Chart width in pixels</td>
              </tr>
              <tr>
                <td>height</td>
                <td>number</td>
                <td>400</td>
                <td>Chart height in pixels</td>
              </tr>
              <tr>
                <td>smooth</td>
                <td>boolean</td>
                <td>true</td>
                <td>Use smooth curves instead of straight lines</td>
              </tr>
              <tr>
                <td>showPoints</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show data points on the area</td>
              </tr>
              <tr>
                <td>showGrid</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show grid lines</td>
              </tr>
              <tr>
                <td>animated</td>
                <td>boolean</td>
                <td>true</td>
                <td>Animate chart on load</td>
              </tr>
              <tr>
                <td>stacked</td>
                <td>boolean</td>
                <td>false</td>
                <td>Stack areas on top of each other</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: '30px' }}>TypeScript Interfaces</h3>
        <CodeBlock
          code={`interface AreaChartDataPoint {
  label: string;      // X-axis label
  value: number;      // Y-axis value
}

interface AreaChartDataset {
  label: string;                  // Dataset name
  data: AreaChartDataPoint[];     // Data points
  color?: string;                 // Area color
}

interface AreaChartProps {
  data?: AreaChartDataPoint[];    // Single dataset
  datasets?: AreaChartDataset[];  // Multiple datasets
  width?: number;                 // Chart width
  height?: number;                // Chart height
  smooth?: boolean;               // Smooth curves
  showPoints?: boolean;           // Show points
  showGrid?: boolean;             // Show grid
  animated?: boolean;             // Animate
  stacked?: boolean;              // Stack areas
}`}
        />
      </section>

      {/* Features */}
      <section className="demo-section">
        <h2>Features</h2>
        <ul className="feature-list">
          <li>✅ Smooth gradient fills</li>
          <li>✅ Single or multiple datasets</li>
          <li>✅ Interactive tooltips on hover</li>
          <li>✅ Smooth or straight line connections</li>
          <li>✅ Animated area drawing</li>
          <li>✅ Data points with hover effects</li>
          <li>✅ Configurable grid lines</li>
          <li>✅ Legend for multiple datasets</li>
          <li>✅ Auto-scaling for optimal display</li>
          <li>✅ Custom colors per dataset</li>
        </ul>
      </section>
    </PageWrapper>
  );
};
