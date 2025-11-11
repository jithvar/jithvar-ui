import React, { useState } from 'react';
import { Collapse } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const CollapseDemo: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

  const basicPanels = [
    {
      key: '1',
      header: 'What is Jithvar UI?',
      content: 'Jithvar UI is a modern React component library built with TypeScript. It provides a comprehensive set of customizable components for building beautiful user interfaces.',
    },
    {
      key: '2',
      header: 'How do I install it?',
      content: 'You can install Jithvar UI using npm or yarn: npm install jithvar-ui or yarn add jithvar-ui',
    },
    {
      key: '3',
      header: 'Is it free to use?',
      content: 'Yes! Jithvar UI is completely free and open-source. You can use it in personal and commercial projects.',
    },
  ];

  const iconPanels = [
    {
      key: '1',
      header: 'User Profile',
      icon: '👤',
      content: 'Manage your profile information, update your avatar, and customize your settings.',
    },
    {
      key: '2',
      header: 'Security Settings',
      icon: '🔒',
      content: 'Configure two-factor authentication, change your password, and manage security preferences.',
    },
    {
      key: '3',
      header: 'Notifications',
      icon: '🔔',
      content: 'Control how and when you receive notifications from the application.',
    },
  ];

  return (
    <div className="jv-demo-page">
      <h1>📂 Collapse / Accordion</h1>
      <p className="jv-subtitle">
        Expandable panels for organizing content in limited space
      </p>

      {/* Basic Usage */}
      <section className="jv-section">
        <h2>📝 Basic Usage</h2>
        <p>Simple collapsible panels with multiple items open</p>

        <Collapse panels={basicPanels} defaultActiveKeys={['1']} />

        <CodeBlock
          code={`const panels = [
  {
    key: '1',
    header: 'Panel 1',
    content: 'Content for panel 1...',
  },
  {
    key: '2',
    header: 'Panel 2',
    content: 'Content for panel 2...',
  },
];

<Collapse panels={panels} defaultActiveKeys={['1']} />`}
          language="tsx"
        />
      </section>

      {/* Accordion Mode */}
      <section className="jv-section">
        <h2>🎵 Accordion Mode</h2>
        <p>Only one panel can be open at a time</p>

        <Collapse panels={basicPanels} accordion defaultActiveKeys={['1']} />

        <CodeBlock
          code={`<Collapse panels={panels} accordion defaultActiveKeys={['1']} />`}
          language="tsx"
        />
      </section>

      {/* With Icons */}
      <section className="jv-section">
        <h2>✨ With Icons</h2>
        <p>Add icons to panel headers for better visual hierarchy</p>

        <Collapse panels={iconPanels} defaultActiveKeys={['1']} bordered />

        <CodeBlock
          code={`const panels = [
  {
    key: '1',
    header: 'User Profile',
    icon: '👤',
    content: 'Profile content...',
  },
  {
    key: '2',
    header: 'Security',
    icon: '🔒',
    content: 'Security content...',
  },
];

<Collapse panels={panels} />`}
          language="tsx"
        />
      </section>

      {/* Ghost Mode */}
      <section className="jv-section">
        <h2>👻 Ghost Mode</h2>
        <p>Minimal styling without borders and background</p>

        <Collapse panels={basicPanels} ghost defaultActiveKeys={['1']} />

        <CodeBlock
          code={`<Collapse panels={panels} ghost />`}
          language="tsx"
        />
      </section>

      {/* Sizes */}
      <section className="jv-section">
        <h2>📏 Sizes</h2>
        <p>Three different sizes available</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4>Small</h4>
            <Collapse panels={basicPanels} size="small" defaultActiveKeys={['1']} />
          </div>
          <div>
            <h4>Medium (default)</h4>
            <Collapse panels={basicPanels} size="medium" defaultActiveKeys={['1']} />
          </div>
          <div>
            <h4>Large</h4>
            <Collapse panels={basicPanels} size="large" defaultActiveKeys={['1']} />
          </div>
        </div>

        <CodeBlock
          code={`<Collapse panels={panels} size="small" />
<Collapse panels={panels} size="medium" />
<Collapse panels={panels} size="large" />`}
          language="tsx"
        />
      </section>

      {/* Expand Icon Position */}
      <section className="jv-section">
        <h2>↔️ Icon Position</h2>
        <p>Place the expand icon on left or right</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4>Left (default)</h4>
            <Collapse panels={basicPanels} expandIconPosition="left" defaultActiveKeys={['1']} />
          </div>
          <div>
            <h4>Right</h4>
            <Collapse panels={basicPanels} expandIconPosition="right" defaultActiveKeys={['1']} />
          </div>
        </div>

        <CodeBlock
          code={`<Collapse panels={panels} expandIconPosition="left" />
<Collapse panels={panels} expandIconPosition="right" />`}
          language="tsx"
        />
      </section>

      {/* Controlled Component */}
      <section className="jv-section">
        <h2>🎮 Controlled Component</h2>
        <p>Control the expanded panels externally</p>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          <button onClick={() => setActiveKeys(['1'])}>Open Panel 1</button>
          <button onClick={() => setActiveKeys(['2'])}>Open Panel 2</button>
          <button onClick={() => setActiveKeys(['1', '2', '3'])}>Open All</button>
          <button onClick={() => setActiveKeys([])}>Close All</button>
        </div>

        <Collapse 
          panels={basicPanels}
          activeKeys={activeKeys}
          onChange={setActiveKeys}
        />

        <CodeBlock
          code={`const [activeKeys, setActiveKeys] = useState(['1']);

<Collapse 
  panels={panels}
  activeKeys={activeKeys}
  onChange={setActiveKeys}
/>`}
          language="tsx"
        />
      </section>

      {/* Disabled Panel */}
      <section className="jv-section">
        <h2>🚫 Disabled Panels</h2>
        <p>Disable specific panels when needed</p>

        <Collapse
          panels={[
            { key: '1', header: 'Active Panel', content: 'This panel is active' },
            { key: '2', header: 'Disabled Panel', content: 'This panel is disabled', disabled: true },
            { key: '3', header: 'Another Active Panel', content: 'This panel is also active' },
          ]}
          defaultActiveKeys={['1']}
        />

        <CodeBlock
          code={`<Collapse
  panels={[
    { key: '1', header: 'Active', content: 'Active content' },
    { key: '2', header: 'Disabled', content: 'Disabled', disabled: true },
  ]}
/>`}
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
                <td style={{ padding: '12px' }}><code>panels</code></td>
                <td style={{ padding: '12px' }}>CollapsePanel[]</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Array of panel objects</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>accordion</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>false</td>
                <td style={{ padding: '12px' }}>Only one panel can be open</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>bordered</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>true</td>
                <td style={{ padding: '12px' }}>Show borders around panels</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>ghost</code></td>
                <td style={{ padding: '12px' }}>boolean</td>
                <td style={{ padding: '12px' }}>false</td>
                <td style={{ padding: '12px' }}>Minimal styling mode</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>size</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>'medium'</td>
                <td style={{ padding: '12px' }}>Size: small, medium, large</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>expandIconPosition</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>'left'</td>
                <td style={{ padding: '12px' }}>Icon position: left, right</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
