import Image from "next/image";

const REMOTE_HOSTS = new Set([
  "trippyjiffy.com",
  "images.unsplash.com",
  "placehold.co",
]);

function canOptimize(src) {
  if (!src || typeof src !== "string") return false;
  if (src.startsWith("/")) return true;
  try {
    const { hostname } = new URL(src);
    return REMOTE_HOSTS.has(hostname);
  } catch {
    return false;
  }
}

function unsplashUrl(src, width = 400) {
  if (!src || !src.includes("images.unsplash.com")) return src;
  try {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", "60");
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  } catch {
    return src;
  }
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  style,
  loading,
  fetchPriority,
  decoding,
}) {
  if (!src) return null;

  const optimizedSrc = unsplashUrl(src, width || 400);

  if (!canOptimize(optimizedSrc)) {
    return (
      <img
        src={optimizedSrc}
        alt={alt || ""}
        width={width}
        height={height}
        className={className}
        loading={loading || (priority ? "eager" : "lazy")}
        fetchPriority={fetchPriority || (priority ? "high" : undefined)}
        decoding={decoding || "async"}
        style={style}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={optimizedSrc}
        alt={alt || ""}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        style={style}
      />
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt || ""}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
      style={style}
    />
  );
}
