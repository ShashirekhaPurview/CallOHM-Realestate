import { useState, useRef, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search, Check, SearchX } from 'lucide-react'

/**
 * SearchableSelect - consistent branded dropdown for the entire app.
 *
 * Props:
 *  value       - current selected value (string)
 *  onChange    - (value: string) => void
 *  options     - [{ value, label }]
 *  placeholder - shown when nothing is selected
 *  icon        - lucide icon component shown on the left
 *  searchable  - show a search input inside the dropdown (default false)
 *  isDarkMode  - dark glassmorphism theme (for modals on dark backgrounds)
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
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [dropdownStyle, setDropdownStyle] = useState({})
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)

  const selected = options.find(o => String(o.value) === String(value))

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options ?? []
    const q = query.toLowerCase()
    return (options ?? []).filter(o => String(o?.label ?? '').toLowerCase().includes(q))
  }, [options, query, searchable])

  const handleOpen = () => {
    if (disabled) return
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
        minWidth: Math.max(rect.width, 200),
        zIndex: 9999,
      })
    }
    setOpen(o => !o)
  }

  useEffect(() => {
    if (open && searchable) {
      const t = setTimeout(() => searchRef.current?.focus(), 40)
      return () => clearTimeout(t)
    }
    if (!open) setQuery('')
  }, [open, searchable])

  useEffect(() => {
    const onDown = (e) => {
      if (!containerRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const handleSelect = (val) => {
    onChange(val)
    setOpen(false)
    setQuery('')
  }

  // --- Size ---
  const sizeMap = {
    sm: 'h-8  px-2.5 rounded-lg  text-[12px]',
    md: 'h-10 px-3   rounded-xl  text-[13px]',
    lg: 'h-11 px-3.5 rounded-xl  text-[14px]',
  }
  const sizeClass = sizeMap[size] ?? sizeMap.md

  // --- Trigger ---
  const lightTrigger = [
    'bg-white border-orange-200 text-[#1c0700]',
    'hover:border-orange-300',
    open ? 'border-orange-400 ring-2 ring-orange-100' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ')

  const darkTrigger = [
    'border text-white',
    open
      ? 'border-orange-500/70 ring-2 ring-orange-500/15'
      : 'border-white/12 hover:border-white/25',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ')

  const triggerClass = [
    'w-full flex items-center gap-2 border font-semibold transition-all outline-none select-none',
    sizeClass,
    isDarkMode ? darkTrigger : lightTrigger,
  ].join(' ')

  // --- Dark trigger inline style (glassmorphism) ---
  const darkTriggerStyle = isDarkMode
    ? { background: 'rgba(255,255,255,0.07)' }
    : {}

  // --- Dropdown panel ---
  const panelClass = isDarkMode
    ? 'rounded-xl overflow-hidden border border-white/10'
    : 'rounded-xl overflow-hidden border border-orange-100 shadow-[0_8px_32px_rgba(234,88,12,0.10)]'

  const panelStyle = isDarkMode
    ? { background: '#1a0800' }
    : { background: '#fff' }

  // --- Search bar ---
  const searchBarClass = isDarkMode
    ? 'flex items-center gap-2 px-3 py-2 border-b border-white/08'
    : 'flex items-center gap-2 px-3 py-2 border-b border-orange-50'

  const dropdownPanel = open
    ? createPortal(
        <div
          ref={dropdownRef}
          style={{ ...dropdownStyle, ...panelStyle }}
          className={panelClass}
        >
          {searchable && (
            <div className={searchBarClass}>
              <Search
                size={13}
                className={`shrink-0 ${isDarkMode ? 'text-orange-500/60' : 'text-amber-900/30'}`}
              />
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className={[
                  'flex-1 text-[12px] bg-transparent outline-none',
                  isDarkMode ? 'text-white placeholder-white/25' : 'text-[#1c0700] placeholder-amber-900/30',
                ].join(' ')}
              />
            </div>
          )}

          <div className="max-h-56 overflow-y-auto ss-scroll">
            {filtered.length === 0 ? (
              <div className={`flex flex-col items-center gap-1.5 px-3 py-5 ${isDarkMode ? 'text-white/30' : 'text-amber-900/30'}`}>
                <SearchX size={16} />
                <p className="text-[11px] text-center">{emptyText}</p>
              </div>
            ) : (
              filtered.map(opt => {
                const isActive = String(opt.value) === String(value)
                const itemClass = isActive
                  ? isDarkMode
                    ? 'bg-orange-500/10 text-orange-400'
                    : 'bg-orange-50 text-orange-600'
                  : isDarkMode
                    ? 'text-white/70 hover:bg-white/[0.05]'
                    : 'text-[#1c0700] hover:bg-orange-50/60'
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={[
                      'w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] font-medium text-left transition-colors border-none bg-transparent cursor-pointer',
                      itemClass,
                    ].join(' ')}
                  >
                    <span className="flex-1 truncate">{opt.label}</span>
                    {isActive && (
                      <Check
                        size={12}
                        className={`shrink-0 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`}
                      />
                    )}
                  </button>
                )
              })
            )}
          </div>
        </div>,
        document.body
      )
    : null

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        style={darkTriggerStyle}
        className={triggerClass}
      >
        {Icon && (
          <Icon size={14} className="shrink-0 text-orange-400" />
        )}
        <span
          className={[
            'flex-1 text-left truncate',
            !selected
              ? isDarkMode ? 'text-white/30 font-normal' : 'text-amber-900/35 font-normal'
              : '',
          ].join(' ')}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={13}
          className={[
            'shrink-0 transition-transform duration-200',
            isDarkMode ? 'text-white/35' : 'text-amber-900/40',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {dropdownPanel}
    </div>
  )
}

export default SearchableSelect
