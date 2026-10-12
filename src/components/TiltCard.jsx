import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const spring = { stiffness: 220, damping: 20, mass: 0.5 }

// 3D tilt toward the pointer, with a glare that follows it.
export default function TiltCard({ children, className = '', max = 9 }) {
  const ref = useRef(null)
  const rotateX = useSpring(useMotionValue(0), spring)
  const rotateY = useSpring(useMotionValue(0), spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((0.5 - py) * max * 2)
    rotateY.set((px - 0.5) * max * 2)
    ref.current.style.setProperty('--gx', `${px * 100}%`)
    ref.current.style.setProperty('--gy', `${py * 100}%`)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        className={`group relative h-full ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="glare pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {children}
      </motion.div>
    </div>
  )
}
