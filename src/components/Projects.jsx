import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/portfolio'

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          number="03"
          eyebrow="Projects"
          title="Selected work"
          intro="A few things I have built while learning. Each card shows what the project is and what I contributed."
        />

        <ul className="projects__grid">
          {projects.map((project, i) => (
            <Reveal as="li" key={`${project.title}-${i}`} delay={(i % 3) * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
