// FIFA World Cup 2026 — All 134 matches
// Groups confirmed from official FIFA draw + March 2026 playoffs
// Kickoff times in UTC

const MATCHES = [];
let id = 1;

// ── CONFIRMED GROUPS ────────────────────────────────────────────────────────
// A: Mexico, South Africa, South Korea, Czechia
// B: Canada, Switzerland, Qatar, Bosnia and Herzegovina
// C: Brazil, Morocco, Haiti, Scotland
// D: USA, Paraguay, Australia, Türkiye
// E: Germany, Curaçao, Ivory Coast, Ecuador
// F: Netherlands, Japan, Sweden, Tunisia
// G: Belgium, Egypt, Iran, New Zealand
// H: Spain, Cape Verde, Saudi Arabia, Uruguay
// I: France, Senegal, Norway, Iraq
// J: Argentina, Algeria, Austria, Jordan
// K: Portugal, DR Congo, Uzbekistan, Colombia
// L: England, Croatia, Ghana, Panama

const groups = {
  A: { teams: ['Mexico','South Africa','South Korea','Czechia'],
       fx: [[0,1,'2026-06-11T20:00Z'],[2,3,'2026-06-12T01:00Z'],[0,2,'2026-06-15T23:00Z'],[1,3,'2026-06-16T02:00Z'],[3,0,'2026-06-19T23:00Z'],[2,1,'2026-06-19T23:00Z']] },
  B: { teams: ['Canada','Bosnia and Herzegovina','Qatar','Switzerland'],
       fx: [[0,1,'2026-06-12T20:00Z'],[2,3,'2026-06-13T20:00Z'],[0,2,'2026-06-16T23:00Z'],[1,3,'2026-06-17T02:00Z'],[0,3,'2026-06-20T23:00Z'],[1,2,'2026-06-20T23:00Z']] },
  C: { teams: ['Brazil','Morocco','Haiti','Scotland'],
       fx: [[0,1,'2026-06-13T23:00Z'],[2,3,'2026-06-14T02:00Z'],[0,2,'2026-06-17T23:00Z'],[1,3,'2026-06-18T02:00Z'],[0,3,'2026-06-21T23:00Z'],[1,2,'2026-06-21T23:00Z']] },
  D: { teams: ['USA','Paraguay','Australia','Türkiye'],
       fx: [[0,1,'2026-06-12T02:00Z'],[2,3,'2026-06-13T02:00Z'],[0,2,'2026-06-19T02:00Z'],[1,3,'2026-06-19T02:00Z'],[0,3,'2026-06-22T23:00Z'],[1,2,'2026-06-22T23:00Z']] },
  E: { teams: ['Germany','Curaçao','Ivory Coast','Ecuador'],
       fx: [[0,1,'2026-06-14T02:00Z'],[2,3,'2026-06-14T23:00Z'],[0,2,'2026-06-18T02:00Z'],[1,3,'2026-06-18T23:00Z'],[0,3,'2026-06-22T02:00Z'],[1,2,'2026-06-22T02:00Z']] },
  F: { teams: ['Netherlands','Japan','Sweden','Tunisia'],
       fx: [[0,1,'2026-06-15T02:00Z'],[2,3,'2026-06-15T23:00Z'],[0,2,'2026-06-19T02:00Z'],[1,3,'2026-06-19T23:00Z'],[0,3,'2026-06-23T02:00Z'],[1,2,'2026-06-23T02:00Z']] },
  G: { teams: ['Belgium','Egypt','Iran','New Zealand'],
       fx: [[0,1,'2026-06-15T02:00Z'],[2,3,'2026-06-15T23:00Z'],[0,2,'2026-06-19T02:00Z'],[1,3,'2026-06-19T23:00Z'],[0,3,'2026-06-23T02:00Z'],[1,2,'2026-06-23T02:00Z']] },
  H: { teams: ['Spain','Cape Verde','Saudi Arabia','Uruguay'],
       fx: [[0,1,'2026-06-15T17:00Z'],[2,3,'2026-06-15T22:00Z'],[0,2,'2026-06-19T22:00Z'],[1,3,'2026-06-20T02:00Z'],[0,3,'2026-06-23T22:00Z'],[1,2,'2026-06-23T22:00Z']] },
  I: { teams: ['France','Senegal','Norway','Iraq'],
       fx: [[0,1,'2026-06-16T02:00Z'],[2,3,'2026-06-16T05:00Z'],[0,2,'2026-06-20T02:00Z'],[1,3,'2026-06-20T05:00Z'],[0,3,'2026-06-24T02:00Z'],[1,2,'2026-06-24T02:00Z']] },
  J: { teams: ['Argentina','Algeria','Austria','Jordan'],
       fx: [[0,1,'2026-06-15T22:00Z'],[2,3,'2026-06-16T01:00Z'],[0,2,'2026-06-19T22:00Z'],[1,3,'2026-06-20T01:00Z'],[0,3,'2026-06-23T22:00Z'],[1,2,'2026-06-23T22:00Z']] },
  K: { teams: ['Portugal','DR Congo','Uzbekistan','Colombia'],
       fx: [[0,1,'2026-06-16T02:00Z'],[2,3,'2026-06-16T02:00Z'],[0,2,'2026-06-20T02:00Z'],[1,3,'2026-06-20T02:00Z'],[0,3,'2026-06-24T02:00Z'],[1,2,'2026-06-24T02:00Z']] },
  L: { teams: ['England','Croatia','Ghana','Panama'],
       fx: [[0,1,'2026-06-17T02:00Z'],[2,3,'2026-06-17T02:00Z'],[0,2,'2026-06-21T02:00Z'],[1,3,'2026-06-21T02:00Z'],[0,3,'2026-06-27T02:00Z'],[1,2,'2026-06-27T02:00Z']] },
};

for (const [grp, { teams, fx }] of Object.entries(groups)) {
  for (const [a, b, kickoff] of fx) {
    MATCHES.push({ id: id++, stage: 'Group Stage', group: `Group ${grp}`, home: teams[a], away: teams[b], kickoff });
  }
}

// Sort group stage by date
MATCHES.sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));
// Re-assign IDs in date order
MATCHES.forEach((m, i) => m.id = i + 1);
id = MATCHES.length + 1;

// ── KNOCKOUT ROUNDS ──────────────────────────────────────────────────────────
const r32 = [
  ['2026-06-28T18:00Z'],['2026-06-28T22:00Z'],
  ['2026-06-29T18:00Z'],['2026-06-29T22:00Z'],
  ['2026-06-30T18:00Z'],['2026-06-30T22:00Z'],
  ['2026-07-01T18:00Z'],['2026-07-01T22:00Z'],
  ['2026-07-02T18:00Z'],['2026-07-02T22:00Z'],
  ['2026-07-03T18:00Z'],['2026-07-03T22:00Z'],
  ['2026-07-04T18:00Z'],['2026-07-04T22:00Z'],
  ['2026-07-05T18:00Z'],['2026-07-05T22:00Z'],
];
for (let i = 0; i < 32; i++) {
  MATCHES.push({ id: id++, stage: 'Round of 32', group: null, home: `R32-${i+1} Home`, away: `R32-${i+1} Away`, kickoff: r32[i % 16][0] });
}

const r16 = ['2026-07-09T18:00Z','2026-07-09T22:00Z','2026-07-10T18:00Z','2026-07-10T22:00Z',
             '2026-07-11T18:00Z','2026-07-11T22:00Z','2026-07-12T18:00Z','2026-07-12T22:00Z'];
for (let i = 0; i < 16; i++) {
  MATCHES.push({ id: id++, stage: 'Round of 16', group: null, home: `R16-${i+1} Home`, away: `R16-${i+1} Away`, kickoff: r16[i % 8] });
}

const qf = ['2026-07-17T18:00Z','2026-07-17T22:00Z','2026-07-18T18:00Z','2026-07-18T22:00Z'];
for (let i = 0; i < 8; i++) {
  MATCHES.push({ id: id++, stage: 'Quarter-finals', group: null, home: `QF-${i+1} Home`, away: `QF-${i+1} Away`, kickoff: qf[i % 4] });
}

const sf = ['2026-07-21T22:00Z','2026-07-22T22:00Z'];
for (let i = 0; i < 4; i++) {
  MATCHES.push({ id: id++, stage: 'Semi-finals', group: null, home: `SF-${i+1} Home`, away: `SF-${i+1} Away`, kickoff: sf[i % 2] });
}

MATCHES.push({ id: id++, stage: '3rd Place', group: null, home: 'SF Loser 1', away: 'SF Loser 2', kickoff: '2026-07-18T19:00Z' });
MATCHES.push({ id: id++, stage: 'Final', group: null, home: 'Finalist 1', away: 'Finalist 2', kickoff: '2026-07-19T19:00Z' });

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
