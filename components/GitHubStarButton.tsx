import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GitHubIcon } from 'nextra/icons'
import Link from 'next/link'

async function getStarCount() {
  try {
    const githubToken = process.env.GITHUB_TOKEN
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'fossbilling-website' // GitHub API requires a User-Agent header
    }

    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}` // Use a GitHub token if available to increase rate limits
    }

    const ghRequest = new Request('https://api.github.com/repos/FOSSBilling/FOSSBilling', {
      headers
    })

    const res = await fetch(ghRequest, {
      next: { revalidate: 24 * 60 * 60 } // Cache for 24 hours
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
    return (data as { stargazers_count: number }).stargazers_count
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
