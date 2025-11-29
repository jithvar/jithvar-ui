import React, { useState, useEffect } from 'react';
import { JAlerts } from '../../src';
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

          {/* Custom Icons */}
          <section className="jv-section">
            <h2>🎭 Custom Icons</h2>
            <p>Pass your own custom icons/React elements instead of default icons.</p>
            
            <div className="jv-demo-preview">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <DemoButton
                  variant="primary"
                  onClick={() => {
                    JAlerts.success({
                      title: 'Custom Icon',
                      message: 'This alert uses a custom icon',
                      customIcon: (
                        <div style={{
                          width: '80px',
                          height: '80px',
                          margin: '0 auto 24px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 40px rgba(236, 72, 153, 0.3)',
                          animation: 'bounceIn 0.6s ease-out',
                          fontSize: '40px'
                        }}>
                          🎉
                        </div>
                      ),
                      showIcon: true
                    });
                  }}
                >
                  🎉 Emoji Icon
                </DemoButton>

                <DemoButton
                  variant="success"
                  onClick={() => {
                    JAlerts.info({
                      title: 'Rocket Icon',
                      message: 'Launch your project with custom icons',
                      customIcon: (
                        <div style={{
                          width: '80px',
                          height: '80px',
                          margin: '0 auto 24px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 40px rgba(6, 182, 212, 0.3)',
                          animation: 'bounceIn 0.6s ease-out',
                          fontSize: '40px'
                        }}>
                          🚀
                        </div>
                      ),
                      showIcon: true
                    });
                  }}
                >
                  🚀 Rocket Icon
                </DemoButton>

                <DemoButton
                  variant="info"
                  onClick={async () => {
                    const result = await JAlerts.confirm({
                      title: 'Custom Star Icon',
                      message: 'Do you like this custom icon?',
                      confirmButtonText: 'Yes!',
                      cancelButtonText: 'No',
                      customIcon: (
                        <div style={{
                          width: '80px',
                          height: '80px',
                          margin: '0 auto 24px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)',
                          animation: 'bounceIn 0.6s ease-out',
                          fontSize: '40px'
                        }}>
                          ⭐
                        </div>
                      ),
                      showIcon: true,
                      confirmButtonColor: '#fbbf24'
                    });
                    
                    setLastResult(result.isConfirmed ? 'Love it! ⭐' : 'Maybe next time');
                  }}
                >
                  ⭐ Star Icon
                </DemoButton>
              </div>
            </div>

            <CodeBlock 
              code={`// Pass custom icons as React elements
JAlerts.success({
  title: 'Custom Icon',
  message: 'This alert uses a custom icon',
  customIcon: (
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '40px'
    }}>
      🎉
    </div>
  ),
  showIcon: true
});`} 
              language="typescript" 
            />
          </section>

          {/* Custom Button Colors */}
          <section className="jv-section">
            <h2>🎨 Custom Button Colors</h2>
            <p>Apply custom colors to confirm and cancel buttons, with icon auto-colorization.</p>
            
            <div className="jv-demo-preview">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <DemoButton
                  variant="primary"
                  onClick={async () => {
                    const confirmResult = await JAlerts.confirm({
                      title: 'Delete Item?',
                      message: 'This action cannot be undone. Are you sure?',
                      confirmButtonText: 'Yes, Delete',
                      cancelButtonText: 'Cancel',
                      confirmButtonColor: '#ef4444',
                      cancelButtonColor: '#6b7280',
                      showIcon: true
                    });
                    
                    setLastResult(confirmResult.isConfirmed ? 'Deleted ✓' : 'Cancelled ✕');
                  }}
                >
                  🗑️ Custom Red Delete
                </DemoButton>

                <DemoButton
                  variant="success"
                  onClick={async () => {
                    const confirmResult = await JAlerts.confirm({
                      title: 'Confirm Purchase?',
                      message: 'Proceed with the payment?',
                      confirmButtonText: 'Pay Now',
                      cancelButtonText: 'Cancel',
                      confirmButtonColor: '#22c55e',
                      cancelButtonColor: '#94a3b8',
                      showIcon: true
                    });
                    
                    setLastResult(confirmResult.isConfirmed ? 'Payment Confirmed ✓' : 'Cancelled ✕');
                  }}
                >
                  💳 Green Payment
                </DemoButton>

                <DemoButton
                  variant="info"
                  onClick={async () => {
                    const confirmResult = await JAlerts.confirm({
                      title: 'Submit Form?',
                      message: 'Review all information before submitting.',
                      confirmButtonText: 'Submit',
                      cancelButtonText: 'Review Again',
                      confirmButtonColor: '#3b82f6',
                      cancelButtonColor: '#f3f4f6',
                      showIcon: true
                    });
                    
                    setLastResult(confirmResult.isConfirmed ? 'Submitted ✓' : 'Reviewing ✕');
                  }}
                >
                  📝 Blue Submit
                </DemoButton>

                <DemoButton
                  variant="warning"
                  onClick={async () => {
                    const confirmResult = await JAlerts.confirm({
                      title: 'Download File?',
                      message: 'This file will be downloaded to your device.',
                      confirmButtonText: 'Download',
                      cancelButtonText: 'Cancel',
                      confirmButtonColor: '#8b5cf6',
                      cancelButtonColor: '#e5e7eb',
                      showIcon: true
                    });
                    
                    setLastResult(confirmResult.isConfirmed ? 'Downloading ✓' : 'Cancelled ✕');
                  }}
                >
                  ⬇️ Purple Download
                </DemoButton>
              </div>
            </div>

            <CodeBlock 
              code={`// Custom button colors with auto-tinted icons
const result = await JAlerts.confirm({
  title: 'Delete Item?',
  message: 'This action cannot be undone.',
  confirmButtonText: 'Delete',
  cancelButtonText: 'Cancel',
  confirmButtonColor: '#ef4444',  // Red button
  cancelButtonColor: '#6b7280',   // Gray button
  showIcon: true                   // Icon auto-tints to confirm button color
});`} 
              language="typescript" 
            />
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
