import React from 'react';
import { GaugeChart } from '../../src/components/GaugeChart';
import { CodeBlock } from '../components/CodeBlock';

export const GaugeChartDemo: React.FC = () => {
  return (
    <div className="jv-demo-page">
      <h1>🎯 Gauge Chart</h1>
      <p className="jv-subtitle">
        Display single value indicators with color-coded ranges and animated needles
      </p>

      {/* Basic Gauge */}
      <section className="jv-section">
        <h2>📊 Basic Gauge Chart</h2>
        <p>Simple gauge showing performance metrics or progress</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <GaugeChart
            value={72}
            min={0}
            max={100}
            title="CPU Usage"
            unit="%"
            size={300}
          />
        </div>

        <CodeBlock
          code={`<GaugeChart
  value={72}
  min={0}
  max={100}
  title="CPU Usage"
  unit="%"
  size={300}
/>`}
          language="tsx"
        />
      </section>

      {/* Multiple Gauges */}
      <section className="jv-section">
        <h2>📈 Multiple Gauge Charts</h2>
        <p>Display multiple metrics side by side</p>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px', marginBottom: '24px' }}>
          <GaugeChart
            value={85}
            min={0}
            max={100}
            title="Performance"
            unit="%"
            size={250}
          />
          <GaugeChart
            value={45}
            min={0}
            max={100}
            title="Storage"
            unit="%"
            size={250}
          />
          <GaugeChart
            value={92}
            min={0}
            max={100}
            title="Uptime"
            unit="%"
            size={250}
          />
        </div>

        <CodeBlock
          code={`<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <GaugeChart value={85} title="Performance" unit="%" size={250} />
  <GaugeChart value={45} title="Storage" unit="%" size={250} />
  <GaugeChart value={92} title="Uptime" unit="%" size={250} />
</div>`}
          language="tsx"
        />
      </section>

      {/* Custom Ranges */}
      <section className="jv-section">
        <h2>🎨 Custom Value Ranges</h2>
        <p>Gauge with custom min/max values</p>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px', marginBottom: '24px' }}>
          <GaugeChart
            value={3250}
            min={0}
            max={5000}
            title="Monthly Sales"
            unit="$"
            size={250}
          />
          <GaugeChart
            value={750}
            min={0}
            max={1000}
            title="Active Users"
            size={250}
          />
        </div>

        <CodeBlock
          code={`<GaugeChart
  value={3250}
  min={0}
  max={5000}
  title="Monthly Sales"
  unit="$"
  size={250}
/>

<GaugeChart
  value={750}
  min={0}
  max={1000}
  title="Active Users"
  size={250}
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>GaugeChartProps</h3>
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
              <td><code>value</code></td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Current value to display (required)</td>
            </tr>
            <tr>
              <td><code>min</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>Minimum value</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>Maximum value</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Title displayed above the gauge</td>
            </tr>
            <tr>
              <td><code>unit</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Unit to display after the value</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>number</code></td>
              <td><code>300</code></td>
              <td>Width and height of the gauge</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable smooth animations</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>🖥️ System monitoring (CPU, memory, disk usage)</li>
          <li>📊 KPI dashboards</li>
          <li>🎯 Goal progress tracking</li>
          <li>⚡ Performance metrics</li>
          <li>🔋 Battery levels</li>
          <li>📈 Score displays</li>
        </ul>
      </section>
    </div>
  );
};
