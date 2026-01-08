import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GitHubIcon } from 'nextra/icons'
import Link from 'next/link'

async function getStarCount() {
  try {
    const res = await fetch('https://api.github.com/repos/FOSSBilling/FOSSBilling', {
      next: { revalidate: 7200 } // Cache for 2 hours
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch stars')
    }

    const data = await res.json()
    return data.stargazers_count
  } catch (error) {
    console.error('Error fetching star count:', error)
    return null
  }
}

function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

export default async function GitHubStarButton() {
  const stars = await getStarCount()

  return (
    <Link
      href="https://github.com/FOSSBilling/FOSSBilling"
      target="_blank"
      className="group flex items-center gap-2 rounded-md bg-black/10 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-black/20 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
      aria-label="Star FOSSBilling on GitHub"
    >
      <GitHubIcon className="h-4 w-4" />
      <span>Star</span>
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
