import type { ProjectLink } from '../data/portfolioData'

type EvidenceLinksProps = {
  links: ProjectLink[]
  className?: string
}

function EvidenceLinks({ links, className = '' }: EvidenceLinksProps) {
  return (
    <ul className={`evidence-links ${className}`}>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default EvidenceLinks
