# Capitol CRM — Architecture Plan

> **Status:** Planning phase
> **Route:** `app.improveitmd.com/crm` (Authelia-protected)
> **Stack:** Python Flask + PostgreSQL + n8n workflows
> **Date:** 2026-03-12

---

## 1. Philosophy: App as Source of Truth, n8n as the Brain

The CRM app owns the **data model and UI**. n8n owns **automations, integrations, and side-effects**. Every state change in the app emits a webhook event to n8n. n8n never writes directly to the CRM database — it calls back through the API.

```
[CRM App]  ──webhook──>  [n8n]  ──api call──>  [QuickBooks / Twilio / Gmail / etc.]
    ^                      |
    └──── api callback ────┘
```

This keeps the app simple and the automations replaceable. If a workflow breaks, the data is still clean. If you swap Twilio for another SMS provider, you change one n8n workflow — the app doesn't care.

---

## 2. Core Data Model

```
Contact (homeowner)
  └── Lead (1 contact → N leads, one per inquiry)
       └── Job (1 lead → N jobs: roofing, siding, gutters, etc.)
            ├── Appointment (sales / install / service)
            ├── Document (contracts, photos, estimates, warranties, measurements)
            ├── Task (follow-ups, checklist items, reminders)
            ├── Payment (deposits, finals, financing applications)
            └── Note (free-text activity log)

Pipeline / Stage
  └── Each Job has a current_stage within a pipeline
  └── Stage transitions emit events for n8n

User / Rep
  └── Assigned to leads, jobs, appointments
  └── Has role (admin, sales_rep, install_manager, installer, receptionist)

LeadSource
  └── Config per source (Google LSA, GMB, Yelp, Angi, Website, etc.)
  └── Maps to UTM or source identifier
```

### Key tables (PostgreSQL)

| Table | Key Fields | Relations |
|-------|-----------|-----------|
| `contacts` | name, email, phone, address, city, state, zip | 1→N leads |
| `leads` | source, source_ref, status, assigned_to | N→1 contact, 1→N jobs |
| `jobs` | type (roofing/siding/etc), pipeline, current_stage, value, commission_code | N→1 lead, 1→N appointments/docs/tasks/payments |
| `appointments` | type (sales/install/service), scheduled_at, assigned_to, location, status | N→1 job |
| `documents` | type (contract/photo/estimate/measurement/warranty), file_url, tags | N→1 job |
| `tasks` | type (call-back/checklist/reminder), due_at, completed_at, assigned_to | N→1 job |
| `payments` | type (deposit/final/financing), amount, method, status, qb_invoice_id | N→1 job |
| `notes` | body, created_by, created_at | N→1 job or lead |
| `stages` | pipeline, name, position, auto_tasks_json | — |
| `events` | entity_type, entity_id, event_type, old_value, new_value, created_at | audit trail + n8n trigger |
| `users` | name, email, phone, role, photo_url | — |
| `lead_sources` | name, type, config_json | — |

### Pipeline definitions

**Lead Pipeline:** New → Contact Attempted → Qualified → Appointment Set → Disqualified

**Sales Pipeline:** Appointment Scheduled → Proposal Sent → Follow-up → Sold → Lost

**Install Pipeline:** Pending Approval → Approved → Materials Ordered → Scheduled → In Progress → Completed → Punch List

**Accounting Pipeline:** Billing → Payment Sent → Paid → Closed

**Service Pipeline:** Service Request → Scheduled → Completed

Each Job sits in exactly one pipeline at a time. Stage transitions create an event row → n8n picks it up.

---

## 3. App Architecture

### Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Backend | Flask + Blueprints | Consistent with existing form-api, backup-dashboard. Already battle-tested on this VPS. |
| Database | PostgreSQL (Docker) | Relational data with proper FK constraints. Shared Docker network with existing services. |
| ORM | SQLAlchemy | Industry standard for Flask + PostgreSQL. Migration support via Alembic. |
| Auth | Authelia SSO | Already protecting app.improveitmd.com. CRM gets it for free. |
| Frontend | Server-rendered HTML + HTMX + Alpine.js | No build step, fast to develop, mobile-friendly. HTMX gives SPA-like feel without React complexity. Kanban drag-drop via Alpine.js or Sortable.js. |
| File storage | Local uploads dir (or S3-compatible later) | Photos, contracts, PDFs. Served via Caddy. |
| Automations | n8n webhooks | Every stage change, appointment creation, payment update → webhook to n8n. |

### Blueprint structure

```
/root/capitol_crm/
├── app.py                    # Flask app factory
├── config.py                 # DB URL, n8n webhook URLs, etc.
├── models/                   # SQLAlchemy models
│   ├── contact.py
│   ├── lead.py
│   ├── job.py
│   ├── appointment.py
│   ├── document.py
│   ├── task.py
│   ├── payment.py
│   └── event.py
├── blueprints/
│   ├── dashboard/            # Main overview, today's tasks, KPIs
│   ├── leads/                # Lead list, detail, intake
│   ├── jobs/                 # Job detail, stage management, kanban
│   ├── appointments/         # Calendar, scheduling
│   ├── documents/            # Upload, gallery, viewer
│   ├── accounting/           # Invoicing, payments, QB sync
│   └── api/                  # JSON API for n8n callbacks + mobile
├── templates/                # Jinja2 + HTMX partials
├── static/                   # CSS, JS (Alpine.js, Sortable.js, HTMX)
├── migrations/               # Alembic
└── docker-compose.yml        # CRM app + PostgreSQL
```

### Routing under `/crm`

Caddy config (inside `app.improveitmd.com` route block):
```
handle_path /crm/* {
    reverse_proxy 127.0.0.1:5010
    header_up X-Forwarded-Prefix "/crm"
}
```

Systemd service: `crm.service` on port 5010.

---

## 4. Lead Intake — Unified via n8n

Every lead source normalizes to ONE endpoint: `POST /crm/api/leads/create`

| Source | How it gets to n8n | n8n workflow |
|--------|-------------------|--------------|
| Website forms | Already posting to form-api → n8n webhook | `lead-intake-website`: parse payload, call CRM API |
| Google LSA | Email notifications → n8n IMAP node → parse | `lead-intake-gls`: extract name/phone/service from email body |
| Google My Business | UTM tracking already in place | `lead-intake-gmb`: same as website with source=gmb |
| Yelp | Email parsing OR Yelp API (if available) | `lead-intake-yelp`: parse lead email or poll API |
| Angi | Email parsing | `lead-intake-angi`: parse Angi lead notification emails |
| Nextdoor | Email parsing | `lead-intake-nextdoor`: parse notification |
| Manual entry | CRM UI form | Direct — no n8n needed |

### Lead deduplication

Before creating a new lead, check:
1. Exact phone match → link to existing contact, create new lead
2. Exact email match → same
3. Fuzzy name + address → flag for manual review

This prevents the "same homeowner from GMB and website = two contacts" problem.

---

## 5. n8n Workflow Groups

Organized by domain, not by trigger. Each workflow is self-contained.

### Group: `lead-*`
| Workflow | Trigger | Actions |
|----------|---------|---------|
| `lead-intake-website` | Form-api webhook | Normalize → dedupe → POST /crm/api/leads/create |
| `lead-intake-gls` | IMAP (Google LSA emails) | Parse email → extract fields → POST /crm/api/leads/create |
| `lead-intake-yelp` | IMAP or scheduled poll | Parse → POST /crm/api/leads/create |
| `lead-no-contact` | CRM webhook: lead.stage → "Contact Attempted" | Create follow-up task (due in 2 hours) |
| `lead-assign` | CRM webhook: lead.created | Auto-assign based on location/source rules |

### Group: `appointment-*`
| Workflow | Trigger | Actions |
|----------|---------|---------|
| `appointment-created` | CRM webhook | Send SMS intro to homeowner (rep name + photo) via Twilio. Send rep notification. Create Google Calendar event. |
| `appointment-reminder-dayof` | n8n cron (7am daily) | Query today's appointments → send SMS/email to homeowner |
| `appointment-on-the-way` | CRM webhook: appointment.on_the_way | Send SMS: "{RepName} is on the way" |
| `appointment-rescheduled` | CRM webhook: appointment.updated | Update calendar, notify homeowner + rep |

### Group: `sales-*`
| Workflow | Trigger | Actions |
|----------|---------|---------|
| `sales-proposal-send` | CRM webhook: job.stage → "Proposal Sent" | Generate PDF proposal → email to homeowner |
| `sales-follow-up` | CRM webhook: job.stage → "Follow-up" | Create task chain based on follow_up_reason |
| `sales-financing` | CRM webhook: financing.applied | Track lender sequence (Greensky → Service Finance → Enerbank) |
| `sales-sold` | CRM webhook: job.stage → "Sold" | Validate checklist (contract + deposit/financing) → notify install manager |

### Group: `install-*`
| Workflow | Trigger | Actions |
|----------|---------|---------|
| `install-approved` | CRM webhook: job.stage → "Approved" | Notify install manager, lock sales fields |
| `install-materials` | CRM webhook: materials_list.created | Email materials list PDF to distributor |
| `install-delivery-scheduled` | CRM webhook: materials_list.delivery_date set | Email homeowner: "Materials arriving {date}" |
| `install-crew-notify` | CRM webhook: install appointment.created | SMS crew night before (8pm) + morning of (5am). Calendar invite. |
| `install-reschedule` | CRM webhook: install appointment.updated | Notify homeowner + crew of date change |

### Group: `accounting-*`
| Workflow | Trigger | Actions |
|----------|---------|---------|
| `accounting-invoice` | CRM webhook: job.stage → "Billing" | Create QuickBooks invoice → generate payment link → email to homeowner |
| `accounting-payment-received` | QBO webhook or n8n poll | Update payment status in CRM → send thank-you email with receipt |
| `accounting-fee-calc` | Before payment link creation | Calculate card processing fee → add line item |

### Group: `review-*`
| Workflow | Trigger | Actions |
|----------|---------|---------|
| `review-request` | CRM webhook: job.stage → "Get Review" | Text + email sales rep: "Call {customer} for review today" |
| `review-send-link` | CRM webhook: review.rep_confirmed | Send Google review link to homeowner |

---

## 6. Key Integrations

### QuickBooks Online
- **n8n has a native QBO node** — create customers, invoices, payments, estimates
- Invoice creation: triggered when job enters "Billing" stage
- Payment sync: n8n polls QBO every 15 min for paid invoices → updates CRM
- Processing fee: added as line item before generating payment link
- Reconciliation stays in QBO (bank feed) — CRM reflects status only

### Twilio (SMS)
- **n8n has a native Twilio node** — send SMS, receive replies
- Appointment intro: homeowner gets rep name + photo link + phone number
- Day-of reminders: cron workflow at 7am
- "On the way" notification: triggered by rep button in CRM
- No group SMS (unreliable across carriers) — send separate messages

### Google Local Services
- No clean webhook API available
- **Best approach:** n8n IMAP node monitors a dedicated Gmail inbox for GLS notification emails → parses name/phone/service → creates lead via CRM API
- Alternative: Google Ads API `local_services_lead_conversation` resource for programmatic access (requires Google Ads manager account)

### GAF QuickMeasure / EagleView
- "Order Measurement" button in CRM → opens provider portal (prefilled if possible)
- Completion tracking: n8n monitors email for "report ready" notifications → updates Job.measurement_status → notifies rep
- Report PDF stored as Document on the Job

---

## 7. UI Pages (MVP)

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/crm/` | Today's tasks, new leads count, pipeline summary, KPIs |
| Leads | `/crm/leads` | Filterable list + quick actions (assign, schedule, disqualify) |
| Lead Detail | `/crm/leads/{id}` | Contact info, lead history, create job, schedule appointment |
| Jobs Board | `/crm/jobs` | Kanban view by pipeline/stage. Drag to change stage. Filters by type. |
| Job Detail | `/crm/jobs/{id}` | Full view: stage, documents, tasks, payments, appointments, notes, timeline |
| Appointments | `/crm/appointments` | Calendar view (day/week). Create/edit. "On the way" button. |
| Documents | `/crm/jobs/{id}/documents` | Upload photos/contracts. Gallery view. Categorize (before/during/after). |
| Accounting | `/crm/accounting` | Jobs in billing stage. Invoice status. Payment tracking. |
| Settings | `/crm/settings` | Pipeline stages, notification templates, lead sources, user management, n8n webhook URLs |

### Mobile-first
- HTMX + responsive CSS = works on phone without native app
- Rep can: view next appointment, tap "on the way", upload photos, add notes
- No app store deployment needed

---

## 8. Event System (the glue)

Every mutation in the CRM creates an event row:

```sql
INSERT INTO events (entity_type, entity_id, event_type, old_value, new_value, user_id, created_at)
VALUES ('job', 42, 'stage_changed', 'Proposal Sent', 'Sold', 3, NOW());
```

A background thread (or async worker) sends new events to n8n:

```python
POST {N8N_CRM_WEBHOOK_URL}
{
    "event": "job.stage_changed",
    "entity_type": "job",
    "entity_id": 42,
    "old_value": "Proposal Sent",
    "new_value": "Sold",
    "user_id": 3,
    "job": { ... full job data ... },
    "contact": { ... },
    "timestamp": "2026-03-12T14:30:00Z"
}
```

n8n receives ALL events on one webhook, then uses a Switch node to route to the right sub-workflow. This means:
- **One webhook URL** to configure, not dozens
- n8n decides what to do based on `event.event_type`
- Skipped stages still fire — n8n sees the transition and decides

---

## 9. Build Phases

### Phase 1: Foundation (Week 1-2)
- [ ] PostgreSQL Docker container + SQLAlchemy models + Alembic migrations
- [ ] Flask app with Blueprints, Caddy routing under /crm
- [ ] Contact + Lead + Job + Stage models
- [ ] Lead list + detail pages (HTMX)
- [ ] Manual lead creation form
- [ ] Basic Kanban board for jobs
- [ ] Event system + n8n webhook emitter

### Phase 2: Lead Intake (Week 2-3)
- [ ] `POST /crm/api/leads/create` endpoint (for n8n)
- [ ] n8n `lead-intake-website` workflow (form-api → CRM)
- [ ] n8n `lead-intake-gls` workflow (email parsing)
- [ ] Lead deduplication logic
- [ ] Lead assignment rules
- [ ] Follow-up task automation

### Phase 3: Sales Process (Week 3-4)
- [ ] Appointment model + calendar UI
- [ ] Document upload (photos, contracts)
- [ ] Task/checklist system (auto-created per stage)
- [ ] Proposal PDF generation
- [ ] n8n appointment workflows (SMS intro, reminders, on-the-way)
- [ ] Commission/pricing matrix

### Phase 4: Installation (Week 4-5)
- [ ] Install pipeline stages + approval workflow
- [ ] Materials list + distributor email
- [ ] Crew assignment + calendar
- [ ] Installer upload (before/during/after photos)
- [ ] Work order PDF generation

### Phase 5: Accounting & Closing (Week 5-6)
- [ ] QuickBooks integration via n8n
- [ ] Payment tracking + invoice generation
- [ ] Payment link (QBO Payments or Stripe)
- [ ] Processing fee calculation
- [ ] Thank-you email automation
- [ ] Review request workflow

### Phase 6: Polish (Week 6-7)
- [ ] Customer portal page (per-job public URL)
- [ ] Dashboard KPIs (leads/week, close rate, revenue, avg cycle time)
- [ ] Reporting / CSV export
- [ ] Mobile optimization pass
- [ ] Template editor for email/SMS notifications

---

## 10. What NOT to build (let n8n handle it)

| Capability | Why n8n, not the app |
|-----------|---------------------|
| Email sending | n8n Gmail/SMTP node — templates live in app, sending in n8n |
| SMS sending | n8n Twilio node — swappable provider |
| Calendar sync | n8n Google Calendar node — app just stores appointments |
| QuickBooks sync | n8n QBO node — invoice/payment CRUD |
| PDF generation | Could go either way — app generates, n8n emails |
| Scheduled reminders | n8n cron — morning-of reminders, follow-up nudges |
| Email parsing (lead intake) | n8n IMAP — GLS, Yelp, Angi lead emails |
| Lender integrations | n8n HTTP — application status tracking |

The app should NEVER directly call Twilio, Gmail, QuickBooks, etc. Always go through n8n. This makes every integration independently testable, replaceable, and debuggable.

---

## 11. Deployment on VPS

```
Port 5010: CRM Flask app (systemd: crm.service)
Port 5432: CRM PostgreSQL (Docker, network: crm-prod)
Caddy: app.improveitmd.com/crm/* → 127.0.0.1:5010
Auth: Authelia (already in place)
Backups: pg_dump cron alongside Strapi backup
```

No additional infrastructure needed. Fits within existing VPS resources.

---

## Sources

- [n8n CRM Workflow Automation](https://n8n.io/supercharge-your-crm/)
- [n8n Lead Management Automation](https://n8n.io/automate-lead-management/)
- [n8n QuickBooks Online Integration](https://n8n.io/integrations/quickbooks-online/)
- [n8n Twilio Appointment Reminders Template](https://n8n.io/workflows/6932-send-automated-appointment-reminders-via-sms-with-twilio-webhook/)
- [n8n Event-Driven Architecture with Webhooks](https://medium.com/@Nexumo_/8-event-driven-architectures-with-webhooks-queues-and-n8n-34f08e3a8a43)
- [n8n Webhook Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Google Local Services API Overview](https://developers.google.com/local-services-ads/guides/local-services-api-overview)
- [QuickBooks API Documentation](https://apitracker.io/a/quickbooks)
- [Python QuickBooks Integration Guide](https://hevodata.com/learn/python-quickbooks/)
- [Flask Blueprints Architecture (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy)
- [CRM Database Schema Example](https://www.dragonflydb.io/databases/schema/crm)
- [CRM ER Diagram Design (GeeksForGeeks)](https://www.geeksforgeeks.org/dbms/how-to-design-er-diagrams-for-customer-relationship-management-crm-software/)
- [EeazyCRM - Open Source Flask CRM](https://github.com/jagjot2008/EeazyCRM)
- [EasyCRM - Minimal Flask CRM](https://github.com/cghall/EasyCRM)
- [5 Ways to Automate CRM with n8n](https://bitskingdom.com/blog/crm-automation-with-n8n/)
- [n8n 2026 Automation Guide](https://medium.com/@aksh8t/n8n-workflow-automation-the-2026-guide-to-building-ai-powered-workflows-that-actually-work-cd62f22afcc8)
