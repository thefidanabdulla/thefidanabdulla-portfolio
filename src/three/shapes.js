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

// Sound waves: rings spreading out behind the guitar. The shader makes them pulse.
export function soundWaves() {
  const radius = 1.5 + Math.floor(Math.random() * 6) * 0.48 + rand(-0.03, 0.03)
  const angle = Math.random() * TAU
  return [Math.cos(angle) * radius, Math.sin(angle) * radius, rand(-0.9, -0.6)]
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
