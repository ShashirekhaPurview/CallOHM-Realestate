import { useState, useEffect, useRef } from 'react'
import {
  Bot, Mic, Brain, Cpu, Tag, Volume2,
  CheckCircle2, XCircle, AlertCircle, Play, Pause,
  ArrowLeft, Loader2, CalendarDays, Headphones,
} from 'lucide-react'
import { getAgentById, getFullAgentById, AGENT_IDS } from '../../apiservices/agentService'

/* ── skeleton ─────────────────────────────────────────────── */
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-orange-100 rounded-lg ${className}`} />
}

/* ── audio player ─────────────────────────────────────────── */
function AudioPlayer({ url }) {
  const [playing,  setPlaying]  = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime  = () => setProgress((audio.currentTime / audio.duration) * 100 || 0)
    const onEnded = () => { setPlaying(false); setProgress(0) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('ended', onEnded) }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else         { audio.play();  setPlaying(true)  }
  }

  if (!url) return null
  return (
    <div className="flex items-center gap-3 mt-2 px-4 py-3 rounded-xl bg-orange-50 border border-orange-100">
      <audio ref={audioRef} src={url} preload="none" />
      <button onClick={toggle}
        className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0 border-none cursor-pointer hover:bg-orange-600 transition-colors">
        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>
      <div className="flex-1 h-1.5 bg-orange-200 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>
      <span className="text-[10px] font-bold text-orange-400 flex-shrink-0">Preview</span>
    </div>
  )
}

/* ── info row ─────────────────────────────────────────────── */
function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-orange-50 last:border-0">
      <span className="text-[11px] text-amber-900/40 font-medium">{label}</span>
      <span className="text-[12px] font-bold text-[#1c0700] capitalize">{value ?? '-'}</span>
    </div>
  )
}

/* ── section card ─────────────────────────────────────────── */
function Card({ title, icon: Icon, iconColor = 'text-orange-500', children }) {
  return (
    <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-orange-50">
        <span className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        </span>
        <p className="text-[13px] font-bold text-[#1c0700]">{title}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

/* ── agent summary card (list view) ──────────────────────── */
function AgentCard({ agentId, onView }) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    getFullAgentById(agentId)
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [agentId])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-orange-100 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-11 h-11 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-7 flex-1 rounded-lg" />
          <Skeleton className="h-7 flex-1 rounded-lg" />
          <Skeleton className="h-7 flex-1 rounded-lg" />
        </div>
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-100 p-5 flex items-center gap-2 text-red-500">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <p className="text-[12px]">{error}</p>
      </div>
    )
  }

  const { agent, llm, voice, stt, prompt } = data
  const created = agent.created_at
    ? new Date(agent.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '-'

  const chips = [
    { icon: Brain,  label: 'LLM',   value: llm?.modelName,          color: '#8b5cf6' },
    { icon: Mic,    label: 'Voice', value: voice?.purviewVoiceName,  color: '#f97316' },
    { icon: Cpu,    label: 'STT',   value: stt?.sttName,             color: '#0ea5e9' },
  ]

  const promptPreview = prompt?.promptText
    ? prompt.promptText.slice(0, 120).trimEnd() + (prompt.promptText.length > 120 ? '...' : '')
    : null

  return (
    <div className="bg-white rounded-2xl border border-orange-100 hover:border-orange-200 hover:shadow-[0_4px_20px_rgba(234,88,12,0.08)] transition-all duration-200 overflow-hidden">

      {/* header */}
      <div className="flex items-start gap-4 px-5 pt-5 pb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[15px] font-extrabold text-[#1c0700] truncate">{agent.agentName}</h3>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0 ${
              agent.is_active
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                : 'bg-red-50 border-red-100 text-red-600'
            }`}>
              {agent.is_active ? <CheckCircle2 className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
              {agent.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-[11px] text-amber-900/35 font-mono mt-0.5 truncate">{agent.agentID}</p>
        </div>
      </div>

      {/* LLM / Voice / STT chips */}
      <div className="flex gap-2 px-5 pb-4 flex-wrap">
        {chips.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-100 bg-orange-50/40">
            <Icon className="w-3 h-3 flex-shrink-0" style={{ color }} />
            <span className="text-[10px] font-semibold text-amber-900/40">{label}</span>
            <span className="text-[11px] font-bold text-[#1c0700] truncate max-w-[90px]">{value ?? '-'}</span>
          </div>
        ))}
      </div>

      {/* prompt preview */}
      {promptPreview && (
        <div className="mx-5 mb-4 px-4 py-3 rounded-xl bg-orange-50/60 border border-orange-100">
          <p className="text-[11px] font-semibold text-amber-900/35 uppercase tracking-wider mb-1">Prompt preview</p>
          <p className="text-[12px] text-amber-900/60 leading-relaxed">{promptPreview}</p>
        </div>
      )}

      {/* footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-orange-50 bg-orange-50/30">
        <div className="flex items-center gap-1.5 text-[11px] text-amber-900/35">
          <CalendarDays className="w-3.5 h-3.5" />
          Created {created}
        </div>
        <button
          onClick={() => onView(agentId)}
          className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold
            bg-gradient-to-r from-orange-400 to-orange-500 text-white border-none cursor-pointer
            hover:from-orange-500 hover:to-orange-600 transition-all duration-150
            shadow-[0_2px_8px_rgba(234,88,12,0.3)]"
        >
          View details
        </button>
      </div>
    </div>
  )
}

/* ── detail view ──────────────────────────────────────────── */
function AgentDetail({ agentId, onBack }) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError('')
    getFullAgentById(agentId)
      .then(setData)
      .catch(e => setError(e.message || 'Failed to load agent'))
      .finally(() => setLoading(false))
  }, [agentId])

  const { agent, llm, voice, prompt, stt, category } = data ?? {}

  if (error) {
    return (
      <div className="flex items-center gap-3 text-red-500 py-8">
        <AlertCircle className="w-5 h-5" />
        <p className="text-[14px] font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* back + agent header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-amber-900/50 hover:text-orange-500
            bg-transparent border-none cursor-pointer p-0 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-orange-100 px-5 py-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          {loading
            ? <><Skeleton className="h-5 w-40 mb-1.5" /><Skeleton className="h-3.5 w-56" /></>
            : <>
                <h2 className="text-[17px] font-extrabold text-[#1c0700] leading-tight">{agent?.agentName}</h2>
                <p className="text-[11px] text-amber-900/35 font-mono mt-0.5">{agent?.agentID}</p>
              </>
          }
        </div>
        <div className="flex-shrink-0">
          {loading ? <Skeleton className="h-7 w-20 rounded-full" /> : (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
              agent?.is_active
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                : 'bg-red-50 border-red-100 text-red-600'
            }`}>
              {agent?.is_active ? <><CheckCircle2 className="w-3.5 h-3.5" /> Active</> : <><XCircle className="w-3.5 h-3.5" /> Inactive</>}
            </span>
          )}
        </div>
      </div>

      {/* chips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Brain, label: 'LLM Model',  value: llm?.modelName,            color: 'violet' },
          { icon: Mic,   label: 'Voice',       value: voice?.purviewVoiceName,   color: 'orange' },
          { icon: Cpu,   label: 'STT',         value: stt?.sttName,              color: 'sky'    },
          { icon: Tag,   label: 'Category',    value: category?.categoryName ?? category?.name ?? category?.category_name ?? category?.categoryID, color: 'amber' },
        ].map(({ icon: Icon, label, value, color }) => {
          const colors = {
            orange: 'bg-orange-50 border-orange-100 text-orange-500 text-orange-600',
            violet: 'bg-violet-50 border-violet-100 text-violet-500 text-violet-700',
            sky:    'bg-sky-50 border-sky-100 text-sky-500 text-sky-700',
            amber:  'bg-amber-50 border-amber-100 text-amber-500 text-amber-700',
          }
          const [bg, border, iconCls, valCls] = colors[color].split(' ')
          return (
            <div key={label} className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${bg} ${border}`}>
              <span className={`w-8 h-8 rounded-lg border ${bg} ${border} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${iconCls}`} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider leading-none mb-1">{label}</p>
                {loading ? <Skeleton className="h-4 w-20" /> : <p className={`text-[13px] font-bold truncate ${valCls}`}>{value ?? '-'}</p>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        {/* left */}
        <div className="space-y-5">
          {/* Prompt */}
          <Card title="Prompt" icon={Brain} iconColor="text-violet-500">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider mb-1">Title</p>
                {loading ? <Skeleton className="h-5 w-48" /> : <p className="text-[14px] font-bold text-[#1c0700]">{prompt?.title}</p>}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider mb-1">Opening line</p>
                {loading ? <Skeleton className="h-10 w-full" /> : (
                  <div className="flex items-start gap-2 px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                    <p className="text-[13px] text-amber-900/70 italic leading-relaxed">{prompt?.initialSay}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider mb-1.5">Full prompt</p>
                {loading ? <Skeleton className="h-40 w-full" /> : (
                  <pre className="text-[12px] text-amber-900/70 leading-relaxed whitespace-pre-wrap break-words font-sans
                    bg-orange-50/60 border border-orange-100 rounded-xl p-4 h-[280px] overflow-y-auto
                    scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
                    {prompt?.promptText}
                  </pre>
                )}
              </div>
            </div>
          </Card>

          {/* Variables */}
          <Card title="Prompt Variables" icon={Tag} iconColor="text-amber-500">
            {loading ? <Skeleton className="h-24 w-full" /> : (
              <div className="overflow-hidden rounded-xl border border-orange-100">
                {Object.entries(prompt?.variables ?? {}).map(([key, val], i) => (
                  <div key={key} className={`flex gap-4 px-4 py-2.5 ${i % 2 === 0 ? 'bg-white' : 'bg-orange-50/40'}`}>
                    <span className="text-[11px] font-bold text-orange-500 w-[140px] flex-shrink-0 truncate font-mono">{`{{${key}}}`}</span>
                    <span className="text-[12px] text-amber-900/60 flex-1 min-w-0 break-words line-clamp-2">{String(val)}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* right */}
        <div className="space-y-5">
          <Card title="Voice" icon={Mic}>
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div> : (
              <>
                <InfoRow label="Name"     value={voice?.purviewVoiceName} />
                <InfoRow label="Gender"   value={voice?.gender}           />
                <InfoRow label="Language" value={voice?.language_code}    />
                <InfoRow label="Provider" value={voice?.provider_name}    />
                <AudioPlayer url={voice?.audio_file?.url} />
              </>
            )}
          </Card>

          <Card title="Language Model" icon={Brain} iconColor="text-violet-500">
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-28" /></div> : (
              <>
                <InfoRow label="Model"      value={llm?.modelName}     />
                <InfoRow label="Provider"   value={llm?.provider_name} />
                <InfoRow label="Max tokens" value={llm?.maxTokens}     />
              </>
            )}
          </Card>

          <Card title="Speech-to-Text" icon={Cpu} iconColor="text-sky-500">
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-28" /></div> : (
              <>
                <InfoRow label="Name"     value={stt?.sttName}       />
                <InfoRow label="Model"    value={stt?.modelName}     />
                <InfoRow label="Provider" value={stt?.provider_name} />
                <InfoRow label="Language" value={stt?.language}      />
              </>
            )}
          </Card>

          <Card title="Agent Settings" icon={Bot}>
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /></div> : (
              <>
                <InfoRow label="Audio quality"       value={agent?.audio_quality?.toUpperCase()}              />
                <InfoRow label="Voicemail detection" value={agent?.voicemail_detection_enabled ? 'On' : 'Off'} />
                <InfoRow label="Voicemail action"    value={agent?.voicemail_action?.replace('_', ' ')}        />
                <InfoRow label="Transfer enabled"    value={agent?.transfer_enabled ? 'Yes' : 'No'}            />
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ── tab selector ─────────────────────────────────────────── */
const TABS = [
  { id: 'default', label: 'Default Agent',  sub: 'Core AI caller',       agentId: AGENT_IDS.default },
  { id: 'company', label: 'Company Agents', sub: 'Custom configuration', agentId: AGENT_IDS.company },
]

const CUT = 22

function TabSelector({ activeTab, onChange }) {
  return (
    <div className="flex items-stretch mb-7 h-[56px]"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.13))' }}>
      {TABS.map((tab, i) => {
        const isActive = activeTab === tab.id
        const isLast   = i === TABS.length - 1

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex items-center gap-2.5 border-none cursor-pointer transition-colors duration-200 group h-full"
            style={{
              paddingLeft:  i === 0 ? '22px' : `${22 + CUT}px`,
              paddingRight: isLast  ? '22px' : `${16 + CUT}px`,
              marginLeft:   i > 0   ? `-${CUT}px` : '0',
              zIndex:       isActive ? 10 : TABS.length - i,
              clipPath: isLast
                ? `polygon(${CUT}px 0, 100% 0, 100% 100%, 0 100%)`
                : `polygon(0 0, calc(100% - ${CUT}px) 0, 100% 100%, 0 100%)`,
              background: isActive
                ? 'linear-gradient(135deg, #1c0700 0%, #3d1206 100%)'
                : '#d6cdc7',
            }}
          >
            <Bot className={`w-[15px] h-[15px] flex-shrink-0 transition-colors ${
              isActive ? 'text-orange-400' : 'text-amber-800/60 group-hover:text-amber-800/80'
            }`} />
            <div>
              <p className={`text-[12px] font-extrabold uppercase tracking-[0.08em] leading-tight transition-colors ${
                isActive ? 'text-white' : 'text-amber-900/40 group-hover:text-amber-900/60'
              }`} style={!isActive ? { color: '#6b4226' } : {}}>{tab.label}</p>
              <p className={`text-[10px] mt-0.5 font-medium transition-colors ${
                isActive ? 'text-white/38' : 'text-amber-900/55'
              }`}>{tab.sub}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

/* ── main page ────────────────────────────────────────────── */
export default function AgentPage() {
  const [activeTab,    setActiveTab]    = useState('default')
  const [viewingAgent, setViewingAgent] = useState(null)

  const currentTab = TABS.find(t => t.id === activeTab)

  return (
    <div className="p-6 max-w-[1000px] mx-auto overflow-x-hidden">

      {/* page heading */}
      {!viewingAgent && (
        <div className="mb-5">
          <h2 className="text-[20px] font-extrabold text-[#1c0700]">Agents</h2>
          <p className="text-[13px] text-amber-900/40 mt-0.5">Manage and view your AI calling agents</p>
        </div>
      )}

      {/* innovative tab selector - only in list view */}
      {!viewingAgent && (
        <TabSelector activeTab={activeTab} onChange={id => setActiveTab(id)} />
      )}

      {/* content */}
      {viewingAgent ? (
        <AgentDetail agentId={viewingAgent} onBack={() => setViewingAgent(null)} />
      ) : (
        <div className="max-w-[520px]">
          <AgentCard agentId={currentTab.agentId} onView={id => setViewingAgent(id)} />
        </div>
      )}
    </div>
  )
}
