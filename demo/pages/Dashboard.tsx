import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface ComponentCard {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  category: 'input' | 'data' | 'feedback' | 'picker';
}

export const Dashboard: React.FC = () => {
  const components: ComponentCard[] = [
    // Input Components
    {
      title: 'Checkbox',
      description: 'Stylish checkboxes with multiple variants and colors',
      icon: '☑️',
      path: '/checkbox',
      color: 'primary',
      category: 'input',
    },
    {
      title: 'Checkbox List',
      description: 'Multiple checkboxes with select-all functionality',
      icon: '📋',
      path: '/checkbox-list',
      color: 'success',
      category: 'input',
    },
    {
      title: 'Radio Button',
      description: 'Modern radio buttons with smooth animations',
      icon: '🔘',
      path: '/radio',
      color: 'info',
      category: 'input',
    },
    {
      title: 'Radio Group',
      description: 'Group of radio buttons for single selection',
      icon: '📻',
      path: '/radio-group',
      color: 'purple',
      category: 'input',
    },
    {
      title: 'Toggle Buttons',
      description: 'Segmented control for single or multiple selection',
      icon: '🎚️',
      path: '/toggle-buttons',
      color: 'warning',
      category: 'input',
    },
    {
      title: 'Searchable Select',
      description: 'Advanced dropdown with search and multi-select',
      icon: '🔍',
      path: '/searchable-select',
      color: 'primary',
      category: 'input',
    },
    // Picker Components
    {
      title: 'Date Picker',
      description: 'Single date selection with calendar',
      icon: '📅',
      path: '/date-picker',
      color: 'info',
      category: 'picker',
    },
    {
      title: 'Date Range Picker',
      description: 'Select date ranges with intuitive interface',
      icon: '📆',
      path: '/date-range-picker',
      color: 'success',
      category: 'picker',
    },
    {
      title: 'Range Slider',
      description: 'Interactive range slider for numeric values',
      icon: '🎚️',
      path: '/range-slider',
      color: 'purple',
      category: 'picker',
    },
    // Data Components
    {
      title: 'JTable',
      description: 'Advanced data table with server-side operations',
      icon: '📊',
      path: '/jtable',
      color: 'primary',
      category: 'data',
    },
    // Feedback Components
    {
      title: 'JAlerts',
      description: 'Beautiful alert dialogs with animations',
      icon: '🚨',
      path: '/jalerts',
      color: 'danger',
      category: 'feedback',
    },
  ];

  const categories = [
    { key: 'input', label: 'Input Components', icon: '📝', color: '#3b82f6' },
    { key: 'picker', label: 'Pickers & Sliders', icon: '🎯', color: '#10b981' },
    { key: 'data', label: 'Data Display', icon: '📊', color: '#8b5cf6' },
    { key: 'feedback', label: 'Feedback', icon: '💬', color: '#ef4444' },
  ];

  const getColorClass = (color: string): string => {
    return `card-${color}`;
  };

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-emoji">🎨</span>
            Jithvar UI Components
          </h1>
          <p className="hero-subtitle">
            Beautiful, modern, and highly customizable React components for building stunning user interfaces
          </p>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">{components.length}</div>
              <div className="stat-label">Components</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">TypeScript</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">Color Themes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      {categories.map((category) => {
        const categoryComponents = components.filter((c) => c.category === category.key);
        if (categoryComponents.length === 0) return null;

        return (
          <section key={category.key} className="dashboard-category">
            <div className="category-header">
              <h2 className="category-title">
                <span className="category-icon">{category.icon}</span>
                {category.label}
              </h2>
              <div className="category-count">{categoryComponents.length} components</div>
            </div>

            <div className="components-grid">
              {categoryComponents.map((component) => (
                <Link
                  key={component.path}
                  to={component.path}
                  className={`component-card ${getColorClass(component.color)}`}
                >
                  <div className="card-icon">{component.icon}</div>
                  <div className="card-content">
                    <h3 className="card-title">{component.title}</h3>
                    <p className="card-description">{component.description}</p>
                  </div>
                  <div className="card-arrow">→</div>
                  <div className="card-glow"></div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Quick Links Section */}
      <section className="dashboard-quick-links">
        <h2 className="quick-links-title">Quick Links</h2>
        <div className="quick-links-grid">
          <Link to="/installation" className="quick-link-card">
            <span className="quick-link-icon">📦</span>
            <div>
              <h3>Installation</h3>
              <p>Get started with Jithvar UI</p>
            </div>
          </Link>
          <Link to="/configuration" className="quick-link-card">
            <span className="quick-link-icon">⚙️</span>
            <div>
              <h3>Configuration</h3>
              <p>Configure your components</p>
            </div>
          </Link>
          <a
            href="https://github.com/yourusername/jithvar-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="quick-link-card"
          >
            <span className="quick-link-icon">💻</span>
            <div>
              <h3>GitHub</h3>
              <p>View source code</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
