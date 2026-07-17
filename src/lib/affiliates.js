export const AFFILIATE_MARKER =
  process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || "749161";
export const AFFILIATE_TRS = "548645";

/**
 * Travelpayouts program params per brand (from the Links API).
 * `p` + `campaign_id` are REQUIRED by tp.media/r — without them you get
 * "missing argument: p".
 *
 * Klook is active. TripAdvisor (campaign 149) & Hostelworld (campaign 93)
 * returned "trs is not subscribed for brand" — join those programs in
 * Travelpayouts dashboard, then fill in their params below (generate any
 * link via Tools → Links and copy p / campaign_id from it).
 */
const PROGRAMS = {
  klook: { p: 4110, campaignId: 137, active: true },
  tripadvisor: { p: null, campaignId: 149, active: false },
  hostelworld: { p: null, campaignId: 93, active: false },
};

const BRAND_URLS = {
  klook: "https://www.klook.com/",
  tripadvisor: "https://www.tripadvisor.com/Attraction_Products",
  hostelworld: "https://www.hostelworld.com/",
};

function brandUrlForCity(partner, city) {
  const q = encodeURIComponent(city);
  switch (partner) {
    case "klook":
      return `https://www.klook.com/search/?query=${q}`;
    case "tripadvisor":
      return `https://www.tripadvisor.com/Search?q=${q}+tours+and+activities`;
    case "hostelworld":
      return `https://www.hostelworld.com/s?q=${q}`;
    default:
      return BRAND_URLS[partner] || "https://www.klook.com/";
  }
}

/** Build a full Travelpayouts tracking link. Returns null if program inactive. */
export function buildTravelpayoutsLink(partner, destinationUrl) {
  const prog = PROGRAMS[partner];
  if (!prog || !prog.active || !prog.p) return null;
  const u = encodeURIComponent(destinationUrl);
  return `https://tp.media/r?campaign_id=${prog.campaignId}&marker=${AFFILIATE_MARKER}&p=${prog.p}&trs=${AFFILIATE_TRS}&u=${u}`;
}

export const AFFILIATES = {
  klook: {
    name: "Klook",
    tagline: "Tours, attractions, activities & transport across Asia",
    color: "#FF5722",
    defaultLink: buildTravelpayoutsLink("klook", BRAND_URLS.klook),
    cityHeading: (city) => `Things to do in ${city}`,
    cityLinks: {},
  },
  tripadvisor: {
    name: "TripAdvisor Experiences",
    tagline: "Top-rated tours & experiences worldwide",
    color: "#34E0A1",
    defaultLink: buildTravelpayoutsLink("tripadvisor", BRAND_URLS.tripadvisor),
    cityHeading: (city) => `Top-rated tours in ${city}`,
    cityLinks: {},
  },
  hostelworld: {
    name: "Hostelworld",
    tagline: "Budget hostels & backpacker stays worldwide",
    color: "#F26621",
    defaultLink: buildTravelpayoutsLink("hostelworld", BRAND_URLS.hostelworld),
    cityHeading: (city) => `Budget stays in ${city}`,
    cityLinks: {},
  },
};

export function getAffiliateLink(partner, city) {
  const p = AFFILIATES[partner];
  if (!p) return null;
  if (city) {
    const key = city.toLowerCase().replace(/\s+/g, "");
    if (p.cityLinks[key]) return p.cityLinks[key];
    return buildTravelpayoutsLink(partner, brandUrlForCity(partner, city));
  }
  return p.defaultLink;
}
