import Destinations from "@/HomeCompontent/Destinations";
import { fetchHomepageData } from "@/lib/api.server";
import { buildPageMetadata } from "@/lib/seo";
import { transformHomepageDestinations } from "@/lib/homepage-data";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "Tour Destinations in India & Overseas",
  description:
    "Explore trending tour destinations in India and overseas. Discover state-wise India tours, Asia travel packages, and upcoming group trips with TrippyJiffy.",
  path: "/destinations",
});

export default async function Page() {
  const apiData = await fetchHomepageData();
  const initialData = transformHomepageDestinations(apiData);

  return <Destinations initialData={initialData} />;
}
