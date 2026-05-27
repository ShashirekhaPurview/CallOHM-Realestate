const testimonials = [
  {
    initials: 'KR',
    color: '#ea580c',
    name: 'Kiran Reddy',
    role: 'Sales Director · Aparna Constructions, Hyderabad',
    quote: 'We had 4,800 leads after our launch event and no bandwidth to call them. CallOHM handled the first round in 48 hours and gave us 160 hot leads ready for site visits. Our team was completely blown away.',
  },
  {
    initials: 'PM',
    color: '#f59e0b',
    name: 'Priya Mehta',
    role: 'Marketing Head · Prestige Group, Bangalore',
    quote: 'The depth of qualification impressed us most. The AI understands budget ranges, timeline, and unit preferences at a level I did not expect. Our team now only speaks to buyers who are genuinely ready.',
  },
  {
    initials: 'SN',
    color: '#c2410c',
    name: 'Suresh Nair',
    role: 'Founder · PropEdge Realty, Chennai',
    quote: 'As a mid-size agency we could not justify a large tele-calling team. CallOHM scaled our outreach by 10x without adding headcount. It paid for itself completely in the first week of the pilot.',
  },
]

export default function Testimonials() {
  return (
    <section className="section-soft py-[92px] px-6" id="testimonials">
      <div className="max-w-[1280px] mx-auto">

        <div className="text-center max-w-[680px] mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-[13px] py-[5px] bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 text-[12px] font-bold uppercase tracking-[0.06em] rounded-full border border-orange-200 mb-4">
            Customer stories
          </span>
          <h2
            className="font-extrabold text-[#1c0700] tracking-[-0.03em] leading-[1.1] mb-[14px]"
            style={{ fontSize: 'clamp(26px, 3.2vw, 42px)' }}
          >
            Real estate teams seeing real results.
          </h2>
          <p className="text-[16px] text-amber-900 leading-[1.72] max-w-[560px] mx-auto">
            From large developers to independent agencies, here is what they are saying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-[#fde8d8] rounded-[20px] px-[26px] py-8 flex flex-col hover:translate-y-[-4px] hover:shadow-[0_20px_48px_rgba(234,88,12,0.1)] transition-all duration-200"
            >
              <div className="text-amber-400 text-[16px] tracking-[3px] mb-[18px]" aria-label="5 stars">★★★★★</div>
              <p className="text-[15px] text-gray-700 leading-[1.72] mb-[26px] flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <span
                  className="flex-none grid place-items-center w-[42px] h-[42px] rounded-[12px] text-white text-[13px] font-bold"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </span>
                <div>
                  <strong className="block text-[14px] font-bold text-[#1c0700]">{t.name}</strong>
                  <span className="block text-[12px] text-amber-600 mt-[2px] leading-[1.4]">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
