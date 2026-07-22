import Login from "@/User/Login";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Login",
  description: "Login to your TrippyJiffy account.",
  path: "/login",
  noIndex: true,
});

export default function Page() {
  return <Login />;
}
