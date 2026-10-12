import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { store } from '../lib/store'
import { segment, useLayout } from './layout'

const TAU = Math.PI * 2

// Four targets every particle travels between: galaxy, torus knot, wave grid, planet rings.
function buildGeometry(count) {
  const galaxy = new Float32Array(count * 3)
  const knot = new Float32Array(count * 3)
  const wave = new Float32Array(count * 3)
  const rings = new Float32Array(count * 3)
  const random = new Float32Array(count * 4)

  const columns = Math.ceil(Math.sqrt(count * 1.8))
  const rows = Math.ceil(count / columns)
  const dir = new THREE.Vector3()

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // spiral galaxy on the xz plane, hollow core for the blob
    const radius = 1.15 + Math.pow(Math.random(), 1.6) * 3.9
    const branch = ((i % 4) / 4) * TAU
    const angle = branch + radius * 0.95
    const spread = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2 * radius
    galaxy[i3] = Math.cos(angle) * radius + spread()
    galaxy[i3 + 1] = spread() * 0.45
    galaxy[i3 + 2] = Math.sin(angle) * radius + spread()

    // (2, 3) torus knot with a fuzzy tube
    const u = Math.random() * 2 * TAU
    const quOverP = (3 / 2) * u
    const cs = Math.cos(quOverP)
    const tube = 0.1 + Math.pow(Math.random(), 2) * 0.32
    dir.randomDirection().multiplyScalar(tube)
    knot[i3] = 1.55 * (2 + cs) * 0.5 * Math.cos(u) + dir.x
    knot[i3 + 1] = 1.55 * (2 + cs) * 0.5 * Math.sin(u) + dir.y
    knot[i3 + 2] = 1.55 * Math.sin(quOverP) * 0.5 + dir.z

    // flat grid, the shader turns it into rolling waves
    const column = i % columns
    const row = Math.floor(i / columns)
    wave[i3] = (column / (columns - 1) - 0.5) * 20
    wave[i3 + 1] = 0
    wave[i3 + 2] = (row / (rows - 1)) * 12 - 9

    // banded planet rings
    const band = Math.random()
    const ringRadius = band < 0.55 ? 2.25 + Math.random() * 0.75 : band < 0.9 ? 3.2 + Math.random() * 0.45 : 3.85 + Math.random() * 0.25
    const ringAngle = Math.random() * TAU
    rings[i3] = Math.cos(ringAngle) * ringRadius
    rings[i3 + 1] = (Math.random() - 0.5) * 0.05
    rings[i3 + 2] = Math.sin(ringAngle) * ringRadius

    random[i * 4] = Math.random()
    random[i * 4 + 1] = Math.random()
    random[i * 4 + 2] = Math.random()
    random[i * 4 + 3] = Math.random()
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(galaxy, 3))
  geometry.setAttribute('aKnot', new THREE.BufferAttribute(knot, 3))
  geometry.setAttribute('aWave', new THREE.BufferAttribute(wave, 3))
  geometry.setAttribute('aRings', new THREE.BufferAttribute(rings, 3))
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(random, 4))
  return geometry
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uStage;
uniform float uSize;
uniform float uShapeScale;
uniform vec3 uOffset[4];
uniform vec3 uColorA;
uniform vec3 uColorB;

attribute vec3 aKnot;
attribute vec3 aWave;
attribute vec3 aRings;
attribute vec4 aRandom;

varying vec3 vColor;
varying float vAlpha;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

void main() {
  float t = uTime;

  vec3 galaxy = position;
  galaxy.xz = rot(t * 0.05) * galaxy.xz;
  galaxy.yz = rot(1.12) * galaxy.yz;
  galaxy.xy = rot(0.38) * galaxy.xy;
  galaxy = galaxy * uShapeScale + uOffset[0];

  vec3 knot = aKnot;
  knot.xz = rot(t * 0.22) * knot.xz;
  knot.yz = rot(0.35 + sin(t * 0.3) * 0.15) * knot.yz;
  knot = knot * uShapeScale + uOffset[1];

  vec3 wave = aWave;
  wave.y += sin(wave.x * 0.75 + t * 0.7) * 0.22 + cos(wave.z * 1.1 + t * 0.5) * 0.22
    + sin((wave.x + wave.z) * 0.35 - t * 0.4) * 0.3;
  wave += uOffset[2];

  vec3 rings = aRings;
  rings.xz = rot(t * 0.06) * rings.xz;
  rings.yz = rot(0.46) * rings.yz;
  rings.xy = rot(-0.22) * rings.xy;
  rings = rings * uShapeScale + uOffset[3];

  // every particle leaves a little early or late, and drifts off course mid-flight
  float mid = sin(fract(uStage) * 3.14159);
  float s = clamp(uStage + (aRandom.x - 0.5) * 0.7 * mid, 0.0, 3.0);
  float f = fract(s);
  s = floor(s) + f * f * (3.0 - 2.0 * f);

  vec3 pos = galaxy * max(0.0, 1.0 - abs(s))
    + knot * max(0.0, 1.0 - abs(s - 1.0))
    + wave * max(0.0, 1.0 - abs(s - 2.0))
    + rings * max(0.0, 1.0 - abs(s - 3.0));

  float flight = sin(fract(s) * 3.14159);
  pos += (aRandom.yzw - 0.5) * 2.4 * flight;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.35 + aRandom.w * 1.1) / -mv.z;

  vColor = mix(uColorA, uColorB, aRandom.y) * (0.55 + aRandom.z * 0.75);
  vAlpha = 0.65 + 0.35 * sin(t * 1.6 + aRandom.x * 60.0);
}
`

const fragmentShader = /* glsl */ `
uniform float uOpacity;

varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = pow(smoothstep(0.5, 0.0, d), 1.8);
  gl_FragColor = vec4(vColor, alpha * vAlpha * uOpacity);
}
`

export const PALETTE = [
  ['#b88efc', '#ff7ac6'],
  ['#6877f4', '#5ee7ff'],
  ['#6877f4', '#b88efc'],
  ['#ff8fb8', '#c79bff'],
].map((pair) => pair.map((hex) => new THREE.Color(hex)))

// The wave floor does not follow the blob, it stays under the content.
const WAVE_OFFSET = new THREE.Vector3(0, -1.75, 0)

export default function Particles() {
  const layout = useLayout()
  const pixelRatio = Math.min(window.devicePixelRatio, 2)

  const geometry = useMemo(() => buildGeometry(layout.mobile ? 7000 : 16000), [layout.mobile])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStage: { value: 0 },
      uSize: { value: 0 },
      uShapeScale: { value: 1 },
      uOpacity: { value: 1 },
      uOffset: { value: [0, 1, 2, 3].map(() => new THREE.Vector3()) },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
    }),
    []
  )

  useFrame((state) => {
    const [a, b, t] = segment(store.smooth)

    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uStage.value = store.smooth
    uniforms.uSize.value = (layout.mobile ? 30 : 38) * pixelRatio
    uniforms.uShapeScale.value = layout.shape
    uniforms.uOpacity.value = THREE.MathUtils.lerp(layout.opacity[a], layout.opacity[b], t)
    uniforms.uOffset.value.forEach((offset, i) => offset.copy(i === 2 ? WAVE_OFFSET : layout.pos[i]))
    uniforms.uColorA.value.lerpColors(PALETTE[a][0], PALETTE[b][0], t)
    uniforms.uColorB.value.lerpColors(PALETTE[a][1], PALETTE[b][1], t)
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
