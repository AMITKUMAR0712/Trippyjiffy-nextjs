import Register from "@/User/Register";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Register",
  description: "Create your TrippyJiffy account to manage bookings, wishlist, and travel preferences.",
  path: "/register",
  noIndex: true,
});

export default function Page() {
  return <Register />;
}
