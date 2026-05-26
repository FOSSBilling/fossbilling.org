export function Callout({ type = 'info', title, children }) {
  const styles = {
    info: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
    warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950',
    error: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950'
  }

  const iconColor = {
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400'
  }

  const icons = {
    info: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575Zm1.763.707L2.138 13.131a.25.25 0 00.22.369h12.284a.25.25 0 00.22-.369L7.78 1.754a.25.25 0 00-.44 0ZM8 5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 5Zm0 6a1 1 0 100-2 1 1 0 000 2Z" />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575Zm1.763.707L2.138 13.131a.25.25 0 00.22.369h12.284a.25.25 0 00.22-.369L7.78 1.754a.25.25 0 00-.44 0ZM8 5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 5Zm0 6a1 1 0 100-2 1 1 0 000 2Z" />
      </svg>
    )
  }

  return (
    <div className={`rounded-lg border p-4 my-4 ${styles[type] || styles.info}`}>
      {title && (
        <div className={`flex items-center gap-2 font-semibold mb-1 ${iconColor[type] || iconColor.info}`}>
          {icons[type] || icons.info}
          <span>{title}</span>
        </div>
      )}
      <div className="text-sm text-gray-700 dark:text-gray-300 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline">
        {children}
      </div>
    </div>
  )
}
