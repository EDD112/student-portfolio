import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HeroBackground from './components/HeroBackground'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'
import { navLinks } from './data/portfolio'

const SECTION_IDS = navLinks.map((l) => l.id)

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection(SECTION_IDS)

  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100lvh', zIndex: 0, pointerEvents: 'none' }}
      >
        <HeroBackground />
      </div>

      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar active={active} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}