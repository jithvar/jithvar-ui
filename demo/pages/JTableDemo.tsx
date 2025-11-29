import React, { useState, useEffect } from 'react';
import { JTable, JTableColumn, JTableAction, } from '../../src';
import { CodeBlock } from '../components/CodeBlock';
import { mockAPI } from '../mockAPI';
import SkeletonLoader from '../components/SkeletonLoader';
import { JTableBulkAction, JTableFloatingConfig } from '../../src/types';

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
  const [activeTab, setActiveTab] = useState('basic');

  // Example API configuration (demo purpose)
  const API_BASE_URL = 'https://api.example.com';
  const type = 'users'; // example resource type
  const apiUrl = `${API_BASE_URL}/Masters?type=${type}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const authToken = token ? `Bearer ${token}` : '';
  const customHeaders = {
    Authorization: authToken,
    'Content-Type': 'application/json',
  };
  const apiParams = {
    page: 'page',
    limit: 'limit',
    sortColumn: 'sort',
    sortDirection: 'order',
    universalSearch: 'search',
  };

  // Basic Columns Configuration
  const basicColumns: JTableColumn[] = [
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
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
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

    
  ];

  // Advanced Columns with Custom Rendering
  const advancedColumns: JTableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      filterable: true,
      type: 'number',
      width: '80px',
      headerClassName: 'text-center',
      className: 'text-center font-mono',
    },
    {
      key: 'name',
      label: 'Full Name',
      sortable: true,
      searchable: true,
      filterable: true,
      render: (value, row) => (
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.designation}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email Address',
      searchable: true,
      filterable: true,
      render: (value) => (
        <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800 hover:underline">
          {value}
        </a>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      searchable: true,
      filterable: true,
      render: (value) => (
        <a href={`tel:${value}`} className="text-green-600 hover:text-green-800 hover:underline">
          {value}
        </a>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'active'
            ? 'bg-green-100 text-green-800'
            : value === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      filterable: true,
      type: 'number',
      width: '120px',
      render: (value) => (
        <span className="font-mono text-gray-900">
          ${value.toLocaleString()}
        </span>
      ),
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
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      searchable: true,
      filterable: true,
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      ),
    },
  ];

  // Basic Actions
  const basicActions: JTableAction[] = [
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
          alert('Deleted successfully!');
        }
      },
      variant: 'danger',
    },
  ];

  // Advanced Actions with Conditional Logic
  const advancedActions: JTableAction[] = [
    {
      icon: '👁️',
      tooltip: 'View Profile',
      onClick: (row) => window.open(`/users/${row.id}`, '_blank'),
      variant: 'primary',
    },
    {
      icon: '✏️',
      tooltip: 'Edit User',
      onClick: (row) => window.location.href = `/users/${row.id}/edit`,
      variant: 'secondary',
      disabled: (row) => row.status === 'inactive', // Disable for inactive users
    },
    {
      icon: '📧',
      tooltip: 'Send Email',
      onClick: (row) => window.location.href = `mailto:${row.email}`,
      variant: 'info',
    },
    {
      icon: '📞',
      tooltip: 'Call User',
      onClick: (row) => window.location.href = `tel:${row.phone}`,
      variant: 'success',
    },
    {
      icon: '🚫',
      tooltip: 'Deactivate',
      onClick: (row) => {
        if (confirm(`Deactivate ${row.name}?`)) {
          alert('User deactivated!');
        }
      },
      variant: 'warning',
      visible: (row) => row.status === 'active', // Only show for active users
    },
    {
      icon: '🗑️',
      tooltip: 'Delete Permanently',
      onClick: (row) => {
        if (confirm(`Permanently delete ${row.name}? This action cannot be undone.`)) {
          alert('User deleted permanently!');
        }
      },
      variant: 'danger',
      visible: (row) => row.status === 'inactive', // Only show for inactive users
    },
  ];

  // Bulk Actions
  const bulkActions: JTableBulkAction[] = [
    {
      label: 'Export Selected',
      icon: '📥',
      variant: 'primary',
      onClick: (rows:any) => alert(`Exporting ${rows.length} rows to CSV`),
      tooltip: 'Export selected rows as CSV',
    },
    {
      label: 'Send Bulk Email',
      icon: '📧',
      variant: 'info',
      onClick: (rows:any) => {
        const emails = rows.map((row:any) => row.email).join(',');
        window.location.href = `mailto:?bcc=${emails}`;
      },
      tooltip: 'Send email to all selected users',
    },
    {
      label: 'Activate Selected',
      icon: '✅',
      variant: 'success',
      onClick: (rows:any) => {
        if (confirm(`Activate ${rows.length} users?`)) {
          alert('Users activated!');
        }
      },
      tooltip: 'Activate selected users',
      disabled: (rows:any) => !rows.some((row:any) => row.status === 'inactive'),
    },
    {
      label: 'Delete Selected',
      icon: '🗑️',
      variant: 'danger',
      onClick: (rows:any) => {
        if (confirm(`Permanently delete ${rows.length} users? This cannot be undone.`)) {
          alert('Users deleted!');
        }
      },
      tooltip: 'Delete selected users permanently',
    },
  ];

  // Floating Actions Configuration
  const floatingActions: JTableFloatingConfig = {
    enabled: true,
    phoneField: 'phone',
    emailField: 'email',
    actions: [
      {
        type: 'copy',
        variant: 'info',
        onClick: () => { }, // Copy logic handled automatically
      },
      {
        type: 'view',
        variant: 'primary',
        onClick: (row:any) => alert(`Viewing ${row.name}`),
      },
      {
        type: 'edit',
        variant: 'warning',
        onClick: (row:any) => alert(`Editing ${row.name}`),
      },
      {
        type: 'delete',
        variant: 'danger',
        onClick:(row:any) => {
          if (confirm(`Delete ${row.name}?`)) {
            alert('Deleted!');
          }
        },
      },
      {
        type: 'call',
        variant: 'success',
        onClick: (row:any) => alert(`Calling ${row.phone}...`),
      },
      {
        type: 'email',
        variant: 'secondary',
        onClick: (row:any) => alert(`Emailing ${row.email}...`),
      },
    ],
  };

  // Code Examples
  const basicExample = `import { JTable, JTableColumn } from 'jithvar-ui';

const columns: JTableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, type: 'number', width: '80px' },
  { key: 'name', label: 'Name', sortable: true, searchable: true },
  { key: 'email', label: 'Email', searchable: true },
  { key: 'age', label: 'Age', sortable: true, type: 'number' },
  { key: 'city', label: 'City', sortable: true, searchable: true },
];

<JTable
  columns={columns}
  apiUrl="/api/users"
  enableUniversalSearch={true}
  enablePagination={true}
  striped={true}
  hover={true}
/>`;

  const advancedExample = `import { JTable, JTableColumn, JTableAction } from 'jithvar-ui';

const AdvancedTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns: JTableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      filterable: true,
      type: 'number',
      width: '80px',
      className: 'text-center font-mono'
    },
    {
      key: 'name',
      label: 'Full Name',
      sortable: true,
      searchable: true,
      render: (value, row) => (
        <div className="flex flex-col">
          <div className="font-semibold">{row.name}</div>
          <div className="text-sm text-gray-500">{row.designation}</div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      render: (value) => (
        <span className={\`px-2 py-1 rounded-full text-xs font-medium \${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }\`}>
          {value}
        </span>
      ),
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      filterable: true,
      type: 'date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const actions: JTableAction[] = [
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
  ];

  return (
    <JTable
      columns={columns}
      apiUrl="/api/users"
      actions={actions}
      enableUniversalSearch={true}
      enableColumnSearch={true}
      enableSelection={true}
      enablePagination={true}
      onSelectionChange={setSelectedRows}
      striped={true}
      hover={true}
      stickyHeader={true}
    />
  );
};`;

  const floatingActionsExample = `import { JTable, JTableFloatingConfig } from 'jithvar-ui';

const floatingActions: JTableFloatingConfig = {
  enabled: true,
  phoneField: 'phone',
  emailField: 'email',
  urlField: 'website',
  actions: [
    {
      type: 'copy',
      onClick: (row) => {
        // Copy logic handled automatically with smart messages
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
      visible: (row) => row.canDelete,
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
  apiUrl="/api/users"
  floatingActions={floatingActions}
/>`;

  const apiParamsExample = `// Custom API parameter mapping for different backends

// Laravel/PHP API
<JTable
  columns={columns}
  apiUrl="/api/users"
  apiParams={{
    page: 'page',
    pageSize: 'per_page',
    sortColumn: 'sort_by',
    sortDirection: 'sort_order',
    universalSearch: 'search',
  }}
  dataPath="data"
  totalPath="total"
/>

// REST API style
<JTable
  columns={columns}
  apiUrl="/api/users"
  apiParams={{
    page: 'offset',
    pageSize: 'limit',
    sortColumn: 'sort',
    sortDirection: 'order',
    universalSearch: 'q',
  }}
/>

// Custom backend
<JTable
  columns={columns}
  apiUrl="/api/users"
  apiParams={{
    page: 'pageNumber',
    pageSize: 'pageSize',
    sortColumn: 'sortField',
    sortDirection: 'sortDirection',
    universalSearch: 'globalSearch',
  }}
  dataPath="items"
  totalPath="totalCount"
/>`;

  const apiHeadersExample = `// API Headers for Authentication
const token = localStorage.getItem('token');
const authToken = \`Bearer \${token}\`;
const customHeaders = {
  Authorization: authToken,
  'Content-Type': 'application/json',
  'X-API-Key': 'your-api-key',
};

<JTable
  columns={columns}
  apiUrl="/api/protected-endpoint"
  apiHeaders={customHeaders}
  apiParams={{
    page: 'page',
    limit: 'limit'
  }}
  dataPath="data"
  totalPath="total"
/>`;

  return (
    <div className="jv-demo-page">
      <div className="jv-hero-section">
        <h1>📊 JTable - Advanced Data Table</h1>
        <p className="jv-subtitle">
          A powerful, feature-rich data table component with server-side operations,
          floating actions, and complete customization
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="jv-tabs">
        {[
          { id: 'basic', label: 'Basic Usage' },
          { id: 'api', label: 'API Integration' },
          { id: 'headers', label: 'API Headers' },
          { id: 'advanced', label: 'Advanced Features' },
          { id: 'floating', label: 'Floating Actions' },
          { id: 'actions', label: 'Action Columns' },
          { id: 'bulk', label: 'Bulk Operations' },
          { id: 'props', label: 'Props Reference' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`jv-tab ${activeTab === tab.id ? 'jv-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Basic Usage Tab */}
      {activeTab === 'basic' && (
        <section className="jv-section">
          <h2>🚀 Basic Usage</h2>
          <p>Get started with minimal configuration. Perfect for simple data display with sorting and search.</p>

          <div className="jv-demo-preview">
            <JTable
              columns={basicColumns}
              apiUrl="https://mock-api/users"
              apiHeaders={customHeaders}
              enableUniversalSearch={true}
              enableSelection={true}
              enablePagination={true}
              striped={true}
              hover={true}
            />
          </div>

          <CodeBlock code={`// Minimal Configuration (Most Common Use Case)
import { JTable, JTableColumn } from 'jithvar-ui';

const columns: JTableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, type: 'number' },
  { key: 'name', label: 'Name', sortable: true, searchable: true },
  { key: 'email', label: 'Email', searchable: true },
  { key: 'age', label: 'Age', sortable: true, type: 'number' },
  { key: 'city', label: 'City', sortable: true, searchable: true },
];

// API Authentication
const token = protected-token;
const customHeaders = {
  Authorization:  \`Bearer \${token}\`,
  'Content-Type': 'application/json',
  'X-API-Key': 'your-api-key',
};


<JTable
  columns={columns}
  apiUrl="/api/users"
  apiHeaders={customHeaders}
  enableUniversalSearch={true}
  enableSelection={true}
  enablePagination={true}
  striped={true}
  hover={true}
/>`} />

          <div className="jv-info-box">
            <strong>🎯 Essential Props for Basic Usage:</strong>
            <ul>
              <li><code>columns</code> - Define your table structure (required)</li>
              <li><code>apiUrl</code> - Your API endpoint (required)</li>
              <li><code>apiHeaders</code> - For authentication and custom headers</li>
              <li><code>enableUniversalSearch</code> - Global search across columns</li>
              <li><code>enableSelection</code> - Row selection with checkboxes</li>
              <li><code>enablePagination</code> - Server-side pagination</li>
              <li><code>striped</code> - Alternating row colors</li>
              <li><code>hover</code> - Row hover effects</li>
            </ul>
          </div>
        </section>
      )}

      {/* Advanced Features Tab */}
      {activeTab === 'advanced' && (
        <section className="jv-section">
          <h2>🎯 Advanced Features</h2>
          <p>Full-featured table with custom rendering, filters, and enhanced UX.</p>

          <div className="jv-demo-preview">
            <JTable
              columns={advancedColumns}
              apiUrl="https://mock-api/users"
              apiHeaders={customHeaders}
              apiParams={apiParams}
              enableUniversalSearch={true}
              enableColumnSearch={true}
              enableSelection={true}
              enablePagination={true}
              striped={true}
              hover={true}
              stickyHeader={true}
              onSelectionChange={setSelectedRows}
            />
          </div>

          <CodeBlock code={advancedExample} />

          <div className="jv-info-box">
            <strong>🎨 Advanced Features Demonstrated:</strong>
            <ul>
              <li><strong>Custom Rendering:</strong> Status badges, formatted dates, linked emails/phones</li>
              <li><strong>Column Filters:</strong> Text, number range, and date range filters</li>
              <li><strong>Sticky Header:</strong> Header stays visible while scrolling</li>
              <li><strong>Row Selection:</strong> Checkbox selection with shift+click support</li>
              <li><strong>Custom Styling:</strong> Tailwind CSS classes for complete control</li>
              <li><strong>API Headers:</strong> Authentication headers for protected endpoints</li>
              <li><strong>Custom API Params:</strong> Parameter mapping for different backends</li>
            </ul>
          </div>
        </section>
      )}

      {/* Floating Actions Tab */}
      {activeTab === 'floating' && (
        <section className="jv-section">
          <h2>🎈 Floating Actions</h2>
          <p>Contextual actions that appear when hovering over table cells. Perfect for quick operations without cluttering the UI.</p>
          <div className="jv-info-box">
            <strong>💡 Tip:</strong> Hover over any cell in the table below to see floating actions appear on the left side!
          </div>

          <div className="jv-demo-preview">
            <JTable
              columns={advancedColumns}
              apiUrl="https://mock-api/users"
              apiHeaders={customHeaders}
              enableUniversalSearch={true}
              enableSelection={true}
              floatingActions={floatingActions}
              striped={true}
              hover={true}
            />
          </div>

          <CodeBlock code={floatingActionsExample} />

          <div className="jv-feature-grid">
            <div className="jv-feature-card">
              <div className="jv-feature-icon">📋</div>
              <h4>Smart Copy</h4>
              <p>Automatic context-aware copy messages based on column type</p>
            </div>
            <div className="jv-feature-card">
              <div className="jv-feature-icon">📞</div>
              <h4>Direct Actions</h4>
              <p>Call, email, and visit actions with proper URL schemes</p>
            </div>
            <div className="jv-feature-card">
              <div className="jv-feature-icon">👁️</div>
              <h4>Contextual</h4>
              <p>Actions appear only when needed, reducing visual clutter</p>
            </div>
            <div className="jv-feature-card">
              <div className="jv-feature-icon">🎨</div>
              <h4>Variant Colors</h4>
              <p>Different colors for different action types (primary, danger, etc.)</p>
            </div>
          </div>
        </section>
      )}

      {/* Action Columns Tab */}
      {activeTab === 'actions' && (
        <section className="jv-section">
          <h2>📍 Action Columns</h2>
          <p>Traditional action buttons in a dedicated column. Always visible and perfect for primary actions.</p>

          <div className="jv-demo-preview">
            <JTable
              columns={basicColumns}
              apiUrl="https://mock-api/users"
              apiHeaders={customHeaders}
              actions={advancedActions}
              enableUniversalSearch={true}
              enableSelection={true}
              striped={true}
              hover={true}
            />
          </div>

          <div className="jv-info-box">
            <strong>🎯 Action Features:</strong>
            <ul>
              <li><strong>Conditional Visibility:</strong> Show/hide actions based on row data</li>
              <li><strong>Disabled States:</strong> Disable actions based on conditions</li>
              <li><strong>Multiple Variants:</strong> Different colors for different action types</li>
              <li><strong>Tooltips:</strong> Helpful hints on hover</li>
              <li><strong>Custom Icons:</strong> Use emojis, SVG icons, or React components</li>
            </ul>
          </div>

          <CodeBlock code={`// Advanced Actions with Conditional Logic
const actions: JTableAction[] = [
  {
    icon: '👁️',
    tooltip: 'View Profile',
    onClick: (row) => window.open(\`/users/\${row.id}\`, '_blank'),
    variant: 'primary',
  },
  {
    icon: '✏️',
    tooltip: 'Edit User',
    onClick: (row) => window.location.href = \`/users/\${row.id}/edit\`,
    variant: 'secondary',
    disabled: (row) => row.status === 'inactive', // Disable for inactive
  },
  {
    icon: '🚫',
    tooltip: 'Deactivate',
    onClick: (row) => deactivateUser(row.id),
    variant: 'warning',
    visible: (row) => row.status === 'active', // Only show for active
  },
  {
    icon: '🗑️',
    tooltip: 'Delete',
    onClick: (row) => deleteUser(row.id),
    variant: 'danger',
    visible: (row) => row.role !== 'admin', // Hide for admins
  },
];`} />
        </section>
      )}

      {/* Bulk Operations Tab */}
      {activeTab === 'bulk' && (
        <section className="jv-section">
          <h2>📦 Bulk Operations</h2>
          <p>Perform actions on multiple selected rows simultaneously. Perfect for batch processing.</p>

          <div className="jv-demo-preview">
            <JTable
              columns={advancedColumns}
              apiUrl="https://mock-api/users"
              apiHeaders={customHeaders}
              actions={basicActions}
              enableUniversalSearch={true}
              enableSelection={true}
              enablePagination={true}
              bulkActions={bulkActions}
              onSelectionChange={setSelectedRows}
              striped={true}
              hover={true}
            />
          </div>

          {selectedRows.length > 0 && (
            <div className="jv-selection-info">
              <strong>{selectedRows.length}</strong> row(s) selected:
              {selectedRows.slice(0, 3).map(row => row.name).join(', ')}
              {selectedRows.length > 3 && ` and ${selectedRows.length - 3} more...`}
            </div>
          )}

          <CodeBlock code={`// Bulk Actions Configuration
const bulkActions = [
  {
    label: 'Export Selected',
    icon: '📥',
    variant: 'primary',
    onClick: (rows:any) => {
      // Export logic here
      alert(\`Exporting \${rows.length} rows\`);
    },
    tooltip: 'Export selected rows as CSV',
  },
  {
    label: 'Send Bulk Email',
    icon: '📧',
    variant: 'info',
    onClick: (rows:any) => {
      const emails = rows.map(row => row.email).join(',');
      window.location.href = \`mailto:?bcc=\${emails}\`;
    },
  },
  {
    label: 'Activate Selected',
    icon: '✅',
    variant: 'success',
    onClick: (rows:any) => activateUsers(rows:any),
    disabled: (rows:any) => !rows.some(row => row.status === 'inactive'),
  },
  {
    label: 'Delete Selected',
    icon: '🗑️',
    variant: 'danger',
    onClick: (rows:any) => {
      if (confirm(\`Delete \${rows.length} users?\`)) {
        deleteUsers(rows:any);
      }
    },
  },
];

// API Authentication
const token = protected-token;
const customHeaders = {
  Authorization:  \`Bearer \${token}\`,
  'Content-Type': 'application/json',
  'X-API-Key': 'your-api-key',
};
  

<JTable
apiHeaders={customHeaders}
  columns={columns}
  apiUrl="/api/users"
  bulkActions={bulkActions}
  enableSelection={true}
  onSelectionChange={setSelectedRows}
/>`} />
        </section>
      )}

      {/* API Integration Tab */}
      {activeTab === 'api' && (
        <section className="jv-section">
          <h2>🔗 API Integration</h2>
          <p>Flexible API integration with customizable parameter mapping for any backend.</p>

          <CodeBlock code={apiParamsExample} />

          <div className="jv-info-box">
            <strong>🌐 Supported API Response Formats:</strong>
          </div>

          <div className="jv-code-grid">
            <div className="jv-code-block">
              <h4>Standard REST API</h4>
              <CodeBlock code={`// Request
GET /api/users?page=1&pageSize=10&search=john&sortColumn=name&sortDirection=asc

// Response
{
  "data": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" }
  ],
  "total": 100
}`} language="json" />
            </div>

            <div className="jv-code-block">
              <h4>Laravel/PHP API</h4>
              <CodeBlock code={`// Request
GET /api/users?page=1&per_page=10&search=john&sort_by=name&sort_order=asc

// Response  
{
  "data": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" }
  ],
  "total": 100,
  "current_page": 1,
  "per_page": 10
}`} language="json" />
            </div>

            <div className="jv-code-block">
              <h4>Custom Backend</h4>
              <CodeBlock code={`// Request
GET /api/users?offset=0&limit=10&q=john&sortField=name&sortDirection=asc

// Response
{
  "items": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" }
  ],
  "totalCount": 100,
  "hasMore": true
}`} language="json" />
            </div>
          </div>

          <div className="jv-info-box">
            <strong>🔧 Custom Data Extraction:</strong>
            <p>Use <code>dataPath</code> and <code>totalPath</code> to extract data from complex API responses:</p>
            <CodeBlock code={`<JTable
  columns={columns}
  apiUrl="/api/complex-endpoint"
  dataPath="response.payload.items"  // Extract from nested structure
  totalPath="response.payload.total"
  apiParams={{
    page: 'pageNumber',
    pageSize: 'pageSize'
  }}
/>`} />
          </div>
        </section>
      )}

      {/* API Headers Tab */}
      {activeTab === 'headers' && (
        <section className="jv-section">
          <h2>🔐 API Headers & Authentication</h2>
          <p>Secure your API calls with custom headers for authentication and other requirements.</p>

          <CodeBlock code={apiHeadersExample} />

          <div className="jv-demo-preview">
            <JTable
              columns={basicColumns}
              apiUrl="https://mock-api/users"
              apiHeaders={customHeaders}
              apiParams={apiParams}
              enableUniversalSearch={true}
              enablePagination={true}
              striped={true}
              hover={true}
            />
          </div>

          <div className="jv-info-box">
            <strong>🔑 Common Header Use Cases:</strong>
            <ul>
              <li><strong>Authentication:</strong> Bearer tokens, API keys, JWT tokens</li>
              <li><strong>Content Type:</strong> JSON, XML, form data</li>
              <li><strong>CORS:</strong> Cross-origin request headers</li>
              <li><strong>Custom Headers:</strong> Versioning, tenant IDs, feature flags</li>
            </ul>
          </div>

          <div className="jv-code-grid">
            <div className="jv-code-block">
              <h4>JWT Authentication</h4>
              <CodeBlock code={`const customHeaders = {
  Authorization: \`Bearer \${localStorage.getItem('token')}\`,
  'Content-Type': 'application/json',
};

<JTable
  columns={columns}
  apiUrl="/api/protected-data"
  apiHeaders={customHeaders}
/>`} />
            </div>

            <div className="jv-code-block">
              <h4>API Key Authentication</h4>
              <CodeBlock code={`const customHeaders = {
  'X-API-Key': 'your-api-key-here',
  'Content-Type': 'application/json',
};

<JTable
  columns={columns}
  apiUrl="/api/external-service"
  apiHeaders={customHeaders}
/>`} />
            </div>

            <div className="jv-code-block">
              <h4>Multi-tenant Headers</h4>
              <CodeBlock code={`const customHeaders = {
  Authorization: \`Bearer \${token}\`,
  'X-Tenant-ID': 'company-123',
  'X-User-ID': 'user-456',
  'Content-Type': 'application/json',
};

<JTable
  columns={columns}
  apiUrl="/api/tenant-data"
  apiHeaders={customHeaders}
/>`} />
            </div>
          </div>
        </section>
      )}

      {/* Props Reference Tab */}
      {activeTab === 'props' && (
        <section className="jv-section">
          <h2>📚 Complete Props Reference</h2>
          <p>Comprehensive guide to all available props and their usage.</p>

          <div className="jv-props-reference">
            {/* Core Props */}
            <div className="jv-props-category">
              <h3>🎯 Core Configuration</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">columns</code>
                <span className="jv-prop-type">JTableColumn[]</span>
                <span className="jv-prop-required">Required</span>
                <p className="jv-prop-desc">Array of column definitions for the table</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">apiUrl</code>
                <span className="jv-prop-type">string</span>
                <span className="jv-prop-required">Required</span>
                <p className="jv-prop-desc">API endpoint URL for fetching table data</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">apiHeaders</code>
                <span className="jv-prop-type">Record&lt;string, string&gt;</span>
                <p className="jv-prop-desc">Custom headers for API requests (auth tokens, etc.)</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">apiParams</code>
                <span className="jv-prop-type">JTableApiParams</span>
                <p className="jv-prop-desc">Custom parameter mapping for API calls</p>
                <div className="jv-prop-example">
                  <code>{`{ page: 'pageNumber', pageSize: 'limit' }`}</code>
                </div>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">rowKey</code>
                <span className="jv-prop-type">string</span>
                <span className="jv-prop-default">'id'</span>
                <p className="jv-prop-desc">Unique identifier field for each row</p>
              </div>
            </div>

            {/* API Configuration */}
            <div className="jv-props-category">
              <h3>🔗 API Configuration</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">dataPath</code>
                <span className="jv-prop-type">string</span>
                <span className="jv-prop-default">'data'</span>
                <p className="jv-prop-desc">JSON path to extract data array from API response</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">totalPath</code>
                <span className="jv-prop-type">string</span>
                <span className="jv-prop-default">'total'</span>
                <p className="jv-prop-desc">JSON path to extract total record count</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">enableUrlState</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">false</span>
                <p className="jv-prop-desc">Sync table state with URL parameters</p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="jv-props-category">
              <h3>🔍 Search & Filter</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">enableUniversalSearch</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">true</span>
                <p className="jv-prop-desc">Enable global search across all searchable columns</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">enableColumnSearch</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">false</span>
                <p className="jv-prop-desc">Enable individual column filters</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">universalSearchPlaceholder</code>
                <span className="jv-prop-type">string</span>
                <span className="jv-prop-default">'Search across all columns...'</span>
                <p className="jv-prop-desc">Placeholder text for universal search input</p>
              </div>
            </div>

            {/* Selection */}
            <div className="jv-props-category">
              <h3>✅ Selection</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">enableSelection</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">true</span>
                <p className="jv-prop-desc">Enable row selection with checkboxes</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">selectionMode</code>
                <span className="jv-prop-type">'single' | 'multiple'</span>
                <span className="jv-prop-default">'multiple'</span>
                <p className="jv-prop-desc">Single or multiple row selection</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">onSelectionChange</code>
                <span className="jv-prop-type">{"(rows: any[]) => void"}</span>
                <p className="jv-prop-desc">Callback when selected rows change</p>
              </div>
            </div>

            {/* Actions */}
            <div className="jv-props-category">
              <h3>⚡ Actions</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">actions</code>
                <span className="jv-prop-type">JTableAction[]</span>
                <p className="jv-prop-desc">Action buttons in a dedicated column</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">floatingActions</code>
                <span className="jv-prop-type">JTableFloatingConfig</span>
                <p className="jv-prop-desc">Floating action buttons on row hover</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">bulkActions</code>
                <span className="jv-prop-type">JTableBulkAction[]</span>
                <p className="jv-prop-desc">Actions for multiple selected rows</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">actionColumnPosition</code>
                <span className="jv-prop-type">'left' | 'right'</span>
                <span className="jv-prop-default">'right'</span>
                <p className="jv-prop-desc">Position of the action column</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">actionColumnLabel</code>
                <span className="jv-prop-type">string</span>
                <span className="jv-prop-default">'Actions'</span>
                <p className="jv-prop-desc">Header label for action column</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">actionColumnWidth</code>
                <span className="jv-prop-type">string</span>
                <span className="jv-prop-default">'150px'</span>
                <p className="jv-prop-desc">Width of the action column</p>
              </div>
            </div>

            {/* Pagination */}
            <div className="jv-props-category">
              <h3>📄 Pagination</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">enablePagination</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">true</span>
                <p className="jv-prop-desc">Enable pagination controls</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">defaultPageSize</code>
                <span className="jv-prop-type">number</span>
                <span className="jv-prop-default">10</span>
                <p className="jv-prop-desc">Default number of rows per page</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">pageSizeOptions</code>
                <span className="jv-prop-type">number[]</span>
                <span className="jv-prop-default">[10, 25, 50, 100]</span>
                <p className="jv-prop-desc">Available page size options</p>
              </div>
            </div>

            {/* Styling & Appearance */}
            <div className="jv-props-category">
              <h3>🎨 Styling & Appearance</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">striped</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">false</span>
                <p className="jv-prop-desc">Alternating row background colors</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">hover</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">true</span>
                <p className="jv-prop-desc">Row hover effects</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">bordered</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">false</span>
                <p className="jv-prop-desc">Add borders to table and cells</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">compact</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">false</span>
                <p className="jv-prop-desc">Reduced padding for dense layout</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">stickyHeader</code>
                <span className="jv-prop-type">boolean</span>
                <span className="jv-prop-default">false</span>
                <p className="jv-prop-desc">Fixed header while scrolling</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">className</code>
                <span className="jv-prop-type">string</span>
                <p className="jv-prop-desc">Additional CSS class for the table container</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">tableClassName</code>
                <span className="jv-prop-type">string</span>
                <p className="jv-prop-desc">Additional CSS class for the table element</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">headerClassName</code>
                <span className="jv-prop-type">string</span>
                <p className="jv-prop-desc">Additional CSS class for the table header</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">rowClassName</code>
                <span className="jv-prop-type">{"string | ((row: any, index: number) => string)"}</span>
                <p className="jv-prop-desc">Custom CSS class for table rows</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">rowStyle</code>
                <span className="jv-prop-type">{"React.CSSProperties | ((row: any, index: number) => React.CSSProperties)"}</span>
                <p className="jv-prop-desc">Custom inline styles for table rows</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">cellClassName</code>
                <span className="jv-prop-type">{"string | ((value: any, row: any, column: JTableColumn, index: number) => string)"}</span>
                <p className="jv-prop-desc">Custom CSS class for table cells</p>
              </div>
            </div>

            {/* Events */}
            <div className="jv-props-category">
              <h3>🎭 Events</h3>

              <div className="jv-prop-item">
                <code className="jv-prop-name">onRowClick</code>
                <span className="jv-prop-type">{"(row: any, index: number) => void"}</span>
                <p className="jv-prop-desc">Callback when a row is clicked</p>
              </div>

              <div className="jv-prop-item">
                <code className="jv-prop-name">onRowDoubleClick</code>
                <span className="jv-prop-type">{"(row: any, index: number) => void"}</span>
                <p className="jv-prop-desc">Callback when a row is double-clicked</p>
              </div>
            </div>
          </div>

          {/* JTableColumn Props */}
          <div className="jv-props-category">
            <h3>📋 JTableColumn Properties</h3>

            <div className="jv-prop-item">
              <code className="jv-prop-name">key</code>
              <span className="jv-prop-type">string</span>
              <span className="jv-prop-required">Required</span>
              <p className="jv-prop-desc">Unique identifier and data field name</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">label</code>
              <span className="jv-prop-type">string</span>
              <span className="jv-prop-required">Required</span>
              <p className="jv-prop-desc">Column header text</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">sortable</code>
              <span className="jv-prop-type">boolean</span>
              <span className="jv-prop-default">false</span>
              <p className="jv-prop-desc">Enable column sorting</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">searchable</code>
              <span className="jv-prop-type">boolean</span>
              <span className="jv-prop-default">false</span>
              <p className="jv-prop-desc">Include in universal search</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">filterable</code>
              <span className="jv-prop-type">boolean</span>
              <span className="jv-prop-default">false</span>
              <p className="jv-prop-desc">Enable column-specific filter</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">type</code>
              <span className="jv-prop-type">'text' | 'number' | 'date'</span>
              <p className="jv-prop-desc">Data type for appropriate filtering</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">width</code>
              <span className="jv-prop-type">string</span>
              <p className="jv-prop-desc">Column width (e.g., '100px', '20%')</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">minWidth</code>
              <span className="jv-prop-type">string</span>
              <p className="jv-prop-desc">Minimum column width</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">maxWidth</code>
              <span className="jv-prop-type">string</span>
              <p className="jv-prop-desc">Maximum column width</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">align</code>
              <span className="jv-prop-type">'left' | 'center' | 'right'</span>
              <span className="jv-prop-default">'left'</span>
              <p className="jv-prop-desc">Text alignment</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">render</code>
              <span className="jv-prop-type">{"(value: any, row: any, index: number) => React.ReactNode"}</span>
              <p className="jv-prop-desc">Custom cell render function</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">className</code>
              <span className="jv-prop-type">{"string | ((value: any, row: any, index: number) => string)"}</span>
              <p className="jv-prop-desc">Custom CSS class for column cells</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">cellStyle</code>
              <span className="jv-prop-type">{"React.CSSProperties | ((value: any, row: any, index: number) => React.CSSProperties)"}</span>
              <p className="jv-prop-desc">Custom inline styles for column cells</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">headerClassName</code>
              <span className="jv-prop-type">string</span>
              <p className="jv-prop-desc">Custom CSS class for column header</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">headerStyle</code>
              <span className="jv-prop-type">React.CSSProperties</span>
              <p className="jv-prop-desc">Custom inline styles for column header</p>
            </div>

            <div className="jv-prop-item">
              <code className="jv-prop-name">headerRender</code>
              <span className="jv-prop-type">{"() => React.ReactNode"}</span>
              <p className="jv-prop-desc">Custom header render function</p>
            </div>
          </div>
        </section>
      )}

      {/* Final Summary */}
      <section className="jv-section">
        <h2>🎉 Get Started</h2>
        <p>JTable is designed to be flexible, powerful, and easy to use. Choose the features you need and customize everything to match your application's design and requirements.</p>

        <div className="jv-feature-grid">
          <div className="jv-feature-card">
            <div className="jv-feature-icon">⚡</div>
            <h4>Quick Setup</h4>
            <p>Get started in minutes with basic configuration</p>
          </div>
          <div className="jv-feature-card">
            <div className="jv-feature-icon">🎨</div>
            <h4>Fully Customizable</h4>
            <p>Complete control over styling and behavior</p>
          </div>
          <div className="jv-feature-card">
            <div className="jv-feature-icon">🔧</div>
            <h4>Flexible API</h4>
            <p>Works with any backend API structure</p>
          </div>
          <div className="jv-feature-card">
            <div className="jv-feature-icon">📱</div>
            <h4>Responsive</h4>
            <p>Works perfectly on all screen sizes</p>
          </div>
        </div>

        <div className="jv-cta-section">
          <h3>Ready to use JTable?</h3>
          <p>Check out the examples above and start building your perfect data table today!</p>
          <div className="jv-cta-buttons">
            <button className="jv-btn jv-btn-primary">View GitHub Repository</button>
            <button className="jv-btn jv-btn-secondary">Read Full Documentation</button>
          </div>
        </div>
      </section>
    </div>
  );
};