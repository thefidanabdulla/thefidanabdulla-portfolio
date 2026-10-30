import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { store } from '../lib/store'
import { STAGE, segment, useLayout } from './layout'
import * as shapes from './shapes'

// attribute name per stage, in STAGE order; the first one is the geometry's position
const ATTRIBUTES = ['position', 'aKnot', 'aWave', 'aRings']

// Every particle gets one target per stage and travels between them as the page scrolls.
function buildGeometry(count) {
  const builders = [shapes.galaxy, shapes.knot, shapes.waveGrid(count), shapes.rings]
  const targets = builders.map(() => new Float32Array(count * 3))
  const random = new Float32Array(count * 4)

  for (let i = 0; i < count; i++) {
    builders.forEach((build, stage) => {
      targets[stage].set(build(i), i * 3)
    })
    random.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
  }

  const geometry = new THREE.BufferGeometry()
  ATTRIBUTES.forEach((name, stage) => geometry.setAttribute(name, new THREE.BufferAttribute(targets[stage], 3)))
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

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
  float t = uTime;
  vec3 shape[4];

  vec3 galaxy = position;
  galaxy.xz = rot(t * 0.05) * galaxy.xz;
  galaxy.yz = rot(1.12) * galaxy.yz;
  galaxy.xy = rot(0.38) * galaxy.xy;
  shape[0] = galaxy * uShapeScale;

  vec3 knot = aKnot;
  knot.xz = rot(t * 0.22) * knot.xz;
  knot.yz = rot(0.35 + sin(t * 0.3) * 0.15) * knot.yz;
  shape[1] = knot * uShapeScale;

  vec3 wave = aWave;
  wave.y += sin(wave.x * 0.75 + t * 0.7) * 0.22 + cos(wave.z * 1.1 + t * 0.5) * 0.22
    + sin((wave.x + wave.z) * 0.35 - t * 0.4) * 0.3;
  shape[2] = wave;

  vec3 rings = aRings;
  rings.xz = rot(t * 0.06) * rings.xz;
  rings.yz = rot(0.46) * rings.yz;
  rings.xy = rot(-0.22) * rings.xy;
  shape[3] = rings * uShapeScale;

  // every particle leaves a little early or late, and drifts off course mid-flight
  float mid = sin(fract(uStage) * 3.14159);
  float s = clamp(uStage + (aRandom.x - 0.5) * 0.7 * mid, 0.0, 3.0);
  float f = fract(s);
  s = floor(s) + f * f * (3.0 - 2.0 * f);

  vec3 pos = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    pos += (shape[i] + uOffset[i]) * max(0.0, 1.0 - abs(s - float(i)));
  }

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

// two colours per stage, in STAGE order
export const PALETTE = [
  ['#ffd76a', '#ff7a3d'],
  ['#2f6bff', '#5ee7ff'],
  ['#2f6bff', '#38bdf8'],
  ['#ff7a3d', '#ffd76a'],
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
      uOffset: { value: ATTRIBUTES.map(() => new THREE.Vector3()) },
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
    uniforms.uOffset.value.forEach((offset, i) => offset.copy(i === STAGE.WORK ? WAVE_OFFSET : layout.pos[i]))
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
