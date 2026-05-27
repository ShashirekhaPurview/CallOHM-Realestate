import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Zap, Shield, Globe2, HeadphonesIcon, BarChart3, Users } from 'lucide-react'
import Nav from '../components/LandingPage/Nav'
import Footer from '../components/LandingPage/Footer'

const INCLUDED = [
  { Icon: Zap,             text: 'Unlimited concurrent AI calls' },
  { Icon: Globe2,          text: 'English + 8 regional languages' },
  { Icon: BarChart3,       text: 'Full call transcripts & lead scoring' },
  { Icon: Shield,          text: 'Enterprise-grade encryption & data residency' },
  { Icon: HeadphonesIcon,  text: 'Dedicated onboarding & support' },
  { Icon: Users,           text: 'CRM & WhatsApp integrations' },
]

const TRUST = [
  { value: '200+',  label: 'Businesses served' },
  { value: '1M+',   label: 'Calls handled' },
  { value: '95%',   label: 'First-call resolution' },
  { value: '30+',   label: 'Languages supported' },
]

const FACTORS = [
  { title: 'Call Volume',       desc: 'Price scales favourably as your volume grows, the more you call, the lower your per-minute cost.' },
  { title: 'Languages',         desc: 'Single-language deployments or full multilingual coverage, priced to match your actual reach.' },
  { title: 'Integrations',      desc: 'Standard CRM connectors are included. Custom API integrations are scoped and quoted transparently.' },
  { title: 'Support Level',     desc: 'From self-serve to a fully managed service with a dedicated account manager, choose what fits.' },
]

export default function PricingPage() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Nav solid />

      <main className="overflow-hidden bg-white text-[#1c0700]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
          {/* background */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-orange-50/80 via-amber-50/40 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-br from-orange-300 to-amber-200 opacity-20 blur-3xl" />

          <div className="relative max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-6">
              Pricing
            </span>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-[#1c0700] tracking-tight leading-[1.05] mb-6">
              You bring the ambition.{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                We'll match the price.
              </span>
            </h1>

            <p className="text-lg text-amber-900/65 leading-relaxed max-w-2xl mx-auto mb-10">
              Every real estate team is different, in size, language, volume, and goals.
              That's why we don't do one-size-fits-all plans. We build a price around
              what you actually need, and guarantee you won't find better value elsewhere.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 h-[54px] px-9 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-xl shadow-[0_4px_20px_rgba(234,88,12,0.38)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(234,88,12,0.5)] transition-all duration-150"
              >
                Get a custom quote <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 h-[54px] px-9 border border-orange-200 bg-white text-amber-900 text-[15px] font-semibold rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-150"
              >
                Book a free demo
              </button>
            </div>
          </div>
        </section>

        {/* ── Trust stats ───────────────────────────────────────── */}
        <section className="py-10 px-6 border-y border-orange-100 bg-gradient-to-r from-orange-50/60 to-amber-50/60">
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {TRUST.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent leading-none mb-1">
                  {value}
                </p>
                <p className="text-sm text-amber-900/55 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Promise card ──────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-[860px] mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c0700] via-[#2d0f00] to-[#1c0700] px-10 py-14 text-center shadow-[0_24px_64px_rgba(28,7,0,0.22)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-orange-600 opacity-12 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-amber-500 opacity-10 blur-3xl pointer-events-none" />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-400 mb-5">Our Promise</p>
                <blockquote className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-6 max-w-2xl mx-auto">
                  "We price based on the value we deliver, not on what we think we can charge.
                  Tell us your volume and goals, and we'll give you a number that makes the ROI obvious."
                </blockquote>
                <p className="text-sm text-white/50 font-medium">- CallOHM founding team</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Everything included ───────────────────────────────── */}
        <section className="py-10 pb-20 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-4">
                What's included
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight">
                Every plan comes with everything.
              </h2>
              <p className="mt-3 text-base text-amber-900/60 max-w-lg mx-auto">
                No feature gating. No surprise add-ons. No nickel-and-diming.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INCLUDED.map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-[0_4px_16px_rgba(234,88,12,0.05)] hover:shadow-[0_8px_28px_rgba(234,88,12,0.1)] hover:border-orange-200 transition-all duration-200"
                >
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-[0_4px_12px_rgba(234,88,12,0.3)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#1c0700]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing factors ───────────────────────────────────── */}
        <section className="py-20 px-6 bg-gradient-to-b from-orange-50/50 to-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-4">
                How it works
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight">
                What shapes your quote
              </h2>
              <p className="mt-3 text-base text-amber-900/60 max-w-lg mx-auto">
                Four factors, fully transparent. No hidden variables.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FACTORS.map(({ title, desc }, i) => (
                <div
                  key={title}
                  className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-7 shadow-[0_6px_24px_rgba(234,88,12,0.06)] hover:shadow-[0_12px_40px_rgba(234,88,12,0.12)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="absolute top-5 right-5 text-[40px] font-black text-orange-100 leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-bold text-[#1c0700] mb-2">{title}</h3>
                  <p className="text-sm text-amber-900/65 leading-7">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-[860px] mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight mb-4">
              Ready to see what your price looks like?
            </h2>
            <p className="text-base text-amber-900/60 max-w-lg mx-auto mb-8">
              Share your call volume and team size, we'll come back with a number
              and an ROI projection within one business day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 h-[52px] px-9 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)] transition-all duration-150"
              >
                Get my custom quote <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:hello@callohm.ai"
                className="inline-flex items-center h-[52px] px-9 border border-orange-200 rounded-xl text-[15px] font-semibold text-amber-900 hover:bg-orange-50 hover:border-orange-300 transition-all duration-150 no-underline"
              >
                Email us directly
              </a>
            </div>
            <p className="mt-6 text-xs text-amber-900/40">
              No commitment required · Response within 1 business day · Free demo included
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
