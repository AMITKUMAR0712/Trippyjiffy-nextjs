import Enquiry from "@/Page/Enquiry";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Enquiry Form",
  description:
    "Submit your travel enquiry to TrippyJiffy. Our experts will get back with customized tour packages and best deals.",
  path: "/enquiry-form",
});

export default function Page() {
  return <Enquiry />;
}
