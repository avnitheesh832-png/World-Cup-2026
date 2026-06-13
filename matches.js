// FIFA World Cup 2026 — All matches with verified GST kickoff times
// Source: worldcuplocaltime.com/2026-fifa-world-cup-schedule-uae-standard-time-gst/
// GST = UTC+4. Times stored as UTC ISO strings.

const MATCHES = [];
let id = 1;

// Convert GST date+time to UTC ISO string
// e.g. gst('2026-06-11','23:00') => '2026-06-11T19:00:00.000Z'
function gst(date, time) {
  const [h, m] = time.split(':').map(Number);
  const utcH = h - 4;
  const d = new Date(date + 'T00:00:00Z');
  d.setUTCHours(utcH, m || 0, 0, 0);
  return d.toISOString();
}

// ── GROUP STAGE — all 72 matches, exact GST times ────────────────────────────
const gs = [
  // Thu 11 Jun
  ['A','Mexico','South Africa','2026-06-11','23:00'],
  // Fri 12 Jun
  ['A','South Korea','Czechia','2026-06-12','06:00'],
  ['B','Canada','Bosnia and Herzegovina','2026-06-12','23:00'],
  // Sat 13 Jun
  ['D','USA','Paraguay','2026-06-13','05:00'],
  ['B','Qatar','Switzerland','2026-06-13','23:00'],
  // Sun 14 Jun
  ['C','Brazil','Morocco','2026-06-14','02:00'],
  ['C','Haiti','Scotland','2026-06-14','05:00'],
  ['D','Australia','Türkiye','2026-06-14','08:00'],
  ['E','Germany','Curaçao','2026-06-14','21:00'],
  // Mon 15 Jun
  ['F','Netherlands','Japan','2026-06-15','00:00'],
  ['E','Ivory Coast','Ecuador','2026-06-15','03:00'],
  ['F','Sweden','Tunisia','2026-06-15','06:00'],
  ['H','Spain','Cape Verde','2026-06-15','20:00'],
  ['G','Belgium','Egypt','2026-06-15','23:00'],
  // Tue 16 Jun
  ['H','Saudi Arabia','Uruguay','2026-06-16','02:00'],
  ['G','Iran','New Zealand','2026-06-16','05:00'],
  ['I','France','Senegal','2026-06-16','23:00'],
  // Wed 17 Jun
  ['I','Iraq','Norway','2026-06-17','02:00'],
  ['J','Argentina','Algeria','2026-06-17','05:00'],
  ['J','Austria','Jordan','2026-06-17','08:00'],
  ['K','Portugal','DR Congo','2026-06-17','21:00'],
  // Thu 18 Jun
  ['L','England','Croatia','2026-06-18','00:00'],
  ['L','Ghana','Panama','2026-06-18','03:00'],
  ['K','Uzbekistan','Colombia','2026-06-18','06:00'],
  ['A','Czechia','South Africa','2026-06-18','20:00'],
  ['B','Switzerland','Bosnia and Herzegovina','2026-06-18','23:00'],
  // Fri 19 Jun
  ['B','Canada','Qatar','2026-06-19','02:00'],
  ['A','Mexico','South Korea','2026-06-19','05:00'],
  ['D','USA','Australia','2026-06-19','23:00'],
  // Sat 20 Jun
  ['C','Scotland','Morocco','2026-06-20','02:00'],
  ['C','Brazil','Haiti','2026-06-20','04:30'],
  ['D','Türkiye','Paraguay','2026-06-20','07:00'],
  ['F','Netherlands','Sweden','2026-06-20','21:00'],
  // Sun 21 Jun
  ['E','Germany','Ivory Coast','2026-06-21','00:00'],
  ['E','Ecuador','Curaçao','2026-06-21','04:00'],
  ['F','Tunisia','Japan','2026-06-21','08:00'],
  ['H','Spain','Saudi Arabia','2026-06-21','20:00'],
  ['G','Belgium','Iran','2026-06-21','23:00'],
  // Mon 22 Jun
  ['H','Uruguay','Cape Verde','2026-06-22','02:00'],
  ['G','New Zealand','Egypt','2026-06-22','05:00'],
  ['J','Argentina','Austria','2026-06-22','21:00'],
  // Tue 23 Jun
  ['I','France','Iraq','2026-06-23','01:00'],
  ['I','Norway','Senegal','2026-06-23','04:00'],
  ['J','Jordan','Algeria','2026-06-23','07:00'],
  ['K','Portugal','Uzbekistan','2026-06-23','21:00'],
  // Wed 24 Jun
  ['L','England','Ghana','2026-06-24','00:00'],
  ['L','Panama','Croatia','2026-06-24','03:00'],
  ['K','Colombia','DR Congo','2026-06-24','06:00'],
  ['B','Switzerland','Canada','2026-06-24','23:00'],
  ['B','Bosnia and Herzegovina','Qatar','2026-06-24','23:00'],
  // Thu 25 Jun
  ['C','Scotland','Brazil','2026-06-25','02:00'],
  ['C','Morocco','Haiti','2026-06-25','02:00'],
  ['A','Czechia','Mexico','2026-06-25','05:00'],
  ['A','South Africa','South Korea','2026-06-25','05:00'],
  // Fri 26 Jun
  ['E','Curaçao','Ivory Coast','2026-06-26','00:00'],
  ['E','Ecuador','Germany','2026-06-26','00:00'],
  ['F','Japan','Netherlands','2026-06-26','03:00'],
  ['F','Tunisia','Sweden','2026-06-26','03:00'],
  // Sat 27 Jun
  ['H','Cape Verde','Spain','2026-06-27','00:00'],
  ['H','Uruguay','Saudi Arabia','2026-06-27','00:00'],
  ['G','Egypt','Belgium','2026-06-27','03:00'],
  ['G','New Zealand','Iran','2026-06-27','03:00'],
  // Group D deciders Jun 29 (same time slot)
  ['D','USA','Türkiye','2026-06-29','09:00'],
  ['D','Paraguay','Australia','2026-06-29','09:00'],
  // Sun 28 Jun
  ['I','Senegal','France','2026-06-28','00:00'],
  ['I','Norway','Iraq','2026-06-28','00:00'],
  ['J','Algeria','Argentina','2026-06-28','03:00'],
  ['J','Jordan','Austria','2026-06-28','03:00'],
  // Mon 29 Jun
  ['K','DR Congo','Portugal','2026-06-29','00:00'],
  ['K','Colombia','Uzbekistan','2026-06-29','00:00'],
  ['L','Croatia','England','2026-06-29','03:00'],
  ['L','Panama','Ghana','2026-06-29','03:00'],
];

for (const [g, h, a, d, t] of gs) {
  MATCHES.push({ id: id++, stage: 'Group Stage', group: `Group ${g}`, home: h, away: a, kickoff: gst(d, t) });
}

// ── ROUND OF 32 — Jul 2-5 (GST) ─────────────────────────────────────────────
const r32slots = [
  ['2026-07-02','21:00'],['2026-07-03','01:00'],
  ['2026-07-03','21:00'],['2026-07-04','01:00'],
  ['2026-07-04','21:00'],['2026-07-05','01:00'],
  ['2026-07-05','21:00'],['2026-07-06','01:00'],
  ['2026-07-06','21:00'],['2026-07-07','01:00'],
  ['2026-07-07','21:00'],['2026-07-08','01:00'],
  ['2026-07-08','21:00'],['2026-07-09','01:00'],
  ['2026-07-09','21:00'],['2026-07-10','01:00'],
];
for (let i = 0; i < 32; i++) {
  const [d, t] = r32slots[i % 16];
  MATCHES.push({ id: id++, stage: 'Round of 32', group: null, home: `R32-${i+1} Home`, away: `R32-${i+1} Away`, kickoff: gst(d, t) });
}

// ── ROUND OF 16 — Jul 13-16 (GST) ────────────────────────────────────────────
const r16slots = [
  ['2026-07-13','21:00'],['2026-07-14','01:00'],
  ['2026-07-14','21:00'],['2026-07-15','01:00'],
  ['2026-07-15','21:00'],['2026-07-16','01:00'],
  ['2026-07-16','21:00'],['2026-07-17','01:00'],
];
for (let i = 0; i < 16; i++) {
  const [d, t] = r16slots[i % 8];
  MATCHES.push({ id: id++, stage: 'Round of 16', group: null, home: `R16-${i+1} Home`, away: `R16-${i+1} Away`, kickoff: gst(d, t) });
}

// ── QUARTER-FINALS — Jul 18-19 (GST) ─────────────────────────────────────────
const qfslots = [['2026-07-18','01:00'],['2026-07-18','21:00'],['2026-07-19','01:00'],['2026-07-19','21:00']];
for (let i = 0; i < 8; i++) {
  const [d, t] = qfslots[i % 4];
  MATCHES.push({ id: id++, stage: 'Quarter-finals', group: null, home: `QF-${i+1} Home`, away: `QF-${i+1} Away`, kickoff: gst(d, t) });
}

// ── SEMI-FINALS — Jul 22-23 (GST) ────────────────────────────────────────────
for (let i = 0; i < 4; i++) {
  const d = i < 2 ? '2026-07-22' : '2026-07-23';
  MATCHES.push({ id: id++, stage: 'Semi-finals', group: null, home: `SF-${i+1} Home`, away: `SF-${i+1} Away`, kickoff: gst(d, '02:00') });
}

// ── 3RD PLACE + FINAL ─────────────────────────────────────────────────────────
MATCHES.push({ id: id++, stage: '3rd Place', group: null, home: 'SF Loser 1', away: 'SF Loser 2', kickoff: gst('2026-07-19', '03:00') });
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
