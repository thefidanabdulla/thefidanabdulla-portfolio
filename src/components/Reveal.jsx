import { motion } from 'motion/react'
import { EASE_OUT } from '../lib/motion'

const viewport = { once: true, margin: '0px 0px -12% 0px' }

// Fades and lifts its children in the first time they enter the viewport.
export function Reveal({ children, delay = 0, y = 48, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

// Slides each line up from behind a mask.
export function MaskLines({ lines, className, lineClassName, delay = 0 }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={`block ${lineClassName?.[i] ?? ''}`}
            variants={{ hidden: { y: '115%' }, shown: { y: 0 } }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function SectionLabel({ index, children }) {
  return (
    <Reveal y={20} className="label flex items-center gap-4">
      <span className="text-violet">{index}</span>
      <span className="h-px w-12 bg-bone/30" />
      <span>{children}</span>
    </Reveal>
  )
}
