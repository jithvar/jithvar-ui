# Installation & Tree-Shaking Guide

## Installation

### NPM
```bash
npm install jithvar-ui
```

### Yarn
```bash
yarn add jithvar-ui
```

### PNPM
```bash
pnpm add jithvar-ui
```

## Requirements

- **React**: 17.0.0 - 18.x (React 19 not yet supported)
- **React DOM**: 17.0.0 - 18.x
- **Node**: >= 14.0.0
- **Next.js** (optional): 13.x - 15.x

## Tree-Shaking: Import Only What You Need

Jithvar UI is fully tree-shakeable, meaning you only bundle the components you actually use. This keeps your bundle size minimal.

### Method 1: Named Imports (Recommended)

```tsx
// Import only specific components - tree-shaking works automatically
import { DatePicker, BarChart, JTable } from 'jithvar-ui';

function MyApp() {
  return (
    <div>
      <DatePicker />
      <BarChart data={data} />
      <JTable apiUrl="/api/users" columns={columns} />
    </div>
  );
}
```

**Bundle Size**: Only the components you import are included in your bundle.

### Method 2: Deep Imports (Smallest Bundle)

For the absolute smallest bundle size, use deep imports:

```tsx
// Import directly from component paths
import { DatePicker } from 'jithvar-ui/dist/components/inputs/DatePicker';
import { BarChart } from 'jithvar-ui/dist/components/charts/BarChart';
import { JTable } from 'jithvar-ui/dist/components/data/JTable';
```

### Method 3: Category Imports

```tsx
// Import all charts (if you need multiple charts)
import { BarChart, PieChart, LineChart } from 'jithvar-ui';

// Import all inputs
import { DatePicker, SearchableSelect, RangeSlider } from 'jithvar-ui';
```

## Bundle Size Comparison

| Import Method | Components | Approximate Size |
|--------------|------------|------------------|
| Single Component | 1 component | ~15-30 KB |
| 5 Components | 5 components | ~75-150 KB |
| 10 Components | 10 components | ~150-300 KB |
| All Components | 34 components | ~900 KB - 1.2 MB |

*Sizes are gzipped and minified. Actual sizes may vary based on build configuration.*

## Component Categories & Paths

### Charts (20 components)
```tsx
import {
  BarChart,
  PieChart,
  DonutChart,
  LineChart,
  AreaChart,
  GaugeChart,
  ScatterPlot,
  BubbleChart,
  RadarChart,
  FunnelChart,
  HeatmapChart,
  StackedBarChart,
  WaterfallChart,
  HistogramChart,
  CandlestickChart,
  ComboChart,
  BoxPlotChart,
  BulletChart,
  GanttChart,
  HeartbeatChart
} from 'jithvar-ui';
```

**Deep Import Path**: `jithvar-ui/dist/components/charts/[ComponentName]`

### Input Components (10 components)
```tsx
import {
  DatePicker,
  DateRangePicker,
  SearchableSelect,
  RangeSlider,
  Checkbox,
  CheckboxList,
  Radio,
  RadioGroup,
  ToggleButtons,
  MaskInput
} from 'jithvar-ui';
```

**Deep Import Path**: `jithvar-ui/dist/components/inputs/[ComponentName]`

### Layout Components (2 components)
```tsx
import {
  Tabs,
  Collapse
} from 'jithvar-ui';
```

**Deep Import Path**: `jithvar-ui/dist/components/layout/[ComponentName]`

### Data Components (1 component)
```tsx
import { JTable } from 'jithvar-ui';
```

**Deep Import Path**: `jithvar-ui/dist/components/data/JTable`

### Feedback Components (1 component)
```tsx
import { JAlerts } from 'jithvar-ui';
```

**Deep Import Path**: `jithvar-ui/dist/components/feedback/JAlerts`

## Usage Examples

### Example 1: Minimal Bundle (Only DatePicker)

```tsx
import { DatePicker } from 'jithvar-ui';
import { useState } from 'react';

function BookingForm() {
  const [date, setDate] = useState<Date | null>(null);
  
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      dateFormat="DD/MM/YYYY"
      placeholder="Select check-in date"
    />
  );
}
```

**Bundle Impact**: ~20 KB (minified + gzipped)

### Example 2: Data Dashboard (Charts + Table)

```tsx
import { BarChart, PieChart, LineChart, JTable } from 'jithvar-ui';

function Dashboard() {
  return (
    <div>
      <BarChart data={salesData} title="Monthly Sales" />
      <PieChart data={marketShare} title="Market Share" />
      <LineChart data={revenue} title="Revenue Trend" />
      <JTable apiUrl="/api/users" columns={columns} />
    </div>
  );
}
```

**Bundle Impact**: ~150 KB (minified + gzipped)

### Example 3: Form Application (Input Components)

```tsx
import {
  DatePicker,
  SearchableSelect,
  RangeSlider,
  CheckboxList,
  MaskInput
} from 'jithvar-ui';

function RegistrationForm() {
  return (
    <form>
      <DatePicker placeholder="Date of Birth" />
      <SearchableSelect options={countries} placeholder="Country" />
      <RangeSlider min={0} max={100} label="Age Range" />
      <CheckboxList options={interests} label="Interests" />
      <MaskInput mask="(999) 999-9999" placeholder="Phone" />
    </form>
  );
}
```

**Bundle Impact**: ~100 KB (minified + gzipped)

## Next.js Integration

### App Router (Next.js 13+)

```tsx
// app/page.tsx
'use client';

import { DatePicker, BarChart } from 'jithvar-ui';
import { useState } from 'react';

export default function Page() {
  const [date, setDate] = useState<Date | null>(null);
  
  return (
    <div>
      <DatePicker value={date} onChange={setDate} />
      <BarChart data={data} title="Sales" />
    </div>
  );
}
```

### Pages Router (Next.js 12-13)

```tsx
// pages/index.tsx
import { DatePicker, BarChart } from 'jithvar-ui';
import { useState } from 'react';

export default function HomePage() {
  const [date, setDate] = useState<Date | null>(null);
  
  return (
    <div>
      <DatePicker value={date} onChange={setDate} />
      <BarChart data={data} title="Sales" />
    </div>
  );
}
```

### Server Components (Next.js 13+)

**Note**: Jithvar UI components are client components. Use the `'use client'` directive:

```tsx
// app/components/Chart.tsx
'use client';

import { BarChart } from 'jithvar-ui';

export function SalesChart({ data }) {
  return <BarChart data={data} title="Sales" />;
}
```

```tsx
// app/page.tsx (Server Component)
import { SalesChart } from './components/Chart';

export default async function Page() {
  const data = await fetchSalesData();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <SalesChart data={data} />
    </div>
  );
}
```

## TypeScript Support

All components are fully typed with TypeScript. Import types as needed:

```tsx
import { 
  DatePicker,
  DatePickerProps,
  BarChart,
  BarChartDataPoint,
  JTable,
  JTableColumn
} from 'jithvar-ui';

const columns: JTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true }
];

const chartData: BarChartDataPoint[] = [
  { label: 'Jan', value: 100 }
];
```

## Build Optimization

### Vite Configuration

Vite automatically tree-shakes by default. No additional configuration needed.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'jithvar-charts': ['jithvar-ui'], // Optional: separate vendor chunk
        },
      },
    },
  },
});
```

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true, // Enable tree-shaking
    sideEffects: false,
  },
};
```

### Next.js Configuration

Next.js automatically tree-shakes. For additional optimization:

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['jithvar-ui'],
  },
};
```

## CSS Import

### Global Styles (Optional)

If you want to use the default styles, you don't need to import anything. CSS is bundled with components.

### Custom Styles

Override default styles using CSS custom properties:

```css
/* styles/jithvar-custom.css */
:root {
  --jv-primary-color: #your-color;
  --jv-border-radius: 8px;
  --jv-font-family: 'Your Font', sans-serif;
}
```

```tsx
// app/layout.tsx or pages/_app.tsx
import './styles/jithvar-custom.css';
```

## Troubleshooting

### Issue: Large Bundle Size

**Solution**: Use named imports instead of wildcard imports:

```tsx
// ❌ Bad - imports everything
import * as JithvarUI from 'jithvar-ui';

// ✅ Good - only imports what you use
import { DatePicker, BarChart } from 'jithvar-ui';
```

### Issue: React Version Conflicts

**Solution**: Ensure you're using React 17.x or 18.x:

```bash
npm list react
```

If React 19+ is installed, downgrade to 18:

```bash
npm install react@18 react-dom@18
```

### Issue: TypeScript Errors

**Solution**: Ensure TypeScript definitions are installed:

```bash
npm install --save-dev @types/react @types/react-dom
```

## Performance Tips

1. **Code Splitting**: Split components into separate routes
2. **Lazy Loading**: Use React.lazy() for chart components
3. **Dynamic Imports**: Load components only when needed
4. **Bundle Analysis**: Use tools like webpack-bundle-analyzer

```tsx
// Lazy load charts
import { lazy, Suspense } from 'react';

const BarChart = lazy(() => import('jithvar-ui').then(m => ({ default: m.BarChart })));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BarChart data={data} />
    </Suspense>
  );
}
```

## Support

- 📚 [Documentation](https://ui.jithvar.com)
- 🐛 [Issues](https://github.com/jithvar/jithvar-ui/issues)
- 💬 [Discussions](https://github.com/jithvar/jithvar-ui/discussions)
- 📧 [Email](mailto:contact@jithvar.com)

---

Built with ❤️ by [Jithvar Consultancy Services](https://jithvar.com)
