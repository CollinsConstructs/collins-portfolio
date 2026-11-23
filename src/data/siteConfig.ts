// Only put information here that you want visitors to see.
// Empty strings are intentional local placeholders; they produce no public links.
export const siteConfig = {
  displayName: 'Collins Olabanji',
  brandName: 'Collins',
  contactEmail: 'Collinsbuisnessemail@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/collins-olabanji-computer-engineering',
  githubUrl: 'https://github.com/CollinsConstructs',
  resumePdfPath: '/resume.pdf', // Approved public resume; hidden if the file is absent.
}

function publicProfileUrl(value: string, hostname: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname.replace(/^www\./, '') === hostname
      && url.pathname !== '/' && !url.username && !url.password
      ? url.href : ''
  } catch {
    return ''
  }
}

const email = siteConfig.contactEmail.trim()
const publicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  && !/@(?:example\.(?:com|org|net))$/i.test(email) ? email : ''
const linkedIn = publicProfileUrl(siteConfig.linkedInUrl, 'linkedin.com')
const github = publicProfileUrl(siteConfig.githubUrl, 'github.com')

export const contactLinks = [
  { label: 'Email', text: publicEmail, href: publicEmail ? `mailto:${publicEmail}` : '' },
  { label: 'LinkedIn', text: 'View LinkedIn profile', href: linkedIn },
  { label: 'GitHub', text: 'View GitHub profile', href: github },
].filter((link) => link.href)

export const pageMetadata = {
  home: {
    title: `${siteConfig.displayName} | Computer Engineering Portfolio`,
    description: `${siteConfig.displayName} — Computer Engineering undergraduate at The University of Texas at Dallas. Projects in software, backend APIs, embedded systems, robotics, and applied AI.`,
  },
  firewatch: {
    title: `FireWatch Case Study | ${siteConfig.displayName}`,
    description: `${siteConfig.displayName}’s FireWatch engineering case study: NASA FIRMS ingestion, cached GeoJSON delivery, and React frontend integration within a six-person IBM Z Datathon project.`,
  },
}
