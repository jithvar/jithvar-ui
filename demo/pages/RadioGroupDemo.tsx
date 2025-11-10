import React, { useState } from 'react';
import { RadioGroup } from '../../src/components/RadioGroup';
import { CodeBlock } from '../components/CodeBlock';

export const RadioGroupDemo: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | number>('medium');
  const [selectedPayment, setSelectedPayment] = useState<string | number>('credit');

  return (
    <div className="jv-demo-page">
      <h1>📻 Radio Group</h1>
      <p className="jv-subtitle">
        Group of radio buttons for single selection with smooth animations
      </p>

      {/* Basic Usage */}
      <section className="jv-section">
        <h2>🎯 Basic Usage</h2>
        <div className="jv-demo-preview">
          <RadioGroup
            name="size"
            label="Select Size"
            options={[
              { label: 'Small', value: 'small' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' },
              { label: 'Extra Large', value: 'xl' },
            ]}
            value={selectedSize}
            onChange={setSelectedSize}
            color="primary"
          />
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            Selected: {selectedSize}
          </div>
        </div>

        <CodeBlock
          code={`const [selected, setSelected] = useState('medium');

<RadioGroup
  name="size"
  label="Select Size"
  options={[
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ]}
  value={selected}
  onChange={setSelected}
/>`}
          language="tsx"
        />
      </section>

      {/* Horizontal Layout */}
      <section className="jv-section">
        <h2>↔️ Horizontal Layout</h2>
        <div className="jv-demo-preview">
          <RadioGroup
            name="plan"
            label="Select Plan"
            options={[
              { label: 'Basic $9/mo', value: 'basic' },
              { label: 'Pro $29/mo', value: 'pro' },
              { label: 'Enterprise $99/mo', value: 'enterprise' },
            ]}
            direction="horizontal"
            color="success"
            defaultValue="pro"
          />
        </div>

        <CodeBlock
          code={`<RadioGroup
  direction="horizontal"
  options={options}
/>`}
          language="tsx"
        />
      </section>

      {/* Different Colors */}
      <section className="jv-section">
        <h2>🌈 Color Variants</h2>
        <div className="jv-demo-preview">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <RadioGroup
              name="color1"
              label="Primary"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
              color="primary"
              defaultValue="1"
            />
            <RadioGroup
              name="color2"
              label="Success"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
              color="success"
              defaultValue="1"
            />
            <RadioGroup
              name="color3"
              label="Warning"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
              color="warning"
              defaultValue="1"
            />
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="jv-section">
        <h2>💳 Payment Method Selection</h2>
        <div className="jv-demo-preview">
          <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '12px', maxWidth: '500px' }}>
            <RadioGroup
              name="payment"
              label="Payment Method"
              helperText="Choose your preferred payment method"
              options={[
                { label: '💳 Credit Card', value: 'credit' },
                { label: '🏦 Bank Transfer', value: 'bank' },
                { label: '💰 PayPal', value: 'paypal' },
                { label: '📱 Apple Pay', value: 'apple' },
              ]}
              value={selectedPayment}
              onChange={setSelectedPayment}
              color="purple"
            />
            <button
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '12px',
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Proceed with {selectedPayment}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
