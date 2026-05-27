import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'

const shadowText = '[text-shadow:0_1px_8px_rgba(0,0,0,0.75)]'

const COMPANY_LINKS = [
  { label: 'About us',   to: '/about'      },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Contact',    to: '/contact'    },
]

const NAV_LINKS = [
  { label: 'Home',         href: '/',              section: null,           route: null       },
  { label: 'How it works', href: '/#how-it-works', section: 'how-it-works', route: null       },
  { label: 'Features',     href: '/#features',     section: 'features',     route: null       },
  { label: 'Analytics',    href: '/#analytics',    section: 'analytics',    route: null       },
  { label: 'Use cases',    href: '/#use-cases',    section: 'use-cases',    route: null       },
  { label: 'Pricing',      href: '/pricing',       section: null,           route: '/pricing' },
]

export default function Nav({ solid = false }) {
  const [scrolled,      setScrolled]      = useState(false)
  const [companyOpen,   setCompanyOpen]   = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const dropdownRef = useRef(null)
  const location    = useLocation()
  const navigate    = useNavigate()

  const isHome  = location.pathname === '/'
  const isSolid = solid || scrolled || mobileOpen

  // scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setCompanyOpen(false) }, [location.pathname])

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // IntersectionObserver to track active section (landing page only)
  useEffect(() => {
    if (!isHome) { setActiveSection(null); return }
    const sectionIds = NAV_LINKS.map((l) => l.section).filter(Boolean)
    const observers = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    const onScroll = () => { if (window.scrollY < 120) setActiveSection(null) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [isHome])

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setCompanyOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const companyPaths = ['/about', '/leadership', '/contact']
  const isCompanyActive = companyPaths.includes(location.pathname)

  const isLinkActive = (section, route) => {
    if (route) return location.pathname === route
    if (!isHome) return false
    if (section === null) return activeSection === null
    return activeSection === section
  }

  const activeCls   = isSolid ? 'text-orange-500' : 'text-orange-300'
  const inactiveCls = isSolid
    ? 'text-amber-900 hover:text-orange-500'
    : `text-white hover:text-orange-200 ${shadowText}`

  const getLinkCls = (section, route) => {
    const base = 'relative text-[14px] font-semibold no-underline transition-colors duration-200 pb-[2px]'
    const color = isLinkActive(section, route) ? activeCls : inactiveCls
    return `${base} ${color}`
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] px-4 sm:px-6 transition-all duration-300 ${
          isSolid
            ? 'bg-white/[0.97] border-b border-orange-100 shadow-sm backdrop-blur-md'
            : 'bg-transparent border-b border-white/10'
        }`}
      >
        <div className="flex items-center justify-between h-[64px] sm:h-[68px] max-w-[1280px] mx-auto gap-4">

          {/* Logo */}
          <button
            onClick={() => { navigate('/'); setMobileOpen(false) }}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 flex-shrink-0"
            aria-label="CallOHM home"
          >
            <img src="/callohm-realestate-logo.png" alt="CallOHM" className="h-[34px] sm:h-[38px] w-auto object-contain block" />
            <span className={`text-[16px] sm:text-[18px] font-extrabold tracking-[-0.01em] transition-colors duration-300 ${
              isSolid ? 'text-orange-900' : `text-white ${shadowText}`
            }`}>
              CallOHM
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-[22px] lg:gap-[26px]" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href, section, route }) => {
              const active = isLinkActive(section, route)
              const isHomeLink = href === '/'
              const underline = (
                <span
                  className={`absolute left-0 -bottom-[4px] h-[2px] rounded-full bg-orange-500 transition-all duration-300 ${
                    active ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              )
              if (isHomeLink) {
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => navigate('/')}
                    className={`${getLinkCls(section, route)} bg-transparent border-none cursor-pointer`}
                  >
                    {label}
                    {underline}
                  </button>
                )
              }
              return (
                <a key={href} href={href} className={getLinkCls(section, route)}>
                  {label}
                  {underline}
                </a>
              )
            })}

            {/* Company dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCompanyOpen((o) => !o)}
                className={`relative flex items-center gap-1 text-[14px] font-semibold bg-transparent border-none cursor-pointer p-0 pb-[2px] transition-colors duration-200 ${
                  isCompanyActive || companyOpen
                    ? activeCls
                    : isSolid
                      ? 'text-amber-900 hover:text-orange-500'
                      : `text-white hover:text-orange-200 ${shadowText}`
                }`}
              >
                Company
                <ChevronDown className={`w-[14px] h-[14px] transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`} />
                <span
                  className={`absolute left-0 -bottom-[4px] h-[2px] rounded-full bg-orange-500 transition-all duration-300 ${
                    isCompanyActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </button>

              {companyOpen && (
                <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-44 bg-white rounded-2xl border border-orange-100 shadow-[0_16px_48px_rgba(234,88,12,0.14)] py-2 z-50">
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-orange-100 rotate-45" />
                  {COMPANY_LINKS.map(({ label, to }) => {
                    const isActive = location.pathname === to
                    return (
                      <Link
                        key={label}
                        to={to}
                        className={`block px-4 py-2.5 text-[13px] font-semibold no-underline transition-colors duration-150 ${
                          isActive
                            ? 'bg-orange-50 text-orange-600'
                            : 'text-amber-900 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-[14px]">
            <a
              href="/login"
              className={`text-[14px] font-semibold no-underline transition-colors duration-200 ${
                isSolid ? 'text-amber-900 hover:text-orange-500' : `text-white hover:text-orange-200 ${shadowText}`
              }`}
            >
              Log in
            </a>
            <a
              href="/book-demo"
              className={`inline-flex items-center justify-center h-[42px] px-5 text-white text-[14px] font-bold rounded-[10px] transition-all duration-150 whitespace-nowrap no-underline hover:-translate-y-[1px] ${
                isSolid
                  ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)]'
                  : 'bg-white/20 backdrop-blur-sm border border-white/50 hover:bg-white/30 shadow-md'
              }`}
            >
              Get started
            </a>
          </div>

          {/* Mobile: Get started + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center h-[38px] px-4 text-white text-[13px] font-bold rounded-[9px] whitespace-nowrap no-underline bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-[0_4px_12px_rgba(234,88,12,0.36)]"
            >
              Get started
            </a>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={`p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors duration-150 ${
                isSolid ? 'text-amber-900 hover:bg-orange-50' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] flex flex-col md:hidden" style={{ paddingTop: '64px' }}>
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />

          {/* panel */}
          <div className="relative z-10 bg-white border-b border-orange-100 shadow-xl overflow-y-auto">
            <div className="px-5 py-6 flex flex-col gap-1">

              {NAV_LINKS.map(({ label, href, section, route }) => {
                const active = isLinkActive(section, route)
                const isHomeLink = href === '/'
                const cls = `flex items-center h-12 px-4 rounded-xl text-[15px] font-semibold no-underline transition-colors duration-150 ${
                  active ? 'bg-orange-50 text-orange-600' : 'text-amber-900 hover:bg-orange-50 hover:text-orange-600'
                }`
                if (isHomeLink) {
                  return (
                    <button
                      key={href}
                      type="button"
                      onClick={() => { navigate('/'); setMobileOpen(false) }}
                      className={`${cls} w-full text-left bg-transparent border-none cursor-pointer`}
                    >
                      {label}
                    </button>
                  )
                }
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cls}
                  >
                    {label}
                  </a>
                )
              })}

              {/* Company group */}
              <div className="mt-1">
                <p className="px-4 text-[11px] font-bold text-amber-900/40 uppercase tracking-widest mb-1">Company</p>
                {COMPANY_LINKS.map(({ label, to }) => {
                  const active = location.pathname === to
                  return (
                    <Link
                      key={label}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center h-12 px-4 rounded-xl text-[15px] font-semibold no-underline transition-colors duration-150 ${
                        active ? 'bg-orange-50 text-orange-600' : 'text-amber-900 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {label}
                    </Link>
                  )
                })}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-orange-100 flex flex-col gap-3">
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center h-12 px-5 rounded-xl text-[15px] font-semibold text-amber-900 border border-orange-200 no-underline hover:bg-orange-50 transition-colors duration-150"
                >
                  Log in
                </a>
                <a
                  href="/book-demo"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center h-12 px-5 rounded-xl text-[15px] font-bold text-white no-underline bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-[0_4px_16px_rgba(234,88,12,0.36)]"
                >
                  Book a live demo
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
