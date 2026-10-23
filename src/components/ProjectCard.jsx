import { useState } from 'react'
import { ExternalLink, Github, ImageOff } from 'lucide-react'

export default function ProjectCard({ project }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = project.image && !imgFailed
  const inProgress = project.status === 'in-progress'

  return (
    <article className="project-card">
      <div className="project-card__media">
        {showImage ? (
          <img
            src={project.image}
            alt={project.imageAlt || `Screenshot of ${project.title}`}
            width="1200"
            height="750"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="project-card__placeholder" role="img" aria-label="Project screenshot placeholder">
            <ImageOff size={28} aria-hidden="true" />
            <span>Screenshot placeholder</span>
          </div>
        )}
        <span className={`status ${inProgress ? 'status--progress' : 'status--done'}`}>
          {inProgress ? 'In progress' : 'Completed'}
        </span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <p className="project-card__contrib">
          <span className="project-card__label">My contribution</span>
          {project.contribution}
        </p>

        <ul className="chips chips--small" aria-label="Technologies used">
          {project.tech.map((t, i) => (
            <li key={i} className="chip">
              {t}
            </li>
          ))}
        </ul>

        {(project.live || project.source) && (
          <div className="project-card__links">
            {project.live && (
              <a
                className="btn btn--primary btn--sm"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live demo
                <span className="sr-only"> of {project.title} (opens in a new tab)</span>
              </a>
            )}
            {project.source && (
              <a
                className="btn btn--secondary btn--sm"
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} aria-hidden="true" />
                Source code
                <span className="sr-only"> for {project.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
