export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface Option {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface FilterState {
  text?: string;
  dateRange?: DateRange;
  numberRange?: [number, number];
  [key: string]: any;
}

export interface JTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'custom';
  visible?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  render?: (value: any, row: any, index: number) => React.ReactNode;
  headerRender?: () => React.ReactNode;
  customFilter?: (value: any, filterValue: any, row: any) => boolean;
  align?: 'left' | 'center' | 'right';
  className?: string | ((value: any, row: any, index: number) => string); // Column cell class
  headerClassName?: string; // Header cell class
  cellStyle?: React.CSSProperties | ((value: any, row: any, index: number) => React.CSSProperties);
  headerStyle?: React.CSSProperties;
}

export interface JTableAction {
  label?: string; // Only used for regular column actions
  icon: React.ReactNode | string; // Required - React component or emoji/icon string
  onClick: (row: any, index: number) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost';
  tooltip: string; // Required for accessibility
  visible?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
}

export interface JTableFloatingAction {
  type: 'copy' | 'view' | 'edit' | 'delete' | 'call' | 'email' | 'visit' | 'custom';
  icon?: React.ReactNode | string; // Custom icon, otherwise uses default for type
  tooltip?: string; // Custom tooltip, otherwise uses default
  onClick: (row: any, index: number) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost';
  visible?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
}

export interface JTableFloatingConfig {
  enabled?: boolean;
  actions?: JTableFloatingAction[];
  phoneField?: string; // Field name for phone number (for call action)
  emailField?: string; // Field name for email (for email action)
  urlField?: string; // Field name for URL (for visit action)
}

export interface JTableBulkAction {
  label: string;
  icon?: React.ReactNode | string;
  onClick: (selectedRows: any[]) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost';
  tooltip?: string;
  disabled?: (selectedRows: any[]) => boolean;
}

export interface JTableProps {
  columns: JTableColumn[];
  
  // Data source - either API or client-side data
  apiUrl?: string;
  apiHeaders?: Record<string, string>;
  data?: any[]; // Client-side data (already formatted)
  totalRecords?: number; // Total records for client-side pagination
  loading?: boolean; // External loading state
  onFetchData?: (params: any) => Promise<{ data: any[]; total: number }>; // Custom data fetcher
  dataPath?: string; // Path to data array in API response (e.g., 'data', 'results', 'masters')
  totalPath?: string; // Path to total count in API response (e.g., 'total', 'totalRecords', 'totalMasters')
  enableUrlState?: boolean; // Enable URL state management (default: true for API mode, false for client mode)
  
  // Search & Filter
  enableUniversalSearch?: boolean;
  universalSearchPlaceholder?: string;
  enableColumnSearch?: boolean;
  searchMode?: 'exact' | 'like' | 'startsWith' | 'endsWith';
  
  // Selection
  enableSelection?: boolean;
  selectionMode?: 'single' | 'multiple';
  onSelectionChange?: (selectedRows: any[]) => void;
  bulkActions?: JTableBulkAction[];
  
  // Pagination
  enablePagination?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  
  // Actions
  actions?: JTableAction[];
  actionColumnLabel?: string;
  actionColumnWidth?: string;
  actionColumnPosition?: 'left' | 'right';
  
  // Floating Actions
  floatingActions?: JTableFloatingConfig;
  
  // Column visibility
  enableColumnToggle?: boolean;
  
  // Styling
  rowKey?: string;
  className?: string; // Container class
  tableClassName?: string; // Table element class
  headerClassName?: string; // Table header class
  rowClassName?: string | ((row: any, index: number) => string); // Row class
  rowStyle?: React.CSSProperties | ((row: any, index: number) => React.CSSProperties); // Row style
  cellClassName?: string | ((value: any, row: any, column: JTableColumn, index: number) => string); // Global cell class
  emptyMessage?: string;
  loadingMessage?: string;
  
  // Row events
  onRowClick?: (row: any, index: number) => void;
  onRowDoubleClick?: (row: any, index: number) => void;
  
  // Advanced
  stickyHeader?: boolean;
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
}

// JAlerts Types
export type { JAlertOptions, JAlertButton, JAlertResult } from './alerts';
