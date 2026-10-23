import { Compass, Target } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { about } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" number="01" eyebrow="About" title="A little about me" />

        <div className="about__grid">
          <Reveal className="about__bio">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="about__aside" delay={120}>
            <div className="card about__card">
              <h3 className="card__title">
                <Compass size={18} aria-hidden="true" />
                Interests
              </h3>
              <ul className="chips">
                {about.interests.map((item, i) => (
                  <li key={i} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card about__card">
              <h3 className="card__title">
                <Target size={18} aria-hidden="true" />
                Goals
              </h3>
              <ul className="goal-list">
                {about.goals.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
