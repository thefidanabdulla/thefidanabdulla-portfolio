import { useEffect, useState } from 'react'
import { animate, motion } from 'motion/react'
import { EASE } from '../lib/motion'

const STEPS = ['Compiling', 'Tuning the guitar', 'Sharpening pencils', 'Setting sail']

// Counts to 100, then waits for the scene before the curtain lifts.
export default function Loader({ sceneReady, onDone }) {
  const [count, setCount] = useState(0)
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setCounted(true),
    })
    return () => controls.stop()
  }, [])

  useEffect(() => {
    if (!counted) return
    if (sceneReady) return onDone()
    // never keep the visitor waiting on a slow GPU or network
    const timeout = setTimeout(onDone, 2500)
    return () => clearTimeout(timeout)
  }, [counted, sceneReady, onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 md:p-10"
      exit={{ y: '-100%' }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <div className="label flex justify-between">
        <span>Fidan Abdulla</span>
        <span>Portfolio</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="label">{STEPS[Math.min(STEPS.length - 1, Math.floor(count / 25))]}</span>
        <span className="font-display text-[clamp(5rem,22vw,18rem)] font-extrabold leading-[0.8] tabular-nums">
          {count}
        </span>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-straw via-flame to-crimson"
        style={{ scaleX: count / 100 }}
      />
    </motion.div>
  )
}
