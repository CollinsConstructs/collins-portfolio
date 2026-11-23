// Qualitative attribution: supplied contribution audit.
// Numerical behavior: read directly from the pinned backend source at 33fef3f.
const backendSource = (path: string, lines: string) => ({
  label: `${path} ${lines.replaceAll('L', 'line ').replace('-', '–')}`,
  href: `https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch/blob/33fef3f/backend/app/${path}#${lines}`,
})

export const fireWatchSourceLinks = [
  { label: 'Historical map · d694eb0 (unmerged)', href: 'https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch/blob/d694eb0/frontend/src/components/FireMap.tsx#L11-L87' },
  { label: 'Historical observations · dc78245 (unmerged)', href: 'https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch/blob/dc78245/frontend/src/components/FireMap.tsx#L98-L188' },
  { label: 'Historical CSV preparation · dc78245', href: 'https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch/blob/dc78245/frontend/scripts/prepare_hotspots.py#L32-L125' },
  { label: 'Merged frontend adapter · c337145', href: 'https://github.com/arsalan5shaik/IBM-Z-Datathon-FireWatch/blob/c337145/frontend/src/api/fires.ts#L18-L56' },
]

export const fireWatchCaseStudy = {
  title: 'FireWatch',
  subtitle: 'Connecting satellite observations to a shared map',
  context: 'IBM Z Datathon 2026 · Six-person collaboration',
  role: 'Full-Stack Developer — NASA FIRMS & Frontend Integration',
  introduction: 'My contribution connected NASA FIRMS satellite data to the team’s existing interface: Python/FastAPI ingestion and GeoJSON delivery on the backend, followed by live-data integration in React and TypeScript.',
  caution: 'Satellite thermal anomalies are observations, not confirmed wildfire incidents. FRP measures fire radiative power in megawatts, not ignition probability or predicted severity. Experimental fire-weather model results are not ignition probabilities.',
  sections: [
    {
      id: 'overview',
      title: 'The problem & my scope',
      paragraphs: [
        'FireWatch was a six-person IBM Z Datathon project. The engineering problem in my work was turning satellite thermal observations into data that an existing map could consume, while keeping the origin and availability of those observations clear.',
        'I worked across the backend data pipeline and the frontend API boundary. The map interface was team-developed. The team’s machine learning, chatbot, weather services, and deployment are outside my individual contribution claims.',
      ],
      evidence: [],
    },
    {
      id: 'prototype',
      title: 'An earlier historical viewer',
      paragraphs: [
        'Before the live-data integration, I built a historical React/MapLibre viewer prototype on an unmerged development branch. It represents an earlier exploration, separate from the changes integrated into the team’s frontend.',
        'Commits d694eb0 and dc78245 on feature/firewatch-frontend establish the original React/TypeScript California viewer, MapLibre initialization and cleanup, navigation, and reset behavior. The historical layer adds GeoJSON circles, date selection, visibility and opacity controls, an FRP legend, and observation popups.',
        'CSV preparation produces GeoJSON with UTC timestamps and source hashes/row provenance, with client-side validation before rendering. The viewer supports two selected daily snapshots, not unrestricted full-year historical analysis. These unmerged commits are distinct from the later live integration into the team’s final interface.',
      ],
      evidence: ['Historical map · d694eb0 (unmerged)', 'Historical observations · dc78245 (unmerged)', 'Historical CSV preparation · dc78245'],
    },
    {
      id: 'backend',
      title: 'From NASA CSV to GeoJSON',
      paragraphs: [
        'Backend PR #5 documents NOAA-20/21 ingestion through NASA FIRMS into the existing FastAPI application. CSV observations are validated, acquisition times are preserved in UTC, and repeated observations are deduplicated by product and observation identity.',
        'Refresh work uses timeouts and capped retries with Retry-After handling. The pipeline retains last-known-good data per product and publishes cache updates atomically. The /api/v1/fires/live endpoint reads cached GeoJSON; a GET does not fetch NASA data or run inference.',
        'The API exposes freshness, partial coverage, and error categories. This separates provider refresh work from map requests, so a request reads a published result rather than waiting for a new provider fetch.',
      ],
      evidence: ['Backend PR #5'],
    },
    {
      id: 'frontend',
      title: 'Integrating with the team’s frontend',
      paragraphs: [
        'Frontend PR #10 connects the existing React/TypeScript interface to real NOAA-20/21 observations. It validates GeoJSON identity, coordinates, UTC acquisition timestamps, and fire radiative power (FRP), then presents source timestamps and cache provenance.',
        'The integration preserves the team’s map and existing services. My frontend contribution is the live-data connection and its presentation of availability and provenance, rather than ownership of the entire interface.',
      ],
      evidence: ['Frontend PR #10', 'Merged frontend adapter · c337145'],
    },
    {
      id: 'availability',
      title: 'Freshness, failures & missing data',
      paragraphs: [
        'The frontend distinguishes fresh, stale, and unavailable data. An initial API failure stays unavailable. A failed refresh retains previously received observations with a stale label. It does not silently substitute generated samples; explicit sample mode remains labeled.',
        'Last successful refresh, truncation, and partial coverage are surfaced. Forecast-not-ready is also explicit, without fabricated predictions or playback for missing forecast hours. These states describe availability, not evidence that no thermal anomalies exist.',
      ],
      evidence: ['Frontend PR #10'],
    },
    {
      id: 'decisions',
      title: 'Technical decisions & lessons',
      paragraphs: [
        'The separation between ingestion and delivery makes the API boundary easier to reason about. CSV validation, UTC handling, deduplication, caching, and GeoJSON delivery are distinct responsibilities rather than one map-loading operation.',
        'The main lesson I take from this collaboration is to make interfaces and uncertainty explicit. Working with an existing frontend meant respecting a shared contract; working with external observations meant preserving provenance and avoiding stronger claims than the data supports.',
        'These are engineering takeaways from the documented design, not claims of measured performance improvements. The original cache reuses the project’s existing locking and atomic-file helpers; integrating those helpers does not imply I authored the entire persistence foundation.',
      ],
      evidence: [],
    },
  ],
  implementationNote: 'The following defaults and rules were read from backend checkpoint 33fef3f, not inferred from the design brief. Configuration can override the stated defaults within the implemented bounds; these are not claims about the current hosted deployment.',
  implementationDetails: [
    {
      topic: 'CSV & observation validation',
      detail: 'Required CSV columns are latitude, longitude, acq_date, acq_time, satellite, and instrument. Missing or duplicate headers fail the response. Latitude is bounded to −90…90 and longitude to −180…180; nonfinite numbers are rejected. FRP may be absent but must be nonnegative when present. Confidence is l/n/h or absent, not a probability.',
      sources: [backendSource('schemas/fires.py', 'L12-L34'), backendSource('services/nasa_firms.py', 'L20-L119')],
    },
    {
      topic: 'UTC & invalid rows',
      detail: 'Acquisition time accepts 1–4 ASCII digits, left-padded to HHMM and combined with the acquisition date as UTC. A future timestamp is invalid. Older or out-of-coverage rows count as outside. Invalid rows are counted and skipped; a nonempty response whose every row is invalid fails as invalid_observations.',
      sources: [backendSource('services/nasa_firms.py', 'L59-L119')],
    },
    {
      topic: 'Deterministic deduplication',
      detail: 'The identity combines product/source, UTC acquisition timestamp, and latitude/longitude formatted to 8 decimal places. The ID is firms- plus the first 32 hexadecimal characters of SHA-256. Same-ID conflicts keep the lexicographically smaller serialized record. Results sort newest first, then by ID. Product identity separates NOAA-20 from NOAA-21; this does not merge nearby detections into incidents.',
      sources: [backendSource('services/nasa_firms.py', 'L77-L131'), backendSource('services/fire_cache.py', 'L277-L285')],
    },
    {
      topic: 'Timeouts & retries',
      detail: 'Defaults are a 10-second timeout per attempt and 2 retries after the first attempt (3 attempts total). HTTP 429 and 5xx responses, timeouts, and connection failures can retry; 401/403 fail as credential errors. Backoff is min(8 seconds, 0.5 × 2^attempt + random jitter from 0 to 0.25 seconds), with attempts indexed from 0. A valid Retry-After replaces that delay; a delay greater than 30 seconds fails instead of being clamped.',
      sources: [backendSource('config.py', 'L51-L57'), backendSource('services/nasa_firms.py', 'L134-L224')],
    },
    {
      topic: 'Provider response bounds',
      detail: 'Defaults cap each provider response at 4,000,000 bytes and 50,000 CSV rows. Exceeding either bound fails the fetch as response_too_large. These are bounded resource limits, not measured throughput or observation totals.',
      sources: [backendSource('config.py', 'L32-L36'), backendSource('services/nasa_firms.py', 'L59-L61'), backendSource('services/nasa_firms.py', 'L199-L215')],
    },
    {
      topic: 'Shared cache & refresh',
      detail: 'The default shared snapshot is shared/data/provider-cache/firms.json. Refresh holds a firms.lock and calls the existing atomic JSON helper. Each product keeps its last-known-good snapshot after a provider failure. The refresh setting defaults to 15 minutes, enforced against the latest persisted attempt; loop mode also sleeps that interval after its work. This is not a guarantee of an exact wall-clock refresh cadence. Force bypasses the interval once, but not the lock.',
      sources: [backendSource('config.py', 'L22-L24'), backendSource('config.py', 'L56-L57'), backendSource('services/fire_cache.py', 'L24-L27'), backendSource('services/fire_cache.py', 'L81-L170'), backendSource('jobs/refresh_fires.py', 'L11-L32')],
    },
    {
      topic: 'Freshness & unavailable data',
      detail: 'Full-product age uses the oldest successful product fetch. With the default refresh setting, age greater than 15 minutes is stale; errors, missing products, future fetch times, or boundary mismatches can also make it stale. There is no separate age-only deletion TTL in this cache implementation. Queries still filter records by acquisition time. No usable cached product produces HTTP 503 firms_unavailable, while a successful empty result can return an empty FeatureCollection.',
      sources: [backendSource('services/fire_cache.py', 'L172-L235'), backendSource('services/fire_cache.py', 'L263-L317')],
    },
    {
      topic: 'GeoJSON query defaults & limits',
      detail: 'The default lookback is 24 hours; the configured maximum defaults to 72 hours. Choose hours or a timezone-aware since, not both. Results default to 500 with an effective configured maximum of 2,000 by default; the route’s separate validation ceiling is 5,000. A bbox must stay inside the California coverage rectangle. Output points use [longitude, latitude], with truncation and partial-coverage metadata. Map GETs read the cache and never fetch NASA data.',
      sources: [backendSource('config.py', 'L32-L36'), backendSource('api/v1/fires.py', 'L14-L57'), backendSource('services/fire_cache.py', 'L263-L317')],
    },
  ],
  evidenceNote: 'Attribution follows the supplied contribution-verification audit: historical commits d694eb0/dc78245 remain unmerged; backend PR #5 merged as a9681ac; frontend PR #10 merged as 4d8d3f0. Backend numerical settings above were checked directly at 33fef3f. Whole-suite test counts in the audit are not counts of tests I personally added. Archived CI for the original historical commits was not established.',
  mediaNote: 'No verified application screenshots are included. The architecture diagram describes the data flow. The hosted demo is not presented as available.',
}
