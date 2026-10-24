import SectionHeading from './SectionHeading'
import CardGrid from './CardGrid'
import { projects } from '../data/portfolio'

export default function Projects() {
  return (
    <section id="projects" className="section section--alt" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          number="03"
          eyebrow="Projects"
          title="Selected work"
          intro="A few things I have built while learning. Each card shows what the project is and what I contributed."
        />

        <CardGrid items={projects} />
      </div>
    </section>
  )
}
