const stats = [
  { value: '50,000+', label: 'Calls handled daily' },
  { value: '3×',      label: 'More qualified leads' },
  { value: '68%',     label: 'Less manual calling'  },
  { value: '<5 min',  label: 'Lead response time'   },
]

export default function StatsBar() {
  return (
    <div
      className="bg-gradient-to-br from-orange-50 to-orange-100 border-t border-b border-[#fde8d8] px-6"
      aria-label="Platform highlights"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-[1280px] mx-auto">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`relative flex flex-col items-center text-center gap-[6px] py-8 px-4 ${
              i > 0 ? 'before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-px before:bg-orange-200 stat-divider' : ''
            }`}
          >
            <strong className="stat-value text-[34px] font-black tracking-[-0.04em] leading-none">
              {s.value}
            </strong>
            <span className="text-[14px] text-amber-800 font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
