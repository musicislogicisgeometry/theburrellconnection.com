export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-UK", {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
