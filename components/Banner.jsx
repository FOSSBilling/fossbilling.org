'use client'

import { useState, useEffect } from 'react'

const RELEASE_VERSION = '0.7.2'

export default function Banner() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(`${RELEASE_VERSION}-release`) === '1') {
        setHidden(true)
      }
    } catch {}
  }, [])

  if (hidden) return null

  return (
    <div className="sticky top-0 z-40 bg-black text-white text-center text-sm py-2 px-4">
      FOSSBilling {RELEASE_VERSION} is released!{' '}
      <a
        href="https://github.com/FOSSBilling/FOSSBilling/releases/latest"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-300"
      >
        Read more &rarr;
      </a>
      <button
        onClick={() => {
          setHidden(true)
          try { localStorage.setItem(`${RELEASE_VERSION}-release`, '1') } catch {}
        }}
        className="ml-4 opacity-70 hover:opacity-100"
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  )
}
