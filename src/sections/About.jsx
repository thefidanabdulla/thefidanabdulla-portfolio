import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Marquee from '../components/Marquee'
import { MaskLines, Reveal, SectionLabel } from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import { bio, capabilities, skills } from '../data/content'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span className="mr-[0.26em] inline-block" style={{ opacity }}>
      {children}
    </motion.span>
  )
}

// Paragraph that lights up word by word as it is scrolled through.
function ScrollText({ text, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

export default function About() {
  return (
    <section id="about" className="relative pt-32 md:pt-48">
      <div className="px-5 md:px-10">
        <SectionLabel index="01">About</SectionLabel>

        <div className="mt-10 md:mt-14 lg:max-w-[58%]">
          <h2 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
            <MaskLines lines={['Hi, who', 'am I?']} lineClassName={['', 'text-gradient']} />
          </h2>
          <ScrollText
            text={bio}
            className="mt-10 text-[clamp(1.35rem,2.5vw,2.4rem)] font-medium leading-[1.3] tracking-[-0.01em] md:mt-14"
          />
        </div>

        <div className="mt-24 grid gap-5 md:mt-40 md:grid-cols-3">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12} className="h-full">
              <TiltCard className="card flex flex-col p-7 md:p-9">
                <span className="label text-violet">0{i + 1}</span>
                <h3 className="mt-10 font-display text-3xl font-bold md:mt-16 md:text-4xl">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-bone/65">{item.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-bone/80">
                      {tag}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-36">
        <p className="sr-only">Skills: {skills.join(', ')}</p>
        <Marquee
          items={skills}
          itemClassName="font-display text-[clamp(2.75rem,8vw,7.5rem)] font-extrabold uppercase leading-[1.1]"
        />
        <Marquee
          items={[...skills].reverse()}
          reverse
          itemClassName="text-ghost font-display text-[clamp(2.75rem,8vw,7.5rem)] font-extrabold uppercase leading-[1.1]"
        />
      </div>
    </section>
  )
}
