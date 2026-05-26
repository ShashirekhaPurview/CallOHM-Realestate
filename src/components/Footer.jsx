const footerLinks = {
  Product:      ['Features', 'How it works', 'Analytics', 'Integrations'],
  'Use cases':  ['New launches', 'Database reactivation', 'Expo leads', 'NRI outreach'],
  Company:      ['About us', 'Blog', 'Careers', 'Contact'],
}

export default function Footer() {
  return (
    <footer
      className="border-t border-gray-200 pt-[60px] px-6 pb-0 bg-gray-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 max-w-[1280px] mx-auto pb-10 border-b border-gray-200">

        {/* brand block */}
        <div>
          <a className="flex items-center gap-[10px] no-underline mb-[14px]" href="#top">
            <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-gradient-to-br from-orange-500 to-orange-600 text-white text-[14px] font-black shadow-[0_4px_12px_rgba(234,88,12,0.4)]">
              C
            </span>
            <span className="text-[18px] font-extrabold text-gray-900 tracking-[-0.01em]">CallOHM</span>
          </a>
          <p className="text-[14px] text-gray-500 leading-[1.72] max-w-[300px] mb-[22px]">
            AI voice agents that call, qualify, and convert real estate leads at scale.
          </p>
          <div className="flex gap-[10px]">
            {['in', 'X', '▶'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="grid place-items-center w-9 h-9 border border-gray-200 rounded-[10px] text-gray-400 text-[12px] font-bold no-underline hover:border-orange-300 hover:text-orange-500 transition-all duration-150"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-7">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.08em] mb-4">
                {heading}
              </h4>
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block text-[13px] text-gray-500 no-underline mb-[10px] hover:text-orange-600 transition-colors duration-150"
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-[1280px] mx-auto py-5">
        <span className="text-[13px] text-gray-400">© 2026 CallOHM. All rights reserved.</span>
        <div className="flex gap-5">
          {['Privacy Policy', 'Terms of Service'].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[13px] text-gray-400 no-underline hover:text-orange-600 transition-colors duration-150"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

    </footer>
  )
}
