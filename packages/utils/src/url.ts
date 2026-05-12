export function toUrlPath(path: string) {
  // replace all non alphanumerics characters with hyphen
  return path
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]+/g, "-")
  // then replace all sequential hyphens with single hyphen
  .replace(/-+/g, "-")
  // then remove leading and trailing hyphens
  .replace(/^-|-$/g, "")
}
