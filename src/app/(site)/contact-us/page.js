import Contact from "@/Page/Contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with TrippyJiffy for tour enquiries, customized holiday plans, and travel support. Call +91-9870210896 or email travelqueries@trippyjiffy.com.",
  path: "/contact-us",
});

export default function Page() {
  return <Contact skipClientSeo />;
}
