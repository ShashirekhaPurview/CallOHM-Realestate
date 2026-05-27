import { useState, useEffect, useRef } from 'react'
import { BarChart3, TrendingUp, Calendar, CheckCircle2, Activity, ArrowUpRight, Phone } from 'lucide-react'

function Counter({ target, duration = 1200 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        setVal(Math.floor(p * p * target))
        if (p < 1) requestAnimationFrame(tick)
        else setVal(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{val}</span>
}

function CallTimer({ start }) {
  const [elapsed, setElapsed] = useState(Math.floor((Date.now() - start) / 1000))
  useEffect(() => {
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(id)
  }, [start])
  const m = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const s = String(elapsed % 60).padStart(2, '0')
  return <>{m}:{s}</>
}

const TICKER_ITEMS = [
  { name: 'Vikram Singh',  event: 'Site visit booked',   score: 94, dot: '#34d399' },
  { name: 'Anjali Patel',  event: 'High intent - 2BHK',  score: 88, dot: '#34d399' },
  { name: 'Rohit Kapoor',  event: 'Callback scheduled',  score: 74, dot: '#fb923c' },
  { name: 'Meera Nair',    event: 'Site visit booked',   score: 91, dot: '#34d399' },
  { name: 'Suresh Kumar',  event: 'Budget mismatch',     score: 55, dot: '#fbbf24' },
  { name: 'Divya Iyer',    event: 'High intent - 3BHK',  score: 86, dot: '#34d399' },
]

const BARS = [
  { day: 'Mon', calls: 68, qual: 42 },
  { day: 'Tue', calls: 82, qual: 55 },
  { day: 'Wed', calls: 74, qual: 48 },
  { day: 'Thu', calls: 91, qual: 63 },
  { day: 'Fri', calls: 88, qual: 59 },
  { day: 'Sat', calls: 56, qual: 38 },
  { day: 'Sun', calls: 44, qual: 29 },
]

const PIPELINE = [
  { label: 'Called',     value: 265, pct: 100, color: '#f97316' },
  { label: 'Answered',   value: 218, pct: 82,  color: '#fb923c' },
  { label: 'Interested', value: 163, pct: 61,  color: '#a78bfa' },
  { label: 'Site Visit', value: 34,  pct: 13,  color: '#34d399' },
  { label: 'Closed',     value: 12,  pct: 4.5, color: '#fbbf24' },
]

const CALLS = [
  { name: 'Rahul Mehta',  initials: 'RM', score: 92, tag: 'Site visit booked',  dot: '#34d399', sc: 'text-emerald-400' },
  { name: 'Priya Sharma', initials: 'PS', score: 78, tag: 'Callback scheduled', dot: '#f97316', sc: 'text-orange-400'  },
  { name: 'Arjun Nair',   initials: 'AN', score: 85, tag: 'High intent 3BHK',   dot: '#34d399', sc: 'text-emerald-400' },
  { name: 'Sneha Reddy',  initials: 'SR', score: 61, tag: 'Budget mismatch',    dot: '#fbbf24', sc: 'text-amber-400'   },
]


export default function AgentDemo() {
  const [barsVisible, setBarsVisible]     = useState(false)
  const [pipeVisible, setPipeVisible]     = useState(false)
  const [tickerIdx, setTickerIdx]         = useState(0)
  const [tickerFade, setTickerFade]       = useState(true)
  const [liveInProgress, setLiveInProgress] = useState(18)
  const [callStart]                       = useState(() => Date.now() - 47000)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setBarsVisible(true), 200)
        setTimeout(() => setPipeVisible(true), 400)
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTickerFade(false)
      setTimeout(() => { setTickerIdx(i => (i + 1) % TICKER_ITEMS.length); setTickerFade(true) }, 280)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setLiveInProgress(v => Math.max(14, Math.min(24, v + (Math.random() > 0.5 ? 1 : -1))))
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const ticker = TICKER_ITEMS[tickerIdx]

  return (
    <section ref={sectionRef} id="analytics" className="flex overflow-hidden">

      {/* ── LEFT: light content panel ── */}
      <div className="hidden lg:flex flex-col justify-center w-[42%] flex-shrink-0 px-12 xl:px-16 py-10 bg-[#fffcf8] border-r border-orange-100 relative overflow-hidden">

        {/* subtle bg decoration */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }} />

        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-[11px] font-bold uppercase tracking-widest mb-3 w-fit">
          <BarChart3 className="w-3 h-3" /> Analytics and Reporting
        </span>

        <h2 className="text-[1.75rem] xl:text-[2rem] font-extrabold text-[#1c0700] tracking-tight leading-[1.15] mb-2.5">
          Every call tracked.<br />
          Every lead scored.<br />
          <span className="text-orange-500">All in one place.</span>
        </h2>

        <p className="text-[13px] text-amber-900/55 leading-relaxed mb-4 max-w-[360px]">
          Real-time visibility into every outbound call - who was reached, how they responded, and what to do next. No spreadsheets, no guesswork.
        </p>

        {/* bullets */}
        <ul className="space-y-2 mb-5">
          {[
            { Icon: Phone,        text: 'Live call tracking with real-time status per lead'    },
            { Icon: BarChart3,    text: 'Daily and weekly performance charts across your team' },
            { Icon: TrendingUp,   text: 'AI lead scores so your sales team prioritises fast'   },
            { Icon: CheckCircle2, text: 'Full transcripts and CRM sync after every call'       },
            { Icon: Calendar,     text: 'Auto-schedule follow-ups and site visits from the dashboard' },
          ].map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5">
              <span className="w-7 h-7 flex-shrink-0 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-orange-500" />
              </span>
              <span className="text-[13px] text-amber-900/60 leading-snug">{text}</span>
            </li>
          ))}
        </ul>

        <a href="/book-demo"
          className="inline-flex items-center gap-2 h-[40px] px-5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[13px] font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(234,88,12,0.45)] transition-all duration-150 no-underline w-fit">
          See live dashboard <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ── RIGHT: dark dashboard panel ── */}
      <div className="flex-1 flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a0600 0%, #2a0e02 60%, #1a0600 100%)' }}>

        {/* dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* title bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 h-[44px] border-b border-white/[0.08]"
          style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-[5px]">
              <span className="w-[10px] h-[10px] rounded-full bg-red-500/50" />
              <span className="w-[10px] h-[10px] rounded-full bg-yellow-500/50" />
              <span className="w-[10px] h-[10px] rounded-full bg-emerald-500/50" />
            </div>
            <span className="text-[11px] text-white/20 font-mono">callohm - campaign overview</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </div>
        </div>

        {/* live ticker */}
        <div className="flex-shrink-0 flex items-center gap-3 px-5 h-[38px] border-b border-white/[0.07]"
          style={{ background: 'rgba(56,189,248,0.04)' }}>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-sky-400 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> LIVE
          </span>
          <div className="h-3 w-px bg-white/10 flex-shrink-0" />
          <div className="flex items-center gap-2 flex-1 min-w-0"
            style={{ opacity: tickerFade ? 1 : 0, transition: 'opacity 0.28s ease' }}>
            <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: `${ticker.dot}30`, border: `1px solid ${ticker.dot}60` }}>
              {ticker.name.charAt(0)}
            </span>
            <span className="text-[12px] font-semibold text-white/65 truncate">{ticker.name}</span>
            <span className="text-[11px] text-white/30 hidden sm:block">{ticker.event}</span>
            <span className="ml-auto flex-shrink-0 text-[11px] font-bold" style={{ color: ticker.dot }}>
              {ticker.score}
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1.5 border-l border-white/[0.07] pl-3">
            <Activity className="w-3 h-3 text-sky-400" />
            <span className="text-[11px] font-mono text-sky-300">
              <CallTimer start={callStart} />
            </span>
          </div>
        </div>

        {/* metrics row */}
        <div className="flex-shrink-0 grid grid-cols-5 divide-x divide-white/[0.07] border-b border-white/[0.07]">
          {[
            { label: 'Total Leads',   value: 265,            trend: '+12%', color: '#f97316', glow: 'rgba(249,115,22,0.1)'  },
            { label: 'Completed',     value: 247,            trend: '+8%',  color: '#34d399', glow: 'rgba(52,211,153,0.08)' },
            { label: 'In Progress',   value: liveInProgress, trend: 'live', color: '#38bdf8', glow: 'rgba(56,189,248,0.08)' },
            { label: 'Interested',    value: 163,            trend: '+21%', color: '#a78bfa', glow: 'rgba(167,139,250,0.08)'},
            { label: 'Site Visits',   value: 34,             trend: '+5%',  color: '#fbbf24', glow: 'rgba(251,191,36,0.08)' },
          ].map(({ label, value, trend, color, glow }) => (
            <div key={label} className="flex flex-col items-center py-3 px-2 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 120%, ${glow} 0%, transparent 70%)` }} />
              <p className="text-[20px] font-extrabold text-white leading-none" style={{ color }}>
                {label === 'In Progress'
                  ? <span style={{ transition: 'all 0.5s ease' }}>{value}</span>
                  : <Counter target={value} />
                }
              </p>
              <p className="text-[10px] text-white/30 font-medium mt-1">{label}</p>
              <span className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ color, background: `${color}18` }}>
                {trend}
              </span>
            </div>
          ))}
        </div>

        {/* charts */}
        <div className="h-[210px] flex-shrink-0 grid grid-cols-2 divide-x divide-white/[0.07] border-b border-white/[0.07]">

          {/* bar chart */}
          <div className="flex flex-col p-5">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <p className="text-[12px] font-bold text-white/65">7-Day Trend</p>
              <div className="flex items-center gap-3 text-[10px] text-white/25 font-semibold">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-orange-500 inline-block" />Calls</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />Qualified</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 flex-1 min-h-0">
              {BARS.map(({ day, calls, qual }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full">
                  <div className="w-full flex items-end gap-[2px] flex-1">
                    <div className="flex-1 rounded-t-[3px] transition-all duration-700 ease-out"
                      style={{
                        height: barsVisible ? `${(calls / 91) * 100}%` : '0%',
                        background: 'linear-gradient(to top, #ea580c, #fb923c)',
                        boxShadow: barsVisible ? '0 0 8px rgba(249,115,22,0.4)' : 'none',
                      }} />
                    <div className="flex-1 rounded-t-[3px] transition-all duration-700 ease-out"
                      style={{
                        height: barsVisible ? `${(qual / 91) * 100}%` : '0%',
                        transitionDelay: '120ms',
                        background: 'linear-gradient(to top, #059669, #34d399)',
                        boxShadow: barsVisible ? '0 0 8px rgba(52,211,153,0.3)' : 'none',
                      }} />
                  </div>
                  <span className="text-[9px] text-white/20 font-medium flex-shrink-0">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* pipeline */}
          <div className="flex flex-col p-5">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <p className="text-[12px] font-bold text-white/65">Lead Pipeline</p>
              <span className="text-[10px] font-bold text-emerald-400">4.5% close rate</span>
            </div>
            <div className="flex flex-col justify-between flex-1 min-h-0">
              {PIPELINE.map(({ label, value, pct, color }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="text-[10px] text-white/30 w-[60px] text-right flex-shrink-0">{label}</span>
                  <div className="flex-1 h-[22px] rounded-md overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-md flex items-center px-2 transition-all duration-700 ease-out"
                      style={{
                        width: pipeVisible ? `${pct}%` : '0%',
                        background: `linear-gradient(90deg, ${color}cc, ${color}77)`,
                        boxShadow: pipeVisible ? `0 0 10px ${color}40` : 'none',
                        minWidth: pipeVisible && pct > 0 ? '28px' : '0',
                      }}>
                      <span className="text-[10px] text-white/85 font-bold">{value}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-white/20 w-[28px] flex-shrink-0">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* recent calls */}
        <div className="flex-shrink-0 grid grid-cols-4 divide-x divide-white/[0.07]">
          {CALLS.map(({ name, initials, score, tag, dot, sc }) => (
            <div key={name} className="flex items-center gap-2.5 px-4 py-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                style={{ background: `${dot}20`, border: `1px solid ${dot}50` }}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white/70 truncate">{name}</p>
                <p className="text-[10px] text-white/25 truncate">{tag}</p>
              </div>
              <span className={`text-[17px] font-extrabold flex-shrink-0 ${sc}`}>{score}</span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 h-[38px] border-t border-white/[0.07]"
          style={{ background: 'rgba(0,0,0,0.25)' }}>
          <p className="text-[10px] text-white/20">Transcripts, CRM sync, and follow-up queue auto-generated after every call.</p>
          <a href="/book-demo"
            className="flex items-center gap-1 text-[11px] font-bold text-orange-400 hover:text-orange-300 no-underline transition-colors whitespace-nowrap ml-4">
            Get started <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  )
}
