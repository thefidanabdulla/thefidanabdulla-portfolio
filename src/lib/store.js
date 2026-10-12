import Lenis from 'lenis'

// Mutable state shared between the DOM and the WebGL scene.
// Read inside useFrame / event handlers; it never triggers React renders.
export const store = {
  lenis: null,
  y: 0,
  velocity: 0,
  // continuous section index: 0 = hero, 1 = about, 2 = work, 3 = contact
  stage: 0,
  smooth: 0,
  pointer: { x: 0, y: 0, energy: 0 },
}

export const SECTIONS = ['home', 'about', 'work', 'contact']

let tops = []

const clamp01 = (v) => Math.min(1, Math.max(0, v))

function measure() {
  tops = SECTIONS.map((id) => {
    const el = document.getElementById(id)
    return el ? el.getBoundingClientRect().top + window.scrollY : 0
  })
  update(window.scrollY)
}

// Each section morphs in while it travels from the bottom of the viewport to the top.
function update(y) {
  const vh = window.innerHeight
  let stage = 0
  for (let i = 1; i < tops.length; i++) stage += clamp01((y - (tops[i] - vh)) / vh)
  store.y = y
  store.stage = stage
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
