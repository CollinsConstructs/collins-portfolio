import { contact, profile } from '../data/portfolioData'
import { contactLinks, siteConfig } from '../data/siteConfig'

function Footer() {
  const links = __RESUME_AVAILABLE__
    ? [...contactLinks, { label: 'Resume', text: 'Download resume (PDF)', href: siteConfig.resumePdfPath }]
    : contactLinks

  return (
    <footer className="site-footer" id="contact" aria-label="Portfolio contact and copyright">
      <div className="container">
        {links.length > 0 && (
        <div className="contact-content">
          <div><p className="eyebrow">Keep in touch</p><h2 id="contact-heading">{contact.title}</h2><p>{contact.description}</p></div>
          <dl className="contact-details">
            {links.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd><a href={detail.href} download={detail.label === 'Resume' ? true : undefined}>{detail.text}</a></dd>
              </div>
            ))}
          </dl>
        </div>
        )}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteConfig.displayName} · {profile.discipline}</p>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
