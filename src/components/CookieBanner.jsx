import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'callohm_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const tid = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(tid)
    }
  }, [])

  const dismiss = (choice) => {
    setLeaving(true)
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, choice)
      setVisible(false)
      setLeaving(false)
    }, 400)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-5 right-5 z-[200] w-[300px]"
      style={{
        transform: leaving ? 'translateY(120%)' : 'translateY(0)',
        opacity:   leaving ? 0 : 1,
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.28)]"
        style={{ background: 'linear-gradient(145deg, #431407 0%, #7c2d12 55%, #c2410c 100%)' }}
      >
        {/* dot grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }} />

        {/* glow blob */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 70%)' }} />

        <div className="relative z-10 p-5">

          {/* icon + title row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[22px]"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
              🍪
            </div>
            <div>
              <p className="text-white text-[13px] font-extrabold leading-none">Cookie Preferences</p>
              <p className="text-orange-200/60 text-[10px] mt-0.5 font-medium">callohm.ai</p>
            </div>
          </div>

          {/* description */}
          <p className="text-[11px] text-white/60 leading-relaxed mb-4">
            We use cookies to improve your experience and analyse usage.
            See our{' '}
            <Link
              to="/cookies"
              className="text-orange-300 font-semibold hover:text-orange-200 transition-colors"
              onClick={() => dismiss('deferred')}
            >
              Cookie Policy
            </Link>{' '}
            for details.
          </p>

          {/* buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => dismiss('accepted')}
              className="w-full h-[38px] bg-white text-orange-600 text-[13px] font-bold rounded-xl hover:bg-orange-50 transition-colors duration-150 border-none cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
            >
              Accept all cookies
            </button>
            <button
              onClick={() => dismiss('declined')}
              className="w-full h-[34px] text-white/50 text-[12px] font-medium hover:text-white/80 transition-colors duration-150 border-none bg-transparent cursor-pointer"
            >
              No thanks, decline
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
