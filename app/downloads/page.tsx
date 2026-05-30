import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faServer, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faDocker as faDockerBrand } from '@fortawesome/free-brands-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { DownloadCards } from '../../components/DownloadCards'
import { Callout } from '../../components/Callout'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Downloads'
}

export default function DownloadsPage() {
  return (
    <div className="home-content">
      <div className="content-container">
        <h1 className="headline">Downloads</h1>
        <p className="mt-2 subtitle">Download the latest version of FOSSBilling and start managing your hosting business.</p>

        <Callout type="warning" title="Before you install">
          <ul className="list-disc ml-4 space-y-1">
            <li>FOSSBilling is currently <strong>pre-production software</strong></li>
            <li>Always read the <a href="https://github.com/FOSSBilling/FOSSBilling/releases">release notes</a> before updating</li>
            <li>Some technical knowledge of PHP and web hosting is recommended</li>
            <li>You must install FOSSBilling on a subdomain or the top level domain, not in a subfolder</li>
          </ul>
        </Callout>
      </div>

      <div className="features-container">
        <div className="content-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <DownloadCards />

          <div className="quick-links">
            <a href="https://docs.fossbilling.org/getting-started/requirements/" className="quick-link">
              <FontAwesomeIcon icon={faServer} />
              <span>System Requirements</span>
            </a>
            <a href="https://docs.fossbilling.org/getting-started/installation/" className="quick-link">
              <FontAwesomeIcon icon={faBook} />
              <span>Installation Guide</span>
            </a>
            <a href="https://docs.fossbilling.org/getting-started/docker/" className="quick-link">
              <FontAwesomeIcon icon={faDockerBrand} />
              <span>Docker Setup</span>
            </a>
            <a href="https://docs.fossbilling.org/maintenance/changelog/" className="quick-link">
              <FontAwesomeIcon icon={faClockRotateLeft} />
              <span>Changelog</span>
            </a>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="need-help-section">
          <h2>Need help?</h2>
          <p>Get assistance from the community or browse the documentation.</p>
          <div className="need-help-links">
            <a href="/discord" className="need-help-link">
              <FontAwesomeIcon icon={faDiscord} />
              <div>
                <strong>Discord</strong>
                <span>Chat with the Community</span>
              </div>
            </a>
            <a href="https://docs.fossbilling.org" className="need-help-link">
              <FontAwesomeIcon icon={faBook} />
              <div>
                <strong>Documentation</strong>
                <span>Read the Docs</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
