import Testimonials from "@/Page/Testimonials";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Customer Testimonials & Reviews",
  description:
    "Read real customer testimonials and reviews for TrippyJiffy tour packages. See why travelers trust us for India and overseas holidays.",
  path: "/testimonials",
});

export default function Page() {
  return <Testimonials />;
}
