import CustomizeTrip from "@/Page/CustomizeTrip";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Customize Your Holiday Plan",
  description:
    "Create a personalized holiday itinerary with TrippyJiffy. Tell us your travel dates, budget, and preferences — our experts will craft the perfect tour package for you.",
  path: "/customize-your-holiday-plan",
});

export default function Page() {
  return <CustomizeTrip skipClientSeo />;
}
