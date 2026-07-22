import Experiences from "@/Page/Experiences";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tours, Activities & Budget Stays",
  description:
    "Discover handpicked tours, activities, attractions and budget stays worldwide. Book through TrippyJiffy's trusted travel partners — Klook, TripAdvisor Experiences & Hostelworld.",
  path: "/experiences",
});

export default function Page() {
  return <Experiences />;
}
