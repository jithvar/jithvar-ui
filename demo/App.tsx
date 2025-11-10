import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './demo.css';
import { ScrollToTop } from './components/ScrollToTop';

// Page components
import { Dashboard } from './pages/Dashboard';
import { Installation } from './pages/Installation';
import JAlertsDemo from './pages/JAlertsDemo';
import { DateRangePickerDemo } from './pages/DateRangePickerDemo';
import { DatePickerDemo } from './pages/DatePickerDemo';
import { SearchableSelectDemo } from './pages/SearchableSelectDemo';
import { RangeSliderDemo } from './pages/RangeSliderDemo';
import { JTableDemo } from './pages/JTableDemo';
import { ConfigurationGuide } from './pages/ConfigurationGuide';
import { CheckboxDemo } from './pages/CheckboxDemo';
import { CheckboxListDemo } from './pages/CheckboxListDemo';
import { RadioGroupDemo } from './pages/RadioGroupDemo';
import { ToggleButtonsDemo } from './pages/ToggleButtonsDemo';
import { TabsDemo } from './pages/TabsDemo';
import { CollapseDemo } from './pages/CollapseDemo';
import { MaskInputDemo } from './pages/MaskInputDemo';
import { BarChartDemo } from './pages/BarChartDemo';
import { PieChartDemo } from './pages/PieChartDemo';
import { DonutChartDemo } from './pages/DonutChartDemo';
import { LineChartDemo } from './pages/LineChartDemo';
import { AreaChartDemo } from './pages/AreaChartDemo';
import { GaugeChartDemo } from './pages/GaugeChartDemo';
import { ScatterPlotDemo } from './pages/ScatterPlotDemo';
import { BubbleChartDemo } from './pages/BubbleChartDemo';
import { RadarChartDemo } from './pages/RadarChartDemo';
import { FunnelChartDemo } from './pages/FunnelChartDemo';
import { HeatmapChartDemo } from './pages/HeatmapChartDemo';
import { StackedBarChartDemo } from './pages/StackedBarChartDemo';
import { WaterfallChartDemo } from './pages/WaterfallChartDemo';
import { HistogramChartDemo } from './pages/HistogramChartDemo';
import { CandlestickChartDemo } from './pages/CandlestickChartDemo';
import ComboChartDemo from './pages/ComboChartDemo';

const navItems = [
  { path: '/', label: '🏠 Dashboard', component: Dashboard },
  { path: '/installation', label: '📦 Installation', component: Installation },
  { 
    category: 'Input Components',
    items: [
      { path: '/checkbox', label: '☑️ Checkbox', component: CheckboxDemo },
      { path: '/checkbox-list', label: '📋 Checkbox List', component: CheckboxListDemo },
      { path: '/radio-group', label: '📻 Radio Group', component: RadioGroupDemo },
      { path: '/toggle-buttons', label: '🎚️ Toggle Buttons', component: ToggleButtonsDemo },
      { path: '/searchable-select', label: '🔍 Searchable Select', component: SearchableSelectDemo },
      { path: '/mask-input', label: '🎭 Mask Input', component: MaskInputDemo },
    ]
  },
  {
    category: 'Pickers & Sliders',
    items: [
      { path: '/date-picker', label: '📅 Date Picker', component: DatePickerDemo },
      { path: '/date-range-picker', label: '📆 Date Range Picker', component: DateRangePickerDemo },
      { path: '/range-slider', label: '🎚️ Range Slider', component: RangeSliderDemo },
    ]
  },
  {
    category: 'Content & Layout',
    items: [
      { path: '/tabs', label: '📑 Tabs', component: TabsDemo },
      { path: '/collapse', label: '📂 Collapse', component: CollapseDemo },
    ]
  },
  {
    category: 'Data & Feedback',
    items: [
      { path: '/jtable', label: '📊 JTable', component: JTableDemo },
      { path: '/jalerts', label: '🚨 JAlerts', component: JAlertsDemo },
    ]
  },
  {
    category: 'Charts',
    items: [
      { path: '/charts/bar-charts', label: '📊 Bar Charts', component: BarChartDemo },
      { path: '/charts/pie-charts', label: '🥧 Pie Charts', component: PieChartDemo },
      { path: '/charts/donut-charts', label: '🍩 Donut Charts', component: DonutChartDemo },
      { path: '/charts/line-charts', label: '📈 Line Charts', component: LineChartDemo },
      { path: '/charts/area-charts', label: '📉 Area Charts', component: AreaChartDemo },
      { path: '/charts/gauge-charts', label: '🎯 Gauge Charts', component: GaugeChartDemo },
      { path: '/charts/scatter-plots', label: '🔵 Scatter Plots', component: ScatterPlotDemo },
      { path: '/charts/bubble-charts', label: '🫧 Bubble Charts', component: BubbleChartDemo },
      { path: '/charts/radar-charts', label: '🕸️ Radar Charts', component: RadarChartDemo },
      { path: '/charts/funnel-charts', label: '🔻 Funnel Charts', component: FunnelChartDemo },
      { path: '/charts/heatmap-charts', label: '🔥 Heatmap Charts', component: HeatmapChartDemo },
      { path: '/charts/stacked-bar-charts', label: '📊 Stacked Bar Charts', component: StackedBarChartDemo },
      { path: '/charts/waterfall-charts', label: '💧 Waterfall Charts', component: WaterfallChartDemo },
      { path: '/charts/histogram-charts', label: '📊 Histogram Charts', component: HistogramChartDemo },
      { path: '/charts/candlestick-charts', label: '🕯️ Candlestick Charts', component: CandlestickChartDemo },
      { path: '/charts/combo-charts', label: '🔀 Combo Charts', component: ComboChartDemo },
    ]
  },
  { path: '/configuration', label: '⚙️ Configuration', component: ConfigurationGuide },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Auto-expand category containing the current route
  useEffect(() => {
    const currentCategory = navItems.find((item: any) => {
      if (item.category && item.items) {
        return item.items.some((subItem: any) => subItem.path === location.pathname);
      }
      return false;
    });

    if (currentCategory && currentCategory.category) {
      setExpandedCategories(prev => ({
        ...prev,
        [currentCategory.category]: true
      }));
    }
  }, [location.pathname]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderNavItem = (item: any, index: number) => {
    if (item.category) {
      const isExpanded = expandedCategories[item.category];
      return (
        <div key={index} className="jv-sidebar-category">
          <button 
            className="jv-sidebar-category-label"
            onClick={() => toggleCategory(item.category)}
          >
            <span className="jv-sidebar-category-icon">
              {isExpanded ? '▼' : '▶'}
            </span>
            <span>{item.category}</span>
          </button>
          {isExpanded && (
            <div className="jv-sidebar-submenu">
              {item.items.map((subItem: any) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={`jv-sidebar-link jv-sidebar-sublink ${location.pathname === subItem.path ? 'active' : ''}`}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`jv-sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
      >
        {item.label}
      </Link>
    );
  };
  
  return (
    <div className="jv-sidebar">
      <div className="jv-sidebar-header">
        <h1>🎨 Jithvar UI</h1>
        <p className="jv-sidebar-version">v1.0.0</p>
      </div>
      <nav className="jv-sidebar-nav">
        {navItems.map((item, index) => renderNavItem(item, index))}
      </nav>
      <div className="jv-sidebar-footer">
        <a href="https://jithvar.com" target="_blank" rel="noopener noreferrer" title="Jithvar - Parent Company">
          🏢 Jithvar
        </a>
        <a href="https://github.com/yourusername/jithvar-ui" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/jithvar-ui" target="_blank" rel="noopener noreferrer">
          npm
        </a>
      </div>
    </div>
  );
};

const TopBar: React.FC = () => {
  return (
    <div className="jv-topbar">
      <div className="jv-topbar-title">
        <h2>Jithvar UI Component Library</h2>
      </div>
      <div className="jv-topbar-actions">
        <a href="https://jithvar.com" target="_blank" rel="noopener noreferrer" className="jv-topbar-link">
          🏢 Jithvar
        </a>
        <a href="https://github.com/yourusername/jithvar-ui" target="_blank" rel="noopener noreferrer" className="jv-topbar-link">
          ⭐ GitHub
        </a>
        <a href="https://www.npmjs.com/package/jithvar-ui" target="_blank" rel="noopener noreferrer" className="jv-topbar-link">
          📦 npm
        </a>
        <a href="#" className="jv-topbar-link">
          📖 Docs
        </a>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  // Flatten all routes for rendering
  const allRoutes: any[] = [];
  navItems.forEach((item: any) => {
    if (item.category && item.items) {
      allRoutes.push(...item.items);
    } else if (item.path) {
      allRoutes.push(item);
    }
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="jv-demo-container">
        <Sidebar />
        <div className="jv-demo-content-wrapper">
          <TopBar />
          <main className="jv-demo-main">
            <Routes>
              {allRoutes.map((item) => (
                <Route key={item.path} path={item.path} element={<item.component />} />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};
