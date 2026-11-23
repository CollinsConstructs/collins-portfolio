import { siteConfig } from './siteConfig'

// Edit portfolio content here. Components import these values to display them.
export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  status?: string
  featured?: boolean
  role?: string
  caseStudyHref?: string
  contributions?: string[]
  note?: string
  links?: ProjectLink[]
  architecture?: {
    title: string
    caption: string
    steps: { label: string; responsibility: string }[]
  }
  // Add a real screenshot from public/ when one is available.
  image?: { src: string; alt: string; caption?: string }
}

export const profile = {
  name: siteConfig.brandName,
  initials: 'C.',
  discipline: 'Computer Engineering',
  education: 'The University of Texas at Dallas',
  graduation: 'May 2029',
  interests: [
    'Software engineering',
    'Backend APIs',
    'Embedded systems',
    'Robotics',
    'Applied AI',
  ],
}

export const navigation = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
]

export const hero = {
  eyebrow: 'A little curiosity. A lot to build.',
  heading: 'Exploring the space between',
  highlight: 'software & hardware.',
  introduction:
    'I’m Collins, a Computer Engineering undergraduate at The University of Texas at Dallas, interested in building software and understanding the systems behind it.',
  primaryAction: 'Explore my projects',
  secondaryAction: 'Get to know me',
}

export const projectsSection = {
  number: '01',
  title: 'Selected projects',
  description: 'Learning through code, collaboration, and hands-on engineering.',
}

export const projects: Project[] = [
  {
    id: 'firewatch',
    title: 'FireWatch',
    category: 'IBM Z Datathon 2026 · Six-person team',
    featured: true,
    role: 'Full-stack developer · Backend & frontend integration',
    caseStudyHref: '/projects/firewatch',
    architecture: {
      title: 'Satellite data pipeline',
      caption: 'My contributions cover the backend pipeline and live-data integration. The map interface belongs to the team.',
      steps: [
        { label: 'NASA FIRMS', responsibility: 'External satellite-data source' },
        { label: 'Python ingestion & validation', responsibility: 'My backend contribution · includes deduplication' },
        { label: 'Cache', responsibility: 'My backend contribution' },
        { label: 'FastAPI GeoJSON endpoint', responsibility: 'My backend contribution' },
        { label: 'React / MapLibre frontend', responsibility: 'Team-owned map · my live-data integration' },
      ],
    },
    description:
      'A collaborative datathon project working with NASA FIRMS satellite data. My work focused on the data API and its integration with the team’s frontend.',
    contributions: [
      'Built Python/FastAPI satellite-data ingestion, validation, caching, deduplication, and a GeoJSON API using NASA FIRMS data.',
      'Integrated live satellite data with the team’s React/TypeScript frontend.',
    ],
    note: 'Earlier prototype: a historical MapLibre viewer on an unmerged branch.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'GeoJSON'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch',
      },
      {
        label: 'Backend PR #5',
        href: 'https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch/pull/5',
      },
      {
        label: 'Frontend PR #10',
        href: 'https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch/pull/10',
      },
    ],
  },
  {
    id: 'simon-says',
    title: 'Arduino Simon Says Memory Game',
    category: 'Embedded systems · Nov–Dec 2025',
    description: 'A C++ memory game simulated with an Arduino Uno R3 in Tinkercad Circuits. Arrays store randomized sequences; digital I/O connects four push buttons, four colored LEDs, and buzzer feedback. Matching inputs advance increasingly long sequences; mistakes trigger failure feedback.',
    note: 'Supports up to 20 rounds. Manually retested in simulation in November 2026. Known limitation: holding a button can register multiple inputs.',
    tags: ['C++', 'Arduino Uno R3', 'Tinkercad'],
    image: {
      src: '/images/simon-says-tinkercad-circuit.png',
      alt: 'Tinkercad circuit showing an Arduino Uno R3 wired to green, red, blue, and yellow LEDs, four push buttons, resistors, and a buzzer.',
      caption: 'Original Tinkercad Circuits simulation',
    },
    links: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/CollinsConstructs/arduino-simon-says-tinkercad',
      },
      {
        label: 'C++ source (.ino)',
        href: 'https://github.com/CollinsConstructs/arduino-simon-says-tinkercad/blob/main/simon_says_arduino_uno_r3_v21.ino',
      },
    ],
  },
  {
    id: 'environment-monitor',
    title: 'AI-Powered Environment Monitor',
    category: 'IEEE UT Dallas CIS',
    status: 'In progress',
    description: 'An ongoing ESP32-based environmental monitoring project with IEEE UT Dallas CIS. Python classification and dashboard features are planned.',
    tags: ['Applied AI', 'Environment monitoring'],
  },
  {
    id: 'solis-rover',
    title: 'Solis Rover',
    category: 'Robotics',
    status: 'Previous involvement',
    description: 'Previous involvement in ROS-based robotics through the Solis Rover project.',
    tags: ['ROS', 'Robotics'],
  },
]

export const skillsSection = {
  number: '02',
  title: 'My technical toolkit',
  description: 'A growing toolkit from coursework and projects, with practical experience still developing.',
}

export const skillGroups = [
  {
    title: 'Programming',
    items: ['Python', 'C++', 'Java', 'TypeScript', 'JavaScript'],
    note: '',
  },
  {
    title: 'Software & APIs',
    items: ['React', 'FastAPI', 'REST APIs', 'Git/GitHub'],
    note: '',
  },
  {
    title: 'Embedded & Robotics',
    items: ['Arduino', 'Tinkercad', 'ROS', 'Digital circuit simulation'],
    note: '',
  },
  {
    title: 'Data & Geospatial',
    items: ['GeoJSON', 'MapLibre GL JS', 'Data validation', 'Caching', 'NASA FIRMS integration'],
    note: 'NASA FIRMS is an external data source; integration is the technical skill.',
  },
]

export const experienceSection = {
  number: '03',
  title: 'Experience & community',
  description: 'Learning with teams, contributing to projects, and supporting peers.',
}

export const experiences = [
  {
    organization: 'Handshake AI',
    role: 'AI Trainer / Model Evaluator',
    since: '',
    description: 'Contract-based evaluation of visual and multimodal AI outputs, instruction-following, and reasoning, with documentation of model errors.',
  },
  {
    organization: 'Nebula Labs',
    role: 'Software Developer, API & Platform Team',
    since: 'Member since September 2026',
    description: 'Gaining experience with the team’s backend development environment, REST APIs, and Go/MongoDB tooling.',
  },
  {
    organization: 'IEEE UT Dallas CIS',
    role: 'Technical Project Member',
    since: 'Joined October 2026',
    description: 'Participating in an ongoing ESP32-based environmental monitoring project. Python classification and dashboard features are planned.',
  },
  {
    organization: 'UT Dallas Peer Mentorship',
    role: 'Peer Mentor',
    since: '',
    description: 'Mentoring three Undergraduate Success Scholars students and one Freshman Mentorship Program student through academic guidance, campus resources, and transition support.',
  },
]

export const about = {
  number: '04',
  title: 'Curiosity is the common thread.',
  paragraphs: [
    'I’m studying Computer Engineering at The University of Texas at Dallas, with an expected graduation in May 2029. I want to understand how software and hardware interact, from backend services that move data to embedded devices that respond to the world.',
    'Collaborative projects have helped me see why clear interfaces, careful data validation, and communication between teammates matter. On FireWatch, connecting satellite data to the team’s frontend gave me practical experience working across that boundary.',
    'I’m continuing to develop practical skills in software engineering, embedded systems, robotics, and applied AI through coursework, team projects, and hands-on learning.',
  ],
}

export const contact = {
  title: 'Let’s connect.',
  description: 'Find my public profiles and contact links below.',
}
