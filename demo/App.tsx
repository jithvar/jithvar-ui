import React from 'react';
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
    category: 'Data & Feedback',
    items: [
      { path: '/jtable', label: '📊 JTable', component: JTableDemo },
      { path: '/jalerts', label: '🚨 JAlerts', component: JAlertsDemo },
    ]
  },
  { path: '/configuration', label: '⚙️ Configuration', component: ConfigurationGuide },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const renderNavItem = (item: any, index: number) => {
    if (item.category) {
      return (
        <div key={index} className="jv-sidebar-category">
          <div className="jv-sidebar-category-label">{item.category}</div>
          {item.items.map((subItem: any) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className={`jv-sidebar-link ${location.pathname === subItem.path ? 'active' : ''}`}
            >
              {subItem.label}
            </Link>
          ))}
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
        <main className="jv-demo-main">
          <Routes>
            {allRoutes.map((item) => (
              <Route key={item.path} path={item.path} element={<item.component />} />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
