# Jithvar UI - Professional React Component Library

<div align="center">

[![npm version](https://img.shields.io/npm/v/jithvar-ui.svg?style=flat-square)](https://www.npmjs.com/package/jithvar-ui)
[![npm downloads](https://img.shields.io/npm/dm/jithvar-ui.svg?style=flat-square)](https://www.npmjs.com/package/jithvar-ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/jithvar-ui?style=flat-square)](https://bundlephobia.com/package/jithvar-ui)
[![license](https://img.shields.io/npm/l/jithvar-ui.svg?style=flat-square)](https://github.com/jithvar/jithvar-ui/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/jithvar/jithvar-ui.svg?style=flat-square)](https://github.com/jithvar/jithvar-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square)](https://www.typescriptlang.org/)

**A modern, enterprise-grade React component library with 34 production-ready components including 20 interactive data visualization charts, advanced form inputs, and data management tools.**

[📚 Documentation](https://jithvar-ui.vercel.app) • [🎨 Live Demo](https://jithvar-ui.vercel.app) • [💼 Jithvar Consultancy](https://jithvar.com) • [🐛 Report Bug](https://github.com/jithvar/jithvar-ui/issues) • [✨ Request Feature](https://github.com/jithvar/jithvar-ui/issues)

Built with ❤️ by [**Jithvar Consultancy Services**](https://jithvar.com) - Your trusted partner for enterprise software development, UI/UX design, and digital transformation solutions.

</div>

---

## 🎯 Why Jithvar UI?

### 🚀 **Features That Set Us Apart**

- ✅ **34 Production-Ready Components** - Comprehensive UI toolkit for modern web applications
- ✅ **20 Interactive Charts** - Professional data visualization with React and TypeScript
- ✅ **TypeScript First** - 100% type-safe with complete IntelliSense support
- ✅ **Zero Dependencies** - Lightweight, pure React + SVG implementation (no external chart libraries)
- ✅ **Tree Shakeable** - Import only what you need, optimize your bundle size
- ✅ **Responsive Design** - Mobile-first approach, works beautifully on all screen sizes
- ✅ **Interactive & Animated** - Smooth transitions, hover tooltips, and engaging user experience
- ✅ **Enterprise Ready** - Battle-tested in production by [Jithvar Consultancy Services](https://jithvar.com)
- ✅ **SEO Optimized** - Server-side rendering compatible for Next.js applications
- ✅ **Accessible** - WCAG compliant components with keyboard navigation support
- ✅ **Customizable** - Extensive theming and styling options to match your brand

### 💼 **About Jithvar Consultancy Services**

Jithvar UI is developed and maintained by [**Jithvar Consultancy Services**](https://jithvar.com), a leading provider of:

- 🎨 **Custom Software Development** - Enterprise web and mobile applications
- 📊 **Data Visualization Solutions** - Interactive dashboards and analytics platforms
- 🚀 **Digital Transformation** - Modernizing legacy systems with cutting-edge technology
- 💡 **UI/UX Design Services** - Beautiful, user-centric interface design
- 🔧 **React & TypeScript Consulting** - Expert guidance for your development team

**Trusted by enterprises worldwide** for delivering high-quality, scalable software solutions.

[🌐 Visit Jithvar.com](https://jithvar.com) • [📧 Contact Us](mailto:contact@jithvar.com) • [💼 Our Services](https://jithvar.com/services)

## 📦 Components

### 📊 Charts (20)

Interactive data visualization components with tooltips and animations:

- **BarChart** - Vertical/horizontal bars with 3D effects and gradients
- **PieChart** - Circular proportional charts
- **DonutChart** - Ring chart variant
- **LineChart** - Multi-line trends with smooth curves
- **AreaChart** - Filled area visualizations
- **GaugeChart** - Needle-style progress indicators
- **ScatterPlot** - X/Y correlation plots
- **BubbleChart** - 3D data visualization (x, y, size)
- **RadarChart** - Multi-axis spider/web charts
- **FunnelChart** - Conversion funnel stages
- **HeatmapChart** - Color-coded matrix (5 color schemes)
- **StackedBarChart** - Vertical/horizontal stacked bars
- **WaterfallChart** - Cumulative value changes
- **HistogramChart** - Frequency distribution
- **CandlestickChart** - Financial OHLC data
- **ComboChart** - Mixed bar + line with dual Y-axes
- **BoxPlotChart** - Statistical distribution
- **BulletChart** - Performance vs target
- **GanttChart** - Project timeline with dependencies
- **HeartbeatChart** - Time-series with spike detection

### 🎛️ Inputs (10)

Advanced form controls with validation and customization:

- **DatePicker** - Single date selection with constraints
- **DateRangePicker** - Predefined and custom date ranges
- **SearchableSelect** - API-based searchable dropdown (single/multi)
- **RangeSlider** - Dual-handle min/max value selector
- **Checkbox** - Customizable checkbox component
- **CheckboxList** - Multiple checkbox group
- **Radio** - Single radio button
- **RadioGroup** - Radio button group with orientation
- **ToggleButtons** - Segmented control buttons
- **MaskInput** - Formatted input (phone, SSN, credit card, etc.)

### 📐 Layout (2)

Organize and structure your UI:

- **Tabs** - Tabbed content with multiple orientations
- **Collapse** - Accordion-style collapsible panels

### 📋 Data (1)

Advanced data management:

- **JTable** - Full-featured data table with server-side operations
  - Pagination, sorting, filtering
  - Row selection with bulk actions
  - URL state management (shareable filters)
  - Floating row actions
  - Universal and column-specific search

### 🚨 Feedback (1)

User notifications and alerts:

- **JAlerts** - Beautiful alert/modal dialogs (Better than SweetAlert!)
  - Multiple types (success, error, warning, info, question)
  - Custom buttons and inputs
  - Toast notifications
  - Animations and positioning

## 🚀 Installation

```bash
# npm
npm install jithvar-ui

# yarn
yarn add jithvar-ui

# pnpm
pnpm add jithvar-ui
```

### Peer Dependencies

Jithvar UI requires React 17+ or React 18+:

```bash
npm install react react-dom
```

## 📖 Quick Start

### Charts

```tsx
import { BarChart, PieChart, LineChart } from "jithvar-ui";

// Bar Chart
<BarChart
  data={[
    { label: "Jan", value: 65 },
    { label: "Feb", value: 78 },
    { label: "Mar", value: 90 }
  ]}
  title="Monthly Sales"
  width={600}
  height={400}
/>

// Pie Chart
<PieChart
  data={[
    { label: "Product A", value: 45 },
    { label: "Product B", value: 30 },
    { label: "Product C", value: 25 }
  ]}
  title="Market Share"
/>

// Line Chart
<LineChart
  data={[
    { x: "Jan", y: 30 },
    { x: "Feb", y: 45 },
    { x: "Mar", y: 60 }
  ]}
  title="Revenue Trend"
/>
```

### Date Pickers

```tsx
import { DatePicker, DateRangePicker } from "jithvar-ui";

// Single Date Picker
<DatePicker
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  minDate={new Date(2020, 0, 1)}
  maxDate={new Date()}
/>

// Date Range Picker with Predefined Ranges
<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={(start, end) => {
    setStartDate(start);
    setEndDate(end);
  }}
/>
```

### Searchable Select

```tsx
import { SearchableSelect } from "jithvar-ui";

// Static Data
<SearchableSelect
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" }
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Select an option"
/>

// API-based with Server Search
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
import { JTable } from "jithvar-ui";

<JTable
  apiUrl="/api/users"
  columns={[
    { key: "name", label: "Name", sortable: true, searchable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "created_at", label: "Created", type: "date" }
  ]}
  enableRowSelection
  enableUrlState
  onRowSelect={(rows) => console.log(rows)}
/>
```

### Alerts & Notifications

```tsx
import { JAlerts } from "jithvar-ui";

// Success Alert
JAlerts.success({
  title: "Success!",
  message: "Your action was completed successfully.",
  confirmButtonText: "Got it"
});

// Error Alert
JAlerts.error({
  title: "Error!",
  message: "Something went wrong. Please try again."
});

// Confirmation Dialog
JAlerts.question({
  title: "Are you sure?",
  message: "This action cannot be undone.",
  confirmButtonText: "Yes, delete it",
  cancelButtonText: "Cancel",
  onConfirm: () => {
    // Delete action
  }
});

// Toast Notification
JAlerts.toast({
  message: "File uploaded successfully",
  type: "success",
  position: "top-right"
});
```

### Form Inputs

```tsx
import { 
  RangeSlider, 
  CheckboxList, 
  RadioGroup, 
  ToggleButtons,
  MaskInput 
} from "jithvar-ui";

// Range Slider
<RangeSlider
  min={0}
  max={100}
  step={5}
  value={[20, 80]}
  onChange={(values) => console.log(values)}
/>

// Checkbox List
<CheckboxList
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" }
  ]}
  value={selected}
  onChange={setSelected}
/>

// Radio Group
<RadioGroup
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" }
  ]}
  value={selected}
  onChange={setSelected}
  orientation="horizontal"
/>

// Masked Input
<MaskInput
  mask="(999) 999-9999"
  value={phone}
  onChange={setPhone}
  placeholder="Phone Number"
/>
```

### Layout Components

```tsx
import { Tabs, Collapse } from "jithvar-ui";

// Tabs
<Tabs
  tabs={[
    { label: "Tab 1", content: <div>Content 1</div> },
    { label: "Tab 2", content: <div>Content 2</div> }
  ]}
  defaultActiveTab={0}
/>

// Collapse/Accordion
<Collapse
  items={[
    { title: "Section 1", content: <div>Content 1</div> },
    { title: "Section 2", content: <div>Content 2</div> }
  ]}
  allowMultiple={false}
/>
```

## 📚 Documentation

### Run the Demo

See all components in action with our interactive demo:

```bash
git clone https://github.com/jithvar/jithvar-ui.git
cd jithvar-ui
npm install
npm run demo
```

Visit `http://localhost:5173` to explore all components.

### Component Categories

| Category | Components | Description |
|----------|------------|-------------|
| 📊 **Charts** | 20 components | Interactive data visualization with tooltips and animations |
| 🎛️ **Inputs** | 10 components | Advanced form controls with validation |
| 📐 **Layout** | 2 components | Tabs and collapsible panels |
| 📋 **Data** | 1 component | Feature-rich data table |
| 🚨 **Feedback** | 1 component | Alerts and notifications |

### Advanced Features

#### JTable Data Table

- ✅ **Server-side pagination** - Handle millions of records
- ✅ **Multi-column sorting** - Sort by multiple columns
- ✅ **Universal search** - Search across all columns
- ✅ **Column-specific filters** - Date ranges, dropdowns, text search
- ✅ **Range sliders** - For numeric columns
- ✅ **Row selection** - Bulk actions with checkboxes
- ✅ **URL state management** - Shareable filtered results
- ✅ **Floating row actions** - Context-aware actions
- ✅ **Responsive design** - Mobile-friendly

#### Chart Features

- ✅ **Interactive tooltips** - Show values on hover
- ✅ **Smooth animations** - Engaging transitions
- ✅ **Responsive sizing** - Auto-scales to container
- ✅ **Customizable colors** - Match your brand
- ✅ **Export capabilities** - Save as image (coming soon)
- ✅ **Accessibility** - Screen reader friendly

## 🎨 Theming & Customization

All components support CSS modules and can be customized with CSS variables:

```css
/* Override default colors */
.jv-button {
  --primary-color: #0070f3;
  --hover-color: #0051cc;
}

.jv-chart {
  --chart-color-1: #8884d8;
  --chart-color-2: #82ca9d;
  --chart-color-3: #ffc658;
}
```

## 🏗️ TypeScript Support

Jithvar UI is built with TypeScript and provides complete type definitions:

```tsx
import type { 
  ChartDataPoint, 
  DateRange, 
  SelectOption,
  JTableColumn,
  JAlertOptions 
} from "jithvar-ui";

const data: ChartDataPoint[] = [
  { label: "Jan", value: 100 }
];

const columns: JTableColumn[] = [
  { key: "name", label: "Name", sortable: true }
];
```

## 🌐 Next.js Integration

Jithvar UI works seamlessly with Next.js:

```tsx
// app/page.tsx (Next.js 13+ App Router)
"use client";

import { BarChart, JAlerts } from "jithvar-ui";

export default function Page() {
  return (
    <div>
      <BarChart data={data} />
      <button onClick={() => JAlerts.success({ message: "Hello!" })}>
        Show Alert
      </button>
    </div>
  );
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed release history.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🌟 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/jithvar/jithvar-ui/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/jithvar/jithvar-ui/discussions)
- 📧 **Email**: [contact@jithvar.com](mailto:contact@jithvar.com)
- 🌐 **Website**: [jithvar.com](https://jithvar.com)

## 🙏 Acknowledgments

Built with ❤️ by **[Jithvar Consultancy Services](https://jithvar.com)**

Special thanks to all contributors and the React community!

---

<div align="center">

**[⭐ Star us on GitHub](https://github.com/jithvar/jithvar-ui)** • **[📦 View on npm](https://www.npmjs.com/package/jithvar-ui)** • **[💼 Hire Us](https://jithvar.com/contact)**

Made with TypeScript, React, and dedication to quality.

</div>
