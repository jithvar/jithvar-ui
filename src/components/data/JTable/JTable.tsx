import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DateRangePicker } from '../../inputs/DateRangePicker';
import { RangeSlider } from '../../inputs/RangeSlider';
import { JTableColumn, JTableAction, JTableFloatingAction, JTableProps, FilterState, DateRange } from '../../../types';
import { classNames, debounce } from '../../../utils/helpers';
import './JTable.css';
import * as XLSX from 'xlsx';

// Add this interface for export options
interface ExportOptions {
  type: 'all' | 'filtered' | 'selected';
  filename?: string;
}






interface TableState {
  page: number;
  pageSize: number;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  universalSearch: string;
  columnFilters: Record<string, FilterState>;
  selectedRows: string[];
  visibleColumns: string[];
  activeFilterColumn: string | null;
}


export const JTable: React.FC<JTableProps> = ({
  columns,
  apiUrl,
  apiHeaders = {},
  dataPath = 'data',
  totalPath = 'total',
  enableUrlState = true,
  apiParams = {},
  enableUniversalSearch = true,
  universalSearchPlaceholder = 'Search across all columns...',
  enableColumnSearch = true,
  enableSelection = true,
  selectionMode = 'multiple',
  onSelectionChange,
  bulkActions = [],
  enablePagination = true,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  actions = [],
  actionColumnLabel = 'Actions',
  actionColumnWidth = '150px',
  actionColumnPosition = 'right',
  floatingActions,
  enableColumnToggle = true,
  rowKey = 'id',
  className = '',
  tableClassName = '',
  headerClassName = '',
  rowClassName,
  rowStyle,
  cellClassName,
  emptyMessage = 'No data available',
  onRowClick,
  onRowDoubleClick,
  stickyHeader = false,
  striped = false,
  hover = true,
  bordered = false,
  compact = false,
}) => {
  // Determine if we should use URL state
  const [exportLoading, setExportLoading] = useState(false);
  const shouldUseUrlState = enableUrlState;
  const [state, setState] = useState<TableState>(() => {
    const defaultVisibleColumns = columns.filter(c => c.visible !== false).map(c => c.key);

    if (!shouldUseUrlState) {
      // Don't read from URL in client mode or when URL state is disabled
      return {
        page: 1,
        pageSize: defaultPageSize,
        sortColumn: null,
        sortDirection: 'asc',
        universalSearch: '',
        columnFilters: {},
        selectedRows: [],
        visibleColumns: defaultVisibleColumns,
        activeFilterColumn: null,
      };
    }

    const params = new URLSearchParams(window.location.search);
    const visibleCols = params.get('visibleColumns')?.split(',') || defaultVisibleColumns;

    // Only read from URL if values exist (don't use defaults)
    return {
      page: params.has('page') ? parseInt(params.get('page')!) : 1,
      pageSize: params.has('pageSize') ? parseInt(params.get('pageSize')!) : defaultPageSize,
      sortColumn: params.get('sortColumn') || null,
      sortDirection: (params.get('sortDirection') as 'asc' | 'desc') || 'asc',
      universalSearch: params.get('search') || '',
      columnFilters: {},
      selectedRows: [],
      visibleColumns: visibleCols,
      activeFilterColumn: null,
    };
  });

  const [data, setData] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [columnStats, setColumnStats] = useState<Record<string, { min: number; max: number }>>({});
  const [floatingMenuPosition, setFloatingMenuPosition] = useState<{ x: number; y: number; rowId: string; columnKey: string } | null>(null);
  const [openDropdownRowId, setOpenDropdownRowId] = useState<string | null>(null);
  const filterRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const floatingMenuRef = useRef<HTMLDivElement | null>(null);
  const hideFloatingMenuTimeoutRef = useRef<number | null>(null);

  // Update URL when state changes (only add non-default values)
  const updateURL = useCallback((newState: TableState) => {
    if (!shouldUseUrlState) return;

    const params = new URLSearchParams();

    // Only add page if not default (1)
    if (newState.page !== 1) {
      params.set('page', String(newState.page));
    }

    // Only add pageSize if not default
    if (newState.pageSize !== defaultPageSize) {
      params.set('pageSize', String(newState.pageSize));
    }

    if (newState.sortColumn) {
      params.set('sortColumn', newState.sortColumn);
      params.set('sortDirection', newState.sortDirection);
    }

    if (newState.universalSearch) {
      params.set('search', newState.universalSearch);
    }

    if (newState.visibleColumns.length < columns.length) {
      params.set('visibleColumns', newState.visibleColumns.join(','));
    }

    // Add column filters
    Object.entries(newState.columnFilters).forEach(([key, filterState]) => {
      if (filterState.text) {
        params.set(`filter_${key}`, filterState.text);
      }
      if (filterState.dateRange?.startDate && filterState.dateRange?.endDate) {
        params.set(`filter_${key}_start`, filterState.dateRange.startDate.toISOString());
        params.set(`filter_${key}_end`, filterState.dateRange.endDate.toISOString());
      }
      if (filterState.numberRange) {
        params.set(`filter_${key}_min`, String(filterState.numberRange[0]));
        params.set(`filter_${key}_max`, String(filterState.numberRange[1]));
      }
    });

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  }, [columns, shouldUseUrlState, defaultPageSize]);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    // Skip if no API URL provided
    if (!apiUrl) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      // Use custom parameter names or defaults
      const pageParam = apiParams.page || 'page';
      const pageSizeParam = apiParams.pageSize || 'pageSize';
      const sortColumnParam = apiParams.sortColumn || 'sortColumn';
      const sortDirectionParam = apiParams.sortDirection || 'sortDirection';
      const searchParam = apiParams.universalSearch || 'search';

      params.set(pageParam, String(state.page));
      params.set(pageSizeParam, String(state.pageSize));

      if (state.sortColumn) {
        params.set(sortColumnParam, state.sortColumn);
        params.set(sortDirectionParam, state.sortDirection);
      }

      if (state.universalSearch) {
        params.set(searchParam, state.universalSearch);
      }

      // Add column filters
      Object.entries(state.columnFilters).forEach(([key, filterState]) => {
        if (filterState.text) {
          params.set(key, filterState.text);
        }
        if (filterState.dateRange?.startDate && filterState.dateRange?.endDate) {
          params.set(`${key}_start`, filterState.dateRange.startDate.toISOString());
          params.set(`${key}_end`, filterState.dateRange.endDate.toISOString());
        }
        if (filterState.numberRange) {
          params.set(`${key}_min`, String(filterState.numberRange[0]));
          params.set(`${key}_max`, String(filterState.numberRange[1]));
        }
      });

      const url = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${params.toString()}`;
      const response = await fetch(url, { headers: apiHeaders });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result", result)

      //   // Extract data using custom path or fallback to common patterns
      //   let extractedData;
      //   let extractedTotal;

      //   // If result is directly an array (e.g., JSONPlaceholder)
      //   if (Array.isArray(result)) {
      //     extractedData = result;
      //     extractedTotal = result.length;
      //   } else {
      //     extractedData = result[dataPath] || result.data || result.results || result.masters || result ;
      //     extractedTotal = result[totalPath] || result.total || result.totalRecords || result.totalMasters || (Array.isArray(extractedData) ? extractedData.length : 0);
      //   }




      // Extract data using custom path or fallback to common patterns
      let extractedData;
      let extractedTotal;

      // Robust helper function to get nested values using dot notation
      const getNestedValue = (obj: any, path: string | undefined): any => {
        if (!path || !obj) return undefined;
        try {
          return path.split('.').reduce((current, key) => {
            if (current === null || current === undefined) return undefined;
            return current[key];
          }, obj);
        } catch (error) {
          return undefined;
        }
      };

      // If result is directly an array (e.g., JSONPlaceholder)
      if (Array.isArray(result)) {
        extractedData = result;
        extractedTotal = result.length;
      } else {
        // PRIORITY 1: Use provided paths with dot notation support
        if (dataPath) {
          extractedData = getNestedValue(result, dataPath);
        }

        // PRIORITY 2: Auto-discovery if explicit path didn't work
        if (!extractedData || !Array.isArray(extractedData)) {
          // Common generic data paths (no domain-specific names)
          const commonPaths = ['data', 'results', 'items', 'list', 'records', 'content'];
          for (const path of commonPaths) {
            const potentialData = getNestedValue(result, path);
            if (Array.isArray(potentialData)) {
              extractedData = potentialData;
              break;
            }
          }
        }

        // PRIORITY 3: Last resort - use result itself
        if (!extractedData || !Array.isArray(extractedData)) {
          extractedData = result;
        }

        // TOTAL COUNT EXTRACTION
        if (totalPath) {
          extractedTotal = getNestedValue(result, totalPath);
        }

        if (extractedTotal === undefined || extractedTotal === null) {
          // Common generic total paths
          const totalPaths = ['total', 'count', 'totalCount', 'totalRecords', 'pagination.total', 'meta.total'];
          for (const path of totalPaths) {
            const potentialTotal = getNestedValue(result, path);
            if (typeof potentialTotal === 'number' && potentialTotal >= 0) {
              extractedTotal = potentialTotal;
              break;
            }
          }
        }

        // Final fallback
        if ((extractedTotal === undefined || extractedTotal === null) && Array.isArray(extractedData)) {
          extractedTotal = extractedData.length;
        }
      }

      // Final safety check
      extractedData = Array.isArray(extractedData) ? extractedData : [];
      extractedTotal = typeof extractedTotal === 'number' && extractedTotal >= 0 ? extractedTotal : extractedData.length;

      console.log('Extracted Data:', extractedData);
      console.log('Extracted Total:', extractedTotal);



      setData(Array.isArray(extractedData) ? extractedData : []);
      setTotalRecords(extractedTotal);

      // Calculate min/max for number columns
      if (Array.isArray(extractedData) && extractedData.length > 0) {
        const stats: Record<string, { min: number; max: number }> = {};

        columns.forEach(col => {
          if (col.type === 'number') {
            const values = extractedData.map((row: any) => row[col.key]).filter((v: any) => typeof v === 'number');
            if (values.length > 0) {
              stats[col.key] = {
                min: Math.min(...values),
                max: Math.max(...values),
              };
            }
          }
        });

        setColumnStats(stats);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setData([]);
      setTotalRecords(0);
    } finally {

      console.log('Data Path:', dataPath);
      console.log('Total Path:', totalPath);
      setLoading(false);
    }
  }, [state.page, state.pageSize, state.sortColumn, state.sortDirection, state.universalSearch, state.columnFilters, apiUrl, apiHeaders, apiParams, columns, dataPath, totalPath]);

  // Update URL and fetch data when state changes
  useEffect(() => {
    updateURL(state);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page, state.pageSize, state.sortColumn, state.sortDirection, state.universalSearch, state.columnFilters]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (state.activeFilterColumn) {
        const filterEl = filterRefs.current[state.activeFilterColumn];
        if (filterEl && !filterEl.contains(event.target as Node)) {
          setState(prev => ({ ...prev, activeFilterColumn: null }));
        }
      }
      // Close floating menu when clicking outside
      if (floatingMenuPosition) {
        const target = event.target as HTMLElement;
        if (floatingMenuRef.current && !floatingMenuRef.current.contains(target)) {
          setFloatingMenuPosition(null);
        }
      }
      // Close action dropdown when clicking outside
      if (openDropdownRowId) {
        const target = event.target as HTMLElement;
        if (!target.closest('.jv-jtable-action-dropdown-wrapper')) {
          setOpenDropdownRowId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.activeFilterColumn, floatingMenuPosition, openDropdownRowId]);

  const handleSort = (columnKey: string) => {
    setState((prev) => ({
      ...prev,
      sortColumn: columnKey,
      sortDirection: prev.sortColumn === columnKey && prev.sortDirection === 'asc' ? 'desc' : 'asc',
      page: 1,
    }));
  };

  const handleUniversalSearch = debounce((value: string) => {
    setState((prev) => ({
      ...prev,
      universalSearch: value,
      page: 1,
    }));
  }, 300);

  const handleColumnFilter = (columnKey: string, filterState: FilterState) => {
    setState((prev) => ({
      ...prev,
      columnFilters: {
        ...prev.columnFilters,
        [columnKey]: filterState,
      },
      page: 1,
    }));
  };

  const clearColumnFilter = (columnKey: string) => {
    setState((prev) => {
      const newFilters = { ...prev.columnFilters };
      delete newFilters[columnKey];
      return {
        ...prev,
        columnFilters: newFilters,
        activeFilterColumn: null,
      };
    });
  };

  const toggleFilterDropdown = (columnKey: string) => {
    setState(prev => ({
      ...prev,
      activeFilterColumn: prev.activeFilterColumn === columnKey ? null : columnKey,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setState((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setState((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = data.map((row) => row[rowKey]);
      setState((prev) => ({ ...prev, selectedRows: allIds }));
      onSelectionChange?.(data);
    } else {
      setState((prev) => ({ ...prev, selectedRows: [] }));
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    setState((prev) => {
      let newSelectedRows: string[];

      if (selectionMode === 'single') {
        newSelectedRows = checked ? [rowId] : [];
      } else {
        newSelectedRows = checked
          ? [...prev.selectedRows, rowId]
          : prev.selectedRows.filter((id) => id !== rowId);
      }

      const selectedData = data.filter((row) => newSelectedRows.includes(row[rowKey]));
      onSelectionChange?.(selectedData);

      return { ...prev, selectedRows: newSelectedRows };
    });
  };

  const toggleColumnVisibility = (columnKey: string) => {
    setState(prev => ({
      ...prev,
      visibleColumns: prev.visibleColumns.includes(columnKey)
        ? prev.visibleColumns.filter(k => k !== columnKey)
        : [...prev.visibleColumns, columnKey],
    }));
  };

  const totalPages = Math.ceil(totalRecords / state.pageSize);
  const allSelected = data.length > 0 && state.selectedRows.length === data.length;
  const someSelected = state.selectedRows.length > 0 && !allSelected;

  const visibleColumnsData = columns.filter(col => state.visibleColumns.includes(col.key));
  const hasActions = actions.length > 0;

  const renderFilterDropdown = (column: JTableColumn) => {
    const isActive = state.activeFilterColumn === column.key;
    const currentFilter = state.columnFilters[column.key] || {};
    const hasFilter = currentFilter.text || currentFilter.dateRange || currentFilter.numberRange;

    if (!column.filterable && !column.searchable) return null;

    return (
      <div className="jv-jtable-filter-wrapper">
        <button
          className={classNames(
            'jv-jtable-filter-btn',
            hasFilter && 'jv-jtable-filter-btn-active',
            isActive && 'jv-jtable-filter-btn-open'
          )}
          onClick={() => toggleFilterDropdown(column.key)}
          type="button"
        >
          🔍
        </button>

        {isActive && (
          <div
            ref={el => filterRefs.current[column.key] = el}
            className="jv-jtable-filter-dropdown"
          >
            {column.type === 'date' ? (
              <div className="jv-jtable-filter-content">
                <DateRangePicker
                  value={currentFilter.dateRange || { startDate: null, endDate: null }}
                  onChange={(range) => handleColumnFilter(column.key, { dateRange: range })}
                />
              </div>
            ) : column.type === 'number' && columnStats[column.key] ? (
              <div className="jv-jtable-filter-content">
                <RangeSlider
                  min={columnStats[column.key].min}
                  max={columnStats[column.key].max}
                  value={currentFilter.numberRange || [columnStats[column.key].min, columnStats[column.key].max]}
                  onChange={(range) => handleColumnFilter(column.key, { numberRange: range })}
                  showLabels={true}
                  showTooltip={true}
                />
              </div>
            ) : (
              <div className="jv-jtable-filter-content">
                <input
                  type="text"
                  className="jv-jtable-filter-input"
                  placeholder={`Search ${column.label}...`}
                  value={currentFilter.text || ''}
                  onChange={(e) => handleColumnFilter(column.key, { text: e.target.value })}
                  autoFocus
                />
              </div>
            )}

            {hasFilter && (
              <button
                className="jv-jtable-filter-clear"
                onClick={() => clearColumnFilter(column.key)}
                type="button"
              >
                Clear Filter
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderActionButton = (action: JTableAction, row: any, index: number) => {
    const isVisible = action.visible ? action.visible(row) : true;
    const isDisabled = action.disabled ? action.disabled(row) : false;

    if (!isVisible) return null;

    return (
      <button
        key={index}
        className={classNames(
          'jv-jtable-action-btn',
          action.variant && `jv-jtable-action-btn-${action.variant}`,
          action.className
        )}
        onClick={(e) => {
          e.stopPropagation();
          action.onClick(row, index);
        }}
        disabled={isDisabled}
        title={action.tooltip}
        type="button"
      >
        {action.icon && <span className="jv-jtable-action-icon">{action.icon}</span>}
        {action.label && <span className="jv-jtable-action-label">{action.label}</span>}
      </button>
    );
  };

  const renderActionsWithDropdown = (row: any, rowId: string) => {
    // Filter visible actions
    const visibleActions = actions.filter(action => {
      const isVisible = action.visible ? action.visible(row) : true;
      return isVisible;
    });

    // If 3 or fewer actions, show all normally
    if (visibleActions.length <= 3) {
      return visibleActions.map((action, index) => renderActionButton(action, row, index));
    }

    // Show first 2 actions + dropdown for the rest
    const primaryActions = visibleActions.slice(0, 2);
    const dropdownActions = visibleActions.slice(2);
    const isDropdownOpen = openDropdownRowId === rowId;

    return (
      <>
        {primaryActions.map((action, index) => renderActionButton(action, row, index))}
        <div className="jv-jtable-action-dropdown-wrapper">
          <button
            className="jv-jtable-action-btn jv-jtable-action-btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdownRowId(isDropdownOpen ? null : rowId);
            }}
            title="More actions"
            type="button"
          >
            <span className="jv-jtable-action-icon">⋮</span>
          </button>
          {isDropdownOpen && (
            <div className="jv-jtable-action-dropdown">
              {dropdownActions.map((action, index) => {
                const isDisabled = action.disabled ? action.disabled(row) : false;
                return (
                  <button
                    key={index + 2}
                    className={classNames(
                      'jv-jtable-action-dropdown-item',
                      action.variant && `jv-jtable-action-dropdown-item-${action.variant}`
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick(row, index + 2);
                      setOpenDropdownRowId(null);
                    }}
                    disabled={isDisabled}
                    title={action.tooltip}
                    type="button"
                  >
                    {action.icon && <span className="jv-jtable-action-icon">{action.icon}</span>}
                    <span className="jv-jtable-action-dropdown-label">{action.tooltip || 'Action'}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  };

  const getDefaultFloatingIcon = (type: string) => {
    switch (type) {
      case 'copy': return '📋';
      case 'view': return '👁️';
      case 'edit': return '✏️';
      case 'delete': return '🗑️';
      case 'call': return '📞';
      case 'email': return '✉️';
      case 'visit': return '🔗';
      default: return '⚡';
    }
  };

  const getDefaultFloatingTooltip = (type: string) => {
    switch (type) {
      case 'copy': return 'Copy';
      case 'view': return 'View Details';
      case 'edit': return 'Edit';
      case 'delete': return 'Delete';
      case 'call': return 'Call';
      case 'email': return 'Send Email';
      case 'visit': return 'Visit Link';
      default: return 'Action';
    }
  };

  const handleCellMouseEnter = (e: React.MouseEvent, rowId: string, columnKey: string) => {
    if (!floatingActions?.enabled) return;

    // Don't show floating actions on checkbox, id, or action columns
    const excludedColumns = ['id', 'actions', rowKey];
    if (excludedColumns.includes(columnKey)) return;

    // Clear any pending hide timeout
    if (hideFloatingMenuTimeoutRef.current) {
      clearTimeout(hideFloatingMenuTimeoutRef.current);
      hideFloatingMenuTimeoutRef.current = null;
    }

    // Position at the bottom center of the cell, 5px up
    const cell = e.currentTarget as HTMLElement;
    const rect = cell.getBoundingClientRect();

    setFloatingMenuPosition({
      x: rect.left + rect.width / 2, // Center horizontally
      y: rect.bottom - 5, // Bottom of cell, 5px up
      rowId,
      columnKey
    });
  };

  const handleCellMouseLeave = (e: React.MouseEvent) => {
    if (!floatingActions?.enabled) return;

    // Check if mouse is moving to the floating menu
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (floatingMenuRef.current && floatingMenuRef.current.contains(relatedTarget)) {
      return; // Don't hide if moving to menu
    }

    // Clear any existing timeout
    if (hideFloatingMenuTimeoutRef.current) {
      clearTimeout(hideFloatingMenuTimeoutRef.current);
    }

    // Set a new timeout to hide the menu
    hideFloatingMenuTimeoutRef.current = setTimeout(() => {
      // Check if mouse is still not over the cell or menu
      const hoveredElement = document.querySelector(':hover');
      const isCellHovered = hoveredElement?.closest('.jv-jtable-td');
      const isMenuHovered = floatingMenuRef.current?.matches(':hover');

      if (!isCellHovered && !isMenuHovered) {
        setFloatingMenuPosition(null);
      }
      hideFloatingMenuTimeoutRef.current = null;
    }, 200);
  };

  const renderFloatingActions = () => {
    if (!floatingMenuPosition || !floatingActions?.enabled) return null;

    const row = data.find(r => r[rowKey] === floatingMenuPosition.rowId);
    if (!row) return null;

    const actions = floatingActions.actions || [];
    const rowIndex = data.findIndex(r => r[rowKey] === floatingMenuPosition.rowId);

    // Get the cell value for the current column
    const cellValue = row[floatingMenuPosition.columnKey];

    return (
      <div
        ref={floatingMenuRef}
        className="jv-jtable-floating-actions"
        style={{
          left: `${floatingMenuPosition.x}px`,
          top: `${floatingMenuPosition.y}px`,
        }}
        onMouseEnter={() => {
          // Clear hide timeout when entering menu
          if (hideFloatingMenuTimeoutRef.current) {
            clearTimeout(hideFloatingMenuTimeoutRef.current);
            hideFloatingMenuTimeoutRef.current = null;
          }
        }}
        onMouseLeave={() => {
          // Hide immediately when leaving the menu
          setFloatingMenuPosition(null);
        }}
      >
        {actions.map((action, index) => {
          const isVisible = action.visible ? action.visible(row) : true;
          const isDisabled = action.disabled ? action.disabled(row) : false;

          // For built-in actions, check if required field exists
          let fieldValue: any = null;
          if (action.type === 'call' && floatingActions.phoneField) {
            fieldValue = row[floatingActions.phoneField];
            if (!fieldValue) return null;
          } else if (action.type === 'email' && floatingActions.emailField) {
            fieldValue = row[floatingActions.emailField];
            if (!fieldValue) return null;
          } else if (action.type === 'visit' && floatingActions.urlField) {
            fieldValue = row[floatingActions.urlField];
            if (!fieldValue) return null;
          } else if (action.type === 'copy') {
            // For copy action, use the cell value
            fieldValue = cellValue;
          }

          if (!isVisible) return null;

          const icon = action.icon || getDefaultFloatingIcon(action.type);
          const tooltip = action.tooltip || getDefaultFloatingTooltip(action.type);
          const variant = action.variant || 'primary';

          // Add href for call and email actions
          let href = '';
          if (action.type === 'call' && fieldValue) {
            href = `tel:${fieldValue}`;
          } else if (action.type === 'email' && fieldValue) {
            href = `mailto:${fieldValue}`;
          } else if (action.type === 'visit' && fieldValue) {
            href = fieldValue;
          }

          const handleClick = (e: React.MouseEvent) => {
            e.stopPropagation();

            // Handle copy action with cell value and show context-specific message
            if (action.type === 'copy' && fieldValue) {
              navigator.clipboard.writeText(String(fieldValue));

              // Show context-specific message based on column
              let message = 'Copied to clipboard!';
              const columnKey = floatingMenuPosition.columnKey;

              if (columnKey === 'name') {
                message = 'Name & designation copied!';
              } else if (columnKey === 'phone') {
                message = 'Phone copied!';
              } else if (columnKey === 'email') {
                message = 'Email copied!';
              } else if (columnKey === 'department') {
                message = 'Department copied!';
              } else if (columnKey === 'status') {
                message = 'Status copied!';
              } else if (columnKey === 'city') {
                message = 'City copied!';
              } else if (columnKey === 'age') {
                message = 'Age copied!';
              } else {
                // Find column label for generic message
                const column = columns.find(c => c.key === columnKey);
                if (column) {
                  message = `${column.label} copied!`;
                }
              }

              // Show temporary notification (you can customize this)
              const notification = document.createElement('div');
              notification.textContent = message;
              notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 14px;
                animation: slideIn 0.3s ease-out;
              `;
              document.body.appendChild(notification);
              setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
              }, 2000);
            } else if (href) {
              window.location.href = href;
            }

            action.onClick(row, rowIndex);
            setFloatingMenuPosition(null);
          };

          return (
            <button
              key={index}
              className={`jv-jtable-floating-action-btn jv-floating-${variant}`}
              onClick={handleClick}
              disabled={isDisabled}
              title={tooltip}
              type="button"
            >
              {icon}
            </button>
          );
        })}
      </div>
    );
  };

  const getRowClassName = (row: any, index: number): string => {
    const classes = ['jv-jtable-row'];

    if (state.selectedRows.includes(row[rowKey])) {
      classes.push('jv-jtable-row-selected');
    }

    if (striped && index % 2 === 1) {
      classes.push('jv-jtable-row-striped');
    }

    if (typeof rowClassName === 'function') {
      classes.push(rowClassName(row, index));
    } else if (rowClassName) {
      classes.push(rowClassName);
    }

    return classes.join(' ');
  };

  const getRowStyle = (row: any, index: number): React.CSSProperties | undefined => {
    if (typeof rowStyle === 'function') {
      return rowStyle(row, index);
    }
    return rowStyle;
  };

  const getCellClassName = (column: JTableColumn, value: any, row: any, index: number): string => {
    const classes: string[] = ['jv-jtable-td'];

    // Column-specific className
    if (typeof column.className === 'function') {
      classes.push(column.className(value, row, index));
    } else if (column.className) {
      classes.push(column.className);
    }

    // Global cellClassName
    if (typeof cellClassName === 'function') {
      classes.push(cellClassName(value, row, column, index));
    } else if (cellClassName) {
      classes.push(cellClassName);
    }

    return classes.filter(Boolean).join(' ');
  };

  const getCellStyle = (column: JTableColumn, value: any, row: any, index: number): React.CSSProperties => {
    const baseStyle: React.CSSProperties = { textAlign: column.align };

    if (typeof column.cellStyle === 'function') {
      return { ...baseStyle, ...column.cellStyle(value, row, index) };
    } else if (column.cellStyle) {
      return { ...baseStyle, ...column.cellStyle };
    }

    return baseStyle;
  };



  const clearAll = useCallback(() => {
    setState(prev => ({
      page: 1,
      pageSize: defaultPageSize,
      sortColumn: null,
      sortDirection: 'asc',
      universalSearch: '',
      columnFilters: {},
      selectedRows: [],
      visibleColumns: columns.filter(c => c.visible !== false).map(c => c.key),
      activeFilterColumn: null,
    }));
  }, [columns, defaultPageSize]);

  const exportToExcel = useCallback(async (options: ExportOptions) => {
    setExportLoading(true);

    try {
      let exportData: any[] = [];
      let filename = options.filename || 'table_data';

      if (options.type === 'selected' && state.selectedRows.length > 0) {
        // Export only selected rows
        exportData = data.filter(row => state.selectedRows.includes(row[rowKey]));
        filename = `${filename}_selected_${state.selectedRows.length}_rows`;
      } else {
        // For 'all' or 'filtered', we need to fetch all data with current filters
        const params = new URLSearchParams();

        // Use the same API parameters as current state
        const pageParam = apiParams.page || 'page';
        const pageSizeParam = apiParams.pageSize || 'pageSize';
        const sortColumnParam = apiParams.sortColumn || 'sortColumn';
        const sortDirectionParam = apiParams.sortDirection || 'sortDirection';
        const searchParam = apiParams.universalSearch || 'search';

        // For export, we want ALL data, so set pageSize to a large number or total records
        const exportPageSize = totalRecords > 0 ? totalRecords : 10000;

        params.set(pageParam, '1'); // Always page 1 for export
        params.set(pageSizeParam, String(exportPageSize));

        if (state.sortColumn) {
          params.set(sortColumnParam, state.sortColumn);
          params.set(sortDirectionParam, state.sortDirection);
        }

        if (state.universalSearch) {
          params.set(searchParam, state.universalSearch);
        }

        // Add current column filters
        Object.entries(state.columnFilters).forEach(([key, filterState]) => {
          if (filterState.text) {
            params.set(key, filterState.text);
          }
          if (filterState.dateRange?.startDate && filterState.dateRange?.endDate) {
            params.set(`${key}_start`, filterState.dateRange.startDate.toISOString());
            params.set(`${key}_end`, filterState.dateRange.endDate.toISOString());
          }
          if (filterState.numberRange) {
            params.set(`${key}_min`, String(filterState.numberRange[0]));
            params.set(`${key}_max`, String(filterState.numberRange[1]));
          }
        });

        const url = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}${params.toString()}`;
        const response = await fetch(url, { headers: apiHeaders });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Use the same data extraction logic as fetchData
        const getNestedValue = (obj: any, path: string | undefined): any => {
          if (!path || !obj) return undefined;
          try {
            return path.split('.').reduce((current, key) => {
              if (current === null || current === undefined) return undefined;
              return current[key];
            }, obj);
          } catch (error) {
            return undefined;
          }
        };

        let extractedData;

        if (Array.isArray(result)) {
          extractedData = result;
        } else {
          if (dataPath) {
            extractedData = getNestedValue(result, dataPath);
          }

          if (!extractedData || !Array.isArray(extractedData)) {
            const commonPaths = ['data', 'results', 'items', 'list', 'records', 'content'];
            for (const path of commonPaths) {
              const potentialData = getNestedValue(result, path);
              if (Array.isArray(potentialData)) {
                extractedData = potentialData;
                break;
              }
            }
          }

          if (!extractedData || !Array.isArray(extractedData)) {
            extractedData = result;
          }
        }

        exportData = Array.isArray(extractedData) ? extractedData : [];

        // Determine filename based on whether filters are active
        const hasFilters = state.universalSearch || Object.keys(state.columnFilters).length > 0;
        if (options.type === 'filtered' && hasFilters) {
          filename = `${filename}_filtered`;
        } else {
          filename = `${filename}_all`;
        }
      }

      if (exportData.length === 0) {
        // Show notification for empty data
        showNotification('No data available to export', 'warning');
        return;
      }

      // Prepare data for export - only include visible columns
      const exportColumns = visibleColumnsData.filter(col =>
        col.key !== 'actions' && col.key !== 'id' // Exclude action and ID columns if needed
      );

      const worksheetData = exportData.map(row => {
        const exportRow: any = {};
        exportColumns.forEach(col => {
          exportRow[col.label] = row[col.key];
        });
        return exportRow;
      });

      // Create worksheet and workbook
      const ws = XLSX.utils.json_to_sheet(worksheetData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // Generate and download file
      XLSX.writeFile(wb, `${filename}.xlsx`);

      // Show success notification
      showNotification(`Successfully exported ${exportData.length} records`, 'success');

    } catch (error) {
      console.error('Export error:', error);
      showNotification('Failed to export data', 'error');
    } finally {
      setExportLoading(false);
    }
  }, [
    state.selectedRows,
    state.universalSearch,
    state.columnFilters,
    state.sortColumn,
    state.sortDirection,
    data,
    totalRecords,
    apiUrl,
    apiHeaders,
    apiParams,
    dataPath,
    rowKey,
    visibleColumnsData
  ]);


  // Check if any filters are active
  const hasActiveFilters =
    state.universalSearch !== '' ||
    Object.keys(state.columnFilters).length > 0 ||
    state.sortColumn !== null ||
    state.selectedRows.length > 0;

  // Helper function for notifications (you can replace with your preferred notification system)
  const showNotification = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    // You can integrate with your preferred notification library
    // For now, using alert as fallback
    alert(`${type.toUpperCase()}: ${message}`);
  };



  return (
    <div className={classNames('jv-jtable', className)}>
      {/* Header Controls */}
      <div className="jv-jtable-controls">
        {/* Universal Search */}
        {enableUniversalSearch && (
          <div className="jv-jtable-universal-search">
            <input
              type="text"
              className="jv-jtable-search-input"
              placeholder={universalSearchPlaceholder}
              defaultValue={state.universalSearch}
              onChange={(e) => handleUniversalSearch(e.target.value)}
            />
            <span className="jv-jtable-search-icon">🔍</span>
          </div>
        )}


        <div className="jv-jtable-controls">
          {/* Add this to the controls section, after universal search */}
          <div className="jv-jtable-export ">
            <div className="jv-jtable-export-dropdown">
              <button
                className=" jv-jtable-column-toggle-btn"
                disabled={exportLoading || data.length === 0}
                type="button"
              >
                {exportLoading ? 'Exporting...' : 'Export'}
                <div className="jv-jtable-export-dropdown-content">
                  {/* Export All Data */}
                  <button
                    onClick={() => exportToExcel({ type: 'all' })}
                    disabled={exportLoading || data.length === 0}
                    type="button"
                    title="Export all data without any filters"
                  >
                    Export All Data ({totalRecords} records)
                  </button>

                  {/* Export Filtered Data */}
                  <button
                    onClick={() => exportToExcel({ type: 'filtered' })}
                    disabled={exportLoading || data.length === 0 || !hasActiveFilters}
                    type="button"
                    title="Export data with current filters and search applied"
                  >
                    Export Filtered Data
                    {(state.universalSearch || Object.keys(state.columnFilters).length > 0) &&
                      ` (${totalRecords} records)`
                    }
                  </button>

                  {/* Export Selected Rows */}
                  <button
                    onClick={() => exportToExcel({ type: 'selected' })}
                    disabled={exportLoading || state.selectedRows.length === 0}
                    type="button"
                    title="Export only selected rows"
                  >
                    Export Selected Rows ({state.selectedRows.length} records)
                  </button>
                </div>
              </button>
            </div>
          </div>

          {/* Column Toggle */}
          {enableColumnToggle && (
            <div className="jv-jtable-column-toggle">
              <button className="jv-jtable-column-toggle-btn" type="button">
                ⚙️ Columns
                <div className="jv-jtable-column-toggle-dropdown">
                  {columns.map((col) => (
                    <label key={col.key} className="jv-jtable-column-toggle-item">
                      <input
                        type="checkbox"
                        checked={state.visibleColumns.includes(col.key)}
                        onChange={() => toggleColumnVisibility(col.key)}
                      />
                      <span>{col.label}</span>
                    </label>
                  ))}
                </div>
              </button>
            </div>
          )}



          {/* Clear All Button */}
          <button
            className="jv-jtable-column-toggle-btn"
            onClick={clearAll}
            disabled={!hasActiveFilters && state.selectedRows.length === 0}
            type="button"
            title="Clear all filters, search, sorting and selections"
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {enableSelection && state.selectedRows.length > 0 && bulkActions.length > 0 && (
        <div className="jv-jtable-bulk-actions">
          <div className="jv-jtable-bulk-actions-info">
            <span className="jv-jtable-bulk-actions-count">
              {state.selectedRows.length} row{state.selectedRows.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="jv-jtable-bulk-actions-buttons">
            {bulkActions.map((action, index) => {
              const selectedRowsData = data.filter(row => state.selectedRows.includes(row[rowKey]));
              const isDisabled = action.disabled ? action.disabled(selectedRowsData) : false;

              return (
                <button
                  key={index}
                  className={`jv-jtable-bulk-action-btn jv-jtable-bulk-action-btn-${action.variant || 'primary'}`}
                  onClick={() => action.onClick(selectedRowsData)}
                  disabled={isDisabled}
                  title={action.tooltip || action.label}
                  type="button"
                >
                  {action.icon && <span className="jv-jtable-bulk-action-icon">{action.icon}</span>}
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className={classNames(
        'jv-jtable-container',
        bordered && 'jv-jtable-bordered',
        compact && 'jv-jtable-compact'
      )}>

        {error && (
          <div className="jv-jtable-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <table className={classNames(
          'jv-jtable-table',
          tableClassName,
          stickyHeader && 'jv-jtable-sticky-header',
          hover && 'jv-jtable-hover'
        )}>
          <thead className={classNames('jv-jtable-thead', headerClassName)}>
            <tr>
              {/* Selection Column */}
              {enableSelection && (
                <th className="jv-jtable-checkbox-column">
                  {selectionMode === 'multiple' && (
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="jv-jtable-checkbox"
                    />
                  )}
                </th>
              )}

              {/* Action Column (Left) */}
              {hasActions && actionColumnPosition === 'left' && (
                <th style={{ width: actionColumnWidth }} className="jv-jtable-action-column">
                  {actionColumnLabel}
                </th>
              )}

              {/* Data Columns */}
              {visibleColumnsData.map((column) => (
                <th
                  key={column.key}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    textAlign: column.align,
                    ...column.headerStyle
                  }}
                  className={classNames('jv-jtable-th', column.headerClassName)}
                >
                  <div className="jv-jtable-th-content">
                    <div className="jv-jtable-th-label">
                      {column.headerRender ? (
                        column.headerRender()
                      ) : (
                        <>
                          <span
                            className={column.sortable ? 'jv-jtable-sortable' : ''}
                            onClick={() => column.sortable && handleSort(column.key)}
                          >
                            {column.label}
                            {column.sortable && (
                              <span className="jv-jtable-sort-icon">
                                {state.sortColumn === column.key
                                  ? state.sortDirection === 'asc'
                                    ? ' ↑'
                                    : ' ↓'
                                  : ' ↕'}
                              </span>
                            )}
                          </span>
                          {(column.filterable || column.searchable) && renderFilterDropdown(column)}
                        </>
                      )}
                    </div>
                  </div>
                </th>
              ))}

              {/* Action Column (Right) */}
              {hasActions && actionColumnPosition === 'right' && (
                <th style={{ width: actionColumnWidth }} className="jv-jtable-action-column">
                  {actionColumnLabel}
                </th>
              )}
            </tr>
          </thead>

          <tbody className="jv-jtable-tbody">
            {loading ? (
              // Show skeleton rows while loading
              Array.from({ length: state.pageSize || 10 }).map((_, skeletonIndex) => (
                <tr key={`skeleton-${skeletonIndex}`} className="jv-jtable-skeleton-row">
                  {enableSelection && (
                    <td className="jv-jtable-checkbox-column">
                      <div className="jv-jtable-skeleton jv-jtable-skeleton-checkbox" />
                    </td>
                  )}
                  {hasActions && actionColumnPosition === 'left' && (
                    <td className="jv-jtable-action-column">
                      <div className="jv-jtable-skeleton jv-jtable-skeleton-action" />
                    </td>
                  )}
                  {visibleColumnsData.map((column) => (
                    <td key={column.key}>
                      <div className="jv-jtable-skeleton jv-jtable-skeleton-cell" />
                    </td>
                  ))}
                  {hasActions && actionColumnPosition === 'right' && (
                    <td className="jv-jtable-action-column">
                      <div className="jv-jtable-skeleton jv-jtable-skeleton-action" />
                    </td>
                  )}
                </tr>
              ))
            ) : !error && data.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    visibleColumnsData.length +
                    (enableSelection ? 1 : 0) +
                    (hasActions ? 1 : 0)
                  }
                  className="jv-jtable-empty"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const currentRowId = row[rowKey];
                return (
                  <tr
                    key={currentRowId}
                    className={getRowClassName(row, rowIndex)}
                    style={getRowStyle(row, rowIndex)}
                    onClick={() => onRowClick?.(row, rowIndex)}
                    onDoubleClick={() => onRowDoubleClick?.(row, rowIndex)}
                  >
                    {/* Selection Column */}
                    {enableSelection && (
                      <td className="jv-jtable-checkbox-column">
                        <input
                          type={selectionMode === 'single' ? 'radio' : 'checkbox'}
                          checked={state.selectedRows.includes(currentRowId)}
                          onChange={(e) => handleSelectRow(currentRowId, e.target.checked)}
                          className="jv-jtable-checkbox"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}

                    {/* Action Column (Left) */}
                    {hasActions && actionColumnPosition === 'left' && (
                      <td className="jv-jtable-action-column">
                        <div className="jv-jtable-actions">
                          {renderActionsWithDropdown(row, currentRowId)}
                        </div>
                      </td>
                    )}

                    {/* Data Columns */}
                    {visibleColumnsData.map((column) => {
                      const cellValue = row[column.key];
                      return (
                        <td
                          key={column.key}
                          style={getCellStyle(column, cellValue, row, rowIndex)}
                          className={getCellClassName(column, cellValue, row, rowIndex)}
                          onMouseEnter={(e) => handleCellMouseEnter(e, currentRowId, column.key)}
                          onMouseLeave={(e) => handleCellMouseLeave(e)}
                        >
                          {column.render ? column.render(cellValue, row, rowIndex) : cellValue}
                        </td>
                      );
                    })}

                    {/* Action Column (Right) */}
                    {hasActions && actionColumnPosition === 'right' && (
                      <td className="jv-jtable-action-column">
                        <div className="jv-jtable-actions">
                          {renderActionsWithDropdown(row, currentRowId)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && totalRecords > 0 && (
        <div className="jv-jtable-footer">
          <div className="jv-jtable-page-size">
            <span>Show</span>
            <select
              value={state.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="jv-jtable-page-size-select"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <div className="jv-jtable-pagination-info">
            Showing {(state.page - 1) * state.pageSize + 1} to{' '}
            {Math.min(state.page * state.pageSize, totalRecords)} of {totalRecords} entries
          </div>

          <div className="jv-jtable-pagination">
            <button
              className="jv-jtable-pagination-btn"
              onClick={() => handlePageChange(1)}
              disabled={state.page === 1}
            >
              ««
            </button>
            <button
              className="jv-jtable-pagination-btn"
              onClick={() => handlePageChange(state.page - 1)}
              disabled={state.page === 1}
            >
              ‹
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (state.page <= 3) {
                pageNum = i + 1;
              } else if (state.page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = state.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={classNames(
                    'jv-jtable-pagination-btn',
                    state.page === pageNum && 'jv-jtable-pagination-btn-active'
                  )}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="jv-jtable-pagination-btn"
              onClick={() => handlePageChange(state.page + 1)}
              disabled={state.page === totalPages}
            >
              ›
            </button>
            <button
              className="jv-jtable-pagination-btn"
              onClick={() => handlePageChange(totalPages)}
              disabled={state.page === totalPages}
            >
              »»
            </button>
          </div>
        </div>
      )}

      {/* Floating Actions Menu */}
      {renderFloatingActions()}
    </div>
  );
};

