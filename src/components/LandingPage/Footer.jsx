import { Link } from 'react-router-dom'

const footerColumns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '/#features'    },
      { label: 'How it works', href: '/#how-it-works'},
      { label: 'Analytics',    href: '/#analytics'   },
      { label: 'FAQs',         route: '/faq'         },
      { label: 'Pricing',      route: '/pricing'     },
    ],
  },
  {
    heading: 'Use Cases',
    links: [
      { label: 'New launches',          href: '/#use-cases' },
      { label: 'Database reactivation', href: '/#use-cases' },
      { label: 'Expo leads',            href: '/#use-cases' },
      { label: 'NRI outreach',          href: '/#use-cases' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us',   route: '/about'      },
      { label: 'Leadership', route: '/leadership' },
      { label: 'Contact',    route: '/contact'    },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',   route: '/privacy' },
      { label: 'Terms of Service', route: '/terms'   },
      { label: 'Cookie Policy',    route: '/cookies' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-[60px] px-6 pb-0 bg-gray-50">
      <div className="max-w-[1280px] mx-auto pb-10 border-b border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-12">

          {/* brand block */}
          <div>
            <Link to="/" className="flex items-center gap-[10px] no-underline mb-[14px]">
              <img src="/callohm-realestate-logo.png" alt="CallOHM" className="h-10 w-auto object-contain" />
              <span className="text-[18px] font-extrabold text-gray-900 tracking-[-0.01em]">CallOHM</span>
            </Link>
            <p className="text-[14px] text-gray-500 leading-[1.72] max-w-[280px] mb-[22px]">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-7">
            {footerColumns.map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.08em] mb-4">
                  {heading}
                </h4>
                {links.map(({ label, href, route }) => {
                  const cls = 'flex items-center text-[13px] text-gray-500 no-underline mb-[10px] hover:text-orange-600 transition-colors duration-150'
                  if (route) return <Link key={label} to={route} className={cls}>{label}</Link>
                  return <a key={label} href={href} className={cls}>{label}</a>
                })}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-[1280px] mx-auto py-5">
        <span className="text-[13px] text-gray-400">© 2026 CallOHM. All rights reserved.</span>
        <div className="flex flex-wrap gap-5">
          <Link to="/privacy" className="text-[13px] text-gray-400 no-underline hover:text-orange-600 transition-colors duration-150">Privacy Policy</Link>
          <Link to="/terms"   className="text-[13px] text-gray-400 no-underline hover:text-orange-600 transition-colors duration-150">Terms of Service</Link>
          <Link to="/cookies" className="text-[13px] text-gray-400 no-underline hover:text-orange-600 transition-colors duration-150">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}
