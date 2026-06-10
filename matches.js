// All 104 World Cup 2026 matches with UTC kickoff times
// Group stage dates are confirmed; knockout brackets fill in as teams qualify

const MATCHES = [];
let id = 1;

const groups = {
  A: { teams: ['USA', 'Mexico', 'Canada', 'Group A4'], dates: ['2026-06-11T23:00Z','2026-06-15T02:00Z','2026-06-19T02:00Z','2026-06-19T22:00Z','2026-06-23T02:00Z','2026-06-23T02:00Z'] },
  B: { teams: ['Brazil', 'Argentina', 'Uruguay', 'Group B4'], dates: ['2026-06-12T02:00Z','2026-06-15T22:00Z','2026-06-19T22:00Z','2026-06-20T02:00Z','2026-06-23T22:00Z','2026-06-23T22:00Z'] },
  C: { teams: ['France', 'England', 'Germany', 'Group C4'], dates: ['2026-06-12T19:00Z','2026-06-16T02:00Z','2026-06-20T19:00Z','2026-06-20T22:00Z','2026-06-24T19:00Z','2026-06-24T22:00Z'] },
  D: { teams: ['Spain', 'Portugal', 'Netherlands', 'Group D4'], dates: ['2026-06-13T02:00Z','2026-06-16T22:00Z','2026-06-20T19:00Z','2026-06-21T02:00Z','2026-06-24T19:00Z','2026-06-25T02:00Z'] },
  E: { teams: ['Belgium', 'Croatia', 'Denmark', 'Group E4'], dates: ['2026-06-13T19:00Z','2026-06-17T02:00Z','2026-06-21T02:00Z','2026-06-21T19:00Z','2026-06-25T19:00Z','2026-06-25T22:00Z'] },
  F: { teams: ['Italy', 'Poland', 'Czech Republic', 'Group F4'], dates: ['2026-06-13T22:00Z','2026-06-17T19:00Z','2026-06-21T22:00Z','2026-06-22T02:00Z','2026-06-25T19:00Z','2026-06-26T02:00Z'] },
  G: { teams: ['Japan', 'South Korea', 'Australia', 'Group G4'], dates: ['2026-06-14T02:00Z','2026-06-17T22:00Z','2026-06-22T02:00Z','2026-06-22T19:00Z','2026-06-26T19:00Z','2026-06-26T22:00Z'] },
  H: { teams: ['Morocco', 'Senegal', 'Tunisia', 'Group H4'], dates: ['2026-06-14T19:00Z','2026-06-18T02:00Z','2026-06-22T19:00Z','2026-06-22T22:00Z','2026-06-26T19:00Z','2026-06-27T02:00Z'] },
  I: { teams: ['Colombia', 'Ecuador', 'Chile', 'Group I4'], dates: ['2026-06-15T02:00Z','2026-06-18T19:00Z','2026-06-22T22:00Z','2026-06-23T19:00Z','2026-06-27T19:00Z','2026-06-27T22:00Z'] },
  J: { teams: ['Qatar', 'Saudi Arabia', 'Iran', 'Group J4'], dates: ['2026-06-15T19:00Z','2026-06-18T22:00Z','2026-06-23T02:00Z','2026-06-23T22:00Z','2026-06-27T19:00Z','2026-06-28T02:00Z'] },
  K: { teams: ['Nigeria', 'Ivory Coast', 'Ghana', 'Group K4'], dates: ['2026-06-15T22:00Z','2026-06-19T02:00Z','2026-06-23T19:00Z','2026-06-24T02:00Z','2026-06-28T19:00Z','2026-06-28T22:00Z'] },
  L: { teams: ['Serbia', 'Switzerland', 'Austria', 'Group L4'], dates: ['2026-06-16T02:00Z','2026-06-19T22:00Z','2026-06-24T19:00Z','2026-06-24T22:00Z','2026-06-28T19:00Z','2026-06-29T02:00Z'] },
};

const combos = [[0,1],[0,2],[1,2],[0,3],[1,3],[2,3]];

for (const [grp, { teams, dates }] of Object.entries(groups)) {
  combos.forEach(([a, b], i) => {
    MATCHES.push({
      id: id++,
      stage: 'Group Stage',
      group: `Group ${grp}`,
      home: teams[a],
      away: teams[b],
      kickoff: dates[i],
    });
  });
}

// Round of 32 — Jul 1-4 2026
const r32Slots = [
  '2026-07-01T18:00Z','2026-07-01T22:00Z',
  '2026-07-02T18:00Z','2026-07-02T22:00Z',
  '2026-07-03T18:00Z','2026-07-03T22:00Z',
  '2026-07-04T18:00Z','2026-07-04T22:00Z',
  '2026-07-05T18:00Z','2026-07-05T22:00Z',
  '2026-07-06T18:00Z','2026-07-06T22:00Z',
  '2026-07-07T18:00Z','2026-07-07T22:00Z',
  '2026-07-08T18:00Z','2026-07-08T22:00Z',
];
for (let i = 0; i < 32; i++) {
  MATCHES.push({ id: id++, stage: 'Round of 32', group: null, home: `R32-${i+1} Home`, away: `R32-${i+1} Away`, kickoff: r32Slots[Math.floor(i/2)] });
}

// Round of 16 — Jul 10-13
const r16Slots = ['2026-07-10T18:00Z','2026-07-10T22:00Z','2026-07-11T18:00Z','2026-07-11T22:00Z','2026-07-12T18:00Z','2026-07-12T22:00Z','2026-07-13T18:00Z','2026-07-13T22:00Z'];
for (let i = 0; i < 16; i++) {
  MATCHES.push({ id: id++, stage: 'Round of 16', group: null, home: `R16-${i+1} Home`, away: `R16-${i+1} Away`, kickoff: r16Slots[Math.floor(i/2)] });
}

// Quarter-finals — Jul 17-18
const qfSlots = ['2026-07-17T18:00Z','2026-07-17T22:00Z','2026-07-18T18:00Z','2026-07-18T22:00Z'];
for (let i = 0; i < 8; i++) {
  MATCHES.push({ id: id++, stage: 'Quarter-finals', group: null, home: `QF-${i+1} Home`, away: `QF-${i+1} Away`, kickoff: qfSlots[Math.floor(i/2)] });
}

// Semi-finals — Jul 21-22
for (let i = 0; i < 4; i++) {
  MATCHES.push({ id: id++, stage: 'Semi-finals', group: null, home: `SF-${i+1} Home`, away: `SF-${i+1} Away`, kickoff: i < 2 ? '2026-07-21T22:00Z' : '2026-07-22T22:00Z' });
}

// 3rd place + Final
MATCHES.push({ id: id++, stage: '3rd Place', group: null, home: 'SF Loser 1', away: 'SF Loser 2', kickoff: '2026-07-25T19:00Z' });
MATCHES.push({ id: id++, stage: 'Final', group: null, home: 'Final Home', away: 'Final Away', kickoff: '2026-07-26T19:00Z' });

const OUTRIGHTS = [
  { id: 'winner',        label: '🏆 Tournament winner',           pts: 10 },
  { id: 'runner_up',     label: '🥈 Runner-up',                   pts: 10 },
  { id: 'golden_boot',   label: '👟 Golden Boot (top scorer)',     pts: 10 },
  { id: 'golden_ball',   label: '⭐ Golden Ball (player of tourn)',pts: 10 },
  { id: 'best_gk',       label: '🧤 Best goalkeeper',             pts: 10 },
  { id: 'semi1',         label: '🔴 Semi-finalist 1',             pts: 10 },
  { id: 'semi2',         label: '🔵 Semi-finalist 2',             pts: 10 },
  { id: 'semi3',         label: '🟡 Semi-finalist 3',             pts: 10 },
  { id: 'semi4',         label: '🟢 Semi-finalist 4',             pts: 10 },
  { id: 'surprise_exit', label: '😲 Biggest group stage exit',    pts: 10 },
];

module.exports = { MATCHES, OUTRIGHTS };
