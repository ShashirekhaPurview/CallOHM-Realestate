import { useEffect } from 'react'
import Nav from './LandingPage/Nav'
import Footer from './LandingPage/Footer'

function SectionCard({ title, children }) {
  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-[0_8px_32px_rgba(234,88,12,0.06)] sm:p-8 hover:shadow-[0_12px_40px_rgba(234,88,12,0.1)] transition-shadow duration-200">
      <h2 className="text-xl font-bold text-[#1c0700] sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-amber-900/70 sm:text-base">
        {children}
      </div>
    </section>
  )
}

export default function LegalPageLayout({ eyebrow, title, intro, lastUpdated, sections }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Nav solid />

      <main className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-amber-50/30 pt-28 text-[#1c0700]">
        {/* background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-orange-400 to-amber-300" />

        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-6">
              {eyebrow}
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-[#1c0700] tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-amber-900/70 sm:text-lg">
              {intro}
            </p>
            <p className="mt-4 text-sm font-medium text-amber-900/50">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid gap-5">
            {sections.map((section) => (
              <SectionCard key={section.title} title={section.title}>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.items && (
                  <ul className="list-disc space-y-2 pl-5 text-amber-900/70">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </SectionCard>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
