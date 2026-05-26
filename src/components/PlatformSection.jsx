const leads = [
  { init: 'RK', color: '#ea580c', name: 'Rahul Kumar',  note: '3BHK interest · Budget match · Wants callback', score: 'Hot',   scoreClass: 'bg-red-50 text-red-500 border border-red-200'   },
  { init: 'SP', color: '#f59e0b', name: 'Sneha Patel',  note: 'Asked about floor plan · Site visit requested',  score: 'Visit', scoreClass: 'bg-orange-50 text-orange-600 border border-orange-200' },
  { init: 'AM', color: '#c2410c', name: 'Arjun Mehta',  note: 'Budget gap · Considering next quarter',           score: 'Warm',  scoreClass: 'bg-amber-50 text-amber-600 border border-amber-200'  },
]

const metrics = [
  { val: '3,240', label: 'Calls made',  cls: '' },
  { val: '1,896', label: 'Connected',   cls: '' },
  { val: '492',   label: 'Qualified',   cls: 'metric-green' },
  { val: '128',   label: 'Hot leads',   cls: 'metric-red'   },
]

const trustNames = ['Aparna', 'Prestige', 'Mahindra RE', 'PropEdge', 'Purva']

export default function PlatformSection() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden" id="platform">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.12fr] gap-[72px] items-center max-w-[1280px] mx-auto">

        {/* ── copy ── */}
        <div>
          <span className="inline-flex items-center gap-2 px-[13px] py-[5px] bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 text-[12px] font-bold uppercase tracking-[0.06em] rounded-full border border-orange-200 mb-4">
            Why CallOHM
          </span>
          <h2
            className="font-extrabold text-[#1c0700] tracking-[-0.03em] leading-[1.1] mb-[18px]"
            style={{ fontSize: 'clamp(26px, 3.2vw, 42px)' }}
          >
            Your leads deserve a faster, smarter first conversation.
          </h2>
          <p className="text-[16px] text-amber-900 leading-[1.72] mb-8">
            CallOHM deploys intelligent voice agents that call every lead in your
            pipeline, run real qualification conversations, and score each prospect
            automatically — so your sales team only speaks to buyers who are ready.
          </p>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-[0.08em]">
              Trusted by real estate teams across India
            </span>
            <div className="flex items-center gap-[10px] flex-wrap mt-[10px]">
              {trustNames.map((n) => (
                <span
                  key={n}
                  className="px-[13px] py-[5px] bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-[12px] font-semibold"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── product card ── */}
        <div className="relative max-w-[680px] w-full justify-self-center lg:justify-self-end" aria-label="CallOHM dashboard preview">
          <div className="relative z-[2] bg-white border border-[#fde8d8] rounded-[20px] p-5 shadow-[0_24px_64px_rgba(234,88,12,0.13),0_4px_16px_rgba(0,0,0,0.06)]">

            {/* header */}
            <div className="flex items-center justify-between mb-4 pb-[14px] border-b border-[#fef3e2]">
              <div className="flex items-center gap-2">
                <span className="pc-live-dot w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" aria-hidden="true" />
                <span className="text-[#1c0700] text-[14px] font-semibold">Mahindra Skyline · Phase 2</span>
              </div>
              <span className="px-[10px] py-[3px] bg-emerald-50 text-emerald-500 text-[11px] font-bold rounded-[6px] border border-emerald-100">
                Active
              </span>
            </div>

            {/* metrics */}
            <div className="grid grid-cols-2 gap-[10px] mb-[14px]">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-gradient-to-br from-[#fffaf7] to-[#fff7f2] border border-[#fde8d8] rounded-[12px] px-[14px] py-3"
                >
                  <strong
                    className={`block text-[24px] font-black tracking-[-0.03em] leading-none mb-1 ${
                      m.cls === 'metric-green' ? 'text-emerald-500' :
                      m.cls === 'metric-red'   ? 'text-red-500'     : 'text-[#1c0700]'
                    }`}
                  >
                    {m.val}
                  </strong>
                  <span className="text-[11px] text-amber-600 font-medium uppercase tracking-[0.05em]">{m.label}</span>
                </div>
              ))}
            </div>

            {/* leads */}
            <div className="flex flex-col gap-2 mb-[14px]">
              {leads.map((lead) => (
                <div
                  key={lead.name}
                  className="flex items-center gap-[10px] px-3 py-[10px] bg-[#fffaf7] border border-[#fde8d8] rounded-[10px] hover:bg-orange-50 hover:border-orange-300 transition-all duration-150"
                >
                  <span
                    className="flex-none grid place-items-center w-[34px] h-[34px] rounded-lg text-white text-[11px] font-bold"
                    style={{ background: lead.color }}
                  >
                    {lead.init}
                  </span>
                  <div className="flex-1 min-w-0">
                    <strong className="block text-[#1c0700] text-[13px] font-semibold">{lead.name}</strong>
                    <p className="text-amber-800 text-[11px] mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap m-0">{lead.note}</p>
                  </div>
                  <span className={`flex-none px-[9px] py-[3px] rounded-[6px] text-[11px] font-bold ${lead.scoreClass}`}>
                    {lead.score}
                  </span>
                </div>
              ))}
            </div>

            {/* agent bar */}
            <div className="flex items-center gap-3 px-[14px] py-3 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-[10px]">
              <div className="relative flex-none w-8 h-8 grid place-items-center" aria-hidden="true">
                <span className="pulse-ring" />
                <span className="pulse-core" />
              </div>
              <div>
                <span className="block text-[11px] font-semibold text-orange-700 uppercase tracking-[0.06em] mb-[2px]">
                  AI Agent · Arya
                </span>
                <p className="text-[12px] text-amber-800 m-0">Currently calling Priya Sharma...</p>
              </div>
            </div>
          </div>

          {/* floating chips */}
          <div className="float-chip chip-top px-4 py-[10px] bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-[12px] text-[13px] font-semibold shadow-[0_8px_28px_rgba(234,88,12,0.38)]">
            🔥 Hot lead — Rahul Kumar
          </div>
          <div className="float-chip chip-bot px-4 py-[10px] bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-[12px] text-[13px] font-semibold shadow-[0_8px_28px_rgba(234,88,12,0.38)]">
            📅 Site visit booked · Saturday 10 am
          </div>
        </div>

      </div>
    </section>
  )
}
