export default function CtaSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden"
      id="demo"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249,115,22,0.28), transparent),
          radial-gradient(ellipse 40% 40% at 90% 10%, rgba(245,158,11,0.18), transparent),
          linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)
        `,
      }}
    >
      {/* grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative z-[1] max-w-[720px] mx-auto flex flex-col items-center">

        <span className="inline-flex items-center gap-2 px-[13px] py-[5px] bg-orange-500/[0.18] text-orange-300 text-[12px] font-bold uppercase tracking-[0.06em] rounded-full mb-4">
          Start today
        </span>

        <h2
          className="font-black text-orange-50 tracking-[-0.04em] leading-[1.08] mt-4 mb-[18px] max-w-[14ch]"
          style={{ fontSize: 'clamp(30px, 3.8vw, 50px)' }}
        >
          Ready to let AI qualify your next 1,000 leads?
        </h2>

        <p className="text-[17px] text-orange-100/[0.65] leading-[1.66] max-w-[520px] mb-[38px]">
          Book a 20-minute live demo and watch CallOHM call and qualify a real lead right in front of you.
        </p>

        <div className="cta-actions flex items-center justify-center gap-[14px] flex-wrap">
          <a
            href="mailto:hello@callohm.ai"
            className="inline-flex items-center justify-center h-[52px] px-7 bg-white text-orange-600 text-[15px] font-bold rounded-[12px] shadow-[0_4px_18px_rgba(0,0,0,0.18)] hover:translate-y-[-1px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)] transition-all duration-150 whitespace-nowrap no-underline"
          >
            Book a free demo
          </a>
          <a
            href="tel:+918000000000"
            className="inline-flex items-center justify-center h-[52px] px-7 text-white/[0.88] text-[15px] font-semibold border border-white/[0.28] rounded-[12px] bg-transparent hover:border-white/[0.55] hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap no-underline"
          >
            Call us now
          </a>
        </div>

      </div>
    </section>
  )
}
