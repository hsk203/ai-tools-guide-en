// Build-time base path for this language build: "" at the domain root,
// "/zh-hant" or "/en" for the language subdirectories of aitech8.com.
// Use withBase() for internal PAGE links (routes such as /posts/, /about/,
// /rss.xml). Do NOT use it for public/ files (/images/*, /favicon.svg) —
// those are shared at the domain root across all languages.
export const basePath: string = import.meta.env.PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
