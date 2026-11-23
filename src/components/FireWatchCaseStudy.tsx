import { useEffect, useRef } from 'react'
import { projects } from '../data/portfolioData'
import { fireWatchCaseStudy as study, fireWatchSourceLinks } from '../data/fireWatchCaseStudy'
import ProjectArchitecture from './ProjectArchitecture'
import EvidenceLinks from './EvidenceLinks'

function PortfolioReturn() {
  return (
    <nav className="case-study-return" aria-label="Return to portfolio">
      <a href="/">Main portfolio</a>
      <a href="/#projects">Back to projects</a>
    </nav>
  )
}

type NarrativeSectionProps = {
  section: (typeof study.sections)[number]
  links: NonNullable<(typeof projects)[number]['links']>
}

function NarrativeSection({ section, links }: NarrativeSectionProps) {
  const evidence = section.evidence.flatMap((label) => {
    const link = links.find((item) => item.label === label)
    return link ? [link] : []
  })

  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`}>
      <h2 id={`${section.id}-heading`}>{section.title}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {evidence.length > 0 && <EvidenceLinks links={evidence} />}
    </section>
  )
}

function FireWatchCaseStudy() {
  const deepDiveRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const disclosure = deepDiveRef.current
    if (!disclosure) return
    let openBeforePrint: boolean | undefined

    // Include technical evidence in PDFs, then restore the reader's open/closed choice.
    const preparePrint = () => {
      openBeforePrint ??= disclosure.open
      disclosure.open = true
    }
    const restoreDisclosure = () => {
      if (openBeforePrint !== undefined) disclosure.open = openBeforePrint
      openBeforePrint = undefined
    }
    window.addEventListener('beforeprint', preparePrint)
    window.addEventListener('afterprint', restoreDisclosure)
    return () => {
      window.removeEventListener('beforeprint', preparePrint)
      window.removeEventListener('afterprint', restoreDisclosure)
    }
  }, [])

  const project = projects.find((item) => item.id === 'firewatch')
  if (!project) return <p className="container section">Case study unavailable. <a href="/#projects">Return to projects</a></p>

  const allEvidence = [...(project.links ?? []), ...fireWatchSourceLinks]
  const overview = study.sections.find((section) => section.id === 'overview')
  const narrativeSections = study.sections.filter((section) => section.id !== 'overview')
  const contributionLabels: Record<string, string> = {
    Repository: 'GitHub Repository',
    'Backend PR #5': 'Merged Backend PR #5',
    'Frontend PR #10': 'Merged Frontend PR #10',
  }
  const contributionLinks = (project.links ?? []).map((link) => ({
    ...link,
    label: contributionLabels[link.label] ?? link.label,
  }))

  return (
    <article className="case-study container" aria-labelledby="case-study-title">
      <PortfolioReturn />
      <header className="case-study-heading">
        <p className="eyebrow">Engineering case study</p>
        <h1 id="case-study-title">{study.title}</h1>
        <p className="case-study-subtitle">{study.subtitle}</p>
        <dl className="case-study-facts">
          <div><dt>Context</dt><dd>{study.context}</dd></div>
          <div><dt>My role</dt><dd>{study.role}</dd></div>
        </dl>
        <p>{study.introduction}</p>
        <nav aria-label="Verified contributions">
          <EvidenceLinks links={contributionLinks} className="case-study-primary-evidence" />
        </nav>
        <ul className="tag-list" aria-label="Technologies">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </header>
      <aside className="case-study-caution" aria-label="Interpreting the data">{study.caution}</aside>
      <div className="case-study-layout">
        <nav className="case-study-contents" aria-label="Case study contents">
          <p className="eyebrow">In this study</p>
          <ul>
            {overview && <li><a href="#overview">{overview.title}</a></li>}
            <li><a href="#architecture">Architecture</a></li>
            {narrativeSections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
            <li><a href="#evidence">Verification & outcome</a></li>
            <li><a href="#implementation">Implementation Deep Dive</a></li>
          </ul>
        </nav>
        <div className="case-study-body">
          {overview && <NarrativeSection section={overview} links={allEvidence} />}
          <section id="architecture" aria-labelledby="architecture-heading">
            <h2 id="architecture-heading">Architecture & ownership</h2>
            {project.architecture && <ProjectArchitecture architecture={project.architecture} />}
          </section>
          {narrativeSections.map((section) => <NarrativeSection key={section.id} section={section} links={allEvidence} />)}
          <section id="evidence" aria-labelledby="evidence-heading">
            <h2 id="evidence-heading">Verification & outcome</h2>
            <EvidenceLinks links={allEvidence} />
            <p>{study.evidenceNote.replace('settings above', 'settings in the deep dive')}</p>
            <p>{study.mediaNote}</p>
          </section>
          <section id="implementation" aria-labelledby="implementation-heading">
            <details className="implementation-disclosure" ref={deepDiveRef}>
              <summary>
                <h2 id="implementation-heading">Implementation Deep Dive</h2>
                <span>Expand for verified settings and pinned source references.</span>
              </summary>
              <div className="implementation-content">
                <p>{study.implementationNote}</p>
                <dl className="implementation-details">
                  {study.implementationDetails.map((detail) => (
                    <div key={detail.topic}>
                      <dt>{detail.topic}</dt>
                      <dd>
                        <p>{detail.detail}</p>
                        <EvidenceLinks links={detail.sources} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </details>
          </section>
          <PortfolioReturn />
        </div>
      </div>
    </article>
  )
}

export default FireWatchCaseStudy
