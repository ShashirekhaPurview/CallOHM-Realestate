# CallOHM Real Estate Product Architecture

## 1. Product Vision

CallOHM is an AI-powered real estate sales framework for builders, developers, agencies, and property sales teams. The product helps real estate businesses upload leads, run AI outbound calling campaigns, qualify prospects, explain project details, collect buyer intent, schedule callbacks, and generate post-call analytics.

The first version should focus on UI with dummy data. Later, the same screens can connect to APIs for live leads, calls, agents, campaign status, analytics, recordings, transcripts, and downloadable reports.

### Target Customers

- Real estate builders and developers such as Aparna, My Home, Candier, and similar project sellers.
- Real estate channel partners and agencies.
- Sales teams handling apartment, villa, plot, commercial, or gated community leads.
- Marketing teams running campaigns and needing faster lead follow-up.
- Management teams needing visibility into call quality, buyer intent, and conversion.

### Core Promise

Turn uploaded real estate leads into qualified site visits, callbacks, and sales opportunities using customizable AI voice agents.

## 2. Inspiration From Reference Products

The product should combine the strongest patterns from the competitor and reference sites:

- Structurely: AI calling, texting, live transfer, appointment setting, CRM integration, and "Try the AI" demo flow.
- Ylopo: Generate leads, AI nurtures them, sales team closes. Strong lead journey visualization.
- Fello: Existing database becomes new deals through AI enrichment and seller/buyer intent detection.
- Real Geeks: Growth platform positioning with website, CRM, leads, automation, and reporting.
- Top Producer: CRM, workflows, smart follow-up, AI writing assistant, and relationship management.
- Offrs: Predictive lead scoring and "first in the door" seller/buyer opportunity framing.
- Cloud CMA / RealReports / HouseCanary: Client-ready reports, property intelligence, market insights, and credibility.
- Virtual Staging AI / Collov / ReimagineHome: Visual before/after proof and frictionless "upload first" action pattern.
- Zillow Premier Agent: Trust, scale, lead-routing clarity, and simple conversion funnel.

## 3. Product Positioning

### Primary Message

AI voice and follow-up automation for real estate teams that turns leads into qualified site visits and booked callbacks.

### Supporting Messages

- Upload your leads and let the AI agent handle first contact.
- Customize the AI agent for each property, project, offer, or campaign.
- Explain property features, pricing, offers, location benefits, amenities, and site visit options.
- Filter cold, warm, and hot leads automatically.
- Trigger smart callbacks when a prospect requests more information.
- Download post-call reports with buyer intent, objections, sentiment, and next steps.
- Give managers a clear view of team performance, campaign progress, and lead quality.

## 4. User Roles

### Super Admin

Owns the full platform, manages tenants/customers, plans, billing, system settings, and global templates.

### Real Estate Admin

Company-level admin for a builder or agency. Manages projects, users, AI agents, contacts, campaigns, analytics, and reports.

### Sales Manager

Creates campaigns, monitors call outcomes, reviews reports, assigns leads, downloads analytics, and tracks conversions.

### Sales Executive

Views assigned hot leads, listens to summaries, calls prospects manually if needed, updates lead status, and manages follow-up.

### Analyst / Viewer

Can access dashboards and reports without changing campaigns or lead data.

## 5. High-Level Application Structure

The product should have two main experiences:

- Public marketing website: landing pages used to sell CallOHM to real estate companies.
- Authenticated dashboard: operational product used by customers after login.

Recommended route groups:

- `/` - Landing page
- `/features` - Feature overview
- `/solutions` - Solutions by audience
- `/pricing` - Plan or demo-based pricing
- `/case-studies` - Success stories
- `/login` - Login
- `/forgot-password` - Password recovery
- `/app` - Authenticated home dashboard
- `/app/analytics` - Analytics dashboard
- `/app/agents` - AI agent management
- `/app/agents/:id` - Agent detail and configuration
- `/app/projects` - Real estate projects/inventory
- `/app/contacts` - Lead/contact database
- `/app/contacts/import` - Upload/import leads
- `/app/campaigns` - Outbound calling campaigns
- `/app/campaigns/new` - Campaign builder
- `/app/campaigns/:id` - Campaign detail
- `/app/calls` - Call logs
- `/app/calls/:id` - Call detail with transcript and analytics
- `/app/reports` - Downloadable reports
- `/app/tasks` - Follow-ups and callbacks
- `/app/settings` - Workspace, users, integrations, billing, compliance

## 6. Public Landing Page Architecture

### 6.1 Header

Content:

- Logo
- Product
- Solutions
- Pricing
- Resources
- Login
- Primary CTA: "Book Demo" or "Try AI Call"

Design:

- Clean SaaS navigation.
- Sticky header on scroll.
- CTA should stand out but not dominate.

### 6.2 Hero Section

Goal: Immediately explain the outcome.

Suggested headline:

AI voice agents that turn real estate leads into qualified site visits.

Suggested subcopy:

Upload your leads, customize an AI sales agent for each project, and let CallOHM call, qualify, follow up, and report on every conversation.

Primary CTA:

- Try AI Call

Secondary CTA:

- Book a Demo

Hero visual:

- Dashboard preview showing active campaign, call queue, hot leads, and conversion stats.
- Optional "live demo call" mini form where the user enters a phone number to experience the AI agent.

### 6.3 How It Works

Use a 4-step flow:

1. Upload leads
2. Configure AI agent and project script
3. Run outbound calling campaign
4. Review qualified leads, callbacks, and reports

### 6.4 Feature Highlights

Recommended feature cards:

- AI outbound calling
- Custom AI agents
- Lead import and enrichment
- Real estate project knowledge base
- Smart qualification
- Callback automation
- Site visit scheduling
- Post-call analytics
- Downloadable reports
- CRM and webhook integrations

### 6.5 Real Estate Use Cases

Sections or tabs:

- New apartment launch
- Villa project campaign
- Plot sales campaign
- Commercial property campaign
- Resale lead follow-up
- Old database reactivation
- Event or expo lead follow-up

### 6.6 Trust And Proof

Use placeholders in V1:

- "Built for high-volume real estate sales teams"
- "Handle thousands of leads without increasing calling staff"
- "Track every conversation from first call to site visit"
- "Designed for builders, agencies, and channel partners"

Later add:

- Client logos
- Testimonials
- Case studies
- Conversion metrics

### 6.7 Reports Preview

Show sample report cards:

- Campaign performance
- Hot lead summary
- Call disposition
- Lead intent score
- Objection analysis
- Callback schedule
- Site visit interest
- Download PDF / CSV

### 6.8 Final CTA

Suggested copy:

Ready to convert your next lead list into booked conversations?

CTA:

- Book Demo
- Try AI Call

## 7. Authenticated Dashboard Pages

## 7.1 App Home

Purpose:

Give the customer a command center view after login.

Key widgets:

- Total leads uploaded
- Calls completed today
- Calls pending
- Hot leads
- Callbacks requested
- Site visits scheduled
- Average call duration
- Conversion rate
- Active campaigns
- Recent call outcomes

Primary actions:

- Upload leads
- Create campaign
- Configure AI agent
- Download report

Dummy data examples:

- 8,420 total leads
- 1,236 calls completed
- 284 interested leads
- 63 callbacks requested
- 41 site visits scheduled

## 7.2 Analytics

Purpose:

Show performance across campaigns, agents, projects, and lead sources.

Charts:

- Calls completed over time
- Lead status funnel
- Campaign conversion comparison
- Call disposition breakdown
- Interest score distribution
- Callback trend
- Site visit bookings
- Agent performance
- Project-wise response rate

Filters:

- Date range
- Project
- Campaign
- AI agent
- Lead source
- City/location
- Status

Metrics:

- Dialed leads
- Connected calls
- Interested leads
- Not interested leads
- Follow-up required
- Wrong numbers
- Unanswered calls
- Callback requested
- Site visit scheduled
- Lead-to-site-visit rate

## 7.3 AI Agents

Purpose:

Create and customize AI agents for each customer, project, or campaign.

List page columns:

- Agent name
- Assigned project
- Language
- Voice style
- Active campaigns
- Calls handled
- Conversion rate
- Status

Agent configuration:

- Agent name
- Voice selection
- Language selection
- Tone: professional, friendly, premium, consultative
- Greeting script
- Project pitch
- Qualification questions
- Objection handling rules
- Callback logic
- Site visit scheduling logic
- Escalation to human sales executive
- Compliance disclaimer
- Knowledge base files
- Test call button

Suggested agent examples:

- Aparna Sales Assistant
- My Home Bhuja Project Advisor
- Candier Lead Qualifier
- Premium Villa Consultant
- Plot Sales Follow-up Agent

## 7.4 Projects

Purpose:

Store property/project information that AI agents use during calls.

Project fields:

- Project name
- Developer name
- Property type
- Location
- Price range
- Unit types
- Sizes
- Amenities
- Offers
- Possession date
- RERA details
- Brochure
- Site visit address
- Nearby landmarks
- FAQs
- Objection responses

Pages:

- Project list
- Project detail
- Project knowledge base
- Project analytics

## 7.5 Contacts

Purpose:

Manage uploaded leads and their statuses.

List columns:

- Name
- Phone
- Email
- City
- Source
- Interested project
- Lead score
- Status
- Last call result
- Next follow-up
- Assigned user

Statuses:

- New
- Queued
- Calling
- Connected
- Interested
- Callback requested
- Site visit scheduled
- Not interested
- Unreachable
- Invalid number
- Converted

Actions:

- Upload CSV/XLSX
- Add manually
- Assign to campaign
- Export selected
- Update status
- View call history

Import flow:

1. Upload file
2. Map columns
3. Validate phone numbers
4. Remove duplicates
5. Preview leads
6. Import contacts

## 7.6 Outbound Calling Campaigns

Purpose:

Run structured calling campaigns using selected contacts, projects, and AI agents.

Campaign list columns:

- Campaign name
- Project
- AI agent
- Total leads
- Calls completed
- Interested leads
- Callback requests
- Site visits
- Status
- Start date

Campaign builder steps:

1. Campaign details
2. Select project
3. Select or create AI agent
4. Upload/select contacts
5. Configure calling schedule
6. Configure retry rules
7. Configure callback rules
8. Review and launch

Settings:

- Calling hours
- Max call attempts
- Retry interval
- Timezone
- Language
- Transfer to human number
- Callback window
- Daily call limit
- Do-not-call rules

## 7.7 Call Logs

Purpose:

Show every call made by AI agents.

List columns:

- Contact
- Phone
- Campaign
- Agent
- Call status
- Duration
- Intent score
- Sentiment
- Outcome
- Recording
- Timestamp

Call detail page:

- Call recording player
- Transcript
- AI summary
- Lead qualification result
- Extracted preferences
- Objections
- Callback requested
- Site visit interest
- Next recommended action
- Manual notes

## 7.8 Reports

Purpose:

Generate client-ready and manager-ready reports.

Report types:

- Campaign performance report
- Hot leads report
- Callback report
- Site visit report
- Agent performance report
- Contact status report
- Call quality report
- Objection analysis report
- Project interest report
- Daily/weekly/monthly executive summary

Download formats:

- PDF
- CSV
- XLSX

Report filters:

- Date range
- Project
- Campaign
- Agent
- Lead source
- Lead status

## 7.9 Tasks And Callbacks

Purpose:

Make follow-up actionable for human sales teams.

Task types:

- Call back prospect
- Send brochure
- Schedule site visit
- Share price sheet
- Transfer to senior sales manager
- Mark as not interested

List columns:

- Task
- Contact
- Project
- Due date
- Priority
- Assigned user
- Status

## 7.10 Settings

Sections:

- Company profile
- Users and roles
- Phone numbers
- Integrations
- Notification settings
- Billing and plan
- Compliance settings
- Data import templates
- API keys and webhooks

## 8. Common Components

### Navigation Components

- Public header
- Public footer
- App sidebar
- App topbar
- Breadcrumbs
- User menu
- Workspace switcher

### Dashboard Components

- Metric card
- Trend card
- Status badge
- Progress bar
- Funnel chart
- Line chart
- Bar chart
- Donut chart
- Recent activity feed
- Empty state
- Loading skeleton

### Data Components

- Data table
- Table filters
- Search input
- Date range picker
- Column visibility control
- Bulk action toolbar
- Pagination
- Import preview table

### Real Estate Components

- Project card
- Lead profile card
- Lead score badge
- Call outcome badge
- Campaign status chip
- Site visit card
- Callback card
- Project knowledge panel
- Amenity list
- Offer banner

### AI Agent Components

- Agent card
- Voice selector
- Tone selector
- Language selector
- Script editor
- Qualification question builder
- Objection handling editor
- Knowledge base uploader
- Test call panel

### Calling Components

- Call queue panel
- Call status timeline
- Call recording player
- Transcript viewer
- AI summary card
- Intent score indicator
- Sentiment indicator
- Next action panel

### Report Components

- Report template card
- Report filter drawer
- Download menu
- Scheduled report settings
- PDF preview panel

### Form Components

- Text input
- Phone input
- Email input
- Select
- Multi-select
- Toggle
- Checkbox
- Radio group
- Stepper
- File uploader
- Time window picker
- Validation message

### Feedback Components

- Toast notification
- Confirmation modal
- Error alert
- Success banner
- Unsaved changes prompt

## 9. Dummy Data Strategy

For the first UI phase, use local mock data grouped by domain:

- `mockAgents`
- `mockProjects`
- `mockContacts`
- `mockCampaigns`
- `mockCalls`
- `mockReports`
- `mockTasks`
- `mockAnalytics`

Recommended dummy projects:

- Aparna Lake Breeze
- My Home Bhuja
- Candier Heights
- Urban Nest Villas
- Skyline Commercial Hub

Recommended dummy lead sources:

- Facebook Ads
- Google Ads
- Property Expo
- Website Form
- Channel Partner
- Old CRM Database
- Walk-in List

Recommended dummy outcomes:

- Interested in 3BHK
- Requested callback tomorrow
- Wants brochure on WhatsApp
- Asked about price
- Asked about location
- Site visit scheduled
- Budget mismatch
- Not reachable
- Wrong number

## 10. Future API Integration Points

### Authentication

- Login
- Logout
- Refresh session
- Forgot password
- User profile
- Role permissions

### Leads

- Upload contacts
- Validate contacts
- Fetch contacts
- Update contact
- Delete contact
- Bulk assign contacts
- Export contacts

### AI Agents

- Create agent
- Update agent
- Fetch agents
- Test agent call
- Upload knowledge base
- Fetch agent performance

### Projects

- Create project
- Update project
- Fetch project
- Upload brochure
- Add FAQs
- Add offers

### Campaigns

- Create campaign
- Start campaign
- Pause campaign
- Stop campaign
- Fetch campaign progress
- Retry failed calls

### Calls

- Start outbound call
- Fetch call logs
- Fetch transcript
- Fetch recording
- Fetch post-call analytics
- Trigger callback
- Transfer to human

### Reports

- Generate report
- Download report
- Schedule report
- Email report

### Integrations

- CRM integrations
- Webhooks
- Calendar integrations
- WhatsApp/SMS integrations
- Email integrations

## 11. Suggested Data Models

### Contact

- id
- name
- phone
- email
- city
- source
- interestedProjectId
- budget
- propertyPreference
- status
- score
- assignedTo
- lastCallAt
- nextFollowUpAt
- tags
- notes

### Agent

- id
- name
- voice
- language
- tone
- projectIds
- greetingScript
- qualificationQuestions
- objectionRules
- callbackRules
- status
- createdAt

### Project

- id
- name
- developer
- type
- location
- priceRange
- unitTypes
- amenities
- offers
- possessionDate
- brochureUrl
- reraNumber
- faqs

### Campaign

- id
- name
- projectId
- agentId
- status
- totalContacts
- completedCalls
- interestedCount
- callbackCount
- siteVisitCount
- startDate
- schedule
- retryRules

### Call

- id
- contactId
- campaignId
- agentId
- phone
- status
- duration
- recordingUrl
- transcript
- summary
- sentiment
- intentScore
- outcome
- objections
- nextAction
- createdAt

### Report

- id
- name
- type
- filters
- generatedBy
- generatedAt
- format
- downloadUrl

## 12. UI Design Direction

### Visual Style

- Professional real estate SaaS.
- Clean, premium, operational dashboard feel.
- Avoid overly decorative marketing visuals inside the app.
- Use strong product screenshots and dashboard previews on landing pages.
- Use compact, scannable dashboard layouts after login.

### Suggested Color System

- Primary: deep green or teal for trust and growth.
- Accent: warm gold or amber for premium real estate cues.
- Neutral: white, slate, soft gray.
- Status colors: green for interested, blue for scheduled, amber for callback, red for invalid/not interested.

### Typography

- Use clean sans-serif fonts.
- Large hero heading on landing page.
- Smaller, dense headings inside dashboard panels.
- Avoid oversized text inside operational UI.

### Interaction Patterns

- Use tabs for Analytics sections.
- Use steppers for campaign creation and lead import.
- Use modals only for confirmation or short focused actions.
- Use side drawers for filters and record details.
- Use badges and chips for statuses.
- Use clear empty states with primary action buttons.

## 13. MVP Scope

### Phase 1: Static UI With Dummy Data

Build:

- Landing page
- Login page
- App home dashboard
- Analytics page
- AI agents list and detail
- Projects page
- Contacts page with import UI
- Campaign list and campaign builder
- Call logs and call detail
- Reports page
- Tasks/callbacks page
- Settings page

No backend required. Use local mock data and client-side routing.

### Phase 2: API-Ready Frontend

Build:

- Data service layer
- Loading states
- Error states
- Empty states
- Auth guards
- Form validation
- Mock API adapter that can later be replaced with real endpoints

### Phase 3: Real Integrations

Integrate:

- Authentication
- Contact upload
- Calling provider
- AI agent backend
- Call transcript and recording
- Analytics APIs
- Report generation
- CRM/webhook integrations

## 14. Recommended Build Order

1. Define layout shell, theme, and route structure.
2. Build public landing page.
3. Build login page.
4. Build authenticated sidebar/topbar layout.
5. Build dashboard home with dummy metrics.
6. Build contacts and import flow.
7. Build AI agents pages.
8. Build projects and knowledge base pages.
9. Build campaigns and campaign builder.
10. Build call logs and call detail.
11. Build analytics.
12. Build reports.
13. Build tasks and settings.
14. Add responsive polish and empty/loading/error states.

## 15. Success Criteria

The first UI version should make it easy for a real estate client to understand:

- What CallOHM does.
- How their uploaded leads become AI-powered calls.
- How AI agents can be customized per project.
- How leads are qualified and filtered.
- How callbacks and site visits are tracked.
- How managers can download reports and measure performance.
- How the product can help them convert more leads and make more money.

