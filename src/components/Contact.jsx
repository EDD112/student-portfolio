import { Download, Github, Linkedin, Mail } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { profile } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading id="contact-title" number="04" eyebrow="Contact" title="Let’s talk" />

        <Reveal className="contact__panel">
          <p className="contact__lead">
            I&rsquo;m open to internships, collaborations, and conversations about web development. The
            easiest way to reach me is by email.
          </p>

          <ul className="contact__links">
            {profile.email && (
              <li>
                <a className="btn btn--secondary" href={`mailto:${profile.email}`}>
                  <Mail size={18} aria-hidden="true" />
                  Email
                  <span className="sr-only"> me at {profile.email}</span>
                </a>
              </li>
            )}
            {profile.github && (
              <li>
                <a className="btn btn--secondary" href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github size={18} aria-hidden="true" />
                  GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {profile.linkedin && (
              <li>
                <a className="btn btn--secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin size={18} aria-hidden="true" />
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {profile.resume && (
              <li>
                <a className="btn btn--primary" href={profile.resume} download>
                  <Download size={18} aria-hidden="true" />
                  Download résumé
                </a>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
