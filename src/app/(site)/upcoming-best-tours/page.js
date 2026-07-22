import UpcomingLanding from "@/Page/UpcomingLanding";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Upcoming Best Tours & Group Trips",
  description:
    "Discover upcoming group tours and adventure trips with TrippyJiffy. Book early for the best deals on curated travel experiences across India and overseas.",
  path: "/upcoming-best-tours",
});

export default function Page() {
  return <UpcomingLanding skipClientSeo />;
}
