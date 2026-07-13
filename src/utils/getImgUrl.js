import cert1 from "../Img/Certificates1.jpeg";
import cert2 from "../Img/Certificates2.jpeg";
import bannerGolden from "../Img/Banner2.jpg";
import bannerSouth from "../Img/travel.jpg";
import bannerRajasthan from "../Img/Banner3.jpg";
import gal1 from "../Img/Banner!.webp";
import gal2 from "../Img/Banner32.webp";
import gal3 from "../Img/contact.jpg";
import gal4 from "../Img/l1.jpeg";
import gal5 from "../Img/people-doi-pha-tang-against-sky-sunrise_1048944-4357386.jpeg";
import gal6 from "../Img/hiker-looking-mountains-from-great-wall-china-sunset_1048944-9830948.jpeg";

const devApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://trippyjiffy.com";
const baseURL_IMG =
  process.env.NODE_ENV === "production"
    ? "/api/uploads"
    : `${devApiBase.replace(/\/$/, "")}/api/uploads`;

// Map exact db paths to actual imported hashes
const LOCAL_ASSET_MAP = {
  "/api/uploads/Certificates1.jpeg": cert1.src ?? cert1,
  "/api/uploads/Certificates2.jpeg": cert2.src ?? cert2,
  "/api/uploads/Banner2.jpg": bannerGolden.src ?? bannerGolden,
  "/api/uploads/travel.jpg": bannerSouth.src ?? bannerSouth,
  "/api/uploads/Banner3.jpg": bannerRajasthan.src ?? bannerRajasthan,
  "/api/uploads/Banner!.webp": gal1.src ?? gal1,
  "/api/uploads/Banner32.webp": gal2.src ?? gal2,
  "/api/uploads/contact.jpg": gal3.src ?? gal3,
  "/api/uploads/l1.jpeg": gal4.src ?? gal4,
  "/api/uploads/people-doi-pha-tang-against-sky-sunrise_1048944-4357386.jpeg": gal5.src ?? gal5,
  "/api/uploads/hiker-looking-mountains-from-great-wall-china-sunset_1048944-9830948.jpeg": gal6.src ?? gal6,
};

/**
 * Robust utility to resolve image URLs.
 */
export const getImgUrl = (url) => {
  if (!url) return "";

  // 1. Check if it's a base64 or blob URL
  if (typeof url === "string" && (url.startsWith("blob:") || url.startsWith("data:"))) {
    return url;
  }

  // 2. Normalize: extract only the filename
  let filename = url;
  if (typeof url === "string") {
    // Remove protocol and domain if present
    filename = url.replace(/^https?:\/\/[^\/]+/, "");
    // Remove /api/uploads/ or uploads/ prefixes
    filename = filename.replace(/^\/?api\/uploads\//, "").replace(/^\/?uploads\//, "").replace(/^\//, "");
  }

  // 3. Check internal asset map with standard path
  const normalizedPath = `/api/uploads/${filename}`;
  if (LOCAL_ASSET_MAP[normalizedPath]) {
    return LOCAL_ASSET_MAP[normalizedPath];
  }

  // 4. Handle absolute URLs
  if (typeof url === "string" && url.startsWith("http")) {
    if (
      url.includes("localhost") ||
      url.includes("127.0.0.1") ||
      url.includes("187.127.139.99") ||
      url.startsWith("http://trippyjiffy.com")
    ) {
      return `${baseURL_IMG}/${filename}`;
    }
    return url.replace(/^http:\/\//i, "https://");
  }

  // 5. Default: Append to production uploads path
  return `${baseURL_IMG}/${filename}`;
};
