import { hero, profile } from '../data/portfolioData'

function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow"><span className="accent-line" aria-hidden="true" />{hero.eyebrow}</p>
        <h1 id="hero-heading">{hero.heading} <span>{hero.highlight}</span></h1>
        <p className="hero-introduction">{hero.introduction}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            {hero.primaryAction} <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-secondary" href="#about">
            {hero.secondaryAction} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <aside className="education-card" aria-label="Education">
        <span className="education-symbol" aria-hidden="true">&lt;/&gt;</span>
        <p className="eyebrow">Currently studying</p>
        <h2>{profile.discipline}</h2>
        <p>{profile.education}</p>
        <div className="education-graduation">
          <span>Expected graduation</span>
          <strong>{profile.graduation}</strong>
        </div>
      </aside>
      <div className="interest-row">
        <p className="eyebrow">Areas of interest</p>
        <ul className="interest-list" aria-label="Areas of interest">
          {profile.interests.map((interest) => <li key={interest}>{interest}</li>)}
        </ul>
      </div>
    </section>
  )
}

export default Hero
