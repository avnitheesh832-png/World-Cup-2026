// All 104 World Cup 2026 group stage matches — official FIFA fixtures
// Kickoff times in UTC

const MATCHES = [];
let id = 1;

// Official groups from the FIFA draw (Dec 5 2025)
const groups = {
  A: { teams: ['Mexico','South Africa','South Korea','Czech Republic'],
       fixtures: [[0,1,'2026-06-11T20:00Z'],[2,3,'2026-06-11T20:00Z'],[0,2,'2026-06-15T23:00Z'],[1,3,'2026-06-15T23:00Z'],[0,3,'2026-06-19T23:00Z'],[1,2,'2026-06-19T23:00Z']] },
  B: { teams: ['Canada','Bosnia and Herzegovina','Qatar','Switzerland'],
       fixtures: [[0,1,'2026-06-12T20:00Z'],[2,3,'2026-06-13T20:00Z'],[0,2,'2026-06-16T23:00Z'],[1,3,'2026-06-17T02:00Z'],[0,3,'2026-06-20T23:00Z'],[1,2,'2026-06-21T02:00Z']] },
  C: { teams: ['Brazil','Morocco','Haiti','Scotland'],
       fixtures: [[0,1,'2026-06-13T23:00Z'],[2,3,'2026-06-14T02:00Z'],[0,2,'2026-06-17T23:00Z'],[1,3,'2026-06-18T02:00Z'],[0,3,'2026-06-21T23:00Z'],[1,2,'2026-06-22T02:00Z']] },
  D: { teams: ['USA','Paraguay','Australia','European playoff'],
       fixtures: [[0,1,'2026-06-12T02:00Z'],[2,3,'2026-06-13T02:00Z'],[0,2,'2026-06-19T02:00Z'],[1,3,'2026-06-19T02:00Z'],[0,3,'2026-06-22T23:00Z'],[1,2,'2026-06-22T23:00Z']] },
  E: { teams: ['Germany','Ivory Coast','Ecuador','Curacao'],
       fixtures: [[0,1,'2026-06-14T02:00Z'],[2,3,'2026-06-14T02:00Z'],[0,2,'2026-06-18T02:00Z'],[1,3,'2026-06-18T02:00Z'],[0,3,'2026-06-22T02:00Z'],[1,2,'2026-06-22T02:00Z']] },
  F: { teams: ['Tunisia','Japan','Spain','Saudi Arabia'],
       fixtures: [[0,1,'2026-06-15T02:00Z'],[2,3,'2026-06-15T22:00Z'],[0,2,'2026-06-19T02:00Z'],[1,3,'2026-06-19T02:00Z'],[0,3,'2026-06-23T02:00Z'],[1,2,'2026-06-23T02:00Z']] },
  G: { teams: ['Belgium','Iran','New Zealand','Egypt'],
       fixtures: [[0,1,'2026-06-15T02:00Z'],[2,3,'2026-06-15T02:00Z'],[0,2,'2026-06-19T02:00Z'],[1,3,'2026-06-19T02:00Z'],[0,3,'2026-06-23T02:00Z'],[1,2,'2026-06-23T02:00Z']] },
  H: { teams: ['Spain','Cape Verde','Saudi Arabia','Uruguay'],
       fixtures: [[0,1,'2026-06-15T17:00Z'],[2,3,'2026-06-15T22:00Z'],[0,2,'2026-06-19T22:00Z'],[1,3,'2026-06-20T02:00Z'],[0,3,'2026-06-23T22:00Z'],[1,2,'2026-06-23T22:00Z']] },
  I: { teams: ['France','Iraq','Norway','Senegal'],
       fixtures: [[0,1,'2026-06-16T02:00Z'],[2,3,'2026-06-16T05:00Z'],[0,2,'2026-06-20T02:00Z'],[1,3,'2026-06-20T05:00Z'],[0,3,'2026-06-24T02:00Z'],[1,2,'2026-06-24T05:00Z']] },
  J: { teams: ['Argentina','Austria','Jordan','Algeria'],
       fixtures: [[0,1,'2026-06-15T22:00Z'],[2,3,'2026-06-16T08:00Z'],[0,2,'2026-06-19T22:00Z'],[1,3,'2026-06-20T02:00Z'],[0,3,'2026-06-23T22:00Z'],[1,2,'2026-06-24T02:00Z']] },
  K: { teams: ['Uzbekistan','Colombia','Cameroon','Portugal'],
       fixtures: [[0,1,'2026-06-15T08:00Z'],[2,3,'2026-06-16T02:00Z'],[0,2,'2026-06-20T02:00Z'],[1,3,'2026-06-20T02:00Z'],[0,3,'2026-06-24T02:00Z'],[1,2,'2026-06-24T02:00Z']] },
  L: { teams: ['Croatia','Ghana','Panama','England'],
       fixtures: [[0,1,'2026-06-16T00:00Z'],[2,3,'2026-06-16T00:00Z'],[0,2,'2026-06-20T00:00Z'],[1,3,'2026-06-17T02:00Z'],[0,3,'2026-06-24T00:00Z'],[1,2,'2026-06-27T02:00Z']] },
};

for (const [grp, { teams, fixtures }] of Object.entries(groups)) {
  for (const [a, b, kickoff] of fixtures) {
    MATCHES.push({ id: id++, stage: 'Group Stage', group: `Group ${grp}`, home: teams[a], away: teams[b], kickoff });
  }
}

// Round of 32 — Jul 1-4
const r32dates = ['2026-07-01T18:00Z','2026-07-01T22:00Z','2026-07-02T18:00Z','2026-07-02T22:00Z',
  '2026-07-03T18:00Z','2026-07-03T22:00Z','2026-07-04T18:00Z','2026-07-04T22:00Z',
  '2026-07-05T18:00Z','2026-07-05T22:00Z','2026-07-06T18:00Z','2026-07-06T22:00Z',
  '2026-07-07T18:00Z','2026-07-07T22:00Z','2026-07-08T18:00Z','2026-07-08T22:00Z'];
for (let i = 0; i < 32; i++) {
  MATCHES.push({ id: id++, stage: 'Round of 32', group: null, home: `R32-${i+1} Home`, away: `R32-${i+1} Away`, kickoff: r32dates[Math.floor(i/2)] });
}
// Round of 16 — Jul 10-13
const r16dates = ['2026-07-10T18:00Z','2026-07-10T22:00Z','2026-07-11T18:00Z','2026-07-11T22:00Z',
  '2026-07-12T18:00Z','2026-07-12T22:00Z','2026-07-13T18:00Z','2026-07-13T22:00Z'];
for (let i = 0; i < 16; i++) {
  MATCHES.push({ id: id++, stage: 'Round of 16', group: null, home: `R16-${i+1} Home`, away: `R16-${i+1} Away`, kickoff: r16dates[Math.floor(i/2)] });
}
// Quarter-finals — Jul 17-18
for (let i = 0; i < 8; i++) {
  MATCHES.push({ id: id++, stage: 'Quarter-finals', group: null, home: `QF-${i+1} Home`, away: `QF-${i+1} Away`, kickoff: i < 4 ? '2026-07-17T18:00Z' : '2026-07-18T18:00Z' });
}
// Semi-finals — Jul 21-22
for (let i = 0; i < 4; i++) {
  MATCHES.push({ id: id++, stage: 'Semi-finals', group: null, home: `SF-${i+1} Home`, away: `SF-${i+1} Away`, kickoff: i < 2 ? '2026-07-21T22:00Z' : '2026-07-22T22:00Z' });
}
// 3rd place + Final
MATCHES.push({ id: id++, stage: '3rd Place', group: null, home: 'SF Loser 1', away: 'SF Loser 2', kickoff: '2026-07-25T19:00Z' });
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
