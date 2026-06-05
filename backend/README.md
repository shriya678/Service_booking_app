# Service Booking App

A learning project: payment-enabled service booking app where users book service slots
(salon, tutor, clinic), pay online, and receive confirmation.

## Stack

| Layer | Tech |
|---|---|
| Backend | Node.js + Express |
| Frontend | React (Vite) + Tailwind *(coming soon)* |
| Database | PostgreSQL + Prisma *(coming soon)* |
| Payments | Stripe (test mode) *(coming soon)* |
| Notifications | Email first, SMS later *(coming soon)* |

## Project structure

```
service-booking-app/
├── backend/        # Express API
└── frontend/       # React app (coming soon)
```

## Backend — setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The server runs on http://localhost:4000.

Smoke test:

```bash
curl http://localhost:4000/api/health
# → {"status":"ok","timestamp":"..."}
```

## API routes

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Liveness check — returns server status |

## Environment variables (backend)

See `backend/.env.example`. Currently:

| Var | Default | Purpose |
|---|---|---|
| `PORT` | 4000 | HTTP port |
| `NODE_ENV` | development | Runtime mode |

## Roadmap

- [x] Feature 1 — Backend skeleton (`/api/health`)
- [ ] Feature 2 — Database + Prisma
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
