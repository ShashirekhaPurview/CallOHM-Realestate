import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Globe2, ShieldCheck, Sprout, TimerReset, Users, Zap, Phone, Star } from 'lucide-react'
import Nav from '../components/LandingPage/Nav'
import Footer from '../components/LandingPage/Footer'

const VALUES = [
  {
    Icon: Globe2,
    title: 'Built for Everyone',
    body: 'People speak in hundreds of languages across the world. We build AI that listens, understands, and responds in the language your customer is most comfortable with, wherever they are.',
    color: 'from-orange-400 to-orange-600',
  },
  {
    Icon: TimerReset,
    title: 'Speed is Respect',
    body: 'Every extra second a customer waits is a moment of doubt. Sub-300ms latency isn\'t just a spec, it\'s our promise that their time matters.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    Icon: ShieldCheck,
    title: 'Trust by Design',
    body: 'We treat every conversation as sacred. Enterprise-grade encryption, data residency options, and rigorous access controls are baked in from day one.',
    color: 'from-orange-500 to-red-500',
  },
  {
    Icon: Sprout,
    title: 'Grow Without Limits',
    body: 'Whether you handle 50 calls a day or 500,000, CallOHM scales instantly, so your ambition is never bottlenecked by infrastructure.',
    color: 'from-amber-500 to-orange-600',
  },
]

const TIMELINE = [
  {
    year: '2024',
    title: 'The Spark',
    body: 'Our founders saw businesses worldwide losing customers to missed calls and long hold times. The idea: an AI voice agent that feels genuinely human.',
    Icon: Zap,
  },
  {
    year: '2024',
    title: 'First Voice',
    body: 'Built the first voice agent prototype. It handled a live customer query, and the customer didn\'t realise it was AI.',
    Icon: Phone,
  },
  {
    year: '2025',
    title: '30+ Languages',
    body: 'Expanded multilingual support across 30+ languages worldwide. Pilot deployments in banking, healthcare, and customer support.',
    Icon: Globe2,
  },
  {
    year: '2025',
    title: 'Scale',
    body: 'Surpassed 1 million calls handled. Zero downtime. 95% first-call resolution across clients.',
    Icon: Star,
  },
  {
    year: '2026',
    title: 'Today',
    body: 'Serving 200+ businesses globally with the most human-like AI voice experience across 30+ languages and regions.',
    Icon: ArrowRight,
  },
]

const STATS = [
  { value: '200+', label: 'Businesses served' },
  { value: '1M+',  label: 'Calls handled' },
  { value: '30+',  label: 'Languages' },
  { value: '95%',  label: 'First-call resolution' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Nav solid />

      <main className="overflow-hidden bg-white text-[#1c0700]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          id="top"
          className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-white overflow-hidden"
        >
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-orange-200 to-amber-100 opacity-40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-orange-100 to-transparent opacity-50 blur-2xl" />

          <div className="relative max-w-[1280px] mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-6">
              Our Story
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1c0700] tracking-tight leading-tight mb-6">
                  We Believe Every Voice Deserves to Be Heard.
                </h1>
                <p className="text-base text-amber-900/70 leading-relaxed mb-8 max-w-[520px]">
                  CallOHM was born from a simple frustration, businesses and their customers
                  deserved better than robotic IVRs and endless hold music. We set out to build
                  voice AI agents that feel genuinely human, speak your language, and never sleep.
                </p>
                <button
                  onClick={() => navigate('/leadership')}
                  className="inline-flex items-center gap-2 h-[52px] px-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)] transition-all duration-150"
                >
                  Meet the Team <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-white border border-orange-100 rounded-2xl p-6 shadow-[0_8px_32px_rgba(234,88,12,0.08)] text-center"
                  >
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent leading-none mb-2">
                      {value}
                    </p>
                    <p className="text-sm text-amber-900/60 font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ──────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 mb-6">

              <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-8 shadow-[0_8px_32px_rgba(234,88,12,0.08)]">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-200 opacity-30 blur-2xl -translate-y-8 translate-x-8" />
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-5">
                  Mission
                </span>
                <h2 className="text-2xl font-extrabold text-[#1c0700] leading-snug mb-4">
                  Make AI-powered conversations accessible to every business, everywhere.
                </h2>
                <p className="text-sm leading-7 text-amber-900/70">
                  We want businesses of every size, from local shops to global enterprises, to have
                  the same powerful voice AI capabilities, affordable, reliable, and in any language.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-8 shadow-[0_8px_32px_rgba(234,88,12,0.06)]">
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-amber-100 opacity-40 blur-2xl translate-y-8 -translate-x-8" />
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-200 mb-5">
                  Vision
                </span>
                <h2 className="text-2xl font-extrabold text-[#1c0700] leading-snug mb-4">
                  A world where no call goes unanswered, no customer feels unheard.
                </h2>
                <p className="text-sm leading-7 text-amber-900/70">
                  By 2030, we envision CallOHM handling over a billion conversations a year across
                  the globe, turning every customer touchpoint into a moment of delight, not friction.
                </p>
              </div>
            </div>

            {/* quote */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c0700] to-[#3d1300] px-8 py-7 shadow-[0_8px_32px_rgba(28,7,0,0.18)]">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-600 opacity-10 blur-3xl" />
              <p className="relative text-lg font-semibold italic leading-8 text-white/90 sm:text-xl">
                "We're not building call centre software. We're rebuilding trust between businesses and
                their customers, one conversation at a time."
              </p>
            </div>
          </div>
        </section>

        {/* ── Core Values ───────────────────────────────────────── */}
        <section className="py-20 px-6 bg-gradient-to-b from-orange-50/50 to-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-12 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-4">
                What We Stand For
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight">Our Core Values</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {VALUES.map(({ Icon, title, body, color }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-7 shadow-[0_8px_32px_rgba(234,88,12,0.07)] hover:shadow-[0_16px_48px_rgba(234,88,12,0.14)] hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-100 opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-300" />
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-[0_4px_12px_rgba(234,88,12,0.3)]`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1c0700] mb-2">{title}</h3>
                      <p className="text-sm leading-7 text-amber-900/70">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-[860px] mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-4">
                Journey
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight">From an Idea to a Movement</h2>
            </div>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-400 via-orange-300 to-orange-100 rounded-full" />

              <div className="flex flex-col gap-0">
                {TIMELINE.map((item, i) => (
                  <div key={`${item.year}-${item.title}`} className="relative flex gap-7 pb-10 last:pb-0">
                    {/* icon node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-[0_4px_16px_rgba(234,88,12,0.35)]">
                        <item.Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* card */}
                    <div className="flex-1 bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-100 rounded-2xl px-6 py-5 shadow-[0_4px_20px_rgba(234,88,12,0.06)] hover:shadow-[0_8px_32px_rgba(234,88,12,0.12)] hover:-translate-y-0.5 transition-all duration-200 mt-1">
                      <span className="inline-block px-2.5 py-0.5 bg-orange-100 text-orange-600 text-[11px] font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-[17px] font-bold text-[#1c0700] mb-1.5">{item.title}</h3>
                      <p className="text-sm leading-7 text-amber-900/70">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Team CTA ──────────────────────────────────────────── */}
        <section className="py-6 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div
              className="group relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-8 py-8 shadow-[0_8px_32px_rgba(234,88,12,0.08)] hover:shadow-[0_16px_48px_rgba(234,88,12,0.16)] transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/leadership')}
            >
              <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-orange-200 opacity-20 blur-3xl" />
              <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-[0_4px_16px_rgba(234,88,12,0.35)]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1c0700]">Meet the Purview Leadership Team</p>
                    <p className="text-sm text-amber-900/60">The minds building the future of voice AI</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); navigate('/leadership') }}
                  className="inline-flex shrink-0 items-center gap-2 h-[44px] px-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-sm font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:-translate-y-0.5 transition-all duration-150"
                >
                  Meet the Team <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-[860px] mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c0700] via-[#2d0f00] to-[#1c0700] px-8 py-14 text-center shadow-[0_24px_64px_rgba(28,7,0,0.25)]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-orange-600 opacity-15 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-amber-500 opacity-10 blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Ready to Join the Voice AI Revolution?
                </h2>
                <p className="text-base text-white/70 leading-relaxed max-w-lg mx-auto mb-8">
                  Partner with us to transform how your customers experience conversations.
                </p>
                <a
                  href="/#demo"
                  className="inline-flex items-center gap-2 h-[52px] px-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.5)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(234,88,12,0.6)] transition-all duration-150 no-underline"
                >
                  Try CallOHM <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
