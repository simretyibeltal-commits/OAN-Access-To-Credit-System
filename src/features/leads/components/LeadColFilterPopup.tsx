import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Filter } from 'lucide-react';
import { COL_FILTER_OPTS } from '../constants/leads.constants';


/* ─── LeadColFilterPopup ────────────────────────────────────────────── */
interface LeadColFilterPopupProps {
  col: string;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  initialSelected: string[];
  onApply: (selected: string[]) => void;
  onClose: () => void;
}

export function LeadColFilterPopup({ col, anchorRef, initialSelected = [], onApply, onClose }: LeadColFilterPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const th = anchorRef.current.closest('th');
      const thRect = th ? th.getBoundingClientRect() : rect;
      const popupWidth = 224;
      const preferredLeft = thRect.left + 20;
      const left = preferredLeft + popupWidth > window.innerWidth
        ? Math.max(4, window.innerWidth - popupWidth - 8)
        : preferredLeft;
      setPos({ top: rect.bottom + 6, left });
    }
  }, [anchorRef]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [anchorRef, onClose]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const opts = COL_FILTER_OPTS[col] ?? [];
  const toggle = (v: string) => setSelected(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  return createPortal(
    <div
      ref={popupRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      className="flex w-[240px] flex-col rounded-xl border border-gray-200 bg-white shadow-xl normal-case tracking-normal text-gray-900"
    >
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4 text-sm font-bold text-gray-500 uppercase tracking-wide">
        <Filter size={16} className="text-emerald-600" /> 
        {col === 'CALL START TIME' ? 'FILTER BY DATE' : `FILTER BY ${col}`}
      </div>
      <div className="flex flex-col p-2 max-h-[200px] overflow-y-auto">
        {opts.map(o => {
          const sel = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onMouseDown={e => { e.preventDefault(); toggle(o); }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-gray-50 text-gray-700 text-left"
            >
              <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${sel ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 bg-white'}`}>
                {sel && <Check size={14} strokeWidth={3} />}
              </span>
              {o}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 p-4 bg-gray-50/50 rounded-b-xl">
        <button
          type="button"
          onClick={() => { setSelected([]); onApply([]); onClose(); }}
          className="text-base font-medium text-gray-400 hover:text-gray-600"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => { onApply(selected); onClose(); }}
          className="rounded-lg bg-[#16A34A] px-5 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#10883c]"
        >
          Apply
        </button>
      </div>
    </div>,
    document.body
  );
}
