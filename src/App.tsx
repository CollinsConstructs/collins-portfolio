import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import About from './components/About'
import Footer from './components/Footer'
import FireWatchCaseStudy from './components/FireWatchCaseStudy'
import './App.css'
import { pageMetadata } from './data/siteConfig'

function App() {
  // Native links keep browser Back/Forward and direct URLs working without a router.
  const isCaseStudy = window.location.pathname.replace(/\/$/, '') === '/projects/firewatch'

  useEffect(() => {
    const metadata = isCaseStudy ? pageMetadata.firewatch : pageMetadata.home
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
    // A native fragment may be resolved before React has mounted the target section.
    const anchorFrame = window.requestAnimationFrame(() => {
      const targetId = window.location.hash.slice(1)
      if (targetId) document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(anchorFrame)
  }, [isCaseStudy])

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar homePath={isCaseStudy ? '/' : ''} />
      <main id="main-content" tabIndex={-1}>
        {isCaseStudy ? (
          <FireWatchCaseStudy />
        ) : (
          <>
            <Hero />
            <Projects />
            <Skills />
            <Experience />
            <About />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
