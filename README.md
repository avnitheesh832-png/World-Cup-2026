# ⚽ World Cup 2026 Predictor

A self-hosted prediction game for World Cup 2026 — all 104 matches, per-match locking, live score sync, and a leaderboard that updates automatically.

## How it works

1. You (admin) add player names via the Admin panel
2. Share the URL with everyone
3. Each player opens the link, picks their name, and fills in their predictions
4. Each match **locks 5 minutes before kickoff** — no editing after that
5. Connect API-Football for automatic score syncing, or enter results manually
6. Leaderboard updates in real time for everyone

## Points

| Action | Points |
|---|---|
| Correct result (H/D/A) | 1 pt |
| Correct exact score | 1 pt |
| Each correct outright | 10 pts |

## Quick start (local)

```bash
npm install
node server.js
# Open http://localhost:3000
```

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | 3000 | Server port |
| `ADMIN_PASSWORD` | `wc2026admin` | **Change this!** |
| `API_FOOTBALL_KEY` | — | Optional: auto-sync live scores |

## Deploy on Railway (free)

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set env vars: `ADMIN_PASSWORD=yourpassword` and optionally `API_FOOTBALL_KEY=yourkey`
4. Railway gives you a URL like `https://yourapp.railway.app` — share that

## Deploy on Render (free)

1. Push to GitHub
2. [render.com](https://render.com) → New Web Service → connect repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add env vars in the Render dashboard

## Deploy on a VPS (DigitalOcean, Hetzner, etc.)

```bash
# On the server
git clone <your-repo> wc2026
cd wc2026
npm install

# Run with PM2 (keeps it alive)
npm install -g pm2
ADMIN_PASSWORD=yourpassword pm2 start server.js --name wc2026
pm2 save

# Nginx reverse proxy (optional, for port 80)
# Point your domain to the server IP, then:
# proxy_pass http://localhost:3000;
```

## Live score sync (API-Football)

1. Sign up free at [api-football.com](https://www.api-football.com) (100 requests/day free)
2. Go to Admin panel → paste your API key → Save
3. The server auto-syncs every 3 minutes during the tournament (Jun 11 – Jul 26)
4. Or click "Sync now" any time from the Admin panel

## Admin panel

Go to the ⚙ tab → enter your admin password (default: `wc2026admin`).

From there you can:
- Add/remove players
- Enter outright answers (winner, golden boot, etc.) as they become known
- Enter results manually if not using API-Football
- Export/import a full JSON backup

## Data storage

All data is stored in `data/db.json` — a plain JSON file. Back it up regularly using the Export button in Admin, or set up a cron job to copy the file.
