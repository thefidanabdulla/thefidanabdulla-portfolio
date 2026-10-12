import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { store } from '../lib/store'
import { STAGE, useLayout } from './layout'

// Everything is laid out with the neck pointing up; the bridge-to-nut distance sets the frets.
const NUT_Y = 4.3
const BRIDGE_Y = -1.2
const NECK_START = 0.45
const CENTER_Y = 1.75

// Double-cutaway body outline, seen from the front: the longer horn is on the bass side.
function bodyShape() {
  const s = new THREE.Shape()
  s.moveTo(0, -2.1)
  s.bezierCurveTo(1.0, -2.15, 1.55, -1.6, 1.5, -0.9)
  s.bezierCurveTo(1.45, -0.5, 1.05, -0.45, 1.1, -0.1)
  s.bezierCurveTo(1.15, 0.25, 1.38, 0.7, 1.15, 1.05)
  s.bezierCurveTo(0.95, 1.25, 0.5, 0.9, 0.42, 0.45)
  s.lineTo(0.3, 0.6)
  s.lineTo(-0.3, 0.6)
  s.lineTo(-0.45, 0.5)
  s.bezierCurveTo(-0.55, 1.1, -0.9, 1.6, -1.2, 1.55)
  s.bezierCurveTo(-1.55, 1.45, -1.3, 0.5, -1.15, 0)
  s.bezierCurveTo(-1.05, -0.45, -1.5, -0.5, -1.55, -0.95)
  s.bezierCurveTo(-1.6, -1.65, -1.0, -2.15, 0, -2.1)
  return s
}

function pickguardShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.85, 0.95)
  s.bezierCurveTo(-0.6, 0.95, -0.5, 0.55, -0.3, 0.48)
  s.lineTo(0.42, 0.4)
  s.bezierCurveTo(1.0, 0.3, 1.2, -0.3, 1.15, -0.9)
  s.bezierCurveTo(1.25, -1.4, 0.95, -1.75, 0.6, -1.75)
  s.bezierCurveTo(0.2, -1.75, 0.1, -1.1, -0.2, -0.9)
  s.bezierCurveTo(-0.6, -0.6, -1.0, -0.4, -1.0, 0.1)
  s.bezierCurveTo(-1.05, 0.5, -1.0, 0.85, -0.85, 0.95)
  return s
}

function headstockShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.18, NUT_Y)
  s.lineTo(-0.3, NUT_Y + 0.3)
  s.bezierCurveTo(-0.44, NUT_Y + 0.6, -0.47, NUT_Y + 1.0, -0.25, NUT_Y + 1.15)
  s.bezierCurveTo(-0.05, NUT_Y + 1.35, 0.12, NUT_Y + 1.4, 0.25, NUT_Y + 1.3)
  s.bezierCurveTo(0.38, NUT_Y + 1.0, 0.22, NUT_Y + 0.5, 0.2, NUT_Y + 0.2)
  s.lineTo(0.18, NUT_Y)
  return s
}

const scaleLength = NUT_Y - BRIDGE_Y
const FRETS = Array.from({ length: 21 }, (_, i) => NUT_Y - scaleLength * (1 - Math.pow(2, -(i + 1) / 12)))
const STRINGS = Array.from({ length: 6 }, (_, i) => {
  const bridge = (i - 2.5) * 0.075
  const nut = (i - 2.5) * 0.05
  return {
    x: (bridge + nut) / 2,
    y: (BRIDGE_Y + NUT_Y) / 2,
    length: Math.hypot(nut - bridge, scaleLength),
    lean: -Math.atan2(nut - bridge, scaleLength),
  }
})
const PICKUPS = [
  [0, 0.15, 0],
  [0, -0.32, 0],
  [0.02, -0.8, 0.16],
]
const KNOBS = [
  [0.52, -1.02],
  [0.74, -1.28],
  [0.5, -1.5],
]

const ease = (t) => t * t * (3 - 2 * t)

// A white electric guitar. It rises into the break after About, leans and sways
// while it holds the screen, then keeps travelling up and out.
export default function Guitar() {
  const group = useRef()
  const layout = useLayout()

  const body = useMemo(() => {
    const geometry = new THREE.ExtrudeGeometry(bodyShape(), {
      depth: 0.26,
      bevelEnabled: true,
      bevelSize: 0.07,
      bevelThickness: 0.07,
      bevelSegments: 5,
      curveSegments: 24,
    })
    geometry.translate(0, 0, -0.13)
    return geometry
  }, [])
  const pickguard = useMemo(
    () => new THREE.ExtrudeGeometry(pickguardShape(), { depth: 0.025, bevelEnabled: false, curveSegments: 20 }),
    []
  )
  const headstock = useMemo(
    () => new THREE.ExtrudeGeometry(headstockShape(), { depth: 0.11, bevelEnabled: false, curveSegments: 16 }),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const guitar = group.current
    // -1 while it is still below the screen, 0 in place, 1 once it has left through the top
    const travel = store.smooth - STAGE.GUITAR

    guitar.visible = Math.abs(travel) < 1
    if (!guitar.visible) return

    const presence = ease(1 - Math.abs(travel))
    const { pointer } = store
    const home = layout.pos[STAGE.GUITAR]

    guitar.position.set(home.x, home.y + Math.sign(travel) * (1 - presence) * layout.hh * 2 + Math.sin(t * 0.9) * 0.05, 0)
    guitar.scale.setScalar(layout.guitar * (0.6 + 0.4 * presence))
    guitar.rotation.set(
      -0.12 - pointer.y * 0.2,
      Math.sin(t * 0.5) * 0.55 + pointer.x * 0.3 + travel * 2.5,
      -0.55 + Math.sin(t * 0.4) * 0.04
    )
  })

  const neckLength = NUT_Y - NECK_START

  return (
    <group ref={group} visible={false}>
      <group position-y={-CENTER_Y}>
        <mesh geometry={body}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.32} roughness={0.25} />
        </mesh>
        <mesh geometry={pickguard} position-z={0.2}>
          <meshStandardMaterial color="#e4dfd3" emissive="#e4dfd3" emissiveIntensity={0.12} roughness={0.5} />
        </mesh>

        {PICKUPS.map(([x, y, slant]) => (
          <mesh key={y} position={[x, y, 0.25]} rotation-z={slant}>
            <boxGeometry args={[0.66, 0.15, 0.07]} />
            <meshStandardMaterial color="#15151a" roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, BRIDGE_Y - 0.05, 0.25]}>
          <boxGeometry args={[0.62, 0.28, 0.08]} />
          <meshStandardMaterial color="#c4c7ce" roughness={0.35} metalness={0.25} />
        </mesh>
        {KNOBS.map(([x, y]) => (
          <mesh key={y} position={[x, y, 0.27]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.09, 0.1, 0.09, 24]} />
            <meshStandardMaterial color="#15151a" roughness={0.4} />
          </mesh>
        ))}

        {/* maple neck, dark fretboard, frets */}
        <mesh position={[0, NECK_START + neckLength / 2, 0.12]}>
          <boxGeometry args={[0.38, neckLength, 0.17]} />
          <meshStandardMaterial color="#d2a76c" roughness={0.6} />
        </mesh>
        <mesh position={[0, NECK_START + neckLength / 2, 0.22]}>
          <boxGeometry args={[0.36, neckLength, 0.035]} />
          <meshStandardMaterial color="#24160f" roughness={0.7} />
        </mesh>
        {FRETS.map((y) => (
          <mesh key={y} position={[0, y, 0.243]}>
            <boxGeometry args={[0.36, 0.018, 0.012]} />
            <meshStandardMaterial color="#c9ccd3" roughness={0.35} metalness={0.25} />
          </mesh>
        ))}

        <mesh geometry={headstock} position-z={0.04}>
          <meshStandardMaterial color="#d2a76c" roughness={0.6} />
        </mesh>
        {STRINGS.map((_, i) => (
          <mesh key={i} position={[-0.42, NUT_Y + 0.38 + i * 0.15, 0.1]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.04, 0.04, 0.16, 12]} />
            <meshStandardMaterial color="#c9ccd3" roughness={0.35} metalness={0.25} />
          </mesh>
        ))}

        {STRINGS.map((string, i) => (
          <mesh key={i} position={[string.x, string.y, 0.268]} rotation-z={string.lean}>
            <cylinderGeometry args={[0.007, 0.007, string.length, 6]} />
            <meshStandardMaterial color="#dfe2e8" roughness={0.4} emissive="#9da0a8" />
          </mesh>
        ))}
      </group>
    </group>
  )
}
