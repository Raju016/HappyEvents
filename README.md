# HappyEvents – Modern Luxury Event Planning & Production Platform

> **"Where Every Celebration Becomes a Beautiful Memory."**  
> Full-service luxury wedding planning, stage decoration, concert production, corporate summits, and bespoke event management.

[![Frontend: React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Backend: Node.js / Express](https://img.shields.io/badge/Backend-Node.js%2022%20%7C%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Database: Prisma / PostgreSQL](https://img.shields.io/badge/Database-Prisma%20%7C%20PostgreSQL-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![AI: Groq LLaMA 3.3](https://img.shields.io/badge/AI%20Concierge-Groq%20SDK-F55036)](https://groq.com/)
[![Docker Compose](https://img.shields.io/badge/Deployment-Docker%20Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## 1. Executive Summary

**HappyEvents** is an international-grade, modern luxury event planning, stage decoration, and technical production platform. Designed with an editorial aesthetic and built on enterprise full-stack web standards, the platform provides clients with an immersive discovery journey, real-time AI event consultation, bespoke brief generation, and a protected administrative backoffice.

### Core Capabilities
* **16 Signature Event Categories:** Full turnkey management for royal weddings, destination mandaps, milestone birthdays, corporate summits, arena concerts, and intimate celebrations.
* **Aura AI Concierge:** An intelligent conversational assistant powered by Groq LLaMA 3.3 that collects client preferences, recommends services, generates formal event briefs, and pre-fills WhatsApp communication with explicit client consent.
* **Interactive 3D Depth Carousel:** A custom-engineered Framer Motion coverflow showcasing signature celebrations with fluid physics, touch/drag controls, and accessible keyboard navigation.
* **Client Inquiry & Proposal Engine:** Multi-step event customizer with Zod schema validation, budget tiers, and server-side notification hooks.
* **Admin Backoffice & CRM:** Secure JWT-authenticated portal with bcrypt password encryption, inquiry triage, customer management, status trackers, and internal collaboration notes.
* **Containerized Production Architecture:** Docker multi-stage builds served via Nginx reverse proxy with zero CORS overhead and built-in container health checks.

---

## 2. Global Design System – Modern Luxury

The visual identity follows an editorial luxury philosophy: refined typography, generous negative space, warm organic undertones, and subtle gold accents.

### Color Palette

| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| **Ivory** | `#F8F5EF` | Primary website background, canvas base |
| **Warm Cream** | `#EFE8DC` | Alternate sections, soft cards, contrast backdrops |
| **Champagne Gold** | `#C5A46D` | Primary accent, active states, borders, highlights |
| **Soft Beige** | `#E9DFD0` | Subtle dividers, muted badges, card borders |
| **Charcoal** | `#292722` | Primary headings, luxury dark footer, high-contrast buttons |
| **Warm Taupe** | `#8B7965` | Secondary body text, subheadings, metadata |
| **Pure White** | `#FFFFFF` | Card surfaces, modals, popovers |

### Typography
* **Editorial Headings:** `Cormorant Garamond` (Sophisticated serif with high-contrast serifs and italics)
* **Body & User Interface:** `Outfit` / `Inter` (Contemporary, highly legible geometric sans-serif)

---

## 3. Signature Event Portfolio & Services

HappyEvents covers 16 distinct event categories and full turnkey technical services:

### 16 Signature Event Categories
1. **Weddings:** Bespoke royal weddings, destination mandaps, and celebratory receptions.
2. **Engagements:** Intimate candlelit rings, opulent floral backdrops, and cocktail soirées.
3. **Birthdays:** Milestone 1st birthdays, luxury sweet 16s, and golden jubilee galas.
4. **Anniversaries:** Silver and golden jubilee celebrations with cinematic vow renewals.
5. **Corporate Events:** Global summits, executive retreats, and annual shareholder banquets.
6. **Concerts & Live Shows:** Stadium arena tours, celebrity artist concerts, and music festivals.
7. **College Events:** University cultural fests, star-studded DJ nights, and collegiate showcases.
8. **School Events:** Grand annual day celebrations, sports galas, and graduation ceremonies.
9. **Private Parties:** Luxury villa gatherings, penthouse sundowners, and VIP celebrations.
10. **Baby Showers:** Pastel dreamscapes, custom floral swings, and heartfelt maternity gatherings.
11. **Naming Ceremonies:** Traditional cradle ceremonies with sacred decor and familial feasts.
12. **Cultural Events:** Regional heritage festivals, authentic folk stages, and cultural showcases.
13. **Religious Events:** Devotional kirtans, temple ceremonies, and spiritual gatherings.
14. **Award Functions:** Red carpet entries, trophy presentations, and high-impact stage productions.
15. **Exhibitions & Expos:** Curated art installations, trade shows, and bespoke luxury expos.
16. **Brand Activations:** Interactive consumer pop-ups, experiential brand zones, and PR setups.

### Turnkey Production Services
* **Stage & Floral Architecture:** Handcrafted mandaps, imported floral installations, and thematic spatial design.
* **Intelligent Lighting & Sound:** Moving beams, DMX-controlled filament drops, and concert line-array sound systems.
* **Cinematography & Drone Production:** 4K cinema cameras, gimbal stabilization, same-day teaser edits, and aerial drone captures.
* **Gastronomy & Bar Curation:** Live interactive chef stations, artisanal cocktail/mocktail bars, and custom dietary menus.
* **Celebrity & Artist Procurement:** A-list talent management, rider execution, VIP green rooms, and escort security.
* **White-Glove Hospitality & RSVP:** Airport reception desks, branded guest luggage tags, and concierge hotlines.

---

## 4. Aura AI Concierge Workflow

Aura serves as HappyEvents' personal AI event planner, integrating Groq LLaMA 3.3 for sub-second, structured reasoning.

```
       +--------------------------------------------------+
       |             Client Launches Aura Chat            |
       +--------------------------------------------------+
                                |
                                v
       +--------------------------------------------------+
       |   Conversational Q&A & Event Requirement Intake  |
       |  (Dates, Guests, City, Budget, Floral, Sound)    |
       +--------------------------------------------------+
                                |
                                v
       +--------------------------------------------------+
       |        Aura Generates Structured Brief           |
       +--------------------------------------------------+
                                |
                                v
       +--------------------------------------------------+
       |   Client Reviews, Edits, and Approves Brief      |
       +--------------------------------------------------+
                                |
                                v
       +--------------------------------------------------+
       | Client Clicks "Open WhatsApp" / Copies Message   |
       |  (Strictly opt-in: no unsolicited transmissions) |
       +--------------------------------------------------+
```

### Safety & Privacy Rules
1. **Zero Credential Exposure:** All Groq API keys remain strictly on the Express backend.
2. **Explicit Consent:** Messages are never automatically dispatched. The client explicitly reviews the formatted text and approves launching WhatsApp.
3. **No Fabricated Confirmations:** Aura explicitly communicates that dates, vendor availability, and final quotations are subject to formal team confirmation.

---

## 5. Technology Stack & Architecture

```
HappyEvents/
├── client/                     # Frontend Application (React 19 + TypeScript + Vite)
│   ├── public/                 # Static assets, logos, and high-res event photography
│   ├── src/
│   │   ├── api/                # Axios API client, auth interceptors, form submitters
│   │   ├── components/
│   │   │   ├── admin/          # Backoffice dashboard, inquiry drawer, tables, auth context
│   │   │   ├── aura/           # Aura AI widget, brief cards, WhatsApp formatter
│   │   │   ├── cards/          # Category cards, review cards, project showcase cards
│   │   │   ├── carousel/       # 3D Depth Viewport Carousel (Framer Motion)
│   │   │   ├── forms/          # Floating-label engraved invitation & proposal forms
│   │   │   ├── layout/         # Sticky Navbar, Footer, ScrollToTop, Subpage headers
│   │   │   └── ui/             # Reusable Buttons, Modals, SectionHeadings, WhatsApp fab
│   │   ├── data/               # Single-source-of-truth siteConfig & mockData
│   │   ├── pages/              # Routed pages (Home, Events, Services, Work, About, Contact, Admin)
│   │   ├── sections/           # Section blocks composing the Homepage
│   │   ├── tests/              # Vitest & Testing Library unit test suite
│   │   ├── App.tsx             # Route declarations & QueryClientProvider setup
│   │   └── index.css           # Tailwind base, utilities, and global keyframe animations
│   ├── nginx.conf              # Unprivileged production reverse proxy config
│   ├── package.json            # Client dependencies & build scripts
│   └── tailwind.config.js      # Luxury color tokens & typography extension
│
├── server/                     # Backend Application (Node.js 22 + Express + TypeScript)
│   ├── prisma/
│   │   ├── schema.prisma       # Complete relational schema (Admin, Customer, Enquiry, Service, etc.)
│   │   └── seed.ts             # Database seeding script for development
│   ├── src/
│   │   ├── config/             # Environment validation (Zod), Prisma client, Groq config
│   │   ├── middleware/         # Helmet, CORS, Rate Limiters, JWT requireAuth, ErrorHandler
│   │   ├── routes/             # REST endpoints (auth, enquiries, contact, aura, health)
│   │   ├── services/           # Aura service, admin authentication, mailer, database queries
│   │   ├── app.ts              # Express application factory
│   │   └── server.ts           # Server bootstrap & graceful shutdown listeners
│   ├── Dockerfile              # Multi-stage production container build
│   └── package.json            # Server dependencies & build scripts
│
├── docker-compose.yml          # Container orchestration (web + api + migrate profile)
└── README.md                   # Complete architectural documentation
```

---

## 6. Local Development Setup

### Prerequisites
* **Node.js:** v22.x or later
* **npm:** v10.x or later
* **PostgreSQL:** Local database or hosted instance (e.g., Neon / Supabase)
* **Groq API Key:** For Aura AI concierge ([console.groq.com](https://console.groq.com))

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd HappyEventsCopy

# Install root, client, and server dependencies in one command
npm run install:all
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory (mirroring `.env.example`):

```bash
# server/.env

# Database connection string (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/happyevents?sslmode=require"

# Server configuration
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:5173"

# JWT Authentication
JWT_SECRET="supersecretjwtkeyforlocaldevelopmentminimum32chars"
JWT_EXPIRES_IN="7d"

# Groq AI Service (Aura Concierge)
GROQ_API_KEY="gsk_your_groq_api_key_here"
GROQ_MODEL="llama-3.3-70b-versatile"
GROQ_TIMEOUT_MS=20000

# WhatsApp Integration
WHATSAPP_NUMBER="919908683101"

# Email Notifications (Resend)
RESEND_API_KEY="re_placeholder"
EMAIL_FROM="Happy Events <onboarding@resend.dev>"
ADMIN_EMAIL="admin@happyevents.co"
```

### 3. Generate Prisma Client & Migrate Database
```bash
# Generate the Prisma Client
npm run prisma:generate

# Apply pending migrations to your database
npm run prisma:migrate

# (Optional) Seed the database with initial administrative accounts
npm run seed
```

### 4. Run Development Servers
```bash
# Starts both frontend (port 5173) and backend (port 5000) concurrently
npm run dev

# Or run them individually:
npm run dev:client   # Starts Vite dev server
npm run dev:server   # Starts Express tsx watch server
```

The website is accessible at `http://localhost:5173`.  
The backend health check is accessible at `http://localhost:5000/api/health`.

---

## 7. Testing, Linting & Production Build

### Automated Test Suite (Vitest + React Testing Library)
Run the 53 unit and component tests covering Aura brief formatting, WhatsApp URL normalization, admin authentication, and backoffice enquiry management:
```bash
# Run all tests once
npm test
# (or: npm run test --prefix client)

# Run tests in interactive watch mode
npm run test:watch --prefix client
```

### Client Linting & Type Checking
```bash
# Run oxlint across client codebase
npm run lint
# (or: npm run lint --prefix client)

# Compile client TypeScript and build production bundle
npm run build --prefix client
```

### Server Compilation
```bash
# Compile server TypeScript and generate Prisma artifacts
npm run build --prefix server
```

---

## 8. Docker Deployment

The application is fully containerized with multi-stage Docker builds:
* **`api` Container:** Node 22 slim container running the compiled Express API with Prisma client.
* **`web` Container:** Nginx unprivileged Alpine container serving static assets and proxying `/api` requests to the internal API container.

### Deploy with Docker Compose
```bash
# Build and start the containers in detached mode
docker compose up -d --build

# Inspect running containers
docker compose ps

# View live API logs
docker compose logs -f api

# View live Web/Nginx logs
docker compose logs -f web

# Run database migrations inside container environment
docker compose --profile tools run --rm migrate

# Stop the containers
docker compose down
```

* **Web UI:** `http://localhost:8080`
* **API Health Check:** `http://localhost:8080/api/health`

---

## 9. Security, Performance & Best Practices

1. **Defense in Depth:** Helmet middleware sets secure HTTP response headers (Content-Security-Policy, X-Frame-Options, HSTS).
2. **Strict Rate Limiting:** Form submissions (`/api/contact`, `/api/enquiries`), login attempts (`/api/auth/login`), and AI chat calls (`/api/aura/chat`) are independently throttled via IP-aware rate limiters.
3. **Payload Clamping:** Dedicated JSON body size limits protect against memory exhaustion (Aura endpoint capped at 20KB).
4. **Credential Isolation:** Client bundle contains zero API secrets. All third-party services (Groq, Resend, Neon, Cloudinary) communicate strictly through backend gateways.
5. **Asset Optimization:** Next-generation WebP/AVIF imagery, responsive image attributes, and lazy loading ensure fast First Contentful Paint (FCP).

---

*© 2026 Happy Events & Experiences. All rights reserved.*

