const useCases = [
  { title: 'New project launches',      desc: 'Call your entire launch enquiry database within hours — not days.' },
  { title: 'Old database reactivation', desc: 'Re-engage cold CRM leads with a fresh, relevant AI conversation.' },
  { title: 'Expo and event follow-up',  desc: 'Follow up on every visiting card and registration form within minutes.' },
  { title: 'NRI investor outreach',     desc: 'Run timezone-aware campaigns for overseas buyers across global markets.' },
  { title: 'Channel partner leads',     desc: 'Auto-qualify broker-referred leads before passing to your sales team.' },
  { title: 'Site visit pipeline',       desc: 'Re-call visitors who did not book and recover stalled opportunities.' },
]

export default function UseCases() {
  return (
    <section className="py-[92px] px-6 bg-white" id="use-cases">
      <div className="max-w-[1280px] mx-auto">

        <div className="text-center max-w-[680px] mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-[13px] py-[5px] bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 text-[12px] font-bold uppercase tracking-[0.06em] rounded-full border border-orange-200 mb-4">
            Use cases
          </span>
          <h2
            className="font-extrabold text-[#1c0700] tracking-[-0.03em] leading-[1.1]"
            style={{ fontSize: 'clamp(26px, 3.2vw, 42px)' }}
          >
            Designed for every stage of the real estate sales cycle.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="bg-white border border-[#fde8d8] rounded-[16px] px-[22px] py-6 hover:translate-y-[-3px] hover:border-orange-300 hover:shadow-[0_12px_28px_rgba(234,88,12,0.1)] transition-all duration-200"
            >
              <h3 className="text-[15px] font-bold text-[#1c0700] tracking-[-0.01em] mb-2">{uc.title}</h3>
              <p className="text-[13px] text-amber-900 leading-[1.62] m-0">{uc.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
