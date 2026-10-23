import Navbar from './components/Navbar'
import Hero from './components/Hero'
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
