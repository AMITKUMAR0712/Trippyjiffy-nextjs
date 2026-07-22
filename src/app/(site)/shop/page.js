import Shopwithus from "@/HomeCompontent/Shopwithus";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Travel Shop",
  description: "Explore TrippyJiffy travel shop — curated travel essentials and tour-related products.",
  path: "/shop",
});

export default function Page() {
  return <Shopwithus />;
}
