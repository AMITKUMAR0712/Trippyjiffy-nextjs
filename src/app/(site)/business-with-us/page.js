import Business from "@/Page/Business";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Business With Us — Travel Partnership",
  description:
    "Partner with TrippyJiffy for travel business opportunities. B2B collaborations, agent partnerships, and corporate travel solutions across India and overseas.",
  path: "/business-with-us",
});

export default function Page() {
  return <Business skipClientSeo />;
}
