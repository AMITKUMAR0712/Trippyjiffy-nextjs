import ResetPassword from "@/User/ResetPassword";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Reset Password",
  description: "Reset your TrippyJiffy account password.",
  path: "/reset-password",
  noIndex: true,
});

export default function Page() {
  return <ResetPassword />;
}
