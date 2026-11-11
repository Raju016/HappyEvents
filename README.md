# HappyEvents — Premium Event Management Platform

> A modern luxury event planning and management website built with React 19, TypeScript, Express, Prisma, and PostgreSQL. Features an AI concierge (Aura), cinematic UI, full enquiry pipeline, and a secure admin dashboard.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Event Categories & Services](#5-event-categories--services)
6. [Pages & Features](#6-pages--features)
7. [Aura AI Concierge](#7-aura-ai-concierge)
8. [Database Schema](#8-database-schema)
9. [API Routes](#9-api-routes)
10. [Getting Started (Local Dev)](#10-getting-started-local-dev)
11. [Environment Variables](#11-environment-variables)
12. [Build & Deployment](#12-build--deployment)
13. [Docker Deployment](#13-docker-deployment)
14. [Security & Credentials](#14-security--credentials)
15. [Contact](#15-contact)

---

## 1. Project Overview

**HappyEvents** is a full-stack, production-ready event management platform designed with a modern luxury aesthetic. It enables customers to discover services, explore portfolio events, submit enquiries, interact with the Aura AI concierge, and receive personalised event briefs delivered via WhatsApp.

**Core capabilities:**
- Cinematic homepage with editorial design
- 16 event service categories
- Portfolio / event gallery with coverflow carousel
- Contact & enquiry form with full validation
- Aura AI concierge powered by Groq
- Event brief generation and WhatsApp delivery
- Admin dashboard with role-based access control
- JWT authentication for admin users
- Prisma ORM with PostgreSQL (Neon-compatible)
- Resend transactional email integration

---

## 2. Tech Stack

### Frontend (Client)
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 13 | Animations & transitions |
| React Router | 7 | Client-side routing |
| React Hook Form | 7 | Form management |
| Zod | 4 | Schema validation |
| TanStack Query | 5 | Server state management |
| Axios | 1 | HTTP client |
| Lucide React | 1 | Icon library |
| OXLint | 1 | Fast JS/TS linter |

### Backend (Server)
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20+ | Runtime |
| Express | 4 | HTTP server |
| TypeScript | 5 | Type safety |
| Prisma | 6 | ORM & migrations |
| PostgreSQL | 15+ | Primary database |
| Groq SDK | — | Aura AI (LLM provider) |
| JSON Web Token | — | Admin authentication |
| Bcrypt | — | Password hashing |
| Resend | — | Transactional email |
| Zod | 4 | Server-side validation |
| Rate limiting | — | API protection |

---

## 3. Project Structure

```
HappyEvents/
├── client/                         # React frontend
│   ├── public/
│   │   ├── events/                 # Event photography assets
│   │   └── *.jpg / *.png          # Public images
│   ├── src/
│   │   ├── api/                    # Axios API helpers
│   │   ├── components/
│   │   │   ├── admin/              # Admin UI components
│   │   │   ├── aura/               # Aura concierge UI
│   │   │   ├── cards/              # Card components
│   │   │   ├── carousel/           # Coverflow carousel
│   │   │   ├── forms/              # Reusable form components
│   │   │   ├── layout/             # Navbar, Footer, ScrollToTop
│   │   │   ├── testimonials/       # Testimonial components
│   │   │   └── ui/                 # WhatsAppFloating, Preloader, etc.
│   │   ├── data/
│   │   │   ├── siteConfig.ts       # Single source of truth for contact info
│   │   │   └── mockData.ts
│   │   ├── pages/                  # Route-level page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── EventsPage.tsx
│   │   │   ├── OurWorkPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── PlanYourEventPage.tsx
│   │   │   ├── ReviewsPage.tsx
│   │   │   ├── PrivacyPolicyPage.tsx
│   │   │   ├── TermsPage.tsx
│   │   │   └── admin/              # Admin dashboard pages
│   │   ├── sections/home/          # Homepage section components
│   │   └── tests/                  # Vitest test files
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                         # Express backend
│   ├── prisma/
│   │   ├── schema.prisma           # Full DB schema
│   │   └── migrations/             # Migration history
│   ├── scripts/                    # Seed & utility scripts
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts              # Zod-validated environment config
│   │   │   └── groq.ts             # Groq AI client setup
│   │   ├── middleware/             # Auth, rate limiting, error handling
│   │   ├── routes/                 # Express route handlers
│   │   └── services/               # Business logic & integrations
│   ├── Dockerfile
│   ├── .env.example                # Reference — no real secrets
│   └── package.json
│
├── .env.example                    # Root env reference
├── .gitignore                      # Hardened secret exclusion rules
├── docker-compose.yml
├── package.json                    # Root scripts (dev, build, install)
└── README.md
```

---

## 4. Design System

HappyEvents uses a centralised design token system via CSS variables and Tailwind configuration.

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Ivory | `#F8F5EF` | Main background |
| Warm Cream | `#EFE8DC` | Secondary sections |
| Champagne Gold | `#C5A46D` | Primary accent, CTAs |
| Soft Beige | `#E9DFD0` | Cards |
| Charcoal | `#292722` | Headings, footer background |
| Warm Taupe | `#8B7965` | Body text |
| Pure White | `#FFFFFF` | Card surfaces |

### Typography

| Role | Font |
|---|---|
| Display headings | Playfair Display |
| Body & UI | Inter |
| Buttons & nav | Inter |

---

## 5. Event Categories & Services

HappyEvents offers planning and management across **16 event categories**:

| # | Category | # | Category |
|---|---|---|---|
| 1 | Weddings | 9 | Private Parties |
| 2 | Engagements | 10 | Baby Showers |
| 3 | Birthdays | 11 | Naming Ceremonies |
| 4 | Anniversaries | 12 | Cultural Events |
| 5 | Corporate Events | 13 | Religious Events |
| 6 | Concerts & Live Shows | 14 | Award Functions |
| 7 | College Events | 15 | Exhibitions & Expos |
| 8 | School Events | 16 | Brand Activations |

---

## 6. Pages & Features

| Page | Route | Description |
|---|---|---|
| Home | `/` | Cinematic hero, services preview, featured events, process, testimonials |
| About | `/about` | Brand story, mission, vision, values |
| Services | `/services` | All 16 service categories with enquiry CTAs |
| Events | `/events` | Portfolio with 3D coverflow carousel |
| Our Work | `/our-work` | Project gallery with modal viewer |
| Plan Your Event | `/plan` | Multi-step event customisation form |
| Contact | `/contact` | Enquiry form + WhatsApp contact |
| Reviews | `/reviews` | Customer testimonials page |
| Privacy Policy | `/privacy` | Legal page |
| Terms | `/terms` | Legal page |
| Admin Dashboard | `/admin` | RBAC admin panel (SUPER_ADMIN / ADMIN / EDITOR) |

### Key UI Features
- **CinematicPreloader** — branded loading screen on first visit
- **WhatsApp floating button** — persistent contact shortcut
- **ScrollToTop** — automatic scroll reset on route change
- **Sticky Navbar** — transparent to solid transition on scroll
- **Aura Concierge** — floating AI chat window

---

## 7. Aura AI Concierge

Aura is HappyEvents personal AI event concierge, powered by **Groq** (fast LLM inference).

```
"Welcome to HappyEvents! I'm Aura, your personal event concierge.
Let's create something beautiful together. How can I help you plan your special occasion?"
```

### Aura Flow

```
User opens Aura chat
        |
        v
Aura greets + shows suggested prompts
        |
        v
User describes event (type, date, guests, budget, theme)
        |
        v
Aura collects details conversationally
        |
        v
Aura generates structured Event Brief
        |
        v
User reviews brief and approves for WhatsApp delivery
        |
        v
Brief sent to HappyEvents team via WhatsApp
```

### Aura Capabilities
- Answer FAQs about services and pricing
- Guide customers through event customisation
- Collect event type, date, location, guest count, budget
- Suggest themes, decorations, and vendors
- Generate a formatted, structured event brief
- Trigger WhatsApp delivery of the approved brief

### API Endpoint
```
POST /api/aura/chat
Body: { messages: ChatMessage[], sessionId?: string }
```

---

## 8. Database Schema

Built with **Prisma ORM** on **PostgreSQL**. Key models:

| Model | Purpose |
|---|---|
| `Admin` | Admin users with role (SUPER_ADMIN / ADMIN / EDITOR) |
| `Customer` | Registered customers |
| `EventCategory` | 16 event types with cover images and slugs |
| `Service` | Service offerings with features list |
| `Package` | Pricing tiers (Essential, Premium, Luxury, Custom) |
| `Event` | Portfolio events with gallery, videos, and reviews |
| `Enquiry` | Customer enquiries with status pipeline |
| `ContactMessage` | Direct contact form submissions |
| `Review` | Customer reviews (requires admin approval) |
| `Testimonial` | Video testimonials |
| `SiteSetting` | Dynamic site configuration via admin |
| `AuditLog` | Full admin action audit trail |

### Enquiry Status Pipeline
```
NEW -> CONTACTED -> QUOTED -> CONFIRMED -> IN_PROGRESS -> COMPLETED
                                                       -> CANCELLED
```

---

## 9. API Routes

### Public
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/contact` | Submit contact message |
| `POST` | `/api/enquiry` | Submit event enquiry |
| `POST` | `/api/aura/chat` | Aura AI conversation |

### Auth
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login (returns JWT) |
| `POST` | `/api/auth/logout` | Admin logout |

### Admin (JWT Required)
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/admin/*` | Admin data reads |
| `POST/PUT/DELETE` | `/api/admin/*` | Admin data mutations |

---

## 10. Getting Started (Local Dev)

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 15+ (or a [Neon](https://neon.tech) free-tier account)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/HappyEvents.git
cd HappyEvents
npm run install:all
```

### 2. Configure Environment

```bash
cp .env.example .env
cp server/.env.example server/.env
```

Fill in your real values in `server/.env`.

### 3. Set Up the Database

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### 4. Start the Dev Servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api/health
- Prisma Studio: `npm run prisma:studio`

---

## 11. Environment Variables

Create `server/.env` based on `server/.env.example`. **Never commit this file.**

```env
DATABASE_URL="postgresql://user:password@host:5432/happyevents"
PORT=5000
NODE_ENV="development"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
GROQ_API_KEY="gsk_your_groq_api_key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
RESEND_API_KEY="re_your_resend_key"
EMAIL_FROM="HappyEvents <events@yourdomain.com>"
ADMIN_EMAIL="rajkadiyam9346@gmail.com"
WHATSAPP_NUMBER="919908683101"
```

---

## 12. Build & Deployment

```bash
# Production build (client + server)
npm run build

# Client output: client/dist/
# Server output: server/dist/
```

---

## 13. Docker Deployment

```bash
docker compose up --build
```

Services:
- **client** — Nginx on port 80
- **server** — Express on port 5000
- **db** — PostgreSQL on port 5432

---

## 14. Security & Credentials

| Protection | Status |
|---|---|
| `server/.env` excluded from git | Enforced by .gitignore |
| No secrets in git history | Verified clean |
| JWT auth on all admin routes | requireAuth middleware |
| Password hashing with bcrypt | Enabled |
| Rate limiting on all public APIs | Enabled |
| Login brute-force protection | loginRateLimit middleware |
| Zod validation on all inputs | Client + server |
| CORS configured | Via CLIENT_URL env var |
| Audit log for admin actions | AuditLog model |

**Important:** Never commit `server/.env`. It contains your database URL, JWT secret, and API keys.

---

## 15. Contact

**HappyEvents — Premium Event Planning & Management**

| Channel | Details |
|---|---|
| Phone | +91 99086 83101 |
| Email | rajkadiyam9346@gmail.com |
| WhatsApp | https://wa.me/919908683101 |
| Location | Floor 4, Road No. 36, Jubilee Hills, Hyderabad, India |

---

> Built with love for HappyEvents. All rights reserved.
