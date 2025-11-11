# 🎉 Jithvar UI v1.0.2 Release Notes

**Release Date:** November 11, 2024  
**npm Package:** [jithvar-ui@1.0.2](https://www.npmjs.com/package/jithvar-ui)  
**GitHub Tag:** [v1.0.2](https://github.com/jithvar/jithvar-ui/releases/tag/v1.0.2)  
**Live Demo:** [ui.jithvar.com](https://ui.jithvar.com)

---

## 🚀 Major Features

### 1. **Enhanced UI Customization**

All components now support extensive CSS customization options:

- ✅ `className` - Custom classes for the component
- ✅ `containerClassName` - Custom classes for container elements
- ✅ `inputClassName` - Custom classes for input fields
- ✅ Full CSS override support via custom classes

**Affected Components:**

- DatePicker, DateRangePicker
- SearchableSelect, RangeSlider
- MaskInput, Checkbox, Radio, CheckboxList, RadioGroup
- ToggleButtons, Tabs, Collapse
- All Chart components (BarChart, PieChart, LineChart, etc.)

### 2. **Flexible Date Format Options**

DatePicker and DateRangePicker now support multiple date format options:

**Predefined Formats:**

- `'MM/DD/YYYY'` - 12/31/2024
- `'DD/MM/YYYY'` - 31/12/2024
- `'YYYY-MM-DD'` - 2024-12-31
- `'MMM DD, YYYY'` - Dec 31, 2024 (default)
- `'DD MMM YYYY'` - 31 Dec 2024

**Custom Formatter:**

```tsx
<DatePicker dateFormat={(date) => `Custom: ${date.toISOString()}`} />
```

### 3. **React 17 & 18 Full Support**

- ✅ Compatible with React 17.0.0 - 18.x.x
- ✅ Compatible with Next.js 13, 14, and 15
- ✅ Explicit peer dependency constraints: `>=17.0.0 <19.0.0`
- ✅ No React 19 breaking changes

### 4. **Tree-Shaking Optimization**

- ✅ `"sideEffects": false` in package.json
- ✅ ES Module exports for optimal tree-shaking
- ✅ Import only what you need - reduces bundle size significantly

**Bundle Size Reduction:**

```tsx
// Full import (not recommended)
import { BarChart, PieChart } from "jithvar-ui"; // ~300KB

// Selective import (recommended)
import { BarChart } from "jithvar-ui"; // ~50KB
```

### 5. **Enhanced Documentation**

- ✅ Updated Installation page with React 17/18/Next.js examples
- ✅ New Configuration Guide with comprehensive customization examples
- ✅ Tree-shaking guide with bundle size optimization tips
- ✅ Next.js 13+ App Router and Pages Router examples

---

## 📋 Component Updates

### DatePicker

**New Props:**

```tsx
interface DatePickerProps {
  containerClassName?: string;
  inputClassName?: string;
  dateFormat?:
    | "MM/DD/YYYY"
    | "DD/MM/YYYY"
    | "YYYY-MM-DD"
    | "MMM DD, YYYY"
    | "DD MMM YYYY"
    | ((date: Date) => string);
}
```

**Example:**

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  dateFormat="DD/MM/YYYY"
  containerClassName="my-datepicker-container"
  inputClassName="my-custom-input"
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date()}
/>
```

### DateRangePicker

**New Props:**

```tsx
interface DateRangePickerProps {
  containerClassName?: string;
  inputClassName?: string;
  dateFormat?:
    | "MM/DD/YYYY"
    | "DD/MM/YYYY"
    | "YYYY-MM-DD"
    | "MMM DD, YYYY"
    | "DD MMM YYYY"
    | ((date: Date) => string);
}
```

**Example:**

```tsx
<DateRangePicker
  value={range}
  onChange={setRange}
  dateFormat="YYYY-MM-DD"
  containerClassName="date-range-wrapper"
  inputClassName="date-range-input"
/>
```

### SearchableSelect

**New Props:**

```tsx
interface SearchableSelectProps {
  containerClassName?: string;
  inputClassName?: string;
}
```

### RangeSlider

**New Props:**

```tsx
interface RangeSliderProps {
  containerClassName?: string;
}
```

### MaskInput

**New Props:**

```tsx
interface MaskInputProps {
  containerClassName?: string;
  inputClassName?: string;
}
```

### All Chart Components

**New Props:**

```tsx
interface ChartProps {
  className?: string;
  containerClassName?: string;
}
```

---

## 🛠️ Technical Improvements

### Package Configuration

```json
{
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=17.0.0 <19.0.0",
    "react-dom": ">=17.0.0 <19.0.0"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

### Build Optimizations

- ✅ ES Module + CommonJS builds
- ✅ Source maps for debugging
- ✅ TypeScript definitions included
- ✅ CSS bundled with components

### Bundle Size

- **Total Package Size:** 254.2 KB (gzipped)
- **Unpacked Size:** 1.7 MB
- **Total Files:** 80 type definition files

---

## 📚 Documentation Updates

### New Demo Pages

1. **Installation** - Comprehensive setup guide for React 17, 18, and Next.js 13-15
2. **Configuration** - Complete customization examples with code snippets
3. **Updated Component Demos** - All demos now show custom styling examples

### README Enhancements

- Tree-shaking guide with bundle analyzer examples
- React version compatibility matrix
- Next.js integration examples (App Router & Pages Router)
- Custom styling documentation

---

## 🔄 Migration Guide

### From v1.0.1 to v1.0.2

**No Breaking Changes!** This is a backward-compatible release.

**Optional Enhancements:**

```tsx
// Before (still works)
<DatePicker value={date} onChange={setDate} />

// After (with new features)
<DatePicker
  value={date}
  onChange={setDate}
  dateFormat="DD/MM/YYYY"
  containerClassName="custom-container"
  inputClassName="custom-input"
/>
```

---

## 📦 Installation

```bash
# npm
npm install jithvar-ui@1.0.2

# yarn
yarn add jithvar-ui@1.0.2

# pnpm
pnpm add jithvar-ui@1.0.2
```

---

## 🔗 Links

- **npm Package:** https://www.npmjs.com/package/jithvar-ui
- **GitHub Repository:** https://github.com/jithvar/jithvar-ui
- **Live Demo:** https://ui.jithvar.com
- **Documentation:** https://ui.jithvar.com/installation
- **Report Issues:** https://github.com/jithvar/jithvar-ui/issues
- **Company Website:** https://jithvar.com

---

## 🙏 Credits

Built with ❤️ by **[Jithvar Consultancy Services](https://jithvar.com)**

Special thanks to the React community and all contributors!

---

## 🎯 Next Steps

Try the new features:

1. Visit [ui.jithvar.com](https://ui.jithvar.com) to see live demos
2. Check the [Installation Guide](https://ui.jithvar.com/installation)
3. Explore [Configuration Examples](https://ui.jithvar.com/configuration)
4. Star us on [GitHub](https://github.com/jithvar/jithvar-ui) ⭐

**Have questions or feedback?** Open an issue on GitHub or contact us at [contact@jithvar.com](mailto:contact@jithvar.com)
