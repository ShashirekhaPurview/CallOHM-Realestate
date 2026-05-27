import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Nav from '../components/LandingPage/Nav'
import Footer from '../components/LandingPage/Footer'

const palettes = [
  { primary: '#2563eb', primaryLight: '#93c5fd', gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)' },
  { primary: '#ec4899', primaryLight: '#f9a8d4', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' },
  { primary: '#84cc16', primaryLight: '#d9f99d', gradient: 'linear-gradient(135deg, #84cc16, #65a30d)' },
  { primary: '#8b5cf6', primaryLight: '#c4b5fd', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { primary: '#f59e0b', primaryLight: '#fde68a', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
]

const TEAM = [
  { photo: '/about-us-images/punna.jpg',       name: 'Punna Reddy',     title: 'Founder & CEO' },
  { photo: '/about-us-images/chiranjeevi.jpg',  name: 'Chiranjeevi',     title: 'Chief Operating Officer' },
  { photo: '/about-us-images/steve.jpg',        name: 'Stephen Tulloch', title: 'Head of Global Operations' },
  { photo: '/about-us-images/mani.jpg',         name: 'Mani Gupta',      title: 'Head of UK & Europe' },
  { photo: '/about-us-images/james.png',        name: 'James Hatcher',   title: 'General Manager & Partner - Australia & New Zealand' },
  { photo: '/about-us-images/manoj.jpg',        name: 'Dr Manoj Patil',  title: 'Head of AI' },
]

function TeamCard({ member, palette }) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-[16px] aspect-[3/4] w-[280px] flex-shrink-0">
      {imageFailed ? (
        <div
          className="flex h-full items-center justify-center text-4xl font-black text-white"
          style={{ backgroundImage: palette.gradient }}
        >
          {member.name.charAt(0)}
        </div>
      ) : (
        <img
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover block"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-8">
        <p className="text-base font-bold text-white leading-tight">{member.name}</p>
        <p className="mt-0.5 text-sm text-white/75 leading-snug">{member.title}</p>
      </div>
    </div>
  )
}

function MemberCard({ member, palette }) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <div className="group rounded-[24px] border border-slate-200 bg-white/90 p-5 shadow-[0_14px_36px_rgba(15,23,42,0.05)] flex items-center gap-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50">
        {imageFailed ? (
          <div
            className="flex h-full w-full items-center justify-center text-xl font-black text-white"
            style={{ backgroundImage: palette.gradient }}
          >
            {member.name.charAt(0)}
          </div>
        ) : (
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-contain"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 leading-snug">{member.name}</p>
        <p className="mt-0.5 text-xs text-slate-500 leading-snug">{member.title}</p>
      </div>
    </div>
  )
}

export default function LeadershipPage() {
  const navigate = useNavigate()
  const [paletteIndex, setPaletteIndex] = useState(4)

  useEffect(() => {
    window.scrollTo(0, 0)
    let i = 4
    const id = setInterval(() => { i = (i + 1) % palettes.length; setPaletteIndex(i) }, 9000)
    return () => clearInterval(id)
  }, [])

  const palette = palettes[paletteIndex]

  return (
    <>
      <Nav solid />

      <main className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-20 text-slate-900">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl opacity-20 transition-all duration-[2000ms]"
          style={{ backgroundImage: palette.gradient }}
        />

        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6">
          <div className="max-w-3xl">
            <span
              className="inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-[2000ms]"
              style={{ borderColor: palette.primaryLight, color: palette.primary, backgroundColor: '#ffffffcc' }}
            >
              The Team
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              The Minds Behind CallOHM
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              A diverse team of engineers, linguists, and product builders obsessed with the perfect conversation.
            </p>
          </div>
        </section>

        {/* Scrolling Team Cards */}
        <section className="py-10 overflow-hidden">
          <style>{`
            @keyframes lp-marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .lp-marquee {
              animation: lp-marquee 35s linear infinite;
              will-change: transform;
            }
            .lp-marquee:hover { animation-play-state: paused; }
          `}</style>
          <div className="pb-4 overflow-hidden">
            <div className="lp-marquee flex gap-5 w-max">
              {[...TEAM, ...TEAM].map((member, i) => (
                <TeamCard key={`${member.name}-${i}`} member={member} palette={palette} />
              ))}
            </div>
          </div>
        </section>

        {/* Full grid */}
        <section className="mx-auto max-w-6xl px-4 py-10 pb-20 sm:px-6">
          <h2 className="mb-8 text-xl font-bold text-slate-900">Meet Everyone</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <MemberCard key={member.name} member={member} palette={palette} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 sm:pb-24">
          <div
            className="rounded-[36px] border bg-white/90 px-8 py-12 text-center shadow-[0_22px_60px_rgba(15,23,42,0.08)] transition-colors duration-[2000ms]"
            style={{ borderColor: palette.primaryLight }}
          >
            <h2 className="text-3xl font-bold text-slate-900">Want to Work With Us?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              We're always looking for passionate people to join our growing team.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => navigate('/careers')}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-[2000ms]"
                style={{ backgroundImage: palette.gradient }}
              >
                View Open Roles
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="/#demo"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 no-underline"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
