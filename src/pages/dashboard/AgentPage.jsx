import { useState, useEffect, useRef } from 'react'
import {
  Bot, Mic, Brain, Cpu, Tag,
  CheckCircle2, XCircle, AlertCircle, Play, Pause,
  ArrowLeft, Loader2, CalendarDays,
  Copy, Trash2, RotateCcw, MessageSquare, Plus, Edit3,
  ChevronLeft, ChevronRight, Send, X,
} from 'lucide-react'
import {
  getFullAgentById, getAgents, createAgent, updateAgent,
  deleteAgent, permanentDeleteAgent, getTrashAgents, restoreAgent,
  chatAgent, AGENT_IDS, getLLMs, getVoices, getSTTs,
} from '../../apiservices/agentService'
import { getCategories } from '../../apiservices/categoriesService'
import { getPrompts } from '../../apiservices/promptService'
import SearchableSelect from '../../components/common/SearchableSelect'

const LIMIT = 6

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
function SectionCard({ title, icon: Icon, iconColor = 'text-orange-500', children }) {
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

/* ── agent summary card (default tab) ────────────────────── */
function AgentCard({ agentId, onView, onDuplicate }) {
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
    { icon: Brain, label: 'LLM',   value: llm?.modelName,         color: '#8b5cf6' },
    { icon: Mic,   label: 'Voice', value: voice?.purviewVoiceName, color: '#f97316' },
    { icon: Cpu,   label: 'STT',   value: stt?.sttName,            color: '#0ea5e9' },
  ]

  const promptPreview = prompt?.promptText
    ? prompt.promptText.slice(0, 120).trimEnd() + (prompt.promptText.length > 120 ? '...' : '')
    : null

  return (
    <div className="bg-white rounded-2xl border border-orange-100 hover:border-orange-200 hover:shadow-[0_4px_20px_rgba(234,88,12,0.08)] transition-all duration-200 overflow-hidden">
      <div className="flex items-start gap-4 px-5 pt-5 pb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[15px] font-extrabold text-[#1c0700] truncate">{agent.agentName}</p>
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

      <div className="flex gap-2 px-5 pb-4 flex-wrap">
        {chips.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-100 bg-orange-50/40">
            <Icon className="w-3 h-3 flex-shrink-0" style={{ color }} />
            <span className="text-[10px] font-semibold text-amber-900/40">{label}</span>
            <span className="text-[11px] font-bold text-[#1c0700] truncate max-w-[90px]">{value ?? '-'}</span>
          </div>
        ))}
      </div>

      {promptPreview && (
        <div className="mx-5 mb-4 px-4 py-3 rounded-xl bg-orange-50/60 border border-orange-100">
          <p className="text-[11px] font-semibold text-amber-900/35 uppercase tracking-wider mb-1">Prompt preview</p>
          <p className="text-[12px] text-amber-900/60 leading-relaxed">{promptPreview}</p>
        </div>
      )}

      <div className="flex items-center justify-between px-5 py-3 border-t border-orange-50 bg-orange-50/30 gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11px] text-amber-900/35">
          <CalendarDays className="w-3.5 h-3.5" />
          Created {created}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDuplicate({
              agentID: agent.agentID, agentName: agent.agentName,
              llmID: agent.llmID, voiceID: agent.voiceID,
              promptID: agent.promptID, sttID: agent.sttID,
              modelName: llm?.modelName, purviewVoiceName: voice?.purviewVoiceName,
              sttName: stt?.sttName, promptTitle: prompt?.title,
            })}
            className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-lg text-[12px] font-bold border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            <Copy className="w-3 h-3" /> Duplicate
          </button>
          <button
            onClick={() => onView(agentId)}
            className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold bg-gradient-to-r from-orange-400 to-orange-500 text-white border-none cursor-pointer hover:from-orange-500 hover:to-orange-600 transition-all shadow-[0_2px_8px_rgba(234,88,12,0.3)]">
            View details
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── agent detail view ────────────────────────────────────── */
function AgentDetail({ agentId, onBack, onDuplicate, onDelete, onEdit }) {
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
      <div className="flex items-center justify-between gap-4">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-amber-900/50 hover:text-orange-500 bg-transparent border-none cursor-pointer p-0 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {!loading && agent && (
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit({ agent, llm, voice, stt, prompt, category })}
                className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            )}
            {onDuplicate && (
              <button
                onClick={() => onDuplicate({
                  agentID: agent.agentID, agentName: agent.agentName,
                  llmID: agent.llmID, voiceID: agent.voiceID,
                  promptID: agent.promptID, sttID: agent.sttID,
                  modelName: llm?.modelName, purviewVoiceName: voice?.purviewVoiceName,
                  sttName: stt?.sttName, promptTitle: prompt?.title,
                })}
                className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
                <Copy className="w-3.5 h-3.5" /> Duplicate
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(agent)}
                className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            )}
          </div>
        )}
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
                <p className="text-[17px] font-extrabold text-[#1c0700] leading-tight">{agent?.agentName}</p>
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
              {agent?.is_active
                ? <><CheckCircle2 className="w-3.5 h-3.5" /> Active</>
                : <><XCircle className="w-3.5 h-3.5" /> Inactive</>}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Brain, label: 'LLM Model', value: llm?.modelName,           col: { bg: 'bg-violet-50', border: 'border-violet-100', ic: 'text-violet-500', val: 'text-violet-700' } },
          { icon: Mic,   label: 'Voice',     value: voice?.purviewVoiceName,   col: { bg: 'bg-orange-50', border: 'border-orange-100', ic: 'text-orange-500', val: 'text-orange-600' } },
          { icon: Cpu,   label: 'STT',       value: stt?.sttName,              col: { bg: 'bg-sky-50',    border: 'border-sky-100',    ic: 'text-sky-500',    val: 'text-sky-700'    } },
          { icon: Tag,   label: 'Category',  value: category?.categoryName ?? category?.name ?? category?.categoryID, col: { bg: 'bg-amber-50', border: 'border-amber-100', ic: 'text-amber-500', val: 'text-amber-700' } },
        ].map(({ icon: Icon, label, value, col }) => (
          <div key={label} className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${col.bg} ${col.border}`}>
            <span className={`w-8 h-8 rounded-lg border ${col.bg} ${col.border} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${col.ic}`} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider leading-none mb-1">{label}</p>
              {loading ? <Skeleton className="h-4 w-20" /> : <p className={`text-[13px] font-bold truncate ${col.val}`}>{value ?? '-'}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        <div className="space-y-5">
          <SectionCard title="Prompt" icon={Brain} iconColor="text-violet-500">
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
                  <pre className="text-[12px] text-amber-900/70 leading-relaxed whitespace-pre-wrap break-words font-sans bg-orange-50/60 border border-orange-100 rounded-xl p-4 h-[280px] overflow-y-auto ss-scroll">
                    {prompt?.promptText}
                  </pre>
                )}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Prompt Variables" icon={Tag} iconColor="text-amber-500">
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
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Voice" icon={Mic}>
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div> : (
              <>
                <InfoRow label="Name"     value={voice?.purviewVoiceName} />
                <InfoRow label="Gender"   value={voice?.gender}           />
                <InfoRow label="Language" value={voice?.language_code}    />
                <InfoRow label="Provider" value={voice?.provider_name}    />
                <AudioPlayer url={voice?.audio_file?.url} />
              </>
            )}
          </SectionCard>

          <SectionCard title="Language Model" icon={Brain} iconColor="text-violet-500">
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-28" /></div> : (
              <>
                <InfoRow label="Model"      value={llm?.modelName}     />
                <InfoRow label="Provider"   value={llm?.provider_name} />
                <InfoRow label="Max tokens" value={llm?.maxTokens}     />
              </>
            )}
          </SectionCard>

          <SectionCard title="Speech-to-Text" icon={Cpu} iconColor="text-sky-500">
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-28" /></div> : (
              <>
                <InfoRow label="Name"     value={stt?.sttName}       />
                <InfoRow label="Model"    value={stt?.modelName}     />
                <InfoRow label="Provider" value={stt?.provider_name} />
                <InfoRow label="Language" value={stt?.language}      />
              </>
            )}
          </SectionCard>

          <SectionCard title="Agent Settings" icon={Bot}>
            {loading ? <div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /></div> : (
              <>
                <InfoRow label="Audio quality"       value={agent?.audio_quality?.toUpperCase()}               />
                <InfoRow label="Voicemail detection" value={agent?.voicemail_detection_enabled ? 'On' : 'Off'} />
                <InfoRow label="Voicemail action"    value={agent?.voicemail_action?.replace('_', ' ')}         />
                <InfoRow label="Transfer enabled"    value={agent?.transfer_enabled ? 'Yes' : 'No'}             />
              </>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}

/* ── company agent list card ──────────────────────────────── */
function AgentListCard({ agent, onView, onDuplicate, onDelete, onChat }) {
  const created = agent.created_at
    ? new Date(agent.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '-'

  const chips = [
    { icon: Brain, label: 'LLM',   value: agent.modelName,        color: '#8b5cf6' },
    { icon: Mic,   label: 'Voice', value: agent.purviewVoiceName, color: '#f97316' },
    { icon: Cpu,   label: 'STT',   value: agent.sttName,          color: '#0ea5e9' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-orange-100 hover:border-orange-200 hover:shadow-[0_4px_20px_rgba(234,88,12,0.08)] transition-all duration-200 overflow-hidden">
      <div className="flex items-start gap-4 px-5 pt-5 pb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[15px] font-extrabold text-[#1c0700] truncate">{agent.agentName}</p>
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

      <div className="flex gap-2 px-5 pb-4 flex-wrap">
        {chips.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-100 bg-orange-50/40">
            <Icon className="w-3 h-3 flex-shrink-0" style={{ color }} />
            <span className="text-[10px] font-semibold text-amber-900/40">{label}</span>
            <span className="text-[11px] font-bold text-[#1c0700] truncate max-w-[90px]">{value ?? '-'}</span>
          </div>
        ))}
        {agent.promptTitle && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-100 bg-orange-50/40">
            <Tag className="w-3 h-3 flex-shrink-0 text-amber-500" />
            <span className="text-[10px] font-semibold text-amber-900/40">Prompt</span>
            <span className="text-[11px] font-bold text-[#1c0700] truncate max-w-[90px]">{agent.promptTitle}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-orange-50 bg-orange-50/30 gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11px] text-amber-900/35">
          <CalendarDays className="w-3.5 h-3.5" />
          {created}
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => onChat(agent)}
            className="inline-flex items-center gap-1 h-[28px] px-3 rounded-lg text-[11px] font-bold border border-sky-100 text-sky-600 bg-sky-50 hover:bg-sky-100 cursor-pointer transition-colors">
            <MessageSquare className="w-3 h-3" /> Chat
          </button>
          <button onClick={() => onDuplicate(agent)}
            className="inline-flex items-center gap-1 h-[28px] px-3 rounded-lg text-[11px] font-bold border border-orange-100 text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            <Copy className="w-3 h-3" /> Copy
          </button>
          <button onClick={() => onView(agent.agentID)}
            className="inline-flex items-center gap-1 h-[28px] px-3 rounded-lg text-[11px] font-bold bg-gradient-to-r from-orange-400 to-orange-500 text-white border-none cursor-pointer hover:from-orange-500 hover:to-orange-600 transition-all shadow-[0_2px_8px_rgba(234,88,12,0.25)]">
            View
          </button>
          <button onClick={() => onDelete(agent)}
            className="inline-flex items-center gap-1 h-[28px] px-3 rounded-lg text-[11px] font-bold border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── trash card ───────────────────────────────────────────── */
function TrashCard({ agent, onRestore, onDelete }) {
  const deletedAt = agent.deleted_at ? new Date(agent.deleted_at) : null
  const daysRemaining = deletedAt
    ? Math.max(0, 30 - Math.floor((Date.now() - deletedAt.getTime()) / 86400000))
    : null

  return (
    <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
      <div className="flex items-start gap-4 px-5 pt-4 pb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-50 border border-red-100">
          <Bot className="w-5 h-5 text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-extrabold text-[#1c0700] truncate">{agent.agentName}</p>
          <p className="text-[11px] text-amber-900/35 font-mono mt-0.5 truncate">{agent.agentID}</p>
        </div>
        {daysRemaining !== null && (
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex-shrink-0 ${
            daysRemaining <= 3
              ? 'bg-red-50 border-red-100 text-red-600'
              : daysRemaining <= 7
                ? 'bg-amber-50 border-amber-100 text-amber-700'
                : 'bg-orange-50 border-orange-100 text-orange-600'
          }`}>{daysRemaining}d left</span>
        )}
      </div>
      <div className="flex gap-2 px-5 py-3 border-t border-red-50">
        <button onClick={() => onRestore(agent)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-[32px] rounded-xl text-[12px] font-bold border border-emerald-100 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 cursor-pointer transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Restore
        </button>
        <button onClick={() => onDelete(agent)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-[32px] rounded-xl text-[12px] font-bold border border-red-100 text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
          <Trash2 className="w-3.5 h-3.5" /> Delete Forever
        </button>
      </div>
    </div>
  )
}

/* ── create agent modal ───────────────────────────────────── */
/* ── agent form modal (create / duplicate / edit) ─────────── */
function AgentFormModal({ source, editData, onClose, onDone }) {
  const isEdit = !!editData

  const [name,       setName]       = useState(
    isEdit ? (editData.agent?.agentName ?? '') : (source?.agentName ? `Copy of ${source.agentName}` : '')
  )
  const [llmId,      setLlmId]      = useState(isEdit ? (editData.agent?.llmID    ?? '') : (source?.llmID    ?? ''))
  const [voiceId,    setVoiceId]    = useState(isEdit ? (editData.agent?.voiceID  ?? '') : (source?.voiceID  ?? ''))
  const [sttId,      setSttId]      = useState(isEdit ? (editData.agent?.sttID    ?? '') : (source?.sttID    ?? ''))
  const [promptId,   setPromptId]   = useState(isEdit ? (editData.agent?.promptID ?? '') : (source?.promptID ?? ''))
  const [categoryId, setCategoryId] = useState(isEdit ? (editData.agent?.categoryID ?? '') : '')

  const [llms,       setLlms]       = useState([])
  const [voices,     setVoices]     = useState([])
  const [stts,       setStts]       = useState([])
  const [prompts,    setPrompts]    = useState([])
  const [categories, setCategories] = useState([])
  const [listsLoading, setListsLoading] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    Promise.allSettled([
      getLLMs({ limit: 100 }),
      getVoices({ limit: 100 }),
      getSTTs({ limit: 100 }),
      getPrompts({ limit: 100 }),
      getCategories(),
    ]).then(([llmRes, voiceRes, sttRes, promptRes, catRes]) => {
      if (llmRes.status    === 'fulfilled') setLlms(llmRes.value?.items ?? [])
      if (voiceRes.status  === 'fulfilled') setVoices(voiceRes.value?.items ?? [])
      if (sttRes.status    === 'fulfilled') setStts(sttRes.value?.items ?? [])
      if (promptRes.status === 'fulfilled') setPrompts(promptRes.value?.items ?? [])
      if (catRes.status    === 'fulfilled') {
        const arr = Array.isArray(catRes.value) ? catRes.value : (catRes.value?.categories ?? catRes.value?.items ?? [])
        setCategories(arr)
      }
    }).finally(() => setListsLoading(false))
  }, [])

  const llmOptions      = llms.map(l      => ({ value: l.llmID,      label: l.modelName          }))
  const voiceOptions    = voices.map(v    => ({ value: v.voiceID,    label: v.purviewVoiceName    }))
  const sttOptions      = stts.map(s      => ({ value: s.sttID,      label: s.sttName             }))
  const promptOptions   = prompts.map(p   => ({ value: p.promptID,   label: p.title               }))
  const categoryOptions = categories.map(c => ({ value: c.categoryID, label: c.categoryName ?? c.categoryID }))

  const chips = source && !isEdit ? [
    { icon: Brain, label: 'LLM',    value: source.modelName        },
    { icon: Mic,   label: 'Voice',  value: source.purviewVoiceName },
    { icon: Cpu,   label: 'STT',    value: source.sttName          },
    { icon: Tag,   label: 'Prompt', value: source.promptTitle      },
  ].filter(c => c.value) : []

  const handleSubmit = async () => {
    if (!name.trim())   { setError('Agent name is required.');  return }
    if (!llmId)         { setError('Please select an LLM.');    return }
    if (!voiceId)       { setError('Please select a Voice.');   return }
    if (!sttId)         { setError('Please select an STT.');    return }
    if (!promptId)      { setError('Please select a Prompt.');  return }
    if (!categoryId)    { setError('Please select a Category.'); return }
    setLoading(true)
    setError('')
    try {
      const payload = {
        agentName:  name.trim(),
        llmID:      llmId,
        voiceID:    voiceId,
        sttID:      sttId,
        promptID:   promptId,
        categoryID: categoryId,
      }
      if (isEdit) {
        await updateAgent(editData.agent.agentID, payload)
      } else {
        await createAgent(payload)
      }
      onDone()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const title = isEdit ? 'Edit Agent' : source ? 'Duplicate Agent' : 'New Agent'
  const btnLabel = isEdit ? 'Save Changes' : source ? 'Duplicate' : 'Create Agent'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-[520px] bg-white rounded-2xl border border-orange-100 shadow-[0_24px_60px_rgba(234,88,12,0.15)] overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
              {isEdit ? <Edit3 className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </span>
            <p className="text-[15px] font-extrabold text-[#1c0700]">{title}</p>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-orange-100 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            <X className="w-3.5 h-3.5 text-amber-900/50" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto ss-scroll flex-1">
          {chips.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider mb-2">Copying from</p>
              <div className="flex flex-wrap gap-2">
                {chips.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-100 bg-orange-50/50">
                    <Icon className="w-3 h-3 text-orange-400 flex-shrink-0" />
                    <span className="text-[10px] font-semibold text-amber-900/40">{label}</span>
                    <span className="text-[11px] font-bold text-[#1c0700]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">Agent Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter agent name"
              className="w-full h-10 px-3 rounded-xl border border-orange-200 text-[13px] text-[#1c0700] outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder-amber-900/30"
            />
          </div>

          {listsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : (
            <>
              <div>
                <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">LLM Model</label>
                <SearchableSelect value={llmId} onChange={setLlmId} options={llmOptions} placeholder="Select LLM" searchable size="md" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">Voice</label>
                <SearchableSelect value={voiceId} onChange={setVoiceId} options={voiceOptions} placeholder="Select Voice" searchable size="md" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">STT Model</label>
                <SearchableSelect value={sttId} onChange={setSttId} options={sttOptions} placeholder="Select STT" searchable size="md" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">Prompt</label>
                <SearchableSelect value={promptId} onChange={setPromptId} options={promptOptions} placeholder="Select Prompt" searchable size="md" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">Category</label>
                <SearchableSelect value={categoryId} onChange={setCategoryId} options={categoryOptions} placeholder="Select Category" searchable size="md" />
              </div>
            </>
          )}

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 px-6 py-4 border-t border-orange-50 flex-shrink-0">
          <button onClick={onClose}
            className="flex-1 h-10 rounded-xl text-[13px] font-bold border border-orange-200 text-amber-900/60 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading || listsLoading}
            className="flex-1 h-10 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 4px 12px rgba(234,88,12,0.35)' }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEdit ? <Edit3 className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            {loading ? (isEdit ? 'Saving...' : 'Creating...') : btnLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── delete modal ─────────────────────────────────────────── */
function DeleteModal({ agent, permanent: initPermanent, onClose, onConfirm }) {
  const [mode,        setMode]        = useState(initPermanent ? 'permanent' : 'soft')
  const [confirmText, setConfirmText] = useState('')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')

  const canConfirm = mode === 'soft' || confirmText === agent.agentName

  const handleConfirm = async () => {
    setLoading(true)
    setError('')
    try {
      if (mode === 'soft') await deleteAgent(agent.agentID)
      else await permanentDeleteAgent(agent.agentID)
      onConfirm(mode)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-red-100 shadow-[0_24px_60px_rgba(220,38,38,0.12)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-50">
          <p className="text-[15px] font-extrabold text-[#1c0700]">Delete Agent</p>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-orange-100 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            <X className="w-3.5 h-3.5 text-amber-900/50" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-[13px] text-amber-900/70">
            You are about to delete <span className="font-bold text-[#1c0700]">{agent.agentName}</span>.
          </p>

          <div className="flex rounded-xl border border-orange-100 overflow-hidden">
            <button
              onClick={() => setMode('soft')}
              className={`flex-1 py-2.5 text-[12px] font-bold transition-colors border-none cursor-pointer ${
                mode === 'soft' ? 'bg-orange-50 text-orange-600' : 'bg-white text-amber-900/40 hover:bg-orange-50/50'
              }`}>
              Move to Trash
            </button>
            <button
              onClick={() => setMode('permanent')}
              className={`flex-1 py-2.5 text-[12px] font-bold transition-colors border-none cursor-pointer border-l border-orange-100 ${
                mode === 'permanent' ? 'bg-red-50 text-red-600' : 'bg-white text-amber-900/40 hover:bg-red-50/50'
              }`}>
              Delete Forever
            </button>
          </div>

          {mode === 'soft' && (
            <p className="text-[12px] text-amber-900/50 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
              This agent will be moved to the recycle bin and automatically deleted after 30 days.
            </p>
          )}

          {mode === 'permanent' && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-red-700">This action cannot be undone. The agent will be permanently deleted.</p>
              </div>
              <div>
                <p className="text-[12px] text-amber-900/60 mb-1.5">
                  Type <span className="font-bold text-[#1c0700]">{agent.agentName}</span> to confirm:
                </p>
                <input
                  value={confirmText}
                  onChange={e => setConfirmText(e.target.value)}
                  placeholder={agent.agentName}
                  className="w-full h-10 px-3 rounded-xl border border-red-200 text-[13px] text-[#1c0700] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder-red-200"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 px-6 pb-6">
          <button onClick={onClose}
            className="flex-1 h-10 rounded-xl text-[13px] font-bold border border-orange-200 text-amber-900/60 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={loading || !canConfirm}
            className={`flex-1 h-10 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
              mode === 'soft' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-red-500 hover:bg-red-600'
            }`}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {loading ? 'Deleting...' : (mode === 'soft' ? 'Move to Trash' : 'Delete Forever')}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── chat modal ───────────────────────────────────────────── */
function ChatModal({ agentId, agentName, onClose }) {
  const [messages,   setMessages]   = useState([])
  const [input,      setInput]      = useState('')
  const [convId,     setConvId]     = useState(null)
  const [streaming,  setStreaming]  = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || streaming) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setMessages(prev => [...prev, { role: 'agent', text: '', streaming: true }])
    setStreaming(true)

    await chatAgent(
      agentId, text, convId,
      delta => setMessages(prev => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (last?.role === 'agent') next[next.length - 1] = { ...last, text: last.text + delta }
        return next
      }),
      id => {
        setConvId(id)
        setMessages(prev => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'agent') next[next.length - 1] = { ...last, streaming: false }
          return next
        })
        setStreaming(false)
      },
      err => {
        setMessages(prev => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'agent') next[next.length - 1] = { ...last, text: err ?? 'Error', streaming: false, error: true }
          return next
        })
        setStreaming(false)
      }
    )
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4 sm:pb-0">
      <div className="w-full max-w-[500px] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.3)] flex flex-col"
        style={{ background: '#1a0800', maxHeight: '80vh' }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] flex-shrink-0">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
            <Bot className="w-4 h-4 text-white" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-extrabold text-white truncate">{agentName}</p>
            <p className="text-[10px] text-white/30">Test conversation</p>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-white/[0.12] hover:bg-white/10 cursor-pointer transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            <X className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto ss-scroll px-5 py-4 space-y-3 min-h-0">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-10">
              <MessageSquare className="w-8 h-8 text-orange-500/30" />
              <p className="text-[12px] text-white/25 text-center">Send a message to start the conversation</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-orange-500 text-white rounded-br-sm'
                    : msg.error
                      ? 'border border-red-500/20 text-red-400 rounded-bl-sm'
                      : 'text-white/80 rounded-bl-sm'
                }`}
                style={
                  msg.role === 'agent' && !msg.error
                    ? { background: 'rgba(255,255,255,0.07)' }
                    : msg.error
                      ? { background: 'rgba(220,38,38,0.15)' }
                      : {}
                }>
                {msg.streaming && !msg.text
                  ? <span className="inline-flex items-center gap-1 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400/70 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  : msg.text
                }
                {msg.streaming && msg.text && (
                  <span className="inline-block w-0.5 h-3.5 bg-orange-400 animate-pulse ml-0.5 align-middle" />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-end gap-2 px-5 py-4 border-t border-white/[0.08] flex-shrink-0">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-white/25 outline-none resize-none transition-all ss-scroll"
            style={{
              minHeight: '40px', maxHeight: '120px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          />
          <button onClick={send} disabled={streaming || !input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer transition-all flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 2px 8px rgba(234,88,12,0.4)' }}>
            {streaming
              ? <Loader2 className="w-4 h-4 text-white animate-spin" />
              : <Send className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── tab selector (3 tabs) ────────────────────────────────── */
const TABS = [
  { id: 'default', label: 'Default Agent',  sub: 'Core AI caller'  },
  { id: 'company', label: 'Company Agents', sub: 'Custom agents'   },
  { id: 'trash',   label: 'Recycle Bin',    sub: 'Deleted agents'  },
]

const CUT = 20

function TabSelector({ activeTab, onChange }) {
  return (
    <div className="flex items-stretch mb-7 h-[56px]"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.13))' }}>
      {TABS.map((tab, i) => {
        const isActive = activeTab === tab.id
        const isFirst  = i === 0
        const isLast   = i === TABS.length - 1
        const clipPath = isFirst
          ? `polygon(0 0, calc(100% - ${CUT}px) 0, 100% 100%, 0 100%)`
          : isLast
            ? `polygon(${CUT}px 0, 100% 0, 100% 100%, 0 100%)`
            : `polygon(${CUT}px 0, calc(100% - ${CUT}px) 0, 100% 100%, 0 100%)`

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex items-center gap-2.5 border-none cursor-pointer transition-colors duration-200 group h-full"
            style={{
              paddingLeft:  isFirst ? '22px' : `${22 + CUT}px`,
              paddingRight: isLast  ? '22px' : `${16 + CUT}px`,
              marginLeft:   i > 0   ? `-${CUT}px` : '0',
              zIndex:       isActive ? 10 : TABS.length - i,
              clipPath,
              background:   isActive ? 'linear-gradient(135deg, #1c0700 0%, #3d1206 100%)' : '#d6cdc7',
            }}
          >
            <Bot className={`w-[15px] h-[15px] flex-shrink-0 transition-colors ${
              isActive ? 'text-orange-400' : 'text-amber-800/60 group-hover:text-amber-800/80'
            }`} />
            <div>
              <p className={`text-[12px] font-extrabold uppercase tracking-[0.08em] leading-tight transition-colors ${
                isActive ? 'text-white' : 'text-[#6b4226] group-hover:text-amber-900/80'
              }`}>{tab.label}</p>
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

  const [agents,       setAgents]       = useState([])
  const [agentTotal,   setAgentTotal]   = useState(0)
  const [agentOffset,  setAgentOffset]  = useState(0)
  const [agentLoading, setAgentLoading] = useState(false)
  const [agentError,   setAgentError]   = useState('')

  const [trash,        setTrash]        = useState([])
  const [trashTotal,   setTrashTotal]   = useState(0)
  const [trashOffset,  setTrashOffset]  = useState(0)
  const [trashLoading, setTrashLoading] = useState(false)
  const [trashError,   setTrashError]   = useState('')
  const [trashOpError, setTrashOpError] = useState('')

  const [agentModal,  setAgentModal]  = useState(null)  // { source?, editData? }
  const [deleteModal, setDeleteModal] = useState(null)
  const [chatModal,   setChatModal]   = useState(null)

  const fetchAgents = (offset = 0) => {
    setAgentLoading(true)
    setAgentError('')
    getAgents({ offset, limit: LIMIT })
      .then(data => {
        setAgents(data?.items ?? [])
        setAgentTotal(data?.total ?? 0)
        setAgentOffset(offset)
      })
      .catch(e => setAgentError(e.message))
      .finally(() => setAgentLoading(false))
  }

  const fetchTrash = (offset = 0) => {
    setTrashLoading(true)
    setTrashError('')
    getTrashAgents({ offset, limit: LIMIT })
      .then(data => {
        setTrash(data?.items ?? [])
        setTrashTotal(data?.total ?? 0)
        setTrashOffset(offset)
      })
      .catch(e => setTrashError(e.message))
      .finally(() => setTrashLoading(false))
  }

  useEffect(() => {
    if (activeTab === 'company') fetchAgents(0)
  }, [activeTab])

  useEffect(() => {
    if (activeTab === 'trash') fetchTrash(0)
  }, [activeTab])

  const handleTabChange = id => {
    setActiveTab(id)
    setViewingAgent(null)
    setTrashOpError('')
  }

  const handleAgentDone = () => {
    setAgentModal(null)
    fetchAgents(0)
    setActiveTab('company')
    setViewingAgent(null)
  }

  const handleDeleteDone = mode => {
    setDeleteModal(null)
    setViewingAgent(null)
    fetchAgents(agentOffset)
    if (mode === 'soft' || activeTab === 'trash') fetchTrash(0)
  }

  const handleRestore = async agent => {
    setTrashOpError('')
    try {
      await restoreAgent(agent.agentID)
      fetchTrash(trashOffset)
      fetchAgents(0)
    } catch (e) {
      setTrashOpError(e.message)
    }
  }

  const totalAgentPages = Math.ceil(agentTotal / LIMIT)
  const currentAgentPage = Math.floor(agentOffset / LIMIT) + 1
  const totalTrashPages  = Math.ceil(trashTotal / LIMIT)
  const currentTrashPage = Math.floor(trashOffset / LIMIT) + 1

  return (
    <div className="p-6 max-w-[1100px] mx-auto overflow-x-hidden">

      {!viewingAgent && (
        <div className="mb-5">
          <p className="text-[13px] text-amber-900/40">Manage and view your AI calling agents</p>
        </div>
      )}

      {!viewingAgent && (
        <TabSelector activeTab={activeTab} onChange={handleTabChange} />
      )}

      {/* default agent tab */}
      {activeTab === 'default' && (
        viewingAgent
          ? <AgentDetail
              agentId={viewingAgent}
              onBack={() => setViewingAgent(null)}
              onDuplicate={agent => setAgentModal({ source: agent })}
            />
          : <div className="max-w-[520px]">
              <AgentCard
                agentId={AGENT_IDS.default}
                onView={id => setViewingAgent(id)}
                onDuplicate={agent => setAgentModal({ source: agent })}
              />
            </div>
      )}

      {/* company agents tab */}
      {activeTab === 'company' && (
        viewingAgent
          ? <AgentDetail
              agentId={viewingAgent}
              onBack={() => setViewingAgent(null)}
              onEdit={data => setAgentModal({ editData: data })}
              onDuplicate={agent => setAgentModal({ source: agent })}
              onDelete={agent => setDeleteModal({ agent, permanent: false })}
            />
          : <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] text-amber-900/40">
                  {agentTotal > 0 ? `${agentTotal} agent${agentTotal !== 1 ? 's' : ''}` : ''}
                </p>
                <button
                  onClick={() => setAgentModal({ source: null })}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 4px 12px rgba(234,88,12,0.35)' }}>
                  <Plus className="w-4 h-4" /> New Agent
                </button>
              </div>

              {agentLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-orange-100 p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-11 h-11 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                      <Skeleton className="h-14 w-full" />
                      <Skeleton className="h-8 w-full rounded-xl" />
                    </div>
                  ))}
                </div>
              )}

              {agentError && (
                <div className="flex items-center gap-2 text-red-500 py-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-[13px] font-semibold">{agentError}</p>
                </div>
              )}

              {!agentLoading && !agentError && agents.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-amber-900/30">
                  <Bot className="w-10 h-10" />
                  <p className="text-[14px] font-semibold">No company agents yet</p>
                  <p className="text-[12px]">Create a new agent or duplicate the default agent</p>
                </div>
              )}

              {!agentLoading && agents.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agents.map(agent => (
                    <AgentListCard
                      key={agent.agentID}
                      agent={agent}
                      onView={id => setViewingAgent(id)}
                      onDuplicate={a => setAgentModal({ source: a })}
                      onDelete={a => setDeleteModal({ agent: a, permanent: false })}
                      onChat={a => setChatModal({ agentId: a.agentID, agentName: a.agentName })}
                    />
                  ))}
                </div>
              )}

              {!agentLoading && totalAgentPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => fetchAgents(agentOffset - LIMIT)}
                    disabled={currentAgentPage === 1}
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-orange-200 bg-orange-50 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
                    <ChevronLeft className="w-4 h-4 text-orange-600" />
                  </button>
                  <span className="text-[12px] font-semibold text-amber-900/50">{currentAgentPage} / {totalAgentPages}</span>
                  <button
                    onClick={() => fetchAgents(agentOffset + LIMIT)}
                    disabled={currentAgentPage === totalAgentPages}
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-orange-200 bg-orange-50 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
                    <ChevronRight className="w-4 h-4 text-orange-600" />
                  </button>
                </div>
              )}
            </div>
      )}

      {/* recycle bin tab */}
      {activeTab === 'trash' && (
        <div className="space-y-5">
          {trashOpError && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{trashOpError}</p>
            </div>
          )}

          {trashLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-red-100 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <div className="flex-1 space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-3 w-36" /></div>
                  </div>
                  <Skeleton className="h-8 w-full rounded-xl" />
                </div>
              ))}
            </div>
          )}

          {trashError && (
            <div className="flex items-center gap-2 text-red-500 py-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-[13px] font-semibold">{trashError}</p>
            </div>
          )}

          {!trashLoading && !trashError && trash.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-amber-900/30">
              <Trash2 className="w-10 h-10" />
              <p className="text-[14px] font-semibold">Recycle bin is empty</p>
              <p className="text-[12px]">Deleted agents appear here for 30 days before permanent removal</p>
            </div>
          )}

          {!trashLoading && trash.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trash.map(agent => (
                <TrashCard
                  key={agent.agentID}
                  agent={agent}
                  onRestore={handleRestore}
                  onDelete={a => setDeleteModal({ agent: a, permanent: true })}
                />
              ))}
            </div>
          )}

          {!trashLoading && totalTrashPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => fetchTrash(trashOffset - LIMIT)}
                disabled={currentTrashPage === 1}
                className="w-8 h-8 rounded-xl flex items-center justify-center border border-orange-200 bg-orange-50 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
                <ChevronLeft className="w-4 h-4 text-orange-600" />
              </button>
              <span className="text-[12px] font-semibold text-amber-900/50">{currentTrashPage} / {totalTrashPages}</span>
              <button
                onClick={() => fetchTrash(trashOffset + LIMIT)}
                disabled={currentTrashPage === totalTrashPages}
                className="w-8 h-8 rounded-xl flex items-center justify-center border border-orange-200 bg-orange-50 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
                <ChevronRight className="w-4 h-4 text-orange-600" />
              </button>
            </div>
          )}
        </div>
      )}

      {agentModal && (
        <AgentFormModal
          source={agentModal.source}
          editData={agentModal.editData}
          onClose={() => setAgentModal(null)}
          onDone={handleAgentDone}
        />
      )}

      {deleteModal && (
        <DeleteModal
          agent={deleteModal.agent}
          permanent={deleteModal.permanent}
          onClose={() => setDeleteModal(null)}
          onConfirm={handleDeleteDone}
        />
      )}

      {chatModal && (
        <ChatModal
          agentId={chatModal.agentId}
          agentName={chatModal.agentName}
          onClose={() => setChatModal(null)}
        />
      )}
    </div>
  )
}
