import React, { useState, useEffect } from 'react';
import { JTable, JTableColumn, JTableAction } from '../../src';
import { CodeBlock } from '../components/CodeBlock';
import { mockAPI } from '../mockAPI';
import SkeletonLoader from '../components/SkeletonLoader';

// Override fetch for the demo
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  if (url.includes('mock-api/users')) {
    return mockAPI.createFetchFunction()(url);
  }
  return originalFetch(input, init);
};

export const JTableDemo: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [loadingSections, setLoadingSections] = useState({
    header: true,
    table: true,
    features: true,
  });

  // Simulate progressive loading
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, header: false }));
    }, 300));
    
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, table: false }));
    }, 600));
    
    timeouts.push(setTimeout(() => {
      setLoadingSections(prev => ({ ...prev, features: false }));
    }, 900));

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  const columns: JTableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      filterable: true,
      type: 'number',
      width: '80px',
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      searchable: true,
      filterable: true,
      render: (value, row) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ fontWeight: '500' }}>{row.name}</div>
          <div style={{ fontSize: '0.85em', color: '#666' }}>{row.designation}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      searchable: true,
      filterable: true,
    },
    {
      key: 'phone',
      label: 'Phone',
      searchable: true,
      filterable: true,
    },
    {
      key: 'age',
      label: 'Age',
      sortable: true,
      filterable: true,
      type: 'number',
      width: '100px',
    },
    {
      key: 'city',
      label: 'City',
      sortable: true,
      searchable: true,
      filterable: true,
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      filterable: true,
      type: 'date',
      width: '140px',
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      },
    },
  ];

  const actions: JTableAction[] = [
    {
      icon: '👁️',
      tooltip: 'View Details',
      onClick: (row) => alert(`View details for ${row.name}`),
      variant: 'primary',
    },
    {
      icon: '✏️',
      tooltip: 'Edit',
      onClick: (row) => alert(`Edit ${row.name}`),
      variant: 'secondary',
    },
    {
      icon: '🗑️',
      tooltip: 'Delete',
      onClick: (row) => {
        if (confirm(`Delete ${row.name}?`)) {
          alert('Deleted!');
        }
      },
      variant: 'danger',
    },
  ];

  const basicExample = `import { JTable, JTableColumn } from 'jithvar-ui';

const columns: JTableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, type: 'number' },
  { key: 'name', label: 'Name', sortable: true, searchable: true },
  { key: 'email', label: 'Email', searchable: true },
];

<JTable
  columns={columns}
  apiUrl="https://api.example.com/users"
  enableUniversalSearch={true}
  enablePagination={true}
/>`;

  const floatingActionsExample = `import { JTable, JTableColumn, JTableFloatingConfig } from 'jithvar-ui';

const floatingActions: JTableFloatingConfig = {
  enabled: true,
  phoneField: 'phone',
  emailField: 'email',
  urlField: 'website',
  actions: [
    {
      type: 'copy',
      onClick: (row) => {
        navigator.clipboard.writeText(JSON.stringify(row));
        alert('Row data copied!');
      },
    },
    {
      type: 'view',
      onClick: (row) => window.open(\`/users/\${row.id}\`, '_blank'),
    },
    {
      type: 'edit',
      onClick: (row) => navigate(\`/users/\${row.id}/edit\`),
    },
    {
      type: 'delete',
      onClick: (row) => deleteUser(row.id),
      visible: (row) => row.canDelete, // Conditional visibility
    },
    {
      type: 'call',
      onClick: (row) => window.location.href = \`tel:\${row.phone}\`,
    },
    {
      type: 'email',
      onClick: (row) => window.location.href = \`mailto:\${row.email}\`,
    },
    {
      type: 'visit',
      onClick: (row) => window.open(row.website, '_blank'),
    },
    {
      type: 'custom',
      icon: '⭐',
      tooltip: 'Add to Favorites',
      onClick: (row) => addToFavorites(row.id),
    },
  ],
};

<JTable
  columns={columns}
  apiUrl="https://api.example.com/users"
  floatingActions={floatingActions}
/>`;

  const columnActionsExample = `const actions: JTableAction[] = [
  {
    icon: '👁️',
    tooltip: 'View Details',
    onClick: (row) => viewDetails(row.id),
    variant: 'primary',
  },
  {
    icon: '✏️',
    tooltip: 'Edit',
    onClick: (row) => editRow(row),
    variant: 'secondary',
    disabled: (row) => !row.editable, // Conditional disable
  },
  {
    icon: '🗑️',
    tooltip: 'Delete',
    onClick: (row) => deleteRow(row.id),
    variant: 'danger',
    visible: (row) => row.canDelete, // Conditional visibility
  },
];

<JTable
  columns={columns}
  apiUrl="https://api.example.com/users"
  actions={actions}
  actionColumnPosition="right"
/>`;

  return (
    <div className="jv-demo-page">
      {loadingSections.header ? (
        <div style={{ marginBottom: '32px' }}>
          <SkeletonLoader type="section" count={1} />
        </div>
      ) : (
        <>
          <h1>📊 JTable</h1>
          <p className="jv-subtitle">Advanced data table with server-side operations and floating actions</p>
        </>
      )}

      {loadingSections.table ? (
        <SkeletonLoader type="table" />
      ) : (
        <section className="jv-section">
          <h2>🎈 Live Demo - Floating Actions</h2>
          <p><strong>Hover over any row</strong> to see the floating action buttons appear on the left side!</p>
          <div className="jv-demo-preview">
          <JTable
            columns={columns}
            apiUrl="https://mock-api/users"
            enableUniversalSearch={true}
            enableColumnSearch={true}
            enableSelection={true}
            enablePagination={true}
            actions={[
              {
                icon: '👁️',
                tooltip: 'View details',
                variant: 'primary',
                onClick: (row) => alert(`View ${row.name}`),
              },
              {
                icon: '✏️',
                tooltip: 'Edit record',
                variant: 'warning',
                onClick: (row) => alert(`Edit ${row.name}`),
              },
              {
                icon: '🗑️',
                tooltip: 'Delete record',
                variant: 'danger',
                onClick: (row) => {
                  if (confirm(`Delete ${row.name}?`)) {
                    alert('Deleted!');
                  }
                },
                visible: (row) => row.id <= 7, // Show delete for first 7 rows
              },
              {
                icon: '📄',
                tooltip: 'Duplicate record',
                variant: 'secondary',
                onClick: (row) => alert(`Duplicate ${row.name}`),
                visible: (row) => row.id <= 5, // Show duplicate for first 5 rows
              },
              {
                icon: '📧',
                tooltip: 'Send email',
                variant: 'info',
                onClick: (row) => alert(`Email to ${row.email}`),
                visible: (row) => row.id <= 3, // Show email for first 3 rows
              },
              {
                icon: '🔒',
                tooltip: 'Lock record',
                variant: 'warning',
                onClick: (row) => alert(`Lock ${row.name}`),
                visible: (row) => row.id <= 2, // Show lock for first 2 rows
              },
            ]}
            actionColumnPosition="right"
            floatingActions={{
              enabled: true,
              phoneField: 'phone',
              emailField: 'email',
              actions: [
                {
                  type: 'copy',
                  variant: 'info',
                  onClick: () => {
                    // Message is now handled automatically in JTable
                  },
                },
                {
                  type: 'view',
                  variant: 'primary',
                  onClick: (row) => alert(`View details for ${row.name}`),
                },
                {
                  type: 'edit',
                  variant: 'warning',
                  onClick: (row) => alert(`Edit ${row.name}`),
                },
                {
                  type: 'delete',
                  variant: 'danger',
                  onClick: (row) => {
                    if (confirm(`Delete ${row.name}?`)) {
                      alert('Deleted successfully!');
                    }
                  },
                },
                {
                  type: 'call',
                  variant: 'success',
                  onClick: (row) => alert(`Calling ${row.phone}...`),
                },
                {
                  type: 'email',
                  variant: 'secondary',
                  onClick: (row) => alert(`Opening email client for ${row.email}...`),
                },
              ],
            }}
            onSelectionChange={setSelectedRows}
            bulkActions={[
              {
                label: 'Export',
                icon: '📥',
                variant: 'primary',
                onClick: (rows) => alert(`Exporting ${rows.length} rows`),
                tooltip: 'Export selected rows',
              },
              {
                label: 'Delete',
                icon: '🗑️',
                variant: 'danger',
                onClick: (rows) => {
                  if (confirm(`Delete ${rows.length} selected rows?`)) {
                    alert('Deleted!');
                  }
                },
                tooltip: 'Delete selected rows',
              },
              {
                label: 'Archive',
                icon: '📦',
                variant: 'secondary',
                onClick: (rows) => alert(`Archiving ${rows.length} rows`),
                tooltip: 'Archive selected rows',
              },
            ]}
            striped={true}
            hover={true}
          />
          </div>
          {selectedRows.length > 0 && (
            <div className="jv-info-box">
              Selected {selectedRows.length} row(s): {selectedRows.map(r => r.name).join(', ')}
            </div>
          )}
          <div className="jv-info-box" style={{ marginTop: '16px', background: '#fef3c7', borderLeft: '4px solid #f59e0b' }}>
            <strong>💡 Note:</strong> Floating actions appear to the <strong>left of each row</strong> when you hover over it. Each button has a different color based on its variant (info=cyan, primary=blue, warning=orange, danger=red, success=green, secondary=gray).
          </div>
        </section>
      )}

      {loadingSections.table ? (
        <SkeletonLoader type="table" />
      ) : (
        <section className="jv-section">
          <h2>📍 Live Demo - Action Column</h2>
          <p>Traditional action buttons in a dedicated column (always visible).</p>
          <div className="jv-demo-preview">
            <JTable
              columns={columns}
              apiUrl="https://mock-api/users"
              enableUniversalSearch={true}
              enableColumnSearch={true}
              enableSelection={true}
              enablePagination={true}
              actions={actions}
              onSelectionChange={setSelectedRows}
              striped={true}
              hover={true}
            />
          </div>
          <div className="jv-info-box" style={{ marginTop: '16px' }}>
            <strong>📍 Action Column:</strong> These buttons are always visible in a dedicated column on the right side. Use this when you want actions to be immediately visible without hovering.
          </div>
        </section>
      )}

      {loadingSections.features ? (
        <SkeletonLoader type="section" count={2} />
      ) : (
        <>
          <section className="jv-section">
            <h2>📝 Basic Usage</h2>
            <p>Minimal setup with essential features: sorting, searching, and pagination.</p>
            <CodeBlock code={basicExample} />
            <div className="jv-info-box">
              <strong>✅ What it includes:</strong> Universal search, sortable columns, and pagination
            </div>
          </section>

          <section className="jv-section">
            <h2>🎨 Advanced Usage - With All Features</h2>
        <p>Comprehensive example showcasing all available features including filters, date ranges, and custom rendering.</p>
        <CodeBlock code={`import { JTable, JTableColumn } from 'jithvar-ui';

const AdvancedExample = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns: JTableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true, type: 'number', width: '80px' },
    { 
      key: 'name', 
      label: 'Name', 
      sortable: true, 
      searchable: true,
      filterable: true,
      render: (value, row) => (
        <strong style={{ color: row.status === 'active' ? 'green' : 'gray' }}>
          {value}
        </strong>
      )
    },
    { key: 'email', label: 'Email', searchable: true, filterable: true },
    { key: 'phone', label: 'Phone', searchable: true, filterable: true },
    { key: 'age', label: 'Age', sortable: true, filterable: true, type: 'number' },
    { key: 'city', label: 'City', sortable: true, searchable: true, filterable: true },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      filterable: true,
      type: 'date',
      render: (value) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
  ];

  const actions = [
    {
      icon: '👁️',
      tooltip: 'View Details',
      onClick: (row) => console.log('View', row),
      variant: 'primary',
    },
    {
      icon: '✏️',
      tooltip: 'Edit',
      onClick: (row) => console.log('Edit', row),
      variant: 'secondary',
    },
    {
      icon: '🗑️',
      tooltip: 'Delete',
      onClick: (row) => console.log('Delete', row),
      variant: 'danger',
    },
  ];

  return (
    <JTable
      columns={columns}
      apiUrl="https://api.example.com/users"
      actions={actions}
      enableUniversalSearch={true}
      enableColumnSearch={true}
      enableSelection={true}
      enablePagination={true}
      onSelectionChange={setSelectedRows}
      striped={true}
      hover={true}
    />
  );
};`} />
        <div className="jv-info-box">
          <strong>🎯 Advanced Features:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li><strong>Date Range Filter:</strong> Filter by join date range using the date picker</li>
            <li><strong>Number Range Filter:</strong> Use the range slider for age filtering</li>
            <li><strong>Custom Rendering:</strong> Name column has conditional coloring</li>
            <li><strong>Multiple Filters:</strong> Combine universal search with column-specific filters</li>
            <li><strong>Action Buttons:</strong> With gradient styling and tooltips</li>
          </ul>
        </div>
      </section>

      <section className="jv-section">
        <h2>🎈 Floating Actions</h2>
        <p>Floating actions appear to the left of rows when hovering. Perfect for quick actions without cluttering the table. <strong>Note:</strong> Floating actions are automatically disabled when action column is present.</p>
        <CodeBlock code={floatingActionsExample} />
        <div className="jv-info-box">
          <strong>💡 Tips:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Floating actions show vertically aligned icons with tooltips</li>
            <li>They appear to the left of the row for better UX</li>
            <li>Automatically hidden when action column exists to prevent overlap</li>
            <li>Support conditional visibility and disabled states</li>
            <li>Built-in actions: copy, view, edit, delete, call, email, visit</li>
          </ul>
        </div>
      </section>

      <section className="jv-section">
        <h2>📍 Column Actions</h2>
        <p>Traditional action buttons displayed in a dedicated column. Use these for always-visible actions.</p>
        <CodeBlock code={columnActionsExample} />
        <div className="jv-info-box">
          <strong>🎨 Action Button Variants:</strong> primary (blue), secondary (gray), danger (red), success (green), warning (orange), info (cyan), ghost (transparent)
        </div>
      </section>

      <section className="jv-section">
        <h2>Features</h2>
        <ul className="jv-feature-list">
          <li>✅ Server-side pagination, sorting, and filtering</li>
          <li>✅ Universal search across all columns</li>
          <li>✅ Individual column filters (text, number range, date range)</li>
          <li>✅ Row selection (single/multiple)</li>
          <li>✅ Column visibility toggle</li>
          <li>✅ URL state management (shareable links)</li>
          <li>✅ Floating action buttons on hover</li>
          <li>✅ Built-in actions: copy, view, edit, delete, call, email, visit</li>
          <li>✅ Custom action buttons with icons and tooltips</li>
          <li>✅ Conditional action visibility/disabled state</li>
          <li>✅ Striped, bordered, compact, sticky header modes</li>
          <li>✅ Fully customizable with CSS classes</li>
          <li>✅ TypeScript support</li>
        </ul>
      </section>

      <section className="jv-section">
        <h2>Built-in Floating Actions</h2>
        <table className="jv-simple-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Icon</th>
              <th>Description</th>
              <th>Requirements</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>copy</code></td>
              <td>📋</td>
              <td>Copy row data to clipboard</td>
              <td>None</td>
            </tr>
            <tr>
              <td><code>view</code></td>
              <td>👁️</td>
              <td>View details</td>
              <td>None</td>
            </tr>
            <tr>
              <td><code>edit</code></td>
              <td>✏️</td>
              <td>Edit row</td>
              <td>None</td>
            </tr>
            <tr>
              <td><code>delete</code></td>
              <td>🗑️</td>
              <td>Delete row</td>
              <td>None</td>
            </tr>
            <tr>
              <td><code>call</code></td>
              <td>📞</td>
              <td>Initiate phone call</td>
              <td>Requires <code>phoneField</code></td>
            </tr>
            <tr>
              <td><code>email</code></td>
              <td>✉️</td>
              <td>Send email</td>
              <td>Requires <code>emailField</code></td>
            </tr>
            <tr>
              <td><code>visit</code></td>
              <td>🔗</td>
              <td>Open URL</td>
              <td>Requires <code>urlField</code></td>
            </tr>
            <tr>
              <td><code>custom</code></td>
              <td>Custom</td>
              <td>Your custom action</td>
              <td>Provide custom <code>icon</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="jv-section">
        <h2>Props</h2>
        <div className="jv-props-table">
          <div className="jv-prop">
            <code>columns</code>
            <span className="jv-prop-type">JTableColumn[]</span>
            <p>Column definitions</p>
          </div>
          <div className="jv-prop">
            <code>apiUrl</code>
            <span className="jv-prop-type">string</span>
            <p>API endpoint for fetching data</p>
          </div>
          <div className="jv-prop">
            <code>floatingActions</code>
            <span className="jv-prop-type">JTableFloatingConfig</span>
            <p>Floating action buttons configuration</p>
          </div>
          <div className="jv-prop">
            <code>actions</code>
            <span className="jv-prop-type">JTableAction[]</span>
            <p>Column action buttons</p>
          </div>
          <div className="jv-prop">
            <code>enableUniversalSearch</code>
            <span className="jv-prop-type">boolean</span>
            <p>Enable search across all columns (default: true)</p>
          </div>
          <div className="jv-prop">
            <code>enableSelection</code>
            <span className="jv-prop-type">boolean</span>
            <p>Enable row selection (default: true)</p>
          </div>
          <div className="jv-prop">
            <code>striped</code>
            <span className="jv-prop-type">boolean</span>
            <p>Striped row styling (default: false)</p>
          </div>
          <div className="jv-prop">
            <code>hover</code>
            <span className="jv-prop-type">boolean</span>
            <p>Row hover effect (default: true)</p>
          </div>
        </div>
      </section>

      <section className="jv-section">
        <h2>🎨 Complete Customization Guide</h2>
        
        <h3>1. All Available Props</h3>
        <CodeBlock code={`interface JTableProps {
  // Required
  columns: JTableColumn[];
  apiUrl: string;
  
  // Optional - Core
  rowKey?: string;                    // default: 'id'
  className?: string;
  rowClassName?: string | ((row: any) => string);
  
  // Search & Filter
  enableUniversalSearch?: boolean;    // default: true
  enableColumnSearch?: boolean;       // default: false
  universalSearchPlaceholder?: string;
  
  // Selection
  enableSelection?: boolean;          // default: true
  onSelectionChange?: (rows: any[]) => void;
  
  // Pagination
  enablePagination?: boolean;         // default: true
  defaultPageSize?: number;           // default: 10
  pageSizeOptions?: number[];         // default: [10, 25, 50, 100]
  
  // Actions
  actions?: JTableAction[];
  floatingActions?: JTableFloatingConfig;
  actionColumnPosition?: 'left' | 'right'; // default: 'right'
  
  // Appearance
  striped?: boolean;                  // default: false
  hover?: boolean;                    // default: true
  bordered?: boolean;                 // default: false
  compact?: boolean;                  // default: false
  stickyHeader?: boolean;             // default: false
  
  // State Management
  enableUrlState?: boolean;           // default: false
}`} />

        <h3>2. Column Configuration</h3>
        <CodeBlock code={`interface JTableColumn {
  key: string;                        // Data field name
  label: string;                      // Column header text
  
  // Behavior
  sortable?: boolean;                 // Enable sorting
  searchable?: boolean;               // Include in universal search
  filterable?: boolean;               // Enable column filter
  
  // Type & Formatting
  type?: 'text' | 'number' | 'date'; // Filter type
  width?: string;                     // Column width (e.g., '100px', '20%')
  render?: (value: any, row: any) => React.ReactNode;
  
  // Visibility
  hidden?: boolean;                   // Hide column
}

// Example with all options:
const column: JTableColumn = {
  key: 'salary',
  label: 'Annual Salary',
  sortable: true,
  filterable: true,
  type: 'number',
  width: '150px',
  render: (value) => \`$\${value.toLocaleString()}\`,
};`} />

        <h3>3. Action Buttons Configuration</h3>
        <CodeBlock code={`interface JTableAction {
  icon: string | React.ReactNode;
  tooltip?: string;
  onClick: (row: any) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost';
  visible?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
}

// Example with all options:
const actions: JTableAction[] = [
  {
    icon: '👁️',
    tooltip: 'View Details',
    onClick: (row) => navigate(\`/users/\${row.id}\`),
    variant: 'primary',
    visible: (row) => row.hasAccess,
    disabled: (row) => row.isLocked,
  },
];`} />

        <h3>4. CSS Customization</h3>
        <CodeBlock code={`/* Override theme variables */
.my-custom-table {
  --jv-primary: #8b5cf6;
  --jv-table-header-bg: #f5f3ff;
  --jv-table-row-hover: #faf5ff;
  --jv-table-border: #e9d5ff;
}

/* Custom action button colors */
.my-custom-table .jv-jtable-action-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

/* Custom row styling */
.my-custom-table .jv-jtable-row.highlighted {
  background-color: #fef3c7 !important;
}

/* Floating actions positioning */
.my-custom-table .jv-jtable-floating-actions {
  gap: 8px; /* Increase spacing */
}`} />

        <h3>5. API Integration</h3>
        <p>Your API should accept these query parameters and return the specified format:</p>
        <CodeBlock code={`// API Query Parameters
GET /api/users?page=1&pageSize=10&search=john&sortColumn=name&sortDirection=asc
  &age_min=25&age_max=45
  &joinDate_start=2020-01-01&joinDate_end=2025-12-31
  &name=Smith

// Expected Response Format
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "joinDate": "2024-01-15T00:00:00Z"
    }
  ],
  "total": 150
}

// Query Parameter Reference:
// - page: Current page (1-based)
// - pageSize: Rows per page
// - search: Universal search query
// - sortColumn: Column key to sort by
// - sortDirection: 'asc' or 'desc'
// - {columnKey}: Text filter for column
// - {columnKey}_min, {columnKey}_max: Range filter for numbers
// - {columnKey}_start, {columnKey}_end: Date range filter`} />

        <h3>6. Complete Working Example</h3>
        <CodeBlock code={`import { JTable, JTableColumn, JTableAction } from 'jithvar-ui';
import { useState } from 'react';

export const UsersTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns: JTableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      filterable: true,
      type: 'number',
      width: '80px',
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      searchable: true,
      filterable: true,
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={row.avatar}
            alt={value}
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
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
  ];

  const actions: JTableAction[] = [
    {
      icon: '👁️',
      tooltip: 'View',
      onClick: (row) => window.location.href = \`/users/\${row.id}\`,
      variant: 'primary',
    },
    {
      icon: '✏️',
      tooltip: 'Edit',
      onClick: (row) => window.location.href = \`/users/\${row.id}/edit\`,
      variant: 'secondary',
      disabled: (row) => row.status === 'inactive',
    },
    {
      icon: '🗑️',
      tooltip: 'Delete',
      onClick: async (row) => {
        if (confirm(\`Delete \${row.name}?\`)) {
          await fetch(\`/api/users/\${row.id}\`, { method: 'DELETE' });
          window.location.reload();
        }
      },
      variant: 'danger',
      visible: (row) => row.role === 'admin',
    },
  ];

  return (
    <div>
      <JTable
        columns={columns}
        apiUrl="/api/users"
        actions={actions}
        enableUniversalSearch={true}
        enableColumnSearch={true}
        enableSelection={true}
        enablePagination={true}
        defaultPageSize={20}
        onSelectionChange={setSelectedRows}
        striped={true}
        hover={true}
        className="users-table"
      />
      
      {selectedRows.length > 0 && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderRadius: '8px' }}>
          <strong>{selectedRows.length}</strong> users selected
          <button onClick={() => console.log('Export', selectedRows)}>
            Export Selected
          </button>
        </div>
      )}
    </div>
  );
};`} />
        
            <div className="jv-info-box" style={{ marginTop: '24px' }}>
              <strong>📖 Complete Documentation:</strong>
              <p style={{ marginTop: '8px' }}>
                For more detailed documentation, examples, and API references, see the{' '}
                <code>COMPONENTS_GUIDE.md</code> file in the repository root.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
