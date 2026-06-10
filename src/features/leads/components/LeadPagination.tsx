import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LeadPaginationProps {
  visibleCount: number;
  filteredCount: number;
  safePage: number;
  totalPages: number;
  pageNums: (number | string)[];
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

function LeadPagination({ visibleCount, filteredCount, safePage, totalPages, pageNums, onPageChange, pageSize, onPageSizeChange }: LeadPaginationProps) {


  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#F1F3F4] bg-white px-4 sm:px-8 py-5">
      <div className="text-sm sm:text-base text-gray-400 font-medium flex items-center shrink-0">
        <span className="whitespace-nowrap">Showing</span>
        <div className="mx-2 relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="appearance-none flex items-center justify-center rounded border border-gray-200 px-4 py-1.5 pr-8 text-gray-700 bg-white shadow-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
        <span className="whitespace-nowrap">of {filteredCount.toLocaleString()} entries</span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 md:ml-auto">
        <button
          type="button"
          disabled={safePage === 1}
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          className="inline-flex h-10 items-center justify-center rounded-md bg-white px-3 text-base font-semibold text-gray-400 transition-all duration-200 hover:bg-gray-50 hover:-translate-y-0.5 active:scale-95 disabled:pointer-events-none disabled:opacity-40 disabled:hover:translate-y-0"
        >
          <ChevronLeft size={18} className="mr-1" />
          Prev
        </button>

        {pageNums.map((p, i) =>
          p === '…' ? (
            <span key={`ell-${i}`} className="text-gray-400 mx-1">...</span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p as number)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                safePage === p
                  ? 'bg-[#16A34A] text-white shadow-md hover:bg-[#10883c]'
                  : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          disabled={safePage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
          className="inline-flex h-10 items-center justify-center rounded-md bg-white px-3 text-base font-semibold text-gray-400 transition-all duration-200 hover:bg-gray-50 hover:-translate-y-0.5 active:scale-95 disabled:pointer-events-none disabled:opacity-40 disabled:hover:translate-y-0"
        >
          Next <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </div>
  );
}

export default LeadPagination;
