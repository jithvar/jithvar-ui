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
  render?: (value: any, row: any, index: number) => React.ReactNode;
  headerRender?: () => React.ReactNode;
  customFilter?: (value: any, filterValue: any, row: any) => boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
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
  apiUrl: string;
  apiHeaders?: Record<string, string>;
  
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
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: any, index: number) => string);
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
