# Portfolio Management System

> **EncoderX Remote Internship — Batch 02 · Week 03**

A full-stack portfolio management system where a developer manages their portfolio through a protected creator dashboard, and visitors view it via a unique username-based public URL.

**Demo portfolio:** `/portfolio/hafsa-yousuf`  
**Dashboard:** `/dashboard` → Login with demo credentials

---

## 1. Project Overview

The Portfolio Management System is a production-quality Next.js application that demonstrates:

- Dynamic routing with username-based public portfolio pages
- RESTful API design with consistent response structure
- PostgreSQL database integration via Drizzle ORM
- JWT-based cookie authentication
- Full CRUD operations for portfolio content
- Responsive, animated UI with a pink + blue design system
- Reusable component architecture
- Input validation using Zod

---

## 2. Features

### Public Portfolio (`/portfolio/[username]`)
- **Hero section** — animated introduction with floating tech chips
- **About** — professional summary and education details
- **Skills** — grouped by category (Languages, Frontend, Backend, Databases, AI, Tools)
- **Projects** — visual project cards with tech stack, links
- **Leadership** — leadership experiences
- **Interests** — professional interests
- **Responsive navigation** — sticky navbar with smooth scrolling

### Creator Dashboard (`/dashboard`)
- **Protected** — JWT authentication required
- **Overview** — stats and quick actions
- **Profile** — edit name, title, summary, education, social links
- **Projects** — add, edit, delete, reorder projects with technology tags
- **Skills** — grouped skill management with add/edit/delete
- **Leadership** — add/edit/delete leadership experiences
- **Interests** — add/remove interests
- **Toast notifications** — success/error feedback on every action

---

## 3. Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Auth | JWT via `jose` library |
| Hashing | `bcryptjs` |
| Validation | Zod |
| Runtime | Node.js |

---

## 4. System Architecture

```
Browser
  │
  ├── /portfolio/[username]     ← Public portfolio (SSR, no auth)
  ├── /dashboard/**             ← Protected dashboard (SSR + client)
  └── /api/**                   ← REST API routes
        │
        ├── /api/auth/login     ← Sets HttpOnly JWT cookie
        ├── /api/auth/logout    ← Clears cookie
        ├── /api/auth/me        ← Check session
        │
        ├── /api/portfolio/[username]   ← Public portfolio data
        ├── /api/portfolio/profile      ← GET/PUT profile
        ├── /api/portfolio/projects     ← GET/POST projects
        ├── /api/portfolio/projects/[id]← GET/PUT/DELETE project
        ├── /api/portfolio/skills       ← GET/POST skills
        ├── /api/portfolio/skills/[id]  ← PUT/DELETE skill
        ├── /api/portfolio/leadership   ← GET/POST leadership
        ├── /api/portfolio/leadership/[id] ← PUT/DELETE leadership
        ├── /api/portfolio/interests    ← GET/POST interests
        └── /api/portfolio/interests/[id]  ← DELETE interest
              │
              └── PostgreSQL (via Drizzle ORM)
```

---

## 5. Folder Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles + design system
│   ├── api/
│   │   ├── health/route.ts         # Health check
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   └── portfolio/
│   │       ├── [username]/route.ts  # Public portfolio data
│   │       ├── profile/route.ts
│   │       ├── projects/route.ts
│   │       │   └── [id]/route.ts
│   │       ├── skills/route.ts
│   │       │   └── [id]/route.ts
│   │       ├── leadership/route.ts
│   │       │   └── [id]/route.ts
│   │       └── interests/route.ts
│   │           └── [id]/route.ts
│   ├── portfolio/
│   │   └── [username]/
│   │       ├── page.tsx            # Public portfolio page
│   │       └── not-found.tsx       # 404 page
│   └── dashboard/
│       ├── page.tsx                # Overview
│       ├── login/page.tsx
│       ├── profile/page.tsx
│       ├── projects/page.tsx
│       ├── skills/page.tsx
│       ├── leadership/page.tsx
│       └── interests/page.tsx
├── components/
│   ├── ui/
│   │   ├── Toast.tsx
│   │   └── LoadingSpinner.tsx
│   ├── portfolio/
│   │   ├── AnimatedSection.tsx     # Intersection Observer animations
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Leadership.tsx
│   │   ├── Interests.tsx
│   │   ├── Footer.tsx
│   │   └── PortfolioNav.tsx
│   └── dashboard/
│       ├── Sidebar.tsx
│       ├── ProfileForm.tsx
│       ├── ProjectForm.tsx
│       ├── ProjectList.tsx
│       ├── SkillManager.tsx
│       ├── LeadershipManager.tsx
│       └── InterestManager.tsx
├── db/
│   ├── index.ts                    # Database connection
│   ├── schema.ts                   # Drizzle ORM schema
│   └── seed.ts                     # Database seeder
├── lib/
│   ├── auth.ts                     # JWT utilities
│   └── validation.ts               # Zod schemas
└── types/
    └── index.ts                    # Shared TypeScript types
```

---

## 6. Database Schema

```sql
-- Users table (authentication)
CREATE TABLE users (
  id           SERIAL PRIMARY KEY,
  username     VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
);

-- Profile table (portfolio identity)
CREATE TABLE profiles (
  id                  SERIAL PRIMARY KEY,
  user_id             INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  name                VARCHAR(200) NOT NULL,
  title               VARCHAR(200) NOT NULL,
  summary             TEXT,
  degree              VARCHAR(200),
  institution         VARCHAR(200),
  education_status    VARCHAR(100),
  education_period    VARCHAR(100),
  current_semester    VARCHAR(100),
  github_url          VARCHAR(500),
  linkedin_url        VARCHAR(500),
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id                    SERIAL PRIMARY KEY,
  user_id               INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title                 VARCHAR(200) NOT NULL,
  description           TEXT NOT NULL,
  detailed_description  TEXT,
  category              VARCHAR(100),
  technologies          TEXT NOT NULL DEFAULT '[]',  -- JSON array
  image_url             VARCHAR(500),
  github_url            VARCHAR(500),
  live_demo_url         VARCHAR(500),
  display_order         INTEGER DEFAULT 0,
  created_at            TIMESTAMP DEFAULT NOW(),
  updated_at            TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name       VARCHAR(100) NOT NULL,
  category   VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leadership experiences table
CREATE TABLE leadership_experiences (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role         VARCHAR(200) NOT NULL,
  organization VARCHAR(200) NOT NULL,
  description  TEXT,
  period       VARCHAR(100),
  is_current   BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
);

-- Interests table
CREATE TABLE interests (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name       VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. Database Relationships

```
User (1)
  ├──── Profile (1)         One-to-one
  ├──── Projects (many)     One-to-many
  ├──── Skills (many)       One-to-many
  ├──── LeadershipExperiences (many)   One-to-many
  └──── Interests (many)    One-to-many
```

All child tables use `ON DELETE CASCADE` so deleting a user removes all portfolio data.

---

## 8. REST API Documentation

### Authentication

#### `POST /api/auth/login`
- **Purpose:** Authenticate user, set HttpOnly JWT cookie
- **Auth required:** No
- **Request body:**
```json
{ "username": "hafsa-yousuf", "password": "EncoderX@2024" }
```
- **Success response (200):**
```json
{ "success": true, "data": { "username": "hafsa-yousuf" } }
```
- **Errors:** `400 Bad Request`, `401 Unauthorized`

#### `POST /api/auth/logout`
- **Purpose:** Clear the auth cookie
- **Auth required:** No (clears cookie regardless)

#### `GET /api/auth/me`
- **Purpose:** Get current session info
- **Auth required:** Yes
- **Success response (200):**
```json
{ "success": true, "data": { "userId": 1, "username": "hafsa-yousuf" } }
```

---

### Public Portfolio

#### `GET /api/portfolio/[username]`
- **Purpose:** Fetch complete public portfolio data
- **Auth required:** No
- **Success response (200):**
```json
{
  "success": true,
  "data": {
    "username": "hafsa-yousuf",
    "profile": { "name": "...", "title": "...", ... },
    "projects": [ { "id": 1, "title": "...", "technologies": ["..."], ... } ],
    "skills": [ { "id": 1, "name": "React", "category": "Frontend" } ],
    "leadershipExperiences": [ { ... } ],
    "interests": [ { ... } ]
  }
}
```
- **Errors:** `404 Not Found`

---

### Profile

#### `GET /api/portfolio/profile`
- **Purpose:** Get authenticated user's profile
- **Auth required:** Yes
- **Errors:** `401 Unauthorized`, `404 Not Found`

#### `PUT /api/portfolio/profile`
- **Purpose:** Update profile
- **Auth required:** Yes
- **Request body:**
```json
{
  "name": "Hafsa Yousuf",
  "title": "Creative Full Stack Developer",
  "summary": "...",
  "degree": "Bachelor of Software Engineering",
  "institution": "SSUET",
  "educationStatus": "Undergraduate",
  "educationPeriod": "2024 – Present",
  "currentSemester": "4th Semester",
  "githubUrl": "https://github.com/example",
  "linkedinUrl": "https://linkedin.com/in/example"
}
```
- **Errors:** `400 Validation`, `401 Unauthorized`

---

### Projects

#### `GET /api/portfolio/projects`
- **Auth required:** Yes

#### `POST /api/portfolio/projects`
- **Auth required:** Yes
- **Request body:**
```json
{
  "title": "SkillMatriX",
  "description": "...",
  "detailedDescription": "...",
  "category": "AI / Full Stack",
  "technologies": ["Next.js", "Spring Boot"],
  "githubUrl": "https://github.com/example",
  "liveDemoUrl": "https://example.com",
  "displayOrder": 1
}
```
- **Success:** `201 Created`

#### `PUT /api/portfolio/projects/[id]`
- **Auth required:** Yes
- **Authorization:** Only project owner

#### `DELETE /api/portfolio/projects/[id]`
- **Auth required:** Yes
- **Authorization:** Only project owner

---

### Skills

#### `GET /api/portfolio/skills` — Auth required
#### `POST /api/portfolio/skills` — Body: `{ "name": "React", "category": "Frontend" }`
#### `PUT /api/portfolio/skills/[id]`
#### `DELETE /api/portfolio/skills/[id]`

---

### Leadership

#### `GET /api/portfolio/leadership`
#### `POST /api/portfolio/leadership`
- Body: `{ "role": "...", "organization": "...", "description": "...", "period": "...", "isCurrent": true }`
#### `PUT /api/portfolio/leadership/[id]`
#### `DELETE /api/portfolio/leadership/[id]`

---

### Interests

#### `GET /api/portfolio/interests`
#### `POST /api/portfolio/interests` — Body: `{ "name": "Artificial Intelligence" }`
#### `DELETE /api/portfolio/interests/[id]`

---

## 9. Authentication & Security

### How it works
1. User POSTs credentials to `/api/auth/login`
2. Server validates credentials, creates a signed JWT using `jose`
3. JWT is stored in an **HttpOnly, SameSite=Lax** cookie (inaccessible to JavaScript)
4. Every protected API route calls `getSession()` which reads and verifies the cookie
5. Routes redirect to `/dashboard/login` if session is missing or invalid

### Authorization
- All write operations check that the resource belongs to the authenticated user
- A user cannot modify another user's portfolio data

### Input validation
- All API bodies are validated with **Zod** before touching the database
- URLs are validated as proper URL format
- String lengths are enforced
- Required fields are enforced

### Secrets
- `JWT_SECRET` — set in `.env`, never hardcoded
- `DATABASE_URL` — set in `.env`
- Passwords are hashed with **bcrypt** (10 rounds)
- Passwords are never returned in any API response

---

## 10. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/portfolio_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 11. Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd portfolio-management-system

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your database credentials and a strong JWT secret

# 4. Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE portfolio_db;"

# 5. Apply database schema
npx drizzle-kit push

# 6. Seed the database with demo data
npx tsx src/db/seed.ts

# 7. Start development server
npm run dev
```

Open `http://localhost:3000`

**Demo portfolio:** `http://localhost:3000/portfolio/hafsa-yousuf`  
**Dashboard:** `http://localhost:3000/dashboard`

```
Username: hafsa-yousuf
Password: EncoderX@2024
```

---

## 12. Production Build

```bash
# Build the app
npm run build

# Start the production server
npm run start
```

---

## 13. Deployment

### Recommended: Vercel + Neon PostgreSQL

```bash
# 1. Push to GitHub
git push origin main

# 2. Import project to Vercel
#    vercel.com → New Project → Import GitHub repo

# 3. Set environment variables in Vercel dashboard:
#    DATABASE_URL=<your-neon-postgres-url>
#    JWT_SECRET=<strong-random-secret>

# 4. Deploy
#    Vercel auto-deploys on every push
```

### Alternative: Railway (All-in-one)
1. Create a new project on railway.app
2. Add a PostgreSQL plugin
3. Deploy the repo
4. Set `DATABASE_URL` and `JWT_SECRET` in Railway env vars
5. After first deploy, run: `npx tsx src/db/seed.ts` in the Railway shell

---

## EncoderX Evaluation Criteria

| Criterion | Weight | Implementation |
|-----------|--------|----------------|
| Dynamic Routing & Data Fetching | 30% | `/portfolio/[username]` SSR with DB, `/api/portfolio/[username]` REST endpoint |
| Interface Responsiveness & UI/UX | 25% | Responsive Tailwind layout, animations, pink+blue design system, mobile-first |
| System Documentation Quality | 20% | This README covers all architecture, API docs, schema, setup |
| Code Modularity & Component Reusability | 15% | 20+ reusable components, separated lib utilities, type system |
| API Structure & Security | 10% | RESTful routes, Zod validation, JWT auth, HTTP status codes |

---

*Built with Next.js, Drizzle ORM, PostgreSQL, and Tailwind CSS.*  
*EncoderX Remote Internship — Batch 02, Week 03*
