import { ArrowDown, Mail, MapPin, GraduationCap } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Hero() {
  const initials = profile.name
    .replace(/[^A-Za-z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{profile.title}</p>
          <h1 id="hero-title" className="hero__title">
            {profile.headline}
          </h1>
          <p className="hero__name">
            Hi, I&rsquo;m <strong>{profile.name}</strong>
          </p>
          <p className="hero__intro">{profile.intro}</p>

          <ul className="hero__meta">
            {profile.school && (
              <li>
                <GraduationCap size={18} aria-hidden="true" />
                <span>{profile.school}</span>
              </li>
            )}
            {profile.location && (
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>{profile.location}</span>
              </li>
            )}
          </ul>

          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              View projects
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--secondary">
              <Mail size={18} aria-hidden="true" />
              Get in touch
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="portrait">
            <div className="portrait__ring" aria-hidden="true" />
            {profile.photo ? (
              <img
                className="portrait__img"
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width="480"
                height="600"
                fetchpriority="high"
              />
            ) : (
              <div className="portrait__placeholder" role="img" aria-label="Profile photo placeholder">
                <span className="portrait__initials">{initials || 'YN'}</span>
                <span className="portrait__hint">Profile photo placeholder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
