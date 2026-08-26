/** Formats an ISO 8601 duration ("PT1H30M") as Turkish shorthand ("1 sa 30 dk"). */
export function formatDuration(iso: string): string {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?$/.exec(iso);
  if (!match) return iso;
  const hours = match[1] ? Number(match[1]) : 0;
  const minutes = match[2] ? Number(match[2]) : 0;
  const parts: string[] = [];
  if (hours) parts.push(`${hours} sa`);
  if (minutes) parts.push(`${minutes} dk`);
  return parts.join(" ") || "0 dk";
}
