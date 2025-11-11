# 🚀 Jithvar UI - Quick Reference Guide

## Installation

```bash
npm install jithvar-ui
# or
yarn add jithvar-ui
# or
pnpm add jithvar-ui
```

## Component Categories

### 📊 Charts (20)

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
  HeartbeatChart,
} from "jithvar-ui";
```

### 🎛️ Inputs (10)

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
  MaskInput,
} from "jithvar-ui";
```

### 📐 Layout (2)

```tsx
import { Tabs, Collapse } from "jithvar-ui";
```

### 📋 Data (1)

```tsx
import { JTable } from "jithvar-ui";
```

### 🚨 Feedback (1)

```tsx
import { JAlerts } from "jithvar-ui";
```

## Common Usage Examples

### Bar Chart

```tsx
<BarChart
  data={[
    { label: "Jan", value: 65 },
    { label: "Feb", value: 78 },
  ]}
  title="Monthly Sales"
  width={600}
  height={400}
/>
```

### Date Range Picker

```tsx
<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={(start, end) => {
    setStartDate(start);
    setEndDate(end);
  }}
/>
```

### Searchable Select (API)

```tsx
<SearchableSelect
  apiUrl="/api/users"
  searchKey="name"
  valueKey="id"
  labelKey="name"
  onChange={setSelected}
  minSearchLength={3}
  multiple
/>
```

### Data Table

```tsx
<JTable
  apiUrl="/api/data"
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
  ]}
  enableRowSelection
  enableUrlState
/>
```

### Alerts

```tsx
// Success
JAlerts.success({
  title: "Success!",
  message: "Operation completed.",
});

// Error
JAlerts.error({
  title: "Error!",
  message: "Something went wrong.",
});

// Confirmation
JAlerts.question({
  title: "Are you sure?",
  message: "This cannot be undone.",
  onConfirm: () => {
    /* action */
  },
});

// Toast
JAlerts.toast({
  message: "Saved!",
  type: "success",
  position: "top-right",
});
```

## TypeScript Support

```tsx
import type {
  ChartDataPoint,
  DateRange,
  SelectOption,
  JTableColumn,
  JAlertOptions,
} from "jithvar-ui";
```

## CSS Customization

All CSS classes are prefixed with `jv-`:

```css
.jv-button {
  --primary-color: #0070f3;
  --hover-color: #0051cc;
}

.jv-chart {
  --chart-color-1: #8884d8;
  --chart-color-2: #82ca9d;
}
```

## Next.js Integration

```tsx
// app/page.tsx (Next.js 13+)
"use client";

import { BarChart } from "jithvar-ui";

export default function Page() {
  return <BarChart data={data} />;
}
```

## Links

- 📦 **npm:** https://www.npmjs.com/package/jithvar-ui
- 🐙 **GitHub:** https://github.com/jithvar/jithvar-ui
- 📖 **Docs:** https://github.com/jithvar/jithvar-ui#readme
- 🐛 **Issues:** https://github.com/jithvar/jithvar-ui/issues
- 💼 **Company:** https://jithvar.com

## Support

- **Email:** contact@jithvar.com
- **GitHub Issues:** Report bugs and request features
- **GitHub Discussions:** Ask questions and share ideas

---

Built with ❤️ by [Jithvar Consultancy Services](https://jithvar.com)
