import { useEffect, useState } from 'react'
import { CodeXml, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { navLinks, profile } from '../data/portfolio'

export default function Navbar({ active, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu with Escape, and when the viewport grows to desktop size.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 800px)')
    const onResize = (e) => e.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#home" className="wordmark" onClick={close} aria-label={`${profile.name} — back to top`}>
          <span
            className="wordmark__mark"
            aria-hidden="true"
            style={{ background: 'transparent', color: 'var(--accent)' }}
          >
            <CodeXml size={30} strokeWidth={2.4} />
          </span>
          <span className="wordmark__text">{profile.wordmark}</span>
        </a>

        <nav aria-label="Primary" className="navbar__desktop">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav-link ${active === link.id ? 'is-active' : ''}`}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="icon-btn navbar__menu-btn"
            data-open={open}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {/* Both icons stay mounted and cross-fade/rotate, instead of swapping instantly */}
            <Menu size={22} aria-hidden="true" className="menu-icon menu-icon--menu" />
            <X size={22} aria-hidden="true" className="menu-icon menu-icon--close" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
      >
        <ul className="container">
          {navLinks.map((link, i) => (
            <li key={link.id} style={{ '--i': i }}>
              <a
                href={`#${link.id}`}
                className={`mobile-link ${active === link.id ? 'is-active' : ''}`}
                aria-current={active === link.id ? 'true' : undefined}
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
