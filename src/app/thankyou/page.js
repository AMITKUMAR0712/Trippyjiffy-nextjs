import ThankYou from "@/HomeCompontent/ThankYou";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Thank You",
  description: "Thank you for contacting TrippyJiffy.",
  path: "/thankyou",
  noIndex: true,
});

export default function Page() {
  return <ThankYou />;
}
