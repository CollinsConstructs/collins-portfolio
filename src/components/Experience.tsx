import { experiences, experienceSection } from '../data/portfolioData'

function Experience() {
  return (
    <section className="section container" id="experience" aria-labelledby="experience-heading">
      <div className="section-heading">
        <div><p className="section-number">{experienceSection.number} / Experience</p><h2 id="experience-heading">{experienceSection.title}</h2></div>
        <p>{experienceSection.description}</p>
      </div>
      <ul className="experience-list">
        {experiences.map((experience) => (
          <li className="experience-row" key={experience.organization}>
            <span className="experience-marker" aria-hidden="true" />
            <div className="experience-identity">
              <h3>{experience.organization}</h3>
              <p className="experience-role">{experience.role}</p>
              {experience.since && <p className="experience-since">{experience.since}</p>}
            </div>
            <p className="experience-description">{experience.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Experience
