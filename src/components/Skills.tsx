import { skillGroups, skillsSection } from '../data/portfolioData'

function Skills() {
  return (
    <section className="section container" id="skills" aria-labelledby="skills-heading">
      <div className="section-heading">
        <div><p className="section-number">{skillsSection.number} / Skills</p><h2 id="skills-heading">{skillsSection.title}</h2></div>
        <p>{skillsSection.description}</p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <div className="skill-group" key={group.title}>
            <span className="skill-number" aria-hidden="true">0{index + 1}</span>
            <h3>{group.title}</h3>
            <ul className="tag-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            {group.note && <p className="skill-note">{group.note}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
