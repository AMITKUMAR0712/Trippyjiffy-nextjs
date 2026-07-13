/** Production: same-origin /api avoids mixed-content when env is wrong */
export const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === "production") return "";
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5005";
  return raw.replace(/\/api\/?$/, "").replace(/\/$/, "");
};

export const apiPath = (path) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const apiSuffix = normalized.startsWith("/api") ? normalized : `/api${normalized}`;
  const base = getApiBaseUrl();
  return base ? `${base}${apiSuffix}` : apiSuffix;
};
