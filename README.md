# Collins — Computer Engineering Portfolio

A portfolio built with Vite, React, TypeScript, and plain CSS, with a dedicated FireWatch reading view. No additional runtime dependencies, backend, or database. `vercel.json` prepares routing without deploying anything.

## Run locally

From the project folder in PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Installation is only needed when dependencies are missing or change. Open the Local URL printed by Vite (usually http://localhost:5173). Saving a source file updates the page automatically. Stop the server with Ctrl+C.

## Verify

```powershell
npm.cmd run build
npm.cmd run lint
```

The build checks TypeScript and creates the production files in `dist/`. Lint checks the source for potential problems. Neither command deploys the site.

## How the components fit together

`src/main.tsx` starts React and renders `App`. `src/App.tsx` arranges the page:

```text
App
├── Navbar
├── main
│   ├── Hero
│   ├── Projects
│   │   └── ProjectCard (one for each project)
│   │       └── ProjectArchitecture (featured pipeline)
│   ├── Skills
│   ├── Experience
│   └── About
└── Footer (only available contact and resume links)
```

The FireWatch card links to `/projects/firewatch`. At that path, `App` renders
`FireWatchCaseStudy` in place of the homepage sections, retaining Navbar and Footer.
Native links support browser Back/Forward and direct loading without an added router.
Vite handles direct URLs locally; any future static host will need an SPA fallback to `index.html`.

The detailed narrative lives in `src/data/fireWatchCaseStudy.ts`. Shared project
links, technology labels, contributions, and architecture remain in `portfolioData.ts`.
`ProjectArchitecture` renders the same diagram in both views. The public descriptions
of backend PR #5 and frontend PR #10 support the documented ingestion and availability
behavior. Session D's supplied contribution audit establishes the historical branch
and separate merged contributions. Numerical validation, deduplication, retry, cache,
and query behavior was then read directly from all six referenced backend source files
at `33fef3f`. `implementationDetails` in `fireWatchCaseStudy.ts` holds the verified
settings and pinned filename/line citations. Defaults are distinguished from route
validation ceilings and deployment configuration. No verified screenshots or working
live-demo claim are included; historical archived CI remains unestablished.

The main reading flow keeps the overview, architecture, historical prototype,
backend, integration, lessons, and verification visible. Numerical settings are
in a native `<details>` / `<summary>` disclosure titled **Implementation Deep Dive**.
Enter or Space toggles it. Before printing, the page opens the disclosure so technical
references are included in PDF output, then restores its previous state after printing.
`EvidenceLinks.tsx` gives contribution and source links consistent list spacing,
including separate rows in print. The introduction promotes the repository and merged
PRs; the return navigation links to both the homepage and its Projects section.

Each component lives in `src/components/` and returns semantic HTML as JSX. A React component is a reusable function that describes a part of the interface. `ProjectCard` receives a `project` prop: the project object it should display.

## Content and TypeScript

`src/data/portfolioData.ts` holds identity, navigation, introductory text, projects, skills, experience, about text, and contact placeholders. Components import the relevant values. For example, `Projects` uses `projects.map(...)` to render one `ProjectCard` per object. A stable `id` supplies React's `key`, helping React identify each card.

The exported `Project` type describes the fields each project can have. `title: string` means the title must be text; `tags: string[]` means tags are a list of strings. A `?` marks an optional field, such as `status`, `links`, or `image`. TypeScript flags missing required fields and incorrect value types while you edit and build.

## Make changes

- **Colors and type:** edit the CSS variables and base typography in `src/index.css`. All eight Clean Light colors are defined once in `:root`.
- **Layout and spacing:** edit the named sections in `src/App.css`. Media queries near the bottom adjust tablet and mobile layouts; `--content-width` in `src/index.css` sets the 1120px content limit.
- **Text:** edit the corresponding export in `src/data/portfolioData.ts`, then save. Structural UI labels such as “My contributions” live in their components.
- **Project cards:** copy a project object in the `projects` array, give it a unique `id`, and change its text and tags. Keep FireWatch first with `featured: true`. Other cards need no `featured` field. They appear automatically, with no change to `App.tsx`.

Example of a basic project object (replace the example text with verified information):

```ts
{
  id: 'unique-project-id',
  title: 'Project title',
  category: 'Project area',
  description: 'A short, accurate project description.',
  tags: ['Technology'],
}
```

For a real FireWatch screenshot, place the file in `public/images/`, then add an `image` field to the FireWatch object:

```ts
image: {
  src: '/images/firewatch.png',
  alt: 'Describe what is actually visible in the screenshot.',
},
```

Until then, the featured card displays an accessible architecture diagram using an ordered HTML list. Its steps and ownership labels live in the project's `architecture` field. It distinguishes individual backend and integration contributions from the team-owned map interface. Project links open in new tabs; projects without verified links have no invented buttons. The earlier MapLibre prototype is explicitly described as being on an unmerged branch. The unavailable hosted demo is not linked.

Experience entries include short descriptions and confirmed membership dates where supplied. Skills are grouped into four categories, with NASA FIRMS identified as an external source. Print styles hide local navigation, preserve technical content, and keep the contact footer and copyright together.

## Public profile and resume readiness

Edit `src/data/siteConfig.ts` for the public display name, contact email, LinkedIn URL,
GitHub URL, resume PDF path, and page metadata. Empty email/LinkedIn values stay local
as TODO placeholders and do not render. Example-domain email addresses, malformed
profile URLs, and non-HTTPS profile links are excluded. Only add approved public details;
configuration under `src/` becomes part of the browser bundle.

The approved one-page public resume is at `public/resume.pdf`; its contents were not
edited during integration. Text, metadata, links, and the rendered page were checked
for a personal phone number; none was found. Restart Vite/rebuild after replacing it.
The Vite configuration checks that the configured
PDF exists before enabling the footer resume link. It does not create or choose a resume.
No keys, private email, or backend environment variables are needed for this static site.

The HTML template gets site metadata from this configuration at build time. The app
updates title/description when the case-study view loads. Crawlers that do not run
JavaScript receive the generic portfolio preview. A dedicated static case-study preview,
approved social-preview image, and canonical production URL are optional follow-ups.

## Local checkpoint and future deployment (not performed)

This directory currently has no Git repository or remote, so there is no Git status,
tracked-file inventory, or existing commit to report. After approving the files and the
publication plan, create a local checkpoint yourself:

```powershell
git init -b main
git add .
git status --short
git diff --cached --stat
git diff --cached
git commit -m "Prepare verified engineering portfolio for publication"
```

Review the staged files before committing. `.gitignore` excludes dependencies, build
output, temporary files, exported PDFs, credentials, and `.vercel/`. Keep source,
`package-lock.json`, the authentic circuit image, and `vercel.json` in version control.
Make a separate local folder backup if you need a checkpoint before using Git.

Only after explicit publication approval: create an empty GitHub portfolio repository,
add its verified URL as `origin`, and push `main`. Import it into Vercel, choose Vite,
use `npm run build` and output directory `dist`, and use a Node version compatible with
the installed Vite package (24.x matches this audit's Node 24.22.0). Importing/deploying on Vercel publishes a deployment, so
stop before that action until authorized. No environment secrets are required.

`vercel.json` rewrites both FireWatch path spellings to `index.html`; it leaves asset
paths alone. On the approved deployment, directly open and refresh
`/projects/firewatch`, check the circuit image and favicon, then repeat keyboard and
mobile checks. Local Vite preview does not prove Vercel routing has been deployed.
Reference: https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas

## Prepublication audit — November 22, 2026

- [x] Production build and ESLint pass; no new runtime dependencies.
- [x] Homepage and case study checked at 1280, 768, 390, and 320px with no horizontal overflow.
- [x] Skip link, keyboard focus, disclosure Enter/Space behavior, and direct case-study reload checked.
- [x] Return-to-Projects fragment corrected after React mounts; existing sticky-header spacing retained.
- [x] Circuit image is uncropped and has descriptive alt text plus a full-size link for small labels.
- [x] Missing email/LinkedIn/resume links and fake placeholder text are absent from the public UI.
- [x] Primary public project/profile URLs and pinned source resources respond successfully.
- [x] Main text contrast is 15.55:1, secondary text 7.24:1, and the lowest checked accent/text pairing 4.75:1 (AA).
- [x] No animation/transition/smooth-scroll rules; reduced-motion users receive the same static presentation.
- [x] Expected public assets only; no starter images, obvious credential patterns, or private source files found in the scoped scan.
- [x] Verified FireWatch narrative/component and authentic circuit-image hashes unchanged.
- [x] Approved public email, LinkedIn URL, GitHub URL, and current one-page resume configured after the initial audit.
- [x] Professional identity is Collins Olabanji; visible navigation branding remains Collins.
- [ ] Create and review a local Git checkpoint; this folder is not yet a Git repository.
- [ ] Obtain explicit publication approval before any commit, push, Vercel import, or deployment.
- [ ] After authorized deployment, smoke-test the hosted deep link and assets; local preview is not hosted verification.

Content remains bounded by supplied evidence: FireWatch separates the unmerged historical
viewer, merged backend, merged integration, and team work. Arduino is described as a
simulation with its known button-hold limitation. IEEE work is ongoing and Python
classification/dashboard features are planned. Skills have no proficiency percentages;
NASA FIRMS is labeled as a data source. Missing experience dates and additional
supporting-project evidence were not invented.

Optional enhancements: approved social image/canonical URL after the production address
is chosen; static case-specific social metadata for non-JavaScript crawlers; real
FireWatch screenshots; more verified experience dates and supporting-project links.
The currently unavailable FireWatch hosted demo stays unlinked.

## Next session

Supply approved public details in `siteConfig.ts` or leave those links hidden, and provide verified links for the remaining supporting projects. A resume link appears only after a real configured PDF exists. Reverify the hosted FireWatch application before presenting it as a working demo. Publication remains a separate authorized step.
