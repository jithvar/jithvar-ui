import React, { useState } from 'react';
import { CheckboxList } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const CheckboxListDemo: React.FC = () => {
  const [selectedFruits, setSelectedFruits] = useState<(string | number)[]>(['apple', 'banana']);
  const [selectedColors, setSelectedColors] = useState<(string | number)[]>([]);

  const fruitOptions = [
    { label: 'Apple 🍎', value: 'apple' },
    { label: 'Banana 🍌', value: 'banana' },
    { label: 'Orange 🍊', value: 'orange' },
    { label: 'Grape 🍇', value: 'grape' },
    { label: 'Strawberry 🍓', value: 'strawberry' },
  ];

  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
  ];

  return (
    <div className="jv-demo-page">
      <h1>📋 Checkbox List</h1>
      <p className="jv-subtitle">
        Multiple checkboxes with select-all functionality and flexible layout
      </p>

      {/* Basic Usage */}
      <section className="jv-section">
        <h2>🎯 Basic Usage</h2>
        <div className="jv-demo-preview">
          <CheckboxList
            label="Select Fruits"
            options={fruitOptions}
            value={selectedFruits}
            onChange={setSelectedFruits}
            selectAll
            color="primary"
          />
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            Selected: {selectedFruits.length > 0 ? selectedFruits.join(', ') : 'None'}
          </div>
        </div>

        <CodeBlock
          code={`const [selected, setSelected] = useState([]);

const options = [
  { label: 'Apple 🍎', value: 'apple' },
  { label: 'Banana 🍌', value: 'banana' },
  { label: 'Orange 🍊', value: 'orange' },
];

<CheckboxList
  label="Select Fruits"
  options={options}
  value={selected}
  onChange={setSelected}
  selectAll
/>`}
          language="tsx"
        />
      </section>

      {/* Horizontal Layout */}
      <section className="jv-section">
        <h2>↔️ Horizontal Layout</h2>
        <div className="jv-demo-preview">
          <CheckboxList
            label="Select Colors"
            options={colorOptions}
            value={selectedColors}
            onChange={setSelectedColors}
            direction="horizontal"
            color="success"
          />
        </div>

        <CodeBlock
          code={`<CheckboxList
  direction="horizontal"
  options={options}
  value={selected}
  onChange={setSelected}
/>`}
          language="tsx"
        />
      </section>

      {/* Switch Variant */}
      <section className="jv-section">
        <h2>🎚️ Switch Variant</h2>
        <div className="jv-demo-preview">
          <CheckboxList
            label="Notification Settings"
            options={[
              { label: 'Email Notifications', value: 'email' },
              { label: 'Push Notifications', value: 'push' },
              { label: 'SMS Notifications', value: 'sms' },
            ]}
            variant="switch"
            color="purple"
            defaultValue={['email']}
          />
        </div>

        <CodeBlock
          code={`<CheckboxList
  label="Notification Settings"
  variant="switch"
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
            <CheckboxList
              label="Primary"
              options={colorOptions.slice(0, 3)}
              color="primary"
              defaultValue={['red']}
            />
            <CheckboxList
              label="Success"
              options={colorOptions.slice(0, 3)}
              color="success"
              defaultValue={['blue']}
            />
            <CheckboxList
              label="Warning"
              options={colorOptions.slice(0, 3)}
              color="warning"
              defaultValue={['green']}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
