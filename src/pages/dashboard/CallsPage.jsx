import { Phone } from 'lucide-react'

export default function CallsPage() {
  return (
    <div className="p-6">
<div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-orange-100 bg-orange-50/30">
        <div className="text-center">
          <Phone className="w-10 h-10 text-orange-200 mx-auto mb-3" />
          <p className="text-[14px] font-bold text-amber-900/40">Calls module coming soon</p>
          <p className="text-[12px] text-amber-900/25 mt-1">Full call logs with recordings, transcripts, and AI summaries</p>
        </div>
      </div>
    </div>
  )
}
