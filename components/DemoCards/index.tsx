'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield, faUser, faCopy, faCheck, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

interface DemoCredentials {
  email: string
  password: string
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="demo-copy-button"
      title="Copy to clipboard"
    >
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
    </button>
  )
}

function CredentialRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="demo-credential-row">
      <span className="demo-credential-label">{label}</span>
      <div className="demo-credential-value">
        <code>{value}</code>
        <CopyButton text={value} />
      </div>
    </div>
  )
}

function DemoCard({
  type,
  title,
  description,
  url,
  credentials
}: {
  type: 'admin' | 'client'
  title: string
  description: string
  url: string
  credentials: DemoCredentials
}) {
  const icon = type === 'admin' ? faUserShield : faUser

  return (
    <div className={`demo-card demo-card-${type}`}>
      <div className="demo-card-header">
        <div className="demo-card-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3>{title}</h3>
      </div>

      <p className="demo-card-description">{description}</p>

      <div className="demo-credentials">
        <CredentialRow label="Email" value={credentials.email} />
        <CredentialRow label="Password" value={credentials.password} />
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="demo-card-button"
      >
        Open {title}
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  )
}

export function DemoCards() {
  return (
    <div className="demo-cards-grid">
      <DemoCard
        type="admin"
        title="Admin Panel"
        description="Manage FOSSBilling, configure products, view orders, and handle support tickets."
        url="https://demo.fossbilling.org/admin"
        credentials={{
          email: 'demo@fossbilling.org',
          password: 'Demo123!'
        }}
      />
      <DemoCard
        type="client"
        title="Client Area"
        description="Experience the customer view: browse products, manage services, and submit support requests."
        url="https://demo.fossbilling.org"
        credentials={{
          email: 'client@fossbilling.org',
          password: 'Demo123!'
        }}
      />
    </div>
  )
}
