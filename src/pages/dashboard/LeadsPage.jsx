import { useState, useEffect, useRef } from 'react'
import {
  Users, Plus, Pencil, Trash2, X, AlertTriangle, Tag, Loader2,
  ArrowLeft, Search, Upload, Download, Phone, User, FileSpreadsheet,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import SearchableSelect from '../../components/common/SearchableSelect'
import {
  searchCategories, createCategory, updateCategory, deleteCategory,
} from '../../apiservices/categoriesService'
import {
  getContacts, createContact, updateContact, deleteContact,
  searchContacts, getCountryCodes, downloadTemplate, uploadContacts,
} from '../../apiservices/contactsService'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PAGE_SIZE = 10

const CATEGORY_COLORS = [
  '#ea580c', '#f97316', '#fb923c', '#c2410c',
  '#d97706', '#b45309', '#92400e', '#78350f',
]

function colorFor(id) {
  const seed = (id ?? '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return CATEGORY_COLORS[seed % CATEGORY_COLORS.length]
}

// ---------------------------------------------------------------------------
// Shared UI primitives
// ---------------------------------------------------------------------------

function SkeletonCard() {
  return <div className="animate-pulse bg-orange-100 rounded-2xl h-[140px]" />
}

function SkeletonRow() {
  return (
    <tr className="border-b border-orange-50">
      {[1, 2, 3, 4].map(i => (
        <td key={i} className="px-4 py-3">
          <div className="animate-pulse bg-orange-100 rounded h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

function Modal({ onClose, children, maxWidth = 'max-w-md' }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} overflow-hidden`}>
        {children}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Category modals (unchanged)
// ---------------------------------------------------------------------------

function CategoryFormModal({ mode, form, setForm, formError, saving, onClose, onSave }) {
  const isEdit = mode === 'edit'
  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
        <h3 className="text-[15px] font-extrabold text-[#1c0700]">
          {isEdit ? 'Edit Category' : 'New Category'}
        </h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-900/40 hover:text-orange-500 hover:bg-orange-50 border-none cursor-pointer transition-colors bg-transparent"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 py-5 space-y-4">
        {formError && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[12px] font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            {formError}
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold text-amber-900/50 uppercase tracking-wider mb-1.5">
            Category Name
          </label>
          <input
            type="text"
            value={form.categoryName}
            onChange={e => setForm(f => ({ ...f, categoryName: e.target.value }))}
            placeholder="e.g. Hot Leads"
            className="w-full px-3 py-2.5 rounded-xl border border-orange-100 bg-orange-50/30 text-[13px] font-semibold text-[#1c0700] placeholder:text-amber-900/25 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-amber-900/50 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Brief description of this category..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-orange-100 bg-orange-50/30 text-[13px] text-[#1c0700] placeholder:text-amber-900/25 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-orange-50">
        <button
          onClick={onClose}
          className="h-9 px-4 rounded-xl text-[13px] font-semibold text-amber-900/50 hover:text-[#1c0700] hover:bg-orange-50 border border-orange-100 bg-white cursor-pointer transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="h-9 px-5 rounded-xl text-[13px] font-bold text-white cursor-pointer border-none transition-all disabled:opacity-60 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Modal>
  )
}

function CategoryDeleteModal({ category, saving, onClose, onConfirm }) {
  const [typed, setTyped] = useState('')
  const confirmed = typed === category?.categoryName

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-red-100">
        <h3 className="text-[15px] font-extrabold text-[#1c0700]">Delete Category</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-900/40 hover:text-red-500 hover:bg-red-50 border-none cursor-pointer transition-colors bg-transparent"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 py-5 space-y-4">
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-[12px] font-semibold text-red-700 leading-relaxed">
            This will permanently delete the category AND all contacts within it. This action cannot be undone.
          </p>
        </div>

        <div>
          <p className="text-[12px] text-amber-900/55 mb-2">
            Type <span className="font-bold text-[#1c0700]">{category?.categoryName}</span> to confirm deletion.
          </p>
          <input
            type="text"
            value={typed}
            onChange={e => setTyped(e.target.value)}
            placeholder={category?.categoryName}
            className="w-full px-3 py-2.5 rounded-xl border text-[13px] font-semibold text-[#1c0700] placeholder:text-amber-900/20 focus:outline-none transition-all"
            style={{
              borderColor: typed.length > 0 ? (confirmed ? '#10b981' : '#f87171') : undefined,
              background: typed.length > 0 ? (confirmed ? 'rgba(16,185,129,0.04)' : 'rgba(248,113,113,0.04)') : 'rgba(255,247,237,0.5)',
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-orange-50">
        <button
          onClick={onClose}
          className="h-9 px-4 rounded-xl text-[13px] font-semibold text-amber-900/50 hover:text-[#1c0700] hover:bg-orange-50 border border-orange-100 bg-white cursor-pointer transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={!confirmed || saving}
          className="h-9 px-5 rounded-xl text-[13px] font-bold text-white cursor-pointer border-none transition-all flex items-center gap-2"
          style={{
            background: confirmed ? '#ef4444' : '#fca5a5',
            cursor: confirmed && !saving ? 'pointer' : 'not-allowed',
          }}
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saving ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  )
}

function CategoryCard({ cat, onEdit, onDelete, onClick }) {
  return (
    <div
      onClick={() => onClick(cat)}
      className="bg-white rounded-2xl border border-orange-100 hover:shadow-[0_4px_20px_rgba(234,88,12,0.08)] hover:border-orange-200 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="flex items-start gap-3 px-5 pt-5 pb-3 flex-1">
        <span
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
          style={{ background: colorFor(cat.categoryID) }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-extrabold text-[#1c0700] leading-snug">{cat.categoryName}</h3>
          {cat.description ? (
            <p className="text-[12px] text-amber-900/45 mt-1 leading-relaxed line-clamp-2">{cat.description}</p>
          ) : (
            <p className="text-[12px] text-amber-900/25 mt-1 italic">No description</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-orange-50 bg-orange-50/20">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-[11px] font-bold text-orange-600">
          <Users className="w-3 h-3" />
          {cat.contact_count ?? 0} contacts
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={e => { e.stopPropagation(); onEdit(cat) }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-900/35 hover:text-orange-500 hover:bg-orange-50 border-none cursor-pointer transition-colors bg-transparent"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(cat) }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-900/35 hover:text-red-500 hover:bg-red-50 border-none cursor-pointer transition-colors bg-transparent"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Contact modals
// ---------------------------------------------------------------------------

function ContactFormModal({
  mode, form, setForm, formError, saving, onClose, onSave,
  countryCodes, allCategories,
}) {
  const isEdit = mode === 'edit'

  const selectedCountry = countryCodes.find(c => c.dialCode === form.countryCode)
  const phoneLenHint = selectedCountry
    ? selectedCountry.minLength === selectedCountry.maxLength
      ? `Must be ${selectedCountry.minLength} digits`
      : `Must be ${selectedCountry.minLength}-${selectedCountry.maxLength} digits`
    : null

  const sortedCodes = [...countryCodes].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
        <h3 className="text-[15px] font-extrabold text-[#1c0700]">
          {isEdit ? 'Edit Contact' : 'Add Contact'}
        </h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-900/40 hover:text-orange-500 hover:bg-orange-50 border-none cursor-pointer transition-colors bg-transparent"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 py-5 space-y-4">
        {formError && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[12px] font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            {formError}
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold text-amber-900/50 uppercase tracking-wider mb-1.5">
            Contact Name
          </label>
          <input
            type="text"
            value={form.contactName}
            onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
            placeholder="Full name"
            className="w-full px-3 py-2.5 rounded-xl border border-orange-100 bg-orange-50/30 text-[13px] font-semibold text-[#1c0700] placeholder:text-amber-900/25 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-amber-900/50 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <div className="flex gap-2">
            <SearchableSelect
              value={form.countryCode}
              onChange={val => setForm(f => ({ ...f, countryCode: val, phoneNumber: '' }))}
              options={sortedCodes.map(c => ({ value: c.dialCode, label: `${c.dialCode} ${c.name}` }))}
              placeholder="Code"
              searchable
              size="md"
              className="w-[140px] flex-shrink-0"
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.phoneNumber}
              maxLength={selectedCountry?.maxLength}
              onChange={e => {
                const digits = e.target.value.replace(/\D/g, '')
                const capped = selectedCountry ? digits.slice(0, selectedCountry.maxLength) : digits
                setForm(f => ({ ...f, phoneNumber: capped }))
              }}
              placeholder={phoneLenHint ?? 'Phone number'}
              className="flex-1 px-3 py-2.5 rounded-xl border border-orange-100 bg-orange-50/30 text-[13px] font-semibold text-[#1c0700] placeholder:text-amber-900/25 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
          {phoneLenHint && (
            <p className="text-[11px] text-amber-900/45 mt-1">{phoneLenHint}</p>
          )}
        </div>

        {isEdit && (
          <div>
            <label className="block text-[11px] font-bold text-amber-900/50 uppercase tracking-wider mb-1.5">
              Move to Category
            </label>
            <SearchableSelect
              value={form.categoryID}
              onChange={val => setForm(f => ({ ...f, categoryID: val }))}
              options={allCategories.map(c => ({ value: c.categoryID, label: c.categoryName }))}
              placeholder="Select category..."
              searchable
              size="md"
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-orange-50">
        <button
          onClick={onClose}
          className="h-9 px-4 rounded-xl text-[13px] font-semibold text-amber-900/50 hover:text-[#1c0700] hover:bg-orange-50 border border-orange-100 bg-white cursor-pointer transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="h-9 px-5 rounded-xl text-[13px] font-bold text-white cursor-pointer border-none transition-all disabled:opacity-60 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Modal>
  )
}

function ContactDeleteModal({ contact, saving, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-red-100">
        <h3 className="text-[15px] font-extrabold text-[#1c0700]">Delete Contact</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-900/40 hover:text-red-500 hover:bg-red-50 border-none cursor-pointer transition-colors bg-transparent"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 py-5">
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] font-semibold text-red-700 leading-relaxed">
            Delete <strong>{contact?.contactName}</strong>? This cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-orange-50">
        <button
          onClick={onClose}
          className="h-9 px-4 rounded-xl text-[13px] font-semibold text-amber-900/50 hover:text-[#1c0700] hover:bg-orange-50 border border-orange-100 bg-white cursor-pointer transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={saving}
          className="h-9 px-5 rounded-xl text-[13px] font-bold text-white cursor-pointer border-none transition-all disabled:opacity-60 flex items-center gap-2"
          style={{ background: '#ef4444' }}
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saving ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  )
}

function UploadModal({ categoryId, onClose }) {
  const [uploadFile, setUploadFile]       = useState(null)
  const [uploadResult, setUploadResult]   = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadError, setUploadError]     = useState('')
  const [dragOver, setDragOver]           = useState(false)
  const fileInputRef                      = useRef(null)

  async function handleDownload(format) {
    try {
      const { blob, filename } = await downloadTemplate(categoryId, format)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setUploadError(err.message)
    }
  }

  async function handleUpload() {
    if (!uploadFile) return
    setUploadLoading(true)
    setUploadError('')
    setUploadResult(null)
    try {
      const result = await uploadContacts(categoryId, uploadFile)
      setUploadResult(result)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploadLoading(false)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setUploadFile(file)
  }

  return (
    <Modal onClose={onClose} maxWidth="max-w-lg">
      <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
        <h3 className="text-[15px] font-extrabold text-[#1c0700]">Upload Contacts</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-900/40 hover:text-orange-500 hover:bg-orange-50 border-none cursor-pointer transition-colors bg-transparent"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Download template section */}
        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4">
          <div className="flex items-center gap-2 mb-1">
            <FileSpreadsheet className="w-4 h-4 text-orange-500" />
            <p className="text-[13px] font-bold text-[#1c0700]">Download Template</p>
          </div>
          <p className="text-[12px] text-amber-900/45 mb-3">Download a template file to fill in your contacts.</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleDownload('excel')}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold border border-orange-200 bg-white text-orange-600 hover:bg-orange-50 cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Excel (.xlsx)
            </button>
            <button
              onClick={() => handleDownload('csv')}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold border border-orange-200 bg-white text-orange-600 hover:bg-orange-50 cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        </div>

        {/* Upload section */}
        <div>
          <p className="text-[13px] font-bold text-[#1c0700] mb-2">Upload File</p>

          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all ${
              dragOver
                ? 'border-orange-400 bg-orange-50'
                : 'border-orange-200 bg-orange-50/20 hover:border-orange-300 hover:bg-orange-50/40'
            }`}
          >
            <Upload className={`w-8 h-8 ${dragOver ? 'text-orange-500' : 'text-orange-300'}`} />
            {uploadFile ? (
              <p className="text-[13px] font-semibold text-[#1c0700]">{uploadFile.name}</p>
            ) : (
              <>
                <p className="text-[13px] font-semibold text-amber-900/60">Drag and drop or click to browse</p>
                <p className="text-[11px] text-amber-900/35">Accepts .xlsx, .xls, .csv</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={e => setUploadFile(e.target.files[0] ?? null)}
            />
          </div>
        </div>

        {/* Error */}
        {uploadError && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[12px] font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            {uploadError}
          </div>
        )}

        {/* Result */}
        {uploadResult && (
          <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-[12px] font-semibold">
            Upload successful!
            {uploadResult.total_imported != null && ` ${uploadResult.total_imported} contacts imported.`}
            {uploadResult.total_failed != null && uploadResult.total_failed > 0 && ` ${uploadResult.total_failed} rows had errors.`}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-orange-50">
        <button
          onClick={onClose}
          className="h-9 px-4 rounded-xl text-[13px] font-semibold text-amber-900/50 hover:text-[#1c0700] hover:bg-orange-50 border border-orange-100 bg-white cursor-pointer transition-all"
        >
          Close
        </button>
        <button
          onClick={handleUpload}
          disabled={!uploadFile || uploadLoading}
          className="h-9 px-5 rounded-xl text-[13px] font-bold text-white cursor-pointer border-none transition-all disabled:opacity-60 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
        >
          {uploadLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {uploadLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </Modal>
  )
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function LeadsPage() {
  // --- Category state ---
  const [categories,  setCategories]  = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')
  const [modal,       setModal]       = useState(null)   // 'create' | 'edit' | 'delete'
  const [selectedCat, setSelectedCat] = useState(null)
  const [form,        setForm]        = useState({ categoryName: '', description: '' })
  const [formError,   setFormError]   = useState('')
  const [saving,      setSaving]      = useState(false)

  // --- View state ---
  const [view,             setView]             = useState('categories')  // 'categories' | 'contacts'
  const [selectedCategory, setSelectedCategory] = useState(null)

  // --- Contacts state ---
  const [contacts,         setContacts]         = useState([])
  const [contactsTotal,    setContactsTotal]    = useState(0)
  const [contactsLoading,  setContactsLoading]  = useState(false)
  const [contactsError,    setContactsError]    = useState('')
  const [contactsPage,     setContactsPage]     = useState(0)   // offset in steps of PAGE_SIZE
  const [searchQuery,      setSearchQuery]      = useState('')

  // --- Contact modal state ---
  const [contactModal,     setContactModal]     = useState(null)  // null | 'add' | 'edit' | 'delete' | 'upload'
  const [selectedContact,  setSelectedContact]  = useState(null)
  const [contactForm,      setContactForm]      = useState({ contactName: '', countryCode: '', phoneNumber: '', categoryID: '' })
  const [contactFormError, setContactFormError] = useState('')
  const [contactSaving,    setContactSaving]    = useState(false)

  // --- Country codes cache ---
  const [countryCodes, setCountryCodes] = useState([])

  // ---------------------------------------------------------------------------
  // Fetch categories
  // ---------------------------------------------------------------------------
  async function fetchCategories() {
    setLoading(true)
    setError('')
    try {
      const data = await searchCategories()
      setCategories(data?.categories ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  // Fetch country codes once on mount
  useEffect(() => {
    getCountryCodes()
      .then(data => setCountryCodes(data?.countryCodes ?? []))
      .catch(() => {})
  }, [])

  // ---------------------------------------------------------------------------
  // Fetch contacts (with debounce on searchQuery)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (view !== 'contacts' || !selectedCategory) return

    const categoryId = selectedCategory.categoryID

    if (!searchQuery.trim()) {
      // No search - load normally
      setContactsLoading(true)
      setContactsError('')
      getContacts(categoryId, PAGE_SIZE, contactsPage)
        .then(data => {
          setContacts(data?.contacts ?? [])
          setContactsTotal(data?.total ?? 0)
        })
        .catch(err => setContactsError(err.message))
        .finally(() => setContactsLoading(false))
      return
    }

    // Debounce search
    setContactsLoading(true)
    const timer = setTimeout(() => {
      searchContacts({ category_id: categoryId, name: searchQuery })
        .then(data => {
          setContacts(data?.contacts ?? [])
          setContactsTotal(data?.total ?? 0)
        })
        .catch(err => setContactsError(err.message))
        .finally(() => setContactsLoading(false))
    }, 400)

    return () => clearTimeout(timer)
  }, [view, selectedCategory, contactsPage, searchQuery])

  // ---------------------------------------------------------------------------
  // Category handlers
  // ---------------------------------------------------------------------------
  function openCreate() {
    setForm({ categoryName: '', description: '' })
    setFormError('')
    setSelectedCat(null)
    setModal('create')
  }

  function openEdit(cat) {
    setForm({ categoryName: cat.categoryName ?? '', description: cat.description ?? '' })
    setFormError('')
    setSelectedCat(cat)
    setModal('edit')
  }

  function openDelete(cat) {
    setSelectedCat(cat)
    setModal('delete')
  }

  function closeModal() {
    setModal(null)
    setSelectedCat(null)
    setFormError('')
  }

  async function handleSave() {
    if (!form.categoryName.trim()) {
      setFormError('Category name is required.')
      return
    }
    setSaving(true)
    setFormError('')
    try {
      if (modal === 'edit') {
        await updateCategory(selectedCat.categoryID, form)
      } else {
        await createCategory(form)
      }
      closeModal()
      fetchCategories()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setSaving(true)
    try {
      await deleteCategory(selectedCat.categoryID)
      closeModal()
      fetchCategories()
    } catch (err) {
      setError(err.message)
      closeModal()
    } finally {
      setSaving(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Contacts view navigation
  // ---------------------------------------------------------------------------
  function openCategory(cat) {
    setSelectedCategory(cat)
    setView('contacts')
    setContactsPage(0)
    setSearchQuery('')
    setContacts([])
    setContactsTotal(0)
  }

  function backToCategories() {
    setView('categories')
    setSelectedCategory(null)
    setContactModal(null)
    setSelectedContact(null)
  }

  // ---------------------------------------------------------------------------
  // Contact handlers
  // ---------------------------------------------------------------------------
  function openAddContact() {
    setContactForm({
      contactName: '',
      countryCode: '',
      phoneNumber: '',
      categoryID: selectedCategory?.categoryID ?? '',
    })
    setContactFormError('')
    setSelectedContact(null)
    setContactModal('add')
  }

  function openEditContact(contact) {
    setContactForm({
      contactName: contact.contactName ?? '',
      countryCode: contact.countryCode ?? '',
      phoneNumber: contact.phoneNumber ?? '',
      categoryID: contact.categoryID ?? selectedCategory?.categoryID ?? '',
    })
    setContactFormError('')
    setSelectedContact(contact)
    setContactModal('edit')
  }

  function openDeleteContact(contact) {
    setSelectedContact(contact)
    setContactModal('delete')
  }

  function closeContactModal() {
    setContactModal(null)
    setSelectedContact(null)
    setContactFormError('')
  }

  function refreshContacts() {
    // Reset search and re-trigger effect
    setSearchQuery(q => q)
    setContactsPage(p => {
      // Force effect re-run by nudging state through a no-op trick
      return p
    })
    // Actually trigger a fresh fetch by toggling and restoring
    setContactsLoading(true)
    const categoryId = selectedCategory?.categoryID
    if (!categoryId) return
    getContacts(categoryId, PAGE_SIZE, contactsPage)
      .then(data => {
        setContacts(data?.contacts ?? [])
        setContactsTotal(data?.total ?? 0)
      })
      .catch(err => setContactsError(err.message))
      .finally(() => setContactsLoading(false))
  }

  async function handleContactSave() {
    if (!contactForm.contactName.trim()) {
      setContactFormError('Contact name is required.')
      return
    }
    if (!contactForm.countryCode) {
      setContactFormError('Please select a country code.')
      return
    }
    if (!contactForm.phoneNumber) {
      setContactFormError('Phone number is required.')
      return
    }
    const selectedCountry = countryCodes.find(c => c.dialCode === contactForm.countryCode)
    if (selectedCountry) {
      const len = String(contactForm.phoneNumber).length
      if (len < selectedCountry.minLength || len > selectedCountry.maxLength) {
        setContactFormError(
          selectedCountry.minLength === selectedCountry.maxLength
            ? `Phone must be ${selectedCountry.minLength} digits.`
            : `Phone must be ${selectedCountry.minLength}-${selectedCountry.maxLength} digits.`
        )
        return
      }
    }

    setContactSaving(true)
    setContactFormError('')
    try {
      const categoryChanged = contactModal === 'edit' && selectedContact?.categoryID !== contactForm.categoryID

      if (contactModal === 'edit') {
        await updateContact(selectedContact.customerID ?? selectedContact.contactID, {
          customerID: selectedContact.customerID ?? selectedContact.contactID,
          contactName: contactForm.contactName,
          countryCode: contactForm.countryCode,
          phoneNumber: contactForm.phoneNumber,
          categoryID: contactForm.categoryID,
        })
      } else {
        await createContact({
          contactName: contactForm.contactName,
          countryCode: contactForm.countryCode,
          phoneNumber: contactForm.phoneNumber,
          categoryID: contactForm.categoryID,
        })
      }

      closeContactModal()
      refreshContacts()
      fetchCategories()
    } catch (err) {
      setContactFormError(err.message)
    } finally {
      setContactSaving(false)
    }
  }

  async function handleContactDelete() {
    setContactSaving(true)
    try {
      await deleteContact(selectedContact.customerID ?? selectedContact.contactID)
      closeContactModal()
      refreshContacts()
      fetchCategories()
    } catch (err) {
      setContactsError(err.message)
      closeContactModal()
    } finally {
      setContactSaving(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Download template (header shortcut)
  // ---------------------------------------------------------------------------
  const [templateDownloading, setTemplateDownloading] = useState(false)
  const [templateError,       setTemplateError]       = useState('')

  async function handleHeaderDownload() {
    if (!selectedCategory?.categoryID) return
    setTemplateDownloading(true)
    setTemplateError('')
    try {
      const { blob, filename } = await downloadTemplate(selectedCategory.categoryID, 'excel')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setTemplateError(err.message)
    } finally {
      setTemplateDownloading(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Derived
  // ---------------------------------------------------------------------------
  const totalContacts   = categories.reduce((sum, c) => sum + (c.contact_count ?? 0), 0)
  const totalPages      = Math.ceil(contactsTotal / PAGE_SIZE)
  const currentPage     = Math.floor(contactsPage / PAGE_SIZE) + 1
  const showingFrom     = contactsTotal === 0 ? 0 : contactsPage + 1
  const showingTo       = Math.min(contactsPage + PAGE_SIZE, contactsTotal)

  // ---------------------------------------------------------------------------
  // Render: Contacts view
  // ---------------------------------------------------------------------------
  if (view === 'contacts') {
    return (
      <div className="p-6 bg-[#f7f3f0] min-h-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={backToCategories}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-900/40 hover:text-orange-500 hover:bg-orange-50 border-none cursor-pointer transition-colors bg-transparent flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <nav className="flex items-center gap-1.5 text-[13px] font-semibold min-w-0">
              <button
                onClick={backToCategories}
                className="text-amber-900/40 hover:text-orange-500 cursor-pointer border-none bg-transparent font-semibold transition-colors"
              >
                Leads
              </button>
              <span className="text-amber-900/25">/</span>
              <span className="text-[#1c0700] font-extrabold truncate">{selectedCategory?.categoryName}</span>
            </nav>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-900/30 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setContactsPage(0) }}
                placeholder="Search by name..."
                className="h-9 pl-8 pr-4 rounded-xl border border-orange-100 bg-white text-[13px] text-[#1c0700] placeholder:text-amber-900/30 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all w-48"
              />
            </div>

            {/* Download Template button */}
            <button
              onClick={handleHeaderDownload}
              disabled={templateDownloading}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-[13px] font-semibold border border-orange-200 bg-white text-orange-600 hover:bg-orange-50 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {templateDownloading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Download className="w-3.5 h-3.5" />}
              Template
            </button>

            {/* Upload button */}
            <button
              onClick={() => setContactModal('upload')}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-[13px] font-semibold border border-orange-200 bg-white text-orange-600 hover:bg-orange-50 cursor-pointer transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>

            {/* Add Contact button */}
            <button
              onClick={openAddContact}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all shadow-[0_2px_8px_rgba(234,88,12,0.30)] hover:shadow-[0_4px_14px_rgba(234,88,12,0.40)]"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            >
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Template download error */}
        {templateError && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[13px] font-semibold mb-3">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {templateError}
          </div>
        )}

        {/* Error banner */}
        {contactsError && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[13px] font-semibold mb-5">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {contactsError}
          </div>
        )}

        {/* Contacts table */}
        <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-50/50 border-b border-orange-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-amber-900/40 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Name</span>
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-amber-900/40 uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-amber-900/40 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Full Number</span>
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-bold text-amber-900/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactsLoading && (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              )}

              {!contactsLoading && contacts.map(contact => (
                <tr
                  key={contact.customerID ?? contact.contactID ?? contact.phoneNumber}
                  className="border-b border-orange-50 last:border-0 hover:bg-orange-50/30 transition-colors"
                >
                  <td className="px-4 py-3 text-[13px] font-semibold text-[#1c0700]">
                    {contact.contactName}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-amber-900/55 font-mono">
                    {contact.countryCode}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-amber-900/70 font-mono">
                    {contact.countryCode}{contact.phoneNumber}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditContact(contact)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-900/35 hover:text-orange-500 hover:bg-orange-50 border-none cursor-pointer transition-colors bg-transparent"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openDeleteContact(contact)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-900/35 hover:text-red-500 hover:bg-red-50 border-none cursor-pointer transition-colors bg-transparent"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {!contactsLoading && contacts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-orange-300" />
              </div>
              <p className="text-[14px] font-extrabold text-[#1c0700] mb-1">No contacts yet</p>
              <p className="text-[12px] text-amber-900/40 mb-4 text-center max-w-xs">
                {searchQuery ? 'No contacts match your search.' : 'Add your first contact to this category.'}
              </p>
              {!searchQuery && (
                <button
                  onClick={openAddContact}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!contactsLoading && contactsTotal > 0 && (
          <div className="flex items-center justify-between mt-4 px-1">
            <p className="text-[12px] text-amber-900/45 font-semibold">
              Showing {showingFrom}-{showingTo} of {contactsTotal} contacts
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setContactsPage(p => Math.max(0, p - PAGE_SIZE))}
                disabled={contactsPage === 0}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-orange-100 bg-white text-amber-900/40 hover:text-orange-500 hover:border-orange-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[12px] font-semibold text-amber-900/55 min-w-[60px] text-center">
                {currentPage} / {totalPages || 1}
              </span>
              <button
                onClick={() => setContactsPage(p => p + PAGE_SIZE)}
                disabled={contactsPage + PAGE_SIZE >= contactsTotal}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-orange-100 bg-white text-amber-900/40 hover:text-orange-500 hover:border-orange-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Contact modals */}
        {(contactModal === 'add' || contactModal === 'edit') && (
          <ContactFormModal
            mode={contactModal}
            form={contactForm}
            setForm={setContactForm}
            formError={contactFormError}
            saving={contactSaving}
            onClose={closeContactModal}
            onSave={handleContactSave}
            countryCodes={countryCodes}
            allCategories={categories}
          />
        )}

        {contactModal === 'delete' && (
          <ContactDeleteModal
            contact={selectedContact}
            saving={contactSaving}
            onClose={closeContactModal}
            onConfirm={handleContactDelete}
          />
        )}

        {contactModal === 'upload' && (
          <UploadModal
            categoryId={selectedCategory?.categoryID}
            onClose={() => { setContactModal(null); refreshContacts(); fetchCategories() }}
          />
        )}
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render: Categories view (default)
  // ---------------------------------------------------------------------------
  return (
    <div className="p-6 bg-[#f7f3f0] min-h-full">

      {/* Header row */}
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <p className="text-[13px] text-amber-900/40">Manage your contact categories and leads</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer flex-shrink-0 transition-all shadow-[0_2px_8px_rgba(234,88,12,0.30)] hover:shadow-[0_4px_14px_rgba(234,88,12,0.40)]"
          style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
        >
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      {/* Stats strip */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { label: 'Total Categories', value: categories.length, icon: Tag },
            { label: 'Total Contacts',   value: totalContacts,     icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-orange-100 shadow-sm"
            >
              <span className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-orange-500" />
              </span>
              <div>
                <p className="text-[18px] font-extrabold text-[#1c0700] leading-none">{value}</p>
                <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[13px] font-semibold mb-5">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Category grid */}
      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <CategoryCard
              key={cat.categoryID}
              cat={cat}
              onEdit={openEdit}
              onDelete={openDelete}
              onClick={openCategory}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-orange-100 bg-white">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
            <Tag className="w-7 h-7 text-orange-300" />
          </div>
          <p className="text-[15px] font-extrabold text-[#1c0700] mb-1">No categories yet</p>
          <p className="text-[13px] text-amber-900/40 mb-5 text-center max-w-xs">
            Create your first contact category to start organizing your leads.
          </p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-[13px] font-bold text-white border-none cursor-pointer transition-all shadow-[0_2px_8px_rgba(234,88,12,0.30)]"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            <Plus className="w-4 h-4" />
            New Category
          </button>
        </div>
      )}

      {/* Category modals */}
      {(modal === 'create' || modal === 'edit') && (
        <CategoryFormModal
          mode={modal}
          form={form}
          setForm={setForm}
          formError={formError}
          saving={saving}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {modal === 'delete' && (
        <CategoryDeleteModal
          category={selectedCat}
          saving={saving}
          onClose={closeModal}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}
