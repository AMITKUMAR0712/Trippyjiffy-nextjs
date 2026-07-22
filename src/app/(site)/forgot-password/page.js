import ForgotPassword from "@/User/ForgotPassword";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Forgot Password",
  description: "Reset your TrippyJiffy account password.",
  path: "/forgot-password",
  noIndex: true,
});

export default function Page() {
  return <ForgotPassword />;
}
