# TradeSphere MERN Stack App

Full-stack web app (MongoDB, Express, React, Node) with authentication, dashboard, and responsive UI.

## Project structure

- **backend/** – Express API (auth, holdings, positions), MongoDB, JWT
- **frontend/** – React SPA (landing, login/signup, dashboard)

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URL, JWT_SECRET (required for production)
npm start        # dev with nodemon
npm run prod     # production (node index.js)
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env: set REACT_APP_API_URL to your backend URL
npm start        # dev (default API: http://localhost:3002)
npm run build    # production build
```

## Environment variables

### Backend (.env)

| Variable     | Description                          | Example                    |
|-------------|--------------------------------------|----------------------------|
| PORT        | Server port                          | 3002                       |
| MONGO_URL   | MongoDB connection string            | mongodb://localhost:27017/zerodha |
| JWT_SECRET  | Secret for JWT signing (set in prod) | long-random-string         |
| JWT_EXPIRY  | Token expiry                         | 7d                         |
| CLIENT_URL  | Allowed CORS origins (production)    | https://your-app.vercel.app |

For multiple origins use comma-separated: `CLIENT_URL=https://app1.com,https://app2.com`

### Frontend (.env)

| Variable            | Description        | Example                    |
|---------------------|--------------------|----------------------------|
| REACT_APP_API_URL   | Backend API base   | http://localhost:3002      |

Production: set to your deployed backend URL (no trailing slash).

## Deployment

### Backend (e.g. Render, Railway, Fly.io)

1. Set env vars: `MONGO_URL`, `JWT_SECRET`, `CLIENT_URL` (your frontend URL).
2. Start command: `npm run prod` or `node index.js`.
3. Health check: `GET /health` returns `{ "status": "ok" }`.

### Frontend (e.g. Vercel, Netlify)

1. Set `REACT_APP_API_URL` to your deployed backend URL.
2. Build command: `npm run build`.
3. Publish the `build` folder (or connect Git for auto deploy).

### Responsive & styling

- Layouts and components are responsive (breakpoints: 576px, 768px, 992px).
- Dashboard tables scroll horizontally on small screens.
- Auth pages, footer, support, and dashboard work on mobile and desktop.

## API overview

- `POST /auth/register` – sign up (email, password, name)
- `POST /auth/login` – log in (email, password)
- `GET /auth/me` – current user (Bearer token)
- `GET /health` – health check
- `GET /allHoldings` – holdings (protected)
- `GET /allPositions` – positions (protected)

## License

ISC
