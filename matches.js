// FIFA World Cup 2026 — Official Fixture List
// Source: WC2026_Fixture_List.xlsx (user-provided official schedule)
// All times in GST (Dubai, UTC+4), stored internally as UTC ISO strings

const MATCHES = [];

function gst(date, time) {
  // date format: '2026-06-11', time format: '23:00'
  const [h, m] = time.split(':').map(Number);
  const utcH = h - 4;
  const d = new Date(date + 'T00:00:00Z');
  d.setUTCHours(utcH, m || 0, 0, 0);
  return d.toISOString();
}

// ── GROUP STAGE — 72 matches, #1-72 from fixture list ────────────────────────
const gs = [
  // # Group   Date          Home                  Away                    Time(GST)
  [1, 'A','2026-06-11','Mexico','South Africa','23:00'],
  [2, 'A','2026-06-12','South Korea','Czechia','06:00'],
  [3, 'B','2026-06-12','Canada','Bosnia and Herzegovina','23:00'],
  [4, 'D','2026-06-13','USA','Paraguay','05:00'],
  [5, 'B','2026-06-13','Qatar','Switzerland','23:00'],
  [6, 'C','2026-06-14','Brazil','Morocco','02:00'],
  [7, 'C','2026-06-14','Haiti','Scotland','05:00'],
  [8, 'D','2026-06-14','Australia','Türkiye','08:00'],
  [9, 'E','2026-06-14','Germany','Curaçao','21:00'],
  [10,'F','2026-06-15','Netherlands','Japan','00:00'],
  [11,'E','2026-06-15',"Ivory Coast",'Ecuador','03:00'],
  [12,'F','2026-06-15','Sweden','Tunisia','06:00'],
  [13,'H','2026-06-15','Spain','Cape Verde','20:00'],
  [14,'G','2026-06-15','Belgium','Egypt','23:00'],
  [15,'H','2026-06-16','Saudi Arabia','Uruguay','02:00'],
  [16,'G','2026-06-16','Iran','New Zealand','05:00'],
  [17,'I','2026-06-16','France','Senegal','23:00'],
  [18,'I','2026-06-17','Iraq','Norway','02:00'],
  [19,'J','2026-06-17','Argentina','Algeria','05:00'],
  [20,'J','2026-06-17','Austria','Jordan','08:00'],
  [21,'K','2026-06-17','Portugal','DR Congo','21:00'],
  [22,'L','2026-06-18','England','Croatia','00:00'],
  [23,'L','2026-06-18','Ghana','Panama','03:00'],
  [24,'K','2026-06-18','Uzbekistan','Colombia','06:00'],
  [25,'A','2026-06-18','Czechia','South Africa','20:00'],
  [26,'B','2026-06-18','Switzerland','Bosnia and Herzegovina','23:00'],
  [27,'B','2026-06-19','Canada','Qatar','02:00'],
  [28,'A','2026-06-19','Mexico','South Korea','05:00'],
  [29,'D','2026-06-19','USA','Australia','23:00'],
  [30,'C','2026-06-20','Scotland','Morocco','02:00'],
  [31,'C','2026-06-20','Brazil','Haiti','04:30'],
  [32,'D','2026-06-20','Türkiye','Paraguay','07:00'],
  [33,'F','2026-06-20','Netherlands','Sweden','21:00'],
  [34,'E','2026-06-21','Germany','Ivory Coast','00:00'],
  [35,'E','2026-06-21','Ecuador','Curaçao','04:00'],
  [36,'F','2026-06-21','Tunisia','Japan','08:00'],
  [37,'H','2026-06-21','Spain','Saudi Arabia','20:00'],
  [38,'G','2026-06-21','Belgium','Iran','23:00'],
  [39,'H','2026-06-22','Uruguay','Cape Verde','02:00'],
  [40,'G','2026-06-22','New Zealand','Egypt','05:00'],
  [41,'J','2026-06-22','Argentina','Austria','21:00'],
  [42,'I','2026-06-23','France','Iraq','01:00'],
  [43,'I','2026-06-23','Norway','Senegal','04:00'],
  [44,'J','2026-06-23','Jordan','Algeria','07:00'],
  [45,'K','2026-06-23','Portugal','Uzbekistan','21:00'],
  [46,'L','2026-06-24','England','Ghana','00:00'],
  [47,'L','2026-06-24','Panama','Croatia','03:00'],
  [48,'K','2026-06-24','Colombia','DR Congo','06:00'],
  [49,'B','2026-06-24','Switzerland','Canada','23:00'],
  [50,'B','2026-06-24','Bosnia and Herzegovina','Qatar','23:00'],
  [51,'C','2026-06-25','Scotland','Brazil','02:00'],
  [52,'C','2026-06-25','Morocco','Haiti','02:00'],
  [53,'A','2026-06-25','Czechia','Mexico','05:00'],
  [54,'A','2026-06-25','South Africa','South Korea','05:00'],
  [55,'E','2026-06-26','Curaçao','Ivory Coast','00:00'],
  [56,'E','2026-06-26','Ecuador','Germany','00:00'],
  [57,'F','2026-06-26','Japan','Sweden','03:00'],
  [58,'F','2026-06-26','Tunisia','Netherlands','03:00'],
  [59,'D','2026-06-26','Türkiye','USA','06:00'],
  [60,'D','2026-06-26','Paraguay','Australia','06:00'],
  [61,'I','2026-06-26','Norway','France','23:00'],
  [62,'I','2026-06-26','Senegal','Iraq','23:00'],
  [63,'H','2026-06-27','Cape Verde','Saudi Arabia','04:00'],
  [64,'H','2026-06-27','Uruguay','Spain','04:00'],
  [65,'G','2026-06-27','Egypt','Iran','07:00'],
  [66,'G','2026-06-27','New Zealand','Belgium','07:00'],
  [67,'L','2026-06-28','Panama','England','01:00'],
  [68,'L','2026-06-28','Croatia','Ghana','01:00'],
  [69,'K','2026-06-28','Colombia','Portugal','03:30'],
  [70,'K','2026-06-28','DR Congo','Uzbekistan','03:30'],
  [71,'J','2026-06-28','Algeria','Austria','06:00'],
  [72,'J','2026-06-28','Jordan','Argentina','06:00'],
];

for (const [num, grp, date, home, away, time] of gs) {
  MATCHES.push({ id: num, stage: 'Group Stage', group: `Group ${grp}`, home, away, kickoff: gst(date, time) });
}

// ── ROUND OF 32 — #73-88 ───────────────────────────────────────────────────
const r32 = [
  [73,'2026-06-28','2A','2B','23:00'],
  [74,'2026-06-29','1C','2F','21:00'],
  [75,'2026-06-30','1E','3ABCDF','00:30'],
  [76,'2026-06-30','1F','2C','05:00'],
  [77,'2026-06-30','2E','2I','21:00'],
  [78,'2026-07-01','1I','3CDFGH','01:00'],
  [79,'2026-07-01','1A','3CEFHI','05:00'],
  [80,'2026-07-01','1L','3EHIJK','20:00'],
  [81,'2026-07-02','1G','3AEHIJ','00:00'],
  [82,'2026-07-02','1D','3BEFIJ','04:00'],
  [83,'2026-07-02','1H','2J','23:00'],
  [84,'2026-07-03','2K','2L','03:00'],
  [85,'2026-07-03','1B','3EFGIJ','07:00'],
  [86,'2026-07-03','2D','2G','22:00'],
  [87,'2026-07-04','1J','2H','02:00'],
  [88,'2026-07-04','1K','3DEIJL','05:30'],
];
for (const [num, date, home, away, time] of r32) {
  MATCHES.push({ id: num, stage: 'Round of 32', group: null, home, away, kickoff: gst(date, time) });
}

// ── ROUND OF 16 — #89-96 ───────────────────────────────────────────────────
const r16 = [
  [89,'2026-07-04','W73','W75','21:00'],
  [90,'2026-07-05','W74','W77','01:00'],
  [91,'2026-07-06','W76','W78','00:00'],
  [92,'2026-07-06','W79','W80','04:00'],
  [93,'2026-07-06','W83','W84','23:00'],
  [94,'2026-07-07','W81','W82','04:00'],
  [95,'2026-07-07','W86','W88','20:00'],
  [96,'2026-07-08','W85','W87','00:00'],
];
for (const [num, date, home, away, time] of r16) {
  MATCHES.push({ id: num, stage: 'Round of 16', group: null, home, away, kickoff: gst(date, time) });
}

// ── QUARTER-FINALS — #97-100 ─────────────────────────────────────────────────
const qf = [
  [97, '2026-07-10','W89','W90','00:00'],
  [98, '2026-07-10','W93','W94','23:00'],
  [99, '2026-07-12','W91','W92','01:00'],
  [100,'2026-07-12','W95','W96','05:00'],
];
for (const [num, date, home, away, time] of qf) {
  MATCHES.push({ id: num, stage: 'Quarter-finals', group: null, home, away, kickoff: gst(date, time) });
}

// ── SEMI-FINALS — #101-102 ───────────────────────────────────────────────────
const sf = [
  [101,'2026-07-14','W97','W98','23:00'],
  [102,'2026-07-15','W99','W100','23:00'],
];
for (const [num, date, home, away, time] of sf) {
  MATCHES.push({ id: num, stage: 'Semi-finals', group: null, home, away, kickoff: gst(date, time) });
}

// ── 3RD PLACE & FINAL — #103-104 ─────────────────────────────────────────────
MATCHES.push({ id: 103, stage: '3rd Place', group: null, home: 'RU101', away: 'RU102', kickoff: gst('2026-07-19', '01:00') });
MATCHES.push({ id: 104, stage: 'Final', group: null, home: 'W101', away: 'W102', kickoff: gst('2026-07-19', '23:00') });

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
