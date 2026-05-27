import { Upload, Settings2, PhoneCall, BarChart3, CheckCircle2 } from 'lucide-react'

/* ── SVG geometry helpers ── */
const VB   = 480
const CX   = VB / 2
const CY   = VB / 2
const MID_R = 148
const STROKE_W = 80
const ICON_R   = MID_R
const GAP = 8  // degrees of gap between segments

function toRad(deg) { return (deg - 90) * (Math.PI / 180) }

function arcCoord(r, deg) {
  return { x: CX + r * Math.cos(toRad(deg)), y: CY + r * Math.sin(toRad(deg)) }
}

function arcD(startDeg, endDeg) {
  const s = startDeg + GAP / 2
  const e = endDeg   - GAP / 2
  const p1 = arcCoord(MID_R, s)
  const p2 = arcCoord(MID_R, e)
  const big = (e - s > 180) ? 1 : 0
  return `M${p1.x.toFixed(2)},${p1.y.toFixed(2)} A${MID_R},${MID_R} 0 ${big},1 ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
}

/* ── Step data (5 steps × 72° each) ── */
const STEPS = [
  {
    num: '01', Icon: Upload, label: 'Import',
    title: 'Upload your leads',
    desc:  'Import contacts from CSV, CRM exports, 99acres, Housing.com, MagicBricks, or expo registration lists.',
    color: '#f59e0b', light: '#fffbeb',
    start: 0,   end: 72,
  },
  {
    num: '02', Icon: Settings2, label: 'Configure',
    title: 'Configure your AI agent',
    desc:  'Add project details, pricing, USPs, and qualification rules. Define the persona and conversation flow.',
    color: '#f97316', light: '#fff7ed',
    start: 72,  end: 144,
    href: '#configure',
  },
  {
    num: '03', Icon: PhoneCall, label: 'Call',
    title: 'Launch outbound calls',
    desc:  'CallOHM dials every lead automatically, manages full conversations, and schedules retries for missed calls.',
    color: '#ea580c', light: '#fff1ee',
    start: 144, end: 216,
  },
  {
    num: '04', Icon: BarChart3, label: 'Analyse',
    title: 'Post-call analytics & reports',
    desc:  'Every call generates a transcript, lead score, sentiment analysis, objection flags, and a CRM-ready summary.',
    color: '#c2410c', light: '#fff0eb',
    start: 216, end: 288,
  },
  {
    num: '05', Icon: CheckCircle2, label: 'Convert',
    title: 'Receive ready-to-close leads',
    desc:  'Your sales team gets scored leads with summaries, transcripts, flagged objections, and suggested next steps.',
    color: '#9a3412', light: '#fef4f0',
    start: 288, end: 360,
  },
]

/* ── Step card ── */
function StepCard({ step, flip = false }) {
  const Tag = step.href ? 'a' : 'div'
  return (
    <Tag
      href={step.href}
      className={`flex items-start gap-3 p-5 bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 no-underline ${step.href ? 'cursor-pointer' : ''} ${flip ? 'flex-row-reverse text-right' : ''}`}
    >
      <div
        className="flex-none w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
        style={{ background: step.light, border: `1px solid ${step.color}40` }}
      >
        <step.Icon size={18} color={step.color} strokeWidth={1.8} />
      </div>
      <div>
        <div className={`flex items-center gap-2 mb-1 ${flip ? 'justify-end' : ''}`}>
          <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: step.color }}>{step.num}</span>
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{step.label}</span>
        </div>
        <h3 className="text-sm font-bold text-[#1c0700] mb-1 leading-snug">{step.title}</h3>
        <p className="text-xs text-amber-900/60 leading-relaxed">{step.desc}</p>
        {step.href && (
          <span className="text-[10px] font-bold uppercase tracking-widest mt-2 inline-block" style={{ color: step.color }}>
            Learn more →
          </span>
        )}
      </div>
    </Tag>
  )
}

/* ── Lifecycle circle (SVG) ── */
function LifecycleCircle() {
  // Gap angles between each of the 5 segments (at 72°, 144°, 216°, 288°, 360°/0°)
  const gapAngles = [36, 108, 180, 252, 324]

  return (
    <div className="relative w-full max-w-[400px] mx-auto select-none">

      <svg viewBox={`0 0 ${VB} ${VB}`} className="w-full h-auto drop-shadow-sm">

        {/* Outer track ring */}
        <circle cx={CX} cy={CY} r={MID_R} fill="none" stroke="#fde8d8" strokeWidth={STROKE_W + 6} />

        {/* Colored arc segments */}
        {STEPS.map(step => (
          <path
            key={step.num}
            d={arcD(step.start, step.end)}
            fill="none"
            stroke={step.color}
            strokeWidth={STROKE_W}
            strokeLinecap="round"
            opacity="0.92"
          />
        ))}

        {/* Clockwise chevron arrows at each gap */}
        {gapAngles.map((midGap, i) => {
          const pos = arcCoord(MID_R, midGap)
          const rot = midGap + 90
          return (
            <g key={i} transform={`translate(${pos.x.toFixed(1)},${pos.y.toFixed(1)}) rotate(${rot})`}>
              <path d="M-5,-3 L0,3 L5,-3" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            </g>
          )
        })}

        {/* Center circle */}
        <circle cx={CX} cy={CY} r={95} fill="white" />
        <circle cx={CX} cy={CY} r={90} fill="none" stroke="#fde8d8" strokeWidth="1.5" />
        <text x={CX} y={CY - 10} textAnchor="middle" fontSize="15" fontWeight="800" fill="#ea580c" fontFamily="Inter, sans-serif" letterSpacing="-0.5">
          CallOHM
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" fontSize="11" fontWeight="500" fill="#92400e" fontFamily="Inter, sans-serif">
          AI Voice Agent
        </text>
        <text x={CX} y={CY + 28} textAnchor="middle" fontSize="10" fontWeight="400" fill="#d97706" fontFamily="Inter, sans-serif">
          Platform
        </text>

      </svg>

      {/* Icon circles, HTML overlay */}
      {STEPS.map(step => {
        const mid  = (step.start + step.end) / 2
        const pos  = arcCoord(ICON_R, mid)
        const px   = (pos.x / VB) * 100
        const py   = (pos.y / VB) * 100
        return (
          <div
            key={step.num}
            className="absolute flex flex-col items-center gap-1 pointer-events-none"
            style={{ left: `${px}%`, top: `${py}%`, transform: 'translate(-50%,-50%)' }}
          >
            <div
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md"
              style={{ border: `2.5px solid ${step.color}` }}
            >
              <step.Icon size={19} color={step.color} strokeWidth={1.8} />
            </div>
            <span
              className="text-[10px] font-black px-1.5 py-0.5 rounded-full text-white"
              style={{ background: step.color, lineHeight: '14px' }}
            >
              {step.num}
            </span>
          </div>
        )
      })}

    </div>
  )
}

/* ── Main section ── */
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf7 50%, #fff4ec 100%)' }}
    >
      <div className="hw-grid-bg" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-4">
            How it works
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight leading-tight mb-3">
            From lead list to <span className="text-orange-600">sales-ready in 5 steps.</span>
          </h2>
          <p className="text-base text-amber-900/60 max-w-lg mx-auto leading-relaxed">
            Set up your AI agent once and let CallOHM handle outbound calling, analytics, and qualification at scale.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid grid-cols-[1fr_420px_1fr] gap-8 items-center">

          {/* Left, steps 05 & 04 */}
          <div className="flex flex-col gap-5">
            <div className="-mt-56" style={{ transform: 'translateX(60px)' }}>
              <StepCard step={STEPS[4]} flip />
            </div>
            <div style={{ marginTop: '90px', transform: 'translateX(-10px)' }}>
              <StepCard step={STEPS[3]} flip />
            </div>
          </div>

          {/* Center, circle + step 03 below */}
          <div className="flex flex-col items-center gap-6" style={{ marginTop: '-48px' }}>
            <LifecycleCircle />
            <StepCard step={STEPS[2]} />
          </div>

          {/* Right, steps 01 & 02 */}
          <div className="flex flex-col gap-5">
            <div className="-mt-56" style={{ transform: 'translateX(-60px)' }}>
              <StepCard step={STEPS[0]} />
            </div>
            <div style={{ marginTop: '90px', transform: 'translateX(10px)' }}>
              <StepCard step={STEPS[1]} />
            </div>
          </div>

        </div>

        {/* Mobile fallback */}
        <div className="lg:hidden">
          <LifecycleCircle />
          <div className="flex flex-col gap-4 mt-10">
            {STEPS.map(step => <StepCard key={step.num} step={step} />)}
          </div>
        </div>

      </div>
    </section>
  )
}
