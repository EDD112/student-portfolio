import { Code2, LayoutTemplate, Wrench, Sparkles } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { skills } from '../data/portfolio'

const ICONS = {
  code: Code2,
  layout: LayoutTemplate,
  wrench: Wrench,
  sparkles: Sparkles,
}

export default function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          number="02"
          eyebrow="Skills"
          title="What I work with"
          intro="Tools and technologies I have used in my coursework and personal projects."
        />

        <ul className="skills__grid">
          {skills.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Sparkles
            return (
              <Reveal as="li" key={group.category} delay={i * 80} className="card skill-card">
                <h3 className="card__title">
                  <span className="skill-card__icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  {group.category}
                </h3>
                <ul className="chips">
                  {group.items.map((item, j) => (
                    <li key={j} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
