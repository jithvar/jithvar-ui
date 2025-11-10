import React from 'react';
import { FunnelChart } from '../../src/components/FunnelChart';
import { CodeBlock } from '../components/CodeBlock';

export const FunnelChartDemo: React.FC = () => {
  const salesFunnelData = [
    { label: 'Website Visits', value: 10000 },
    { label: 'Product Views', value: 5000 },
    { label: 'Add to Cart', value: 2000 },
    { label: 'Checkout Started', value: 1200 },
    { label: 'Purchase Complete', value: 800 },
  ];

  const recruitmentData = [
    { label: 'Applications Received', value: 500 },
    { label: 'Initial Screening', value: 200 },
    { label: 'Phone Interview', value: 100 },
    { label: 'Technical Interview', value: 50 },
    { label: 'Final Interview', value: 25 },
    { label: 'Offers Extended', value: 15 },
    { label: 'Hired', value: 12 },
  ];

  const customColorData = [
    { label: 'Top of Funnel', value: 1000, color: '#3b82f6' },
    { label: 'Qualified Leads', value: 600, color: '#10b981' },
    { label: 'Proposals Sent', value: 300, color: '#f59e0b' },
    { label: 'Negotiations', value: 150, color: '#ef4444' },
    { label: 'Closed Deals', value: 80, color: '#8b5cf6' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>🔻 Funnel Chart</h1>
      <p className="jv-subtitle">
        Visualize conversion funnels and processes with multiple stages - perfect for sales pipelines, user journeys, and recruitment processes
      </p>

      {/* Sales Funnel */}
      <section className="jv-section">
        <h2>💰 Sales Funnel</h2>
        <p>Track customer journey from initial visit to purchase</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <FunnelChart
            data={salesFunnelData}
            title="E-commerce Conversion Funnel"
            height={450}
            width={700}
          />
        </div>

        <CodeBlock
          code={`const salesFunnelData = [
  { label: 'Website Visits', value: 10000 },
  { label: 'Product Views', value: 5000 },
  { label: 'Add to Cart', value: 2000 },
  { label: 'Checkout Started', value: 1200 },
  { label: 'Purchase Complete', value: 800 },
];

<FunnelChart
  data={salesFunnelData}
  title="E-commerce Conversion Funnel"
  height={450}
  width={700}
/>`}
          language="tsx"
        />
      </section>

      {/* Recruitment Funnel */}
      <section className="jv-section">
        <h2>👥 Recruitment Funnel</h2>
        <p>Visualize the hiring pipeline from application to hire</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <FunnelChart
            data={recruitmentData}
            title="Hiring Process Funnel"
            height={500}
            width={700}
            showPercentages={true}
          />
        </div>

        <CodeBlock
          code={`const recruitmentData = [
  { label: 'Applications Received', value: 500 },
  { label: 'Initial Screening', value: 200 },
  { label: 'Phone Interview', value: 100 },
  { label: 'Technical Interview', value: 50 },
  { label: 'Final Interview', value: 25 },
  { label: 'Offers Extended', value: 15 },
  { label: 'Hired', value: 12 },
];

<FunnelChart
  data={recruitmentData}
  title="Hiring Process Funnel"
  height={500}
  width={700}
  showPercentages={true}
/>`}
          language="tsx"
        />
      </section>

      {/* Custom Colors */}
      <section className="jv-section">
        <h2>🎨 Custom Colors</h2>
        <p>Customize each stage with different colors</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <FunnelChart
            data={customColorData}
            title="Sales Pipeline"
            height={400}
            width={700}
            showValues={true}
            showPercentages={false}
          />
        </div>

        <CodeBlock
          code={`const customColorData = [
  { label: 'Top of Funnel', value: 1000, color: '#3b82f6' },
  { label: 'Qualified Leads', value: 600, color: '#10b981' },
  { label: 'Proposals Sent', value: 300, color: '#f59e0b' },
  { label: 'Negotiations', value: 150, color: '#ef4444' },
  { label: 'Closed Deals', value: 80, color: '#8b5cf6' },
];

<FunnelChart
  data={customColorData}
  title="Sales Pipeline"
  showValues={true}
  showPercentages={false}
/>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <h3>FunnelChartProps</h3>
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
              <td><code>FunnelChartDataPoint[]</code></td>
              <td>-</td>
              <td>Funnel stages data (required)</td>
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
              <td><code>showValues</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Display values on segments</td>
            </tr>
            <tr>
              <td><code>showPercentages</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Display percentages on segments</td>
            </tr>
            <tr>
              <td><code>animated</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Enable animations</td>
            </tr>
          </tbody>
        </table>

        <h3>FunnelChartDataPoint</h3>
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
              <td>Stage count/value</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td><code>string</code></td>
              <td>Custom segment color (optional)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Examples */}
      <section className="jv-section">
        <h2>💡 Use Cases</h2>
        <ul className="jv-use-cases">
          <li>🛒 E-commerce conversion tracking</li>
          <li>👥 Recruitment pipeline visualization</li>
          <li>💼 Sales funnel analysis</li>
          <li>📧 Email campaign funnels</li>
          <li>🎓 Student enrollment process</li>
          <li>📱 App onboarding flow</li>
          <li>🔄 Customer journey mapping</li>
        </ul>
      </section>
    </div>
  );
};
