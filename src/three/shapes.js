import * as THREE from 'three'

const TAU = Math.PI * 2
const rand = (min, max) => min + Math.random() * (max - min)
const dir = new THREE.Vector3()

// Each builder returns [x, y, z, tint]; tint marks the particles a shape colours differently.

export function galaxy(i) {
  // spiral on the xz plane, hollow core for the blob
  const radius = 1.15 + Math.pow(Math.random(), 1.6) * 3.9
  const angle = ((i % 4) / 4) * TAU + radius * 0.95
  const spread = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2 * radius
  return [Math.cos(angle) * radius + spread(), spread() * 0.45, Math.sin(angle) * radius + spread()]
}

export function knot() {
  // (2, 3) torus knot with a fuzzy tube
  const u = Math.random() * 2 * TAU
  const quOverP = (3 / 2) * u
  const cs = Math.cos(quOverP)
  dir.randomDirection().multiplyScalar(0.1 + Math.pow(Math.random(), 2) * 0.32)
  return [
    1.55 * (2 + cs) * 0.5 * Math.cos(u) + dir.x,
    1.55 * (2 + cs) * 0.5 * Math.sin(u) + dir.y,
    1.55 * Math.sin(quOverP) * 0.5 + dir.z,
  ]
}

// Equalizer: x picks the bar, y is how far up (or down) the bar the particle sits.
// The shader gives every bar its own bouncing height.
export const EQ_HALF_WIDTH = 2
export const EQ_BARS = 26

export function equalizer() {
  const bar = Math.floor(Math.random() * EQ_BARS)
  const width = (EQ_HALF_WIDTH * 2) / EQ_BARS
  const x = -EQ_HALF_WIDTH + (bar + 0.5 + rand(-0.3, 0.3)) * width
  return [x, rand(-1, 1), rand(-0.08, 0.08)]
}

// Electric guitar, drawn flat and standing upright: double-cutaway body, neck, headstock, strings.
const GUITAR_SCALE = 0.78
const GUITAR_SHIFT = -0.55

function bodyDistance(x, y) {
  const ax = Math.abs(x)
  const lower = Math.hypot(x, y + 1.2) - 1.0
  const upper = Math.hypot(x, y + 0.2) - 0.8
  // two horns reaching up either side of the neck
  const horn = Math.hypot(ax - 0.66, y - 0.5) - 0.27
  // the cutaways between horn and neck, and the waist
  const cutaway = Math.min(Math.hypot(ax - 0.3, y - 0.72) - 0.22, Math.hypot(ax - 1.16, y + 0.68) - 0.38)
  return Math.max(Math.min(lower, upper, horn), -cutaway)
}

function guitarPoint() {
  const pick = Math.random()

  if (pick < 0.1) {
    // six strings from the bridge to the tuners, tinted so the shader can make them ring
    const string = Math.floor(Math.random() * 6)
    return [(string - 2.5) * 0.034, rand(-1.5, 2.75), 0.06, 1]
  }
  if (pick < 0.22) return [(Math.random() < 0.6 ? (Math.random() < 0.5 ? -0.12 : 0.12) : rand(-0.12, 0.12)), rand(0.45, 2.7), rand(-0.04, 0.04)]
  if (pick < 0.29) {
    // slanted headstock
    const y = rand(2.7, 3.35)
    return [rand(-0.17, 0.2 + (y - 2.7) * 0.22), y, rand(-0.04, 0.04)]
  }
  if (pick < 0.36) {
    // two pickups and the bridge
    const y = [-0.45, -0.95, -1.5][Math.floor(Math.random() * 3)]
    return [rand(-0.3, 0.3), y + rand(-0.06, 0.06), 0.05]
  }

  // body: keep every point near the outline, thin out the inside, so the silhouette reads
  for (;;) {
    const x = rand(-1.05, 1.05)
    const y = rand(-2.25, 0.8)
    const d = bodyDistance(x, y)
    if (d < 0 && (d > -0.06 || Math.random() < 0.22)) return [x, y, rand(-0.06, 0.06)]
  }
}

export function guitar() {
  const [x, y, z, tint = 0] = guitarPoint()
  return [x * GUITAR_SCALE, (y + GUITAR_SHIFT) * GUITAR_SCALE, z, tint]
}

// A pencil leaning on the end of the line it has just drawn.
const PENCIL_TIP = [0.75, -0.95]
const LINE_START = -1.75
const PENCIL_LEAN = -0.5

function scribble(u) {
  const x = LINE_START + u * (PENCIL_TIP[0] - LINE_START)
  const y = PENCIL_TIP[1] + Math.sin(u * Math.PI * 5) * 0.55 * (1 - u) + Math.sin(u * Math.PI * 13) * 0.08 * (1 - u)
  return [x, y]
}

export function pencil() {
  if (Math.random() < 0.3) {
    const [x, y] = scribble(Math.random())
    return [x + rand(-0.015, 0.015), y + rand(-0.015, 0.015), 0, 1]
  }

  // surface of a cylinder with a cone tip, measured from the tip upwards
  const h = Math.pow(Math.random(), 0.9) * 2.7
  const radius = h < 0.5 ? (h / 0.5) * 0.2 : 0.2
  const angle = Math.random() * TAU
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const cos = Math.cos(PENCIL_LEAN)
  const sin = Math.sin(PENCIL_LEAN)
  // the lead and the ferrule under the eraser share the tint with the drawn line
  const tint = h < 0.16 || (h > 2.3 && h < 2.45) ? 1 : 0
  return [PENCIL_TIP[0] + x * cos - h * sin, PENCIL_TIP[1] + x * sin + h * cos, z, tint]
}

// Flat grid, the shader turns it into rolling waves.
export function waveGrid(count) {
  const columns = Math.ceil(Math.sqrt(count * 1.8))
  const rows = Math.ceil(count / columns)
  return (i) => [((i % columns) / (columns - 1) - 0.5) * 20, 0, (Math.floor(i / columns) / (rows - 1)) * 12 - 9]
}

export function rings() {
  // banded planet rings
  const band = Math.random()
  const radius = band < 0.55 ? rand(2.25, 3) : band < 0.9 ? rand(3.2, 3.65) : rand(3.85, 4.1)
  const angle = Math.random() * TAU
  return [Math.cos(angle) * radius, rand(-0.025, 0.025), Math.sin(angle) * radius]
}
