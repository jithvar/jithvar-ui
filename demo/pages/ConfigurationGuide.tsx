import React from 'react';
import { CodeBlock } from '../components/CodeBlock';

export const ConfigurationGuide: React.FC = () => {
  return (
    <div className="jv-demo-page">
      <h1>⚙️ Configuration Guide</h1>
      <p className="jv-subtitle">Complete guide to configuring and customizing Jithvar UI components</p>

      <section className="jv-section">
        <h2>📋 Table of Contents</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {[
            { href: '#field-customization', icon: '🔤', title: 'Field Name Customization', desc: 'ID, Label, Value fields' },
            { href: '#css-customization', icon: '🎨', title: 'CSS Styling & Theming', desc: 'Custom styles & themes' },
            { href: '#size-customization', icon: '📐', title: 'Height, Width & Sizing', desc: 'Component dimensions' },
            { href: '#jtable-config', icon: '📊', title: 'JTable Configuration', desc: 'Table settings & features' },
            { href: '#date-picker-config', icon: '📅', title: 'DatePicker Configuration', desc: 'Date selection options' },
            { href: '#select-config', icon: '🔍', title: 'SearchableSelect', desc: 'Dropdown configuration' },
            { href: '#slider-config', icon: '🎚️', title: 'RangeSlider Configuration', desc: 'Slider customization' },
            { href: '#advanced-customization', icon: '⚡', title: 'Advanced Customization', desc: 'Advanced features' },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              style={{
                display: 'block',
                padding: '20px',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'inherit',
                border: '2px solid #bae6fd',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(14, 165, 233, 0.2)';
                e.currentTarget.style.borderColor = '#0ea5e9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#bae6fd';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#0c4a6e', marginBottom: '4px' }}>
                {index + 1}. {item.title}
              </div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>{item.desc}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="jv-section" id="field-customization">
        <h2>1. Field Name Customization</h2>
        <p>All components support custom field names for flexibility with different data structures.</p>

        <h3>JTable - Custom Row ID Field</h3>
        <CodeBlock code={`// Default: uses 'id' field as row key
<JTable
  columns={columns}
  apiUrl="/api/users"
  rowKey="id" // default
/>

// Custom: use different field as row identifier
<JTable
  columns={columns}
  apiUrl="/api/products"
  rowKey="productId" // custom field name
/>

// Example with custom field names
const columns = [
  { key: 'productId', label: 'Product ID' },
  { key: 'productName', label: 'Product Name' },
  { key: 'productPrice', label: 'Price' },
];`} />

        <h3>SearchableSelect - Custom Value & Label Fields</h3>
        <CodeBlock code={`// Default: uses 'value' and 'label' fields
<SearchableSelect
  options={[
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
/>

// Custom: use different field names
<SearchableSelect
  apiUrl="/api/users"
  value={selectedUserId}
  onChange={setSelectedUserId}
  valueKey="userId"     // instead of 'value'
  labelKey="fullName"   // instead of 'label'
/>

// With custom rendering
<SearchableSelect
  apiUrl="/api/products"
  value={selectedProduct}
  onChange={setSelectedProduct}
  valueKey="productId"
  labelKey="productName"
  renderOption={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src={option.productImage} alt="" style={{ width: '24px', height: '24px' }} />
      <div>
        <div>{option.productName}</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>{option.productCategory}</div>
      </div>
    </div>
  )}
/>`} />

        <h3>JTable - Custom Field Names for Actions</h3>
        <CodeBlock code={`// Configure field names for floating actions
<JTable
  columns={columns}
  apiUrl="/api/contacts"
  floatingActions={{
    enabled: true,
    phoneField: 'contactPhone',    // custom phone field
    emailField: 'contactEmail',    // custom email field
    urlField: 'websiteUrl',        // custom URL field
    actions: [
      { type: 'call', onClick: (row) => console.log('Call', row) },
      { type: 'email', onClick: (row) => console.log('Email', row) },
      { type: 'visit', onClick: (row) => console.log('Visit', row) },
    ],
  }}
/>`} />
      </section>

      <section className="jv-section" id="css-customization">
        <h2>2. CSS Styling & Theming</h2>
        <p>Comprehensive CSS customization using CSS variables and custom classes.</p>

        <h3>Global Theme Variables</h3>
        <CodeBlock code={`/* Override in your CSS file */
:root {
  /* Primary Colors */
  --jv-primary: #8b5cf6;              /* Purple instead of blue */
  --jv-secondary: #64748b;
  --jv-danger: #ef4444;
  --jv-success: #10b981;
  --jv-warning: #f59e0b;
  --jv-info: #06b6d4;
  
  /* Background Colors */
  --jv-bg-primary: #ffffff;
  --jv-bg-secondary: #f9fafb;
  --jv-bg-hover: #f3f4f6;
  
  /* Text Colors */
  --jv-text-primary: #111827;
  --jv-text-secondary: #6b7280;
  --jv-text-disabled: #9ca3af;
  
  /* Border & Radius */
  --jv-border-color: #e5e7eb;
  --jv-border-radius: 8px;           /* More rounded */
  
  /* Shadows */
  --jv-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --jv-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --jv-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Dark Theme Example */
.dark-theme {
  --jv-bg-primary: #1f2937;
  --jv-bg-secondary: #111827;
  --jv-bg-hover: #374151;
  --jv-text-primary: #f9fafb;
  --jv-text-secondary: #d1d5db;
  --jv-border-color: #374151;
}`} />

        <h3>Component-Specific Styling</h3>
        <CodeBlock code={`/* JTable Custom Styling */
.my-custom-table {
  /* Table Variables */
  --jv-table-header-bg: #f5f3ff;
  --jv-table-row-hover: #faf5ff;
  --jv-table-border: #e9d5ff;
  
  /* Custom styles */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-custom-table .jv-jtable-header {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
}

.my-custom-table .jv-jtable-action-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

/* DatePicker Custom Styling */
.my-custom-datepicker {
  --jv-datepicker-selected-bg: #8b5cf6;
  --jv-datepicker-selected-text: white;
  --jv-datepicker-hover-bg: #f5f3ff;
}

.my-custom-datepicker .jv-datepicker-input {
  border-radius: 12px;
  border: 2px solid #e9d5ff;
  padding: 14px;
}

/* SearchableSelect Custom Styling */
.my-custom-select {
  --jv-select-selected: #8b5cf6;
  --jv-select-hover: #f5f3ff;
}

.my-custom-select .jv-select-dropdown {
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.2);
}

/* RangeSlider Custom Styling */
.my-custom-slider {
  --jv-slider-track-active: #8b5cf6;
  --jv-slider-handle: #7c3aed;
}

.my-custom-slider .jv-slider-handle {
  width: 24px;
  height: 24px;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}`} />

        <h3>Using Custom Classes</h3>
        <CodeBlock code={`// Apply custom class to components
<JTable
  columns={columns}
  apiUrl="/api/users"
  className="my-custom-table"
/>

<DatePicker
  value={date}
  onChange={setDate}
  className="my-custom-datepicker"
/>

<SearchableSelect
  options={options}
  value={value}
  onChange={setValue}
  className="my-custom-select"
/>

<RangeSlider
  min={0}
  max={100}
  value={range}
  onChange={setRange}
  className="my-custom-slider"
/>`} />
      </section>

      <section className="jv-section" id="size-customization">
        <h2>3. Height, Width & Sizing</h2>
        <p>Control component dimensions using CSS or inline styles.</p>

        <h3>Component Width</h3>
        <CodeBlock code={`/* Method 1: Using className and CSS */
.full-width-table {
  width: 100%;
}

.fixed-width-select {
  width: 400px;
  max-width: 100%;
}

.responsive-datepicker {
  width: 100%;
  max-width: 350px;
}

<JTable className="full-width-table" {...props} />
<SearchableSelect className="fixed-width-select" {...props} />
<DatePicker className="responsive-datepicker" {...props} />

/* Method 2: Using inline styles */
<JTable
  style={{ width: '100%' }}
  {...props}
/>

<SearchableSelect
  style={{ width: '400px', maxWidth: '100%' }}
  {...props}
/>

/* Method 3: Using wrapper div */
<div style={{ width: '500px', margin: '0 auto' }}>
  <JTable {...props} />
</div>`} />

        <h3>Table Height & Scrolling</h3>
        <CodeBlock code={`/* Fixed height with scrolling */
.scrollable-table {
  max-height: 600px;
  overflow-y: auto;
}

.scrollable-table .jv-jtable-wrapper {
  max-height: inherit;
}

<div className="scrollable-table">
  <JTable {...props} />
</div>

/* Sticky header with fixed height */
.fixed-height-table {
  height: 500px;
  overflow: hidden;
}

<div className="fixed-height-table">
  <JTable
    {...props}
    stickyHeader={true}
  />
</div>`} />

        <h3>Row Height & Cell Padding</h3>
        <CodeBlock code={`/* Compact mode - smaller padding */
<JTable
  columns={columns}
  apiUrl="/api/users"
  compact={true}
/>

/* Custom row height with CSS */
.custom-row-height .jv-jtable-cell {
  padding: 16px 12px; /* Increase padding */
  line-height: 1.6;
}

.custom-row-height .jv-jtable-header-cell {
  padding: 20px 12px;
  font-size: 16px;
}

<JTable
  className="custom-row-height"
  {...props}
/>`} />

        <h3>Column Width</h3>
        <CodeBlock code={`const columns = [
  {
    key: 'id',
    label: 'ID',
    width: '80px',        // Fixed width
  },
  {
    key: 'name',
    label: 'Name',
    width: '200px',       // Fixed width
  },
  {
    key: 'email',
    label: 'Email',
    width: '25%',         // Percentage width
  },
  {
    key: 'description',
    label: 'Description',
    // No width = flexible (takes remaining space)
  },
];

/* Custom column width with CSS */
.custom-column-widths .jv-jtable-cell:nth-child(1) {
  width: 100px;
  min-width: 100px;
  max-width: 100px;
}

.custom-column-widths .jv-jtable-cell:nth-child(2) {
  width: 250px;
  min-width: 200px;
}`} />

        <h3>Responsive Sizing</h3>
        <CodeBlock code={`/* Mobile-first responsive design */
.responsive-table {
  width: 100%;
}

@media (max-width: 768px) {
  .responsive-table {
    font-size: 14px;
  }
  
  .responsive-table .jv-jtable-cell {
    padding: 8px 6px;
  }
  
  /* Hide less important columns on mobile */
  .responsive-table .jv-jtable-cell:nth-child(4),
  .responsive-table .jv-jtable-cell:nth-child(5) {
    display: none;
  }
}

@media (max-width: 480px) {
  .responsive-table {
    font-size: 12px;
  }
}`} />
      </section>

      <section className="jv-section" id="jtable-config">
        <h2>4. JTable Advanced Configuration</h2>

        <h3>Custom Row Styling</h3>
        <CodeBlock code={`// Method 1: Static class
<JTable
  rowClassName="custom-row-style"
  {...props}
/>

// Method 2: Dynamic class based on row data
<JTable
  rowClassName={(row) => {
    if (row.status === 'inactive') return 'row-inactive';
    if (row.priority === 'high') return 'row-priority-high';
    if (row.isNew) return 'row-new';
    return '';
  }}
  {...props}
/>

/* CSS for custom row classes */
.row-inactive {
  opacity: 0.6;
  background-color: #f9fafb;
}

.row-priority-high {
  background-color: #fef3c7;
  border-left: 4px solid #f59e0b;
}

.row-new {
  background-color: #dbeafe;
  font-weight: 500;
}`} />

        <h3>Custom Cell Rendering</h3>
        <CodeBlock code={`const columns = [
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: value === 'active' ? '#dcfce7' : '#fee2e2',
        color: value === 'active' ? '#16a34a' : '#dc2626',
      }}>
        {value}
      </span>
    ),
  },
  {
    key: 'avatar',
    label: 'Avatar',
    render: (value, row) => (
      <img
        src={value}
        alt={row.name}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    ),
  },
  {
    key: 'progress',
    label: 'Progress',
    render: (value) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          flex: 1,
          height: '8px',
          background: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: \`\${value}%\`,
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
            transition: 'width 0.3s ease',
          }} />
        </div>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{value}%</span>
      </div>
    ),
  },
];`} />

        <h3>Pagination Configuration</h3>
        <CodeBlock code={`<JTable
  columns={columns}
  apiUrl="/api/users"
  
  // Pagination settings
  enablePagination={true}
  defaultPageSize={25}                    // Default: 10
  pageSizeOptions={[10, 25, 50, 100]}    // Default: [10, 25, 50, 100]
/>`} />

        <h3>Search & Filter Configuration</h3>
        <CodeBlock code={`const columns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,        // Enable sorting
    searchable: true,      // Include in universal search
    filterable: true,      // Enable column filter
  },
  {
    key: 'age',
    label: 'Age',
    sortable: true,
    filterable: true,
    type: 'number',        // Range slider filter
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    sortable: true,
    filterable: true,
    type: 'date',          // Date range filter
  },
];

<JTable
  columns={columns}
  apiUrl="/api/users"
  
  // Search configuration
  enableUniversalSearch={true}
  universalSearchPlaceholder="Search users..."
  
  // Column filters
  enableColumnSearch={true}
/>`} />
      </section>

      <section className="jv-section" id="date-picker-config">
        <h2>5. DatePicker Configuration</h2>

        <h3>Date Constraints</h3>
        <CodeBlock code={`const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const oneMonthFromNow = new Date(today);
oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

// Restrict to past dates only
<DatePicker
  value={date}
  onChange={setDate}
  maxDate={today}
  placeholder="Select past date"
/>

// Restrict to future dates only
<DatePicker
  value={date}
  onChange={setDate}
  minDate={today}
  placeholder="Select future date"
/>

// Restrict to specific range
<DatePicker
  value={date}
  onChange={setDate}
  minDate={yesterday}
  maxDate={oneMonthFromNow}
  placeholder="Select within range"
/>`} />

        <h3>Date Format Customization</h3>
        <CodeBlock code={`// Custom date display format
<DatePicker
  value={date}
  onChange={setDate}
  format="DD/MM/YYYY"           // UK format
/>

<DatePicker
  value={date}
  onChange={setDate}
  format="YYYY-MM-DD"           // ISO format
/>

<DatePicker
  value={date}
  onChange={setDate}
  format="MMM DD, YYYY"         // e.g., "Nov 10, 2025"
/>`} />
      </section>

      <section className="jv-section" id="select-config">
        <h2>6. SearchableSelect Configuration</h2>

        <h3>Multiple Selection</h3>
        <CodeBlock code={`<SearchableSelect
  options={options}
  value={selectedValues}      // Array of values
  onChange={setSelectedValues}
  multiple={true}             // Enable multiple selection
  maxSelections={5}           // Limit to 5 selections
  placeholder="Select multiple options"
/>`} />

        <h3>API-Based Search</h3>
        <CodeBlock code={`<SearchableSelect
  apiUrl="/api/search/users"
  value={selectedUser}
  onChange={setSelectedUser}
  
  // Search configuration
  searchable={true}
  minSearchLength={3}          // Require 3 characters
  
  // Field mapping
  valueKey="userId"
  labelKey="fullName"
  
  // Messages
  loadingMessage="Searching..."
  noResultsMessage="No users found"
  
  // Debounce search (optional)
  searchDebounce={300}         // 300ms delay
/>`} />

        <h3>Custom Option Rendering</h3>
        <CodeBlock code={`<SearchableSelect
  apiUrl="/api/users"
  value={selectedUser}
  onChange={setSelectedUser}
  valueKey="id"
  labelKey="name"
  renderOption={(option) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '4px 0',
    }}>
      <img
        src={option.avatar}
        alt={option.name}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '500' }}>{option.name}</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          {option.email}
        </div>
      </div>
      {option.isOnline && (
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#10b981',
        }} />
      )}
    </div>
  )}
/>`} />
      </section>

      <section className="jv-section" id="slider-config">
        <h2>7. RangeSlider Configuration</h2>

        <h3>Custom Value Formatting</h3>
        <CodeBlock code={`// Currency formatting
<RangeSlider
  min={0}
  max={10000}
  step={100}
  value={priceRange}
  onChange={setPriceRange}
  formatLabel={(value) => \`$\${value.toLocaleString()}\`}
/>

// Percentage formatting
<RangeSlider
  min={0}
  max={100}
  step={5}
  value={scoreRange}
  onChange={setScoreRange}
  formatLabel={(value) => \`\${value}%\`}
/>

// Time formatting (hours)
<RangeSlider
  min={0}
  max={24}
  step={1}
  value={timeRange}
  onChange={setTimeRange}
  formatLabel={(value) => {
    const hour = value % 12 || 12;
    const ampm = value < 12 ? 'AM' : 'PM';
    return \`\${hour}:00 \${ampm}\`;
  }}
/>`} />

        <h3>Color Customization</h3>
        <CodeBlock code={`<RangeSlider
  min={0}
  max={100}
  value={range}
  onChange={setRange}
  trackColor="#8b5cf6"         // Purple track
  handleColor="#7c3aed"        // Purple handles
  showTooltip={true}
/>`} />
      </section>

      <section className="jv-section" id="advanced-customization">
        <h2>8. Advanced Customization</h2>

        <h3>Complete Custom Theme Example</h3>
        <CodeBlock code={`/* custom-theme.css */
.purple-theme {
  /* Override all color variables */
  --jv-primary: #8b5cf6;
  --jv-primary-hover: #7c3aed;
  --jv-secondary: #64748b;
  --jv-danger: #ef4444;
  --jv-success: #10b981;
  --jv-warning: #f59e0b;
  --jv-info: #06b6d4;
  
  /* Custom shadows with purple tint */
  --jv-shadow-md: 0 4px 6px rgba(139, 92, 246, 0.1);
  --jv-shadow-lg: 0 10px 15px rgba(139, 92, 246, 0.15);
}

.purple-theme .jv-jtable-action-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.purple-theme .jv-daterangepicker-apply-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.purple-theme .jv-calendar-day-start,
.purple-theme .jv-calendar-day-end {
  background: #8b5cf6 !important;
}

.purple-theme .jv-slider-track-active {
  background: #8b5cf6;
}

/* Usage */
<div className="purple-theme">
  <JTable {...props} />
  <DatePicker {...props} />
  <SearchableSelect {...props} />
  <RangeSlider {...props} />
</div>`} />

        <h3>Component Composition</h3>
        <CodeBlock code={`// Create reusable styled components
import { JTable } from 'jithvar-ui';
import './custom-theme.css';

export const CustomTable = (props) => {
  return (
    <JTable
      className="purple-theme custom-table"
      striped={true}
      hover={true}
      {...props}
    />
  );
};

export const CustomDatePicker = (props) => {
  return (
    <DatePicker
      className="purple-theme custom-datepicker"
      {...props}
    />
  );
};

// Use in your app
<CustomTable columns={columns} apiUrl="/api/users" />
<CustomDatePicker value={date} onChange={setDate} />`} />

        <h3>Accessing Internal Elements</h3>
        <CodeBlock code={`/* Target specific internal elements with CSS */

/* Table header styling */
.my-table .jv-jtable-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Table row alternating colors */
.my-table .jv-jtable-row:nth-child(odd) {
  background-color: #f9fafb;
}

.my-table .jv-jtable-row:nth-child(even) {
  background-color: white;
}

/* Action button spacing */
.my-table .jv-jtable-actions {
  gap: 12px;
}

/* Pagination button styling */
.my-table .jv-jtable-pagination-btn {
  border-radius: 8px;
  padding: 8px 16px;
}

/* Calendar date cells */
.my-datepicker .jv-calendar-day {
  border-radius: 8px;
  font-weight: 500;
}

/* Select dropdown */
.my-select .jv-select-dropdown {
  border: 2px solid #8b5cf6;
  border-radius: 12px;
}

/* Slider handles */
.my-slider .jv-slider-handle {
  width: 24px;
  height: 24px;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}`} />
      </section>

      <section className="jv-section">
        <h2>💡 Best Practices</h2>
        <div className="jv-info-box">
          <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
            <li><strong>Use CSS Variables:</strong> For easier theming, use CSS variables instead of hardcoding colors</li>
            <li><strong>Responsive Design:</strong> Always test components on different screen sizes</li>
            <li><strong>Performance:</strong> Use React.memo for custom cell renderers in tables</li>
            <li><strong>Accessibility:</strong> Components include ARIA attributes, don't override them</li>
            <li><strong>Custom Classes:</strong> Prefix your custom classes to avoid conflicts</li>
            <li><strong>Type Safety:</strong> Use TypeScript interfaces for better development experience</li>
            <li><strong>Testing:</strong> Test all customizations in different browsers</li>
          </ul>
        </div>
      </section>

      <section className="jv-section">
        <h2>📚 Additional Resources</h2>
        <ul className="jv-feature-list">
          <li><a href="#/">Component Examples</a> - See all components in action</li>
          <li><strong>COMPONENTS_GUIDE.md</strong> - Detailed API documentation</li>
          <li><strong>VISUAL_GUIDE.md</strong> - Visual styling reference</li>
          <li><strong>API_GUIDE.md</strong> - Server integration guide</li>
        </ul>
      </section>
    </div>
  );
};
