import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { store } from '../lib/store'
import { segment, useLayout } from './layout'
import noise from './noise.glsl.js'

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

${noise}

float displacement(vec3 p) {
  float n = snoise(p * uFreq + uTime * 0.22);
  n += 0.45 * snoise(p * uFreq * 2.3 - uTime * 0.3);
  return n * uAmp;
}

vec3 displace(vec3 p) {
  return p * (1.0 + displacement(p));
}

void main() {
  vec3 n = normalize(position);
  vec3 helper = abs(n.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 tangent = normalize(cross(n, helper));
  vec3 bitangent = cross(n, tangent);

  // rebuild the normal from two displaced neighbours on the sphere
  float eps = 0.012;
  vec3 p = displace(n);
  vec3 pt = displace(normalize(n + tangent * eps));
  vec3 pb = displace(normalize(n + bitangent * eps));
  vec3 displacedNormal = normalize(cross(pt - p, pb - p));

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * displacedNormal);
  vViewPosition = mv.xyz;
  vDisplacement = displacement(n) / max(uAmp, 0.0001);

  gl_Position = projectionMatrix * mv;
}
`

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uInner;
uniform vec3 uRim;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(-vViewPosition);
  vec3 L = normalize(vec3(0.5, 0.8, 0.6));

  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.2);
  float diffuse = max(dot(N, L), 0.0);
  float specular = pow(max(dot(reflect(-L, N), V), 0.0), 48.0);

  float shift = clamp(fresnel * 1.15 + vDisplacement * 0.18 + sin(uTime * 0.25) * 0.05, 0.0, 1.0);
  vec3 sheen = mix(uInner, uRim, shift);
  vec3 color = uInner * 0.05;
  color += sheen * diffuse * 0.22;
  color += sheen * fresnel * 1.5;
  color += specular * 0.5;

  gl_FragColor = vec4(color, 1.0);
}
`

// per stage, in STAGE order: a sea-blue core for most of the page, a setting sun at the end
const AMP = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.06]
const FREQ = [1.5, 1.5, 1.5, 1.2, 1.2, 1.2, 1.1]
const SEA = [new THREE.Color('#1f4fff'), new THREE.Color('#7df9ff')]
const SUN = [new THREE.Color('#e63946'), new THREE.Color('#ffd76a')]
const COLORS = [SEA, SEA, SEA, SEA, SEA, SUN, SUN]

export default function Blob() {
  const mesh = useRef()
  const layout = useLayout()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: AMP[0] },
      uFreq: { value: FREQ[0] },
      uInner: { value: new THREE.Color() },
      uRim: { value: new THREE.Color() },
    }),
    []
  )

  useFrame((state) => {
    const [a, b, t] = segment(store.smooth)
    const { pointer, velocity } = store
    const lerp = THREE.MathUtils.lerp

    mesh.current.position.lerpVectors(layout.pos[a], layout.pos[b], t)
    const scale = lerp(layout.blob[a], layout.blob[b], t)
    mesh.current.visible = scale > 0.01
    mesh.current.scale.setScalar(Math.max(scale, 0.001))
    mesh.current.rotation.set(-pointer.y * 0.25, state.clock.elapsedTime * 0.08 + pointer.x * 0.35, 0)

    const agitation = pointer.energy * 0.12 + Math.min(Math.abs(velocity) * 0.004, 0.18)
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uAmp.value = lerp(AMP[a], AMP[b], t) + agitation
    uniforms.uFreq.value = lerp(FREQ[a], FREQ[b], t)
    uniforms.uInner.value.lerpColors(COLORS[a][0], COLORS[b][0], t)
    uniforms.uRim.value.lerpColors(COLORS[a][1], COLORS[b][1], t)
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, layout.mobile ? 28 : 56]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  )
}
