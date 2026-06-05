# Service Booking App

A learning project: payment-enabled service booking app where users book service slots
(salon, tutor, clinic), pay online, and receive confirmation.

## Stack

| Layer | Tech |
|---|---|
| Backend | Node.js + Express |
| Frontend | React (Vite) + Tailwind *(coming soon)* |
| Database | PostgreSQL 16 + Prisma 6 |
| Payments | Stripe (test mode) *(coming soon)* |
| Notifications | Email first, SMS later *(coming soon)* |

## Project structure

```
service-booking-app/
├── docker-compose.yml  # Postgres for local dev
├── backend/            # Express API + Prisma
└── frontend/           # React app (coming soon)
```

## Prerequisites

- Node.js 20 or newer
- Docker Desktop (for the local Postgres container)

## Setup

### 1. Start Postgres

From the project root:

```bash
docker compose up -d
```

This starts a Postgres 16 container in the background. Data lives in a Docker volume
named `postgres-data` and survives container restarts. To wipe it: `docker compose down -v`.

### 2. Install + configure the backend

```bash
cd backend
cp .env.example .env       # PowerShell: Copy-Item .env.example .env
npm install
```

### 3. Run the first migration

This creates the tables defined in `prisma/schema.prisma`:

```bash
npm run db:migrate
```

It will prompt for a migration name — type `init` and press Enter.

### 4. Start the server

```bash
npm run dev
```

The API runs on http://localhost:4000.

Smoke tests:

```bash
curl http://localhost:4000/api/health
# → {"status":"ok","timestamp":"..."}

curl http://localhost:4000/api/users/count
# → {"count":0}
```

## Useful scripts (backend)

| Command | What it does |
|---|---|
| `npm run dev` | Start the API with file-watch reload |
| `npm run db:migrate` | Apply schema changes to the DB (creates a new migration) |
| `npm run db:studio` | Open Prisma Studio — a GUI for browsing/editing the DB |
| `npm run db:generate` | Regenerate the Prisma client (rarely needed manually) |

## API routes

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Liveness check — returns server status |
| GET | `/api/users/count` | Returns the number of users in the DB |

## Environment variables (backend)

See `backend/.env.example`.

| Var | Default | Purpose |
|---|---|---|
| `PORT` | 4000 | HTTP port |
| `NODE_ENV` | development | Runtime mode |
| `DATABASE_URL` | *(see .env.example)* | Postgres connection string |

## Roadmap

- [x] Feature 1 — Backend skeleton (`/api/health`)
- [x] Feature 2 — Database + Prisma
- [ ] Feature 3 — Frontend skeleton
- [ ] Feature 4 — Signup / login (JWT)
- [ ] Feature 5 — Provider profiles
- [ ] Feature 6 — Services + slots
- [ ] Feature 7 — Bookings
- [ ] Feature 8 — Stripe payments
- [ ] Feature 9 — Email confirmation
- [ ] Feature 10 — My bookings page
- [ ] Feature 11 — Provider dashboard
- [ ] Feature 12 — Tests + polish
