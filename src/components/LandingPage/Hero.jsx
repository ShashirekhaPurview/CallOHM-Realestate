export default function Hero() {
  return (
    <section
      className="relative flex items-end h-screen min-h-[640px] px-6 pb-[88px] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/house.jpg')" }}
      id="top"
    >
      {/* bottom gradient for text readability */}
      <div className="hero-overlay" aria-hidden="true" />
      {/* top gradient for nav readability */}
      <div className="absolute inset-x-0 top-0 h-[120px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 100%)' }} aria-hidden="true" />

      <div className="relative z-[1] max-w-[860px] w-full">
        <h1
          className="font-black text-white tracking-[-0.04em] leading-[1.04] mb-7"
          style={{
            fontSize: 'clamp(38px, 5vw, 68px)',
            textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 32px rgba(0,0,0,0.5)',
          }}
        >
          Open the Door to<br />
          <span className="text-orange-400">Smarter Real Estate Sales.</span>
        </h1>

        <div className="hero-actions flex items-center gap-[14px] flex-wrap">
          <a
            href="#demo"
            className="btn-primary inline-flex items-center justify-center h-[52px] px-[30px] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-[12px] shadow-[0_4px_18px_rgba(234,88,12,0.36)] hover:translate-y-[-1px] hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)] transition-all duration-150 whitespace-nowrap no-underline"
          >
            Book a live demo
          </a>
          <a
            href="#platform"
            className="inline-flex items-center justify-center h-[52px] px-7 text-white/[0.88] text-[15px] font-semibold border border-white/[0.28] rounded-[12px] bg-transparent hover:border-white/[0.55] hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap no-underline"
          >
            See the platform →
          </a>
        </div>
      </div>
    </section>
  )
}
