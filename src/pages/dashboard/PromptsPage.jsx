import { useState, useEffect } from 'react'
import {
  FileText, Search, Plus, Trash2, Edit3, Copy,
  AlertCircle, Loader2, CalendarDays,
  ArrowLeft, Save, X, ChevronLeft, ChevronRight,
} from 'lucide-react'
import {
  getPrompts, getDefaultPrompts, createPrompt, updatePrompt, deletePrompt,
} from '../../apiservices/promptService'

const LIMIT = 8
const CUT = 20

function detectVars(text) {
  const matches = [...(text ?? '').matchAll(/\{\{(\w+)\}\}/g)]
  return [...new Set(matches.map(m => m[1]))]
}

/* ── skeleton ─────────────────────────────────────────────── */
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-orange-100 rounded-lg ${className}`} />
}

/* ── tab selector (parallelogram) ────────────────────────── */
const TABS = [
  { id: 'default', label: 'Default Prompts' },
  { id: 'company', label: 'Company Prompts' },
]

function TabSelector({ active, onChange }) {
  return (
    <div className="flex items-end gap-0 mb-6" style={{ marginBottom: 0 }}>
      {TABS.map((tab, i) => {
        const isFirst = i === 0
        const isLast  = i === TABS.length - 1
        const isActive = active === tab.id
        const clipPath = isFirst
          ? `polygon(0 0, calc(100% - ${CUT}px) 0, 100% 100%, 0 100%)`
          : isLast
            ? `polygon(${CUT}px 0, 100% 0, 100% 100%, 0 100%)`
            : `polygon(${CUT}px 0, calc(100% - ${CUT}px) 0, 100% 100%, 0 100%)`
        const marginLeft = i === 0 ? 0 : -CUT + 2

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              clipPath,
              marginLeft,
              paddingLeft: isFirst ? 16 : CUT + 8,
              paddingRight: isLast ? 16 : CUT + 8,
              background: isActive
                ? 'linear-gradient(135deg, #ea580c, #c2410c)'
                : 'rgba(255,255,255,0.7)',
              boxShadow: isActive ? '0 4px 12px rgba(234,88,12,0.3)' : 'none',
            }}
            className={`relative h-10 text-[13px] font-bold transition-all duration-200 border-none cursor-pointer flex-shrink-0
              ${isActive ? 'text-white' : 'text-amber-900/50 hover:text-amber-900/80 hover:bg-white'}`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── variable chips (on list card) ───────────────────────── */
function VarChips({ variables }) {
  const keys = Object.keys(variables ?? {})
  if (keys.length === 0) return null
  const shown = keys.slice(0, 3)
  const extra = keys.length - 3
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {shown.map(k => (
        <span key={k} className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-100 text-[10px] font-bold text-orange-500 font-mono">
          {`{{${k}}}`}
        </span>
      ))}
      {extra > 0 && (
        <span className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-100 text-[10px] font-semibold text-amber-900/40">
          +{extra} more
        </span>
      )}
    </div>
  )
}

/* ── prompt list card ─────────────────────────────────────── */
function PromptCard({ prompt, onView, onDelete, onDuplicate }) {
  const modified = prompt.last_modified_at
    ? new Date(prompt.last_modified_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '-'

  const preview = (prompt.promptText ?? '').slice(0, 160).trimEnd()
  const hasMore = (prompt.promptText ?? '').length > 160

  return (
    <div className="bg-white rounded-2xl border border-orange-100 hover:border-orange-200 hover:shadow-[0_4px_20px_rgba(234,88,12,0.08)] transition-all duration-200 overflow-hidden flex flex-col">
      <div className="flex items-start gap-4 px-5 pt-5 pb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-extrabold text-[#1c0700] leading-snug line-clamp-2">{prompt.title}</p>
          <p className="text-[10px] font-mono text-amber-900/35 mt-0.5 truncate">{prompt.promptID}</p>
        </div>
      </div>

      <div className="px-5 pb-3 flex-1">
        <VarChips variables={prompt.variables} />
        {preview && (
          <p className="mt-3 text-[12px] text-amber-900/50 leading-relaxed line-clamp-3 font-mono">
            {preview}{hasMore ? '...' : ''}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-orange-50 bg-orange-50/30 gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-amber-900/35">
          <CalendarDays className="w-3.5 h-3.5" />
          {modified}
        </div>
        <div className="flex items-center gap-1.5">
          {onDuplicate && (
            <button
              onClick={() => onDuplicate(prompt)}
              className="inline-flex items-center gap-1 h-[28px] px-3 rounded-lg text-[11px] font-bold border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
              <Copy className="w-3 h-3" /> Duplicate
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(prompt)}
              className="inline-flex items-center gap-1 h-[28px] px-3 rounded-lg text-[11px] font-bold border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
              <Trash2 className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => onView(prompt)}
            className="inline-flex items-center gap-1.5 h-[28px] px-4 rounded-lg text-[11px] font-bold bg-gradient-to-r from-orange-400 to-orange-500 text-white border-none cursor-pointer hover:from-orange-500 hover:to-orange-600 transition-all shadow-[0_2px_8px_rgba(234,88,12,0.25)]">
            View
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── variables editor ─────────────────────────────────────── */
function VariablesEditor({ vars, onChange }) {
  const update = (i, val) =>
    onChange(vars.map((v, idx) => idx === i ? { ...v, value: val } : v))

  return (
    <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-orange-50">
        <p className="text-[13px] font-bold text-[#1c0700]">Variables</p>
        <span className="text-[11px] font-semibold text-amber-900/40">{vars.length} detected</span>
      </div>
      <div className="p-4 space-y-3 max-h-[480px] overflow-y-auto ss-scroll">
        {vars.length === 0 && (
          <p className="text-[12px] text-amber-900/30 text-center py-6 leading-relaxed">
            Use {`{{variable_name}}`} in your prompt<br />and they will appear here automatically.
          </p>
        )}
        {vars.map((v, i) => (
          <div key={v.key} className="space-y-1">
            <p className="text-[11px] font-bold font-mono text-orange-500 px-1">{`{{${v.key}}}`}</p>
            <textarea
              value={v.value}
              onChange={e => update(i, e.target.value)}
              placeholder="Default value"
              rows={2}
              className="w-full px-2.5 py-1.5 rounded-lg border border-orange-100 text-[12px] text-amber-900/70 outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-100 transition-all placeholder-amber-900/25 resize-none bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── prompt form (create / edit) ──────────────────────────── */
function PromptForm({ initial, onSave, onCancel, saving, error }) {
  const [title,      setTitle]      = useState(initial?.title      ?? '')
  const [initialSay, setInitialSay] = useState(initial?.initialSay ?? '')
  const [promptText, setPromptText] = useState(initial?.promptText  ?? '')
  const [vars, setVars] = useState(
    initial?.variables
      ? Object.entries(initial.variables).map(([key, value]) => ({ key, value: String(value) }))
      : []
  )
  const [titleError, setTitleError] = useState('')

  useEffect(() => {
    const detected = detectVars(initialSay + ' ' + promptText)
    setVars(prev => {
      const existingMap = Object.fromEntries(prev.map(v => [v.key, v.value]))
      return detected.map(key => ({ key, value: existingMap[key] ?? '' }))
    })
  }, [initialSay, promptText])

  const handleSave = () => {
    if (!title.trim()) { setTitleError('Title is required.'); return }
    setTitleError('')
    const variables = Object.fromEntries(
      vars.filter(v => v.key.trim()).map(v => [v.key.trim(), v.value])
    )
    onSave({ title: title.trim(), initialSay, promptText, variables })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <button onClick={onCancel}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-amber-900/50 hover:text-orange-500 bg-transparent border-none cursor-pointer p-0 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {initial ? 'Back to prompt' : 'Back to list'}
        </button>
        <div className="flex items-center gap-2">
          <button onClick={onCancel}
            className="h-9 px-4 rounded-xl text-[13px] font-bold border border-orange-200 text-amber-900/60 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="h-9 px-5 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 4px 12px rgba(234,88,12,0.35)' }}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : (initial?.promptID ? 'Update Prompt' : 'Create Prompt')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-orange-50">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
            <FileText className="w-4 h-4 text-white" />
          </span>
          <p className="text-[15px] font-extrabold text-[#1c0700]">
            {initial?.promptID ? 'Edit Prompt' : 'New Prompt'}
          </p>
          {initial?._duplicatedFrom && (
            <span className="ml-auto text-[11px] text-amber-900/40 flex items-center gap-1">
              <Copy className="w-3 h-3" /> Duplicated from default
            </span>
          )}
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">Prompt Title</label>
            <input
              value={title}
              onChange={e => { setTitle(e.target.value); setTitleError('') }}
              placeholder="e.g. Real Estate Lead Qualification"
              className={`w-full h-10 px-3 rounded-xl border text-[13px] text-[#1c0700] outline-none transition-all placeholder-amber-900/30 ${
                titleError ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' : 'border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
              }`}
            />
            {titleError && <p className="text-[11px] text-red-500 mt-1">{titleError}</p>}
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1c0700] mb-1.5">Opening Line</label>
            <input
              value={initialSay}
              onChange={e => setInitialSay(e.target.value)}
              placeholder='e.g. Hello {{name}}, welcome to Purview!'
              className="w-full h-10 px-3 rounded-xl border border-orange-200 text-[13px] text-[#1c0700] outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder-amber-900/30"
            />
            <p className="text-[11px] text-amber-900/40 mt-1">The first thing the agent says when a call begins</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
        <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-orange-50 gap-3 flex-wrap">
            <p className="text-[13px] font-bold text-[#1c0700]">Prompt Text</p>
            <p className="text-[11px] text-amber-900/40">
              Type <span className="font-bold font-mono text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-md border border-orange-100">{`{{variable_name}}`}</span> to add dynamic variables
            </p>
          </div>
          <div className="p-5">
            <textarea
              value={promptText}
              onChange={e => setPromptText(e.target.value)}
              placeholder="Write your agent prompt here. Use {{variable_name}} for dynamic values..."
              className="w-full h-[520px] text-[12px] font-mono leading-relaxed text-amber-900/80 bg-orange-50/20 border border-orange-100 rounded-xl p-4 resize-none outline-none focus:border-orange-300 focus:bg-white transition-all ss-scroll"
            />
          </div>
        </div>

        <VariablesEditor vars={vars} onChange={setVars} />
      </div>

      {error && (
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-[12px] text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}

/* ── prompt detail (read-only view) ──────────────────────── */
function PromptDetail({ prompt, onBack, onEdit, onDelete, onDuplicate }) {
  const modified = prompt.last_modified_at
    ? new Date(prompt.last_modified_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '-'

  const vars = Object.entries(prompt.variables ?? {})

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-amber-900/50 hover:text-orange-500 bg-transparent border-none cursor-pointer p-0 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          {onDuplicate && (
            <button onClick={onDuplicate}
              className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
              <Copy className="w-3.5 h-3.5" /> Duplicate
            </button>
          )}
          {onEdit && (
            <button onClick={onEdit}
              className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete}
              className="inline-flex items-center gap-1.5 h-[30px] px-4 rounded-lg text-[12px] font-bold border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-orange-100 px-5 py-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[17px] font-extrabold text-[#1c0700] leading-tight">{prompt.title}</p>
          <p className="text-[11px] font-mono text-amber-900/35 mt-0.5">{prompt.promptID}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-900/35 flex-shrink-0">
          <CalendarDays className="w-3.5 h-3.5" />
          {modified}
        </div>
      </div>

      {prompt.initialSay && (
        <div className="bg-white rounded-2xl border border-orange-100 px-5 py-4">
          <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider mb-2">Opening Line</p>
          <div className="flex items-start gap-2 px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
            <p className="text-[13px] text-amber-900/70 italic leading-relaxed">{prompt.initialSay}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
        <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-orange-50">
            <p className="text-[13px] font-bold text-[#1c0700]">Prompt Text</p>
          </div>
          <div className="p-5">
            <pre className="text-[12px] font-mono text-amber-900/70 leading-relaxed whitespace-pre-wrap break-words bg-orange-50/40 border border-orange-100 rounded-xl p-4 h-[520px] overflow-y-auto ss-scroll">
              {prompt.promptText}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-orange-50">
            <p className="text-[13px] font-bold text-[#1c0700]">Variables</p>
            <span className="text-[11px] font-bold text-amber-900/40">{vars.length}</span>
          </div>
          <div className="divide-y divide-orange-50 max-h-[520px] overflow-y-auto ss-scroll">
            {vars.length === 0 && (
              <p className="text-[12px] text-amber-900/30 text-center py-8">No variables defined</p>
            )}
            {vars.map(([key, value]) => (
              <div key={key} className="px-5 py-3.5">
                <p className="text-[11px] font-bold text-orange-500 font-mono mb-1">{`{{${key}}}`}</p>
                <p className="text-[12px] text-amber-900/60 leading-relaxed break-words">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── delete confirmation modal ────────────────────────────── */
function DeleteDialog({ promptTitle, loading, error, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl border border-red-100 shadow-[0_24px_60px_rgba(220,38,38,0.12)] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-50">
          <p className="text-[15px] font-extrabold text-[#1c0700]">Delete Prompt</p>
          <button onClick={onCancel}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-orange-100 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            <X className="w-3.5 h-3.5 text-amber-900/50" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-[13px] text-amber-900/70">
            Delete <span className="font-bold text-[#1c0700]">{promptTitle}</span>? This cannot be undone.
          </p>
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 px-6 pb-6">
          <button onClick={onCancel}
            className="flex-1 h-10 rounded-xl text-[13px] font-bold border border-orange-200 text-amber-900/60 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 h-10 rounded-xl text-[13px] font-bold text-white bg-red-500 hover:bg-red-600 border-none cursor-pointer transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── loading skeleton grid ────────────────────────────────── */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-orange-100 p-5 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-8 w-full rounded-xl" />
        </div>
      ))}
    </div>
  )
}

/* ── main page ────────────────────────────────────────────── */
export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState('default')

  /* ── company prompts state ── */
  const [mode,     setMode]     = useState('list')
  const [selected, setSelected] = useState(null)
  const [prompts,  setPrompts]  = useState([])
  const [total,    setTotal]    = useState(0)
  const [offset,   setOffset]   = useState(0)
  const [search,   setSearch]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [listError, setListError] = useState('')
  const [saving,    setSaving]    = useState(false)
  const [saveError, setSaveError] = useState('')
  const [deleteTarget,  setDeleteTarget]  = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError,   setDeleteError]   = useState('')

  /* ── default prompts state ── */
  const [defPrompts,  setDefPrompts]  = useState([])
  const [defLoading,  setDefLoading]  = useState(false)
  const [defError,    setDefError]    = useState('')
  const [defSelected, setDefSelected] = useState(null)
  const [defMode,     setDefMode]     = useState('list')

  /* ── fetch company prompts ── */
  const fetchPrompts = (off = 0, q = search) => {
    setLoading(true)
    setListError('')
    getPrompts({ offset: off, limit: LIMIT, search: q || undefined })
      .then(data => {
        setPrompts(data?.items ?? [])
        setTotal(data?.total ?? 0)
        setOffset(off)
      })
      .catch(e => setListError(e.message))
      .finally(() => setLoading(false))
  }

  const DEFAULT_PROMPT_IDS = ['PROMPT_8B1F8E4DF931', 'PROMPT_3748C2C0A41B']

  /* ── fetch default prompts, filter to real-estate only ── */
  const fetchDefaultPrompts = () => {
    setDefLoading(true)
    setDefError('')
    getDefaultPrompts({ offset: 0, limit: 50 })
      .then(data => {
        const all = data?.items ?? []
        setDefPrompts(all.filter(p => DEFAULT_PROMPT_IDS.includes(p.promptID)))
      })
      .catch(e => setDefError(e.message))
      .finally(() => setDefLoading(false))
  }

  useEffect(() => { fetchPrompts(0, '') }, [])
  useEffect(() => { fetchDefaultPrompts() }, [])

  useEffect(() => {
    const t = setTimeout(() => fetchPrompts(0, search), 400)
    return () => clearTimeout(t)
  }, [search])

  /* ── duplicate default prompt into company create form ── */
  const handleDuplicate = (prompt) => {
    setSaveError('')
    setSelected({
      title: `Copy of ${prompt.title}`,
      initialSay: prompt.initialSay ?? '',
      promptText: prompt.promptText ?? '',
      variables: prompt.variables ?? {},
      _duplicatedFrom: prompt.promptID,
    })
    setMode('create')
    setActiveTab('company')
  }

  /* ── company save ── */
  const handleSave = async (data) => {
    setSaving(true)
    setSaveError('')
    try {
      if (mode === 'create') {
        await createPrompt(data)
      } else {
        await updatePrompt(selected.promptID, data)
      }
      setSaving(false)
      setMode('list')
      fetchPrompts(0)
    } catch (e) {
      setSaveError(e.message)
      setSaving(false)
    }
  }

  /* ── company delete ── */
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true)
    setDeleteError('')
    try {
      await deletePrompt(deleteTarget.promptID)
      setDeleteTarget(null)
      if (mode === 'view') setMode('list')
      fetchPrompts(offset)
    } catch (e) {
      setDeleteError(e.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  const totalPages  = Math.ceil(total / LIMIT)
  const currentPage = Math.floor(offset / LIMIT) + 1

  const inDetailMode = (activeTab === 'company' && mode !== 'list') || (activeTab === 'default' && defMode !== 'list')

  return (
    <div className="p-6 max-w-[1100px] mx-auto overflow-x-hidden">

      {/* subtitle */}
      {!inDetailMode && (
        <p className="text-[13px] text-amber-900/40 mb-5">Create and manage AI agent prompts</p>
      )}

      {/* tabs - hidden when in detail/edit/create view */}
      {!inDetailMode && (
        <TabSelector active={activeTab} onChange={tab => {
          setActiveTab(tab)
          setMode('list')
          setDefMode('list')
        }} />
      )}

      {/* ─────────────────── DEFAULT TAB ─────────────────── */}
      {activeTab === 'default' && (
        <div className={defMode === 'list' ? 'bg-white/60 rounded-b-2xl rounded-tr-2xl border border-orange-100 p-5' : ''}>

          {/* default prompts grid (no search, no pagination) */}
          {defMode === 'list' && (
            <div className="space-y-4">
              {defLoading && <SkeletonGrid />}

              {!defLoading && defError && (
                <div className="flex items-center gap-2 text-red-500 py-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-[13px] font-semibold">{defError}</p>
                </div>
              )}

              {!defLoading && !defError && defPrompts.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-amber-900/30">
                  <FileText className="w-10 h-10" />
                  <p className="text-[14px] font-semibold">No default prompts available</p>
                </div>
              )}

              {!defLoading && defPrompts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {defPrompts.map(p => (
                    <PromptCard
                      key={p.promptID}
                      prompt={p}
                      onView={() => { setDefSelected(p); setDefMode('view') }}
                      onDuplicate={() => handleDuplicate(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* default detail view */}
          {defMode === 'view' && defSelected && (
            <PromptDetail
              prompt={defSelected}
              onBack={() => setDefMode('list')}
              onDuplicate={() => handleDuplicate(defSelected)}
            />
          )}
        </div>
      )}

      {/* ─────────────────── COMPANY TAB ─────────────────── */}
      {activeTab === 'company' && (
        <div className={mode === 'list' ? 'bg-white/60 rounded-b-2xl rounded-tr-2xl border border-orange-100 p-5' : ''}>

          {/* company list */}
          {mode === 'list' && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative max-w-[400px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-900/30 pointer-events-none" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search prompts..."
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-orange-200 text-[13px] text-[#1c0700] outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder-amber-900/30 bg-white"
                  />
                </div>
                <button
                  onClick={() => { setSaveError(''); setSelected(null); setMode('create') }}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 4px 12px rgba(234,88,12,0.35)' }}>
                  <Plus className="w-4 h-4" /> New Prompt
                </button>
              </div>

              {!loading && total > 0 && (
                <p className="text-[12px] text-amber-900/40">{total} prompt{total !== 1 ? 's' : ''}</p>
              )}

              {loading && <SkeletonGrid />}

              {!loading && listError && (
                <div className="flex items-center gap-2 text-red-500 py-4">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-[13px] font-semibold">{listError}</p>
                </div>
              )}

              {!loading && !listError && prompts.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-amber-900/30">
                  <FileText className="w-10 h-10" />
                  <p className="text-[14px] font-semibold">
                    {search ? 'No prompts match your search' : 'No prompts yet'}
                  </p>
                  {!search && <p className="text-[12px]">Create your first prompt to get started</p>}
                </div>
              )}

              {!loading && prompts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prompts.map(p => (
                    <PromptCard
                      key={p.promptID}
                      prompt={p}
                      onView={p => { setSelected(p); setMode('view') }}
                      onDelete={p => { setDeleteError(''); setDeleteTarget(p) }}
                    />
                  ))}
                </div>
              )}

              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => fetchPrompts(offset - LIMIT)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-orange-200 bg-orange-50 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
                    <ChevronLeft className="w-4 h-4 text-orange-600" />
                  </button>
                  <span className="text-[12px] font-semibold text-amber-900/50">{currentPage} / {totalPages}</span>
                  <button
                    onClick={() => fetchPrompts(offset + LIMIT)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-orange-200 bg-orange-50 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
                    <ChevronRight className="w-4 h-4 text-orange-600" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* company view */}
          {mode === 'view' && selected && (
            <PromptDetail
              prompt={selected}
              onBack={() => setMode('list')}
              onEdit={() => { setSaveError(''); setMode('edit') }}
              onDelete={() => { setDeleteError(''); setDeleteTarget(selected) }}
            />
          )}

          {/* company edit / create */}
          {(mode === 'edit' || mode === 'create') && (
            <PromptForm
              initial={mode === 'edit' ? selected : selected}
              onSave={handleSave}
              onCancel={() => {
                if (mode === 'edit') { setMode('view') }
                else { setSelected(null); setMode('list') }
              }}
              saving={saving}
              error={saveError}
            />
          )}
        </div>
      )}

      {deleteTarget && (
        <DeleteDialog
          promptTitle={deleteTarget.title}
          loading={deleteLoading}
          error={deleteError}
          onConfirm={handleDeleteConfirm}
          onCancel={() => { setDeleteTarget(null); setDeleteError('') }}
        />
      )}
    </div>
  )
}
