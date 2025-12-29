'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import { Features, Feature } from './Features'
import { LogoSlider } from './LogoSlider'
import { Button } from './Button'

export function HomePageContent() {
  return (
    <div className="home-content">
      <div className="content-container">
        <h1 className="headline">Free and open source <br className='sm:block hidden'/>hosting automation.</h1>
        <p className="subtitle">Empower your hosting business with FOSSBilling, <br className='sm:block hidden'/>the free and open-source solution for efficient billing and client management.</p>
        <Link href="/docs">
          <Button text="Get started" />
        </Link>
        <Link href="/downloads">
          <Button text="Download FOSSBilling" />
        </Link>
        <br /><br />
        <Link href="/docs/getting-started"><span className="text-blue-700 hover:text-blue-800 dark:text-blue-600 dark:hover:text-blue-700 hover:underline hover:underline-offset-2">Installation instructions</span></Link>
      </div>

      <div className="features-container">
        <LogoSlider />
        <div className="content-container">
          <Features>
            <Feature large centered id="admin-card">
              <h3>Your brand new admin panel <br className="show-on-mobile"/>for effortless management</h3>
            </Feature>
            <Feature centered id="os-card" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '5rem',
                paddingBottom: '5rem',
            }}>
              <FontAwesomeIcon icon={ faGithub } size="8x" />
              <p><strong>FOSS</strong>Billing is completely open-sourced and licensed under the <a href="https://github.com/FOSSBilling/FOSSBilling/blob/main/LICENSE">Apache 2.0 license</a>. We don't encode any of our software, so you can be sure that you are in control of what runs on your infrastructure.</p>
            </Feature>
          </Features>
        </div>
      </div>
    </div>
  )
}
