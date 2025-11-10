import React, { useState, useEffect } from 'react';
import JAlerts from '../../src/components/JAlerts';
import { CodeBlock } from '../components/CodeBlock';
import { DemoButton } from '../components/DemoButton';
import SkeletonLoader from '../components/SkeletonLoader';

const JAlertsDemo = () => {
  const [lastResult, setLastResult] = useState<string>('');
  const [loadingSections, setLoadingSections] = useState({
    header: true,
    basic: true,
    confirm: true,
    toast: true,
    advanced: true,
  });

  // Simulate progressive loading
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    // Load header first
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, header: false }));
    }, 300));
    
    // Then load sections progressively
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, basic: false }));
    }, 600));
    
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, confirm: false }));
    }, 900));
    
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, toast: false }));
    }, 1200));
    
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, advanced: false }));
    }, 1500));

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  const basicExample = `import { JAlerts } from 'jithvar-ui';

// Simple success message
JAlerts.success('Operation completed successfully!');

// With title and message
JAlerts.success({
  title: 'Success!',
  message: 'Your data has been saved.'
});`;

  const confirmExample = `const result = await JAlerts.confirm({
  title: 'Delete Item?',
  message: 'This will permanently delete the item.',
  confirmButtonText: 'Delete',
  cancelButtonText: 'Cancel'
});

if (result.isConfirmed) {
  // Perform delete action
  console.log('Item deleted');
}`;

  const toastExample = `// Simple toast
JAlerts.toast('Profile updated!');

// Toast with type and position
JAlerts.toast({
  message: 'File uploaded successfully',
  type: 'success',
  toastPosition: 'top-right',
  timer: 3000,
  timerProgressBar: true
});`;

  return (
    <div className="jv-demo-page">
      {loadingSections.header ? (
        <div style={{ marginBottom: '32px' }}>
          <SkeletonLoader type="section" count={1} />
        </div>
      ) : (
        <>
          <h1>🚨 JAlerts</h1>
          <p className="jv-subtitle">
            Beautiful, customizable alert dialogs with smooth animations - Better than SweetAlert2!
          </p>

          {lastResult && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              fontSize: '14px',
            }}>
              <strong>Last Result:</strong> <code>{lastResult}</code>
            </div>
          )}
        </>
      )}

      {/* Basic Usage */}
      {loadingSections.basic ? (
        <SkeletonLoader type="section" count={1} />
      ) : (
        <section className="jv-section">
          <h2>🎯 Basic Usage</h2>
          <p>Simple and intuitive API for common alert types.</p>
          
          <div className="jv-demo-preview">
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <DemoButton
                variant="success"
                onClick={() => {
                  JAlerts.success({
                    title: 'Success!',
                    message: 'Your operation completed successfully.',
                    showIcon: true
                  });
                }}
              >
                ✓ Success Alert
              </DemoButton>
              
              <DemoButton
                variant="error"
                onClick={() => {
                  JAlerts.error({
                    title: 'Error!',
                    message: 'Something went wrong. Please try again.',
                    showIcon: true
                  });
                }}
              >
                ✕ Error Alert
              </DemoButton>
              
              <DemoButton
                variant="warning"
                onClick={() => {
                  JAlerts.warning({
                    title: 'Warning!',
                    message: 'Please review your information carefully.',
                    showIcon: true
                  });
                }}
              >
                ⚠ Warning Alert
              </DemoButton>
              
              <DemoButton
                variant="info"
                onClick={() => {
                  JAlerts.info({
                    title: 'Information',
                    message: 'Here is some useful information for you.',
                    showIcon: true
                  });
                }}
              >
                ⓘ Info Alert
              </DemoButton>
            </div>
          </div>

          <CodeBlock code={basicExample} language="typescript" />
        </section>
      )}

      {/* Confirmation */}
      {loadingSections.confirm ? (
        <SkeletonLoader type="section" count={1} />
      ) : (
        <section className="jv-section">
          <h2>✅ Confirmation Dialog</h2>
          <p>Ask for user confirmation before performing actions. Warning type shows Yes/No by default.</p>
          
          <div className="jv-demo-preview">
            <DemoButton
              variant="purple"
              onClick={async () => {
                const confirmResult = await JAlerts.confirm({
                  title: 'Delete Item?',
                  message: 'This action cannot be undone. Are you sure?',
                  confirmButtonText: 'Yes, Delete',
                  cancelButtonText: 'Cancel',
                  showIcon: true
                });
                
                setLastResult(confirmResult.isConfirmed ? 'Confirmed ✓' : 'Cancelled ✕');
              }}
            >
              🗑️ Show Confirmation
            </DemoButton>
          </div>

          <CodeBlock code={confirmExample} language="typescript" />
        </section>
      )}

      {/* Toast Notifications */}
      {loadingSections.toast ? (
        <SkeletonLoader type="section" count={1} />
      ) : (
        <section className="jv-section">
        <h2>🍞 Toast Notifications</h2>
        <p>Lightweight notifications that appear in corners.</p>
        
        <div className="jv-demo-preview">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <DemoButton
              variant="success"
              onClick={() => {
                JAlerts.toast({
                  message: 'Profile updated successfully!',
                  type: 'success',
                  toastPosition: 'top-right',
                  timer: 3000,
                  timerProgressBar: true
                });
              }}
            >
              📍 Top Right
            </DemoButton>
            
            <DemoButton
              variant="info"
              onClick={() => {
                JAlerts.toast({
                  message: 'Processing your request...',
                  type: 'info',
                  toastPosition: 'top-left',
                  timer: 3000
                });
              }}
            >
              📍 Top Left
            </DemoButton>
            
            <DemoButton
              variant="warning"
              onClick={() => {
                JAlerts.toast({
                  message: 'Please check your input',
                  type: 'warning',
                  toastPosition: 'bottom-right',
                  timer: 3000
                });
              }}
            >
              📍 Bottom Right
            </DemoButton>
          </div>
        </div>

          <CodeBlock code={toastExample} language="typescript" />
        </section>
      )}

      {/* Input Prompts & Advanced */}
      {loadingSections.advanced ? (
        <SkeletonLoader type="section" count={2} />
      ) : (
        <>
          <section className="jv-section">
            <h2>📝 Input Prompts</h2>
            <p>Get user input with various input types and validation.</p>
            
            <div className="jv-demo-preview">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <DemoButton
                  variant="primary"
                  onClick={async () => {
                    const promptResult = await JAlerts.prompt({
                      title: 'Enter your name',
                      input: 'text',
                      inputPlaceholder: 'John Doe',
                      inputValidator: (value) => {
                        if (!value) return 'Name is required!';
                        if (value.length < 3) return 'Name must be at least 3 characters';
                        return null;
                      }
                    });
                    
                    if (promptResult.isConfirmed) {
                      setLastResult(`Name: ${promptResult.value}`);
                    }
                  }}
                >
                  📝 Text Input
                </DemoButton>
                
                <DemoButton
                  variant="primary"
                  onClick={async () => {
                    const promptResult = await JAlerts.prompt({
                      title: 'Enter your email',
                      input: 'email',
                      inputPlaceholder: 'email@example.com'
                    });
                    
                    if (promptResult.isConfirmed) {
                      setLastResult(`Email: ${promptResult.value}`);
                    }
                  }}
                >
                  📧 Email Input
                </DemoButton>
              </div>
            </div>
          </section>

          {/* Auto-close */}
          <section className="jv-section">
            <h2>⏱️ Auto-Close Timer</h2>
            <p>Alerts can automatically close after a specified time.</p>
            
            <div className="jv-demo-preview">
              <DemoButton
                variant="info"
                onClick={() => {
                  JAlerts.info({
                    title: 'Auto Close',
                    message: 'This alert will close in 5 seconds',
                    timer: 5000,
                    timerProgressBar: true
                  });
                }}
              >
                ⏱️ Show Timer Alert
              </DemoButton>
            </div>
          </section>

          {/* Custom Buttons */}
          <section className="jv-section">
            <h2>🎨 Custom Buttons</h2>
            <p>Create alerts with custom buttons and actions.</p>
            
            <div className="jv-demo-preview">
              <DemoButton
                variant="primary"
                onClick={() => {
                  JAlerts.custom({
                    title: 'Choose an Option',
                    message: 'Select one of the options below',
                    buttons: [
                      {
                        text: 'Option 1',
                        variant: 'primary',
                        onClick: () => setLastResult('Option 1 selected')
                      },
                      {
                        text: 'Option 2',
                        variant: 'success',
                        onClick: () => setLastResult('Option 2 selected')
                      },
                      {
                        text: 'Cancel',
                        variant: 'secondary',
                        onClick: () => setLastResult('Cancelled')
                      }
                    ]
                  });
                }}
              >
                🎯 Custom Buttons
              </DemoButton>
            </div>
          </section>

          {/* API Reference */}
          <section className="jv-section">
            <h2>📚 API Reference</h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Method</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Description</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}><code>JAlerts.success()</code></td>
                    <td style={{ padding: '12px' }}>Show success alert</td>
                    <td style={{ padding: '12px' }}><code>JAlerts.success('Done!')</code></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}><code>JAlerts.error()</code></td>
                    <td style={{ padding: '12px' }}>Show error alert</td>
                    <td style={{ padding: '12px' }}><code>JAlerts.error('Failed!')</code></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}><code>JAlerts.warning()</code></td>
                    <td style={{ padding: '12px' }}>Show warning (Yes/No)</td>
                    <td style={{ padding: '12px' }}><code>await JAlerts.warning('Sure?')</code></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}><code>JAlerts.info()</code></td>
                    <td style={{ padding: '12px' }}>Show info alert</td>
                    <td style={{ padding: '12px' }}><code>JAlerts.info('Note...')</code></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}><code>JAlerts.confirm()</code></td>
                    <td style={{ padding: '12px' }}>Show confirmation dialog</td>
                    <td style={{ padding: '12px' }}><code>await JAlerts.confirm({'{...}'})</code></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}><code>JAlerts.toast()</code></td>
                    <td style={{ padding: '12px' }}>Show toast notification</td>
                    <td style={{ padding: '12px' }}><code>JAlerts.toast('Saved!')</code></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}><code>JAlerts.prompt()</code></td>
                    <td style={{ padding: '12px' }}>Show input prompt</td>
                    <td style={{ padding: '12px' }}><code>await JAlerts.prompt({'{...}'})</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default JAlertsDemo;
