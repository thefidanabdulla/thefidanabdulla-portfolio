import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { FaGithub } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { MaskLines, Reveal, SectionLabel } from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import { GITHUB, clientProjects, journey, labProjects, personalProjects } from '../data/content'

const pad = (n) => String(n).padStart(2, '0')
const host = (url) => new URL(url).host.replace(/^www\./, '')

function ClientRow({ project, index }) {
  return (
    <Reveal delay={index * 0.06} y={32}>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-4 overflow-hidden border-t border-white/15 py-6 md:gap-10 md:py-9"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-straw via-flame to-crimson transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
        <span className="label relative hidden w-8 transition-colors duration-300 group-hover:text-ink sm:block md:pl-4">
          {pad(index + 1)}
        </span>
        <span className="relative font-display text-[clamp(1.375rem,6.4vw,6rem)] font-extrabold uppercase leading-none tracking-[-0.02em] transition-all duration-500 group-hover:translate-x-3 group-hover:text-ink md:group-hover:translate-x-6">
          {project.name}
        </span>
        <span className="label relative ml-auto hidden transition-colors duration-300 group-hover:text-ink sm:block">
          {host(project.url)}
        </span>
        <FiArrowUpRight className="relative ml-auto shrink-0 text-3xl transition-all duration-500 group-hover:rotate-45 group-hover:text-ink sm:ml-0 md:mr-4 md:text-5xl" />
      </a>
    </Reveal>
  )
}

// One abstract poster per experiment, built from the card's hue.
function Poster({ index }) {
  const hue = [44, 18, 356, 214, 30, 200, 8, 48][index % 8]
  const patterns = [
    `repeating-radial-gradient(circle at 50% 120%, hsl(${hue} 90% 70% / 0.55) 0 2px, transparent 2px 22px)`,
    `repeating-conic-gradient(from 0deg at 50% 50%, hsl(${hue} 90% 70% / 0.5) 0 4deg, transparent 4deg 14deg)`,
    `radial-gradient(hsl(${hue} 90% 75% / 0.7) 1.5px, transparent 2px) 0 0 / 20px 20px`,
    `repeating-linear-gradient(115deg, hsl(${hue} 90% 70% / 0.5) 0 2px, transparent 2px 18px)`,
  ]

  return (
    <div
      className="relative h-full overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(140deg, hsl(${hue} 60% 16%), hsl(${hue + 50} 70% 7%))` }}
    >
      <div
        className="absolute inset-[-20%] transition-transform duration-[1200ms] ease-out group-hover:rotate-6 group-hover:scale-110"
        style={{
          background: patterns[index % patterns.length],
          maskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 70%)',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: `hsl(${hue + 30} 95% 68% / 0.75)` }}
      />
      <span className="absolute bottom-3 right-4 font-display text-6xl font-extrabold text-white/15">{pad(index + 1)}</span>
    </div>
  )
}

function LabCard({ project, index }) {
  return (
    <article className="card group flex h-[min(64svh,520px)] w-[min(78vw,400px)] shrink-0 flex-col p-4">
      <div className="min-h-0 flex-1">
        <Poster index={index} />
      </div>
      <div className="px-2 pb-2 pt-5">
        <span className="label">Three.js / {pad(index + 1)}</span>
        <h4 className="mt-2 font-display text-2xl font-bold md:text-3xl">{project.name}</h4>
        <div className="mt-5 flex items-center gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-straw"
          >
            Live <FiArrowUpRight />
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-paper"
          >
            <FaGithub /> Code
          </a>
        </div>
      </div>
    </article>
  )
}

// Vertical scroll drives a pinned horizontal track.
function Lab() {
  const outer = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    const observer = new ResizeObserver(measure)
    observer.observe(track.current)
    window.addEventListener('resize', measure)
    measure()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)

  return (
    <div ref={outer} className="relative mt-24 md:mt-40" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16">
        <div className="mb-6 flex items-baseline gap-5 px-5 md:mb-8 md:gap-8 md:px-10">
          <h3 className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-extrabold leading-none">
            Three.js <span className="text-gradient">lab</span>
          </h3>
          <span className="label hidden sm:inline">{pad(labProjects.length)} experiments</span>
        </div>
        <motion.div ref={track} className="flex w-max gap-4 px-5 md:gap-6 md:px-10" style={{ x }}>
          {labProjects.map((project, i) => (
            <LabCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>
        <div className="mx-5 mt-6 h-px bg-white/15 md:mx-10 md:mt-8">
          <motion.div className="h-full origin-left bg-paper" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  )
}

function PersonalCard({ project, index }) {
  return (
    <Reveal delay={index * 0.12} className="h-full">
      <TiltCard className="card flex min-h-[280px] flex-col p-7 md:min-h-[340px] md:p-9">
        <div className="label flex items-center justify-between">
          <span className="text-straw">{pad(index + 1)}</span>
          <span>{project.stack}</span>
        </div>
        <h4 className="mt-auto pt-12 font-display text-3xl font-bold leading-tight md:text-4xl">{project.name}</h4>
        <div className="mt-6 flex items-center gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-straw"
          >
            Live <FiArrowUpRight />
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:border-paper"
          >
            <FaGithub /> Code
          </a>
        </div>
      </TiltCard>
    </Reveal>
  )
}

export default function Work() {
  return (
    <section id="work" data-stage className="relative pt-32 md:pt-48">
      <div className="px-5 md:px-10">
        <SectionLabel index="03">Portfolio</SectionLabel>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
            <MaskLines lines={['Selected', 'work']} lineClassName={['', 'text-gradient']} />
          </h2>
          <Reveal>
            <p className="max-w-xl leading-relaxed text-paper/70 md:text-lg">{journey}</p>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-32">
          <Reveal y={20}>
            <h3 className="label mb-6">Public client projects</h3>
          </Reveal>
          <div className="border-b border-white/15">
            {clientProjects.map((project, i) => (
              <ClientRow key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>

      <Lab />

      <div className="px-5 pt-24 md:px-10 md:pt-40">
        <Reveal y={20}>
          <h3 className="label mb-6">My projects</h3>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {personalProjects.map((project, i) => (
            <PersonalCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center md:mt-16">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors duration-300 hover:text-paper"
          >
            <FaGithub className="text-xl" />
            You can see more on my GitHub
            <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
