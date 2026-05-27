import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Search, Check, SearchX } from 'lucide-react';

/**
 * SearchableSelect - consistent dropdown for the entire app.
 *
 * Props:
 *  value       - current selected value (string)
 *  onChange    - (value: string) => void
 *  options     - [{ value, label }]
 *  placeholder - shown when nothing is selected
 *  icon        - lucide icon component shown on the left
 *  searchable  - show a search input inside the dropdown (default false)
 *  isDarkMode  - theme flag
 *  size        - "sm" | "md" (default) | "lg"
 *  className   - extra classes on the wrapper div
 *  disabled    - disables the trigger
 *  emptyText   - text shown when no options match the search
 */
const SearchableSelect = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  icon: Icon,
  searchable = false,
  isDarkMode = false,
  size = 'md',
  className = '',
  disabled = false,
  emptyText = 'No options found',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState({});
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const selected = options.find(o => String(o.value) === String(value));

  const filtered = useMemo(() => {
    const safeOptions = options ?? [];
    if (!searchable || !query.trim()) return safeOptions;
    const q = query.toLowerCase();
    return safeOptions.filter(o => String(o?.label ?? '').toLowerCase().includes(q));
  }, [options, query, searchable]);

  // Compute fixed position from trigger rect when opening.
  // Right-aligns the dropdown to the trigger so it expands leftward,
  // preventing content from being clipped when near the right edge of the layout.
  const handleOpen = () => {
    if (disabled) return;
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
        minWidth: Math.max(rect.width, 180),
        zIndex: 9999,
      });
    }
    setOpen(o => !o);
  };

  useEffect(() => {
    if (open && searchable) {
      const t = setTimeout(() => searchRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
    if (!open) setQuery('');
  }, [open, searchable]);

  useEffect(() => {
    const onDown = (e) => {
      const insideTrigger = containerRef.current?.contains(e.target);
      const insideDropdown = dropdownRef.current?.contains(e.target);
      if (!insideTrigger && !insideDropdown) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
    setQuery('');
  };

  const sizeClasses = {
    sm: 'h-8  px-2.5 rounded-lg  text-xs',
    md: 'h-10 px-3   rounded-xl  text-xs',
    lg: 'h-11 px-3.5 rounded-xl  text-sm',
  };

  const triggerBase = [
    'w-full flex items-center gap-2 border font-medium transition-all outline-none select-none',
    sizeClasses[size] ?? sizeClasses.md,
    isDarkMode
      ? 'bg-[#141414] border-[#333] text-white hover:border-[#555]'
      : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 shadow-sm',
    open ? 'border-blue-500' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ');

  const dropdownPanel = open
    ? createPortal(
      <div
        ref={dropdownRef}
        style={dropdownStyle}
        className={[
          'rounded-xl border shadow-2xl overflow-hidden',
          isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200',
        ].join(' ')}
      >
        {searchable && (
          <div className={`flex items-center gap-2 px-3 py-2 border-b ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
            <Search size={13} className={`shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              ref={searchRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className={`flex-1 text-xs bg-transparent outline-none ${isDarkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}`}
            />
          </div>
        )}

        <div className={`max-h-56 overflow-y-auto ss-scroll ${isDarkMode ? 'ss-dark' : 'ss-light'}`}>
          {filtered.length === 0 ? (
            <div className={`flex flex-col items-center gap-1.5 px-3 py-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <SearchX size={16} />
              <p className="text-xs text-center">{emptyText}</p>
            </div>
          ) : (
            filtered.map(opt => {
              const isActive = String(opt.value) === String(value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left transition-colors',
                    isActive
                      ? isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : isDarkMode ? 'text-gray-300 hover:bg-white/[0.04]' : 'text-gray-700 hover:bg-gray-50',
                  ].join(' ')}
                >
                  <span className="flex-1 truncate">{opt.label}</span>
                  {isActive && (
                    <Check size={12} className={`shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>,
      document.body
    )
    : null;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className={triggerBase}
      >
        {Icon && (
          <Icon size={14} className={`shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        )}
        <span className={`flex-1 text-left truncate ${!selected ? (isDarkMode ? 'text-gray-500' : 'text-gray-400') : ''}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={13}
          className={`shrink-0 transition-transform duration-200 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {dropdownPanel}
    </div>
  );
};

export default SearchableSelect;
