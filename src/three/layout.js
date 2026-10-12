import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const CAMERA_Z = 6
export const FOV = 45

// Half height of the visible area at z = 0
const HH = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z

// Where the blob sits in each stage (hero, about, work, contact), in fractions
// of the half viewport so the composition holds on any aspect ratio.
const DESKTOP = {
  pos: [
    [0.5, 0.22, 0],
    [0.54, 0, 0],
    [1.05, 1.0, -3],
    [0, -1.02, 0],
  ],
  scale: [1.12, 0.42, 0.4, 1.75],
  shape: 1,
  opacity: [1, 1, 0.75, 1],
}

const MOBILE = {
  pos: [
    [0, 0.34, 0],
    [0.55, 0.6, -1],
    [0.9, 1.1, -3],
    [0, -0.88, 0],
  ],
  scale: [0.62, 0.26, 0.3, 1.2],
  shape: 0.58,
  opacity: [1, 0.55, 0.6, 1],
}

export function useLayout() {
  const width = useThree((s) => s.size.width)
  const height = useThree((s) => s.size.height)

  return useMemo(() => {
    const mobile = width < 768
    const cfg = mobile ? MOBILE : DESKTOP
    const hw = HH * (width / height)
    return {
      ...cfg,
      mobile,
      pos: cfg.pos.map(([x, y, z]) => new THREE.Vector3(x * hw, y * HH, z)),
    }
  }, [width, height])
}

const ease = (t) => t * t * (3 - 2 * t)

// Splits a continuous stage into the two keyframes around it and an eased mix.
export function segment(stage, last = 3) {
  const s = Math.min(Math.max(stage, 0), last)
  const i = Math.min(Math.floor(s), last - 1)
  return [i, i + 1, ease(s - i)]
}
