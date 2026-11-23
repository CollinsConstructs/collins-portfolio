import { navigation, profile } from '../data/portfolioData'
import { contactLinks } from '../data/siteConfig'

function Navbar({ homePath = '' }: { homePath?: string }) {
  return (
    <header className="site-header">
      <div className="container navbar">
        <a className="brand" href={`${homePath}#top`} aria-label={`${profile.name}, back to top`}>
          <span className="brand-mark" aria-hidden="true">{profile.initials}</span>
          <span>{profile.name}<span className="brand-description"> / Portfolio</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={`${homePath}${item.href}`}>{item.label}</a>
          ))}
        </nav>
        {(contactLinks.length > 0 || __RESUME_AVAILABLE__) && <a className="nav-contact" href={`${homePath}#contact`}>
          Let’s connect <span aria-hidden="true">↗</span>
        </a>}
      </div>
    </header>
  )
}

export default Navbar
