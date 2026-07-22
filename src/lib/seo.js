import {
  DEFAULT_OG_IMAGE,
  ORGANIZATION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "./site";
import { slugify } from "./slug";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function resolveUploadUrl(img) {
  if (!img) return DEFAULT_OG_IMAGE;
  if (typeof img === "string" && img.startsWith("http")) {
    return img.replace(/^http:\/\//i, "https://");
  }
  const filename = String(img)
    .replace(/^https?:\/\/[^/]+/, "")
    .replace(/^\/?api\/uploads\//, "")
    .replace(/^\/?uploads\//, "")
    .replace(/^\//, "");
  return `${SITE_URL}/api/uploads/${filename}`;
}

export function extractEditorText(paragraphs, maxLength = 160) {
  try {
    let parsed = paragraphs;
    if (typeof paragraphs === "string") parsed = JSON.parse(paragraphs);
    if (!parsed?.blocks?.length) return "";
    const block = parsed.blocks.find((b) => b.type === "paragraph") || parsed.blocks[0];
    const text = (block?.data?.text || "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
  } catch {
    return "";
  }
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
}) {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function buildBlogMetadata(blog) {
  if (!blog) {
    return buildPageMetadata({
      title: "Blog",
      description: "Explore travel stories, tips and guides on TrippyJiffy.",
      path: "/blogpage",
    });
  }
  const description =
    extractEditorText(blog.paragraphs) ||
    "Explore detailed travel stories, tips and guides on TrippyJiffy.";
  return buildPageMetadata({
    title: blog.title,
    description,
    path: `/blog/${blog.id}`,
    image: resolveUploadUrl(blog.image),
    type: "article",
  });
}

export function buildTourMetadata(tour) {
  if (!tour) {
    return buildPageMetadata({
      title: "Tour Package",
      description: "Explore curated tour packages with TrippyJiffy.",
      path: "/family-tours",
    });
  }
  const name = tour.tour_name || tour.title || "Tour Package";
  const description =
    extractEditorText(tour.description || tour.overview) ||
    `Book ${name} with TrippyJiffy. Customized itineraries, expert guides, and best prices.`;
  return buildPageMetadata({
    title: `${name} Tour Package`,
    description,
    path: `/tour/${tour.id}`,
    image: resolveUploadUrl(tour.image),
  });
}

export function buildStateMetadata(state, path) {
  const name = state?.state_name || "India Tour";
  const description =
    extractEditorText(state?.description) ||
    `Explore ${name} tour packages with TrippyJiffy. Best itineraries, family tours, honeymoon packages, and customized holiday plans.`;
  return buildPageMetadata({
    title: `${name} Tour Packages`,
    description,
    path,
    image: resolveUploadUrl(state?.image_url || state?.image),
  });
}

export function buildCountryMetadata(country, path) {
  const name = country?.country_name || "Asia Tour";
  const description =
    extractEditorText(country?.description) ||
    `Discover ${name} tour packages with TrippyJiffy. Curated overseas holidays, group tours, and customized travel experiences.`;
  const image =
    country?.images?.[0] || country?.image_url || country?.image;
  return buildPageMetadata({
    title: `${name} Tour Packages`,
    description,
    path,
    image: resolveUploadUrl(image),
  });
}

export function buildCountryTourMetadata(tour, asiaState, path) {
  const name =
    asiaState?.state_name ||
    tour?.tour_name ||
    tour?.title ||
    "Overseas Tour";
  const description =
    extractEditorText(tour?.description || tour?.routing) ||
    `Book ${name} tour package with TrippyJiffy. Detailed itinerary, inclusions, and expert travel support.`;
  return buildPageMetadata({
    title: `${name} Tour Package`,
    description,
    path,
    image: resolveUploadUrl(asiaState?.state_image || tour?.image),
  });
}

export function buildUpcomingMetadata(trip) {
  if (!trip) {
    return buildPageMetadata({
      title: "Upcoming Tour",
      description: "Explore upcoming group tours with TrippyJiffy.",
      path: "/upcoming-best-tours",
    });
  }
  const description =
    extractEditorText(trip.description || trip.overview) ||
    `Join ${trip.title || "this upcoming tour"} with TrippyJiffy. Limited seats, curated itinerary, and group travel experience.`;
  const image = trip.banner_image || (Array.isArray(trip.images) ? trip.images[0] : trip.image);
  return buildPageMetadata({
    title: trip.title || "Upcoming Tour",
    description,
    path: `/upcoming-best-tours/${trip.id}`,
    image: resolveUploadUrl(image),
  });
}

export function buildLandingMetadata(page, slug) {
  if (!page) {
    return buildPageMetadata({
      title: "Tour Package",
      description: "Book curated tour packages with TrippyJiffy.",
      path: `/family-trips/${slug}`,
    });
  }
  const title = page.seo_title || page.title || page.hero_title || "Tour Package";
  const description =
    page.seo_description ||
    page.hero_subtitle ||
    page.description ||
    `Book ${title} with TrippyJiffy. Customized itineraries and best travel deals.`;
  const image = page.hero_image || page.banner_image || page.og_image;
  return buildPageMetadata({
    title,
    description,
    path: `/family-trips/${slug}`,
    image: resolveUploadUrl(image),
  });
}

export const travelAgencyJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: ORGANIZATION.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description:
    "Unlock India's 4th Dimension of Travel with TrippyJiffy. Premium curated travel experiences, customized itineraries, and professional tour management.",
  address: { "@type": "PostalAddress", ...ORGANIZATION.address },
  telephone: ORGANIZATION.telephone,
  email: ORGANIZATION.email,
  priceRange: "$$",
  openingHours: "Mo-Su 09:00-21:00",
  sameAs: SOCIAL_LINKS,
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: ORGANIZATION.name,
  image: DEFAULT_OG_IMAGE,
  url: SITE_URL,
  telephone: ORGANIZATION.telephone,
  email: ORGANIZATION.email,
  address: { "@type": "PostalAddress", ...ORGANIZATION.address },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.8467,
    longitude: 80.9462,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
  sameAs: SOCIAL_LINKS,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/family-tours?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function breadcrumbJsonLd(items) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: extractEditorText(faq.question, 300) || faq.question || "FAQ",
      acceptedAnswer: {
        "@type": "Answer",
        text: extractEditorText(faq.answer, 500) || faq.answer || "",
      },
    })),
  };
}

export function blogPostingJsonLd(blog) {
  if (!blog) return null;
  const description = extractEditorText(blog.paragraphs);
  const image = resolveUploadUrl(blog.image);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image,
    datePublished: blog.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    description,
    mainEntityOfPage: absoluteUrl(`/blog/${blog.id}`),
  };
}

export function tourPackageJsonLd(tour, faqs = []) {
  if (!tour) return null;
  const name = tour.tour_name || tour.title;
  const description = extractEditorText(tour.description || tour.overview);
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    image: resolveUploadUrl(tour.image),
    provider: { "@type": "TravelAgency", name: SITE_NAME, url: SITE_URL },
    touristType: "Family, Couples, Groups",
    url: absoluteUrl(`/tour/${tour.id}`),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
  if (faqs.length) {
    schema.subjectOf = faqPageJsonLd(faqs);
  }
  return schema;
}

export function stateListingJsonLd(state, path) {
  if (!state) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: state.state_name,
    description: extractEditorText(state.description),
    image: resolveUploadUrl(state.image_url || state.image),
    url: absoluteUrl(path),
    touristType: "Family, Couples, Groups",
  };
}

export function countryListingJsonLd(country, path) {
  if (!country) return null;
  const image = country.images?.[0] || country.image_url || country.image;
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: country.country_name,
    description: extractEditorText(country.description),
    image: resolveUploadUrl(image),
    url: absoluteUrl(path),
  };
}

export function buildIndiaTourPath(state, stateId, stateName, isStateRoute = false) {
  const slug = slugify(state?.state_name || stateName);
  const id = state?.id || stateId;
  if (isStateRoute) return `/india-tours/state/${id}/${slug}`;
  return `/india-tours/${id}/${slug}`;
}
