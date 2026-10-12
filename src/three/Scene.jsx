import { Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import { store } from '../lib/store'
import { CAMERA_Z, FOV } from './layout'
import Backdrop from './Backdrop'
import Blob from './Blob'
import Hat from './Hat'
import Particles from './Particles'

// Eases the scroll stage and drifts the camera with the pointer.
function Rig() {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const { pointer } = store
    const { camera } = state

    store.smooth = THREE.MathUtils.damp(store.smooth, store.stage, 4.5, dt)
    pointer.energy *= Math.exp(-2.5 * dt)

    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.35, 3, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.25, 3, dt)
    camera.lookAt(0, 0, 0)
  })
  return null
}

class Boundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onReady?.()
  }

  render() {
    if (this.state.failed) return <div className="scene-fallback fixed inset-0" />
    return this.props.children
  }
}

export default function Scene({ onReady }) {
  const mobile = window.innerWidth < 768

  return (
    <Boundary onReady={onReady}>
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <Canvas
          dpr={[1, mobile ? 1.5 : 1.75]}
          camera={{ fov: FOV, near: 0.1, far: 60, position: [0, 0, CAMERA_Z] }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          onCreated={onReady}
        >
          <Rig />
          <Backdrop />
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 5, 4]} intensity={1.5} />
          <directionalLight position={[-4, -1, 2]} intensity={0.35} color="#2f6bff" />
          <Blob />
          <Hat />
          <Particles />
          <EffectComposer multisampling={mobile ? 2 : 4}>
            <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.22} luminanceSmoothing={0.5} />
          </EffectComposer>
        </Canvas>
      </div>
    </Boundary>
  )
}
