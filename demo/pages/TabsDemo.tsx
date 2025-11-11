import React, { useState } from 'react';
import { Tabs } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const TabsDemo: React.FC = () => {
  const [activeKey, setActiveKey] = useState('tab1');

  const basicTabs = [
    { 
      key: 'tab1', 
      label: 'Profile', 
      content: (
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>User Profile</h3>
          <form style={{ maxWidth: '500px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                Full Name
              </label>
              <input 
                type="text" 
                defaultValue="John Doe"
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }} 
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                Email Address
              </label>
              <input 
                type="email" 
                defaultValue="john.doe@example.com"
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }} 
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                Bio
              </label>
              <textarea 
                rows={4}
                defaultValue="I'm a software developer passionate about building great user experiences."
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }} 
              />
            </div>
            <button 
              type="button"
              style={{ 
                padding: '10px 24px', 
                background: '#3b82f6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      )
    },
    { 
      key: 'tab2', 
      label: 'Settings', 
      content: (
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>Account Settings</h3>
          <div style={{ maxWidth: '500px' }}>
            <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 500 }}>Privacy</h4>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ marginRight: '10px', width: '18px', height: '18px' }} />
                <span style={{ fontSize: '14px' }}>Make my profile public</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: '10px', width: '18px', height: '18px' }} />
                <span style={{ fontSize: '14px' }}>Allow search engines to index my profile</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ marginRight: '10px', width: '18px', height: '18px' }} />
                <span style={{ fontSize: '14px' }}>Show online status</span>
              </label>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 500 }}>Language & Region</h4>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                  Language
                </label>
                <select style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                  Time Zone
                </label>
                <select style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  <option>Pacific Time (PT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Central Time (CT)</option>
                  <option>Eastern Time (ET)</option>
                </select>
              </div>
            </div>
            <button 
              type="button"
              style={{ 
                padding: '10px 24px', 
                background: '#3b82f6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              Update Settings
            </button>
          </div>
        </div>
      )
    },
    { 
      key: 'tab3', 
      label: 'Messages', 
      content: (
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>Recent Messages</h3>
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#3b82f6', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: '18px',
                flexShrink: 0
              }}>
                JD
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '15px' }}>Jane Doe</strong>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>2 hours ago</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
                  Hey! Just wanted to follow up on the project status. Let me know when you have time to discuss.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#10b981', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: '18px',
                flexShrink: 0
              }}>
                MS
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '15px' }}>Mike Smith</strong>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>5 hours ago</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
                  The new design looks amazing! I've approved the mockups. Ready to move forward.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#f59e0b', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: '18px',
                flexShrink: 0
              }}>
                SJ
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '15px' }}>Sarah Johnson</strong>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>1 day ago</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
                  Thanks for your help yesterday! The issue is now resolved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
  ];

  const iconTabs = [
    { 
      key: 'home', 
      label: 'Home', 
      icon: '🏠',
      content: (
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Home Dashboard</h3>
          <p style={{ marginBottom: '24px', color: '#6b7280', lineHeight: 1.6 }}>
            Welcome to your dashboard! Here's an overview of your recent activity.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#eff6ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#3b82f6', marginBottom: '4px' }}>24</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Active Projects</div>
            </div>
            <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>156</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Completed Tasks</div>
            </div>
            <div style={{ padding: '20px', background: '#fef3c7', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>12</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Pending Reviews</div>
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'profile', 
      label: 'Profile', 
      icon: '👤',
      content: (
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>User Profile</h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'start', maxWidth: '600px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              fontWeight: 700,
              flexShrink: 0
            }}>
              JD
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600 }}>John Doe</h4>
              <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '14px' }}>Senior Developer</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ 
                  padding: '6px 12px', 
                  background: '#eff6ff', 
                  color: '#3b82f6', 
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500
                }}>
                  React
                </span>
                <span style={{ 
                  padding: '6px 12px', 
                  background: '#eff6ff', 
                  color: '#3b82f6', 
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500
                }}>
                  TypeScript
                </span>
                <span style={{ 
                  padding: '6px 12px', 
                  background: '#eff6ff', 
                  color: '#3b82f6', 
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500
                }}>
                  Node.js
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'settings', 
      label: 'Settings', 
      icon: '⚙️',
      content: (
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Settings</h3>
          <p style={{ marginBottom: '20px', color: '#6b7280', lineHeight: 1.6 }}>
            Configure your application preferences and account settings.
          </p>
          <div style={{ maxWidth: '500px' }}>
            <div style={{ 
              padding: '16px', 
              background: '#f9fafb', 
              borderRadius: '8px',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>Email Notifications</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Receive updates via email</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ 
                  position: 'absolute', 
                  cursor: 'pointer', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  background: '#3b82f6',
                  borderRadius: '24px',
                  transition: '0.4s'
                }}></span>
              </label>
            </div>
            <div style={{ 
              padding: '16px', 
              background: '#f9fafb', 
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>Dark Mode</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>Use dark theme</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ 
                  position: 'absolute', 
                  cursor: 'pointer', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  background: '#d1d5db',
                  borderRadius: '24px',
                  transition: '0.4s'
                }}></span>
              </label>
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'notifications', 
      label: 'Notifications', 
      icon: '🔔',
      content: (
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Notifications</h3>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ 
              padding: '16px', 
              background: '#eff6ff', 
              borderLeft: '4px solid #3b82f6',
              borderRadius: '6px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <strong style={{ fontSize: '14px' }}>New message from Jane</strong>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>5m ago</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                Your project submission has been approved!
              </p>
            </div>
            <div style={{ 
              padding: '16px', 
              background: '#f0fdf4', 
              borderLeft: '4px solid #10b981',
              borderRadius: '6px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <strong style={{ fontSize: '14px' }}>Task completed</strong>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>1h ago</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                Mike marked "Update documentation" as complete.
              </p>
            </div>
            <div style={{ 
              padding: '16px', 
              background: '#fef3c7', 
              borderLeft: '4px solid #f59e0b',
              borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <strong style={{ fontSize: '14px' }}>Review pending</strong>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>3h ago</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                Sarah requested your review on pull request #127.
              </p>
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="jv-demo-page">
      <h1>📑 Tabs</h1>
      <p className="jv-subtitle">
        Organize content into separate views with tabbed navigation
      </p>

      {/* Variants Section */}
      <section className="jv-section">
        <h2>🎨 Variants</h2>
        <p>Different visual styles for tabs</p>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Default</h3>
          <Tabs tabs={basicTabs} variant="default" />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Underline</h3>
          <Tabs tabs={basicTabs} variant="underline" />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Pills</h3>
          <Tabs tabs={basicTabs} variant="pills" />
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Boxed</h3>
          <Tabs tabs={basicTabs} variant="boxed" />
        </div>

        <CodeBlock
          code={`<Tabs tabs={tabs} variant="default" />
<Tabs tabs={tabs} variant="underline" />
<Tabs tabs={tabs} variant="pills" />
<Tabs tabs={tabs} variant="boxed" />`}
          language="tsx"
        />
      </section>

      {/* With Icons */}
      <section className="jv-section">
        <h2>✨ With Icons</h2>
        <p>Add icons to tab labels for better visual recognition</p>

        <Tabs tabs={iconTabs} variant="pills" color="primary" />

        <CodeBlock
          code={`const tabs = [
  { key: 'home', label: 'Home', icon: '🏠', content: <div>Home content</div> },
  { key: 'profile', label: 'Profile', icon: '👤', content: <div>Profile content</div> },
  { key: 'settings', label: 'Settings', icon: '⚙️', content: <div>Settings content</div> },
];

<Tabs tabs={tabs} variant="pills" />`}
          language="tsx"
        />
      </section>

      {/* Colors */}
      <section className="jv-section">
        <h2>🎨 Colors</h2>
        <p>Choose from 6 different color themes</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4>Primary</h4>
            <Tabs tabs={basicTabs} variant="pills" color="primary" />
          </div>
          <div>
            <h4>Success</h4>
            <Tabs tabs={basicTabs} variant="pills" color="success" />
          </div>
          <div>
            <h4>Warning</h4>
            <Tabs tabs={basicTabs} variant="pills" color="warning" />
          </div>
          <div>
            <h4>Danger</h4>
            <Tabs tabs={basicTabs} variant="pills" color="danger" />
          </div>
        </div>

        <CodeBlock
          code={`<Tabs tabs={tabs} variant="pills" color="primary" />
<Tabs tabs={tabs} variant="pills" color="success" />
<Tabs tabs={tabs} variant="pills" color="warning" />
<Tabs tabs={tabs} variant="pills" color="danger" />`}
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
            <Tabs tabs={basicTabs} size="small" variant="pills" />
          </div>
          <div>
            <h4>Medium (default)</h4>
            <Tabs tabs={basicTabs} size="medium" variant="pills" />
          </div>
          <div>
            <h4>Large</h4>
            <Tabs tabs={basicTabs} size="large" variant="pills" />
          </div>
        </div>

        <CodeBlock
          code={`<Tabs tabs={tabs} size="small" />
<Tabs tabs={tabs} size="medium" />
<Tabs tabs={tabs} size="large" />`}
          language="tsx"
        />
      </section>

      {/* Controlled */}
      <section className="jv-section">
        <h2>🎮 Controlled Component</h2>
        <p>Control the active tab externally</p>

        <div style={{ marginBottom: '16px' }}>
          <button onClick={() => setActiveKey('tab1')} style={{ marginRight: '8px' }}>
            Go to Tab 1
          </button>
          <button onClick={() => setActiveKey('tab2')} style={{ marginRight: '8px' }}>
            Go to Tab 2
          </button>
          <button onClick={() => setActiveKey('tab3')}>
            Go to Tab 3
          </button>
        </div>

        <Tabs 
          tabs={basicTabs} 
          activeKey={activeKey}
          onChange={setActiveKey}
          variant="underline"
          color="primary"
        />

        <CodeBlock
          code={`const [activeKey, setActiveKey] = useState('tab1');

<Tabs 
  tabs={tabs}
  activeKey={activeKey}
  onChange={setActiveKey}
/>`}
          language="tsx"
        />
      </section>

      {/* Disabled Tab */}
      <section className="jv-section">
        <h2>🚫 Disabled Tabs</h2>
        <p>Disable specific tabs when needed</p>

        <Tabs
          tabs={[
            { key: 'tab1', label: 'Active Tab', content: <div>This tab is active</div> },
            { key: 'tab2', label: 'Disabled Tab', content: <div>This tab is disabled</div>, disabled: true },
            { key: 'tab3', label: 'Another Active', content: <div>This tab is also active</div> },
          ]}
          variant="pills"
        />

        <CodeBlock
          code={`<Tabs
  tabs={[
    { key: 'tab1', label: 'Active', content: <div>Active</div> },
    { key: 'tab2', label: 'Disabled', content: <div>Disabled</div>, disabled: true },
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
                <td style={{ padding: '12px' }}><code>tabs</code></td>
                <td style={{ padding: '12px' }}>Tab[]</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Array of tab objects</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>variant</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>'default'</td>
                <td style={{ padding: '12px' }}>Visual style: default, underline, pills, boxed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>size</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>'medium'</td>
                <td style={{ padding: '12px' }}>Size: small, medium, large</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>color</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>'primary'</td>
                <td style={{ padding: '12px' }}>Color theme</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>activeKey</code></td>
                <td style={{ padding: '12px' }}>string</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Controlled active tab key</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}><code>onChange</code></td>
                <td style={{ padding: '12px' }}>function</td>
                <td style={{ padding: '12px' }}>-</td>
                <td style={{ padding: '12px' }}>Callback when tab changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
