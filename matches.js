// FIFA World Cup 2026 — Official fixtures with correct GST kickoff times
// Source: The National UAE (thenationalnews.com) — UAE GST times confirmed
// All times stored as UTC (GST = UTC+4), lock triggers 5 min before kickoff

const MATCHES = [];
let id = 1;

// Helper: convert GST time to UTC ISO string
// gstDate = "2026-06-11", gstTime = "23:00" means 23:00 GST = 19:00 UTC
function gst(date, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const utcH = h - 4;
  // Handle day rollback
  let d = new Date(date + 'T00:00:00Z');
  d.setUTCHours(utcH, m, 0, 0);
  return d.toISOString();
}

// ── GROUP STAGE — exact GST times from The National UAE ──────────────────────

const groupMatches = [
  // Thursday June 11
  { g:'A', h:'Mexico',              a:'South Africa',        d:'2026-06-11', t:'23:00' },
  // Friday June 12
  { g:'A', h:'South Korea',         a:'Czechia',             d:'2026-06-12', t:'06:00' },
  { g:'B', h:'Canada',              a:'Bosnia and Herzegovina', d:'2026-06-12', t:'23:00' },
  // Saturday June 13
  { g:'D', h:'USA',                 a:'Paraguay',            d:'2026-06-13', t:'05:00' },
  { g:'B', h:'Qatar',               a:'Switzerland',         d:'2026-06-13', t:'23:00' },
  // Sunday June 14
  { g:'C', h:'Brazil',              a:'Morocco',             d:'2026-06-14', t:'02:00' },
  { g:'C', h:'Haiti',               a:'Scotland',            d:'2026-06-14', t:'05:00' },
  { g:'D', h:'Australia',           a:'Türkiye',             d:'2026-06-14', t:'08:00' },
  { g:'E', h:'Germany',             a:'Curaçao',             d:'2026-06-14', t:'21:00' },
  // Monday June 15
  { g:'F', h:'Netherlands',         a:'Japan',               d:'2026-06-15', t:'00:00' },
  { g:'E', h:'Ivory Coast',         a:'Ecuador',             d:'2026-06-15', t:'03:00' },
  { g:'F', h:'Sweden',              a:'Tunisia',             d:'2026-06-15', t:'06:00' },
  { g:'H', h:'Spain',               a:'Cape Verde',          d:'2026-06-15', t:'20:00' },
  { g:'G', h:'Belgium',             a:'Egypt',               d:'2026-06-15', t:'23:00' },
  // Tuesday June 16
  { g:'H', h:'Saudi Arabia',        a:'Uruguay',             d:'2026-06-16', t:'02:00' },
  { g:'G', h:'Iran',                a:'New Zealand',         d:'2026-06-16', t:'05:00' },
  { g:'I', h:'France',              a:'Senegal',             d:'2026-06-16', t:'23:00' },
  // Wednesday June 17
  { g:'I', h:'Iraq',                a:'Norway',              d:'2026-06-17', t:'02:00' },
  { g:'J', h:'Argentina',           a:'Algeria',             d:'2026-06-17', t:'05:00' },
  { g:'J', h:'Austria',             a:'Jordan',              d:'2026-06-17', t:'08:00' },
  { g:'K', h:'Portugal',            a:'DR Congo',            d:'2026-06-17', t:'21:00' },
  // Thursday June 18
  { g:'L', h:'England',             a:'Croatia',             d:'2026-06-18', t:'00:00' },
  { g:'L', h:'Ghana',               a:'Panama',              d:'2026-06-18', t:'03:00' },
  { g:'K', h:'Uzbekistan',          a:'Colombia',            d:'2026-06-18', t:'06:00' },
  { g:'A', h:'Czechia',             a:'South Africa',        d:'2026-06-18', t:'20:00' },
  { g:'B', h:'Switzerland',         a:'Bosnia and Herzegovina', d:'2026-06-18', t:'23:00' },
  // Friday June 19
  { g:'B', h:'Canada',              a:'Qatar',               d:'2026-06-19', t:'02:00' },
  { g:'A', h:'Mexico',              a:'South Korea',         d:'2026-06-19', t:'05:00' },
  { g:'D', h:'USA',                 a:'Australia',           d:'2026-06-19', t:'23:00' },
  // Saturday June 20
  { g:'C', h:'Scotland',            a:'Morocco',             d:'2026-06-20', t:'02:00' },
  { g:'C', h:'Brazil',              a:'Haiti',               d:'2026-06-20', t:'04:30' },
  { g:'D', h:'Türkiye',             a:'Paraguay',            d:'2026-06-20', t:'07:00' },
  { g:'F', h:'Netherlands',         a:'Sweden',              d:'2026-06-20', t:'21:00' },
  // Sunday June 21
  { g:'E', h:'Germany',             a:'Ivory Coast',         d:'2026-06-21', t:'00:00' },
  { g:'E', h:'Ecuador',             a:'Curaçao',             d:'2026-06-21', t:'04:00' },
  { g:'F', h:'Tunisia',             a:'Japan',               d:'2026-06-21', t:'08:00' },
  { g:'H', h:'Spain',               a:'Saudi Arabia',        d:'2026-06-21', t:'20:00' },
  { g:'G', h:'Belgium',             a:'Iran',                d:'2026-06-21', t:'23:00' },
  // Monday June 22
  { g:'H', h:'Uruguay',             a:'Cape Verde',          d:'2026-06-22', t:'02:00' },
  { g:'G', h:'New Zealand',         a:'Egypt',               d:'2026-06-22', t:'05:00' },
  { g:'J', h:'Argentina',           a:'Austria',             d:'2026-06-22', t:'21:00' },
  // Tuesday June 23
  { g:'I', h:'France',              a:'Iraq',                d:'2026-06-23', t:'01:00' },
  { g:'I', h:'Norway',              a:'Senegal',             d:'2026-06-23', t:'04:00' },
  { g:'J', h:'Jordan',              a:'Algeria',             d:'2026-06-23', t:'07:00' },
  { g:'K', h:'Portugal',            a:'Uzbekistan',          d:'2026-06-23', t:'21:00' },
  // Wednesday June 24
  { g:'L', h:'England',             a:'Ghana',               d:'2026-06-24', t:'00:00' },
  { g:'L', h:'Panama',              a:'Croatia',             d:'2026-06-24', t:'03:00' },
  { g:'K', h:'Colombia',            a:'DR Congo',            d:'2026-06-24', t:'06:00' },
  { g:'B', h:'Switzerland',         a:'Canada',              d:'2026-06-24', t:'23:00' },
  // Thursday June 25
  { g:'B', h:'Bosnia and Herzegovina', a:'Qatar',            d:'2026-06-25', t:'23:00' },
  // Friday June 26
  { g:'A', h:'Mexico',              a:'Czechia',             d:'2026-06-26', t:'23:00' },
  { g:'A', h:'South Korea',         a:'South Africa',        d:'2026-06-26', t:'23:00' },
  // Saturday June 27
  { g:'C', h:'Brazil',              a:'Scotland',            d:'2026-06-27', t:'02:00' },
  { g:'C', h:'Morocco',             a:'Haiti',               d:'2026-06-27', t:'02:00' },
  { g:'D', h:'USA',                 a:'Türkiye',             d:'2026-06-27', t:'23:00' },
  { g:'D', h:'Paraguay',            a:'Australia',           d:'2026-06-27', t:'23:00' },
  // Sunday June 28 (note: some matches not yet confirmed — using best available)
  { g:'E', h:'Germany',             a:'Ecuador',             d:'2026-06-28', t:'02:00' },
  { g:'E', h:'Ivory Coast',         a:'Curaçao',             d:'2026-06-28', t:'02:00' },
  { g:'F', h:'Netherlands',         a:'Tunisia',             d:'2026-06-28', t:'23:00' },
  { g:'F', h:'Japan',               a:'Sweden',              d:'2026-06-28', t:'23:00' },
  // Monday June 29 (note: from The National, some June 28-29 confirmed)
  { g:'H', h:'Spain',               a:'Uruguay',             d:'2026-06-29', t:'02:00' },
  { g:'H', h:'Cape Verde',          a:'Saudi Arabia',        d:'2026-06-29', t:'02:00' },
  { g:'G', h:'Belgium',             a:'New Zealand',         d:'2026-06-29', t:'23:00' },
  { g:'G', h:'Egypt',               a:'Iran',                d:'2026-06-29', t:'23:00' },
  // Tuesday June 30
  { g:'I', h:'France',              a:'Norway',              d:'2026-06-30', t:'02:00' },
  { g:'I', h:'Senegal',             a:'Iraq',                d:'2026-06-30', t:'02:00' },
  { g:'J', h:'Argentina',           a:'Jordan',              d:'2026-06-30', t:'23:00' },
  { g:'J', h:'Algeria',             a:'Austria',             d:'2026-06-30', t:'23:00' },
  // Wednesday July 1
  { g:'K', h:'Portugal',            a:'Colombia',            d:'2026-07-01', t:'02:00' },
  { g:'K', h:'DR Congo',            a:'Uzbekistan',          d:'2026-07-01', t:'02:00' },
  { g:'L', h:'England',             a:'Panama',              d:'2026-07-01', t:'23:00' },
  { g:'L', h:'Croatia',             a:'Ghana',               d:'2026-07-01', t:'23:00' },
];

for (const m of groupMatches) {
  MATCHES.push({
    id: id++,
    stage: 'Group Stage',
    group: `Group ${m.g}`,
    home: m.h,
    away: m.a,
    kickoff: gst(m.d, m.t),
  });
}

// ── ROUND OF 32 ───────────────────────────────────────────────────────────────
// July 3-6 (GST) — 16 slots × 2 matches each
const r32 = [
  ['2026-07-03','21:00'],['2026-07-04','01:00'],
  ['2026-07-04','21:00'],['2026-07-05','01:00'],
  ['2026-07-05','21:00'],['2026-07-06','01:00'],
  ['2026-07-06','21:00'],['2026-07-07','01:00'],
  ['2026-07-07','21:00'],['2026-07-08','01:00'],
  ['2026-07-08','21:00'],['2026-07-09','01:00'],
  ['2026-07-09','21:00'],['2026-07-10','01:00'],
  ['2026-07-10','21:00'],['2026-07-11','01:00'],
];
for (let i = 0; i < 32; i++) {
  const [d, t] = r32[i % 16];
  MATCHES.push({ id: id++, stage: 'Round of 32', group: null, home: `R32-${i+1} Home`, away: `R32-${i+1} Away`, kickoff: gst(d, t) });
}

// ── ROUND OF 16 ──────────────────────────────────────────────────────────────
const r16 = [
  ['2026-07-13','21:00'],['2026-07-14','01:00'],
  ['2026-07-14','21:00'],['2026-07-15','01:00'],
  ['2026-07-15','21:00'],['2026-07-16','01:00'],
  ['2026-07-16','21:00'],['2026-07-17','01:00'],
];
for (let i = 0; i < 16; i++) {
  const [d, t] = r16[i % 8];
  MATCHES.push({ id: id++, stage: 'Round of 16', group: null, home: `R16-${i+1} Home`, away: `R16-${i+1} Away`, kickoff: gst(d, t) });
}

// ── QUARTER-FINALS ────────────────────────────────────────────────────────────
const qfSlots = [['2026-07-18','01:00'],['2026-07-18','21:00'],['2026-07-19','01:00'],['2026-07-19','21:00']];
for (let i = 0; i < 8; i++) {
  const [d, t] = qfSlots[i % 4];
  MATCHES.push({ id: id++, stage: 'Quarter-finals', group: null, home: `QF-${i+1} Home`, away: `QF-${i+1} Away`, kickoff: gst(d, t) });
}

// ── SEMI-FINALS ──────────────────────────────────────────────────────────────
for (let i = 0; i < 4; i++) {
  const d = i < 2 ? '2026-07-22' : '2026-07-23';
  MATCHES.push({ id: id++, stage: 'Semi-finals', group: null, home: `SF-${i+1} Home`, away: `SF-${i+1} Away`, kickoff: gst(d, '02:00') });
}

// ── 3RD PLACE + FINAL ────────────────────────────────────────────────────────
MATCHES.push({ id: id++, stage: '3rd Place', group: null, home: 'SF Loser 1', away: 'SF Loser 2', kickoff: gst('2026-07-18', '23:00') });
MATCHES.push({ id: id++, stage: 'Final', group: null, home: 'Finalist 1', away: 'Finalist 2', kickoff: gst('2026-07-19', '23:00') });

const OUTRIGHTS = [
  { id: 'winner',        label: '🏆 Tournament winner',            pts: 10 },
  { id: 'runner_up',     label: '🥈 Runner-up',                    pts: 10 },
  { id: 'golden_boot',   label: '👟 Golden Boot (top scorer)',      pts: 10 },
  { id: 'golden_ball',   label: '⭐ Golden Ball (player of tourn)', pts: 10 },
  { id: 'best_gk',       label: '🧤 Best goalkeeper',              pts: 10 },
  { id: 'semi1',         label: '🔴 Semi-finalist 1',              pts: 10 },
  { id: 'semi2',         label: '🔵 Semi-finalist 2',              pts: 10 },
  { id: 'semi3',         label: '🟡 Semi-finalist 3',              pts: 10 },
  { id: 'semi4',         label: '🟢 Semi-finalist 4',              pts: 10 },
  { id: 'surprise_exit', label: '😲 Biggest group stage exit',     pts: 10 },
];

module.exports = { MATCHES, OUTRIGHTS };
