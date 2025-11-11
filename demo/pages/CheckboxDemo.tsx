import React, { useState } from 'react';
import { Checkbox } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const CheckboxDemo: React.FC = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <div className="jv-demo-page">
      <h1>☑️ Checkbox</h1>
      <p className="jv-subtitle">
        Stylish checkbox component with multiple variants, sizes, and colors
      </p>

      {/* Variants Section */}
      <section className="jv-section">
        <h2>🎨 Variants</h2>
        <p>Different visual styles for checkboxes</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Checkbox label="Default" variant="default" defaultChecked />
            <Checkbox label="Rounded" variant="rounded" defaultChecked />
            <Checkbox label="Square" variant="square" defaultChecked />
            <Checkbox label="Switch" variant="switch" defaultChecked />
          </div>
        </div>

        <CodeBlock
          code={`<Checkbox label="Default" variant="default" />
<Checkbox label="Rounded" variant="rounded" />
<Checkbox label="Square" variant="square" />
<Checkbox label="Switch" variant="switch" />`}
          language="tsx"
        />
      </section>

      {/* Sizes Section */}
      <section className="jv-section">
        <h2>📏 Sizes</h2>
        <p>Three different sizes to fit your design</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Checkbox label="Small" size="small" defaultChecked />
            <Checkbox label="Medium (default)" size="medium" defaultChecked />
            <Checkbox label="Large" size="large" defaultChecked />
          </div>
        </div>

        <CodeBlock
          code={`<Checkbox label="Small" size="small" />
<Checkbox label="Medium" size="medium" />
<Checkbox label="Large" size="large" />`}
          language="tsx"
        />
      </section>

      {/* Colors Section */}
      <section className="jv-section">
        <h2>🌈 Colors</h2>
        <p>Six beautiful color themes</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <Checkbox label="Primary" color="primary" defaultChecked />
            <Checkbox label="Success" color="success" defaultChecked />
            <Checkbox label="Warning" color="warning" defaultChecked />
            <Checkbox label="Danger" color="danger" defaultChecked />
            <Checkbox label="Info" color="info" defaultChecked />
            <Checkbox label="Purple" color="purple" defaultChecked />
          </div>
        </div>

        <CodeBlock
          code={`<Checkbox label="Primary" color="primary" />
<Checkbox label="Success" color="success" />
<Checkbox label="Warning" color="warning" />
<Checkbox label="Danger" color="danger" />
<Checkbox label="Info" color="info" />
<Checkbox label="Purple" color="purple" />`}
          language="tsx"
        />
      </section>

      {/* Indeterminate State */}
      <section className="jv-section">
        <h2>➖ Indeterminate State</h2>
        <p>Useful for "select all" scenarios</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Checkbox label="Indeterminate" indeterminate color="primary" />
            <Checkbox label="Checked" defaultChecked color="primary" />
            <Checkbox label="Unchecked" color="primary" />
          </div>
        </div>

        <CodeBlock
          code={`<Checkbox label="Indeterminate" indeterminate />`}
          language="tsx"
        />
      </section>

      {/* Controlled Example */}
      <section className="jv-section">
        <h2>🎛️ Controlled Component</h2>
        <p>Control checkbox state with React state</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Checkbox
              label={`Controlled Checkbox (${checked1 ? 'Checked' : 'Unchecked'})`}
              checked={checked1}
              onChange={setChecked1}
              color="primary"
            />
            <button
              onClick={() => setChecked1(!checked1)}
              style={{
                padding: '8px 16px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                width: 'fit-content',
              }}
            >
              Toggle via Button
            </button>
          </div>
        </div>

        <CodeBlock
          code={`const [checked, setChecked] = useState(false);

<Checkbox
  label="Controlled Checkbox"
  checked={checked}
  onChange={setChecked}
/>

<button onClick={() => setChecked(!checked)}>
  Toggle
</button>`}
          language="tsx"
        />
      </section>

      {/* Helper Text & Error States */}
      <section className="jv-section">
        <h2>📝 Helper Text & Validation</h2>
        <p>Add helper text or error messages</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Checkbox
              label="Accept Terms & Conditions"
              helperText="You must accept to continue"
              color="primary"
            />
            <Checkbox
              label="Subscribe to Newsletter"
              error
              errorMessage="This field is required"
              color="danger"
            />
          </div>
        </div>

        <CodeBlock
          code={`<Checkbox
  label="Accept Terms"
  helperText="You must accept to continue"
/>

<Checkbox
  label="Subscribe"
  error
  errorMessage="This field is required"
/>`}
          language="tsx"
        />
      </section>

      {/* Disabled State */}
      <section className="jv-section">
        <h2>🚫 Disabled State</h2>
        <p>Disable checkboxes when needed</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Checkbox label="Disabled Unchecked" disabled />
            <Checkbox label="Disabled Checked" disabled defaultChecked />
            <Checkbox label="Disabled Switch" variant="switch" disabled defaultChecked />
          </div>
        </div>

        <CodeBlock
          code={`<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled Checked" disabled defaultChecked />`}
          language="tsx"
        />
      </section>

      {/* Complete Example */}
      <section className="jv-section">
        <h2>🚀 Complete Example</h2>
        <p>Real-world usage with form submission</p>
        
        <div className="jv-demo-preview">
          <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0 }}>Sign Up Form</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Checkbox
                label="I agree to the Terms of Service"
                checked={checked2}
                onChange={setChecked2}
                color="primary"
              />
              <Checkbox
                label="Send me promotional emails"
                checked={checked3}
                onChange={setChecked3}
                color="success"
                helperText="You can unsubscribe anytime"
              />
              <button
                disabled={!checked2}
                style={{
                  padding: '12px 24px',
                  background: checked2 ? '#10b981' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: checked2 ? 'pointer' : 'not-allowed',
                  fontWeight: 600,
                  marginTop: '8px',
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`const [agreedToTerms, setAgreedToTerms] = useState(false);
const [wantsPromotions, setWantsPromotions] = useState(false);

<Checkbox
  label="I agree to the Terms of Service"
  checked={agreedToTerms}
  onChange={setAgreedToTerms}
  color="primary"
/>

<Checkbox
  label="Send me promotional emails"
  checked={wantsPromotions}
  onChange={setWantsPromotions}
  color="success"
  helperText="You can unsubscribe anytime"
/>

<button disabled={!agreedToTerms}>
  Sign Up
</button>`}
          language="tsx"
        />
      </section>
    </div>
  );
};
