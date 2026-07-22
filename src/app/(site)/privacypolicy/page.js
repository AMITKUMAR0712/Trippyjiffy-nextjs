import PrivacyPolicy from "@/Page/PrivacyPolicy";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Read TrippyJiffy privacy policy. Learn how we collect, use, and protect your personal information.",
  path: "/privacypolicy",
});

export default function Page() {
  return <PrivacyPolicy skipClientSeo />;
}
