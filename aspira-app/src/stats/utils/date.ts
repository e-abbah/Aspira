/**
 * Returns a display-safe deadline label.
 * Prevents the "Closes in -330 days" bug by clamping past dates
 * and formatting the raw date instead of a negative countdown.
 */
export function getDeadlineLabel(isoDate: string): string {
  const deadline = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const diffDays = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Closed';
  if (diffDays === 0) return 'Closes today';
  if (diffDays <= 30) return `Closes in ${diffDays} day${diffDays === 1 ? '' : 's'}`;

  return `Closes ${deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

export function isClosingSoon(isoDate: string, thresholdDays = 14): boolean {
  const deadline = new Date(isoDate);
  const today = new Date();
  const diffDays = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= thresholdDays;
}