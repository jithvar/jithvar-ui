import React, { useState } from 'react';
import { DateRangePicker, DateRange } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const DateRangePickerDemo: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [customFormatRange1, setCustomFormatRange1] = useState<DateRange>({ startDate: null, endDate: null });
  const [customFormatRange2, setCustomFormatRange2] = useState<DateRange>({ startDate: null, endDate: null });
  const [customFormatRange3, setCustomFormatRange3] = useState<DateRange>({ startDate: null, endDate: null });
  const [styledRange, setStyledRange] = useState<DateRange>({ startDate: null, endDate: null });

  const basicExample = `import { DateRangePicker, DateRange } from 'jithvar-ui';

const [dateRange, setDateRange] = useState<DateRange>({
  startDate: null,
  endDate: null
});

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
/>`;

  const dateFormatsExample = `// Different date format options

// MM/DD/YYYY format
<DateRangePicker
  value={range1}
  onChange={setRange1}
  dateFormat="MM/DD/YYYY"
/>

// DD/MM/YYYY format (European style)
<DateRangePicker
  value={range2}
  onChange={setRange2}
  dateFormat="DD/MM/YYYY"
/>

// YYYY-MM-DD format (ISO style)
<DateRangePicker
  value={range3}
  onChange={setRange3}
  dateFormat="YYYY-MM-DD"
/>

// Custom function format
<DateRangePicker
  value={range4}
  onChange={setRange4}
  dateFormat={(date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return \`\${month}/\${day}/\${year}\`;
  }}
/>`;

  const customStylingExample = `// Custom styling with CSS classes

<DateRangePicker
  value={range}
  onChange={setRange}
  containerClassName="custom-daterange-container"
  inputClassName="custom-daterange-input"
  className="my-daterange-picker"
/>

// CSS (add to your stylesheet)
.custom-daterange-container {
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 4px;
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
}

.custom-daterange-input {
  font-weight: 600;
  color: white;
  background: transparent;
  border: none;
}

.custom-daterange-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}`;

  const presetsExample = `// Predefined date ranges included:

- Yesterday
- Last 7 Days
- Last 15 Days
- Last 30 Days
- Current Month
- Last Month
- Last 3 Months
- Custom (manual selection)

// All presets are automatically available in the dropdown!`;

  return (
    <div className="jv-demo-page">
      <h1>📅 DateRangePicker</h1>
      <p className="jv-subtitle">
        Date range selection with predefined ranges, validation, and custom formatting
      </p>

      {/* Basic Usage */}
      <section className="jv-section">
        <h2>🎯 Basic Usage</h2>
        <p>Dual calendar with predefined date ranges</p>
        
        <div className="jv-demo-preview">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
        
        {dateRange.startDate && dateRange.endDate && (
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            <strong>Selected Range:</strong><br />
            From: {dateRange.startDate.toLocaleDateString()}<br />
            To: {dateRange.endDate.toLocaleDateString()}<br />
            <small style={{ color: '#6b7280' }}>
              Duration: {Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
            </small>
          </div>
        )}
        
        <CodeBlock code={basicExample} language="tsx" />
      </section>

      {/* Predefined Ranges */}
      <section className="jv-section">
        <h2>⚡ Predefined Date Ranges</h2>
        <p>Quick selection with built-in preset ranges</p>
        
        <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '12px', color: '#374151' }}>Available Presets:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              📆 <strong>Yesterday</strong>
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              📅 <strong>Last 7 Days</strong>
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              📅 <strong>Last 15 Days</strong>
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              📅 <strong>Last 30 Days</strong>
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              📆 <strong>Current Month</strong>
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              📆 <strong>Last Month</strong>
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              📅 <strong>Last 3 Months</strong>
            </div>
            <div style={{ padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              🎯 <strong>Custom</strong>
            </div>
          </div>
        </div>
        
        <CodeBlock code={presetsExample} language="tsx" />
      </section>

      {/* Date Formats */}
      <section className="jv-section">
        <h2>📅 Date Format Options</h2>
        <p>Configure display format for start and end dates</p>
        
        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
              MM/DD/YYYY Format (US Style)
            </label>
            <DateRangePicker
              value={customFormatRange1}
              onChange={setCustomFormatRange1}
              dateFormat="MM/DD/YYYY"
            />
            {customFormatRange1.startDate && customFormatRange1.endDate && (
              <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                Showing dates in US format
              </small>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
              DD/MM/YYYY Format (European Style)
            </label>
            <DateRangePicker
              value={customFormatRange2}
              onChange={setCustomFormatRange2}
              dateFormat="DD/MM/YYYY"
            />
            {customFormatRange2.startDate && customFormatRange2.endDate && (
              <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                Showing dates in European format
              </small>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
              YYYY-MM-DD Format (ISO Standard)
            </label>
            <DateRangePicker
              value={customFormatRange3}
              onChange={setCustomFormatRange3}
              dateFormat="YYYY-MM-DD"
            />
            {customFormatRange3.startDate && customFormatRange3.endDate && (
              <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                Showing dates in ISO format
              </small>
            )}
          </div>
        </div>
        
        <CodeBlock code={dateFormatsExample} language="tsx" />
      </section>

      {/* Custom Styling */}
      <section className="jv-section">
        <h2>🎨 Custom Styling with Classes</h2>
        <p>Apply custom CSS classes to container and input elements</p>
        
        <div className="jv-demo-preview">
          <DateRangePicker
            value={styledRange}
            onChange={setStyledRange}
            containerClassName="custom-daterange-container"
            inputClassName="custom-daterange-input"
          />
        </div>
        
        <style>{`
          .custom-daterange-container {
            border: 2px solid #10b981 !important;
            border-radius: 12px !important;
            padding: 4px !important;
            background: linear-gradient(135deg, #34d399 0%, #10b981 100%) !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
          }
          
          .custom-daterange-input {
            font-weight: 600 !important;
            color: white !important;
            background: transparent !important;
            border: none !important;
          }
          
          .custom-daterange-input::placeholder {
            color: rgba(255, 255, 255, 0.8) !important;
          }
        `}</style>
        
        <CodeBlock code={customStylingExample} language="tsx" />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>value</code></td>
                <td style={{ padding: '12px' }}>DateRange</td>
                <td style={{ padding: '12px' }}>{'{ startDate: null, endDate: null }'}</td>
                <td style={{ padding: '12px' }}>Selected date range</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>onChange</code></td>
                <td style={{ padding: '12px' }}>(range: DateRange) =&gt; void</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Callback when range changes</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>dateFormat</code></td>
                <td style={{ padding: '12px' }}>string | function</td>
                <td style={{ padding: '12px' }}>'MMM DD, YYYY'</td>
                <td style={{ padding: '12px' }}>Format: 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MMM DD, YYYY', 'DD MMM YYYY', or custom function</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>containerClassName</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>''</td>
                <td style={{ padding: '12px' }}>Custom CSS class for container</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>inputClassName</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>''</td>
                <td style={{ padding: '12px' }}>Custom CSS class for input field</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>className</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>''</td>
                <td style={{ padding: '12px' }}>Additional CSS class</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: '24px' }}>DateRange Interface</h3>
        <CodeBlock
          code={`interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}`}
          language="typescript"
        />
      </section>

      {/* Features List */}
      <section className="jv-section">
        <h2>✨ Features</h2>
        <ul className="jv-feature-list">
          <li>✅ Dual calendar view (side by side)</li>
          <li>✅ 8 predefined date ranges</li>
          <li>✅ Custom date range selection</li>
          <li>✅ Highlights all dates in selected range</li>
          <li>✅ Multiple date format options</li>
          <li>✅ Custom date formatter function</li>
          <li>✅ Custom CSS classes (container & input)</li>
          <li>✅ Hover preview of range</li>
          <li>✅ Keyboard navigation</li>
          <li>✅ Click outside to close</li>
          <li>✅ Mobile responsive</li>
        </ul>
      </section>
    </div>
  );
};
