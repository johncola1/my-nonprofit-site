/**
 * Hand-drawn hero scene: a jagged alpine range at golden hour, valley mist,
 * a pine tree line, and a mown meadow with a clay tennis court, a padel court
 * and a golf green — all drawn in true perspective.
 *
 * Everything is vector, so it is crisp on any screen and weighs only a few KB.
 */

// ── Perspective helpers ─────────────────────────────────────────────
// Ground coordinates are in feet: X = left/right of centre, Z = distance from viewer,
// H = height above the ground.
const VX = 800; // vanishing point x
const HORIZON = 700; // vanishing point y
const F = 1600; // focal length
const EYE = 18.75; // viewer height in feet

function p(X: number, Z: number, H = 0): [number, number] {
  return [VX + (F * X) / Z, HORIZON + (F * (EYE - H)) / Z];
}
const pt = ([x, y]: [number, number]) => `${x.toFixed(1)},${y.toFixed(1)}`;
const quad = (a: [number, number], b: [number, number], c: [number, number], d: [number, number]) =>
  `M${pt(a)}L${pt(b)}L${pt(c)}L${pt(d)}Z`;
const seg = (X1: number, Z1: number, X2: number, Z2: number, H = 0) => `M${pt(p(X1, Z1, H))}L${pt(p(X2, Z2, H))}`;
const groundRect = (x1: number, x2: number, z1: number, z2: number) => quad(p(x1, z1), p(x2, z1), p(x2, z2), p(x1, z2));

// ── Deterministic "random" so the scene is identical on every render ──
const rand = (n: number) => {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

function treeLine(seed: number, base: number, minH: number, maxH: number, step: number) {
  let d = "";
  let i = 0;
  for (let x = -820; x < 2420; x += step * (0.6 + rand(seed + i) * 0.8)) {
    const h = minH + rand(seed + i * 3.1) * (maxH - minH);
    const b = base + Math.sin(x / 85 + seed) * 5;
    const w = h * 0.26;
    d += `M${(x - w).toFixed(1)},${b.toFixed(1)}L${x.toFixed(1)},${(b - h).toFixed(1)}L${(x + w).toFixed(1)},${b.toFixed(1)}Z`;
    i++;
  }
  return d;
}

/** A tall, tiered pine for framing the edges of the scene. */
function pine(x: number, base: number, h: number) {
  let d = `M${x - 3},${base}h6v${-h * 0.12}h-6Z`;
  const tiers = 5;
  for (let t = 0; t < tiers; t++) {
    const top = base - h * 0.1 - (h * 0.9 * (t + 1)) / tiers - h * 0.06;
    const bottom = base - h * 0.08 - (h * 0.9 * t) / tiers;
    const w = h * 0.26 * (1 - t / (tiers + 1));
    d += `M${x - w},${bottom}L${x},${top}L${x + w},${bottom}Z`;
  }
  return d;
}

// ── Mountains ───────────────────────────────────────────────────────
// Ridge profile (a Teton-like central spire with flanking peaks), squashed into place.
const ridgeRaw: [number, number][] = [
  [0, 560], [80, 520], [160, 470], [230, 430], [290, 455], [350, 390], [410, 340], [460, 370],
  [520, 300], [580, 330], [640, 250], [700, 210], [745, 240], [790, 175], [820, 140], [845, 185],
  [880, 160], [915, 230], [960, 265], [1010, 240], [1060, 300], [1110, 280], [1170, 340], [1230, 320],
  [1290, 380], [1360, 360], [1430, 420], [1500, 400], [1600, 450],
];
const ry = (y: number) => 420 + (y - 140) * 0.75;
const tx = (pts: [number, number][]) => pts.map(([x, y]) => `${x},${ry(y).toFixed(1)}`).join(" ");

const ridge = `-800,760 ${tx(ridgeRaw)} 2400,690 2400,900 -800,900`;
// Snowfields: jagged caps in the original style, reaching a little further down.
const snowMain = tx([
  [625, 270], [640, 250], [700, 210], [745, 240], [790, 175], [820, 140], [845, 185], [880, 160], [915, 230],
  [935, 246], [915, 268], [895, 252], [870, 302], [846, 262], [820, 318], [795, 268], [765, 312], [737, 274],
  [700, 306], [672, 280], [648, 292],
]);
const snowPeaks = [
  [[498, 326], [520, 300], [580, 330], [572, 348], [556, 338], [541, 362], [526, 340], [513, 360], [503, 342]],
  [[388, 358], [410, 340], [460, 370], [450, 384], [436, 374], [423, 394], [410, 378], [398, 388]],
  [[335, 406], [350, 390], [372, 372], [366, 390], [356, 384], [348, 404], [340, 398]],
  [[1040, 322], [1060, 300], [1110, 280], [1142, 307], [1126, 318], [1108, 306], [1092, 334], [1076, 318], [1060, 344], [1048, 330]],
  [[1205, 328], [1230, 320], [1255, 345], [1244, 352], [1234, 342], [1224, 360], [1213, 343]],
].map((pts) => tx(pts as [number, number][]));
// Shadowed (east) faces give the range its depth.
const shadow = tx([
  [820, 140], [845, 185], [880, 160], [915, 230], [960, 265], [1010, 240], [990, 330], [940, 420],
  [880, 520], [840, 400], [826, 260],
]);
const shadow2 = tx([[520, 300], [580, 330], [640, 250], [622, 360], [590, 460], [548, 400]]);
const shadow3 = tx([[1060, 300], [1110, 280], [1170, 340], [1150, 440], [1100, 520], [1080, 380]]);

const farRange =
  "-800,662 -400,640 0,655 120,628 260,645 380,600 520,632 640,596 760,618 880,590 1000,604 1150,578 1300,612 1450,588 1600,620 2000,600 2400,628 2400,820 -800,820";

// ── Meadow mowing stripes (converging toward the vanishing point) ──
let stripes = "";
for (let X = -900; X < 900; X += 44) stripes += quad(p(X, 95), p(X + 22, 95), p(X + 22, 330), p(X, 330));

// ── Tennis court (clay), real proportions: 78 × 36 ft ──────────────
const T = { z1: 125, z2: 203, zn: 164 };
const tennisApron = groundRect(-25, 25, 113, 216);
const tennisLines = [
  groundRect(-18, 18, T.z1, T.z2),
  seg(-13.5, T.z1, -13.5, T.z2),
  seg(13.5, T.z1, 13.5, T.z2),
  seg(-13.5, T.zn - 21, 13.5, T.zn - 21),
  seg(-13.5, T.zn + 21, 13.5, T.zn + 21),
  seg(0, T.zn - 21, 0, T.zn + 21),
  seg(0, T.z1, 0, T.z1 + 1.2),
  seg(0, T.z2, 0, T.z2 - 1.2),
].join("");
const tennisNet = quad(p(-21, T.zn), p(21, T.zn), p(21, T.zn, 3.2), p(-21, T.zn, 3.2));
const tennisNetTop = seg(-21, T.zn, 21, T.zn, 3.2);
const tennisPosts = seg(-21, T.zn, -21, T.zn, 0) + `M${pt(p(-21, T.zn))}L${pt(p(-21, T.zn, 3.5))}M${pt(p(21, T.zn))}L${pt(p(21, T.zn, 3.5))}`;

// ── Padel court (blue, glass-walled), 66 × 33 ft ─────────────────
const P = { x1: 40, x2: 73, z1: 190, z2: 256, zn: 223 };
const padelApron = groundRect(P.x1 - 4, P.x2 + 4, P.z1 - 6, P.z2 + 6);
const padelSurface = groundRect(P.x1, P.x2, P.z1, P.z2);
const padelLines = [
  groundRect(P.x1, P.x2, P.z1, P.z2),
  seg(P.x1, P.zn - 22.8, P.x2, P.zn - 22.8),
  seg(P.x1, P.zn + 22.8, P.x2, P.zn + 22.8),
  seg((P.x1 + P.x2) / 2, P.zn - 22.8, (P.x1 + P.x2) / 2, P.zn + 22.8),
].join("");
const padelNet = quad(p(P.x1, P.zn), p(P.x2, P.zn), p(P.x2, P.zn, 3), p(P.x1, P.zn, 3));
const padelGlass =
  quad(p(P.x1, P.z2), p(P.x2, P.z2), p(P.x2, P.z2, 10), p(P.x1, P.z2, 10)) +
  quad(p(P.x1, P.z1), p(P.x2, P.z1), p(P.x2, P.z1, 10), p(P.x1, P.z1, 10)) +
  quad(p(P.x1, P.z1), p(P.x1, P.z2), p(P.x1, P.z2, 10), p(P.x1, P.z1, 10)) +
  quad(p(P.x2, P.z1), p(P.x2, P.z2), p(P.x2, P.z2, 10), p(P.x2, P.z1, 10));
const padelFrame = [
  seg(P.x1, P.z1, P.x2, P.z1, 10),
  seg(P.x1, P.z2, P.x2, P.z2, 10),
  seg(P.x1, P.z1, P.x1, P.z2, 10),
  seg(P.x2, P.z1, P.x2, P.z2, 10),
  ...[[P.x1, P.z1], [P.x2, P.z1], [P.x1, P.z2], [P.x2, P.z2]].map(
    ([x, z]) => `M${pt(p(x, z))}L${pt(p(x, z, 10))}`,
  ),
].join("");

// ── Golf hole ───────────────────────────────────────────────────────
const fairway = quad(p(-100, 100), p(-38, 100), p(-46, 196), p(-78, 196));
const [gx, gy] = p(-60, 205);
const greenRx = (F * 20) / 205;
const [bx, by] = p(-86, 188);
const [fx, fy] = p(-60, 205, 8);

export default function Landscape({
  id,
  viewBox,
  className,
  fit = false,
}: {
  id: string;
  viewBox: string;
  className?: string;
  /** true: always show the whole frame (extra width reveals more scenery); false: fill and crop. */
  fit?: boolean;
}) {
  const u = (n: string) => `${id}-${n}`;
  const url = (n: string) => `url(#${u(n)})`;
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio={fit ? "xMidYMax meet" : "xMidYMax slice"}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    >
      <defs>
        <linearGradient id={u("sky")} gradientUnits="userSpaceOnUse" x1="0" y1="-300" x2="0" y2="800">
          <stop offset="0" stopColor="#0a1c22" />
          <stop offset="0.36" stopColor="#173238" />
          <stop offset="0.6" stopColor="#3f5b5b" />
          <stop offset="0.8" stopColor="#a39a7c" />
          <stop offset="0.93" stopColor="#e4c896" />
          <stop offset="1" stopColor="#efd3a2" />
        </linearGradient>
        <radialGradient id={u("sun")} cx="1180" cy="700" r="520" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe2a8" stopOpacity="0.75" />
          <stop offset="0.35" stopColor="#f2c98a" stopOpacity="0.25" />
          <stop offset="1" stopColor="#f2c98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={u("rock")} gradientUnits="userSpaceOnUse" x1="0" y1="420" x2="0" y2="800">
          <stop offset="0" stopColor="#5d7272" />
          <stop offset="0.55" stopColor="#3b5250" />
          <stop offset="1" stopColor="#25393a" />
        </linearGradient>
        <linearGradient id={u("snow")} gradientUnits="userSpaceOnUse" x1="0" y1="420" x2="0" y2="600">
          <stop offset="0" stopColor="#f6f2e8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#dfe6e2" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={u("mist")} gradientUnits="userSpaceOnUse" x1="0" y1="680" x2="0" y2="800">
          <stop offset="0" stopColor="#e9e1c8" stopOpacity="0" />
          <stop offset="0.6" stopColor="#e9e1c8" stopOpacity="0.38" />
          <stop offset="1" stopColor="#e9e1c8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={u("meadow")} gradientUnits="userSpaceOnUse" x1="0" y1="795" x2="0" y2="1000">
          <stop offset="0" stopColor="#3b7440" />
          <stop offset="0.4" stopColor="#245a31" />
          <stop offset="1" stopColor="#123d24" />
        </linearGradient>
        <linearGradient id={u("clay")} gradientUnits="userSpaceOnUse" x1="0" y1="820" x2="0" y2="960">
          <stop offset="0" stopColor="#c7794d" />
          <stop offset="1" stopColor="#a8562f" />
        </linearGradient>
      </defs>

      {/* Sky + sun */}
      <rect x="-850" y="-400" width="3300" height="1450" fill={url("sky")} />
      <rect x="-850" y="-400" width="3300" height="1450" fill={url("sun")} />

      {/* Distant hazy range */}
      <polygon points={farRange} fill="#8c9c92" opacity="0.55" />

      {/* Main range */}
      <polygon points={ridge} fill={url("rock")} />
      <polygon points={shadow} fill="#0e1f22" opacity="0.32" />
      <polygon points={shadow2} fill="#0e1f22" opacity="0.28" />
      <polygon points={shadow3} fill="#0e1f22" opacity="0.28" />
      <g fill={url("snow")}>
        <polygon points={snowMain} />
        {snowPeaks.map((pts, i) => (
          <polygon key={i} points={pts} />
        ))}
      </g>
      {/* Alpenglow on the snow */}
      <polygon points={snowMain} fill="#ffb98a" opacity="0.14" />

      {/* Valley mist */}
      <rect x="-850" y="660" width="3300" height="160" fill={url("mist")} />

      {/* Foothills */}
      <path d="M-850,768 C-500,752 -250,764 -50,772 C200,742 380,778 560,762 S900,746 1100,766 S1450,750 1650,762 S2100,748 2450,766 L2450,840 L-850,840Z" fill="#1d3a30" />
      <path d={treeLine(3, 792, 12, 30, 11)} fill="#1a372a" />

      {/* Meadow */}
      <rect x="-850" y="796" width="3300" height="260" fill={url("meadow")} />
      <path d={stripes} fill="#ffffff" opacity="0.035" />
      <path d={treeLine(9, 806, 16, 40, 13)} fill="#0f2a1d" />

      {/* Golf hole */}
      <path d={fairway} fill="#4b8a4f" opacity="0.55" />
      <ellipse cx={bx} cy={by} rx={(F * 9) / 188} ry="9" fill="#dccb9e" opacity="0.9" />
      <ellipse cx={gx} cy={gy} rx={greenRx} ry="17" fill="#5aa05e" />
      <ellipse cx={gx} cy={gy} rx="5" ry="2" fill="#0b2015" />
      <line x1={gx} y1={gy} x2={fx} y2={fy} stroke="#f1eee4" strokeWidth="1.6" />
      <path d={`M${fx},${fy}l26,7l-26,7Z`} fill="#d6e86b" />

      {/* Clay tennis court */}
      <path d={tennisApron} fill="#9b5130" />
      <path d={groundRect(-18, 18, T.z1, T.z2)} fill={url("clay")} />
      <path d={tennisLines} fill="none" stroke="#f6efe2" strokeWidth="1.7" strokeLinejoin="round" />
      <path d={tennisNet} fill="#0d1c17" opacity="0.16" />
      <path d={tennisNetTop + tennisPosts} fill="none" stroke="#f6efe2" strokeWidth="1.4" opacity="0.9" />

      {/* Padel court */}
      <path d={padelApron} fill="#1d4f33" />
      <path d={padelSurface} fill="#2f6c87" />
      <path d={padelLines} fill="none" stroke="#f1f5f2" strokeWidth="1.3" />
      <path d={padelNet} fill="#0d1c17" opacity="0.18" />
      <path d={padelGlass} fill="#d8eef2" opacity="0.045" />
      <path d={padelFrame} fill="none" stroke="#dfe9e6" strokeWidth="0.9" opacity="0.28" />

      {/* Framing pines */}
      <g fill="#081a12">
        <path d={pine(30, 1010, 430)} />
        <path d={pine(115, 1010, 330)} />
        <path d={pine(-40, 1010, 520)} />
        <path d={pine(1560, 1010, 440)} />
        <path d={pine(1480, 1010, 320)} />
        <path d={pine(1640, 1010, 520)} />
      </g>
    </svg>
  );
}
