import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// One screen-high pause: the particles behind take a shape, a giant word drifts past
// and a handwritten note fades in. No heading, no copy.
function Scene({ scene, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], index % 2 ? ['-40%', '10%'] : ['10%', '-40%'])
  const fade = useTransform(scrollYProgress, [0.3, 0.42, 0.68, 0.8], [0, 1, 1, 0])
  const lift = useTransform(scrollYProgress, [0.3, 0.8], [30, -30])

  return (
    <div ref={ref} data-stage className="relative h-[150svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.span
          aria-hidden="true"
          className="text-ghost pointer-events-none absolute bottom-[3%] left-0 whitespace-nowrap font-display text-[30vw] uppercase leading-none opacity-40 md:text-[21vw]"
          style={{ x: drift }}
        >
          {scene.word}
        </motion.span>
        <motion.p
          className={`absolute bottom-[14%] font-hand text-4xl font-bold text-straw md:text-6xl ${
            index % 2 ? 'left-[8%] rotate-3' : 'right-[8%] -rotate-3'
          }`}
          style={{ opacity: fade, y: lift }}
        >
          {scene.note}
        </motion.p>
      </div>
    </div>
  )
}

export default function Interlude({ scenes }) {
  return (
    <div>
      {scenes.map((scene, i) => (
        <Scene key={scene.word} scene={scene} index={i} />
      ))}
    </div>
  )
}
