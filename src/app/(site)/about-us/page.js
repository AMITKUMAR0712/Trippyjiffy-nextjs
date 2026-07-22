import About from "@/Page/About";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about TrippyJiffy — India's trusted travel agency offering customized family tours, India tour packages, and overseas holiday planning.",
  path: "/about-us",
});

export default function Page() {
  return <About skipClientSeo />;
}
