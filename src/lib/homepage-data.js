import { getImgUrl } from "@/utils/getImgUrl";

function uniqueByState(data) {
  const map = new Map();
  data.forEach((item) => {
    if (!map.has(item.id)) map.set(item.id, item);
  });
  return Array.from(map.values());
}

function uniqueByCountryName(data) {
  const map = new Map();
  data.forEach((item) => {
    const key = item.country_name?.toLowerCase().trim() || "unknown-country";
    if (!map.has(key)) map.set(key, item);
  });
  return Array.from(map.values());
}

function getValidImageUrl(img, image_url) {
  return getImgUrl(image_url || img);
}

export function transformHomepageDestinations({
  states = [],
  countries = [],
  upcoming = [],
  indiaCategories = [],
}) {
  const tours = uniqueByState(states)
    .filter((s) => s.is_visible === 1)
    .map((item) => {
      const imgUrl = getValidImageUrl(item.image, item.image_url);
      return {
        id: item.id,
        state_name: item.state_name || "Unknown State",
        title: item.state_name || "Unknown State",
        tags: item.tags || [],
        images: imgUrl ? [imgUrl] : [],
      };
    });

  const formattedCountries = uniqueByCountryName(countries)
    .filter((c) => c.is_visible === 1)
    .map((item) => {
      const imgList =
        item.images
          ?.flatMap((img) => (Array.isArray(img) ? img : [img]))
          .map((img) => getValidImageUrl(img, item.image_url)) || [];
      return {
        id: item.id,
        country_name: item.country_name || "Unknown Country",
        title: item.country_name || "Unknown Country",
        images: imgList.filter(Boolean),
      };
    });

  const formattedUpcoming = (Array.isArray(upcoming) ? upcoming : []).filter(
    (t) => t.is_visible === 1
  );

  const indiaCategory = (Array.isArray(indiaCategories) ? indiaCategories : []).map(
    (item) => ({
      id: item.id,
      state_name: item.region_name || "Unknown Region",
      title: item.region_name || "Unknown Region",
      images: [getValidImageUrl(item.image, item.image_url)].filter(Boolean),
    })
  );

  return {
    tours,
    countries: formattedCountries,
    upcoming: formattedUpcoming,
    indiaCategory,
  };
}
