import { useEffect, useRef, useState } from 'react'
import { MessageSquare, FileText, Cpu, Mic, Wrench, ThumbsUp } from 'lucide-react'

/* ── geometry ── */
const VB = 640
const CX = 320
const CY = 320
const R  = 220

function polar(deg) {
  const rad = (deg - 90) * (Math.PI / 180)
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
}

const NODES = [
  {
    Icon: MessageSquare, label: 'First Message',
    sub: 'Personalised hook in seconds',
    color: '#f59e0b', deg: 36,
    flyFrom: 'translate(100px,-100px) scale(0.1)',
    labelSide: 'right',
  },
  {
    Icon: FileText, label: 'Prompt',
    sub: 'Project knowledge & rules',
    color: '#f97316', deg: 108,
    flyFrom: 'translate(110px,70px) scale(0.1)',
    labelSide: 'right',
  },
  {
    Icon: Cpu, label: 'LLM',
    sub: 'AI model powering the call',
    color: '#ea580c', deg: 180,
    flyFrom: 'translate(0,120px) scale(0.1)',
    labelSide: 'bottom',
  },
  {
    Icon: Mic, label: 'Voice',
    sub: 'Language, tone & accent',
    color: '#c2410c', deg: 252,
    flyFrom: 'translate(-110px,70px) scale(0.1)',
    labelSide: 'left',
  },
  {
    Icon: Wrench, label: 'Tools',
    sub: 'CRM & calendar connect',
    color: '#9a3412', deg: 324,
    flyFrom: 'translate(-100px,-100px) scale(0.1)',
    labelSide: 'left',
  },
]

function LabelEl({ node, isActive }) {
  const base = {
    position: 'absolute',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    opacity: isActive ? 1 : 0,
    transition: `opacity 0.4s ease ${isActive ? '0.35s' : '0s'}`,
  }

  if (node.labelSide === 'right') return (
    <div style={{ ...base, left: '96px', top: '50%', transform: 'translateY(-50%)' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1c0700' }}>{node.label}</div>
      <div style={{ fontSize: '11px', color: 'rgba(120,53,15,0.55)', marginTop: '2px' }}>{node.sub}</div>
    </div>
  )

  if (node.labelSide === 'left') return (
    <div style={{ ...base, right: '96px', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1c0700' }}>{node.label}</div>
      <div style={{ fontSize: '11px', color: 'rgba(120,53,15,0.55)', marginTop: '2px' }}>{node.sub}</div>
    </div>
  )

  // bottom
  return (
    <div style={{ ...base, top: '96px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1c0700' }}>{node.label}</div>
      <div style={{ fontSize: '11px', color: 'rgba(120,53,15,0.55)', marginTop: '2px' }}>{node.sub}</div>
    </div>
  )
}

export default function AgentConfig() {
  const [nodeActive,  setNodeActive]  = useState(-1)
  const [arrowActive, setArrowActive] = useState(-1)
  const [done,        setDone]        = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const tids = []
    const STEP = 1000
    const TOTAL = 400 + (NODES.length - 1) * STEP * 2 + STEP + 600

    const run = () => {
      while (tids.length) clearTimeout(tids.pop())
      setNodeActive(-1)
      setArrowActive(-1)
      setDone(false)
      NODES.forEach((_, i) => {
        tids.push(setTimeout(() => setNodeActive(i),  400 + i * STEP * 2))
        tids.push(setTimeout(() => setArrowActive(i), 400 + i * STEP * 2 + STEP))
      })
      tids.push(setTimeout(() => setDone(true), TOTAL))
      tids.push(setTimeout(run, TOTAL + 2200))   // loop after 2.2s on "done"
    }

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { obs.disconnect(); run() }
    }, { threshold: 0.3 })

    if (ref.current) obs.observe(ref.current)
    return () => { obs.disconnect(); tids.forEach(clearTimeout) }
  }, [])

  return (
    <section
      id="configure"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#ffffff 0%,#fffaf7 50%,#fff4ec 100%)' }}
    >
      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle,rgba(234,88,12,0.1) 1px,transparent 1px)',
        backgroundSize: '38px 38px',
      }} />

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-4">
            Step 02 · Configure
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight leading-tight mb-3">
            Five blocks. One <span className="text-orange-600">intelligent agent.</span>
          </h2>
          <p className="text-base text-amber-900/60 max-w-md mx-auto leading-relaxed">
            Configure each piece and watch your AI agent come together, ready to call in minutes.
          </p>
        </div>

        {/* diagram - desktop */}
        <div ref={ref} className="hidden sm:block relative mx-auto" style={{ width: '100%', maxWidth: '680px', aspectRatio: '1/1' }}>

          {/* SVG: arc arrows */}
          <svg viewBox={`0 0 ${VB} ${VB}`} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>

            {/* arc arrows between nodes (1→2, 2→3, 3→4, 4→5), no return arrow */}
            {NODES.map((n, i) => {
              if (i === NODES.length - 1) return null   // no Tools→First Message arrow
              const next = NODES[(i + 1) % NODES.length]
              const GAP = 18
              const startDeg = n.deg + GAP
              const endDeg   = next.deg - GAP + (next.deg <= n.deg ? 360 : 0)
              const sRad = (startDeg - 90) * Math.PI / 180
              const eRad = (endDeg   - 90) * Math.PI / 180
              const x1 = CX + R * Math.cos(sRad)
              const y1 = CY + R * Math.sin(sRad)
              const x2 = CX + R * Math.cos(eRad)
              const y2 = CY + R * Math.sin(eRad)
              const sweep = endDeg - startDeg
              const largeArc = sweep > 180 ? 1 : 0
              const arcLen = (sweep / 360) * 2 * Math.PI * R
              const isOn = arrowActive >= i

              // arrowhead: small triangle tangent to circle at endpoint
              // clockwise tangent direction at endDeg = endDeg degrees from east
              const arrowRot = endDeg

              return (
                <g key={i}>
                  {/* arc line */}
                  <path
                    d={`M${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)}`}
                    fill="none" stroke={n.color} strokeWidth="2" strokeOpacity="0.65" strokeLinecap="round"
                    strokeDasharray={arcLen}
                    style={{
                      strokeDashoffset: isOn ? 0 : arcLen,
                      transition: `stroke-dashoffset 0.55s ease ${isOn ? '0.2s' : '0s'}`,
                    }}
                  />
                  {/* arrowhead, only visible when arc is drawn */}
                  <polygon
                    points="-6,-4 6,0 -6,4"
                    fill={n.color}
                    transform={`translate(${x2.toFixed(1)},${y2.toFixed(1)}) rotate(${arrowRot})`}
                    style={{
                      opacity: isOn ? 0.75 : 0,
                      transition: `opacity 0.25s ease ${isOn ? '0.55s' : '0s'}`,
                    }}
                  />
                </g>
              )
            })}

          </svg>

          {/* center circle */}
          <div className="absolute rounded-full flex flex-col items-center justify-center"
            style={{
              left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
              width: '130px', height: '130px',
              background: done
                ? 'linear-gradient(135deg,#f59e0b 0%,#ea580c 55%,#9a3412 100%)'
                : 'white',
              border: done ? 'none' : '2.5px solid #fde8d8',
              boxShadow: done
                ? '0 0 0 10px rgba(234,88,12,0.12), 0 0 48px rgba(234,88,12,0.3)'
                : '0 4px 32px rgba(234,88,12,0.12)',
              transition: 'background 0.7s ease, box-shadow 0.7s ease, border 0.7s ease',
              zIndex: 20,
            }}
          >
            {done && <div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(234,88,12,0.35)', animation: 'ripple 2s ease-out infinite' }} />}

            {done ? (
              <>
                <ThumbsUp size={28} color="white" strokeWidth={2} />
                <span className="text-[13px] font-black text-white mt-2">Agent Ready</span>
                <span className="text-[10px] text-white/75">to call</span>
              </>
            ) : (
              <>
                <span className="text-[12px] font-black text-orange-600 tracking-wide">AI Agent</span>
                <div className="flex gap-1.5 mt-2.5">
                  {NODES.map((n, i) => (
                    <div key={i} className="rounded-full transition-all duration-500"
                      style={{
                        width: nodeActive >= i ? '8px' : '5px',
                        height: nodeActive >= i ? '8px' : '5px',
                        background: nodeActive >= i ? n.color : '#fde8d8',
                        boxShadow: nodeActive >= i ? `0 0 6px ${n.color}80` : 'none',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* node circles */}
          {NODES.map((n, i) => {
            const p = polar(n.deg)
            const px = (p.x / VB) * 100
            const py = (p.y / VB) * 100
            const isOn = nodeActive >= i

            return (
              <div key={i} className="absolute" style={{
                left: `${px}%`, top: `${py}%`,
                transform: isOn
                  ? 'translate(-50%,-50%) scale(1) rotate(0deg)'
                  : `translate(-50%,-50%) ${n.flyFrom}`,
                opacity: isOn ? 1 : 0,
                transition: `transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease`,
                zIndex: 10,
              }}>
                {/* node circle */}
                <div className="w-[76px] h-[76px] rounded-full bg-white flex items-center justify-center relative"
                  style={{
                    border: `2.5px solid ${n.color}`,
                    boxShadow: `0 0 0 7px ${n.color}18, 0 8px 28px rgba(0,0,0,0.1)`,
                  }}
                >
                  <n.Icon size={26} color={n.color} strokeWidth={1.6} />

                  {/* step number badge */}
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: n.color, boxShadow: `0 2px 6px ${n.color}60` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* label */}
                <LabelEl node={n} isActive={isOn} />
              </div>
            )
          })}

        </div>

        {/* mobile card list */}
        <div className="sm:hidden flex flex-col gap-4 mt-4">
          {NODES.map((n, i) => (
            <div
              key={n.label}
              className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-orange-100 shadow-sm"
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center"
                style={{ border: `2.5px solid ${n.color}`, boxShadow: `0 0 0 6px ${n.color}18` }}
              >
                <n.Icon size={20} color={n.color} strokeWidth={1.7} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: n.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] font-bold text-[#1c0700]">{n.label}</span>
                </div>
                <p className="text-xs text-amber-900/60 leading-relaxed">{n.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
