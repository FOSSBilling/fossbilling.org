import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import type { SVGProps } from 'react'

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  )
}

async function getStarCount() {
  try {
    const githubToken = process.env.GITHUB_TOKEN
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'fossbilling-website'
    }

    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}`
    }

    const ghRequest = new Request('https://api.github.com/repos/FOSSBilling/FOSSBilling', {
      headers
    })

    const res = await fetch(ghRequest, {
      next: { revalidate: 24 * 60 * 60 }
    })

    if (!res.ok) {
      const errorBody = await res.text().catch((bodyError) => {
        console.error('Error reading error response body:', bodyError)
        return ''
      })
      const message = `Failed to fetch stars: HTTP ${res.status} ${res.statusText}` + (errorBody ? ` - ${errorBody}` : '')
      throw new Error(message)
    }

    const data: unknown = await res.json()
    if (
      typeof data === 'object' &&
      data !== null &&
      'stargazers_count' in data &&
      typeof (data as { stargazers_count: unknown }).stargazers_count === 'number'
    ) {
      return (data as { stargazers_count: number }).stargazers_count
    }

    throw new Error('Invalid GitHub API response: missing or non-numeric stargazers_count')
  } catch (error) {
    console.error('Error fetching star count:', error)
    return null
  }
}

const compactNumberFormatter = new Intl.NumberFormat("en", { notation: "compact" });

function formatCompactNumber(number: number) {
  return compactNumberFormatter.format(number);
}

export default async function GitHubStarButton() {
  const stars = await getStarCount()

  return (
    <Link
      href="https://github.com/FOSSBilling/FOSSBilling"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
      aria-label="Star FOSSBilling on GitHub"
    >
      <GitHubIcon className="h-4 w-4 text-gray-700 dark:text-gray-200" />
      {stars !== null && (
        <>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-500" />
            <span>{formatCompactNumber(stars)}</span>
          </div>
        </>
      )}
    </Link>
  )
}
