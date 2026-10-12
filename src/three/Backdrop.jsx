import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { store } from '../lib/store'
import { segment } from './layout'
import { PALETTE } from './Particles'

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uAspect;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 p = vUv - 0.5;
  p.x *= uAspect;

  vec2 a = vec2(0.32 + 0.3 * sin(uTime * 0.11), 0.1 + 0.22 * cos(uTime * 0.13));
  vec2 b = vec2(-0.4 + 0.22 * cos(uTime * 0.09), -0.25 + 0.2 * sin(uTime * 0.07));

  vec3 color = vec3(0.0035, 0.0028, 0.008);
  color += uColorA * exp(-dot(p - a, p - a) * 3.0) * 0.028;
  color += uColorB * exp(-dot(p - b, p - b) * 2.5) * 0.016;
  color *= 1.0 - 0.5 * dot(p, p);

  // dither away the banding of a very dark gradient
  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}
`

// Fullscreen quad behind everything: two slow colour glows that follow the stage palette.
export default function Backdrop() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
    }),
    []
  )

  useFrame((state) => {
    const [a, b, t] = segment(store.smooth)
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uAspect.value = state.size.width / state.size.height
    uniforms.uColorA.value.lerpColors(PALETTE[a][0], PALETTE[b][0], t)
    uniforms.uColorB.value.lerpColors(PALETTE[a][1], PALETTE[b][1], t)
  })

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}
