import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const spring = { stiffness: 350, damping: 30, mass: 0.5 }

// Ring that trails the pointer and swells over anything clickable.
export default function Cursor() {
  const x = useSpring(useMotionValue(-100), spring)
  const y = useSpring(useMotionValue(-100), spring)
  const [active, setActive] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setActive(Boolean(e.target.closest?.('a, button, [data-cursor]')))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x, y }}
      aria-hidden="true"
    >
      <motion.div
        className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-white"
        animate={{ scale: active ? 1.9 : 1, backgroundColor: active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </motion.div>
  )
}
