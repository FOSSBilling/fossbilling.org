import { parseISO, format, isValid } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatDate(isoDate: string): string {
  const date = parseISO(isoDate);
  if (!isValid(date)) return 'Unknown date';
  return format(date, 'd LLLL yyyy', { locale: enUS });
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return 'Unknown size';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    sizes.length - 1,
  );
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
