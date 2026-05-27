import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/LandingPage/Nav'
import Footer from '../components/LandingPage/Footer'

const SALES_NUMBER = '+917032835934'

function formatPhone(n) {
  if (n.startsWith('+91') && n.length === 13)
    return `+91 ${n.slice(3, 8)} ${n.slice(8)}`
  return n
}

function downloadBrochure() {
  const a = document.createElement('a')
  a.href = '/CallOHM%20Brochure.pdf'
  a.download = 'CallOHM Brochure.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const CARDS = [
  {
    key: 'demo',
    gradient: 'from-orange-400 to-orange-600',
    shadow: 'shadow-[0_8px_32px_rgba(234,88,12,0.28)]',
    hoverShadow: 'hover:shadow-[0_16px_48px_rgba(234,88,12,0.4)]',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    title: 'Book a Demo',
    desc: 'See the platform in action, tailored to your use case.',
    cta: 'Schedule now →',
    Icon: () => (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'call',
    gradient: 'from-emerald-400 to-emerald-600',
    shadow: 'shadow-[0_8px_32px_rgba(16,185,129,0.25)]',
    hoverShadow: 'hover:shadow-[0_16px_48px_rgba(16,185,129,0.38)]',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    title: 'Call Us',
    desc: formatPhone(SALES_NUMBER),
    cta: null,
    Icon: () => (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    key: 'brochure',
    gradient: 'from-sky-400 to-sky-600',
    shadow: 'shadow-[0_8px_32px_rgba(14,165,233,0.25)]',
    hoverShadow: 'hover:shadow-[0_16px_48px_rgba(14,165,233,0.38)]',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    title: 'Download Brochure',
    desc: "A concise overview of CallOHM's platform and value story.",
    cta: 'Save PDF ↓',
    Icon: () => (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M5 20h14" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  function handleCard(key) {
    if (key === 'demo') navigate('/#demo')
    else if (key === 'call') {
      if (isMobile) window.location.href = `tel:${SALES_NUMBER}`
      else {
        navigator.clipboard.writeText(SALES_NUMBER).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }
    } else if (key === 'brochure') downloadBrochure()
  }

  return (
    <>
      <Nav solid />

      <main className="min-h-screen flex flex-col bg-white overflow-hidden">
        {/* decorative bg */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-orange-50/70 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-20 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-200 to-amber-100 opacity-25 blur-3xl" />

        <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-36 pb-24">
          {/* heading */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-5">
              Contact
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1c0700] tracking-tight leading-tight mb-4">
              Let's talk
            </h1>
            <p className="text-base text-amber-900/60 max-w-md mx-auto">
              Pick whatever works best for you, we're quick to respond.
            </p>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl">
            {CARDS.map(({ key, gradient, shadow, hoverShadow, bg, iconColor, title, desc, cta, Icon }) => {
              const isCall = key === 'call'
              const callCta = isMobile ? 'Call now →' : copied ? 'Copied! ✓' : 'Copy number'

              return (
                <button
                  key={key}
                  onClick={() => handleCard(key)}
                  className={`group flex flex-col items-center text-center rounded-2xl border border-gray-100 bg-white px-6 py-8 ${shadow} ${hoverShadow} hover:-translate-y-1 transition-all duration-200 cursor-pointer`}
                >
                  {/* icon circle */}
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg} ${iconColor} mb-5`}>
                    <Icon />
                  </div>

                  <h2 className="text-[17px] font-bold text-[#1c0700] mb-2">{title}</h2>
                  <p className="text-sm text-amber-900/60 leading-relaxed mb-6">{desc}</p>

                  <span className={`inline-flex items-center gap-1.5 text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {isCall ? callCta : cta}
                  </span>
                </button>
              )
            })}
          </div>

          {/* email strip */}
          <div className="mt-12 flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-amber-900/50">Prefer email?</p>
            <a
              href="mailto:hello@callohm.ai"
              className="text-[15px] font-semibold text-orange-600 hover:text-orange-700 no-underline transition-colors duration-150"
            >
              hello@callohm.ai
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
