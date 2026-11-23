import { projects, projectsSection } from '../data/portfolioData'
import ProjectCard from './ProjectCard'

function Projects() {
  return (
    <section className="section container" id="projects" aria-labelledby="projects-heading">
      <div className="section-heading">
        <div><p className="section-number">{projectsSection.number} / Projects</p><h2 id="projects-heading">{projectsSection.title}</h2></div>
        <p>{projectsSection.description}</p>
      </div>
      <div className="projects-grid">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  )
}

export default Projects
