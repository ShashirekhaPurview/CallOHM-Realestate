import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, Phone, BarChart3,
  Megaphone, Settings, ChevronLeft, ChevronRight,
  LogOut, Bell, Menu, X, Zap, Bot, FileText,
} from 'lucide-react'
import { logout, tokenStorage } from '../apiservices/loginService'

const NAV = [
  {
    section: 'Main',
    items: [
      { icon: Bot, label: 'Agent', to: '/dashboard/agent', badge: null },
      { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard', badge: null },
      { icon: Users, label: 'Leads', to: '/dashboard/leads', badge: '23' },
      { icon: Phone, label: 'Calls', to: '/dashboard/calls', badge: null },
      { icon: BarChart3, label: 'Analytics', to: '/dashboard/analytics', badge: null },
    ],
  },
  {
    section: 'Manage',
    items: [
      { icon: FileText, label: 'Prompts',   to: '/dashboard/prompts',   badge: null },
      { icon: Megaphone, label: 'Campaigns', to: '/dashboard/campaigns', badge: null },
      { icon: Settings, label: 'Settings',  to: '/dashboard/settings',  badge: null },
    ],
  },
]

function NavItem({ icon: Icon, label, to, badge, collapsed }) {
  return (
    <NavLink
      to={to}
      end={to === '/dashboard'}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 no-underline overflow-hidden
        ${isActive ? 'text-white' : 'text-white/35 hover:text-white/70'}`
      }
    >
      {({ isActive }) => (
        <>
          {/* torch spotlight — all clipped inside element */}
          {isActive && (
            <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" style={{ animation: 'torchReveal 0.4s ease-out forwards' }}>

              {/* filled cone — stays visible all the way across, fades gently */}
              <span className="absolute inset-0" style={{
                clipPath: 'polygon(100% 40%, 100% 60%, 0% 100%, 0% 0%)',
                background: 'linear-gradient(to left, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0.3) 25%, rgba(249,115,22,0.15) 55%, rgba(249,115,22,0.08) 85%, rgba(249,115,22,0.04) 100%)',
              }} />

              {/* brighter core inside the cone — same shape, slightly tighter */}
              <span className="absolute inset-0" style={{
                clipPath: 'polygon(100% 43%, 100% 57%, 0% 82%, 0% 18%)',
                background: 'linear-gradient(to left, rgba(255,200,100,0.6) 0%, rgba(249,115,22,0.3) 30%, rgba(249,115,22,0.12) 70%, rgba(249,115,22,0.03) 100%)',
              }} />

              {/* hot center line */}
              <span className="absolute top-1/2 -translate-y-px right-0 left-0 h-[1.5px]" style={{
                background: 'linear-gradient(to left, rgba(255,240,180,0.8) 0%, rgba(255,160,50,0.5) 25%, rgba(249,115,22,0.2) 65%, rgba(249,115,22,0.05) 100%)',
              }} />

              {/* indicator — the light source */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[24px] rounded-l-full"
                style={{
                  background: 'linear-gradient(180deg, #fff8f0 0%, #fb923c 45%, #ea580c 100%)',
                  boxShadow: '-2px 0 8px rgba(249,115,22,1), -6px 0 20px rgba(249,115,22,0.9), -14px 0 40px rgba(249,115,22,0.45)',
                }} />
            </span>
          )}

          {/* hover tint for inactive */}
          {!isActive && (
            <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.05] transition-colors pointer-events-none" />
          )}

          {/* icon with glow when active */}
          <Icon
            className={`relative z-10 w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive ? 'text-orange-400' : ''}`}
            style={isActive ? { filter: 'drop-shadow(0 0 5px rgba(249,115,22,0.85))' } : {}}
          />

          {!collapsed && (
            <span className="relative z-10 text-[13px] font-semibold leading-none flex-1 truncate">{label}</span>
          )}

          {!collapsed && badge && (
            <span className="relative z-10 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/20">
              {badge}
            </span>
          )}

          {/* tooltip when collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#1a0800] border border-white/10 text-white text-[12px] font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-xl">
              {label}
              {badge && <span className="ml-1.5 text-orange-400">({badge})</span>}
            </div>
          )}
        </>
      )}
    </NavLink>
  )
}

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  /* redirect if not logged in */
  useEffect(() => {
    if (!tokenStorage.isLoggedIn()) navigate('/login', { replace: true })
  }, [navigate])

  /* close mobile menu on route change */
  useEffect(() => setMobileOpen(false), [location.pathname])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0c0400 0%, #180900 60%, #0c0400 100%)' }}>

      {/* dot grid texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

      {/* top orange glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />

      {/* ── Logo row ── */}
      <div className={`relative flex items-center h-[64px] flex-shrink-0 border-b border-white/[0.07] ${collapsed ? 'justify-center px-0' : 'px-4 gap-2.5'}`}>
        <img src="/callohm-realestate-logo.png" alt="CallOHM"
          className="h-7 w-auto flex-shrink-0 brightness-0 invert opacity-90" />
        {!collapsed && (
          <span className="text-[15px] font-extrabold text-white tracking-tight">CallOHM</span>
        )}
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={() => setCollapsed(v => !v)}
        className="absolute -right-3 top-[52px] z-20 w-6 h-6 rounded-full flex items-center justify-center border border-white/15 cursor-pointer transition-all duration-150 hover:border-orange-500/60 hover:bg-orange-500/20"
        style={{ background: '#1a0800' }}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-white/50" />
          : <ChevronLeft className="w-3 h-3 text-white/50" />
        }
      </button>

      {/* ── Nav sections ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-5 scrollbar-none">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.12em] px-3 mb-1.5">{section}</p>
            )}
            {collapsed && <div className="h-px bg-white/[0.07] mx-2 mb-2" />}
            <div className="space-y-0.5">
              {items.map(item => (
                <NavItem key={item.to} {...item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User / logout ── */}
      <div className="flex-shrink-0 border-t border-white/[0.07] p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-extrabold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white/80 truncate leading-tight">Shashirekha</p>
              <p className="text-[10px] text-white/30 truncate leading-tight">Admin</p>
            </div>
            <button onClick={handleLogout}
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 bg-transparent border-none cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-extrabold text-white"
              style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
              S
            </div>
            <button onClick={handleLogout}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 bg-transparent border-none cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#f7f3f0] overflow-hidden">

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[220px]'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 z-40 w-[220px] lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 h-[56px] flex items-center justify-between px-5 bg-white border-b border-orange-100/60">
          <div className="flex items-center gap-3">
            {/* mobile hamburger */}
            <button onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-1.5 rounded-lg text-amber-900/50 hover:bg-orange-50 transition-colors bg-transparent border-none cursor-pointer">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {/* page title derived from route */}
            <PageTitle />
          </div>

          <div className="flex items-center gap-2">
            {/* live calls badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100">
              <Zap className="w-3 h-3 text-orange-500" />
              <span className="text-[11px] font-bold text-orange-600">18 calls active</span>
            </div>

            {/* notifications */}
            <button className="relative p-2 rounded-xl text-amber-900/40 hover:bg-orange-50 hover:text-amber-900 transition-all duration-150 bg-transparent border-none cursor-pointer">
              <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function PageTitle() {
  const location = useLocation()
  const map = {
    '/dashboard': 'Dashboard',
    '/dashboard/agent': 'Agent',
    '/dashboard/leads': 'Leads',
    '/dashboard/calls': 'Calls',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/prompts':   'Prompts',
    '/dashboard/campaigns': 'Campaigns',
    '/dashboard/settings': 'Settings',
  }
  return (
    <h1 className="text-[15px] font-bold text-[#1c0700]">
      {map[location.pathname] ?? 'Dashboard'}
    </h1>
  )
}
