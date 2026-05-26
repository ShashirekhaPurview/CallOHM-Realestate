import { useEffect, useRef, useState } from 'react'
import { MessageSquare, FileText, Cpu, Mic, Wrench, CheckCircle2 } from 'lucide-react'

const TILES = [
  {
    id: 'first-msg',
    Icon: MessageSquare,
    label: 'First Message',
    desc: 'Personalised opening that hooks the prospect in the first 3 seconds.',
    preview: '"Hi, this is Arya from Purva Developers. You recently enquired about our Whitefield project — is this a good time?"',
    color: '#f59e0b',
    span: 'lg:col-span-2',
    from: 'translateY(-60px) rotate(-3deg)',
  },
  {
    id: 'llm',
    Icon: Cpu,
    label: 'LLM',
    desc: 'Pick the AI model powering every conversation.',
    preview: 'GPT-4o · Claude 3.5 Sonnet · Gemini 1.5 Pro',
    color: '#f97316',
    span: 'lg:col-span-1',
    from: 'translateX(60px) rotate(3deg)',
  },
  {
    id: 'prompt',
    Icon: FileText,
    label: 'Prompt',
    desc: 'Project knowledge, pricing, USPs, objection handling & qualification rules.',
    preview: '2BHK from ₹72L · Metro connectivity · Ready possession in 6 months',
    color: '#ea580c',
    span: 'lg:col-span-1',
    from: 'translateX(-60px) rotate(-3deg)',
  },
  {
    id: 'voice',
    Icon: Mic,
    label: 'Voice',
    desc: 'Language, accent, gender, tone and speaking pace.',
    preview: 'Hindi · English · Female · Warm & professional',
    color: '#c2410c',
    span: 'lg:col-span-1',
    from: 'translateY(60px) rotate(2deg)',
  },
  {
    id: 'tools',
    Icon: Wrench,
    label: 'Tools',
    desc: 'Connect CRM, calendar booking and reporting integrations.',
    preview: 'Salesforce · HubSpot · Google Calendar · Sheets',
    color: '#9a3412',
    span: 'lg:col-span-1',
    from: 'translateX(60px) rotate(-2deg)',
  },
]

export default function AgentConfig() {
  const [placed, setPlaced] = useState(-1)
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect()
          TILES.forEach((_, i) => {
            setTimeout(() => {
              setPlaced(i)
              if (i === TILES.length - 1) setTimeout(() => setDone(true), 500)
            }, i * 220)
          })
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1c0e04 0%, #0f0702 55%, #1a0b05 100%)' }}
      id="configure"
    >
      {/* grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(249,115,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.06) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-orange-400 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-800/50 mb-4" style={{ background: 'rgba(154,52,18,0.2)' }}>
            Step 02 · Configure
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Five blocks. One{' '}
            <span style={{ background: 'linear-gradient(90deg, #f59e0b, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              intelligent agent.
            </span>
          </h2>
          <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(253,186,116,0.6)' }}>
            Configure each piece and watch your AI agent assemble — ready to call within minutes.
          </p>
        </div>

        {/* Tile grid */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[860px] mx-auto">
          {TILES.map((tile, i) => {
            const isPlaced = placed >= i
            return (
              <div
                key={tile.id}
                className={`${tile.span} rounded-2xl p-5 border relative overflow-hidden group cursor-default`}
                style={{
                  background: isPlaced ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                  borderColor: isPlaced ? `${tile.color}45` : 'rgba(255,255,255,0.06)',
                  opacity: isPlaced ? 1 : 0,
                  transform: isPlaced ? 'scale(1) translateY(0) rotate(0deg)' : `scale(0.75) ${tile.from}`,
                  transition: `opacity 0.55s cubic-bezier(0.34,1.56,0.64,1), transform 0.55s cubic-bezier(0.34,1.56,0.64,1), border-color 0.4s ease, background 0.4s ease`,
                  boxShadow: isPlaced ? `0 0 0 1px ${tile.color}20, 0 8px 32px rgba(0,0,0,0.4)` : 'none',
                }}
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${tile.color}18 0%, transparent 65%)` }}
                />

                {/* top row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-none"
                      style={{ background: `${tile.color}18`, border: `1.5px solid ${tile.color}40` }}
                    >
                      <tile.Icon size={16} color={tile.color} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: tile.color }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-[13px] font-bold text-white leading-tight">{tile.label}</h3>
                    </div>
                  </div>
                  {/* placed checkmark */}
                  <div
                    className="flex-none"
                    style={{
                      opacity: isPlaced ? 1 : 0,
                      transform: isPlaced ? 'scale(1)' : 'scale(0)',
                      transition: 'opacity 0.3s ease 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) 0.3s',
                    }}
                  >
                    <CheckCircle2 size={15} color={tile.color} strokeWidth={2} />
                  </div>
                </div>

                {/* description */}
                <p className="text-[12px] leading-relaxed mb-3" style={{ color: 'rgba(253,186,116,0.5)' }}>
                  {tile.desc}
                </p>

                {/* preview pill */}
                <div
                  className="text-[11px] font-mono leading-relaxed px-3 py-2 rounded-lg"
                  style={{
                    color: `${tile.color}cc`,
                    background: `${tile.color}0d`,
                    border: `1px solid ${tile.color}25`,
                  }}
                >
                  {tile.preview}
                </div>
              </div>
            )
          })}
        </div>

        {/* Agent ready badge */}
        <div
          className="flex justify-center mt-10"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border"
            style={{
              background: 'rgba(234,88,12,0.12)',
              borderColor: 'rgba(234,88,12,0.35)',
              boxShadow: '0 0 32px rgba(234,88,12,0.2)',
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ea580c', animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#f97316' }} />
            </span>
            <span className="text-sm font-bold text-orange-300 tracking-wide">Agent configured — ready to call</span>
          </div>
        </div>

      </div>
    </section>
  )
}
