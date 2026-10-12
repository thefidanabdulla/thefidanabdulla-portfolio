import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const spring = { stiffness: 180, damping: 14, mass: 0.4 }

// Pulls its child toward the pointer while hovered.
export default function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} className={className} style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.div>
  )
}
