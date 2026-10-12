import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Cursor from './components/Cursor'
import Interlude from './components/Interlude'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import { interludes } from './data/content'
import { initScroll, store } from './lib/store'
import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Work from './sections/Work'

// three.js is the heavy part of the bundle, keep it out of the first paint
const Scene = lazy(() => import('./three/Scene'))

const App = () => {
  const [sceneReady, setSceneReady] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => initScroll(), [])

  // no scrolling behind the loader
  useEffect(() => {
    if (ready) store.lenis?.start()
    else store.lenis?.stop()
  }, [ready])

  const onSceneReady = useCallback(() => setSceneReady(true), [])
  const onLoaded = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <Scene onReady={onSceneReady} />
      </Suspense>

      <Navbar ready={ready} />

      <main className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Interlude scenes={interludes.afterAbout} />
        <Work />
        <Interlude scenes={interludes.afterWork} />
        <Contact />
      </main>

      <div className="halftone" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />

      <AnimatePresence>{!ready && <Loader sceneReady={sceneReady} onDone={onLoaded} />}</AnimatePresence>
    </MotionConfig>
  )
}

export default App
