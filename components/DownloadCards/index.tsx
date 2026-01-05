import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCode, faCalendar, faHardDrive } from '@fortawesome/free-solid-svg-icons'

interface Release {
  version: string
  released_on: string
  minimum_php_version: string
  download_url: string
  size_bytes: number
  is_prerelease: boolean
}

interface ApiResponse {
  result: Record<string, Release>
  error_code: number
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

async function getLatestStableRelease(): Promise<Release | null> {
  try {
    const response = await fetch('https://api.fossbilling.net/versions/v1', {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    const data: ApiResponse = await response.json()

    if (data.error_code !== 0) {
      return null
    }

    const releases = Object.values(data.result)

    releases.sort((a, b) =>
      new Date(b.released_on).getTime() - new Date(a.released_on).getTime()
    )

    return releases.find(r => !r.is_prerelease) || null
  } catch (err) {
    console.error('Error fetching releases:', err)
    return null
  }
}

function StableCard({ release }: { release: Release | null }) {
  return (
    <div className="download-card">
      <div className="download-card-header">
        <FontAwesomeIcon icon={faDownload} className="download-card-icon" />
        <h3>Latest Release</h3>
      </div>

      <p className="download-card-description">
        Recommended for regular use.<br />Keep in mind that FOSSBilling is pre-production software.
      </p>

      {release ? (
        <>
          <div className="download-card-version">
            v{release.version}
          </div>

          <div className="download-card-meta">
            <span>
              <FontAwesomeIcon icon={faCalendar} />
              {formatDate(release.released_on)}
            </span>
            <span>
              <FontAwesomeIcon icon={faHardDrive} />
              {formatBytes(release.size_bytes)}
            </span>
          </div>

          <div className="download-card-php">
            Requires PHP {release.minimum_php_version}+
          </div>

          <a href={release.download_url} className="download-card-button">
            <FontAwesomeIcon icon={faDownload} />
            Download v{release.version}
          </a>
        </>
      ) : (
        <div className="download-card-empty">
          <a href="https://github.com/FOSSBilling/FOSSBilling/releases" className="download-card-button">
            <FontAwesomeIcon icon={faDownload} />
            View on GitHub
          </a>
        </div>
      )}
    </div>
  )
}

function PreviewCard() {
  return (
    <div className="download-card">
      <div className="download-card-header">
        <FontAwesomeIcon icon={faCode} className="download-card-icon" />
        <h3>Preview Build</h3>
      </div>

      <p className="download-card-description">
        Latest development build from the main branch. May contain experimental features and bugs.
      </p>

      <a
        href="/downloads/preview"
        className="download-card-button download-card-button-secondary"
      >
        <FontAwesomeIcon icon={faCode} />
        Download the latest preview
      </a>
    </div>
  )
}

export async function DownloadCards() {
  const stableRelease = await getLatestStableRelease()

  return (
    <div className="download-cards-grid">
      <StableCard release={stableRelease} />
      <PreviewCard />
    </div>
  )
}
