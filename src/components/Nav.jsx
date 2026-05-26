import { useState, useEffect } from 'react'

const shadowText = '[text-shadow:0_1px_8px_rgba(0,0,0,0.75)]'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`nav fixed inset-x-0 top-0 z-[100] px-6 transition-all duration-300 ${
        scrolled
          ? 'bg-white/[0.92] border-b border-orange-100 shadow-sm'
          : 'bg-transparent border-b border-white/10'
      }`}
    >
      <div className="flex items-center justify-between h-[68px] max-w-[1280px] mx-auto gap-6">

        <a className="flex items-center gap-2 no-underline" href="#top" aria-label="CallOHM home">
          <img src="/callohm-logo.png" alt="CallOHM" className="h-[38px] w-auto object-contain block" />
          <span className={`text-[18px] font-extrabold tracking-[-0.01em] transition-colors duration-300 ${
            scrolled ? 'text-orange-900' : `text-white ${shadowText}`
          }`}>
            CallOHM
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-[30px]" aria-label="Primary navigation">
          {[
            { label: 'Features',     href: '#features'     },
            { label: 'How it works', href: '#how-it-works' },
            { label: 'Analytics',    href: '#analytics'    },
            { label: 'Use cases',    href: '#use-cases'    },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-[14px] font-semibold no-underline transition-colors duration-300 ${
                scrolled
                  ? 'text-amber-900 hover:text-orange-600'
                  : `text-white hover:text-orange-200 ${shadowText}`
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[14px]">
          <a
            href="#login"
            className={`text-[14px] font-semibold no-underline transition-colors duration-300 ${
              scrolled
                ? 'text-amber-900 hover:text-orange-600'
                : `text-white hover:text-orange-200 ${shadowText}`
            }`}
          >
            Log in
          </a>
          <a
            href="#demo"
            className={`btn-primary inline-flex items-center justify-center h-[42px] px-5 text-white text-[14px] font-bold rounded-[10px] transition-all duration-150 whitespace-nowrap no-underline hover:translate-y-[-1px] ${
              scrolled
                ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)]'
                : 'bg-white/20 backdrop-blur-sm border border-white/50 hover:bg-white/30 shadow-md'
            }`}
          >
            Get started
          </a>
        </div>

      </div>
    </header>
  )
}
