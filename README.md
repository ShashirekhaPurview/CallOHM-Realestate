# CallOHM Real Estate - Landing Website

Marketing and lead generation website for CallOHM's AI-powered outbound calling platform, targeting real estate builders and sales teams.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Vite | 8 | Build tool and dev server |
| lucide-react | latest | Icon library |

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Environment Variables

Copy `.env.example` to `.env` and set your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Base URL of the CallOHM backend API (e.g. `http://192.168.0.191:7860`) |

Never commit `.env` - it is gitignored. Always use `.env.example` to document new variables.

## Project Structure

```
src/
  pages/
    dashboard/     # Dashboard page components (one per route)
  layouts/
    DashboardLayout.jsx  # Sidebar + top bar wrapper for all /dashboard/* routes
  components/
    LandingPage/   # Landing page section components
    common/        # Reusable UI components (use these everywhere)
  apiservices/     # API call functions (one file per service domain)
    loginService.js      # Auth: login, logout, refreshToken, getMe, tokenStorage
    agentService.js      # Agent: getAgentById, getFullAgentById, getLLM, getVoice, etc.
    categoriesService.js # Categories: getCategories, searchCategories, createCategory, updateCategory, deleteCategory
    contactsService.js   # Contacts: getContacts, createContact, updateContact, deleteContact, searchContacts, downloadTemplate, uploadContacts, getCountryCodes
  assets/          # Images and static files
  App.jsx          # Router with all routes
  App.css          # Global animations and component classes
  index.css        # Base styles and CSS variables
```

See `DESIGN_SYSTEM.md` for the full component reference, color palette, typography scale, and reusable patterns.

## Pages and Routes

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | LandingPage | Homepage with all marketing sections |
| `/login` | LoginPage | User authentication |
| `/book-demo` | BookDemoPage | Demo booking form |
| `/pricing` | PricingPage | Pricing tiers |
| `/about` | AboutPage | Company information |
| `/leadership` | LeadershipPage | Leadership team |
| `/contact` | ContactPage | Contact options |
| `/faq` | FAQPage | FAQ accordion |
| `/brochure` | BrochurePage | Product brochure |
| `/privacy` | PrivacyPolicyPage | Privacy policy |
| `/terms` | TermsOfServicePage | Terms of service |
| `/cookies` | CookiePolicyPage | Cookie policy |

### Dashboard Routes (protected - redirect to `/login` if not authenticated)

All dashboard routes are nested under `DashboardLayout` which provides the sidebar, top bar, and auth guard.

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | DashboardPage | Overview with metrics, recent calls |
| `/dashboard/agent` | AgentPage | View and manage AI agents (tabbed: Default / Company) |
| `/dashboard/leads` | LeadsPage | Category management (list, create, edit, delete with type-to-confirm) + contacts drill-down per category (search, add, edit, upload, download template, delete, paginated) |
| `/dashboard/calls` | CallsPage | Call history and recordings |
| `/dashboard/analytics` | AnalyticsPage | Call analytics and reporting |
| `/dashboard/campaigns` | CampaignsPage | Campaign management |
| `/dashboard/settings` | SettingsPage | Account and system settings |

## Build

```bash
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

## Code Standards

- No em dashes (—) or en dashes (–) anywhere - use hyphens (-) or commas
- All API base URLs must come from `import.meta.env.VITE_API_BASE_URL` - never hardcode
- Always use IDs returned from API responses - never hardcode sub-resource IDs (llmID, voiceID, etc.)
- Reuse components from `src/components/common/` before building new ones
- Reuse data from `src/data/` before duplicating arrays
- Keep API calls in `src/apiservices/` - never fetch directly from page components
- No `console.log` before committing
