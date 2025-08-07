import React from 'react';
import { cn } from '../../utils/cn';
import { ModernButton } from './ModernButton';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export interface TableColumn<T> {
  key: string;
  title: string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  className?: string;
}

export interface ModernTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  sorting?: {
    key: string;
    direction: 'asc' | 'desc';
    onSort: (key: string) => void;
  };
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selectedRows: Set<string | number>) => void;
  onRowClick?: (item: T, index: number) => void;
  emptyMessage?: string;
  className?: string;
}

export function ModernTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  pagination,
  sorting,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  onRowClick,
  emptyMessage = "Veri bulunamadı",
  className,
}: ModernTableProps<T>) {
  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    
    if (selectedRows.size === data.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(data.map(item => item.id)));
    }
  };

  const handleSelectRow = (id: string | number) => {
    if (!onSelectionChange) return;
    
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    onSelectionChange(newSelectedRows);
  };

  const getSortIcon = (columnKey: string) => {
    if (!sorting || sorting.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sorting.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-blue-600" />
      : <ArrowDown className="h-4 w-4 text-blue-600" />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-100"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-50 border-t border-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm", className)}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {selectable && (
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={data.length > 0 && selectedRows.size === data.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider",
                    column.width && `w-${column.width}`,
                    column.className
                  )}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => sorting?.onSort(column.key)}
                      className="flex items-center gap-2 hover:text-gray-700 transition-colors"
                    >
                      {column.title}
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    column.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0)} 
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      📋
                    </div>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    onRowClick && "cursor-pointer",
                    selectedRows.has(item.id) && "bg-blue-50"
                  )}
                  onClick={() => onRowClick?.(item, index)}
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-6 py-4 text-sm text-gray-900",
                        column.className
                      )}
                    >
                      {column.render 
                        ? column.render(item, index)
                        : (item as any)[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Toplam {pagination.total} kayıt
            </span>
            <select
              value={pagination.pageSize}
              onChange={(e) => pagination.onPageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-700">kayıt göster</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ModernButton
              variant="ghost"
              size="sm"
              icon={<ChevronsLeft className="h-4 w-4" />}
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.page === 1}
            >
              İlk
            </ModernButton>
            <ModernButton
              variant="ghost"
              size="sm"
              icon={<ChevronLeft className="h-4 w-4" />}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Önceki
            </ModernButton>
            
            <span className="px-4 py-2 text-sm text-gray-700">
              Sayfa {pagination.page} / {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            
            <ModernButton
              variant="ghost"
              size="sm"
              icon={<ChevronRight className="h-4 w-4" />}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            />
            <ModernButton
              variant="ghost"
              size="sm"
              icon={<ChevronsRight className="h-4 w-4" />}
              onClick={() => pagination.onPageChange(Math.ceil(pagination.total / pagination.pageSize))}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ModernTable;
