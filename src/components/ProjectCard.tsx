import type { Project } from '../data/portfolioData'
import ProjectArchitecture from './ProjectArchitecture'

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const introduction = (
    <header className="project-intro">
      <h3 id={`${project.id}-title`}>{project.title}</h3>
      <div className="project-meta">
        <p className="eyebrow">{project.category}</p>
        {project.status && <span className="project-status">{project.status}</span>}
      </div>
      {project.role && <p className="project-role">{project.role}</p>}
      <p>{project.description}</p>
    </header>
  )

  return (
    <article className={`project-card${project.featured ? ' project-featured' : ''}`} aria-labelledby={`${project.id}-title`}>
      {project.featured && introduction}
      {project.featured && (project.image ? (
        <figure className="project-visual">
          <img src={project.image.src} alt={project.image.alt} loading="lazy" />
        </figure>
      ) : project.architecture ? (
        <ProjectArchitecture architecture={project.architecture} />
      ) : null)}
      {!project.featured && project.image && (
        <figure className="project-card-image">
          <img src={project.image.src} alt={project.image.alt} loading="lazy" />
          {project.image.caption && <figcaption>{project.image.caption}</figcaption>}
          <a href={project.image.src} target="_blank" rel="noopener noreferrer">
            View full-size circuit image
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
        </figure>
      )}
      <div className="project-content">
        {!project.featured && introduction}
        {project.contributions && (
          <div className="project-contributions">
            <h4>My contributions</h4>
            <ul>{project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul>
          </div>
        )}
        {project.note && <p className="project-note">{project.note}</p>}
        <ul className="tag-list" aria-label={`${project.title} technologies and topics`}>
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        {project.caseStudyHref && (
          <a className="button button-primary case-study-link" href={project.caseStudyHref}>
            Read {project.title} case study
          </a>
        )}
        {project.links && project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
                <span className="sr-only"> for {project.title} (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
