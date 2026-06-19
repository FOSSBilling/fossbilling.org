import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { DemoCards } from '../../components/DemoCards'
import { Callout } from '../../components/Callout'

export const metadata: Metadata = {
  title: 'Demo'
}

export default function DemoPage() {
  return (
    <div className="home-content">
      <div className="content-container">
        <h1 className="headline">Try FOSSBilling</h1>
        <p className="subtitle mt-4">Explore the admin panel and client area without installing anything.</p>

        <Callout type="info" title="Demo Environment">
          The demo resets periodically. Any changes you make will be temporary.
        </Callout>
      </div>

      <div className="features-container">
        <div className="content-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <DemoCards />

          <div className="demo-features-section">
            <h3>What you can try</h3>
            <div className="demo-features-grid">
              <div className="demo-feature-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Create products & services</span>
              </div>
              <div className="demo-feature-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Manage client accounts</span>
              </div>
              <div className="demo-feature-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Configure payment gateways</span>
              </div>
              <div className="demo-feature-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Handle support tickets</span>
              </div>
              <div className="demo-feature-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Generate invoices</span>
              </div>
              <div className="demo-feature-item">
                <FontAwesomeIcon icon={faCheck} />
                <span>Explore the client portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
