import ExploreTours from "@/Page/ExploreTours";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Family Tours & India Tour Packages",
  description:
    "Browse family tour packages, India tour sites, and travelling packages in India. Compare itineraries, prices, and book your perfect vacation with TrippyJiffy.",
  path: "/family-tours",
});

export default function Page() {
  return <ExploreTours skipClientSeo />;
}
