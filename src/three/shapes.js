import * as THREE from 'three'

const TAU = Math.PI * 2
const rand = (min, max) => min + Math.random() * (max - min)
const dir = new THREE.Vector3()

// Each builder returns [x, y, z].

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
