import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { EASE_OUT } from '../lib/motion'
import { SECTIONS, scrollTo, store } from '../lib/store'

const links = SECTIONS.slice(1)

export default function Navbar({ ready }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [active, setActive] = useState('home')

  useMotionValueEvent(scrollYProgress, 'change', () => {
    setActive(SECTIONS[Math.round(store.stage)])
  })

  const go = (id) => (e) => {
    e.preventDefault()
    scrollTo(`#${id}`)
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ink/80 to-transparent"
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 1, delay: 0.9, ease: EASE_OUT }}
    >
      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-violet via-pink to-[#ffb38a]"
        style={{ scaleX: progress }}
      />
      <nav className="flex items-center justify-between px-5 py-5 md:px-10" aria-label="Main">
        <a href="#home" onClick={go('home')} className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet to-pink" />
          <span>Fidan</span>
          <span className="hidden text-bone/50 sm:inline">Abdulla</span>
        </a>
        <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/50 p-1 backdrop-blur-md">
          {links.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={go(id)}
                aria-current={active === id ? 'true' : undefined}
                className={`relative block rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 md:px-5 ${
                  active === id ? 'text-ink' : 'text-bone/70 hover:text-bone'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-bone"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{id}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
