import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Home } from 'lucide-react'
import { login } from '../apiservices/loginService'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm]         = useState({ email: '', password: '' })
  const [errors, setErrors]     = useState({})
  const [apiError, setApiError] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
    setApiError('')
  }

  const validate = () => {
    const e = {}
    if (!form.email.trim())    e.email    = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                               e.email    = 'Enter a valid email'
    if (!form.password.trim()) e.password = 'Required'
    else if (form.password.length < 6)
                               e.password = 'Min 6 characters'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setApiError('')
    try {
      await login(form.email.trim(), form.password)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1c0700 0%, #431407 45%, #7c2d12 100%)' }}>

      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.045) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* animated rings - centered */}
      {[700, 560, 430, 310, 205, 120].map((size, i) => (
        <div key={size} className="absolute rounded-full pointer-events-none"
          style={{
            width: size, height: size,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid rgba(249,115,22,${0.06 + i * 0.04})`,
            animation: `loginRingPulse ${5 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
          }} />
      ))}

      {/* orange glow blob behind card */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 480, height: 480,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(234,88,12,0.18) 0%, transparent 70%)',
        }} />

      {/* home icon */}
      <Link to="/"
        className="absolute top-5 right-6 text-white/30 hover:text-orange-400 transition-colors duration-200 no-underline z-20">
        <Home className="w-5 h-5" />
      </Link>

      {/* glassmorphism card */}
      <div className="relative z-10 w-full max-w-[400px] mx-4 rounded-3xl px-8 py-10"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}>

        {/* logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/callohm-realestate-logo.png" alt="CallOHM"
            className="h-10 w-auto mb-3 brightness-0 invert" />
          <h1 className="text-[22px] font-extrabold text-white tracking-tight">Welcome back</h1>
          <p className="text-[12px] text-white/40 mt-1">Sign in to your CallOHM account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* email */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              className="w-full h-[46px] px-4 rounded-xl text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: errors.email ? '1px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,255,255,0.12)',
                boxShadow: errors.email ? '0 0 0 3px rgba(239,68,68,0.12)' : 'none',
              }}
              onFocus={e => { e.target.style.border = '1px solid rgba(249,115,22,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)' }}
              onBlur={e => { e.target.style.border = errors.email ? '1px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,255,255,0.12)'; e.target.style.boxShadow = errors.email ? '0 0 0 3px rgba(239,68,68,0.12)' : 'none' }}
            />
            {errors.email && <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>}
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                className="w-full h-[46px] px-4 pr-11 rounded-xl text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: errors.password ? '1px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,255,255,0.12)',
                  boxShadow: errors.password ? '0 0 0 3px rgba(239,68,68,0.12)' : 'none',
                }}
                onFocus={e => { e.target.style.border = '1px solid rgba(249,115,22,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)' }}
                onBlur={e => { e.target.style.border = errors.password ? '1px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,255,255,0.12)'; e.target.style.boxShadow = errors.password ? '0 0 0 3px rgba(239,68,68,0.12)' : 'none' }}
              />
              <button type="button" onClick={() => setShowPwd(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors duration-150 bg-transparent border-none cursor-pointer p-0">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-400 mt-0.5">{errors.password}</p>}
          </div>

          {/* forgot password */}
          <div className="flex justify-end -mt-1">
            <button type="button"
              className="text-[11px] text-white/35 hover:text-orange-400 transition-colors duration-150 bg-transparent border-none cursor-pointer p-0">
              Forgot password?
            </button>
          </div>

          {/* api error */}
          {apiError && (
            <div className="rounded-xl px-4 py-3 text-[12px] text-red-300 font-medium"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
              {apiError}
            </div>
          )}

          {/* submit */}
          <button type="submit" disabled={loading}
            className="relative w-full h-[48px] rounded-xl text-white text-[14px] font-bold border-none cursor-pointer overflow-hidden transition-all duration-200 mt-1"
            style={{
              background: loading
                ? 'rgba(249,115,22,0.5)'
                : 'linear-gradient(90deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(234,88,12,0.45)',
            }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Signing in...
              </span>
            ) : 'Log in'}
          </button>

          <p className="text-center text-[11px] text-white/25 mt-1">
            Don't have an account?{' '}
            <Link to="/book-demo" className="text-orange-400 hover:text-orange-300 no-underline font-semibold transition-colors">
              Book a demo
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}
