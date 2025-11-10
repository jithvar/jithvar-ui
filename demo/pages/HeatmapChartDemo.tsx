import React from 'react';
import { HeatmapChart } from '../../src/components/HeatmapChart';
import { CodeBlock } from '../components/CodeBlock';

export const HeatmapChartDemo: React.FC = () => {
  // Weekly activity data
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hoursOfDay = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];
  
  const activityData = [
    // Monday
    { x: 'Mon', y: '12am', value: 2 }, { x: 'Mon', y: '3am', value: 1 }, { x: 'Mon', y: '6am', value: 5 },
    { x: 'Mon', y: '9am', value: 30 }, { x: 'Mon', y: '12pm', value: 45 }, { x: 'Mon', y: '3pm', value: 50 },
    { x: 'Mon', y: '6pm', value: 35 }, { x: 'Mon', y: '9pm', value: 15 },
    // Tuesday
    { x: 'Tue', y: '12am', value: 3 }, { x: 'Tue', y: '3am', value: 2 }, { x: 'Tue', y: '6am', value: 7 },
    { x: 'Tue', y: '9am', value: 35 }, { x: 'Tue', y: '12pm', value: 48 }, { x: 'Tue', y: '3pm', value: 55 },
    { x: 'Tue', y: '6pm', value: 40 }, { x: 'Tue', y: '9pm', value: 18 },
    // Wednesday
    { x: 'Wed', y: '12am', value: 2 }, { x: 'Wed', y: '3am', value: 1 }, { x: 'Wed', y: '6am', value: 6 },
    { x: 'Wed', y: '9am', value: 38 }, { x: 'Wed', y: '12pm', value: 52 }, { x: 'Wed', y: '3pm', value: 58 },
    { x: 'Wed', y: '6pm', value: 42 }, { x: 'Wed', y: '9pm', value: 20 },
    // Thursday
    { x: 'Thu', y: '12am', value: 3 }, { x: 'Thu', y: '3am', value: 2 }, { x: 'Thu', y: '6am', value: 8 },
    { x: 'Thu', y: '9am', value: 40 }, { x: 'Thu', y: '12pm', value: 50 }, { x: 'Thu', y: '3pm', value: 60 },
    { x: 'Thu', y: '6pm', value: 45 }, { x: 'Thu', y: '9pm', value: 22 },
    // Friday
    { x: 'Fri', y: '12am', value: 4 }, { x: 'Fri', y: '3am', value: 3 }, { x: 'Fri', y: '6am', value: 10 },
    { x: 'Fri', y: '9am', value: 35 }, { x: 'Fri', y: '12pm', value: 40 }, { x: 'Fri', y: '3pm', value: 45 },
    { x: 'Fri', y: '6pm', value: 50 }, { x: 'Fri', y: '9pm', value: 30 },
    // Saturday
    { x: 'Sat', y: '12am', value: 8 }, { x: 'Sat', y: '3am', value: 5 }, { x: 'Sat', y: '6am', value: 4 },
    { x: 'Sat', y: '9am', value: 15 }, { x: 'Sat', y: '12pm', value: 35 }, { x: 'Sat', y: '3pm', value: 40 },
    { x: 'Sat', y: '6pm', value: 38 }, { x: 'Sat', y: '9pm', value: 25 },
    // Sunday
    { x: 'Sun', y: '12am', value: 6 }, { x: 'Sun', y: '3am', value: 4 }, { x: 'Sun', y: '6am', value: 3 },
    { x: 'Sun', y: '9am', value: 12 }, { x: 'Sun', y: '12pm', value: 30 }, { x: 'Sun', y: '3pm', value: 35 },
    { x: 'Sun', y: '6pm', value: 32 }, { x: 'Sun', y: '9pm', value: 20 },
  ];

  // Monthly sales data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const products = ['Product A', 'Product B', 'Product C', 'Product D'];
  
  const salesData = [
    { x: 'Jan', y: 'Product A', value: 45 }, { x: 'Feb', y: 'Product A', value: 52 },
    { x: 'Mar', y: 'Product A', value: 48 }, { x: 'Apr', y: 'Product A', value: 60 },
    { x: 'May', y: 'Product A', value: 65 }, { x: 'Jun', y: 'Product A', value: 70 },
    
    { x: 'Jan', y: 'Product B', value: 30 }, { x: 'Feb', y: 'Product B', value: 35 },
    { x: 'Mar', y: 'Product B', value: 40 }, { x: 'Apr', y: 'Product B', value: 42 },
    { x: 'May', y: 'Product B', value: 45 }, { x: 'Jun', y: 'Product B', value: 48 },
    
    { x: 'Jan', y: 'Product C', value: 55 }, { x: 'Feb', y: 'Product C', value: 58 },
    { x: 'Mar', y: 'Product C', value: 52 }, { x: 'Apr', y: 'Product C', value: 50 },
    { x: 'May', y: 'Product C', value: 48 }, { x: 'Jun', y: 'Product C', value: 45 },
    
    { x: 'Jan', y: 'Product D', value: 20 }, { x: 'Feb', y: 'Product D', value: 25 },
    { x: 'Mar', y: 'Product D', value: 30 }, { x: 'Apr', y: 'Product D', value: 35 },
    { x: 'May', y: 'Product D', value: 40 }, { x: 'Jun', y: 'Product D', value: 50 },
  ];

  return (
    <div className="jv-demo-page">
      <h1>🔥 Heatmap Chart</h1>
      <p className="jv-subtitle">
        Visualize data density and patterns with color-coded heatmaps - perfect for activity tracking, correlations, and time-series data
      </p>

      {/* Weekly Activity */}
      <section className="jv-section">
        <h2>📅 Weekly Activity Heatmap</h2>
        <p>Track user activity patterns throughout the week</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <HeatmapChart
            data={activityData}
            xLabels={daysOfWeek}
            yLabels={hoursOfDay}
            title="User Activity by Day and Time"
            width={700}
            height={400}
            colorScheme="blue"
          />
        </div>

        <CodeBlock
          code={`const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hoursOfDay = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];

const activityData = [
  { x: 'Mon', y: '12am', value: 2 },
  { x: 'Mon', y: '9am', value: 30 },
  { x: 'Mon', y: '3pm', value: 50 },
  // ... more data points
];

<HeatmapChart
  data={activityData}
  xLabels={daysOfWeek}
  yLabels={hoursOfDay}
  title="User Activity by Day and Time"
  width={700}
  height={400}
  colorScheme="blue"
/>`}
          language="tsx"
        />
      </section>

      {/* Product Sales */}
      <section className="jv-section">
        <h2>📊 Product Sales Heatmap</h2>
        <p>Compare product performance across months with different color schemes</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', gap: '24px', flexWrap: 'wrap' }}>
          <HeatmapChart
            data={salesData}
            xLabels={months}
            yLabels={products}
            title="Sales Performance (Green)"
            width={600}
            height={350}
            colorScheme="green"
          />
          <HeatmapChart
            data={salesData}
            xLabels={months}
            yLabels={products}
            title="Sales Performance (Red)"
            width={600}
            height={350}
            colorScheme="red"
          />
        </div>

        <CodeBlock
          code={`const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const products = ['Product A', 'Product B', 'Product C', 'Product D'];

const salesData = [
  { x: 'Jan', y: 'Product A', value: 45 },
  { x: 'Feb', y: 'Product A', value: 52 },
  // ... more data points
];

<HeatmapChart
  data={salesData}
  xLabels={months}
  yLabels={products}
  title="Sales Performance"
  colorScheme="green"
/>`}
          language="tsx"
        />
      </section>

      {/* With Values */}
      <section className="jv-section">
        <h2>🔢 Heatmap with Values</h2>
        <p>Display exact values on each cell</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <HeatmapChart
            data={salesData}
            xLabels={months}
            yLabels={products}
            title="Sales with Values"
            width={700}
            height={350}
            colorScheme="purple"
            showValues={true}
          />
        </div>

        <CodeBlock
          code={`<HeatmapChart
  data={salesData}
  xLabels={months}
  yLabels={products}
  title="Sales with Values"
  colorScheme="purple"
  showValues={true}
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>HeatmapChartProps</h3>
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
              <td><code>HeatmapDataPoint[]</code></td>
              <td>-</td>
              <td>Heatmap data points (required)</td>
            </tr>
            <tr>
              <td><code>xLabels</code></td>
              <td><code>(string | number)[]</code></td>
              <td>-</td>
              <td>X-axis labels (required)</td>
            </tr>
            <tr>
              <td><code>yLabels</code></td>
              <td><code>(string | number)[]</code></td>
              <td>-</td>
              <td>Y-axis labels (required)</td>
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
              <td><code>colorScheme</code></td>
              <td><code>'blue' | 'green' | 'red' | 'purple' | 'gradient'</code></td>
              <td><code>'blue'</code></td>
              <td>Color scheme for heatmap</td>
            </tr>
            <tr>
              <td><code>showValues</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Display values on cells</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
          </tbody>
        </table>

        <h3>HeatmapDataPoint</h3>
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
              <td><code>string | number</code></td>
              <td>X-axis coordinate (must match xLabels)</td>
            </tr>
            <tr>
              <td><code>y</code></td>
              <td><code>string | number</code></td>
              <td>Y-axis coordinate (must match yLabels)</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td><code>number</code></td>
              <td>Data value (determines color intensity)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>📅 Activity tracking (GitHub-style contribution graphs)</li>
          <li>🌡️ Temperature/weather data visualization</li>
          <li>📊 Correlation matrices</li>
          <li>🕐 Time-series patterns</li>
          <li>🛒 Product inventory heatmaps</li>
          <li>📈 Performance metrics across dimensions</li>
          <li>🌍 Geographic data density</li>
        </ul>
      </section>
    </div>
  );
};
