import { Megaphone } from 'lucide-react'

export default function CampaignsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-[20px] font-extrabold text-[#1c0700]">Campaigns</h2>
        <p className="text-[13px] text-amber-900/40 mt-0.5">Create and manage your outbound calling campaigns</p>
      </div>
      <div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-orange-100 bg-orange-50/30">
        <div className="text-center">
          <Megaphone className="w-10 h-10 text-orange-200 mx-auto mb-3" />
          <p className="text-[14px] font-bold text-amber-900/40">Campaigns module coming soon</p>
          <p className="text-[12px] text-amber-900/25 mt-1">Build, schedule, and monitor AI calling campaigns</p>
        </div>
      </div>
    </div>
  )
}
