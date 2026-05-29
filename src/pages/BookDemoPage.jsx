import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Home } from 'lucide-react'
import { getCountryCodes } from '../apiservices/contactsService'
import SearchableSelect from '../components/common/SearchableSelect'

const FLAG_MAP = {
  IN:'🇮🇳', US:'🇺🇸', GB:'🇬🇧', AE:'🇦🇪', SG:'🇸🇬', AU:'🇦🇺', CA:'🇨🇦',
  QA:'🇶🇦', SA:'🇸🇦', MY:'🇲🇾', DE:'🇩🇪', FR:'🇫🇷', PK:'🇵🇰', BD:'🇧🇩',
  LK:'🇱🇰', NP:'🇳🇵', PH:'🇵🇭', ID:'🇮🇩', TH:'🇹🇭', VN:'🇻🇳', CN:'🇨🇳',
  JP:'🇯🇵', KR:'🇰🇷', NG:'🇳🇬', ZA:'🇿🇦', EG:'🇪🇬', KE:'🇰🇪', GH:'🇬🇭',
  BR:'🇧🇷', MX:'🇲🇽', AR:'🇦🇷', CO:'🇨🇴', TR:'🇹🇷', IR:'🇮🇷', IQ:'🇮🇶',
  KW:'🇰🇼', OM:'🇴🇲', BH:'🇧🇭', JO:'🇯🇴', LB:'🇱🇧', IL:'🇮🇱', RU:'🇷🇺',
  UA:'🇺🇦', PL:'🇵🇱', CZ:'🇨🇿', HU:'🇭🇺', RO:'🇷🇴', GR:'🇬🇷', IT:'🇮🇹',
  ES:'🇪🇸', PT:'🇵🇹', NL:'🇳🇱', BE:'🇧🇪', SE:'🇸🇪', NO:'🇳🇴', DK:'🇩🇰',
  FI:'🇫🇮', CH:'🇨🇭', AT:'🇦🇹', HK:'🇭🇰', TW:'🇹🇼',
}

const STATS = [
  { num: '3x',   label: 'More leads qualified per day vs your current team' },
  { num: '60%',  label: 'Reduction in cost per qualified lead'               },
  { num: '24/7', label: 'AI calls and qualifies, even on weekends'            },
  { num: '38',   label: 'Site visits booked in a single weekend by one team' },
]

const inputCls = (err) =>
  `w-full h-[44px] px-4 rounded-xl border text-[14px] text-[#1c0700] placeholder-gray-400 bg-white outline-none transition-all duration-150 ${
    err
      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
  }`

export default function BookDemoPage() {
  const navigate = useNavigate()
  const [countryCodes, setCountryCodes] = useState([])

  useEffect(() => {
    getCountryCodes()
      .then(data => setCountryCodes(data?.countryCodes ?? []))
      .catch(() => {})
  }, [])

  const countries = countryCodes.map(c => ({
    ...c,
    flag: FLAG_MAP[c.isoCode] ?? '🏳',
  }))

  const COUNTRY_OPTIONS = countries.map(c => ({
    value: c.isoCode,
    label: `${c.flag}  ${c.name}  (${c.dialCode})`,
  }))

  const [form, setForm] = useState({
    fullName: '', org: '', email: '', phone: '', looking: '',
    country: null,
  })
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Set default country once codes are loaded
  useEffect(() => {
    if (countries.length > 0 && !form.country) {
      setForm(f => ({ ...f, country: countries[0] }))
    }
  }, [countries.length])

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const handleCountryChange = (isoCode) => {
    const found = countries.find(c => c.isoCode === isoCode)
    if (found) {
      setForm(f => ({ ...f, country: found, phone: '' }))
      setErrors(e => ({ ...e, phone: '' }))
    }
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.org.trim())      e.org      = 'Required'
    if (!form.email.trim())    e.email    = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                               e.email    = 'Enter a valid email'
    if (!form.phone.trim())    e.phone    = 'Required'
    else if (!/^\d+$/.test(form.phone))
                               e.phone    = 'Digits only'
    else if (form.country && (form.phone.length < form.country.minLength || form.phone.length > form.country.maxLength))
                               e.phone    = form.country.minLength === form.country.maxLength
                                 ? `Must be ${form.country.minLength} digits`
                                 : `Must be ${form.country.minLength}-${form.country.maxLength} digits`
    if (!form.looking.trim())  e.looking  = 'Required'
    else if (form.looking.trim().length < 20)
                               e.looking  = 'Min 20 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center px-6 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10 max-w-[380px] w-full text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-[18px] font-extrabold text-[#1c0700] mb-2">You're booked!</h2>
          <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
            We'll confirm your slot at <strong className="text-[#1c0700]">{form.email}</strong> within 24 hours.
          </p>
          <button onClick={() => navigate('/')}
            className="h-[40px] px-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[13px] font-bold rounded-lg shadow-[0_4px_16px_rgba(234,88,12,0.3)] hover:-translate-y-0.5 transition-all duration-150 border-none cursor-pointer">
            Back to home
          </button>
        </div>
      </div>
    )
  }

  const phoneLenHint = form.country
    ? form.country.minLength === form.country.maxLength
      ? `${form.country.minLength} digits`
      : `${form.country.minLength}-${form.country.maxLength} digits`
    : 'Phone number'

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">

      {/* LEFT - form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 xl:px-16 py-8 bg-white overflow-y-auto">
        <div className="w-full max-w-[400px] mx-auto lg:mx-0">

          {/* logo + back */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <img src="/callohm-realestate-logo.png" alt="CallOHM" className="h-9 w-auto" />
              <span className="text-[18px] font-extrabold text-orange-900 tracking-tight">CallOHM</span>
            </Link>
            <Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors duration-150 no-underline">
              <Home className="w-5 h-5" />
            </Link>
          </div>

          <h1 className="text-[26px] font-extrabold text-[#1c0700] leading-tight mb-1">Book Free Demo</h1>
          <p className="text-[13px] text-gray-400 mb-5">Find the best time to see Arya in action.</p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

            {/* name + org */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input type="text" placeholder="Full name"
                  value={form.fullName} onChange={e => set('fullName', e.target.value)}
                  className={inputCls(errors.fullName)} />
                {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <input type="text" placeholder="Organisation"
                  value={form.org} onChange={e => set('org', e.target.value)}
                  className={inputCls(errors.org)} />
                {errors.org && <p className="text-[11px] text-red-500 mt-1">{errors.org}</p>}
              </div>
            </div>

            {/* email */}
            <div>
              <input type="email" placeholder="Work email"
                value={form.email} onChange={e => set('email', e.target.value)}
                className={inputCls(errors.email)} />
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* country + phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <SearchableSelect
                  value={form.country?.isoCode ?? ''}
                  onChange={handleCountryChange}
                  options={COUNTRY_OPTIONS}
                  placeholder="Country"
                  searchable
                  size="md"
                />
              </div>
              <div>
                <input type="tel"
                  placeholder={phoneLenHint}
                  value={form.phone}
                  maxLength={form.country?.maxLength}
                  onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}
                  className={inputCls(errors.phone)} />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* looking for */}
            <div>
              <textarea rows={3}
                placeholder="How many leads does your team handle per month?"
                value={form.looking}
                onChange={e => set('looking', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-[14px] text-[#1c0700] placeholder-gray-400 bg-white outline-none resize-none transition-all duration-150 ${
                  errors.looking
                    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                }`} />
              <div className="flex justify-between items-center">
                {errors.looking
                  ? <p className="text-[11px] text-red-500 mt-1">{errors.looking}</p>
                  : <span />}
                <p className={`text-[11px] ml-auto mt-1 ${form.looking.trim().length >= 20 ? 'text-emerald-500 font-medium' : 'text-gray-400'}`}>
                  {form.looking.trim().length}/20
                </p>
              </div>
            </div>

            <button type="submit"
              className="w-full h-[48px] mt-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[15px] font-bold rounded-xl shadow-[0_4px_16px_rgba(234,88,12,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(234,88,12,0.4)] transition-all duration-150 border-none cursor-pointer">
              Book Demo
            </button>

            <p className="text-center text-[12px] text-gray-400">
              By submitting you agree to our{' '}
              <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>.
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT - brand panel */}
      <div
        className="relative lg:w-[440px] xl:w-[500px] flex-shrink-0 hidden lg:flex flex-col justify-center px-10 xl:px-14 py-12 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #ea580c 0%, #c2410c 50%, #7c2d12 100%)' }}
      >
        {/* dot texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)', backgroundSize: '26px 26px' }} />

        {/* concentric rings - centered on right half */}
        {[520, 400, 300, 210, 130, 64].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              top: '50%',
              right: -size / 3,
              transform: 'translateY(-50%)',
              border: `1px solid rgba(255,255,255,${0.08 + i * 0.03})`,
              animation: `ringPulse ${4 + i * 0.5}s ease-in-out ${i * 0.35}s infinite`,
            }}
          />
        ))}

        <div className="relative z-10">
          <p className="text-orange-200/70 text-[11px] font-bold uppercase tracking-widest mb-4">Why book with us</p>
          <h2 className="text-[clamp(24px,2.6vw,36px)] font-black text-white leading-[1.2] tracking-tight mb-10">
            Your shortcut to a<br />
            sales-ready pipeline<br />
            <span className="text-orange-200">starts here.</span>
          </h2>

          <div className="flex flex-col gap-5">
            {STATS.map(({ num, label }) => (
              <div key={num} className="flex items-center gap-4">
                <div
                  className="flex-shrink-0 w-[56px] h-[56px] rounded-full flex items-center justify-center text-[15px] font-black text-white"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.28)' }}
                >
                  {num}
                </div>
                <p className="text-[13.5px] text-white/80 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
