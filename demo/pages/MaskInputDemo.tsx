import React, { useState } from 'react';
import { MaskInput } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const MaskInputDemo: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [ssn, setSSN] = useState('');
  const [date, setDate] = useState('');
  const [creditCard, setCreditCard] = useState('');

  return (
    <div className="jv-demo-page">
      <h1>🎭 Mask Input</h1>
      <p className="jv-subtitle">
        Input component with customizable input masks for formatted data entry
      </p>

      {/* Common Masks */}
      <section className="jv-section">
        <h2>📱 Common Masks</h2>
        <p>Pre-configured masks for common input formats</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
          <MaskInput
            label="Phone Number"
            mask="(999) 999-9999"
            placeholder="(555) 123-4567"
            onChange={(clean, masked) => setPhone(masked)}
            helperText="US phone number format"
          />

          <MaskInput
            label="Social Security Number"
            mask="999-99-9999"
            placeholder="123-45-6789"
            onChange={(clean, masked) => setSSN(masked)}
            helperText="SSN format"
          />

          <MaskInput
            label="Date"
            mask="99/99/9999"
            placeholder="MM/DD/YYYY"
            onChange={(clean, masked) => setDate(masked)}
            helperText="Date format"
          />

          <MaskInput
            label="Credit Card"
            mask="9999 9999 9999 9999"
            placeholder="1234 5678 9012 3456"
            onChange={(clean, masked) => setCreditCard(masked)}
            helperText="Credit card number"
          />
        </div>

        <div style={{ marginTop: '20px', padding: '16px', background: '#f3f4f6', borderRadius: '8px' }}>
          <h4>Current Values:</h4>
          <pre style={{ fontSize: '12px', margin: '8px 0' }}>
            {`Phone: ${phone}\nSSN: ${ssn}\nDate: ${date}\nCredit Card: ${creditCard}`}
          </pre>
        </div>

        <CodeBlock
          code={`<MaskInput
  label="Phone Number"
  mask="(999) 999-9999"
  placeholder="(555) 123-4567"
  onChange={(cleanValue, maskedValue) => console.log(cleanValue, maskedValue)}
/>

<MaskInput
  label="Date"
  mask="99/99/9999"
  placeholder="MM/DD/YYYY"
/>`}
          language="tsx"
        />
      </section>

      {/* Mask Patterns */}
      <section className="jv-section">
        <h2>🔤 Mask Patterns</h2>
        <p>Understanding mask pattern characters</p>

        <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Character</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>9</code></td>
                <td style={{ padding: '12px' }}>Numeric digit (0-9)</td>
                <td style={{ padding: '12px' }}>Phone: (999) 999-9999</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>a</code></td>
                <td style={{ padding: '12px' }}>Alphabetic character (a-z, A-Z)</td>
                <td style={{ padding: '12px' }}>Code: aaa-999</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>*</code></td>
                <td style={{ padding: '12px' }}>Alphanumeric (a-z, A-Z, 0-9)</td>
                <td style={{ padding: '12px' }}>License: ***-****</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}><code>Other</code></td>
                <td style={{ padding: '12px' }}>Literal characters (-, /, etc.)</td>
                <td style={{ padding: '12px' }}>Date: 99/99/9999</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
          <MaskInput
            label="Numeric Only"
            mask="999-999"
            helperText="Digits only: 9"
          />

          <MaskInput
            label="Letters Only"
            mask="aaa-aaa"
            helperText="Letters only: a"
          />

          <MaskInput
            label="Mixed Alphanumeric"
            mask="***-***-***"
            helperText="Letters or digits: *"
          />
        </div>

        <CodeBlock
          code={`// Mask Pattern Characters:
// 9 = digit (0-9)
// a = letter (a-z, A-Z)
// * = alphanumeric (a-z, A-Z, 0-9)
// Other characters = literals

<MaskInput mask="999-999" />        // Digits only
<MaskInput mask="aaa-aaa" />        // Letters only
<MaskInput mask="***-***" />        // Alphanumeric`}
          language="tsx"
        />
      </section>

      {/* Sizes */}
      <section className="jv-section">
        <h2>📏 Sizes</h2>
        <p>Three different sizes available</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
          <MaskInput
            label="Small"
            mask="(999) 999-9999"
            size="small"
          />

          <MaskInput
            label="Medium (default)"
            mask="(999) 999-9999"
            size="medium"
          />

          <MaskInput
            label="Large"
            mask="(999) 999-9999"
            size="large"
          />
        </div>

        <CodeBlock
          code={`<MaskInput mask="..." size="small" />
<MaskInput mask="..." size="medium" />
<MaskInput mask="..." size="large" />`}
          language="tsx"
        />
      </section>

      {/* Error State */}
      <section className="jv-section">
        <h2>❌ Error State</h2>
        <p>Show validation errors</p>

        <div style={{ maxWidth: '400px' }}>
          <MaskInput
            label="Phone Number"
            mask="(999) 999-9999"
            error
            errorMessage="Please enter a valid phone number"
          />
        </div>

        <CodeBlock
          code={`<MaskInput
  label="Phone Number"
  mask="(999) 999-9999"
  error
  errorMessage="Please enter a valid phone number"
/>`}
          language="tsx"
        />
      </section>

      {/* Disabled State */}
      <section className="jv-section">
        <h2>🚫 Disabled State</h2>
        <p>Disable input when needed</p>

        <div style={{ maxWidth: '400px' }}>
          <MaskInput
            label="Disabled Input"
            mask="(999) 999-9999"
            value="(555) 123-4567"
            disabled
          />
        </div>

        <CodeBlock
          code={`<MaskInput
  label="Disabled"
  mask="(999) 999-9999"
  disabled
/>`}
          language="tsx"
        />
      </section>

      {/* Show Mask on Focus */}
      <section className="jv-section">
        <h2>👁️ Show Mask on Focus</h2>
        <p>Display the mask pattern as placeholder when focused</p>

        <div style={{ maxWidth: '400px' }}>
          <MaskInput
            label="With Mask Hint"
            mask="(999) 999-9999"
            showMaskOnFocus
            helperText="Focus to see mask pattern"
          />
        </div>

        <CodeBlock
          code={`<MaskInput
  mask="(999) 999-9999"
  showMaskOnFocus={true}
/>`}
          language="tsx"
        />
      </section>

      {/* Real-World Examples */}
      <section className="jv-section">
        <h2>🌍 Real-World Examples</h2>
        <p>Common use cases with proper masks</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <MaskInput
            label="ZIP Code"
            mask="99999"
            placeholder="12345"
          />

          <MaskInput
            label="ZIP+4"
            mask="99999-9999"
            placeholder="12345-6789"
          />

          <MaskInput
            label="Time (24h)"
            mask="99:99"
            placeholder="HH:MM"
          />

          <MaskInput
            label="Time (12h)"
            mask="99:99 aa"
            placeholder="12:30 PM"
          />

          <MaskInput
            label="IP Address"
            mask="999.999.999.999"
            placeholder="192.168.1.1"
          />

          <MaskInput
            label="MAC Address"
            mask="**:**:**:**:**:**"
            placeholder="00:1A:2B:3C:4D:5E"
          />
        </div>

        <CodeBlock
          code={`// Common masks:
<MaskInput mask="99999" />                    // ZIP
<MaskInput mask="99999-9999" />               // ZIP+4
<MaskInput mask="99:99" />                    // Time
<MaskInput mask="999.999.999.999" />          // IP Address
<MaskInput mask="**:**:**:**:**:**" />        // MAC Address`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section className="jv-section">
        <h2>📚 API Reference</h2>

        <h3>Props</h3>
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
                <td style={{ padding: '12px' }}><code>mask</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Mask pattern (9=digit, a=letter, *=both)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>value</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Controlled value</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>onChange</code></td>
                <td style={{ padding: '12px' }}>function</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Callback (cleanValue, maskedValue)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>size</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>'medium'</td>
                <td style={{ padding: '12px' }}>Size: small, medium, large</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>showMaskOnFocus</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Show mask as placeholder on focus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
