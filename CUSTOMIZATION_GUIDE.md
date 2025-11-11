# UI Customization Guide

All Jithvar UI components support extensive customization through className props. This guide shows you how to customize the appearance of every component.

## Common Props for All Components

Every component in Jithvar UI supports the following customization props:

- **`className`**: Additional CSS classes for the root element
- **`containerClassName`**: CSS classes for the container/wrapper element
- **`inputClassName`**: CSS classes for input elements (where applicable)
- **`labelClassName`**: CSS classes for label elements (where applicable)

## Component-Specific Customization

### Input Components

#### DatePicker

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  className="my-custom-class"
  containerClassName="custom-container"
  inputClassName="custom-input"
  dateFormat="DD/MM/YYYY" // or 'MM/DD/YYYY', 'YYYY-MM-DD', 'MMM DD, YYYY', 'DD MMM YYYY'
  // Or custom formatter function
  dateFormat={(date) => `Custom: ${date.toLocaleDateString()}`}
  minDate={new Date(2020, 0, 1)}
  maxDate={new Date()}
/>
```

**Available Date Formats:**

- `MM/DD/YYYY` - 12/25/2024
- `DD/MM/YYYY` - 25/12/2024
- `YYYY-MM-DD` - 2024-12-25
- `MMM DD, YYYY` - Dec 25, 2024 (default)
- `DD MMM YYYY` - 25 Dec 2024
- Custom function: `(date: Date) => string`

#### DateRangePicker

```tsx
<DateRangePicker
  value={range}
  onChange={setRange}
  className="my-custom-class"
  containerClassName="custom-container"
  inputClassName="custom-input"
  dateFormat="DD/MM/YYYY"
/>
```

#### SearchableSelect

```tsx
<SearchableSelect
  options={options}
  value={selected}
  onChange={setSelected}
  className="my-custom-class"
  containerClassName="custom-container"
  inputClassName="custom-input"
  dropdownClassName="custom-dropdown"
/>
```

#### RangeSlider

```tsx
<RangeSlider
  min={0}
  max={100}
  value={range}
  onChange={setRange}
  className="my-custom-class"
  containerClassName="custom-container"
  trackClassName="custom-track"
  thumbClassName="custom-thumb"
/>
```

#### MaskInput

```tsx
<MaskInput
  mask="(999) 999-9999"
  value={phone}
  onChange={setPhone}
  className="my-custom-class"
  containerClassName="custom-container"
  inputClassName="custom-input"
  labelClassName="custom-label"
/>
```

#### Checkbox

```tsx
<Checkbox
  label="Accept Terms"
  checked={accepted}
  onChange={setAccepted}
  className="my-custom-class"
  containerClassName="custom-container"
  inputClassName="custom-input"
  labelClassName="custom-label"
/>
```

#### Radio & RadioGroup

```tsx
<RadioGroup
  options={options}
  value={selected}
  onChange={setSelected}
  className="my-custom-class"
  containerClassName="custom-container"
  labelClassName="custom-label"
/>
```

#### ToggleButtons

```tsx
<ToggleButtons
  options={options}
  value={selected}
  onChange={setSelected}
  className="my-custom-class"
  containerClassName="custom-container"
  buttonClassName="custom-button"
/>
```

### Layout Components

#### Tabs

```tsx
<Tabs
  tabs={tabs}
  className="my-custom-class"
  containerClassName="custom-container"
  tabClassName="custom-tab"
  contentClassName="custom-content"
/>
```

#### Collapse

```tsx
<Collapse
  items={items}
  className="my-custom-class"
  containerClassName="custom-container"
  headerClassName="custom-header"
  contentClassName="custom-content"
/>
```

### Data Components

#### JTable

```tsx
<JTable
  apiUrl="/api/users"
  columns={columns}
  className="my-custom-class"
  containerClassName="custom-container"
  tableClassName="custom-table"
  headerClassName="custom-header"
  rowClassName="custom-row"
/>
```

### Feedback Components

#### JAlerts

```tsx
JAlerts.success({
  title: "Success!",
  message: "Operation completed",
  customClass: "my-custom-alert",
  confirmButtonClass: "custom-button",
});
```

### Chart Components

All chart components support:

```tsx
<BarChart
  data={data}
  className="my-custom-class"
  containerClassName="custom-container"
  titleClassName="custom-title"
  legendClassName="custom-legend"
/>
```

**Applies to all chart components:**

- BarChart, PieChart, LineChart, AreaChart, DonutChart
- GaugeChart, ScatterPlot, BubbleChart, RadarChart
- FunnelChart, HeatmapChart, StackedBarChart, WaterfallChart
- HistogramChart, CandlestickChart, ComboChart, BoxPlotChart
- BulletChart, GanttChart, HeartbeatChart

## CSS Custom Properties

Many components also support CSS custom properties (CSS variables) for deeper customization:

```css
/* Date Picker Colors */
.jv-datepicker {
  --primary-color: #0070f3;
  --hover-color: #0051cc;
  --border-color: #e5e7eb;
  --selected-bg: #0070f3;
  --selected-text: white;
}

/* Chart Colors */
.jv-chart {
  --chart-color-1: #8884d8;
  --chart-color-2: #82ca9d;
  --chart-color-3: #ffc658;
  --chart-color-4: #ff7c7c;
  --grid-color: #e5e7eb;
  --text-color: #374151;
}

/* Table Colors */
.jv-table {
  --header-bg: #f9fafb;
  --border-color: #e5e7eb;
  --hover-bg: #f3f4f6;
  --selected-bg: #eff6ff;
}
```

## Example: Complete Custom Styling

```tsx
// Custom DatePicker with Tailwind CSS
<DatePicker
  value={date}
  onChange={setDate}
  containerClassName="w-full max-w-md"
  inputClassName="px-4 py-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
  dateFormat="DD/MM/YYYY"
  placeholder="Select a date"
/>

// Custom SearchableSelect with custom CSS
<SearchableSelect
  options={options}
  value={selected}
  onChange={setSelected}
  containerClassName="custom-select-wrapper"
  inputClassName="custom-select-input"
  dropdownClassName="custom-dropdown shadow-xl"
/>

// Custom Table
<JTable
  apiUrl="/api/users"
  columns={columns}
  containerClassName="rounded-lg shadow-lg"
  tableClassName="border-separate border-spacing-0"
  headerClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  rowClassName="hover:bg-blue-50 transition-colors"
/>
```

## Tree-Shaking & Selective Imports

Jithvar UI is fully tree-shakeable. Import only what you need:

```tsx
// Import only specific components
import { DatePicker } from "jithvar-ui";
import { JTable } from "jithvar-ui";
import { BarChart } from "jithvar-ui";

// Or use deep imports for even smaller bundles
import { DatePicker } from "jithvar-ui/dist/components/inputs/DatePicker";
import { JTable } from "jithvar-ui/dist/components/data/JTable";
```

## Tips for Customization

1. **Use CSS Modules**: Define your styles in CSS modules for better scoping
2. **Leverage CSS Variables**: Override CSS custom properties for consistent theming
3. **Combine with Tailwind**: All components work seamlessly with Tailwind CSS
4. **Responsive Design**: Use responsive class utilities for mobile-first design
5. **Dark Mode**: Override colors with dark mode variants

## Need Help?

- 📚 [Full Documentation](https://ui.jithvar.com)
- 🐛 [Report Issues](https://github.com/jithvar/jithvar-ui/issues)
- 💼 [Contact Jithvar](https://jithvar.com/contact)
