# CallOHM Real Estate - Design System & Project Reference

Use this file as a reference whenever building new pages or components. Check here first before writing new code - most patterns, components, and data already exist.

---

## Project File Reference

### Pages (`src/pages/`)

| File | Route | What it contains |
|------|-------|-----------------|
| `LandingPage.jsx` | `/` | Assembles all 11 landing sections in order. No logic here - just imports. |
| `LoginPage.jsx` | `/login` | Full-screen dark auth page. Glassmorphism card, animated rings, real API integration via `loginService`. |
| `BookDemoPage.jsx` | `/book-demo` | Split layout form (left) + orange brand panel (right). Uses `SearchableSelect` for country picker; fetches country codes from `getCountryCodes()` (contactsService) on mount. |
| `PricingPage.jsx` | `/pricing` | 3-tier pricing cards with feature lists. |
| `AboutPage.jsx` | `/about` | Company story and values. |
| `LeadershipPage.jsx` | `/leadership` | Team member cards. |
| `ContactPage.jsx` | `/contact` | Contact options - demo booking, call, brochure download. |
| `FAQPage.jsx` | `/faq` | Accordion-style FAQ. |
| `BrochurePage.jsx` | `/brochure` | Brochure landing with PDF download. |
| `PrivacyPolicyPage.jsx` | `/privacy` | Legal - uses `LegalPageLayout`. |
| `TermsOfServicePage.jsx` | `/terms` | Legal - uses `LegalPageLayout`. |
| `CookiePolicyPage.jsx` | `/cookies` | Legal - uses `LegalPageLayout`. |

### Landing Page Sections (`src/components/LandingPage/`)

Sections appear on the homepage in this order:

| File | Section ID | What it shows |
|------|-----------|---------------|
| `Nav.jsx` | - | Sticky navigation with scroll detection, company dropdown, mobile drawer |
| `Hero.jsx` | - | Full-screen hero with background image, headline, two CTA buttons |
| `PlatformSection.jsx` | - | Platform overview with feature highlights |
| `StatsBar.jsx` | - | Key metrics strip (animated counters) |
| `HowItWorks.jsx` | `#how-it-works` | 5-step circular workflow diagram with CSS animations |
| `AgentConfig.jsx` | - | AI agent configuration UI demo |
| `Features.jsx` | `#features` | 6-feature card grid |
| `AgentDemo.jsx` | `#analytics` | Split-panel analytics section (left: copy, right: live dark dashboard) |
| `Testimonials.jsx` | - | Customer quote cards |
| `UseCases.jsx` | `#use-cases` | Real estate use cases |
| `CtaSection.jsx` | - | Final call-to-action |
| `Footer.jsx` | - | Footer with nav links and legal links |

### Reusable Components (`src/components/common/`)

#### `SearchableSelect.jsx`

Branded dropdown with optional search. Renders via React portal to avoid clipping inside `overflow:hidden` containers. Always use this - never use a native `<select>`.

```jsx
import SearchableSelect from '../components/common/SearchableSelect'

<SearchableSelect
  value={selectedValue}
  onChange={(val) => setSelectedValue(val)}
  options={[{ value: 'IN', label: '🇮🇳 India (+91)' }]}
  placeholder="Select country"
  icon={Globe}          // lucide-react icon component (optional)
  searchable={true}     // shows search input inside dropdown (default: false)
  isDarkMode={false}    // glassmorphism dark theme (default: false)
  size="md"             // 'sm' | 'md' | 'lg' (default: 'md')
  disabled={false}
  emptyText="No results"
/>
```

Size heights: `sm` = 32px, `md` = 40px, `lg` = 44px.

**Theme (light - default):**
- Trigger: `bg-white border-orange-200 text-[#1c0700]`, hover `border-orange-300`, open `border-orange-400 ring-2 ring-orange-100`
- Placeholder: `text-amber-900/35`
- Dropdown panel: `bg-white border-orange-100 shadow-[0_8px_32px_rgba(234,88,12,0.10)]`
- Selected item: `bg-orange-50 text-orange-600` + orange check icon
- Hover item: `hover:bg-orange-50/60`
- Scrollbar: orange thumb (`#fdba74`), brightens to `#f97316` on hover

**Theme (dark - `isDarkMode`):**
- Trigger: `rgba(255,255,255,0.07)` bg, `border-white/12`, open `border-orange-500/70 ring-orange-500/15`
- Dropdown panel: `#1a0800` bg, `border-white/10`
- Selected item: `bg-orange-500/10 text-orange-400`

#### `LegalPageLayout.jsx`

Wrapper for legal pages. Provides consistent header, max-width container, and footer link.

```jsx
import LegalPageLayout from '../components/LegalPageLayout'

<LegalPageLayout title="Privacy Policy" lastUpdated="January 2025">
  {/* content */}
</LegalPageLayout>
```

#### `CookieBanner.jsx`

Cookie consent banner. Already added to `App.jsx` - do not add again.


### Dashboard Pages (`src/pages/dashboard/`)

| File | Route | What it contains |
|------|-------|-----------------|
| `DashboardPage.jsx` | `/dashboard` | Time-of-day greeting, 4 metric cards, recent calls table, 3 quick stat cards |
| `AgentPage.jsx` | `/dashboard/agent` | Tabbed agent viewer - Default Agent + Company Agents. Uses `AgentCard` (list) and `AgentDetail` (full view). Fetches via `agentService.js`. |
| `LeadsPage.jsx` | `/dashboard/leads` | Category CRUD (list, create, edit, delete with type-to-confirm) + contacts drill-down per category (search, add, edit, upload, download template, delete, paginated). Fetches via `categoriesService.js` and `contactsService.js`. |
| `CallsPage.jsx` | `/dashboard/calls` | Call history (placeholder) |
| `AnalyticsPage.jsx` | `/dashboard/analytics` | Analytics and reporting (placeholder) |
| `CampaignsPage.jsx` | `/dashboard/campaigns` | Campaign management (placeholder) |
| `SettingsPage.jsx` | `/dashboard/settings` | Settings (placeholder) |

### Dashboard Layout (`src/layouts/DashboardLayout.jsx`)

Wraps all `/dashboard/*` routes. Provides:
- **Sidebar** - dark brand-colored (`#0c0400`), collapsible (220px / 68px), dot-grid texture, top orange glow
- **NavItem** - active state uses a torch spotlight effect (CSS `clip-path` trapezoid cone + layered gradients) with a glowing right-edge indicator pill. Inactive items have hover tint.
- **Top bar** - page title, "18 calls active" badge, notifications bell
- **Auth guard** - redirects to `/login` if `tokenStorage.isLoggedIn()` is false
- **PageTitle** - derives title from `useLocation()` pathname map

#### NavItem active state (torch spotlight)

```jsx
// All inside overflow-hidden span anchored to the nav item
// 1. Outer soft cone
clipPath: 'polygon(100% 40%, 100% 60%, 0% 0%, 0% 100%)'
background: linear-gradient (orange 0.95 → transparent)

// 2. Brighter inner core (same cone, slightly tighter)
clipPath: 'polygon(100% 43%, 100% 57%, 0% 18%, 0% 82%)'

// 3. Hot center axis line (1.5px)
// 4. Glowing right indicator pill - box-shadow only to the left (negative X)
```

### AgentPage Components (`src/pages/dashboard/AgentPage.jsx`)

#### `TabSelector`
Angled parallelogram tab design - first tab has a diagonal right cut, second tab has a matching diagonal left cut and overlaps by `CUT` (22px) using negative `marginLeft`. Active tab gets `zIndex: 10`. Uses `clip-path: polygon(...)` for the angled shape.

#### `AgentCard`
Summary card for a single agent. Calls `getFullAgentById(agentId)` to show:
- Agent name, ID, active status badge
- LLM / Voice / STT chips with colored icons
- Truncated prompt preview (first 120 chars + "...")
- Created date + "View details" button

#### `AgentDetail`
Full detail view. Calls `getFullAgentById(agentId)`. Shows:
- Header with name, ID, status
- 4 config chips: LLM modelName, Voice purviewVoiceName, STT sttName, Category name
- Prompt card (title, opening line, full prompt in scrollable `h-[280px]` pre)
- Prompt variables table
- Right column: Voice card with `AudioPlayer`, LLM card, STT card, Agent settings card

#### `AudioPlayer`
Inline HTML5 audio preview with play/pause button and progress bar. Uses `useRef` + `audio.addEventListener`.

#### `Skeleton`
`animate-pulse bg-orange-100 rounded-lg` - pass `className` for dimensions.

#### `Card`
Section card wrapper with icon header. Props: `title`, `icon`, `iconColor`, `children`.

#### `InfoRow`
Key-value row with border-bottom. Props: `label`, `value`.

### API Services (`src/apiservices/`)

#### `agentService.js`

Auto-refreshes tokens: checks `tokenStorage.isExpired()` before every request (proactive), and retries once with a fresh token on a 401 response (reactive). Never needs manual logout/login after token expiry.

```jsx
import { getAgentById, getFullAgentById, AGENT_IDS } from '../apiservices/agentService'

// Known agent IDs
AGENT_IDS.default  // 'AGENT_EC143AFB4AF6'
AGENT_IDS.company  // 'AGENT_E6B07625E916'

// Fetch basic agent data
const agent = await getAgentById(agentId)

// Fetch agent + all sub-resources in parallel (uses Promise.allSettled)
// Returns: { agent, llm, voice, prompt, stt, category }
// category falls back to { categoryID, categoryName: categoryID } if endpoint returns 401
const data = await getFullAgentById(agentId)

// Individual sub-resource fetches (IDs always come from agent response)
await getLLM(agent.llmID)
await getVoice(agent.voiceID)
await getPrompt(agent.promptID)
await getSTT(agent.sttID)
await getCategory(agent.categoryID)
```

Display field mapping:
- LLM name: `llm.modelName`
- Voice name: `voice.purviewVoiceName`
- Voice audio: `voice.audio_file.url`
- STT name: `stt.sttName`
- Category name: `category.categoryName ?? category.name ?? category.category_name ?? category.categoryID`

**Important:** Always use IDs from the agent response. Never hardcode sub-resource IDs.

#### `categoriesService.js`

Same auto-refresh pattern as `agentService.js`. Used by `LeadsPage` for category management.

```jsx
import {
  getCategories, createCategory, searchCategories,
  getCategoryById, updateCategory, deleteCategory,
} from '../apiservices/categoriesService'

// List all categories (basic - no contact_count)
const { total, categories } = await getCategories()

// Search/list with contact_count - use this for the leads page
const { total, categories } = await searchCategories()
// Each category has: categoryID, categoryName, description, user_id, contacts[], contact_count

// Filtered search
await searchCategories({ category_id: 'CAT_xxx' })
await searchCategories({ category_name: 'test' })

// Create
await createCategory({ categoryName: 'Hot Leads', description: 'Top priority' })

// Update
await updateCategory(categoryID, { categoryName: 'Updated', description: '...' })

// Delete (also deletes all contacts in the category)
await deleteCategory(categoryID)
```

Response shape for `searchCategories()`:
```json
{
  "total": 1,
  "categories": [{
    "categoryID": "CAT_xxx",
    "categoryName": "Avalon Agent",
    "description": "Call Leads",
    "user_id": "...",
    "contacts": [],
    "contact_count": 0
  }]
}
```

#### `contactsService.js`

Handles individual contacts within categories. Same auto-refresh pattern. `getCountryCodes()` is public (no auth).

```jsx
import {
  getCountryCodes, getContacts, createContact, updateContact, deleteContact,
  searchContacts, downloadTemplate, uploadContacts,
} from '../apiservices/contactsService'

// Country codes (public - no auth needed). Returns array of objects.
const codes = await getCountryCodes()
// Each entry: { name, dialCode, isoCode, minLength, maxLength }

// List contacts in a category (paginated)
const { contacts, total } = await getContacts(categoryId, limit=10, offset=0)

// Search contacts
await searchContacts({ category_id, phone_number, name, size })

// Create contact
await createContact({ contactName, countryCode: 'IN', phoneNumber: '9876543210', categoryID })

// Update contact (changing categoryID moves the contact to another category)
await updateContact(customerId, { contactName, countryCode, phoneNumber, categoryID })

// Delete contact
await deleteContact(customerId)

// Download Excel/CSV template for bulk upload
const { blob, filename } = await downloadTemplate(categoryId, 'excel') // or 'csv'
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url; a.download = filename; a.click()
URL.revokeObjectURL(url)

// Upload contacts (FormData - do NOT set Content-Type header)
await uploadContacts(categoryId, file)
```

#### `loginService.js`

All auth-related API calls. Import only what you need.

```jsx
import { login, logout, refreshToken, getMe, tokenStorage } from '../apiservices/loginService'

// Login - saves tokens automatically
await login(email, password)

// Get current user profile
const user = await getMe()

// Refresh access token
await refreshToken()

// Logout - clears tokens locally even if server fails
await logout()

// Direct token access
tokenStorage.getAccessToken()
tokenStorage.getRefreshToken()
tokenStorage.isExpired()
tokenStorage.isLoggedIn()  // true if access token exists
tokenStorage.clear()
```

Token storage keys in `localStorage`: `callohm_access_token`, `callohm_refresh_token`, `callohm_token_expires_at`.

All functions throw an `Error` with a `.status` property on HTTP failures. Always wrap in try/catch.

**Session expiry / token handling:** `refreshToken()` in `loginService.js` only clears stored tokens when the server responds with 401 or 403 (refresh token genuinely rejected). Transient errors (429, 5xx, network failures) do NOT clear tokens - the session stays alive and the page shows an error message instead.

All three authenticated services (`agentService`, `categoriesService`, `contactsService`) check `!tokenStorage.isLoggedIn()` after a failed refresh - only redirecting to `/login` if tokens were actually cleared. This means a rate-limit spike or a momentary server blip never logs the user out.

| Refresh fails with | Tokens cleared | Redirect to /login | User sees |
|---|---|---|---|
| 401 / 403 (token rejected) | Yes | Yes | Login page |
| 429 (rate limit) | No | No | Error message, stays logged in |
| 5xx / network error | No | No | Error message, stays logged in |

**429 Too Many Requests:** all services map this to "Too many requests - please wait a moment and try again." instead of the raw status code. Show via the existing error state in the page.

---

## Color Palette

### Primary - Orange Brand

| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| Primary | `#ea580c` | `orange-600` | Main CTAs, active states, icons |
| Primary Light | `#f97316` | `orange-500` | Gradients, hover highlights |
| Primary Dark | `#c2410c` | `orange-700` | Hover states on primary buttons |
| Primary Soft | `#fff7ed` | `orange-50` | Badge/chip backgrounds |
| Accent | `#f59e0b` | `amber-400` | Secondary accents, warm highlights |

### Text Colors

| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| Heading | `#1c0700` | - | All main headings |
| Heading Dark | `#431407` | - | Subheadings |
| Body | `#78350f` | `brown-700` | Body copy on warm backgrounds |
| Muted | `amber-900/60` | - | Secondary text |
| Light | `#9ca3af` | `gray-400` | Placeholder, captions |

### Borders

| Tailwind | Use |
|----------|-----|
| `border-orange-100` | Subtle card borders |
| `border-orange-200` | Stronger borders, inputs |
| `border-white/10` | Borders on dark backgrounds |

### Sidebar Dark Theme

| Hex | Use |
|-----|-----|
| `#0c0400` | Sidebar background (darkest) |
| `#180900` | Sidebar background mid |
| `#1a0800` | Collapse toggle button, tooltips |
| `rgba(255,255,255,0.022)` | Dot-grid texture dots |
| `rgba(249,115,22,0.12)` | Top orange glow blob |
| `rgba(255,255,255,0.07)` | Section divider borders |
| `rgba(255,255,255,0.05)` | Hover tint on inactive nav items |
| `text-white/35` | Inactive nav label |
| `text-white/70` | Inactive nav label on hover |

### Dark Theme (Login / Analytics Right Panel)

| Hex | Use |
|-----|-----|
| `#1c0700` | Darkest background |
| `#2d1002` | Mid dark |
| `#7c2d12` | Lighter dark (orange 900) |
| `rgba(255,255,255,0.06)` | Glassmorphism card bg |
| `rgba(255,255,255,0.08)` | Dark input background |
| `rgba(255,255,255,0.12)` | Dark input border |

### Status Colors

| Color | Tailwind | Use |
|-------|----------|-----|
| Success | `emerald-500` / `#10b981` | Positive outcomes, site visit booked |
| Warning | `amber-400` / `#fbbf24` | Warm leads, callbacks |
| Error | `red-500` / `#ef4444` | Errors, budget mismatch |
| Info | `sky-400` / `#38bdf8` | In-progress, neutral info |

---

## Typography

**Font:** Inter (loaded via Google Fonts in `index.html`)
```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Size Scale

| Element | Size | Weight | Tailwind example |
|---------|------|--------|-----------------|
| Hero H1 | `clamp(38px, 5vw, 68px)` | 900 | CSS only (`.hero-title`) |
| Section H2 | `2rem - 2.6rem` | 800 | `text-[2rem] font-extrabold` |
| Card H3 | `15-18px` | 700 | `text-[16px] font-bold` |
| Badge / Label | `11px` | 700 | `text-[11px] font-bold uppercase tracking-widest` |
| Body | `14-16px` | 400-500 | `text-[15px] leading-relaxed` |
| Caption / Meta | `10-12px` | 500-600 | `text-[11px] font-medium` |
| Form input | `14-15px` | 400 | `text-[14px]` |
| Form label | `11px` | 600-700 | `text-[11px] font-semibold uppercase tracking-wider` |

### Heading Colors

On light backgrounds: `text-[#1c0700]`
On dark backgrounds: `text-white`
Accent word: `text-orange-500` (light) or `text-orange-400` (dark)

---

## Button Patterns

### Primary Button (Orange Gradient)

```jsx
<a
  href="/book-demo"
  className="inline-flex items-center justify-center h-[48px] px-6
    bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600
    text-white text-[14px] font-bold rounded-xl
    shadow-[0_4px_18px_rgba(234,88,12,0.36)]
    hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(234,88,12,0.46)]
    transition-all duration-150 no-underline"
>
  Get started
</a>
```

### Secondary Button (Outline)

```jsx
<a
  href="/login"
  className="inline-flex items-center justify-center h-[48px] px-6
    text-amber-900 text-[14px] font-semibold
    border border-orange-200 rounded-xl
    hover:bg-orange-50 hover:border-orange-300
    transition-all duration-150 no-underline"
>
  Log in
</a>
```

### Ghost Button (Dark background)

```jsx
<a
  className="inline-flex items-center justify-center h-[48px] px-6
    text-white/80 text-[14px] font-semibold
    border border-white/25 rounded-xl
    hover:border-white/50 hover:bg-white/10
    transition-all duration-150 no-underline"
>
  Learn more
</a>
```

---

## Section Layout Pattern

All full-width sections follow this wrapper pattern:

```jsx
<section className="py-20 px-6 bg-white">    {/* or bg-[#fffcf8] for warm */}
  <div className="max-w-[1280px] mx-auto">
    {/* content */}
  </div>
</section>
```

Common section backgrounds:
- White: `bg-white`
- Warm cream: `bg-[#fffcf8]` or `bg-orange-50/30`
- Soft gradient: `background: linear-gradient(180deg, #fff9f5 0%, #fff0e6 100%)`
- Dark: `background: linear-gradient(160deg, #1c0700 0%, #2d1002 55%, #1a0600 100%)`

---

## Card Patterns

### Feature Card

```jsx
<div className="bg-white border border-orange-100 rounded-2xl px-6 py-7
  shadow-sm hover:-translate-y-1
  hover:shadow-[0_16px_40px_rgba(234,88,12,0.12)]
  hover:border-orange-200 transition-all duration-200">
```

### Stat / Metric Card (Light)

```jsx
<div className="rounded-xl p-4 bg-orange-50 border border-orange-100">
  <p className="text-[28px] font-extrabold text-orange-500">265</p>
  <p className="text-[12px] text-amber-900/50 font-medium mt-1">Total Leads</p>
</div>
```

### Glassmorphism Card (Dark backgrounds)

```jsx
<div
  className="rounded-2xl px-8 py-10"
  style={{
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
  }}
>
```

---

## Badge / Chip Pattern

```jsx
<span className="inline-flex items-center gap-2 px-4 py-1.5
  bg-orange-50 text-orange-700 text-xs font-bold
  uppercase tracking-widest rounded-full border border-orange-200">
  <SomeIcon className="w-3.5 h-3.5" /> Label
</span>
```

On dark backgrounds:
```jsx
<span className="inline-flex items-center gap-2 px-4 py-1.5
  bg-orange-500/10 text-orange-400 text-xs font-bold
  uppercase tracking-widest rounded-full border border-orange-500/30">
```

---

## Form Patterns

### Input (Light background)

```jsx
<input
  className="w-full h-[46px] px-4 rounded-xl text-[14px]
    text-[#1c0700] placeholder-amber-900/30 outline-none
    bg-white border border-orange-200
    focus:border-orange-400 focus:ring-2 focus:ring-orange-100
    transition-all duration-150"
/>
```

### Input (Dark background / Glassmorphism)

```jsx
<input
  className="w-full h-[46px] px-4 rounded-xl text-[14px]
    text-white placeholder-white/25 outline-none transition-all"
  style={{
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
  }}
  onFocus={e => {
    e.target.style.border = '1px solid rgba(249,115,22,0.7)'
    e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'
  }}
  onBlur={e => {
    e.target.style.border = '1px solid rgba(255,255,255,0.12)'
    e.target.style.boxShadow = 'none'
  }}
/>
```

### Form Label

```jsx
<label className="text-[11px] font-semibold text-amber-900/50 uppercase tracking-wider">
  Email
</label>
```

### Country + Phone Picker

Country codes come from the API (`getCountryCodes()`), not a static file. Country code dropdown and phone input always appear side-by-side in one row under a single "Phone Number" label.

```jsx
import SearchableSelect from '../components/common/SearchableSelect'
import { getCountryCodes } from '../apiservices/contactsService'

const [countryCodes, setCountryCodes] = useState([])
useEffect(() => {
  getCountryCodes().then(data => setCountryCodes(data)).catch(() => {})
}, [])

const sortedCodes = [...countryCodes].sort((a, b) => a.name.localeCompare(b.name))
const selectedCountry = countryCodes.find(c => c.dialCode === form.countryCode)
const phoneLenHint = selectedCountry
  ? selectedCountry.minLength === selectedCountry.maxLength
    ? `Must be ${selectedCountry.minLength} digits`
    : `Must be ${selectedCountry.minLength}-${selectedCountry.maxLength} digits`
  : null

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
      maxLength={selectedCountry?.maxLength}
      value={form.phoneNumber}
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
```

Rules:
- Use `type="text"` + `inputMode="numeric"` - never `type="number"` (avoids up/down spinners)
- Strip non-digits in `onChange` with `.replace(/\D/g, '')`
- Cap at `selectedCountry.maxLength` via both `maxLength` attr and `.slice()` (handles paste)
- The `value` stored in form state for country is `dialCode` (e.g., `"+91"`), not `isoCode`

---

## Animation Classes (App.css)

These CSS classes are pre-built and ready to use:

| Class | Effect | Use on |
|-------|--------|--------|
| `hw-card` | 3D entrance on scroll | How-it-works step cards |
| `hw-ring` | Expanding ring pulse | Background rings |
| `float-chip` | Vertical float loop | Floating badge elements |
| `pulse-ring` | Ripple expand + fade | Call/live indicators |
| `tag-dot` | Blinking dot | Live status indicators |
| `stat-value` | Gradient text (orange to amber) | Large stat numbers |
| `section-soft` | Warm cream gradient background | Section backgrounds |
| `cta-section` | Deep orange radial gradient | CTA section background |
| `btn-primary` | Orange gradient button with shine | Primary CTAs |
| `btn-ghost` | Transparent bordered button | Secondary CTAs |

### Keyframe Animations (reference by name in inline styles)

| Keyframe | Use |
|----------|-----|
| `loginRingPulse` | Concentric ring pulse on LoginPage |
| `ringPulse` | General ring pulse |
| `floatY` | Float up-down (4s / 4.6s) |
| `fadeUp` | Fade in + slide up |
| `ripple` | Expanding ripple (0 to 200% scale, fade out) |
| `blink` | Opacity 1 to 0.3 pulse |

---

## Animated Counter Pattern

Used in StatsBar, AgentDemo, and BookDemoPage stats. Triggers when element scrolls into view.

```jsx
function Counter({ target, suffix = '', duration = 1400 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        setVal(Math.floor(p * p * target))   // ease-in curve
        if (p < 1) requestAnimationFrame(tick)
        else setVal(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}
```

---

## Navigation Links Reference

The Nav component tracks these section IDs with IntersectionObserver:

| Nav Label | href | Section ID on page |
|-----------|------|--------------------|
| Home | `/` | - |
| How it works | `/#how-it-works` | `id="how-it-works"` |
| Features | `/#features` | `id="features"` |
| Analytics | `/#analytics` | `id="analytics"` |
| Use cases | `/#use-cases` | `id="use-cases"` |
| Pricing | `/pricing` | separate page |
| Company | dropdown | `/about`, `/leadership`, `/contact` |

When adding a new section to the landing page that should appear in the nav, add the `id` to the section element and update `NAV_LINKS` in `Nav.jsx`.

---

## Icon Library

Using `lucide-react`. Import icons from the package:

```jsx
import { Phone, BarChart3, TrendingUp, Calendar, CheckCircle2, Users,
         ArrowUpRight, ChevronDown, Menu, X, Eye, EyeOff, Home,
         Globe, Search, Activity, Clock } from 'lucide-react'
```

Standard icon sizes used in this project:
- Navigation: `w-5 h-5`
- Feature cards: `w-6 h-6` or `w-7 h-7`
- Inline / badge: `w-3.5 h-3.5` or `w-4 h-4`
- Button icon: `w-4 h-4`

---

## Public Assets

| File | Use |
|------|-----|
| `/callohm-realestate-logo.png` | Brand logo (use everywhere) |
| `/house.jpg` | Hero section background image |
| `/CallOHM%20Brochure.pdf` | Downloadable brochure (BrochurePage) |
| `/favicon.svg` | Browser tab icon |

Logo on dark backgrounds: add `className="brightness-0 invert"` to make it white.

---

## Dashboard Patterns

### Dashboard Page Wrapper

All dashboard pages use this wrapper (no layout/padding provided by DashboardLayout itself):

```jsx
<div className="p-6 max-w-[1000px] mx-auto overflow-x-hidden">
  {/* content */}
</div>
```

### Dashboard Page Heading Rule

The top bar already shows the page title - do NOT repeat it as an `<h2>` inside the page body.

- **Content-rich pages** (Leads, Agents): show only a subtitle `<p>` and any action buttons. No `<h2>`.
- **Placeholder pages** (Calls, Analytics, Campaigns, Settings): no heading block at all - the placeholder card carries its own description.

```jsx
{/* Leads / Agents - subtitle + action button only */}
<div className="flex items-start justify-between mb-5 gap-4">
  <p className="text-[13px] text-amber-900/40">Manage your contact categories and leads</p>
  <button ...>+ New Category</button>
</div>

{/* Placeholder pages - no heading block, jump straight to content */}
<div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-orange-100 bg-orange-50/30">
  ...
</div>
```

### Dashboard Info Card (`Card` component in AgentPage)

```jsx
<div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
  <div className="flex items-center gap-3 px-5 py-3.5 border-b border-orange-50">
    <span className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
      <Icon className="w-3.5 h-3.5 text-orange-500" />
    </span>
    <p className="text-[13px] font-bold text-[#1c0700]">Card Title</p>
  </div>
  <div className="p-5">{/* content */}</div>
</div>
```

### Angled Parallelogram Tabs

Used on AgentPage. Tabs overlap using negative `marginLeft` and `clip-path` polygons to create the diagonal cut effect:

```jsx
// First tab - diagonal cut on RIGHT side
clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 100%, 0 100%)'

// Last tab - diagonal cut on LEFT side (mirrors the first)
clipPath: 'polygon(22px 0, 100% 0, 100% 100%, 0 100%)'

// Overlap amount
marginLeft: '-22px'   // for all tabs after the first
zIndex: isActive ? 10 : (TABS.length - i)   // active always on top

// Active: dark brand gradient
background: 'linear-gradient(135deg, #1c0700 0%, #3d1206 100%)'
// Inactive: warm gray
background: '#d6cdc7'
// Wrap in: filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.13))'
// to get a unified shadow across the clipped shapes
```

### Config Chips (4-column grid, AgentPage)

```jsx
const colorMap = {
  orange: 'bg-orange-50 border-orange-100 text-orange-500',
  violet: 'bg-violet-50 border-violet-100 text-violet-500',
  sky:    'bg-sky-50    border-sky-100    text-sky-500',
  amber:  'bg-amber-50  border-amber-100  text-amber-500',
}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
  <div className="flex items-center gap-3 rounded-xl px-4 py-3 border bg-orange-50 border-orange-100">
    <span className="w-8 h-8 rounded-lg border bg-orange-50 border-orange-100 flex items-center justify-center">
      <Icon className="w-4 h-4 text-orange-500" />
    </span>
    <div>
      <p className="text-[10px] font-semibold text-amber-900/40 uppercase tracking-wider mb-1">Label</p>
      <p className="text-[13px] font-bold text-orange-600 truncate">Value</p>
    </div>
  </div>
</div>
```

### Type-to-Confirm Delete Modal

Used on LeadsPage. Requires the user to type the exact item name before the delete button activates. Prevents accidental destructive actions.

```jsx
function DeleteModal({ item, saving, onClose, onConfirm }) {
  const [typed, setTyped] = useState('')
  const confirmed = typed === item?.name

  return (
    // warning banner + input + buttons
    <input
      value={typed}
      onChange={e => setTyped(e.target.value)}
      style={{
        borderColor: typed.length > 0 ? (confirmed ? '#10b981' : '#f87171') : undefined,
        background:  typed.length > 0 ? (confirmed ? 'rgba(16,185,129,0.04)' : 'rgba(248,113,113,0.04)') : 'rgba(255,247,237,0.5)',
      }}
    />
    <button
      disabled={!confirmed || saving}
      style={{ background: confirmed ? '#ef4444' : '#fca5a5', cursor: confirmed && !saving ? 'pointer' : 'not-allowed' }}
    >
      Delete
    </button>
  )
}
```

Rules:
- Input border turns GREEN when typed === item name exactly
- Input border turns RED while typing but not yet matching
- Delete button is faded pink and `not-allowed` until name matches
- Always show: "Type **[item name]** to confirm deletion" above the input
- Warning banner: "This will permanently delete ... This action cannot be undone."

### LeadsPage Contact Form

**Add Contact** - 3 fields only: Contact Name, Phone Number (country code + number inline), no category selector. The `categoryID` is taken silently from the current drill-down category.

**Edit Contact** - same 3 fields plus a "Move to Category" `SearchableSelect` that lets users relocate the contact to a different category. Changing the category on save moves the contact server-side.

After every create, edit, or delete the page calls both `refreshContacts()` (updates the contacts table) and `fetchCategories()` (updates the `contact_count` on category cards).

### LeadsPage Category Card

```jsx
<div className="bg-white rounded-2xl border border-orange-100 hover:shadow-[0_4px_20px_rgba(234,88,12,0.08)] hover:border-orange-200 transition-all duration-200 overflow-hidden flex flex-col">
  <div className="flex items-start gap-3 px-5 pt-5 pb-3 flex-1">
    <span className="w-3 h-3 rounded-full mt-1" style={{ background: colorFor(cat.categoryID) }} />
    <div>
      <h3 className="text-[14px] font-extrabold text-[#1c0700]">{cat.categoryName}</h3>
      <p className="text-[12px] text-amber-900/45 mt-1 line-clamp-2">{cat.description}</p>
    </div>
  </div>
  <div className="flex items-center justify-between px-5 py-3 border-t border-orange-50 bg-orange-50/20">
    {/* contact count badge + edit/delete icon buttons */}
  </div>
</div>
```

Category color is deterministic from `categoryID` - use a `colorFor(id)` function that sums char codes and indexes into a fixed palette of orange/amber shades. This gives each category a consistent color without storing it.

### InfoRow (key-value pairs in cards)

```jsx
<div className="flex items-center justify-between py-2 border-b border-orange-50 last:border-0">
  <span className="text-[11px] text-amber-900/40 font-medium">Label</span>
  <span className="text-[12px] font-bold text-[#1c0700] capitalize">Value</span>
</div>
```

---

## Dos and Don'ts

### Do
- Fetch country codes via `getCountryCodes()` from `contactsService.js` on mount - never use a static list
- Import `SearchableSelect` from `src/components/common/SearchableSelect.jsx` for any dropdown with search
- Import auth functions from `src/apiservices/loginService.js` - never call auth endpoints directly
- Use `import.meta.env.VITE_API_BASE_URL` for the API base URL
- Use CSS variables (`--primary`, `--text`, etc.) for brand colors in inline styles
- Wrap API calls in try/catch and show the `err.message` to the user

### Don't
- Don't use em dashes (—) or en dashes (–) anywhere - use hyphens (-) or commas
- Don't hardcode API URLs or IP addresses - always use the env variable
- Don't hardcode sub-resource IDs (llmID, voiceID, sttID, promptID, categoryID) - always read from the agent response
- Don't hardcode country codes - always fetch from `getCountryCodes()` (contactsService)
- Don't build a new dropdown component and never use native `<select>` - always use `SearchableSelect`
- Don't use `type="number"` for phone inputs - use `type="text"` + `inputMode="numeric"` to avoid browser spinners
- Don't add an `<h2>` page title inside dashboard pages - the top bar already shows it
- Don't use `<a href="...">` for internal SPA routes - use `<Link to="...">` from react-router-dom
- Don't add `console.log` statements before committing
- Don't call auth endpoints or add token headers manually in page components - use the service functions which handle refresh and redirect automatically
