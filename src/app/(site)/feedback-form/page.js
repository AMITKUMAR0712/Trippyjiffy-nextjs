import FeedbackForm from "@/Page/FeedbackForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Feedback Form",
  description: "Share your travel experience feedback with TrippyJiffy. Help us improve our tour packages and services.",
  path: "/feedback-form",
});

export default function Page() {
  return <FeedbackForm />;
}
