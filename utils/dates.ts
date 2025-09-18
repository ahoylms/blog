export function timestampToLocaleDateString(ts: string, locale = "en-US") {
  return new Date(ts).toLocaleDateString(locale);
}
