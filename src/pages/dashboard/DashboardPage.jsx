import { Users, Phone, TrendingUp, Calendar, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

const METRICS = [
  { icon: Users,        label: 'Total Leads',    value: '265',  trend: '+12%', up: true,  color: 'text-orange-500',  bg: 'bg-orange-50',   border: 'border-orange-100', glow: 'rgba(249,115,22,0.08)' },
  { icon: Phone,        label: 'Calls Today',    value: '91',   trend: '+8%',  up: true,  color: 'text-sky-500',     bg: 'bg-sky-50',      border: 'border-sky-100',    glow: 'rgba(14,165,233,0.08)' },
  { icon: TrendingUp,   label: 'Interested',     value: '163',  trend: '+21%', up: true,  color: 'text-violet-500',  bg: 'bg-violet-50',   border: 'border-violet-100', glow: 'rgba(139,92,246,0.08)' },
  { icon: Calendar,     label: 'Site Visits',    value: '34',   trend: '+5%',  up: true,  color: 'text-emerald-500', bg: 'bg-emerald-50',  border: 'border-emerald-100', glow: 'rgba(16,185,129,0.08)' },
]

const RECENT_CALLS = [
  { name: 'Rahul Mehta',   phone: '+91 98765 43210', outcome: 'Site visit booked',  score: 92, time: '2 min ago',   status: 'hot'  },
  { name: 'Priya Sharma',  phone: '+91 87654 32109', outcome: 'Callback scheduled', score: 78, time: '11 min ago',  status: 'warm' },
  { name: 'Arjun Nair',    phone: '+91 76543 21098', outcome: 'High intent - 3BHK', score: 85, time: '24 min ago',  status: 'hot'  },
  { name: 'Sneha Reddy',   phone: '+91 65432 10987', outcome: 'Budget mismatch',    score: 55, time: '38 min ago',  status: 'cold' },
  { name: 'Vikram Singh',  phone: '+91 54321 09876', outcome: 'Site visit booked',  score: 94, time: '52 min ago',  status: 'hot'  },
]

const statusConfig = {
  hot:  { label: 'Hot',  cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  warm: { label: 'Warm', cls: 'bg-orange-50 text-orange-700 border-orange-100'   },
  cold: { label: 'Cold', cls: 'bg-gray-50 text-gray-500 border-gray-100'         },
}

export default function DashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="p-6 space-y-6">

      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] text-amber-900/40 font-medium">{greeting},</p>
          <h2 className="text-[22px] font-extrabold text-[#1c0700] leading-tight">Shashirekha</h2>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-amber-900/30 font-medium">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <div className="flex items-center gap-1.5 mt-1 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-emerald-600 font-bold">18 calls in progress</span>
          </div>
        </div>
      </div>

      {/* metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map(({ icon: Icon, label, value, trend, up, color, bg, border, glow }) => (
          <div key={label} className={`relative rounded-2xl p-4 border ${bg} ${border} overflow-hidden`}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 100% 0%, ${glow} 0%, transparent 60%)` }} />
            <div className="flex items-center justify-between mb-3">
              <span className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 w-[18px] h-[18px] ${color}`} />
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${up ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                {trend}
              </span>
            </div>
            <p className={`text-[28px] font-extrabold leading-none ${color}`}>{value}</p>
            <p className="text-[12px] text-amber-900/45 font-medium mt-1.5">{label}</p>
          </div>
        ))}
      </div>

      {/* recent calls */}
      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100/60">
          <div>
            <h3 className="text-[14px] font-bold text-[#1c0700]">Recent Calls</h3>
            <p className="text-[11px] text-amber-900/40 mt-0.5">Latest AI-powered outbound calls</p>
          </div>
          <a href="/dashboard/calls" className="text-[12px] font-bold text-orange-500 hover:text-orange-600 no-underline flex items-center gap-1 transition-colors">
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="divide-y divide-orange-50">
          {RECENT_CALLS.map(({ name, phone, outcome, score, time, status }) => {
            const cfg = statusConfig[status]
            const scoreColor = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-orange-500' : 'text-gray-400'
            return (
              <div key={name} className="flex items-center gap-4 px-5 py-3.5 hover:bg-orange-50/40 transition-colors">
                <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-extrabold text-white"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
                  {name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#1c0700] truncate">{name}</p>
                  <p className="text-[11px] text-amber-900/40 truncate">{phone}</p>
                </div>
                <div className="hidden sm:block flex-1 min-w-0">
                  <p className="text-[12px] text-amber-900/60 truncate">{outcome}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.cls}`}>{cfg.label}</span>
                  <span className={`text-[18px] font-extrabold ${scoreColor} w-8 text-right`}>{score}</span>
                  <span className="text-[10px] text-amber-900/30 whitespace-nowrap hidden md:block">{time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: CheckCircle2, label: 'Calls completed today',   value: '247', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { icon: Clock,        label: 'Avg. call duration',       value: '3m 24s', color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-100' },
          { icon: AlertCircle,  label: 'Follow-ups pending',       value: '12',  color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
        ].map(({ icon: Icon, label, value, color, bg, border }) => (
          <div key={label} className={`flex items-center gap-4 rounded-2xl p-4 border ${bg} ${border}`}>
            <span className={`w-10 h-10 rounded-xl border ${bg} ${border} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </span>
            <div>
              <p className={`text-[22px] font-extrabold leading-none ${color}`}>{value}</p>
              <p className="text-[11px] text-amber-900/45 font-medium mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
