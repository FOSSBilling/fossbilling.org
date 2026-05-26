'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

const navItems = [
  { title: 'Documentation', href: 'https://docs.fossbilling.org/' },
  { title: 'Downloads', href: '/downloads' },
  { title: 'Demo', href: '/demo' },
  { title: 'Translate', href: 'https://translate.fossbilling.org/' },
  {
    title: 'Donate',
    items: [
      { title: 'Open Collective', href: 'https://opencollective.com/FOSSBilling' },
      { title: 'GitHub Sponsors', href: 'https://github.com/sponsors/FOSSBilling' }
    ]
  }
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
    >
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function DropdownMenu({ label, items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 cursor-pointer whitespace-nowrap transition-colors"
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] shadow-lg py-1 z-50">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar({ starButton }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 w-full print:hidden">
      <div className="absolute inset-0 -z-1 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/70 dark:bg-[#111111]/70" />
      <nav className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]" style={{ height: '64px' }}>
        <Link href="/" className="flex items-center" aria-label="Home page">
          <span className="logo" />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) =>
            'items' in item ? (
              <DropdownMenu key={item.title} label={item.title} items={item.items} />
            ) : item.href.startsWith('http') ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 whitespace-nowrap transition-colors"
              >
                {item.title}
              </a>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 whitespace-nowrap transition-colors"
              >
                {item.title}
              </Link>
            )
          )}
          <ThemeToggle />
          {starButton}
          <a href="/discord" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <FontAwesomeIcon icon={faDiscord} size="lg" />
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Menu"
            className="p-2 text-gray-600 dark:text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111111]">
          <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) =>
              'items' in item ? (
                <div key={item.title}>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
                  <div className="ml-4 flex flex-col gap-1 mt-1">
                    {item.items.map((sub) => (
                      <a key={sub.title} href={sub.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 py-1">
                        {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : item.href.startsWith('http') ? (
                <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 py-1">
                  {item.title}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 py-1" onClick={() => setMobileOpen(false)}>
                  {item.title}
                </Link>
              )
            )}
            <div className="pt-2">
              {starButton}
            </div>
            <a href="/discord" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 py-1">
              <FontAwesomeIcon icon={faDiscord} /> Discord
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
