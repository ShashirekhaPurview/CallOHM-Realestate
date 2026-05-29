import { BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="p-6">
<div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-orange-100 bg-orange-50/30">
        <div className="text-center">
          <BarChart3 className="w-10 h-10 text-orange-200 mx-auto mb-3" />
          <p className="text-[14px] font-bold text-amber-900/40">Analytics module coming soon</p>
          <p className="text-[12px] text-amber-900/25 mt-1">Detailed charts, conversion funnels, and team performance</p>
        </div>
      </div>
    </div>
  )
}
