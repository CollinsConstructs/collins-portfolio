import type { Project } from '../data/portfolioData'

type ProjectArchitectureProps = {
  architecture: NonNullable<Project['architecture']>
}

// An ordered list keeps the data flow readable without CSS or images.
function ProjectArchitecture({ architecture }: ProjectArchitectureProps) {
  return (
    <figure className="project-architecture">
      <p className="eyebrow">{architecture.title}</p>
      <ol className="pipeline">
        {architecture.steps.map((step, index) => (
          <li key={step.label}>
            <div className="pipeline-step">
              <strong>{step.label}</strong>
              <span>{step.responsibility}</span>
            </div>
            {index < architecture.steps.length - 1 && (
              <span className="pipeline-arrow" aria-hidden="true">↓</span>
            )}
          </li>
        ))}
      </ol>
      <figcaption>{architecture.caption}</figcaption>
    </figure>
  )
}

export default ProjectArchitecture
