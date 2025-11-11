import React, { useState } from 'react';
import { DatePicker } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const DatePickerDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [constrainedDate, setConstrainedDate] = useState<Date | null>(null);
  const [customFormatDate1, setCustomFormatDate1] = useState<Date | null>(null);
  const [customFormatDate2, setCustomFormatDate2] = useState<Date | null>(null);
  const [customFormatDate3, setCustomFormatDate3] = useState<Date | null>(null);
  const [customFormatDate4, setCustomFormatDate4] = useState<Date | null>(null);
  const [styledDate, setStyledDate] = useState<Date | null>(null);

  const basicExample = `import { DatePicker } from 'jithvar-ui';

const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select a date"
/>`;

  const constraintsExample = `// Date range validation: Only allow dates from today to end of year
<DatePicker
  value={constrainedDate}
  onChange={setConstrainedDate}
  minDate={new Date()} // No past dates
  maxDate={new Date('2025-12-31')} // Max date: End of 2025
  placeholder="Select date (2025 only)"
/>`;

  const dateFormatsExample = `// Different date format options

// MM/DD/YYYY format
<DatePicker
  value={date1}
  onChange={setDate1}
  dateFormat="MM/DD/YYYY"
  placeholder="MM/DD/YYYY"
/>

// DD/MM/YYYY format (European style)
<DatePicker
  value={date2}
  onChange={setDate2}
  dateFormat="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
/>

// YYYY-MM-DD format (ISO style)
<DatePicker
  value={date3}
  onChange={setDate3}
  dateFormat="YYYY-MM-DD"
  placeholder="YYYY-MM-DD"
/>

// Custom date format with function
<DatePicker
  value={date4}
  onChange={setDate4}
  dateFormat={(date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return \`\${days[date.getDay()]}, \${date.toLocaleDateString()}\`;
  }}
  placeholder="Custom format"
/>`;

  const customStylingExample = `// Custom styling with CSS classes

<DatePicker
  value={date}
  onChange={setDate}
  containerClassName="custom-datepicker-container"
  inputClassName="custom-input-field"
  className="my-datepicker"
/>

// CSS (add to your stylesheet)
.custom-datepicker-container {
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-input-field {
  font-weight: 600;
  color: white;
  background: transparent;
  border: none;
}

.custom-input-field::placeholder {
  color: rgba(255, 255, 255, 0.7);
}`;

  return (
    <div className="jv-demo-page">
      <h1>📆 DatePicker</h1>
      <p className="jv-subtitle">
        Single date selection with validation, custom formats, and styling
      </p>

      {/* Basic Usage */}
      <section className="jv-section">
        <h2>🎯 Basic Usage</h2>
        <p>Simple date picker with default settings</p>
        
        <div className="jv-demo-preview">
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select a date"
          />
        </div>
        
        {selectedDate && (
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            <strong>Selected:</strong> {selectedDate.toLocaleDateString()}
          </div>
        )}
        
        <CodeBlock code={basicExample} language="tsx" />
      </section>

      {/* Date Range Validation */}
      <section className="jv-section">
        <h2>✅ Date Range Validation (Min/Max)</h2>
        <p>Restrict selectable dates with minDate and maxDate properties</p>
        
        <div className="jv-demo-preview">
          <DatePicker
            value={constrainedDate}
            onChange={setConstrainedDate}
            minDate={new Date()}
            maxDate={new Date('2025-12-31')}
            placeholder="Select date (Today to Dec 31, 2025)"
          />
        </div>
        
        {constrainedDate && (
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            <strong>Selected:</strong> {constrainedDate.toLocaleDateString()}<br />
            <small style={{ color: '#6b7280' }}>
              Valid range: {new Date().toLocaleDateString()} to Dec 31, 2025
            </small>
          </div>
        )}
        
        <CodeBlock code={constraintsExample} language="tsx" />
      </section>

      {/* Date Formats */}
      <section className="jv-section">
        <h2>📅 Date Format Options</h2>
        <p>Configure how dates are displayed with built-in or custom formats</p>
        
        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
              MM/DD/YYYY (US Format)
            </label>
            <DatePicker
              value={customFormatDate1}
              onChange={setCustomFormatDate1}
              dateFormat="MM/DD/YYYY"
              placeholder="MM/DD/YYYY"
            />
            {customFormatDate1 && (
              <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                Result: {customFormatDate1.toLocaleDateString('en-US')}
              </small>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
              DD/MM/YYYY (European Format)
            </label>
            <DatePicker
              value={customFormatDate2}
              onChange={setCustomFormatDate2}
              dateFormat="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
            />
            {customFormatDate2 && (
              <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                Result: {customFormatDate2.getDate()}/{customFormatDate2.getMonth() + 1}/{customFormatDate2.getFullYear()}
              </small>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
              YYYY-MM-DD (ISO Format)
            </label>
            <DatePicker
              value={customFormatDate3}
              onChange={setCustomFormatDate3}
              dateFormat="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
            />
            {customFormatDate3 && (
              <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                Result: {customFormatDate3.toISOString().split('T')[0]}
              </small>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#374151' }}>
              Custom Function Format
            </label>
            <DatePicker
              value={customFormatDate4}
              onChange={setCustomFormatDate4}
              dateFormat={(date) => {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
              }}
              placeholder="Custom format"
            />
            {customFormatDate4 && (
              <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                Custom formatter applied
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
          <DatePicker
            value={styledDate}
            onChange={setStyledDate}
            containerClassName="custom-datepicker-container"
            inputClassName="custom-input-field"
            placeholder="Custom styled picker"
          />
        </div>
        
        <style>{`
          .custom-datepicker-container {
            border: 2px solid #3b82f6 !important;
            border-radius: 12px !important;
            padding: 4px !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
          }
          
          .custom-input-field {
            font-weight: 600 !important;
            color: white !important;
            background: transparent !important;
            border: none !important;
          }
          
          .custom-input-field::placeholder {
            color: rgba(255, 255, 255, 0.7) !important;
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
                <td style={{ padding: '12px' }}>Date | null</td>
                <td style={{ padding: '12px' }}>null</td>
                <td style={{ padding: '12px' }}>Selected date value</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>onChange</code></td>
                <td style={{ padding: '12px' }}>(date: Date | null) =&gt; void</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Callback when date changes</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>minDate</code></td>
                <td style={{ padding: '12px' }}>Date</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Minimum selectable date</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>maxDate</code></td>
                <td style={{ padding: '12px' }}>Date</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Maximum selectable date</td>
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
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>placeholder</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>'Select date'</td>
                <td style={{ padding: '12px' }}>Placeholder text</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>disabled</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>false</td>
                <td style={{ padding: '12px' }}>Disable the picker</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features List */}
      <section className="jv-section">
        <h2>✨ Features</h2>
        <ul className="jv-feature-list">
          <li>✅ Single date selection</li>
          <li>✅ Min/max date validation</li>
          <li>✅ Multiple date format options</li>
          <li>✅ Custom date formatter function</li>
          <li>✅ Custom CSS classes (container & input)</li>
          <li>✅ Disabled state support</li>
          <li>✅ Clear button</li>
          <li>✅ Custom placeholder</li>
          <li>✅ Keyboard navigation</li>
          <li>✅ Click outside to close</li>
        </ul>
      </section>
    </div>
  );
};
