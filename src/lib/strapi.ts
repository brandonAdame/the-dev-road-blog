export function getStrapiURL() {
  return import.meta.env.VITE_STRAPI_BASE_API_URL ?? "http://localhost:1337";
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (
    url.startsWith("data:") ||
    url.startsWith("http") ||
    url.startsWith("//")
  ) {
    return url;
  }
  return `${getStrapiURL()}${url}`;
}
