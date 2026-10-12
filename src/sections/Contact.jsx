import { useState } from 'react'
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa'
import { FiArrowUp, FiArrowUpRight, FiCheck, FiCopy } from 'react-icons/fi'
import Magnetic from '../components/Magnetic'
import { MaskLines, Reveal, SectionLabel } from '../components/Reveal'
import { EMAIL, socials } from '../data/content'
import { scrollTo } from '../lib/store'

const icons = { GitHub: FaGithub, LinkedIn: FaLinkedin, Telegram: FaTelegram }

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className="relative flex min-h-svh flex-col px-5 pt-32 md:px-10 md:pt-36">
      <div className="flex justify-center">
        <SectionLabel index="03">Contact</SectionLabel>
      </div>

      <div className="mt-10 flex flex-col items-center text-center md:mt-14">
        <h2 className="font-display text-[clamp(2.1rem,8vw,9rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
          <MaskLines lines={["Let's build", 'something']} lineClassName={['', 'text-gradient']} />
        </h2>

        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-4 md:mt-14">
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-3 border-b border-bone/40 pb-2 text-[clamp(1.05rem,3vw,2.25rem)] font-medium transition-colors duration-300 hover:border-violet hover:text-violet"
            >
              {EMAIL}
              <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={copy}
            className="label flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors duration-300 hover:border-bone hover:text-bone"
          >
            {copied ? <FiCheck className="text-sm text-violet" /> : <FiCopy className="text-sm" />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
          </button>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 md:mt-16">
          <h3 className="sr-only">Socials</h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {socials.map((social) => {
              const Icon = icons[social.name]
              return (
                <li key={social.name}>
                  <Magnetic>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 rounded-full border border-white/15 bg-ink/40 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
                    >
                      <Icon className="text-lg" />
                      {social.name}
                    </a>
                  </Magnetic>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>

      <footer className="label mt-auto flex items-center justify-between gap-4 pb-6 pt-[34svh] md:pt-[26svh]">
        <span>© {new Date().getFullYear()} Fidan Abdulla</span>
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="flex items-center gap-2 uppercase tracking-[0.28em] transition-colors duration-300 hover:text-bone"
        >
          Back to top <FiArrowUp className="text-sm" />
        </button>
      </footer>
    </section>
  )
}
