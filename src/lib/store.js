import Lenis from 'lenis'

// Mutable state shared between the DOM and the WebGL scene.
// Read inside useFrame / event handlers; it never triggers React renders.
export const store = {
  lenis: null,
  y: 0,
  velocity: 0,
  // continuous index of the [data-stage] element in view, see STAGE in three/layout.js
  stage: 0,
  smooth: 0,
  pointer: { x: 0, y: 0, energy: 0 },
}

export const SECTIONS = ['home', 'about', 'work', 'contact']

let stageTops = []
let sectionTops = []

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const top = (el) => el.getBoundingClientRect().top + window.scrollY

function measure() {
  stageTops = [...document.querySelectorAll('[data-stage]')].map(top)
  sectionTops = SECTIONS.map((id) => {
    const el = document.getElementById(id)
    return el ? top(el) : 0
  })
  update(window.scrollY)
}

// A stage morphs in while its element rises through the lower part of the viewport,
// then holds until the next one arrives.
function update(y) {
  const vh = window.innerHeight
  let stage = 0
  for (let i = 1; i < stageTops.length; i++) stage += clamp01((y - (stageTops[i] - vh * 0.85)) / (vh * 0.65))
  store.y = y
  store.stage = stage
}

// The nav section currently under the middle of the viewport.
export function activeSection() {
  const middle = store.y + window.innerHeight / 2
  let active = SECTIONS[0]
  sectionTops.forEach((sectionTop, i) => {
    if (middle >= sectionTop) active = SECTIONS[i]
  })
  return active
}

export function scrollTo(target) {
  if (store.lenis) store.lenis.scrollTo(target, { duration: 1.6 })
  else document.querySelector(target)?.scrollIntoView()
}

export function initScroll() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)

  const lenis = new Lenis({ lerp: reduced ? 1 : 0.09, smoothWheel: !reduced })
  store.lenis = lenis
  lenis.on('scroll', ({ scroll, velocity }) => {
    store.velocity = velocity
    update(scroll)
  })

  let frame = requestAnimationFrame(function raf(time) {
    lenis.raf(time)
    frame = requestAnimationFrame(raf)
  })

  const onPointer = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -((e.clientY / window.innerHeight) * 2 - 1)
    const p = store.pointer
    p.energy = Math.min(1, p.energy + Math.hypot(x - p.x, y - p.y) * 1.5)
    p.x = x
    p.y = y
  }

  const resize = new ResizeObserver(measure)
  resize.observe(document.body)
  window.addEventListener('resize', measure)
  window.addEventListener('pointermove', onPointer, { passive: true })
  measure()

  return () => {
    cancelAnimationFrame(frame)
    resize.disconnect()
    window.removeEventListener('resize', measure)
    window.removeEventListener('pointermove', onPointer)
    lenis.destroy()
    store.lenis = null
  }
}
