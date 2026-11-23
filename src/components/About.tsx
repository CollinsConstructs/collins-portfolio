import { about } from '../data/portfolioData'

function About() {
  return (
    <section className="section container about-section" id="about" aria-labelledby="about-heading">
      <div>
        <p className="section-number">{about.number} / About me</p>
        <h2 id="about-heading">{about.title}</h2>
      </div>
      <div className="about-copy">
        {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  )
}

export default About
