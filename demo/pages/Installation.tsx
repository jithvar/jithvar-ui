import React from 'react';
import { CodeBlock } from '../components/CodeBlock';

export const Installation: React.FC = () => {
  return (
    <div className="jv-demo-page">
      <h1>📦 Installation & Setup</h1>
      <p className="jv-subtitle">Complete guide to installing Jithvar UI in your React or Next.js project</p>

      {/* Version Compatibility */}
      <section className="jv-section">
        <h2>✅ Version Compatibility</h2>
        <div style={{ 
          background: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)', 
          padding: '24px', 
          borderRadius: '12px',
          border: '2px solid #86efac',
          marginBottom: '24px'
        }}>
          <h3 style={{ marginTop: 0, color: '#065f46' }}>Supported Versions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <strong style={{ color: '#047857' }}>⚛️ React</strong>
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#065f46' }}>
                ✓ React 17.0.0+<br />
                ✓ React 18.0.0+<br />
                ✓ React 19.0.0+ <span style={{ background: '#86efac', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>NEW</span>
              </div>
            </div>
            <div>
              <strong style={{ color: '#047857' }}>▲ Next.js</strong>
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#065f46' }}>
                ✓ Next.js 13.0.0+<br />
                ✓ Next.js 14.0.0+<br />
                ✓ Next.js 15.0.0+<br />
              </div>
            </div>
            <div>
              <strong style={{ color: '#047857' }}>📘 TypeScript</strong>
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#065f46' }}>
                ✓ TypeScript 4.5+<br />
                ✓ TypeScript 5.0+<br />
                ✓ Full type definitions included
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Installation */}
      <section className="jv-section">
        <h2>1️⃣ Install Package</h2>
        <p>Install the complete Jithvar UI library with all components:</p>
        
        <h3>📦 npm</h3>
        <CodeBlock language="bash" code="npm install jithvar-ui" />
        
        <h3>📦 yarn</h3>
        <CodeBlock language="bash" code="yarn add jithvar-ui" />
        
        <h3>📦 pnpm</h3>
        <CodeBlock language="bash" code="pnpm add jithvar-ui" />

        <div style={{ 
          background: '#dbeafe', 
          padding: '16px', 
          borderRadius: '8px',
          border: '2px solid #60a5fa',
          marginTop: '16px'
        }}>
          <strong>💡 Pro Tip:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            The library is fully tree-shakeable. Import only what you need, and modern bundlers (Webpack, Vite, Rollup) 
            will automatically exclude unused components from your final bundle. No manual configuration required!
          </p>
        </div>

        <div style={{ 
          background: '#fef3c7', 
          padding: '16px', 
          borderRadius: '8px',
          border: '2px solid #fbbf24',
          marginTop: '16px'
        }}>
          <strong>⚠️ Peer Dependencies:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            Jithvar UI requires React 17+, 18+, or 19+. Make sure you have React installed:
          </p>
          <CodeBlock 
            language="bash" 
            code="npm install react@^18.0.0 react-dom@^18.0.0" 
          />
        </div>
      </section>

      {/* Tree Shaking / Selective Imports */}
      <section className="jv-section">
        <h2>2️⃣ Tree-Shaking & Selective Imports</h2>
        <p>Jithvar UI is fully tree-shakeable. Import only the components you need to minimize bundle size:</p>

        <h3>✅ Import Only What You Need (Recommended)</h3>
        <CodeBlock
          code={`// ✅ Tree-shakeable: Only imports JTable and its dependencies
import { JTable } from 'jithvar-ui';

// ✅ Tree-shakeable: Only imports DatePicker and SearchableSelect
import { DatePicker, SearchableSelect } from 'jithvar-ui';

// ✅ Tree-shakeable: Import specific charts
import { BarChart, LineChart, PieChart } from 'jithvar-ui';

// ✅ Tree-shakeable: Import alerts
import { JAlerts } from 'jithvar-ui';`}
          language="tsx"
        />

        <div style={{ 
          background: '#dcfce7', 
          padding: '16px', 
          borderRadius: '8px',
          border: '2px solid #86efac',
          marginTop: '16px'
        }}>
          <strong>✨ How Tree-Shaking Works:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            When you build your project, bundlers like Webpack, Vite, or Rollup automatically analyze your imports 
            and only include the components you actually use. For example:
          </p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>Import <code>JAlerts</code> only → Bundle: ~25 KB</li>
            <li>Import <code>DatePicker</code> only → Bundle: ~30 KB</li>
            <li>Import <code>BarChart</code> only → Bundle: ~10 KB</li>
            <li>Import <code>JTable</code> → Bundle: ~50 KB (includes dependencies)</li>
            <li>Import all 34 components → Bundle: ~350 KB (full library)</li>
          </ul>
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#065f46' }}>
            <strong>📦 No configuration needed!</strong> Tree-shaking works automatically with all modern bundlers.
          </p>
        </div>

        <h3>📊 Component Size Reference</h3>
        <div style={{ 
          background: '#f0f9ff', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '16px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #bae6fd' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Component Category</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Approx. Size</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Example Components</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e0f2fe' }}>
                <td style={{ padding: '12px' }}>Alerts & Feedback</td>
                <td style={{ padding: '12px' }}>~25 KB</td>
                <td style={{ padding: '12px' }}>JAlerts (all methods)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0f2fe' }}>
                <td style={{ padding: '12px' }}>Single Chart</td>
                <td style={{ padding: '12px' }}>~8-12 KB</td>
                <td style={{ padding: '12px' }}>BarChart, PieChart, LineChart</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0f2fe' }}>
                <td style={{ padding: '12px' }}>Date Components</td>
                <td style={{ padding: '12px' }}>~15 KB each</td>
                <td style={{ padding: '12px' }}>DatePicker, DateRangePicker</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0f2fe' }}>
                <td style={{ padding: '12px' }}>Form Inputs</td>
                <td style={{ padding: '12px' }}>~5-15 KB</td>
                <td style={{ padding: '12px' }}>SearchableSelect, RangeSlider</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0f2fe' }}>
                <td style={{ padding: '12px' }}>JTable</td>
                <td style={{ padding: '12px' }}>~50 KB</td>
                <td style={{ padding: '12px' }}>Full data table with dependencies</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>All Components</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>~350 KB</td>
                <td style={{ padding: '12px' }}>Complete library (34 components)</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
            * Sizes are gzipped and include all dependencies. Actual sizes may vary based on your bundler configuration.
          </p>
        </div>
      </section>

      {/* React Setup */}
      <section className="jv-section">
        <h2>3️⃣ React (CRA, Vite) Setup</h2>
        
        <h3>🔵 Create React App (React 17/18)</h3>
        <CodeBlock
          code={`// src/App.tsx
import React, { useState } from 'react';
import { DatePicker, BarChart, JAlerts } from 'jithvar-ui';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSuccess = () => {
    JAlerts.success({
      title: 'Success!',
      message: 'Date selected successfully'
    });
  };

  return (
    <div className="App">
      <h1>My React App with Jithvar UI</h1>
      
      <DatePicker
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          handleSuccess();
        }}
        placeholder="Select a date"
      />

      <BarChart
        data={[
          { label: 'Jan', value: 65 },
          { label: 'Feb', value: 78 },
          { label: 'Mar', value: 90 }
        ]}
        title="Monthly Sales"
      />
    </div>
  );
}

export default App;`}
          language="tsx"
        />

        <h3>⚡ Vite + React Setup</h3>
        <CodeBlock
          code={`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jithvar-ui']
  }
});`}
          language="typescript"
        />
      </section>

      {/* Next.js Setup */}
      <section className="jv-section">
        <h2>4️⃣ Next.js Setup (13, 14, 15)</h2>
        
        <h3>▲ Next.js App Router (13+, 14, 15)</h3>
        <p>For Next.js 13+ with App Router, use the <code>"use client"</code> directive:</p>
        <CodeBlock
          code={`// app/page.tsx
"use client";

import { useState } from 'react';
import { DatePicker, BarChart, JAlerts } from 'jithvar-ui';

export default function HomePage() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <h1>My Next.js App</h1>
      
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select date"
      />

      <BarChart
        data={[
          { label: 'Q1', value: 1200 },
          { label: 'Q2', value: 1900 }
        ]}
        title="Quarterly Revenue"
      />

      <button
        onClick={() => {
          JAlerts.success({
            title: 'Welcome!',
            message: 'Jithvar UI works perfectly in Next.js'
          });
        }}
      >
        Show Alert
      </button>
    </div>
  );
}`}
          language="tsx"
        />

        <h3>▲ Next.js Pages Router (13+)</h3>
        <CodeBlock
          code={`// pages/index.tsx
import { useState } from 'react';
import { DateRangePicker, JTable } from 'jithvar-ui';

export default function HomePage() {
  const [range, setRange] = useState({ startDate: null, endDate: null });

  return (
    <div>
      <h1>Dashboard</h1>
      
      <DateRangePicker
        value={range}
        onChange={setRange}
      />

      <JTable
        apiUrl="/api/users"
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email' }
        ]}
      />
    </div>
  );
}`}
          language="tsx"
        />

        <h3>🔧 next.config.js Configuration</h3>
        <CodeBlock
          code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['jithvar-ui'], // Optional, usually not needed
};

module.exports = nextConfig;`}
          language="javascript"
        />
      </section>

      {/* TypeScript Configuration */}
      <section className="jv-section">
        <h2>5️⃣ TypeScript Configuration</h2>
        <p>Jithvar UI includes full TypeScript support with type definitions:</p>

        <CodeBlock
          code={`// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx", // or "react" for React 17
    "module": "ESNext",
    "moduleResolution": "bundler", // or "node" for older setups
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true
  }
}`}
          language="json"
        />

        <h3>💡 Using Types</h3>
        <CodeBlock
          code={`import type { 
  JTableColumn, 
  DateRange, 
  JAlertOptions,
  ChartDataPoint 
} from 'jithvar-ui';

// Type-safe column definitions
const columns: JTableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', searchable: true }
];

// Type-safe date range
const dateRange: DateRange = {
  startDate: new Date(),
  endDate: new Date()
};

// Type-safe alert options
const alertOptions: JAlertOptions = {
  title: 'Success',
  message: 'Operation completed',
  type: 'success'
};`}
          language="tsx"
        />
      </section>

      {/* SSR & SSG Support */}
      <section className="jv-section">
        <h2>6️⃣ Server-Side Rendering (SSR)</h2>
        <p>Jithvar UI components are compatible with SSR in Next.js:</p>

        <h3>✅ Client-Side Only Components</h3>
        <p>Some components use browser APIs and should be rendered client-side:</p>
        <CodeBlock
          code={`// app/dashboard/page.tsx
"use client"; // Required for interactive components

import { JAlerts, DatePicker } from 'jithvar-ui';

export default function Dashboard() {
  return (
    <div>
      <DatePicker
        value={null}
        onChange={(date) => console.log(date)}
      />
    </div>
  );
}`}
          language="tsx"
        />

        <h3>🔄 Dynamic Imports (Optional)</h3>
        <CodeBlock
          code={`// For lazy loading components
import dynamic from 'next/dynamic';

const JTable = dynamic(
  () => import('jithvar-ui').then((mod) => mod.JTable),
  { ssr: false }
);

export default function UsersPage() {
  return <JTable apiUrl="/api/users" columns={[...]} />;
}`}
          language="tsx"
        />
      </section>

      {/* Troubleshooting */}
      <section className="jv-section">
        <h2>🔧 Troubleshooting</h2>
        
        <div style={{ 
          background: '#fef2f2', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #fca5a5',
          marginBottom: '16px'
        }}>
          <h3 style={{ marginTop: 0, color: '#991b1b' }}>❌ Module not found error</h3>
          <p>If you see "Cannot find module 'jithvar-ui'", try:</p>
          <CodeBlock
            language="bash"
            code={`# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with yarn
rm -rf node_modules yarn.lock
yarn install`}
          />
        </div>

        <div style={{ 
          background: '#fef2f2', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #fca5a5',
          marginBottom: '16px'
        }}>
          <h3 style={{ marginTop: 0, color: '#991b1b' }}>❌ React version mismatch</h3>
          <p>Ensure React 17 or 18 is installed (not React 19):</p>
          <CodeBlock
            language="bash"
            code={`# Check current version
npm list react

# Install compatible version
npm install react@^18.2.0 react-dom@^18.2.0`}
          />
        </div>

        <div style={{ 
          background: '#fef2f2', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #fca5a5'
        }}>
          <h3 style={{ marginTop: 0, color: '#991b1b' }}>❌ TypeScript errors</h3>
          <p>If you get TypeScript errors, update your tsconfig.json:</p>
          <CodeBlock
            language="json"
            code={`{
  "compilerOptions": {
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}`}
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="jv-section">
        <h2>📚 Next Steps</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {[
            { icon: '⚙️', title: 'Configuration Guide', desc: 'Learn how to customize components', link: '#/configuration' },
            { icon: '📅', title: 'Date Components', desc: 'DatePicker & DateRangePicker', link: '#/date-picker' },
            { icon: '📊', title: 'Charts', desc: '20 interactive chart types', link: '#/bar-chart' },
            { icon: '📋', title: 'JTable', desc: 'Advanced data table', link: '#/jtable' },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              style={{
                display: 'block',
                padding: '20px',
                background: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit',
                border: '2px solid #e5e7eb',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{item.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>{item.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
