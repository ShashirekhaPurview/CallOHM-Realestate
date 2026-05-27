import { useEffect } from 'react'

const FEATURES = [
  {
    title: 'Instant Lead Calling',
    desc: 'Every new lead is called within seconds, day or night, weekend or holiday. No missed opportunities, no delayed follow-ups.',
  },
  {
    title: 'Natural Conversations',
    desc: 'Arya speaks like a trained sales executive, handling objections, asking qualifying questions, and adapting tone in real time.',
  },
  {
    title: 'Multilingual Support',
    desc: 'Engages buyers in English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, and Gujarati, whichever they prefer.',
  },
  {
    title: 'Lead Qualification',
    desc: 'Captures budget, timeline, property type, intent, and family size, so your human team only calls the leads worth their time.',
  },
  {
    title: 'Site Visit Scheduling',
    desc: 'Arya pitches and books site visits directly in the call, syncing to your calendar and sending confirmation messages automatically.',
  },
  {
    title: 'Full Analytics & Reports',
    desc: 'Every call generates a transcript, lead score, qualification tags, and summary, fed directly into your CRM.',
  },
]

const USE_CASES = [
  { label: 'New Project Launches',       desc: 'Call thousands of enquiries the moment portals go live. Be the first developer to reach every interested buyer.' },
  { label: 'Database Reactivation',      desc: 'Re-engage cold leads from your existing CRM, buyers who enquired months ago but were never properly followed up.' },
  { label: 'Expo & Event Leads',         desc: 'Convert high-intent leads captured at property expos before they cool off or move to a competitor.' },
  { label: 'NRI & Outstation Buyers',    desc: 'Reach NRI and outstation investors at any hour, across time zones, in their preferred language.' },
]

const STATS = [
  { value: '< 10s',  label: 'Average time to first call after lead capture' },
  { value: '3×',     label: 'More site visits booked vs manual follow-up' },
  { value: '95%',    label: 'First-call resolution rate' },
  { value: '60%',    label: 'Reduction in cost per qualified lead' },
]

const HOW = [
  { step: '01', title: 'Import Leads',      desc: 'Upload via CSV, CRM sync, or API. Leads from 99acres, MagicBricks, Housing.com, and your website all flow in automatically.' },
  { step: '02', title: 'Configure Arya',    desc: 'Set your project details, pricing, USPs, objection responses, and preferred language. Takes minutes, not days.' },
  { step: '03', title: 'Arya Calls',        desc: 'AI calls begin instantly, qualifying, pitching, and booking site visits while your human team focuses on closures.' },
  { step: '04', title: 'Review & Convert',  desc: 'Get qualified leads with scores, tags, and transcripts in your CRM. Your team converts, not chases.' },
]

export default function BrochurePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* ── Print / Download button (hidden on print) ── */}
      <div className="no-print fixed bottom-6 right-6 z-50 flex gap-3">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 h-11 px-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 transition-all duration-150"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M5 20h14" />
          </svg>
          Download PDF
        </button>
        <a
          href="/"
          className="inline-flex items-center h-11 px-5 border border-orange-200 bg-white text-amber-900 text-sm font-semibold rounded-xl hover:bg-orange-50 transition-all duration-150 no-underline"
        >
          ← Back
        </a>
      </div>

      <div className="brochure-root font-sans text-[#1c0700] bg-white">

        {/* ═══════════════════════════════
            PAGE 1, COVER
        ═══════════════════════════════ */}
        <div className="brochure-page cover-page relative overflow-hidden flex flex-col justify-between"
          style={{ background: 'linear-gradient(145deg, #1c0700 0%, #3d1200 45%, #7c2d12 100%)' }}>

          {/* grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }} />

          {/* orange glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.25) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

          {/* top bar */}
          <div className="relative flex items-center justify-between px-14 pt-12">
            <div className="flex items-center gap-3">
              <img src="/callohm-realestate-logo.png" alt="CallOHM" className="h-10 w-auto object-contain" />
              <span className="text-white text-xl font-extrabold tracking-tight">CallOHM</span>
            </div>
            <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Real Estate Edition</span>
          </div>

          {/* center hero */}
          <div className="relative flex-1 flex flex-col justify-center px-14 py-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/30 bg-orange-400/10 mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span className="text-orange-300 text-xs font-bold uppercase tracking-widest">AI Voice Agents for Real Estate</span>
            </div>

            <h1 className="text-white font-extrabold leading-[1.05] mb-6"
              style={{ fontSize: '52px', letterSpacing: '-0.03em' }}>
              Call Every Lead.<br />
              <span style={{ background: 'linear-gradient(90deg, #fb923c, #f97316, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Qualify Every Buyer.
              </span><br />
              Close More Deals.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
              CallOHM's AI voice agents call, qualify, and convert real estate leads at scale,
              speaking naturally in English and regional languages, 24 hours a day.
            </p>

            <div className="flex gap-10">
              {STATS.slice(0, 2).map(({ value, label }) => (
                <div key={label}>
                  <p className="text-4xl font-extrabold text-orange-400 leading-none mb-1">{value}</p>
                  <p className="text-white/50 text-sm leading-snug max-w-[140px]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* bottom strip */}
          <div className="relative px-14 pb-12">
            <div className="h-[1px] bg-white/10 mb-6" />
            <div className="flex items-center justify-between">
              <p className="text-white/30 text-xs">callohm.ai · hello@callohm.ai</p>
              <p className="text-white/30 text-xs">© 2026 CallOHM. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            PAGE 2, THE PROBLEM + HOW IT WORKS
        ═══════════════════════════════ */}
        <div className="brochure-page px-14 py-14 flex flex-col gap-12">

          {/* header */}
          <div className="flex items-center justify-between border-b border-orange-100 pb-5">
            <div className="flex items-center gap-2">
              <img src="/callohm-realestate-logo.png" alt="CallOHM" className="h-7 w-auto object-contain" />
              <span className="text-[#1c0700] text-sm font-extrabold">CallOHM</span>
            </div>
            <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">The Problem We Solve</span>
          </div>

          {/* problem statement */}
          <div className="rounded-2xl p-8"
            style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">The Challenge</p>
            <h2 className="text-3xl font-extrabold text-[#1c0700] leading-snug mb-4" style={{ letterSpacing: '-0.02em' }}>
              Your best leads go cold while your team is busy.
            </h2>
            <p className="text-amber-900/70 text-base leading-relaxed max-w-2xl">
              Real estate teams generate thousands of leads from portals, expos, and campaigns,
              but the average follow-up happens hours later. By then, the buyer has already spoken
              to a competitor. Speed is the difference between a site visit and a lost sale.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { stat: '78%', note: 'of buyers choose the developer who responds first' },
                { stat: '< 5min', note: 'is the ideal window to call a fresh enquiry' },
                { stat: '11×', note: 'higher conversion when lead is called within 1 minute' },
              ].map(({ stat, note }) => (
                <div key={stat} className="text-center">
                  <p className="text-3xl font-extrabold text-orange-500 leading-none mb-1">{stat}</p>
                  <p className="text-xs text-amber-900/60 leading-snug">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* how it works */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-6">How CallOHM Works</p>
            <div className="grid grid-cols-4 gap-4">
              {HOW.map(({ step, title, desc }) => (
                <div key={step} className="relative">
                  <div className="text-5xl font-extrabold text-orange-100 leading-none mb-3 select-none">{step}</div>
                  <h3 className="text-sm font-bold text-[#1c0700] mb-2">{title}</h3>
                  <p className="text-xs text-amber-900/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="mt-auto border-t border-orange-100 pt-4 flex justify-between items-center">
            <p className="text-xs text-gray-300">callohm.ai</p>
            <p className="text-xs text-gray-300">2 / 4</p>
          </div>
        </div>

        {/* ═══════════════════════════════
            PAGE 3, FEATURES + USE CASES
        ═══════════════════════════════ */}
        <div className="brochure-page px-14 py-14 flex flex-col gap-10">

          {/* header */}
          <div className="flex items-center justify-between border-b border-orange-100 pb-5">
            <div className="flex items-center gap-2">
              <img src="/callohm-realestate-logo.png" alt="CallOHM" className="h-7 w-auto object-contain" />
              <span className="text-[#1c0700] text-sm font-extrabold">CallOHM</span>
            </div>
            <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">Features & Use Cases</span>
          </div>

          {/* features */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-5">Platform Features</p>
            <div className="grid grid-cols-3 gap-4">
              {FEATURES.map(({ title, desc }) => (
                <div key={title}
                  className="rounded-xl border border-orange-100 p-5"
                  style={{ background: 'linear-gradient(135deg, #ffffff, #fff7ed)' }}>
                  <div className="w-2 h-2 rounded-full bg-orange-500 mb-3" />
                  <h3 className="text-sm font-bold text-[#1c0700] mb-1.5">{title}</h3>
                  <p className="text-xs text-amber-900/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* use cases */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-5">Real Estate Use Cases</p>
            <div className="grid grid-cols-2 gap-4">
              {USE_CASES.map(({ label, desc }, i) => (
                <div key={label} className="flex gap-4 rounded-xl border border-orange-100 p-5 bg-white">
                  <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg text-white text-xs font-black"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1c0700] mb-1">{label}</h3>
                    <p className="text-xs text-amber-900/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="mt-auto border-t border-orange-100 pt-4 flex justify-between items-center">
            <p className="text-xs text-gray-300">callohm.ai</p>
            <p className="text-xs text-gray-300">3 / 4</p>
          </div>
        </div>

        {/* ═══════════════════════════════
            PAGE 4, RESULTS + CTA
        ═══════════════════════════════ */}
        <div className="brochure-page px-14 py-14 flex flex-col gap-10">

          {/* header */}
          <div className="flex items-center justify-between border-b border-orange-100 pb-5">
            <div className="flex items-center gap-2">
              <img src="/callohm-realestate-logo.png" alt="CallOHM" className="h-7 w-auto object-contain" />
              <span className="text-[#1c0700] text-sm font-extrabold">CallOHM</span>
            </div>
            <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">Results & Next Steps</span>
          </div>

          {/* stats */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-5">Proven Results</p>
            <div className="grid grid-cols-4 gap-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-orange-100 p-5 text-center"
                  style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)' }}>
                  <p className="text-3xl font-extrabold text-orange-500 leading-none mb-2">{value}</p>
                  <p className="text-xs text-amber-900/60 leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* sample conversation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-5">Arya in Action, Live Call Transcript</p>
            <div className="rounded-2xl border border-orange-200 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-orange-100"
                style={{ background: 'linear-gradient(90deg, #fff7ed, #ffedd5)' }}>
                <div className="flex items-center gap-2 text-sm font-semibold text-orange-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Arya · AI Agent
                </div>
                <span className="text-xs text-orange-600 font-medium">Live call transcript</span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                {[
                  { from: 'ai',       text: 'Hi, this is Arya calling from Purva Developers. You had enquired about our upcoming project in Whitefield. Is this a good time to talk?' },
                  { from: 'prospect', text: 'Yes, please go ahead.' },
                  { from: 'ai',       text: 'Great! We are offering 2 and 3 BHK homes starting at ₹72 lakhs, a fully integrated township with metro connectivity. Are you looking for self-use or investment?' },
                  { from: 'prospect', text: 'Self-use. We need to move in within 6 to 8 months.' },
                  { from: 'ai',       text: 'Perfect timing. Our ready-to-move 3 BHK units in Tower C match exactly that. Would you like to schedule a site visit this Saturday morning?' },
                  { from: 'prospect', text: 'Yes, Saturday works.' },
                ].map((msg, i) => (
                  <div key={i} className={`flex flex-col gap-0.5 ${msg.from === 'ai' ? 'items-start' : 'items-end'}`}>
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wide px-1">
                      {msg.from === 'ai' ? 'Arya' : 'Prospect'}
                    </span>
                    <p className={`text-xs leading-relaxed px-3 py-2 rounded-xl max-w-[80%] ${
                      msg.from === 'ai'
                        ? 'bg-orange-50 border border-orange-200 text-orange-900'
                        : 'bg-gray-50 border border-gray-200 text-gray-700'
                    }`}>{msg.text}</p>
                  </div>
                ))}
                <div className="flex items-center gap-2 flex-wrap pt-1 mt-1 border-t border-orange-100">
                  <span className="px-2.5 py-1 rounded-md text-white text-[10px] font-bold"
                    style={{ background: 'linear-gradient(90deg, #f97316, #ea580c)' }}>Qualified</span>
                  <span className="text-[10px] text-orange-700 font-semibold">✓ Budget match</span>
                  <span className="text-[10px] text-orange-700 font-semibold">✓ Timeline: 6-8 months</span>
                  <span className="text-[10px] text-orange-700 font-semibold">✓ Site visit booked</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-8 text-center mt-auto"
            style={{ background: 'linear-gradient(135deg, #1c0700, #3d1200)' }}>
            <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">Get Started Today</p>
            <h2 className="text-white text-2xl font-extrabold mb-3" style={{ letterSpacing: '-0.02em' }}>
              See Arya qualify your leads live.
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Book a free 20-minute demo and watch a real lead being called and qualified in front of you.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="text-orange-400 font-bold">Website</p>
                <p className="text-white/60">callohm.ai</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-orange-400 font-bold">Email</p>
                <p className="text-white/60">hello@callohm.ai</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-orange-400 font-bold">Phone</p>
                <p className="text-white/60">+91 70328 35934</p>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="border-t border-orange-100 pt-4 flex justify-between items-center">
            <p className="text-xs text-gray-300">© 2026 CallOHM. All rights reserved.</p>
            <p className="text-xs text-gray-300">4 / 4</p>
          </div>
        </div>

      </div>

      <style>{`
        @media screen {
          .brochure-root {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            gap: 32px;
          }
          .brochure-page {
            border-radius: 20px;
            box-shadow: 0 8px 48px rgba(28,7,0,0.10);
            min-height: 900px;
          }
          .cover-page {
            min-height: 960px;
          }
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .no-print { display: none !important; }
          .brochure-root {
            padding: 0;
            gap: 0;
          }
          .brochure-page {
            width: 210mm;
            min-height: 297mm;
            page-break-after: always;
            break-after: page;
            box-shadow: none;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  )
}
