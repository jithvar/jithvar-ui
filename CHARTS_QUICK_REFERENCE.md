# 📊 Jithvar UI Charts - Quick Reference

## All 20 Charts at a Glance

### 1. BarChart
**Use Case:** Compare values across categories  
**Props:** `data`, `width`, `height`, `orientation`, `showValues`, `variant3D`  
**Demo:** `/charts/bar-charts`

```tsx
<BarChart data={[{label: 'A', value: 50}]} variant3D={true} />
```

---

### 2. PieChart
**Use Case:** Show proportions of a whole  
**Props:** `data`, `width`, `height`, `showLabels`, `showPercentages`  
**Demo:** `/charts/pie-charts`

```tsx
<PieChart data={[{label: 'A', value: 30}]} />
```

---

### 3. DonutChart
**Use Case:** Pie chart with central space for info  
**Props:** `data`, `width`, `height`, `innerRadius`, `centerText`  
**Demo:** `/charts/donut-charts`

```tsx
<DonutChart data={data} innerRadius={0.6} centerText="Total" />
```

---

### 4. LineChart
**Use Case:** Show trends over time  
**Props:** `datasets`, `labels`, `width`, `height`, `smooth`  
**Demo:** `/charts/line-charts`

```tsx
<LineChart datasets={[{label: 'Sales', data: [10,20,30]}]} smooth={true} />
```

---

### 5. AreaChart
**Use Case:** Show volume trends over time  
**Props:** `datasets`, `labels`, `width`, `height`, `stacked`  
**Demo:** `/charts/area-charts`

```tsx
<AreaChart datasets={datasets} stacked={true} />
```

---

### 6. GaugeChart
**Use Case:** Display single value within a range  
**Props:** `value`, `min`, `max`, `ranges`, `width`, `height`  
**Demo:** `/charts/gauge-charts`

```tsx
<GaugeChart value={75} min={0} max={100} />
```

---

### 7. ScatterPlot
**Use Case:** Show correlation between two variables  
**Props:** `data`, `width`, `height`, `xLabel`, `yLabel`  
**Demo:** `/charts/scatter-plots`

```tsx
<ScatterPlot data={[{x: 10, y: 20, label: 'A'}]} />
```

---

### 8. BubbleChart
**Use Case:** Show 3 dimensions (x, y, size)  
**Props:** `data`, `width`, `height`, `xLabel`, `yLabel`  
**Demo:** `/charts/bubble-charts`

```tsx
<BubbleChart data={[{x: 10, y: 20, size: 30, label: 'A'}]} />
```

---

### 9. RadarChart
**Use Case:** Compare multiple variables  
**Props:** `datasets`, `labels`, `width`, `height`  
**Demo:** `/charts/radar-charts`

```tsx
<RadarChart datasets={[{label: 'Q1', data: [65,78,90]}]} />
```

---

### 10. FunnelChart
**Use Case:** Show conversion stages  
**Props:** `data`, `width`, `height`, `showPercentages`  
**Demo:** `/charts/funnel-charts`

```tsx
<FunnelChart data={[{label: 'Visitors', value: 1000}]} />
```

---

### 11. HeatmapChart
**Use Case:** Show data intensity in matrix  
**Props:** `data`, `width`, `height`, `colorScheme`  
**Demo:** `/charts/heatmap-charts`

```tsx
<HeatmapChart data={matrix} colorScheme="blue" />
```

---

### 12. StackedBarChart
**Use Case:** Compare part-to-whole relationships  
**Props:** `labels`, `datasets`, `width`, `height`, `orientation`  
**Demo:** `/charts/stacked-bar-charts`

```tsx
<StackedBarChart labels={['Q1','Q2']} datasets={datasets} />
```

---

### 13. WaterfallChart
**Use Case:** Show cumulative effect of values  
**Props:** `data`, `width`, `height`, `showConnectors`  
**Demo:** `/charts/waterfall-charts`

```tsx
<WaterfallChart data={[{label: 'Revenue', value: 1000}]} />
```

---

### 14. HistogramChart
**Use Case:** Show frequency distribution  
**Props:** `data`, `bins`, `width`, `height`, `showStats`  
**Demo:** `/charts/histogram-charts`

```tsx
<HistogramChart data={[65,78,90,82,...]} bins={10} />
```

---

### 15. CandlestickChart
**Use Case:** Financial OHLC data  
**Props:** `data`, `width`, `height`  
**Demo:** `/charts/candlestick-charts`

```tsx
<CandlestickChart data={[{date: '2025-01-01', open: 100, high: 110, low: 95, close: 105}]} />
```

---

### 16. ComboChart
**Use Case:** Mix bars and lines with dual axes  
**Props:** `labels`, `datasets`, `leftAxisLabel`, `rightAxisLabel`  
**Demo:** `/charts/combo-charts`

```tsx
<ComboChart 
  labels={['Jan','Feb']} 
  datasets={[
    {label: 'Revenue', data: [1000,1200], type: 'bar', yAxisId: 'left'},
    {label: 'Margin %', data: [22,25], type: 'line', yAxisId: 'right'}
  ]} 
/>
```

---

### 17. BoxPlotChart
**Use Case:** Show statistical distribution  
**Props:** `data`, `width`, `height`, `orientation`, `showOutliers`  
**Demo:** (Demo page to be created)

```tsx
<BoxPlotChart data={[{
  label: 'Q1',
  min: 50, q1: 60, median: 70, q3: 80, max: 90,
  outliers: [45, 95]
}]} />
```

---

### 18. BulletChart
**Use Case:** Show performance vs target  
**Props:** `data`, `width`, `height`, `orientation`  
**Demo:** (Demo page to be created)

```tsx
<BulletChart data={[{
  label: 'Revenue',
  value: 75,
  target: 100,
  ranges: [
    {label: 'Poor', value: 50, color: '#ef4444'},
    {label: 'Good', value: 80, color: '#fbbf24'},
    {label: 'Excellent', value: 100, color: '#10b981'}
  ]
}]} />
```

---

### 19. GanttChart
**Use Case:** Project timeline/scheduling  
**Props:** `tasks`, `width`, `height`, `showProgress`, `showDependencies`  
**Demo:** (Demo page to be created)

```tsx
<GanttChart tasks={[{
  id: '1',
  name: 'Design',
  start: new Date('2025-01-01'),
  end: new Date('2025-01-15'),
  progress: 80,
  dependencies: []
}]} />
```

---

### 20. HeartbeatChart
**Use Case:** Time-series with spike detection  
**Props:** `data`, `width`, `height`, `threshold`, `showBaseline`  
**Demo:** (Demo page to be created)

```tsx
<HeartbeatChart data={[
  {timestamp: new Date(), value: 72},
  {timestamp: new Date(), value: 120, isSpike: true}
]} threshold={100} />
```

---

## 🎨 Common Props (All Charts)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | varies | Chart width in pixels |
| `height` | number | varies | Chart height in pixels |
| `className` | string | '' | Additional CSS classes |
| `animated` | boolean | true | Enable animations |

---

## 📊 Chart Selection Guide

### Choose Based On Data Type:

**Single Value:**
- GaugeChart, BulletChart

**Categories:**
- BarChart, PieChart, DonutChart, FunnelChart

**Time Series:**
- LineChart, AreaChart, HeartbeatChart, GanttChart

**Comparison:**
- BarChart, StackedBarChart, RadarChart

**Distribution:**
- HistogramChart, BoxPlotChart, HeatmapChart

**Correlation:**
- ScatterPlot, BubbleChart

**Financial:**
- CandlestickChart, WaterfallChart

**Mixed Data:**
- ComboChart

---

## 🚀 Installation

```bash
npm install jithvar-ui
```

## 📦 Import

```typescript
import { 
  BarChart, 
  PieChart, 
  LineChart,
  // ... any of the 20 charts
} from 'jithvar-ui';
```

---

## 🎯 Pro Tips

1. **Performance:** Use `animated={false}` for large datasets
2. **Responsiveness:** Set width dynamically based on container
3. **Colors:** Pass custom colors via `color` prop in data
4. **Tooltips:** All charts have interactive tooltips by default
5. **TypeScript:** Import types for better IDE support

```typescript
import type { BarChartProps, PieChartDataPoint } from 'jithvar-ui';
```

---

## 📚 Full Documentation

Visit the demo app for complete examples:
```
npm run dev
# Open http://localhost:5173
```

---

**Happy Charting! 📊✨**
