'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
import {
  faFileInvoiceDollar,
  faServer,
  faGlobe,
  faHeadset,
  faPuzzlePiece,
  faShieldHalved,
  faCode,
  faHeart,
  faArrowRight,
  faCheckCircle,
  faLock,
  faUsers,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons'

import { LogoSlider } from './LogoSlider'
import { Button } from './Button'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 }
}

function FeatureCard({ icon, title, description, href }) {
  const content = (
    <motion.div
      {...fadeInUp}
      className="feature-card group"
    >
      <div className="feature-card-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {href && (
        <span className="feature-card-link">
          Learn more <FontAwesomeIcon icon={faArrowRight} className="arrow" />
        </span>
      )}
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return content
}

function PillarCard({ icon, title, description }) {
  return (
    <motion.div {...fadeInUp} className="pillar-card">
      <div className="pillar-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

export function HomePageContent() {
  return (
    <div className="home-content">
      {/* Hero Section */}
      <div className="content-container hero-section">
        <motion.h1
          className="headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Free and open source<br className='sm:block hidden'/>hosting automation.
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Empower your hosting business with FOSSBilling,<br className='sm:block hidden'/>
          the free and open-source solution for efficient billing and client management.
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/docs">
            <Button text="Get started" />
          </Link>
          <Link href="/downloads">
            <Button text="Download FOSSBilling" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/docs/getting-started">
            <span className="text-blue-700 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 hover:underline hover:underline-offset-2">
              Installation instructions
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Integrations Section */}
      <div className="features-container">
        <LogoSlider />

        {/* Feature Cards Grid */}
        <div className="content-container">
          <motion.div className="section-header" {...fadeInUp}>
            <h2>Everything you need to run your hosting business</h2>
            <p>FOSSBilling provides all the tools you need to manage clients, automate billing, and provision services.</p>
          </motion.div>

          <div className="feature-cards-grid">
            <FeatureCard
              icon={faFileInvoiceDollar}
              title="Automated Billing"
              description="Generate invoices automatically, send payment reminders, and support multiple currencies with automatic exchange rate syncing."
              href="/docs/faq/features#currency-support"
            />
            <FeatureCard
              icon={faServer}
              title="Hosting Provisioning"
              description="Automatically provision hosting accounts on cPanel, Plesk, DirectAdmin, HestiaCP, and more control panels."
              href="/docs/product-types/hosting"
            />
            <FeatureCard
              icon={faGlobe}
              title="Domain Management"
              description="Register, transfer, and manage domains with support for multiple registrars and experimental support for EPP-based registries."
              href="/docs/product-types/domains"
            />
            <FeatureCard
              icon={faHeadset}
              title="Support Ticketing"
              description="Built-in helpdesk with email notifications, automatic ticket closure, and support for both clients and guests."
              href="/docs/faq/features#ticketing--helpdesk"
            />
            <FeatureCard
              icon={faPuzzlePiece}
              title="Extensible Architecture"
              description="Install themes, modules, payment gateways, server managers, and domain registrars from the extension directory."
              href="/docs/extensions"
            />
            <FeatureCard
              icon={faShieldHalved}
              title="Security First"
              description="IP blocking, reCAPTCHA, spam protection, CSRF prevention, and activity logging to keep your business safe."
              href="/docs/security/best-practices"
            />
          </div>
        </div>

        {/* Why FOSSBilling Section */}
        <div className="content-container why-section">
          <motion.div className="section-header" {...fadeInUp}>
            <h2>Why choose FOSSBilling?</h2>
            <p>Built by the community, for the community. No hidden costs, no vendor lock-in.</p>
          </motion.div>

          <div className="pillars-grid">
            <PillarCard
              icon={faCode}
              title="100% Open Source"
              description="Licensed under Apache 2.0. Audit the code, contribute features, or fork it for your needs. No encoded files, no secrets."
            />
            <PillarCard
              icon={faLock}
              title="Self-Hosted"
              description="Your data stays on your server. Full control over your infrastructure, backups, and security policies."
            />
            <PillarCard
              icon={faUsers}
              title="Community Driven"
              description="Active development with contributions from developers worldwide. Join our Discord server to get involved."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="content-container cta-section">
          <motion.div {...fadeInUp} className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Download FOSSBilling today and start managing your hosting business with confidence.</p>
            <div className="cta-buttons">
              <Link href="/downloads">
                <Button text="Download FOSSBilling" />
              </Link>
              <Link href="/demo">
                <span className="cta-secondary">
                  Try the demo <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Community Section */}
        <div className="content-container community-section">
          <motion.div className="section-header" {...fadeInUp}>
            <h2>Join the community</h2>
            <p>Get help, share ideas, and contribute to FOSSBilling.</p>
          </motion.div>

          <div className="community-grid">
            <motion.a
              href="https://github.com/FOSSBilling/FOSSBilling"
              target="_blank"
              rel="noopener noreferrer"
              className="community-card"
              {...fadeInUp}
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
              <h3>GitHub</h3>
              <p>Star the repo, report issues, or contribute code</p>
            </motion.a>
            <motion.a
              href="/discord"
              target="_blank"
              rel="noopener noreferrer"
              className="community-card"
              {...fadeInUp}
            >
              <FontAwesomeIcon icon={faDiscord} size="2x" />
              <h3>Discord</h3>
              <p>Chat with the community and get real-time help</p>
            </motion.a>
            <motion.a
              href="https://translate.fossbilling.org"
              target="_blank"
              rel="noopener noreferrer"
              className="community-card"
              {...fadeInUp}
            >
              <FontAwesomeIcon icon={faLanguage} size="2x" />
              <h3>Translate FOSSBilling</h3>
              <p>Translate FOSSBilling to your language</p>
            </motion.a>
            <motion.a
              href="https://opencollective.com/fossbilling"
              target="_blank"
              rel="noopener noreferrer"
              className="community-card"
              {...fadeInUp}
            >
              <FontAwesomeIcon icon={faHeart} size="2x" />
              <h3>Donate</h3>
              <p>Support the project financially</p>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}
