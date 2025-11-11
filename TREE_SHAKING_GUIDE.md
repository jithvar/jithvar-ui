# Tree-Shaking & Selective Imports Guide

## 📦 Import Only What You Need

Jithvar UI is fully **tree-shakeable**, meaning you only bundle the components you actually use in your application. This keeps your bundle size minimal and optimized.

## 🎯 How It Works

Modern bundlers (Webpack 5+, Vite, Rollup, etc.) automatically remove unused code when you use ES6 imports. Our library is configured with:

- ✅ `"sideEffects": ["**/*.css"]` - Ensures CSS is preserved but unused JS is removed
- ✅ ES Modules format - Enables static analysis
- ✅ Individual component exports - Each component can be imported separately

## 📚 Import Examples

### Option 1: Named Imports (Recommended)

Import only the components you need:

```typescript
// ✅ Only JTable and its dependencies are bundled
import { JTable } from "jithvar-ui";

// ✅ Only DatePicker and DateRangePicker are bundled
import { DatePicker, DateRangePicker } from "jithvar-ui";

// ✅ Only the chart components you use
import { BarChart, LineChart, PieChart } from "jithvar-ui";
```

### Option 2: Import Everything (Not Recommended for Production)

```typescript
// ❌ Bundles ALL components (larger bundle size)
import * as JithvarUI from "jithvar-ui";

const { JTable, DatePicker } = JithvarUI;
```

## 📊 Bundle Size Comparison

Here's what gets bundled with different import scenarios:

| Import Statement                          | Approximate Bundle Size  |
| ----------------------------------------- | ------------------------ |
| `import { JTable } from 'jithvar-ui'`     | ~45 KB                   |
| `import { DatePicker } from 'jithvar-ui'` | ~15 KB                   |
| `import { JAlerts } from 'jithvar-ui'`    | ~12 KB                   |
| `import { BarChart } from 'jithvar-ui'`   | ~8 KB                    |
| `import * from 'jithvar-ui'`              | ~350 KB (all components) |

_Sizes are gzipped and approximate. Actual size depends on your bundler configuration._

## 🎨 CSS Handling

CSS files are automatically included with each component:

```typescript
// ✅ Automatically includes DatePicker.css
import { DatePicker } from "jithvar-ui";

// No need to import CSS separately!
```

### Manual CSS Import (Optional)

If your bundler doesn't handle CSS automatically:

```typescript
import { DatePicker } from "jithvar-ui";
import "jithvar-ui/dist/components/inputs/DatePicker/DatePicker.css";
```

## 🔧 Bundler Configuration

### Vite (Default - No Config Needed)

Vite automatically handles tree-shaking with ES modules:

```javascript
// vite.config.js - No special config needed
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

### Webpack 5+

Webpack 5 has built-in tree-shaking. Ensure production mode:

```javascript
// webpack.config.js
module.exports = {
  mode: "production", // Enables tree-shaking
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
};
```

### Next.js 13+

Next.js uses Webpack 5 by default with tree-shaking enabled:

```javascript
// next.config.js - No special config needed
module.exports = {
  // Tree-shaking works automatically
};
```

### Rollup

Rollup has excellent tree-shaking by default:

```javascript
// rollup.config.js
export default {
  // Tree-shaking enabled automatically with ES modules
};
```

## 📱 Real-World Examples

### Example 1: Data Table Only

```typescript
// pages/users.tsx
import { JTable } from 'jithvar-ui';

export default function UsersPage() {
  return (
    <JTable
      apiUrl="/api/users"
      columns={[...]}
    />
  );
}
```

**Result:** Only JTable component is bundled (~45 KB)

### Example 2: Date Pickers Only

```typescript
// components/DateFilter.tsx
import { DatePicker, DateRangePicker } from "jithvar-ui";

export function DateFilter() {
  return (
    <>
      <DatePicker />
      <DateRangePicker />
    </>
  );
}
```

**Result:** Only DatePicker and DateRangePicker are bundled (~30 KB)

### Example 3: Charts Dashboard

```typescript
// pages/dashboard.tsx
import { BarChart, LineChart, PieChart } from 'jithvar-ui';

export default function Dashboard() {
  return (
    <div>
      <BarChart data={...} />
      <LineChart data={...} />
      <PieChart data={...} />
    </div>
  );
}
```

**Result:** Only the three chart components are bundled (~25 KB)

### Example 4: Alerts Only

```typescript
// utils/notifications.ts
import { JAlerts } from "jithvar-ui";

export function showSuccess(message: string) {
  JAlerts.success({ message });
}
```

**Result:** Only JAlerts component is bundled (~12 KB)

## 🎯 Component Categories

### Input Components (~15-30 KB each)

```typescript
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
  MaskInput,
} from "jithvar-ui";
```

### Chart Components (~8-15 KB each)

```typescript
import {
  BarChart,
  PieChart,
  LineChart,
  AreaChart,
  DonutChart,
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
  HeartbeatChart,
} from "jithvar-ui";
```

### Layout Components (~10-15 KB each)

```typescript
import { Tabs, Collapse } from "jithvar-ui";
```

### Data Components (~40-50 KB each)

```typescript
import { JTable } from "jithvar-ui";
```

### Feedback Components (~10-15 KB each)

```typescript
import { JAlerts } from "jithvar-ui";
```

## 🔍 Verify Tree-Shaking

### 1. Check Bundle Analyzer

```bash
# For Webpack
npm install --save-dev webpack-bundle-analyzer

# For Vite
npm install --save-dev rollup-plugin-visualizer
```

### 2. Build and Analyze

```bash
npm run build

# Check the bundle size
ls -lh dist/
```

### 3. Inspect Build Output

Look for statements like:

```
✓ 1234 modules transformed.
✓ dist/index.js 45.2 kB │ gzip: 15.8 kB
```

## 💡 Best Practices

1. **Always use named imports**

   ```typescript
   // ✅ Good
   import { DatePicker } from "jithvar-ui";

   // ❌ Avoid
   import * as JithvarUI from "jithvar-ui";
   ```

2. **Import from the main package**

   ```typescript
   // ✅ Good
   import { DatePicker } from "jithvar-ui";

   // ❌ Don't do this (deep imports may break)
   import DatePicker from "jithvar-ui/dist/components/inputs/DatePicker";
   ```

3. **Let the bundler handle CSS**

   ```typescript
   // ✅ CSS is automatically included
   import { DatePicker } from "jithvar-ui";

   // ❌ No need to import CSS separately (unless your bundler requires it)
   ```

4. **Use production builds**
   ```bash
   # Always build for production to enable tree-shaking
   npm run build
   # or
   NODE_ENV=production npm run build
   ```

## 📈 Performance Benefits

| Scenario                | Without Tree-Shaking | With Tree-Shaking | Savings         |
| ----------------------- | -------------------- | ----------------- | --------------- |
| Using only JTable       | 350 KB               | 45 KB             | **87% smaller** |
| Using only DatePicker   | 350 KB               | 15 KB             | **96% smaller** |
| Using 3 charts          | 350 KB               | 25 KB             | **93% smaller** |
| Using all 34 components | 350 KB               | 350 KB            | No savings      |

## 🚀 TypeScript Support

Tree-shaking works seamlessly with TypeScript:

```typescript
import { JTable, type JTableColumn } from "jithvar-ui";

const columns: JTableColumn[] = [{ key: "name", label: "Name" }];

<JTable columns={columns} />;
```

Type definitions are also tree-shakeable - only imported types are included.

## ❓ Troubleshooting

### Bundle Size Still Large?

1. **Check your bundler is in production mode**

   ```bash
   NODE_ENV=production npm run build
   ```

2. **Verify you're using named imports**

   ```typescript
   // ✅ Named import
   import { DatePicker } from "jithvar-ui";
   ```

3. **Check for default imports**

   ```typescript
   // ❌ This might bundle more than needed
   import JithvarUI from "jithvar-ui";
   ```

4. **Analyze your bundle**
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   ```

### CSS Not Loading?

Some bundlers require explicit CSS imports:

```typescript
import { DatePicker } from "jithvar-ui";
import "jithvar-ui/dist/components/inputs/DatePicker/DatePicker.css";
```

Or configure your bundler to handle CSS:

```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      css: { charset: false },
    },
  },
};
```

## 📚 Additional Resources

- [Webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Vite Tree Shaking](https://vitejs.dev/guide/features.html#tree-shaking)
- [Rollup Tree Shaking](https://rollupjs.org/guide/en/#tree-shaking)
- [Next.js Bundle Optimization](https://nextjs.org/docs/advanced-features/compiler)

## 🎉 Summary

Jithvar UI is designed for optimal tree-shaking:

- ✅ Import only what you need
- ✅ Automatic bundle size optimization
- ✅ Works with all modern bundlers
- ✅ No configuration required
- ✅ Full TypeScript support
- ✅ CSS is automatically handled

**Your bundle will only include the components you actually use!**
