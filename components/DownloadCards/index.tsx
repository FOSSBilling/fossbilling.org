import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCode, faCalendar, faHardDrive } from '@fortawesome/free-solid-svg-icons'
import { formatDate, formatBytes } from '../../lib/format'

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

async function getLatestStableRelease(): Promise<{ release: Release | null; error: Error | null }> {
  try {
    const response = await fetch('https://api.fossbilling.net/versions/v1', {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: ApiResponse = await response.json()

    if (data.error_code !== 0) {
      return { release: null, error: new Error('API returned error code') }
    }

    const releases = Object.values(data.result)

    releases.sort((a, b) =>
      new Date(b.released_on).getTime() - new Date(a.released_on).getTime()
    )

    const release = releases.find(r => !r.is_prerelease) || null
    return { release, error: null }
  } catch (err) {
    console.error('Error fetching releases:', err)
    return { release: null, error: err instanceof Error ? err : new Error('Unknown error') }
  }
}

function StableCard({ release, error }: { release: Release | null; error: Error | null }) {
  return (
    <div className="download-card">
      <div className="download-card-header">
        <FontAwesomeIcon icon={faDownload} className="download-card-icon" />
        <h3>Latest Release</h3>
      </div>

      <p className="download-card-description">
        Recommended for regular use.<br />Keep in mind that FOSSBilling is pre-production software.
      </p>

      {error ? (
        <div className="download-cards-error">
          Failed to load version info.{' '}
          <a href="https://github.com/FOSSBilling/FOSSBilling/releases">View releases on GitHub</a>
        </div>
      ) : release ? (
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
  const { release: stableRelease, error } = await getLatestStableRelease()

  return (
    <div className="download-cards-grid">
      <StableCard release={stableRelease} error={error} />
      <PreviewCard />
    </div>
  )
}
