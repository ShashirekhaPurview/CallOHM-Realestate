const chat = [
  { from: 'ai',       text: 'Hi, this is Arya calling from Purva Developers. You had enquired about our upcoming project in Whitefield. Is this a good time to talk?' },
  { from: 'prospect', text: 'Yes, please go ahead.' },
  { from: 'ai',       text: 'Great! We are offering 2 and 3 BHK homes starting at ₹72 lakhs — a fully integrated township with metro connectivity at the doorstep. Are you looking for self-use or investment?' },
  { from: 'prospect', text: 'Self-use. We need to move in within 6 to 8 months.' },
  { from: 'ai',       text: 'Perfect timing. Our ready-to-move 3 BHK units in Tower C match exactly that requirement. Would you like to schedule a site visit this Saturday morning?' },
  { from: 'prospect', text: 'Yes, Saturday works for me.' },
]

const bullets = [
  'Speaks fluently in English and regional languages',
  'Knows when to push for a site visit and when to schedule a callback',
  'Flags objections, budget mismatches, and competitor comparisons',
  'Generates a full summary, score, and transcript after every call',
]

export default function AgentDemo() {
  return (
    <section className="py-24 px-6 bg-white" id="analytics">
      <div className="max-w-[1280px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-5">
              AI in action
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight leading-tight mb-4">
              Your AI agent, speaking to real buyers in real time.
            </h2>
            <p className="text-base text-amber-900/70 leading-relaxed mb-7">
              CallOHM agents are trained on your project — they know the pricing, USPs,
              floor plans, and exactly how to handle objections. Every call sounds natural,
              on-brand, and on-message.
            </p>
            <ul className="agent-bullets list-none flex flex-col gap-3 mb-8 p-0">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-[10px] text-amber-900/80 text-[15px] leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#demo"
              className="btn-primary inline-flex items-center justify-center h-[52px] px-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-xl shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)] transition-all duration-150 no-underline"
            >
              Try a live demo call
            </a>
          </div>

          {/* chat widget */}
          <div
            className="bg-white border border-orange-200 rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(234,88,12,0.1)]"
            aria-label="Sample AI conversation"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-orange-100">
              <div className="flex items-center gap-2 text-orange-900 text-sm font-semibold">
                <span className="chat-dot w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]" aria-hidden="true" />
                Arya · AI Agent
              </div>
              <span className="text-xs text-amber-600 font-medium">Live call in progress</span>
            </div>

            <div className="flex flex-col gap-3.5 p-5">
              {chat.map((msg, i) => (
                <div key={i} className={`flex flex-col gap-1 ${msg.from === 'ai' ? 'items-start' : 'items-end'}`}>
                  <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wide px-1">
                    {msg.from === 'ai' ? 'Arya' : 'Prospect'}
                  </span>
                  <p className={`text-[13px] leading-relaxed px-3.5 py-2.5 m-0 ${
                    msg.from === 'ai'
                      ? 'bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-[12px_12px_12px_4px] text-orange-900 max-w-[86%]'
                      : 'bg-gray-50 border border-gray-200 rounded-[12px_12px_4px_12px] text-gray-700 max-w-[80%]'
                  }`}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3.5 flex-wrap px-5 py-3.5 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-200">
              <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold rounded-md">
                Qualified
              </span>
              <div className="flex gap-3.5 flex-wrap">
                <span className="text-xs text-orange-700 font-semibold">✓ Budget match</span>
                <span className="text-xs text-orange-700 font-semibold">✓ Timeline: 6–8 months</span>
                <span className="text-xs text-orange-700 font-semibold">✓ Site visit requested</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
