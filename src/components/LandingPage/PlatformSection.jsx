import { useState, useEffect, useRef } from 'react'
import { PhoneCall, CheckCircle2, Mic, ArrowRight } from 'lucide-react'

const VALUE_PROPS = [
  { Icon: PhoneCall,    text: 'Calls every lead, 24 hours a day, 7 days a week' },
  { Icon: Mic,          text: 'Natural AI voice that handles objections fluently' },
  { Icon: CheckCircle2, text: 'Scores and ranks every lead automatically after the call' },
]

function ScorePill({ score }) {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f97316' : '#f59e0b'
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black text-white"
      style={{ background: color, boxShadow: `0 0 10px ${color}55` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
      Score {score}
    </span>
  )
}

const ALL_LINES = [
  { from: 'agent', text: "Good morning Priya! Calling about 3BHK units at Mahindra Skyline Phase 2." },
  { from: 'lead',  text: "Yes, I enquired last week. Is the 12th floor still available?" },
  { from: 'agent', text: "It is! Your budget of 1.2 Cr is a perfect fit. Shall we book a site visit?" },
  { from: 'lead',  text: "Sounds great. Saturday morning works for me." },
  { from: 'agent', text: "Perfect! Noted Saturday 10 AM. You'll receive a confirmation SMS shortly." },
  { from: 'lead',  text: "Thank you. Looking forward to it!" },
]

export default function PlatformSection() {
  const [messages, setMessages] = useState([ALL_LINES[0]])
  const [typing,   setTyping]   = useState(false)
  const [nextFrom, setNextFrom] = useState('lead')
  const [timer,    setTimer]    = useState(0)

  const idxRef      = useRef(0)
  const intervalRef = useRef(null)
  const timeoutRef  = useRef(null)
  const scrollRef   = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      /* clear any pending timeout from previous tick */
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      const nextIdx = (idxRef.current + 1) % ALL_LINES.length
      setNextFrom(ALL_LINES[nextIdx].from)
      setTyping(true)

      timeoutRef.current = setTimeout(() => {
        setTyping(false)
        idxRef.current = nextIdx

        setMessages(prev => {
          /* reset on loop */
          if (nextIdx === 0) return [ALL_LINES[0]]
          /* guard against StrictMode double-fire */
          const last = prev[prev.length - 1]
          if (last && last.text === ALL_LINES[nextIdx].text) return prev
          return [...prev, ALL_LINES[nextIdx]]
        })
      }, 700)
    }, 2000)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  /* scroll to bottom when messages or typing changes */
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, typing])

  /* call timer */
  useEffect(() => {
    const id = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(timer / 60)).padStart(2, '0')
  const ss = String(timer % 60).padStart(2, '0')

  return (
    <section
      id="platform"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #431407 0%, #7c2d12 45%, #c2410c 100%)' }}
    >
      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        aria-hidden="true" />

      {/* glow blobs */}
      <div className="absolute top-[15%] right-[8%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[10%] left-[5%] w-[240px] h-[240px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 py-14">

        {/* TOP - centered heading */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 text-orange-200 text-[11px] font-bold uppercase tracking-widest rounded-full border border-white/20 mb-3">
            Why CallOHM
          </span>
          <h2 className="text-[clamp(24px,3.2vw,44px)] font-black text-white tracking-tight leading-[1.15]">
            Every lead called. Every conversation qualified.<br />
            <span className="text-orange-300">Your team only meets buyers ready to close.</span>
          </h2>
        </div>

        {/* BOTTOM - side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT - copy */}
          <div>
            <p className="text-[14px] sm:text-[15px] text-orange-100/60 leading-relaxed mb-7 max-w-[460px]">
              CallOHM's AI voice agent calls every lead, runs a full qualification conversation, and hands your sales team a scored, ready-to-close pipeline, around the clock.
            </p>

            <ul className="space-y-3.5 mb-8">
              {VALUE_PROPS.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-orange-300" />
                  </span>
                  <span className="text-[13px] text-white/80 leading-snug pt-1">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 h-[46px] px-6 bg-white text-orange-600 text-[14px] font-bold rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition-all duration-150 no-underline"
            >
              See it in action <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* RIGHT - live call card */}
          <div className="w-full max-w-[480px] lg:max-w-none mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.32)] overflow-hidden">

              {/* call bar */}
              <div className="px-4 py-3 flex items-center justify-between"
                style={{ background: 'linear-gradient(90deg, #c2410c 0%, #ea580c 100%)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="relative flex-shrink-0 w-8 h-8 grid place-items-center">
                    <span className="absolute inset-0 rounded-full border-2 border-white/40"
                      style={{ animation: 'ripple 2s ease-out infinite' }} />
                    <span className="w-3.5 h-3.5 rounded-full bg-white/90 shadow" />
                  </div>
                  <div>
                    <p className="text-white text-[12px] font-extrabold leading-none">Arya - AI Voice Agent</p>
                    <p className="text-orange-100/70 text-[10px] mt-0.5">Live call in progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <ScorePill score={78} />
                  <span className="text-white/80 text-[12px] font-mono font-bold">{mm}:{ss}</span>
                </div>
              </div>

              {/* lead row */}
              <div className="px-4 py-2.5 flex items-center gap-2.5 border-b border-orange-100">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center text-orange-700 text-[11px] font-extrabold">
                  PS
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#1c0700] leading-none">Priya Sharma</p>
                  <p className="text-[11px] text-amber-900/50 mt-0.5">+91 98765 43210 - Mumbai</p>
                </div>
                <span className="flex-shrink-0 px-2 py-0.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold">
                  3BHK interest
                </span>
              </div>

              {/* fixed-height chat window, agent LEFT, lead RIGHT */}
              <div
                ref={scrollRef}
                className="px-4 py-3 overflow-y-auto scrollbar-none flex flex-col gap-2.5"
                style={{ height: '180px' }}
              >
                {messages.map((line, i) => {
                  const isAgent = line.from === 'agent'
                  return (
                    <div key={i} className={`flex items-end gap-1.5 ${isAgent ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* avatar */}
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white mb-0.5"
                        style={{ background: isAgent ? '#ea580c' : '#10b981' }}
                      >
                        {isAgent ? 'A' : 'P'}
                      </div>
                      {/* bubble */}
                      <div
                        className="max-w-[78%] px-3 py-1.5 text-[11px] leading-snug"
                        style={
                          isAgent
                            ? { background: '#fff7ed', color: '#1c0700', border: '1px solid #fed7aa', borderRadius: '12px 12px 12px 3px' }
                            : { background: '#10b981', color: 'white', borderRadius: '12px 12px 3px 12px' }
                        }
                      >
                        {line.text}
                      </div>
                    </div>
                  )
                })}

                {/* typing indicator */}
                {typing && (
                  <div className={`flex items-end gap-1.5 ${nextFrom === 'agent' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white mb-0.5"
                      style={{ background: nextFrom === 'agent' ? '#ea580c' : '#10b981' }}
                    >
                      {nextFrom === 'agent' ? 'A' : 'P'}
                    </div>
                    <div
                      className="px-3 py-2 flex items-center gap-1"
                      style={
                        nextFrom === 'agent'
                          ? { background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px 12px 12px 3px' }
                          : { background: '#10b981', borderRadius: '12px 12px 3px 12px' }
                      }
                    >
                      {[0, 1, 2].map(d => (
                        <span key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: nextFrom === 'agent' ? '#ea580c' : 'rgba(255,255,255,0.7)', animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* outcome tags */}
              <div className="px-4 py-2.5 border-t border-orange-100 bg-orange-50/60 flex items-center gap-1.5 flex-wrap">
                {['Budget confirmed', 'Site visit - Saturday', '3BHK preferred'].map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-orange-200 text-[10px] font-semibold text-orange-700">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" />{tag}
                  </span>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
