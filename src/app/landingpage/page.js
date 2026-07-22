import LandingPage from "@/HomeCompontent/LandingPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Special Tour Offers",
  description: "Explore exclusive TrippyJiffy tour offers and limited-time travel deals on India and overseas holiday packages.",
  path: "/landingpage",
});

export default function Page() {
  return <LandingPage />;
}
