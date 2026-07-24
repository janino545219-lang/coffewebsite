import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App'
import './index.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Dismiss loading screen
function dismissLoadingScreen() {
  const loader = document.getElementById('loading-screen')
  if (loader) {
    // Small delay to ensure first paint is clean
    setTimeout(() => {
      loader.classList.add('hidden')
      // Remove from DOM after transition
      setTimeout(() => {
        loader.remove()
      }, 900)
    }, 1800)
  }
}

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
})

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Export lenis instance for use in components
;(window as any).__lenis = lenis

const RootApp: React.FC = () => {
  useEffect(() => {
    dismissLoadingScreen()

    // Refresh ScrollTrigger after mount
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
)
