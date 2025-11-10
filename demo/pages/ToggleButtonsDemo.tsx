import React, { useState } from 'react';
import { ToggleButtons } from '../../src/components/ToggleButtons';
import { CodeBlock } from '../components/CodeBlock';

export const ToggleButtonsDemo: React.FC = () => {
  const [alignment, setAlignment] = useState<string | number>('center');
  const [formats, setFormats] = useState<string | number | (string | number)[]>(['bold']);

  return (
    <div className="jv-demo-page">
      <h1>🎚️ Toggle Buttons</h1>
      <p className="jv-subtitle">
        Segmented control for single or multiple selection with modern design
      </p>

      {/* Single Selection */}
      <section className="jv-section">
        <h2>🎯 Single Selection</h2>
        <div className="jv-demo-preview">
          <ToggleButtons
            label="Text Alignment"
            options={[
              { label: 'Left', value: 'left', icon: '⬅️' },
              { label: 'Center', value: 'center', icon: '↕️' },
              { label: 'Right', value: 'right', icon: '➡️' },
              { label: 'Justify', value: 'justify', icon: '↔️' },
            ]}
            value={alignment}
            onChange={setAlignment}
            color="primary"
          />
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            Current alignment: {alignment}
          </div>
        </div>

        <CodeBlock
          code={`const [alignment, setAlignment] = useState('center');

<ToggleButtons
  label="Text Alignment"
  options={[
    { label: 'Left', value: 'left', icon: '⬅️' },
    { label: 'Center', value: 'center', icon: '↕️' },
    { label: 'Right', value: 'right', icon: '➡️' },
  ]}
  value={alignment}
  onChange={setAlignment}
/>`}
          language="tsx"
        />
      </section>

      {/* Multiple Selection */}
      <section className="jv-section">
        <h2>✅ Multiple Selection</h2>
        <div className="jv-demo-preview">
          <ToggleButtons
            label="Text Formatting"
            options={[
              { label: 'Bold', value: 'bold', icon: '𝐁' },
              { label: 'Italic', value: 'italic', icon: '𝐼' },
              { label: 'Underline', value: 'underline', icon: 'U̲' },
              { label: 'Strike', value: 'strike', icon: 'S̶' },
            ]}
            value={formats}
            onChange={setFormats}
            multiple
            color="success"
          />
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            Active formats: {Array.isArray(formats) ? formats.join(', ') : formats}
          </div>
        </div>

        <CodeBlock
          code={`const [formats, setFormats] = useState(['bold']);

<ToggleButtons
  multiple
  options={options}
  value={formats}
  onChange={setFormats}
/>`}
          language="tsx"
        />
      </section>

      {/* Sizes */}
      <section className="jv-section">
        <h2>📏 Sizes</h2>
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <ToggleButtons
              label="Small"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ]}
              size="small"
              color="primary"
              defaultValue="1"
            />
            <ToggleButtons
              label="Medium (default)"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ]}
              size="medium"
              color="success"
              defaultValue="2"
            />
            <ToggleButtons
              label="Large"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ]}
              size="large"
              color="warning"
              defaultValue="3"
            />
          </div>
        </div>
      </section>

      {/* Full Width */}
      <section className="jv-section">
        <h2>↔️ Full Width</h2>
        <div className="jv-demo-preview">
          <ToggleButtons
            label="View Mode"
            options={[
              { label: 'List', value: 'list', icon: '☰' },
              { label: 'Grid', value: 'grid', icon: '▦' },
              { label: 'Table', value: 'table', icon: '▤' },
            ]}
            fullWidth
            color="purple"
            defaultValue="grid"
          />
        </div>

        <CodeBlock
          code={`<ToggleButtons
  fullWidth
  options={options}
/>`}
          language="tsx"
        />
      </section>

      {/* Color Variants */}
      <section className="jv-section">
        <h2>🌈 Color Variants</h2>
        <div className="jv-demo-preview">
          <div style={{ display: 'grid', gap: '16px' }}>
            <ToggleButtons
              label="Primary"
              options={[
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3' },
              ]}
              color="primary"
              defaultValue="1"
            />
            <ToggleButtons
              label="Success"
              options={[
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3' },
              ]}
              color="success"
              defaultValue="2"
            />
            <ToggleButtons
              label="Warning"
              options={[
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3' },
              ]}
              color="warning"
              defaultValue="3"
            />
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="jv-section">
        <h2>🎮 Dashboard Controls</h2>
        <div className="jv-demo-preview">
          <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <ToggleButtons
                label="Time Period"
                options={[
                  { label: 'Day', value: 'day' },
                  { label: 'Week', value: 'week' },
                  { label: 'Month', value: 'month' },
                  { label: 'Year', value: 'year' },
                ]}
                fullWidth
                color="primary"
                defaultValue="week"
              />
              <ToggleButtons
                label="Chart Type"
                options={[
                  { label: 'Line', value: 'line', icon: '📈' },
                  { label: 'Bar', value: 'bar', icon: '📊' },
                  { label: 'Pie', value: 'pie', icon: '🥧' },
                  { label: 'Area', value: 'area', icon: '📉' },
                ]}
                fullWidth
                color="info"
                defaultValue="bar"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
