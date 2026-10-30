import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { FiArrowDownRight } from 'react-icons/fi'
import Magnetic from '../components/Magnetic'
import { EASE_OUT } from '../lib/motion'
import { scrollTo } from '../lib/store'

const letter = {
  hidden: { y: '110%', rotate: 8 },
  shown: { y: 0, rotate: 0, transition: { duration: 1.2, ease: EASE_OUT } },
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
}

function Letters({ text, gradient }) {
  // each letter is its own clipped box, so stretch one gradient across all of them
  const style = (i) =>
    gradient && {
      backgroundSize: `${text.length * 100}% 100%`,
      backgroundPosition: `${(i / (text.length - 1)) * 100}% 0`,
    }

  return (
    <span className="flex" aria-hidden="true">
      {[...text].map((char, i) => (
        <span key={i} className="overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block origin-bottom-left ${gradient ? 'text-gradient' : ''}`}
            style={style(i) || undefined}
            variants={letter}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // the two lines of the name slide apart and dissolve as the page scrolls away
  const first = useTransform(scrollYProgress, [0, 1], ['0vw', '-18vw'])
  const second = useTransform(scrollYProgress, [0, 1], ['0vw', '18vw'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -140])

  const go = (id) => (e) => {
    e.preventDefault()
    scrollTo(id)
  }

  return (
    <section id="home" ref={ref} data-stage className="relative flex min-h-svh flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-10">
      <motion.div
        className="flex flex-col"
        style={{ opacity, y: lift }}
        initial="hidden"
        animate={ready ? 'shown' : 'hidden'}
        transition={{ staggerChildren: 0.045, delayChildren: 0.35 }}
      >
        <motion.p variants={fade} className="label mb-5 flex items-center gap-3 md:mb-7">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-straw opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-straw" />
          </span>
          Frontend Developer
        </motion.p>

        <h1 className="font-display text-[clamp(3.4rem,14.2vw,15rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.03em]">
          <span className="sr-only">Fidan Abdulla</span>
          <motion.span className="block" style={{ x: first }}>
            <Letters text="Fidan" />
          </motion.span>
          <motion.span className="block" style={{ x: second }}>
            <Letters text="Abdulla" gradient />
          </motion.span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <motion.p variants={fade} className="max-w-md text-base leading-relaxed text-paper/70 md:text-lg">
            I transform ideas into sleek digital solutions — and spend the rest of the day with music, an electric
            guitar, a sketchbook and anime.
          </motion.p>

          <motion.div variants={fade} className="flex items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                onClick={go('#work')}
                className="group flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-straw"
              >
                See my work
                <FiArrowDownRight className="text-lg transition-transform duration-300 group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={go('#contact')}
                className="block rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-paper"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={fade} className="label hidden items-center gap-3 lg:flex">
            Scroll
            <span className="scroll-hint block h-12 w-px bg-paper/70" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
