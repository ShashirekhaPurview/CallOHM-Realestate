import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Nav from '../components/LandingPage/Nav'
import Footer from '../components/LandingPage/Footer'

const FAQS = [
  {
    category: 'General',
    items: [
      {
        q: 'What is CallOHM?',
        a: 'CallOHM is an AI voice agent platform built for real estate sales teams. Our agents call, qualify, and convert leads automatically, speaking naturally in English and regional Indian languages.',
      },
      {
        q: 'How is CallOHM different from a regular IVR or chatbot?',
        a: 'Unlike IVRs that follow rigid scripts, CallOHM agents hold natural, two-way conversations. They understand context, handle objections, ask follow-up questions, and adapt in real time, just like a trained human sales rep.',
      },
      {
        q: 'Which languages does CallOHM support?',
        a: 'CallOHM currently supports English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, and Gujarati. More languages are being added continuously.',
      },
    ],
  },
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How long does it take to set up an agent?',
        a: 'Most agents can be configured and live within 24-48 hours. You provide your project details, pricing, key USPs, and any objection-handling preferences, we handle the rest.',
      },
      {
        q: 'Do I need technical knowledge to use CallOHM?',
        a: 'No. CallOHM is designed for sales and marketing teams, not developers. The configuration interface is simple, and our onboarding team will walk you through the setup.',
      },
      {
        q: 'Can I try CallOHM before committing?',
        a: 'Yes. Book a free demo and watch a live agent call a real lead in front of you. We also offer a pilot period so you can evaluate results with your own lead database.',
      },
    ],
  },
  {
    category: 'Calls & Performance',
    items: [
      {
        q: 'How many calls can CallOHM handle at once?',
        a: 'CallOHM scales elastically. Whether you need 50 calls a day or 50,000, the platform handles concurrent calls without degradation in quality or latency.',
      },
      {
        q: 'What happens when a lead asks to speak to a human?',
        a: 'The agent detects this intent and can either transfer the call to your team in real time, schedule a callback, or send a notification to your CRM, depending on how you configure it.',
      },
      {
        q: 'What metrics and reports do I get?',
        a: 'After every call you get a full transcript, lead score, qualification tags (budget match, timeline, intent), call duration, and a summary. All data is available in your dashboard and exportable to your CRM.',
      },
      {
        q: 'How does the agent handle objections?',
        a: "Agents are trained on your project's specific objection map, pricing concerns, competitor comparisons, location hesitations, and more. You can review and update objection responses at any time.",
      },
    ],
  },
  {
    category: 'Integrations & Data',
    items: [
      {
        q: 'Does CallOHM integrate with my CRM?',
        a: 'Yes. CallOHM integrates with Salesforce, HubSpot, Zoho CRM, and several Indian real estate CRMs. Custom integrations via API are also available.',
      },
      {
        q: 'How do I upload my lead database?',
        a: 'You can upload leads via CSV, connect your CRM directly, or push leads via our API. CallOHM supports scheduled uploads and real-time lead injection.',
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. All data is encrypted in transit and at rest. We support data residency options for India-based storage, and access controls are configurable per team role.',
      },
    ],
  },
  {
    category: 'Pricing',
    items: [
      {
        q: 'How is CallOHM priced?',
        a: 'Pricing is based on call volume and features required. We offer per-minute pricing for smaller teams and monthly plans for high-volume deployments. Contact us for a custom quote.',
      },
      {
        q: 'Are there any setup fees?',
        a: 'There are no setup fees for standard configurations. Custom integrations or bespoke voice models may incur a one-time configuration fee discussed during onboarding.',
      },
    ],
  },
]

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`border border-orange-100 rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'bg-orange-50/50' : 'bg-white hover:bg-orange-50/30'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-orange-600' : 'text-[#1c0700]'}`}>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-orange-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '400px' : '0px' }}
      >
        <p className="px-6 pb-5 text-sm text-amber-900/70 leading-7">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [openKey, setOpenKey] = useState('General-0')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const toggle = (key) => setOpenKey((k) => k === key ? null : key)

  return (
    <>
      <Nav solid />

      <main className="relative overflow-hidden bg-white pt-28">
        {/* bg glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-200 to-amber-100 opacity-20 blur-3xl" />

        {/* Hero */}
        <section className="relative mx-auto max-w-4xl px-6 pt-10 pb-14 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-5">
            FAQ
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1c0700] tracking-tight leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-amber-900/60 max-w-xl mx-auto">
            Everything you need to know about CallOHM. Can't find an answer?{' '}
            <a href="/contact" className="text-orange-600 font-semibold hover:text-orange-700 no-underline">
              Talk to us.
            </a>
          </p>
        </section>

        {/* FAQ sections */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="flex flex-col gap-12">
            {FAQS.map(({ category, items }) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-full">
                    {category}
                  </span>
                  <div className="flex-1 h-[1px] bg-orange-100" />
                </div>
                <div className="flex flex-col gap-3">
                  {items.map((item, i) => {
                    const key = `${category}-${i}`
                    return (
                      <AccordionItem
                        key={key}
                        q={item.q}
                        a={item.a}
                        isOpen={openKey === key}
                        onToggle={() => toggle(key)}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 px-8 py-10 text-center">
            <h2 className="text-2xl font-extrabold text-[#1c0700] mb-2">Still have questions?</h2>
            <p className="text-sm text-amber-900/60 mb-6">Our team is happy to walk you through anything.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-[48px] px-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[14px] font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)] transition-all duration-150 no-underline"
            >
              Contact us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
