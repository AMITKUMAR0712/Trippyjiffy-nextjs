import { SITE_URL } from "@/lib/site";
import {
  fetchAsiaCountries,
  fetchBlogs,
  fetchStates,
  fetchTours,
  fetchUpcomingTrips,
} from "@/lib/api.server";

function slugify(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const STATIC_PAGES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/family-tours", priority: 0.95, changeFrequency: "daily" },
  { path: "/upcoming-best-tours", priority: 0.9, changeFrequency: "daily" },
  { path: "/destinations", priority: 0.85, changeFrequency: "weekly" },
  { path: "/experiences", priority: 0.85, changeFrequency: "weekly" },
  { path: "/customize-your-holiday-plan", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blogpage", priority: 0.85, changeFrequency: "weekly" },
  { path: "/business-with-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacypolicy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/termscondition", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const [states, countries, tours, blogs, upcoming] = await Promise.all([
    fetchStates(),
    fetchAsiaCountries(),
    fetchTours(),
    fetchBlogs(),
    fetchUpcomingTrips(),
  ]);

  const now = new Date().toISOString();

  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const stateEntries = (states || [])
    .filter((s) => s.is_visible === 1)
    .map((state) => ({
      url: `${SITE_URL}/india-tours/${state.id}/${slugify(state.state_name)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));

  const countryEntries = (countries || [])
    .filter((c) => c.is_visible === 1)
    .map((country) => ({
      url: `${SITE_URL}/asia-tours/${slugify(country.country_name)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const tourEntries = (tours || []).map((tour) => ({
    url: `${SITE_URL}/tour/${tour.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogEntries = (blogs || []).map((blog) => ({
    url: `${SITE_URL}/blog/${blog.id}`,
    lastModified: blog.date || now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const upcomingEntries = (upcoming || [])
    .filter((trip) => trip.is_visible === 1)
    .map((trip) => ({
      url: `${SITE_URL}/upcoming-best-tours/${trip.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    }));

  return [
    ...staticEntries,
    ...stateEntries,
    ...countryEntries,
    ...tourEntries,
    ...blogEntries,
    ...upcomingEntries,
  ];
}
