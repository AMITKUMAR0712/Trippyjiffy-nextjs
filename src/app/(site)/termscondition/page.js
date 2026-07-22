import TermsCondition from "@/Page/TermsCondition";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description: "Read TrippyJiffy terms and conditions for booking tour packages, cancellations, refunds, and travel services.",
  path: "/termscondition",
});

export default function Page() {
  return <TermsCondition />;
}
