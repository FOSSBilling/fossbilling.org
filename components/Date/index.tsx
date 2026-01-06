import { parseISO, format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'd LLLL yyyy', { locale: enUS })}</time>
}