import { Phone, Star, Building2, BarChart3, RefreshCw, Clock } from 'lucide-react'

const features = [
  {
    Icon: Phone,
    title: 'Natural AI voice conversations',
    desc: 'Human-sounding calls that discuss pricing, offers, floor plans, and handle objections — indistinguishable from a trained sales executive.',
  },
  {
    Icon: Star,
    title: 'Intelligent lead scoring',
    desc: 'Every call ends with a hot, warm, or cold score based on budget fit, timeline, unit preference, and intent signals captured in conversation.',
  },
  {
    Icon: Building2,
    title: 'Multi-project agent setup',
    desc: 'Create dedicated AI agents for each property project — each trained on unique pricing, floor plans, offers, and qualification criteria.',
  },
  {
    Icon: BarChart3,
    title: 'Real-time campaign analytics',
    desc: 'Track call volume, connection rate, qualification funnel, objection patterns, and campaign ROI across all projects in one live dashboard.',
  },
  {
    Icon: RefreshCw,
    title: 'CRM and portal integration',
    desc: 'Push qualified leads to Salesforce, HubSpot, Zoho, or back into 99acres and Housing.com automatically — no manual data entry.',
  },
  {
    Icon: Clock,
    title: 'Smart retry and callbacks',
    desc: 'Automatically retry unanswered calls at optimal times, respect do-not-disturb windows, and schedule callbacks when prospects request them.',
  },
]

export default function Features() {
  return (
    <section className="section-soft py-24 px-6" id="features">
      <div className="max-w-[1280px] mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-200 mb-4">
            Platform features
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1c0700] tracking-tight leading-tight mb-3">
            Everything needed to call, qualify,<br />and convert real estate leads.
          </h2>
          <p className="text-base text-amber-900/70 leading-relaxed">
            Built for high-volume campaigns where speed, consistency, and sales visibility matter most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-orange-200 rounded-2xl px-6 py-7 shadow-sm hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(234,88,12,0.12)] hover:border-orange-300 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 mb-5">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="text-[15px] font-bold text-[#1c0700] tracking-tight mb-2">{title}</h3>
              <p className="text-sm text-amber-900/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
