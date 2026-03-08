import { formatDate } from '../../lib/format'

export default function Date({ dateString }: { dateString: string }) {
  return <time dateTime={dateString}>{formatDate(dateString)}</time>
}