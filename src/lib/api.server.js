import { slugify } from "./slug";

const REVALIDATE_SECONDS = 3600;

function getApiBase() {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://trippyjiffy.com";
  }
  return "http://localhost:5005";
}

async function fetchApi(path, revalidate = REVALIDATE_SECONDS) {
  const base = getApiBase();
  try {
    const res = await fetch(`${base}${path}`, {
      next: { revalidate },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function unwrapArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export async function fetchBlogs() {
  const data = await fetchApi("/api/blogs/get");
  return unwrapArray(data);
}

export async function fetchBlogById(id) {
  const blogs = await fetchBlogs();
  return blogs.find((b) => String(b.id) === String(id)) || null;
}

export async function fetchTours() {
  const data = await fetchApi("/api/tours/get");
  return unwrapArray(data);
}

export async function fetchTourById(tourId) {
  const tours = await fetchTours();
  return tours.find((t) => Number(t.id) === Number(tourId)) || null;
}

export async function fetchStates() {
  const data = await fetchApi("/api/state/get");
  return unwrapArray(data);
}

export async function fetchAsiaCountries() {
  const data = await fetchApi("/api/asia/get");
  return unwrapArray(data);
}

export async function fetchAsiaStates() {
  const data = await fetchApi("/api/asiaState/get");
  return unwrapArray(data);
}

export async function fetchCountryTours() {
  const data = await fetchApi("/api/country/get");
  return unwrapArray(data);
}

export async function fetchFaqs() {
  const data = await fetchApi("/api/faq/get");
  return unwrapArray(data);
}

export async function fetchFaqsByTourId(tourId) {
  const faqs = await fetchFaqs();
  return faqs.filter((f) => Number(f.tour_id) === Number(tourId));
}

export async function fetchUpcomingTrips() {
  const data = await fetchApi("/api/upcoming-trips/get");
  return unwrapArray(data);
}

export async function fetchIndiaCategories() {
  const data = await fetchApi("/api/category-india/get");
  return unwrapArray(data);
}

export async function fetchLandingPageBySlug(slug) {
  const data = await fetchApi(`/api/landing-pages/${slug}`);
  if (data?.success && data?.data) {
    return data.data.data || data.data;
  }
  return data?.data || data || null;
}

export async function fetchStateByParams(stateId, stateName) {
  const states = await fetchStates();
  if (stateId) {
    const matches = states.filter(
      (s) =>
        String(s.category_id) === String(stateId) ||
        String(s.id) === String(stateId)
    );
    return matches[0] || null;
  }
  if (stateName) {
    return (
      states.find((s) => slugify(s.state_name) === slugify(stateName)) || null
    );
  }
  return null;
}

export async function fetchCountryBySlug(slug) {
  const countries = await fetchAsiaCountries();
  return (
    countries.find((c) => slugify(c.country_name) === slugify(slug)) || null
  );
}

export async function fetchAsiaStateById(asiastateId) {
  const states = await fetchAsiaStates();
  return states.find((s) => String(s.id) === String(asiastateId)) || null;
}

export async function fetchCountryTourByAsiaStateId(asiastateId) {
  const tours = await fetchCountryTours();
  return (
    tours.find((t) => String(t.asiastate_id) === String(asiastateId)) ||
    tours.find((t) => String(t.id) === String(asiastateId)) ||
    null
  );
}

export async function fetchUpcomingById(id) {
  const trips = await fetchUpcomingTrips();
  return trips.find((t) => String(t.id) === String(id)) || null;
}

export async function fetchHomepageData() {
  const [states, countries, upcoming, indiaCategories, blogs] = await Promise.all([
    fetchStates(),
    fetchAsiaCountries(),
    fetchUpcomingTrips(),
    fetchIndiaCategories(),
    fetchBlogs(),
  ]);

  return { states, countries, upcoming, indiaCategories, blogs };
}
