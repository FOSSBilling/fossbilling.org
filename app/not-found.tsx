import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - Page Not Found'
}

export default function NotFound() {
  return (
    <div className="content-container py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
        Go back home
      </Link>
    </div>
  )
}
