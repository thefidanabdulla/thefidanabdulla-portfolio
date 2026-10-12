import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'

const COPIES = 4

// Endless ticker that speeds up with the scroll and follows its direction.
export default function Marquee({ items, speed = 2.2, reverse = false, className = '', itemClassName = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`)
  const direction = useRef(reverse ? 1 : -1)

  useAnimationFrame((_, delta) => {
    const factor = boost.get()
    if (factor < 0) direction.current = reverse ? -1 : 1
    else if (factor > 0) direction.current = reverse ? 1 : -1

    const step = direction.current * speed * (Math.min(delta, 50) / 1000)
    baseX.set(baseX.get() + step * (1 + Math.abs(factor)))
  })

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((item) => (
              <span key={item} className={`flex items-center ${itemClassName}`}>
                {item}
                <span className="mx-[0.5em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-violet" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
