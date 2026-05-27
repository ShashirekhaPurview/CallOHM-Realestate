import { useState, useEffect, useRef } from 'react'
import {
  BarChart3, Phone, TrendingUp, Calendar, CheckCircle2,
  Clock, Users, Activity, ArrowUpRight,
} from 'lucide-react'

/* ── animated counter ─────────────────────────────────── */
function Counter({ target, suffix = '', duration = 1400 }) {
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
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ── top metric cards ─────────────────────────────────── */
const METRICS = [
  { Icon: Users,        label: 'Total Leads',       value: 265, suffix: '',  color: 'from-orange-400 to-orange-600',   bg: 'bg-orange-50',  ring: 'ring-orange-200' },
  { Icon: CheckCircle2, label: 'Calls Completed',   value: 247, suffix: '',  color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-200' },
  { Icon: Activity,     label: 'In Progress',        value: 18,  suffix: '',  color: 'from-sky-400 to-sky-600',         bg: 'bg-sky-50',     ring: 'ring-sky-200' },
  { Icon: TrendingUp,   label: 'Interested',         value: 163, suffix: '',  color: 'from-violet-400 to-violet-600',   bg: 'bg-violet-50',  ring: 'ring-violet-200' },
  { Icon: Calendar,     label: 'Site Visits Booked', value: 34,  suffix: '',  color: 'from-amber-400 to-amber-600',     bg: 'bg-amber-50',   ring: 'ring-amber-200' },
]

/* ── recent calls ─────────────────────────────────────── */
const CALLS = [
  { name: 'Rahul Mehta',  score: 92, tag: 'Site visit booked',  time: '2 min ago',  dot: 'bg-emerald-500' },
  { name: 'Priya Sharma', score: 78, tag: 'Callback scheduled', time: '11 min ago', dot: 'bg-orange-400'  },
  { name: 'Arjun Nair',   score: 85, tag: 'High intent - 3BHK', time: '24 min ago', dot: 'bg-emerald-500' },
  { name: 'Sneha Reddy',  score: 61, tag: 'Budget mismatch',    time: '38 min ago', dot: 'bg-amber-400'   },
]

/* ── mini bar data ────────────────────────────────────── */
const BARS = [
  { day: 'Mon', calls: 68, qual: 42 },
  { day: 'Tue', calls: 82, qual: 55 },
  { day: 'Wed', calls: 74, qual: 48 },
  { day: 'Thu', calls: 91, qual: 63 },
  { day: 'Fri', calls: 88, qual: 59 },
  { day: 'Sat', calls: 56, qual: 38 },
  { day: 'Sun', calls: 44, qual: 29 },
]
const MAX_BAR = Math.max(...BARS.map(b => b.calls))

/* ── left-side bullet points ──────────────────────────── */
const BULLETS = [
  { icon: Phone,        text: 'Live call tracking with real-time status updates per lead' },
  { icon: BarChart3,    text: 'Daily and weekly performance charts across your entire team' },
  { icon: TrendingUp,   text: 'AI-generated lead scores so your sales team prioritises fast' },
  { icon: CheckCircle2, text: 'Full call transcripts, tags, and CRM sync after every call' },
]

export default function AgentDemo() {
  const [barsVisible, setBarsVisible] = useState(false)
  const sectionRef   = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBarsVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-white" id="analytics">
      <div className="max-w-[1280px] mx-auto">

        {/* ── two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT - copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-5">
              <BarChart3 className="w-3.5 h-3.5" /> Analytics and Reporting
            </span>

            <h2 className="text-3xl lg:text-[2.6rem] font-extrabold text-[#1c0700] tracking-tight leading-[1.15] mb-5">
              Every call tracked.<br />
              Every lead scored.<br />
              <span className="text-orange-500">All in one place.</span>
            </h2>

            <p className="text-[16px] text-amber-900/60 leading-relaxed mb-8 max-w-[460px]">
              CallOHM gives your team real-time visibility into every outbound call - who was reached, how they responded, and exactly what to do next. No spreadsheets, no guesswork.
            </p>

            <ul className="space-y-4 mb-10">
              {BULLETS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </span>
                  <span className="text-[14px] text-amber-900/70 leading-snug pt-1">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 h-[50px] px-7 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-xl shadow-[0_4px_20px_rgba(234,88,12,0.36)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)] transition-all duration-150 no-underline"
            >
              See live dashboard <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* RIGHT - dashboard widget */}
          <div className="w-full rounded-2xl border border-orange-100 bg-white shadow-[0_8px_48px_rgba(234,88,12,0.10)] overflow-hidden">

            {/* widget header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100 bg-orange-50/60">
              <div>
                <p className="text-[13px] font-extrabold text-[#1c0700] tracking-tight">Today's Overview</p>
                <p className="text-[11px] text-amber-900/45 mt-0.5">Today's metrics - chart shows 7-day trend</p>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>

            {/* metric grid */}
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-5 sm:divide-x divide-orange-100 border-b border-orange-100 scrollbar-none">
              {METRICS.map(({ Icon, label, value, suffix, color, bg, ring }) => (
                <div key={label} className={`flex-shrink-0 w-[30vw] sm:w-auto flex flex-col items-center py-4 px-2 ${bg} text-center border-r border-orange-100 sm:border-r-0`}>
                  <span className={`inline-flex w-7 h-7 rounded-lg bg-gradient-to-br ${color} text-white items-center justify-center mb-2 ring-2 ${ring}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-[17px] font-extrabold text-[#1c0700] leading-none">
                    <Counter target={value} suffix={suffix} />
                  </p>
                  <p className="text-[10px] text-amber-900/50 font-medium mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* bar chart + recent calls */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1px_160px]">

              {/* bar chart */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[12px] font-bold text-[#1c0700]">7-Day Trend</p>
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-amber-900/50">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-400 inline-block" />Calls</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />Qualified</span>
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-[88px]">
                  {BARS.map(({ day, calls, qual }) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-[2px] h-[72px]">
                        <div
                          className="flex-1 rounded-t bg-gradient-to-t from-orange-500 to-orange-300 transition-all duration-700"
                          style={{ height: barsVisible ? `${(calls / MAX_BAR) * 100}%` : '0%' }}
                        />
                        <div
                          className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-emerald-300 transition-all duration-700 delay-150"
                          style={{ height: barsVisible ? `${(qual / MAX_BAR) * 100}%` : '0%' }}
                        />
                      </div>
                      <span className="text-[9px] text-amber-900/35 font-medium">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* divider - only visible on sm+ */}
              <div className="hidden sm:block bg-orange-100" />

              {/* recent calls */}
              <div className="p-4 flex flex-col border-t border-orange-100 sm:border-t-0">
                <p className="text-[11px] font-bold text-[#1c0700] mb-3">Recent Calls</p>
                <div className="flex flex-col gap-2.5 flex-1">
                  {CALLS.map(({ name, score, tag, time, dot }) => (
                    <div key={name} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center text-orange-700 text-[9px] font-extrabold mt-0.5">
                        {name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#1c0700] truncate leading-tight">{name}</p>
                        <p className="text-[9px] text-amber-900/45 truncate leading-tight">{tag}</p>
                        <p className="text-[9px] text-amber-900/30 flex items-center gap-0.5 mt-0.5">
                          <Clock className="w-2 h-2" />{time}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-0.5 mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                        <span className="text-[10px] font-extrabold text-[#1c0700]">{score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* score legend */}
                <div className="mt-3 pt-3 border-t border-orange-100 space-y-1">
                  <p className="text-[9px] text-amber-900/40 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />80-100 Hot</p>
                  <p className="text-[9px] text-amber-900/40 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />60-79 Warm</p>
                  <p className="text-[9px] text-amber-900/40 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />&lt;60 Cold</p>
                </div>
              </div>

            </div>

            {/* widget footer */}
            <div className="px-5 py-3.5 border-t border-orange-100 bg-orange-50/40 flex items-center justify-between">
              <p className="text-[11px] text-amber-900/50">Full transcripts, CRM sync, and follow-up queue generated automatically.</p>
              <a href="#demo" className="flex-shrink-0 text-[11px] font-bold text-orange-500 hover:text-orange-700 no-underline transition-colors duration-150 whitespace-nowrap ml-4">
                Open dashboard
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
