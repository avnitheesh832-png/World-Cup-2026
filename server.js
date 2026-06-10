const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { MATCHES, OUTRIGHTS } = require('./matches');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'db.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wc2026admin';
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY || '';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── DB helpers ─────────────────────────────────────────────────────────────

function loadDB() {
  if (!fs.existsSync(DATA_FILE)) return initDB();
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return initDB(); }
}

function initDB() {
  return {
    players: [],
    predictions: {},
    outright_preds: {},
    results: {},
    outright_answers: {},
    lastSync: null,
    apiKey: API_FOOTBALL_KEY,
  };
}

function saveDB(db) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// ─── Auth middleware ──────────────────────────────────────────────────────────

function adminAuth(req, res, next) {
  const pw = req.headers['x-admin-password'] || req.body?.adminPassword;
  if (pw !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ─── Match lock logic ─────────────────────────────────────────────────────────

function isMatchLocked(matchId) {
  const match = MATCHES.find(m => m.id == matchId);
  if (!match || !match.kickoff) return false;
  return Date.now() >= new Date(match.kickoff).getTime() - 5 * 60 * 1000;
}

function getMatchResult(hs, as) {
  if (hs > as) return 'H';
  if (hs < as) return 'A';
  return 'D';
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function calcScore(db, playerId) {
  let matchResult = 0, correctScore = 0, outrightPts = 0;
  const preds = db.predictions[playerId] || {};
  for (const [mid, pred] of Object.entries(preds)) {
    const res = db.results[mid];
    if (!res || !res.status || res.status === '') continue;
    if (pred.result === res.result) matchResult++;
    if (String(pred.homeScore) === String(res.homeScore) && String(pred.awayScore) === String(res.awayScore)) correctScore++;
  }
  const opreds = db.outright_preds[playerId] || {};
  for (const [oid, val] of Object.entries(opreds)) {
    const ans = db.outright_answers[oid];
    if (ans && val && ans.trim().toLowerCase() === val.trim().toLowerCase()) outrightPts += 10;
  }
  return { matchResult, correctScore, outrightPts, total: matchResult + correctScore + outrightPts };
}

// ─── Live sync ────────────────────────────────────────────────────────────────

async function syncLiveResults(db) {
  const key = db.apiKey || API_FOOTBALL_KEY;
  if (!key) return { updated: 0, error: 'No API key configured' };
  try {
    const { default: fetch } = await import('node-fetch').catch(() => ({ default: global.fetch }));
    const fetchFn = fetch || global.fetch;
    const res = await fetchFn('https://v3.football.api-sports.io/fixtures?league=1&season=2026&timezone=UTC', {
      headers: { 'x-apisports-key': key }
    });
    const data = await res.json();
    if (data.errors && Object.keys(data.errors).length > 0) return { updated: 0, error: JSON.stringify(data.errors) };
    const fixtures = data.response || [];
    let updated = 0;
    fixtures.forEach(f => {
      const hs = f.goals.home, as = f.goals.away;
      const st = f.fixture.status.short;
      const statusMap = { 'FT': 'FT', 'AET': 'FT', 'PEN': 'FT', '1H': 'LIVE', '2H': 'LIVE', 'HT': 'LIVE', 'ET': 'LIVE' };
      const status = statusMap[st] || '';
      if (hs === null || as === null) return;
      const home = f.teams.home.name, away = f.teams.away.name;
      const match = MATCHES.find(m =>
        m.home.toLowerCase() === home.toLowerCase() || m.away.toLowerCase() === away.toLowerCase() ||
        home.toLowerCase().includes(m.home.split(' ')[0].toLowerCase())
      );
      if (match) {
        db.results[match.id] = { homeScore: hs, awayScore: as, status, result: getMatchResult(hs, as) };
        updated++;
      }
    });
    db.lastSync = new Date().toISOString();
    saveDB(db);
    return { updated };
  } catch (e) {
    return { updated: 0, error: e.message };
  }
}

cron.schedule('*/3 * * * *', async () => {
  const now = new Date();
  if (now >= new Date('2026-06-11T00:00Z') && now <= new Date('2026-07-27T00:00Z')) {
    const db = loadDB();
    if (db.apiKey || API_FOOTBALL_KEY) await syncLiveResults(db);
  }
});

// ─── PIN auth ─────────────────────────────────────────────────────────────────

// Verify PIN before letting a player in
app.post('/api/verify-pin/:playerId', (req, res) => {
  const db = loadDB();
  const player = db.players.find(p => p.id === req.params.playerId);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  if (!player.pin) return res.json({ ok: true, noPin: true }); // no PIN set = open
  const { pin } = req.body;
  if (String(pin) !== String(player.pin)) return res.status(401).json({ error: 'Wrong PIN — try again' });
  res.json({ ok: true });
});

// ─── PUBLIC ROUTES ────────────────────────────────────────────────────────────

app.get('/api/config', (req, res) => {
  const db = loadDB();
  res.json({
    matches: MATCHES,
    outrights: OUTRIGHTS,
    // Only expose name + id + whether PIN is set (never the actual PIN)
    players: db.players.map(p => ({ id: p.id, name: p.name, hasPin: !!p.pin })),
    lockMinutes: 5,
    now: new Date().toISOString(),
    outrightsLocked: Date.now() >= new Date('2026-06-15T23:59:00Z').getTime(),
  });
});

app.get('/api/leaderboard', (req, res) => {
  const db = loadDB();
  const completedMatches = Object.values(db.results).filter(r => r.status === 'FT').length;
  const liveMatches = Object.values(db.results).filter(r => r.status === 'LIVE').length;
  const scores = db.players
    .map(p => ({ id: p.id, name: p.name, ...calcScore(db, p.id) }))
    .sort((a, b) => b.total - a.total)
    .map((p, i) => ({ ...p, rank: i + 1 }));
  res.json({ scores, completedMatches, liveMatches, lastSync: db.lastSync, totalMatches: MATCHES.length });
});

app.get('/api/predictions/:playerId', (req, res) => {
  const db = loadDB();
  const player = db.players.find(p => p.id === req.params.playerId);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  // Require PIN header for private prediction data
  if (player.pin) {
    const pin = req.headers['x-player-pin'];
    if (String(pin) !== String(player.pin)) return res.status(401).json({ error: 'PIN required' });
  }
  res.json({
    predictions: db.predictions[req.params.playerId] || {},
    outright_preds: db.outright_preds[req.params.playerId] || {},
  });
});

app.post('/api/predictions/:playerId', (req, res) => {
  const db = loadDB();
  const player = db.players.find(p => p.id === req.params.playerId);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  // Require PIN
  if (player.pin) {
    const pin = req.headers['x-player-pin'] || req.body?.pin;
    if (String(pin) !== String(player.pin)) return res.status(401).json({ error: 'PIN required' });
  }

  const { predictions, outright_preds } = req.body;
  let saved = 0, locked = 0;

  if (predictions) {
    if (!db.predictions[req.params.playerId]) db.predictions[req.params.playerId] = {};
    for (const [mid, pred] of Object.entries(predictions)) {
      if (isMatchLocked(mid)) { locked++; continue; }
      db.predictions[req.params.playerId][mid] = {
        homeScore: pred.homeScore,
        awayScore: pred.awayScore,
        result: pred.result,
      };
      saved++;
    }
  }

  if (outright_preds) {
    const OUTRIGHT_LOCK = new Date('2026-06-15T23:59:00Z');
    const outrightsLocked = Date.now() >= OUTRIGHT_LOCK.getTime();
    if (!outrightsLocked) {
      if (!db.outright_preds[req.params.playerId]) db.outright_preds[req.params.playerId] = {};
      for (const [oid, val] of Object.entries(outright_preds)) {
        db.outright_preds[req.params.playerId][oid] = val;
      }
    } else {
      return res.json({ saved, locked, outrightsLocked: true, message: 'Outrights locked — deadline was Jun 15' });
    }
  }

  saveDB(db);
  res.json({ saved, locked, message: locked > 0 ? `${locked} matches already locked` : 'Saved successfully' });
});

app.get('/api/all-predictions', (req, res) => {
  const db = loadDB();
  res.json({
    predictions: db.predictions,
    outright_preds: db.outright_preds,
    results: db.results,
    outright_answers: db.outright_answers,
  });
});

app.get('/api/locks', (req, res) => {
  const locks = {};
  MATCHES.forEach(m => { locks[m.id] = isMatchLocked(m.id); });
  res.json({ locks, now: new Date().toISOString() });
});

// ─── ADMIN ROUTES ─────────────────────────────────────────────────────────────

// Add player (admin sets the PIN too)
app.post('/api/admin/players', adminAuth, (req, res) => {
  const db = loadDB();
  const { name, pin } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Name required' });
  if (db.players.find(p => p.name.toLowerCase() === name.trim().toLowerCase()))
    return res.status(409).json({ error: 'Player already exists' });
  if (pin && (String(pin).length < 4 || String(pin).length > 6 || !/^\d+$/.test(String(pin))))
    return res.status(400).json({ error: 'PIN must be 4-6 digits' });
  const player = { id: 'p_' + Date.now(), name: name.trim(), pin: pin ? String(pin) : null, createdAt: new Date().toISOString() };
  db.players.push(player);
  saveDB(db);
  res.json({ player: { id: player.id, name: player.name, hasPin: !!player.pin } });
});

// Update player PIN
app.patch('/api/admin/players/:id/pin', adminAuth, (req, res) => {
  const db = loadDB();
  const player = db.players.find(p => p.id === req.params.id);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  const { pin } = req.body;
  if (pin && (String(pin).length < 4 || String(pin).length > 6 || !/^\d+$/.test(String(pin))))
    return res.status(400).json({ error: 'PIN must be 4-6 digits' });
  player.pin = pin ? String(pin) : null;
  saveDB(db);
  res.json({ ok: true });
});

app.delete('/api/admin/players/:id', adminAuth, (req, res) => {
  const db = loadDB();
  db.players = db.players.filter(p => p.id !== req.params.id);
  delete db.predictions[req.params.id];
  delete db.outright_preds[req.params.id];
  saveDB(db);
  res.json({ ok: true });
});

app.post('/api/admin/outrights', adminAuth, (req, res) => {
  const db = loadDB();
  Object.assign(db.outright_answers, req.body.answers);
  saveDB(db);
  res.json({ ok: true });
});

app.post('/api/admin/results', adminAuth, (req, res) => {
  const db = loadDB();
  for (const [mid, r] of Object.entries(req.body.results)) {
    if (r.homeScore !== '' && r.awayScore !== '' && r.status) {
      db.results[mid] = {
        homeScore: parseInt(r.homeScore),
        awayScore: parseInt(r.awayScore),
        status: r.status,
        result: getMatchResult(parseInt(r.homeScore), parseInt(r.awayScore)),
      };
    }
  }
  saveDB(db);
  res.json({ ok: true });
});

app.post('/api/admin/sync', adminAuth, async (req, res) => {
  const db = loadDB();
  if (req.body.apiKey) { db.apiKey = req.body.apiKey; saveDB(db); }
  const result = await syncLiveResults(db);
  res.json(result);
});

app.post('/api/admin/apikey', adminAuth, (req, res) => {
  const db = loadDB();
  db.apiKey = req.body.apiKey || '';
  saveDB(db);
  res.json({ ok: true });
});

app.get('/api/admin/export', adminAuth, (req, res) => {
  const db = loadDB();
  res.setHeader('Content-Disposition', 'attachment; filename="wc2026_backup.json"');
  res.json(db);
});

app.post('/api/admin/import', adminAuth, (req, res) => {
  saveDB(req.body);
  res.json({ ok: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`WC2026 Predictor running on http://localhost:${PORT}\nAdmin password: ${ADMIN_PASSWORD}`));
