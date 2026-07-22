import Homepage from "@/Homepage";
import { JsonLd } from "@/components/JsonLd";
import { fetchHomepageData } from "@/lib/api.server";
import { transformHomepageDestinations } from "@/lib/homepage-data";
import { buildPageMetadata, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "Best Family Tour Packages in India & Overseas",
  description:
    "Book customized family tours, India tour packages, overseas holidays, honeymoon trips, and group travel deals with TrippyJiffy. Expert itinerary planning and affordable vacation packages.",
  path: "/",
});

export default async function Page() {
  const apiData = await fetchHomepageData();
  const destinations = transformHomepageDestinations(apiData);
  const blogs = Array.isArray(apiData.blogs) ? apiData.blogs.slice(0, 8) : [];

  return (
    <>
      <JsonLd data={[websiteJsonLd, localBusinessJsonLd]} />
      <Homepage initialDestinations={destinations} initialBlogs={blogs} />
    </>
  );
}
