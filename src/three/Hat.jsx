import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { store } from '../lib/store'
import { STAGE, useLayout } from './layout'

// Half profile of the hat, spun around the y axis: a round crown, then a wide brim.
const PROFILE = [
  [0, 0.8],
  [0.3, 0.79],
  [0.56, 0.73],
  [0.75, 0.6],
  [0.85, 0.42],
  [0.89, 0.2],
  [0.9, 0.02],
  [1.0, -0.02],
  [1.3, -0.06],
  [1.65, -0.07],
  [1.92, -0.03],
]

// Small basket-weave tile, repeated around the hat.
function weaveTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const half = size / 2

  ctx.fillStyle = '#b9862b'
  ctx.fillRect(0, 0, size, size)
  for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 2; column++) {
      const horizontal = (row + column) % 2 === 0
      ctx.fillStyle = horizontal ? '#e9bd58' : '#d6a341'
      ctx.fillRect(column * half + 2, row * half + 2, half - 4, half - 4)
      // strands running along the weave
      ctx.strokeStyle = 'rgba(120, 78, 20, 0.45)'
      ctx.lineWidth = 2
      for (let i = 1; i < 3; i++) {
        const offset = (i * half) / 3
        ctx.beginPath()
        if (horizontal) {
          ctx.moveTo(column * half + 2, row * half + offset)
          ctx.lineTo((column + 1) * half - 2, row * half + offset)
        } else {
          ctx.moveTo(column * half + offset, row * half + 2)
          ctx.lineTo(column * half + offset, (row + 1) * half - 2)
        }
        ctx.stroke()
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(44, 13)
  texture.anisotropy = 4
  return texture
}

const easeOutBack = (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2)
const ease = (t) => t * t * (3 - 2 * t)

const from = new THREE.Vector3()
const to = new THREE.Vector3()

// The straw hat: floats beside the name in the hero, is blown away as the page scrolls,
// and drops back down onto the planet at the very end.
export default function Hat() {
  const group = useRef()
  const layout = useLayout()

  const geometry = useMemo(() => {
    const curve = new THREE.SplineCurve(PROFILE.map(([r, y]) => new THREE.Vector2(r, y)))
    return new THREE.LatheGeometry(curve.getPoints(72), 96)
  }, [])
  const weave = useMemo(weaveTexture, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const s = store.smooth
    const { pointer } = store
    const hat = group.current
    const [heroScale, landedScale] = layout.hat

    if (s < 1) {
      // hero: hover and follow the pointer, then spin off up and to the right
      const k = ease(s)
      from.copy(layout.pos[STAGE.HERO])
      to.set(layout.hw * 1.5, layout.hh * 1.5, -1)
      hat.position.lerpVectors(from, to, k)
      hat.position.y += Math.sin(t * 1.1) * 0.07 * (1 - k)
      hat.scale.setScalar(heroScale * (1 - k * 0.5))
      hat.rotation.set(
        0.42 + Math.sin(t * 0.8) * 0.06 - pointer.y * 0.25 + k * 1.2,
        t * 0.35 + k * 7,
        -0.14 + Math.sin(t * 0.6) * 0.05 - pointer.x * 0.2 - k * 0.8
      )
      hat.visible = true
    } else if (s > STAGE.CONTACT - 1) {
      // contact: fall from above and settle, a little tilted, on top of the planet
      const k = s - (STAGE.CONTACT - 1)
      const planet = layout.pos[STAGE.CONTACT]
      const radius = layout.blob[STAGE.CONTACT]
      to.set(planet.x + radius * 0.1, planet.y + radius * 1.07, planet.z)
      from.set(to.x - layout.hw * 0.4, layout.hh * 1.6, to.z)
      hat.position.lerpVectors(from, to, Math.min(easeOutBack(k), 1.04))
      hat.position.y += Math.sin(t * 1.1) * 0.02
      hat.scale.setScalar(landedScale)
      hat.rotation.set(0.2 + (1 - k) * 1.5, t * 0.2 + (1 - k) * 5, -0.2 + Math.sin(t * 0.7) * 0.03)
      hat.visible = k > 0.02
    } else {
      hat.visible = false
    }
  })

  return (
    <group ref={group} visible={false}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={weave}
          bumpMap={weave}
          bumpScale={0.6}
          roughness={0.85}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* the red band around the crown */}
      <mesh position-y={0.15}>
        <cylinderGeometry args={[0.9, 0.915, 0.25, 96, 1, true]} />
        <meshStandardMaterial color="#d81e2c" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
